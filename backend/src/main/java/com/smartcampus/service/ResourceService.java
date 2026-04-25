package com.smartcampus.service;

import com.smartcampus.dto.request.ResourceRequest;
import com.smartcampus.dto.response.ResourceResponse;
import com.smartcampus.exception.ResourceNotFoundException;
import com.smartcampus.mapper.SmartMapper;
import com.smartcampus.model.entity.Resource;
import com.smartcampus.model.entity.ResourceAvailability;
import com.smartcampus.model.enums.ResourceStatus;
import com.smartcampus.model.enums.ResourceType;
import com.smartcampus.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResourceService {

    private final ResourceRepository resourceRepository;
    private final SmartMapper mapper;

    @Transactional(readOnly = true)
    public Page<ResourceResponse> getAllResources(
            ResourceType type, Integer capacity, String location, ResourceStatus status, Pageable pageable) {
        return resourceRepository.findAllWithFilters(type, capacity, location, status, pageable)
                .map(mapper::toResourceResponse);
    }

    @Transactional(readOnly = true)
    public ResourceResponse getResourceById(UUID id) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found with id: " + id));
        return mapper.toResourceResponse(resource);
    }

    @Transactional
    public ResourceResponse createResource(ResourceRequest request) {
        Resource resource = Resource.builder()
                .name(request.getName())
                .type(request.getType())
                .capacity(request.getCapacity())
                .location(request.getLocation())
                .description(request.getDescription())
                .status(request.getStatus())
                .build();

        if (request.getAvailabilityWindows() != null) {
            resource.setAvailabilityWindows(request.getAvailabilityWindows().stream()
                    .map(avail -> ResourceAvailability.builder()
                            .resource(resource)
                            .dayOfWeek(avail.getDayOfWeek())
                            .startTime(avail.getStartTime())
                            .endTime(avail.getEndTime())
                            .build())
                    .collect(Collectors.toList()));
        }

        return mapper.toResourceResponse(resourceRepository.save(resource));
    }

    @Transactional
    public ResourceResponse updateResource(UUID id, ResourceRequest request) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found with id: " + id));

        resource.setName(request.getName());
        resource.setType(request.getType());
        resource.setCapacity(request.getCapacity());
        resource.setLocation(request.getLocation());
        resource.setDescription(request.getDescription());
        resource.setStatus(request.getStatus());

        resource.getAvailabilityWindows().clear();
        if (request.getAvailabilityWindows() != null) {
            resource.getAvailabilityWindows().addAll(request.getAvailabilityWindows().stream()
                    .map(avail -> ResourceAvailability.builder()
                            .resource(resource)
                            .dayOfWeek(avail.getDayOfWeek())
                            .startTime(avail.getStartTime())
                            .endTime(avail.getEndTime())
                            .build())
                    .collect(Collectors.toList()));
        }

        return mapper.toResourceResponse(resourceRepository.save(resource));
    }

    @Transactional
    public void deleteResource(UUID id) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found with id: " + id));
        
        // Soft delete: set to OUT_OF_SERVICE
        resource.setStatus(ResourceStatus.OUT_OF_SERVICE);
        resourceRepository.save(resource);
    }
}
