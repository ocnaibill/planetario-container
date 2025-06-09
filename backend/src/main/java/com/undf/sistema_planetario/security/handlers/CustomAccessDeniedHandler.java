package com.undf.sistema_planetario.security.handlers;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request,
                       HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException {

        response.setStatus((HttpServletResponse.SC_FORBIDDEN));
        response.setContentType("application/json");

        response.getWriter().write(new ObjectMapper().writeValueAsString(
                Map.of(
                        "error", "Acesso negado.",
                        "message", "Você não tem permissão para acessar este recurso.",
                        "status", 403,
                        "timestamp", LocalDateTime.now().toString()
                )
        ));
    }
}
