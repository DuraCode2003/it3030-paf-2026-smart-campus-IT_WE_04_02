package com.smartcampus.repository;

import com.smartcampus.model.entity.IncidentTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IncidentTicketRepository extends JpaRepository<IncidentTicket, UUID> {
}
