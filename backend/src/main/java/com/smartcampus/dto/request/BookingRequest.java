package com.smartcampus.dto.request;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class BookingRequest {

    @NotNull(message = "Resource ID is required")
    private UUID resourceId;

    @NotNull(message = "Start date time is required")
    @Future(message = "Start time must be in the future")
    private LocalDateTime startDateTime;

    @NotNull(message = "End date time is required")
    @Future(message = "End time must be in the future")
    private LocalDateTime endDateTime;

    @NotBlank(message = "Purpose is required")
    private String purpose;

    @Min(value = 1, message = "Expected attendees must be at least 1")
    private Integer expectedAttendees;
}
