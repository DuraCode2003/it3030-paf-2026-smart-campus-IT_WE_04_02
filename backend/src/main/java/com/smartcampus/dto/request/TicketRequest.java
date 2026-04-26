package com.smartcampus.dto.request;

import com.smartcampus.model.enums.IncidentCategory;
import com.smartcampus.model.enums.IncidentPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketRequest {
    private UUID resourceId;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Category is required")
    private IncidentCategory category;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Priority is required")
    private IncidentPriority priority;
}
