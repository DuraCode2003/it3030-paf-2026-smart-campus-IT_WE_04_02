package com.smartcampus.dto.response;

import com.smartcampus.model.enums.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {
    private UUID id;
    private UUID resourceId;
    private String resourceName;
    private UUID userId;
    private String userName;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private String purpose;
    private Integer expectedAttendees;
    private BookingStatus status;
    private String adminNote;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
