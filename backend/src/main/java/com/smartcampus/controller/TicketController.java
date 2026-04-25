package com.smartcampus.controller;

import com.smartcampus.dto.request.CommentRequest;
import com.smartcampus.dto.request.TicketRequest;
import com.smartcampus.dto.response.CommentResponse;
import com.smartcampus.dto.response.TicketResponse;
import com.smartcampus.model.enums.IncidentStatus;
import com.smartcampus.service.TicketService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/tickets")
@RequiredArgsConstructor
@Tag(name = "Incident Ticketing", description = "Endpoints for reporting and managing maintenance issues")
public class TicketController {

    private final TicketService ticketService;

    @PostMapping
    @Operation(summary = "Report a new incident")
    public ResponseEntity<TicketResponse> createTicket(
            @AuthenticationPrincipal String email,
            @RequestHeader("X-User-Id") UUID userId, // Temporary until Auth context fully set
            @Valid @RequestBody TicketRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ticketService.createTicket(userId, request));
    }

    @GetMapping
    @Operation(summary = "List incident tickets")
    public ResponseEntity<List<TicketResponse>> getTickets(
            @RequestHeader("X-User-Id") UUID userId,
            @RequestHeader("X-User-Role") String role) {
        boolean isAdminOrTech = role.equals("ADMIN") || role.equals("TECHNICIAN");
        return ResponseEntity.ok(ticketService.getTickets(userId, isAdminOrTech));
    }

    @PatchMapping("/{id}/assign")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Assign a technician to a ticket")
    public ResponseEntity<TicketResponse> assignTicket(
            @PathVariable UUID id,
            @RequestParam UUID technicianId) {
        return ResponseEntity.ok(ticketService.assignTicket(id, technicianId));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Update ticket status")
    public ResponseEntity<TicketResponse> updateStatus(
            @PathVariable UUID id,
            @RequestParam IncidentStatus status,
            @RequestParam(required = false) String notes) {
        return ResponseEntity.ok(ticketService.updateStatus(id, status, notes));
    }

    @PostMapping(value = "/{id}/attachments", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload an attachment to a ticket")
    public ResponseEntity<TicketResponse> addAttachment(
            @PathVariable UUID id,
            @RequestHeader("X-User-Id") UUID userId,
            @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(ticketService.addAttachment(id, userId, file));
    }

    @PostMapping("/{id}/comments")
    @Operation(summary = "Add a comment to a ticket")
    public ResponseEntity<CommentResponse> addComment(
            @PathVariable UUID id,
            @RequestHeader("X-User-Id") UUID userId,
            @Valid @RequestBody CommentRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ticketService.addComment(id, userId, request));
    }
}
