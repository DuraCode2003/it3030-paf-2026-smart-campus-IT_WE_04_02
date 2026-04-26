package com.smartcampus.dto.response;

import com.smartcampus.model.enums.IncidentCategory;
import com.smartcampus.model.enums.IncidentPriority;
import com.smartcampus.model.enums.IncidentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketResponse {
    private UUID id;
    private UUID resourceId;
    private String resourceName;
    private String location;
    private IncidentCategory category;
    private String description;
    private IncidentPriority priority;
    private IncidentStatus status;
    private UserResponse reportedBy;
    private UserResponse assignedTo;
    private String rejectionReason;
    private String resolutionNotes;
    private List<AttachmentResponse> attachments;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AttachmentResponse {
        private UUID id;
        private String fileUrl;
        private String originalFilename;
        private LocalDateTime uploadedAt;
    }
}
