package com.undf.sistema_planetario.listener;

import com.undf.sistema_planetario.dto.EmailDto;
import com.undf.sistema_planetario.dto.TicketRequestDto;
import com.undf.sistema_planetario.dto.TicketResponseDto;
import com.undf.sistema_planetario.event.GuestCreatedEvent;
import com.undf.sistema_planetario.service.EmailService;
import com.undf.sistema_planetario.service.EmailTemplateService;
import com.undf.sistema_planetario.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Component
public class HandleGuestCreatedListener {
    @Autowired
    EmailService emailService;

    @Autowired
    TicketService ticketService;

    @Autowired
    EmailTemplateService templateService;

    @EventListener
    public void handleGuestCreatedEvent(GuestCreatedEvent event) {
        try{
            Map<String, Object> variables = new HashMap<>();
            String subject = "Bem-vindo ao Planetário de Brasília!";

            TicketRequestDto request = new TicketRequestDto(event.getId(), LocalDate.now());
            TicketResponseDto guestTicket = ticketService.createTicket(request);

            variables.put("name", event.getName());
            variables.put("qr-code-path", guestTicket.getQrCodePath());
            String template = templateService.renderTemplate("welcome-template" ,variables);

            emailService.sendEmail(new EmailDto(event.getEmail(), subject), template);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
