package com.undf.sistema_planetario.service;

import com.undf.sistema_planetario.dto.EmailDto;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    public void sendEmail(EmailDto email, String template) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("noreplay@planetario.com");

            helper.setSubject(email.getSubject());
            helper.setTo(email.getTo());

            helper.setText(template, true);

            mailSender.send(message);
        } catch (Exception ex) {
            System.out.println("Falha ao enviar o email: " + ex.getMessage());;
        }
    }
}
