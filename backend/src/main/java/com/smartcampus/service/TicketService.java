package com.smartcampus.service;

import com.smartcampus.dto.request.CommentRequest;
import com.smartcampus.dto.request.TicketRequest;
import com.smartcampus.dto.response.CommentResponse;
import com.smartcampus.dto.response.TicketResponse;
import com.smartcampus.exception.InvalidStateException;
import com.smartcampus.exception.ResourceNotFoundException;
import com.smartcampus.mapper.SmartMapper;
import com.smartcampus.model.entity.*;
import com.smartcampus.model.enums.IncidentStatus;
import com.smartcampus.model.enums.NotificationType;
import com.smartcampus.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final IncidentTicketRepository ticketRepository;
    private final ResourceRepository resourceRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final TicketAttachmentRepository attachmentRepository;
    private final FileStorageService fileStorageService;
    private final NotificationService notificationService;
    private final SmartMapper mapper;

    @Transactional
    public TicketResponse createTicket(UUID userId, TicketRequest request) {
        User reporter = userRepository.findById(userId).orElseThrow();
        Resource resource = request.getResourceId() != null ? 
                resourceRepository.findById(request.getResourceId()).orElseThrow() : null;

        IncidentTicket ticket = IncidentTicket.builder()
                .reportedBy(reporter)
                .resource(resource)
                .location(request.getLocation())
                .category(request.getCategory())
                .description(request.getDescription())
                .priority(request.getPriority())
                .status(IncidentStatus.OPEN)
                .build();

        return mapper.toTicketResponse(ticketRepository.save(ticket));
    }

    @Transactional(readOnly = true)
    public List<TicketResponse> getTickets(UUID userId, boolean isAdminOrTech) {
        // Implementation for listing with filters omitted for brevity in first pass
        // Standard repository call
        return ticketRepository.findAll().stream()
                .filter(t -> isAdminOrTech || t.getReportedBy().getId().equals(userId))
                .map(mapper::toTicketResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public TicketResponse assignTicket(UUID ticketId, UUID technicianId) {
        IncidentTicket ticket = ticketRepository.findById(ticketId).orElseThrow();
        User technician = userRepository.findById(technicianId).orElseThrow();
        
        ticket.setAssignedTo(technician);
        ticket.setStatus(IncidentStatus.IN_PROGRESS);
        
        TicketResponse response = mapper.toTicketResponse(ticketRepository.save(ticket));
        
        notificationService.sendNotification(
                ticket.getReportedBy(),
                NotificationType.TICKET_STATUS_CHANGED,
                "Ticket Assigned",
                "Your ticket has been assigned to a technician.",
                ticket.getId(), "TICKET"
        );
        
        return response;
    }

    @Transactional
    public TicketResponse updateStatus(UUID ticketId, IncidentStatus status, String notes) {
        IncidentTicket ticket = ticketRepository.findById(ticketId).orElseThrow();
        ticket.setStatus(status);
        ticket.setResolutionNotes(notes);
        
        TicketResponse response = mapper.toTicketResponse(ticketRepository.save(ticket));
        
        notificationService.sendNotification(
                ticket.getReportedBy(),
                NotificationType.TICKET_STATUS_CHANGED,
                "Ticket Status Updated",
                "Your ticket status is now " + status,
                ticket.getId(), "TICKET"
        );
        
        return response;
    }

    @Transactional
    public TicketResponse addAttachment(UUID ticketId, UUID userId, MultipartFile file) {
        IncidentTicket ticket = ticketRepository.findById(ticketId).orElseThrow();
        if (!ticket.getReportedBy().getId().equals(userId)) {
            throw new InvalidStateException("Only the reporter can add attachments");
        }
        if (ticket.getAttachments().size() >= 3) {
            throw new InvalidStateException("Maximum 3 attachments allowed per ticket");
        }

        String fileName = fileStorageService.storeFile(file);
        TicketAttachment attachment = TicketAttachment.builder()
                .ticket(ticket)
                .fileUrl("/uploads/" + fileName)
                .originalFilename(file.getOriginalFilename())
                .uploadedBy(ticket.getReportedBy())
                .build();

        attachmentRepository.save(attachment);
        return mapper.toTicketResponse(ticketRepository.findById(ticketId).orElseThrow());
    }

    @Transactional
    public CommentResponse addComment(UUID ticketId, UUID userId, CommentRequest request) {
        IncidentTicket ticket = ticketRepository.findById(ticketId).orElseThrow();
        User author = userRepository.findById(userId).orElseThrow();

        Comment comment = Comment.builder()
                .ticket(ticket)
                .author(author)
                .content(request.getContent())
                .build();

        CommentResponse response = mapper.toCommentResponse(commentRepository.save(comment));

        // Notify reporter if someone else comments
        if (!ticket.getReportedBy().getId().equals(userId)) {
            notificationService.sendNotification(
                    ticket.getReportedBy(),
                    NotificationType.NEW_COMMENT,
                    "New Comment on Ticket",
                    author.getName() + " commented on your ticket.",
                    ticket.getId(), "TICKET"
            );
        }

        return response;
    }
}
