package com.smartcampus.repository;

import com.smartcampus.model.entity.Booking;
import com.smartcampus.model.enums.BookingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {

    @Query("SELECT b FROM Booking b WHERE " +
            "(:status IS NULL OR b.status = :status) AND " +
            "(:resourceId IS NULL OR b.resource.id = :resourceId) AND " +
            "(:userId IS NULL OR b.user.id = :userId) AND " +
            "(:startDate IS NULL OR b.startDateTime >= :startDate) AND " +
            "(:endDate IS NULL OR b.endDateTime <= :endDate)")
    Page<Booking> findAllWithFilters(
            @Param("status") BookingStatus status,
            @Param("resourceId") UUID resourceId,
            @Param("userId") UUID userId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            Pageable pageable);

    @Query("SELECT COUNT(b) > 0 FROM Booking b WHERE " +
            "b.resource.id = :resourceId AND " +
            "b.status IN :activeStatuses AND " +
            "b.startDateTime < :end AND " +
            "b.endDateTime > :start AND " +
            "(:excludeBookingId IS NULL OR b.id != :excludeBookingId)")
    boolean existsConflictingBooking(
            @Param("resourceId") UUID resourceId,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end,
            @Param("activeStatuses") List<BookingStatus> activeStatuses,
            @Param("excludeBookingId") UUID excludeBookingId);

    List<Booking> findByUserId(UUID userId);
}
