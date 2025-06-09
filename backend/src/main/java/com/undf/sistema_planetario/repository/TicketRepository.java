package com.undf.sistema_planetario.repository;

import com.undf.sistema_planetario.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Optional<Ticket> findByTicketCode(String ticketCode);

    Optional<List<Ticket>> findAllByVisitorId(Long id);

    Boolean existsByVisitorIdAndVisitDate(Long visitorId, LocalDate createdAt);
}
