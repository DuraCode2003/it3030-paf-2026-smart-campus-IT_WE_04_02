package com.smartcampus.controller;

import com.smartcampus.dto.request.BookingActionRequest;
import com.smartcampus.dto.request.BookingRequest;
import com.smartcampus.dto.response.BookingResponse;
import com.smartcampus.model.enums.BookingStatus;
import com.smartcampus.model.enums.UserRole;
import com.smartcampus.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
@Tag(name = "Booking Management", description = "Endpoints for resource reservations")
public class BookingController {

    private final BookingService bookingService;

    @GetMapping
    @Operation(summary = "List bookings with filtering", description = "Users see own, Admins see all")
    public ResponseEntity<Page<BookingResponse>> getBookings(
            @RequestHeader("X-User-Id") UUID userId,
            @RequestHeader("X-User-Role") UserRole role,
            @RequestParam(required = false) BookingStatus status,
            @RequestParam(required = false) UUID resourceId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end,
            Pageable pageable) {
        return ResponseEntity.ok(bookingService.getBookings(userId, role, status, resourceId, start, end, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get booking detail", description = "Owner or Admin only")
    public ResponseEntity<BookingResponse> getBookingById(
            @PathVariable UUID id,
            @RequestHeader("X-User-Id") UUID userId,
            @RequestHeader("X-User-Role") UserRole role) {
        return ResponseEntity.ok(bookingService.getBookingById(id, userId, role));
    }

    @PostMapping
    @Operation(summary = "Create a booking request", description = "Authenticated users")
    @ApiResponse(responseCode = "201", description = "Booking requested successfully")
    @ApiResponse(responseCode = "409", description = "Scheduling conflict detected")
    public ResponseEntity<BookingResponse> createBooking(
            @RequestHeader("X-User-Id") UUID userId,
            @Valid @RequestBody BookingRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookingService.createBooking(userId, request));
    }

    @PatchMapping("/{id}/approve")
    @Operation(summary = "Approve a booking", description = "Admin only")
    public ResponseEntity<BookingResponse> approveBooking(
            @PathVariable UUID id,
            @RequestBody(required = false) BookingActionRequest request) {
        return ResponseEntity.ok(bookingService.approveBooking(id, request != null ? request : new BookingActionRequest()));
    }

    @PatchMapping("/{id}/reject")
    @Operation(summary = "Reject a booking", description = "Admin only")
    public ResponseEntity<BookingResponse> rejectBooking(
            @PathVariable UUID id,
            @RequestBody BookingActionRequest request) {
        return ResponseEntity.ok(bookingService.rejectBooking(id, request));
    }

    @PatchMapping("/{id}/cancel")
    @Operation(summary = "Cancel a booking", description = "Owner only")
    public ResponseEntity<BookingResponse> cancelBooking(
            @PathVariable UUID id,
            @RequestHeader("X-User-Id") UUID userId) {
        return ResponseEntity.ok(bookingService.cancelBooking(id, userId));
    }
}
