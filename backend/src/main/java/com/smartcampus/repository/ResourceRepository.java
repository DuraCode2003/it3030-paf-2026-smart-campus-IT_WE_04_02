package com.smartcampus.repository;

import com.smartcampus.model.entity.Resource;
import com.smartcampus.model.enums.ResourceStatus;
import com.smartcampus.model.enums.ResourceType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, UUID> {

    @Query("SELECT r FROM Resource r WHERE " +
            "(:type IS NULL OR r.type = :type) AND " +
            "(:capacity IS NULL OR r.capacity >= :capacity) AND " +
            "(:location IS NULL OR LOWER(r.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
            "(:status IS NULL OR r.status = :status)")
    Page<Resource> findAllWithFilters(
            @Param("type") ResourceType type,
            @Param("capacity") Integer capacity,
            @Param("location") String location,
            @Param("status") ResourceStatus status,
            Pageable pageable);
}
