package com.undf.sistema_planetario.controller;

import com.undf.sistema_planetario.dto.TicketRequestDto;
import com.undf.sistema_planetario.dto.TicketResponseDto;
import com.undf.sistema_planetario.exception.ResourceNotFoundException;
import com.undf.sistema_planetario.exception.TicketAlreadyEmittedException;
import com.undf.sistema_planetario.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    @Autowired
    private TicketService ticketService;

    @PostMapping()
    ResponseEntity<TicketResponseDto> emitTicket(@Valid @RequestBody TicketRequestDto ticketRequestDto) {
        try {
            TicketResponseDto savedTicket = ticketService.createTicket(ticketRequestDto);

            return new ResponseEntity<>(savedTicket, HttpStatus.CREATED);
        } catch(TicketAlreadyEmittedException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{user_id}")
    ResponseEntity<List<TicketResponseDto>> getMyTickets(@PathVariable Long user_id) {
        try {
            List<TicketResponseDto> savedTickets = ticketService.getAllUserTickets(user_id);
            return new ResponseEntity<>(savedTickets, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{ticket_code}")
    ResponseEntity<TicketResponseDto> approveTicket(@PathVariable("ticket_code") String ticketCode) {
        TicketResponseDto updatedTicket = ticketService.approveTicket(ticketCode);
        return new ResponseEntity<>(updatedTicket, HttpStatus.ACCEPTED);
    }
}
