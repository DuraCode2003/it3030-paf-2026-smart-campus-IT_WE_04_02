package com.smartcampus.controller;

import com.smartcampus.dto.request.ResourceRequest;
import com.smartcampus.dto.response.ResourceResponse;
import com.smartcampus.model.enums.ResourceStatus;
import com.smartcampus.model.enums.ResourceType;
import com.smartcampus.service.ResourceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/resources")
@RequiredArgsConstructor
@Tag(name = "Resource Management", description = "Endpoints for managing campus facilities and equipment")
public class ResourceController {

    private final ResourceService resourceService;

    @GetMapping
    @Operation(summary = "List all resources with filtering and pagination", description = "Public access")
    public ResponseEntity<Page<ResourceResponse>> getAllResources(
            @RequestParam(required = false) ResourceType type,
            @RequestParam(required = false) Integer capacity,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) ResourceStatus status,
            Pageable pageable) {
        return ResponseEntity.ok(resourceService.getAllResources(type, capacity, location, status, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get resource details by ID", description = "Public access")
    @ApiResponse(responseCode = "200", description = "Resource found")
    @ApiResponse(responseCode = "404", description = "Resource not found")
    public ResponseEntity<ResourceResponse> getResourceById(@PathVariable UUID id) {
        return ResponseEntity.ok(resourceService.getResourceById(id));
    }

    @PostMapping
    @Operation(summary = "Create a new resource", description = "Admin only")
    @ApiResponse(responseCode = "201", description = "Resource created successfully")
    public ResponseEntity<ResourceResponse> createResource(@Valid @RequestBody ResourceRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(resourceService.createResource(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing resource", description = "Admin only")
    public ResponseEntity<ResourceResponse> updateResource(
            @PathVariable UUID id, @Valid @RequestBody ResourceRequest request) {
        return ResponseEntity.ok(resourceService.updateResource(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Soft-delete a resource", description = "Admin only - sets status to OUT_OF_SERVICE")
    @ApiResponse(responseCode = "204", description = "Resource deleted successfully")
    public ResponseEntity<Void> deleteResource(@PathVariable UUID id) {
        resourceService.deleteResource(id);
        return ResponseEntity.noContent().build();
    }
}
