package com.smartcampus.service;

import com.smartcampus.dto.request.BookingActionRequest;
import com.smartcampus.dto.request.BookingRequest;
import com.smartcampus.dto.response.BookingResponse;
import com.smartcampus.exception.BookingConflictException;
import com.smartcampus.exception.BookingNotFoundException;
import com.smartcampus.exception.InvalidStateException;
import com.smartcampus.exception.ResourceNotFoundException;
import com.smartcampus.mapper.SmartMapper;
import com.smartcampus.model.entity.Booking;
import com.smartcampus.model.entity.Resource;
import com.smartcampus.model.entity.User;
import com.smartcampus.model.enums.BookingStatus;
import com.smartcampus.model.enums.UserRole;
import com.smartcampus.repository.BookingRepository;
import com.smartcampus.repository.ResourceRepository;
import com.smartcampus.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ResourceRepository resourceRepository;
    private final UserRepository userRepository;
    private final SmartMapper mapper;

    @Transactional(readOnly = true)
    public Page<BookingResponse> getBookings(
            UUID currentUserId, UserRole role, BookingStatus status, UUID resourceId, 
            LocalDateTime start, LocalDateTime end, Pageable pageable) {
        
        UUID userIdFilter = (role == UserRole.ADMIN) ? null : currentUserId;
        
        return bookingRepository.findAllWithFilters(status, resourceId, userIdFilter, start, end, pageable)
                .map(mapper::toBookingResponse);
    }

    @Transactional(readOnly = true)
    public BookingResponse getBookingById(UUID id, UUID currentUserId, UserRole role) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new BookingNotFoundException("Booking not found with id: " + id));

        if (role != UserRole.ADMIN && !booking.getUser().getId().equals(currentUserId)) {
            throw new InvalidStateException("You do not have permission to view this booking");
        }

        return mapper.toBookingResponse(booking);
    }

    @Transactional
    public BookingResponse createBooking(UUID currentUserId, BookingRequest request) {
        Resource resource = resourceRepository.findById(request.getResourceId())
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found"));

        User user = userRepository.findById(currentUserId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Conflict check
        boolean hasConflict = bookingRepository.existsConflictingBooking(
                request.getResourceId(),
                request.getStartDateTime(),
                request.getEndDateTime(),
                List.of(BookingStatus.PENDING, BookingStatus.APPROVED),
                null
        );

        if (hasConflict) {
            throw new BookingConflictException("The selected resource is already booked for this time period");
        }

        Booking booking = Booking.builder()
                .resource(resource)
                .user(user)
                .startDateTime(request.getStartDateTime())
                .endDateTime(request.getEndDateTime())
                .purpose(request.getPurpose())
                .expectedAttendees(request.getExpectedAttendees())
                .status(BookingStatus.PENDING)
                .build();

        return mapper.toBookingResponse(bookingRepository.save(booking));
    }

    @Transactional
    public BookingResponse approveBooking(UUID id, BookingActionRequest request) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new BookingNotFoundException("Booking not found"));

        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new InvalidStateException("Can only approve pending bookings");
        }

        booking.setStatus(BookingStatus.APPROVED);
        booking.setAdminNote(request.getNote());
        return mapper.toBookingResponse(bookingRepository.save(booking));
    }

    @Transactional
    public BookingResponse rejectBooking(UUID id, BookingActionRequest request) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new BookingNotFoundException("Booking not found"));

        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new InvalidStateException("Can only reject pending bookings");
        }

        booking.setStatus(BookingStatus.REJECTED);
        booking.setAdminNote(request.getNote());
        return mapper.toBookingResponse(bookingRepository.save(booking));
    }

    @Transactional
    public BookingResponse cancelBooking(UUID id, UUID currentUserId) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new BookingNotFoundException("Booking not found"));

        if (!booking.getUser().getId().equals(currentUserId)) {
            throw new InvalidStateException("You can only cancel your own bookings");
        }

        if (booking.getStatus() != BookingStatus.PENDING && booking.getStatus() != BookingStatus.APPROVED) {
            throw new InvalidStateException("Cannot cancel a booking that is already rejected or cancelled");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        return mapper.toBookingResponse(bookingRepository.save(booking));
    }
}
