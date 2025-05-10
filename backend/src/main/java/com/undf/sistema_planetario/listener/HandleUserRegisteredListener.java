package com.undf.sistema_planetario.listener;

import com.undf.sistema_planetario.dto.EmailDto;
import com.undf.sistema_planetario.event.UserRegisteredEvent;
import com.undf.sistema_planetario.service.EmailService;
import com.undf.sistema_planetario.service.EmailTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class HandleUserRegisteredListener {
    @Autowired
    private EmailService emailService;

    @Autowired
    private EmailTemplateService templateService;

    @EventListener
    public void handleUserRegisteredEvent(UserRegisteredEvent event) {
        try{
            Map<String, Object> variables = new HashMap<>();
            String subject = "Bem-vindo ao Planetário de Brasília!";

            variables.put("name", event.getName());
            String template = templateService.renderTemplate("welcome-template" ,variables);

            emailService.sendEmail(new EmailDto(event.getEmail(), subject), template);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
