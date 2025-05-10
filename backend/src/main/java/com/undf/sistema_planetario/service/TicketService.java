package com.undf.sistema_planetario.service;

import com.undf.sistema_planetario.dto.TicketRequestDto;
import com.undf.sistema_planetario.dto.TicketResponseDto;
import com.undf.sistema_planetario.exception.InvalidTicketException;
import com.undf.sistema_planetario.exception.ResourceNotFoundException;
import com.undf.sistema_planetario.exception.TicketAlreadyEmittedException;
import com.undf.sistema_planetario.mapper.TicketMapper;
import com.undf.sistema_planetario.model.Ticket;
import com.undf.sistema_planetario.model.Visitor;
import com.undf.sistema_planetario.model.enums.TicketState;
import com.undf.sistema_planetario.repository.TicketRepository;
import com.undf.sistema_planetario.repository.VisitorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class TicketService {

    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    VisitorRepository visitorRepository;

    public TicketResponseDto createTicket(TicketRequestDto ticketRequest) {
        LocalDate startDay = ticketRequest.getVisitDate();
        LocalDate endDay = startDay.plusDays(1);

        if(ticketRepository.existsByVisitorIdAndCreatedAtBetween(ticketRequest.getVisitorId(), startDay, endDay)){
            throw new TicketAlreadyEmittedException("Ingresso já emitido no dia de hoje.");
        }

        Visitor visitor = visitorRepository.findById(ticketRequest.getVisitorId())
                .orElseThrow(() -> new IllegalStateException("Nenhum visitante encontrado com o ID informado."));

        Ticket ticket = new Ticket();
        String ticketCode = UUID.randomUUID().toString();

        try {
            ticket.setVisitor(visitor);
            ticket.setState(TicketState.EMITTED);
            ticket.setVisitDate(ticketRequest.getVisitDate());
            ticket.setTicketCode(ticketCode);
            ticket.setQrCodePath(QrCodeService.createQrCode(ticketCode,
                                                            String.format("ticket-%s", ticketCode),
                                                            500, 500));
        } catch (Exception e) {
            System.out.println("Erro ao gerar QR Code: " + e.getMessage());
        }

        Ticket savedTicket = ticketRepository.save(ticket);
        return TicketMapper.INSTANCE.toDto(savedTicket);
    }

    public TicketResponseDto getTicketByCode(String ticketCode) {
        Ticket savedTicket = ticketRepository.findByTicketCode(ticketCode)
                .orElseThrow(() -> new ResourceNotFoundException("Ingresso não existente!"));

        return TicketMapper.INSTANCE.toDto(savedTicket);
    }

    public List<TicketResponseDto> getAllUserTickets(Long id) {
        List<Ticket> tickets = ticketRepository.findAllByVisitorId(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não possui ingressos."));

        return TicketMapper.INSTANCE.toListDto(tickets);
    }

    public TicketResponseDto approveTicket(String ticketCode) {
        Ticket savedTicket = ticketRepository.findByTicketCode(ticketCode)
                .orElseThrow(() -> new ResourceNotFoundException("Ingresso não existente!"));

        if(savedTicket.getState() != TicketState.EMITTED){
            throw new InvalidTicketException("O ingresso informado não é mais válido para aprovação!");
        }

        savedTicket.setState(TicketState.APPROVED);
        Ticket updatedTicket = ticketRepository.save(savedTicket);

        return TicketMapper.INSTANCE.toDto(updatedTicket);
    }
}
