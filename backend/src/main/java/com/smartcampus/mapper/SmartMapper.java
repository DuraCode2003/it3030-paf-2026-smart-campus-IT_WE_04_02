package com.smartcampus.mapper;

import com.smartcampus.dto.response.*;
import com.smartcampus.model.entity.*;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class SmartMapper {

    public UserResponse toUserResponse(User user) {
        if (user == null) return null;
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .picture(user.getPicture())
                .role(user.getRole())
                .build();
    }

    public ResourceResponse toResourceResponse(Resource resource) {
        if (resource == null) return null;
        return ResourceResponse.builder()
                .id(resource.getId())
                .name(resource.getName())
                .type(resource.getType())
                .capacity(resource.getCapacity())
                .location(resource.getLocation())
                .description(resource.getDescription())
                .status(resource.getStatus())
                .availabilityWindows(resource.getAvailabilityWindows() != null ? 
                        resource.getAvailabilityWindows().stream()
                        .map(this::toAvailabilityResponse)
                        .collect(Collectors.toList()) : null)
                .build();
    }

    public ResourceResponse.AvailabilityResponse toAvailabilityResponse(ResourceAvailability availability) {
        return ResourceResponse.AvailabilityResponse.builder()
                .id(availability.getId())
                .dayOfWeek(availability.getDayOfWeek())
                .startTime(availability.getStartTime())
                .endTime(availability.getEndTime())
                .build();
    }

    public BookingResponse toBookingResponse(Booking booking) {
        if (booking == null) return null;
        return BookingResponse.builder()
                .id(booking.getId())
                .resourceId(booking.getResource().getId())
                .resourceName(booking.getResource().getName())
                .userId(booking.getUser().getId())
                .userName(booking.getUser().getName())
                .startDateTime(booking.getStartDateTime())
                .endDateTime(booking.getEndDateTime())
                .purpose(booking.getPurpose())
                .expectedAttendees(booking.getExpectedAttendees())
                .status(booking.getStatus())
                .adminNote(booking.getAdminNote())
                .createdAt(booking.getCreatedAt())
                .updatedAt(booking.getUpdatedAt())
                .build();
    }

    public TicketResponse toTicketResponse(IncidentTicket ticket) {
        if (ticket == null) return null;
        return TicketResponse.builder()
                .id(ticket.getId())
                .resourceId(ticket.getResource() != null ? ticket.getResource().getId() : null)
                .resourceName(ticket.getResource() != null ? ticket.getResource().getName() : null)
                .location(ticket.getLocation())
                .category(ticket.getCategory())
                .description(ticket.getDescription())
                .priority(ticket.getPriority())
                .status(ticket.getStatus())
                .reportedBy(toUserResponse(ticket.getReportedBy()))
                .assignedTo(toUserResponse(ticket.getAssignedTo()))
                .rejectionReason(ticket.getRejectionReason())
                .resolutionNotes(ticket.getResolutionNotes())
                .attachments(ticket.getAttachments() != null ? ticket.getAttachments().stream()
                        .map(this::toAttachmentResponse)
                        .collect(Collectors.toList()) : null)
                .createdAt(ticket.getCreatedAt())
                .updatedAt(ticket.getUpdatedAt())
                .build();
    }

    public TicketResponse.AttachmentResponse toAttachmentResponse(TicketAttachment attachment) {
        return TicketResponse.AttachmentResponse.builder()
                .id(attachment.getId())
                .fileUrl(attachment.getFileUrl())
                .originalFilename(attachment.getOriginalFilename())
                .uploadedAt(attachment.getUploadedAt())
                .build();
    }

    public CommentResponse toCommentResponse(Comment comment) {
        if (comment == null) return null;
        return CommentResponse.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .author(toUserResponse(comment.getAuthor()))
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .build();
    }

    public NotificationResponse toNotificationResponse(Notification notification) {
        if (notification == null) return null;
        return NotificationResponse.builder()
                .id(notification.getId())
                .type(notification.getType())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .referenceId(notification.getReferenceId())
                .referenceType(notification.getReferenceType())
                .isRead(notification.isRead())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}
