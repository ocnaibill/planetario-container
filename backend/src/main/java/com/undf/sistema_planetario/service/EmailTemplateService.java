package com.undf.sistema_planetario.service;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailTemplateService {

    private String loadEmailTemplate(String templateName) throws IOException {
        ClassPathResource resource = new ClassPathResource("email-templates/" + templateName + ".html");

        return new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
    }

    public String renderTemplate(String templateName, Map<String, Object> variables) throws IOException {
        String template = loadEmailTemplate(templateName);

        for(Map.Entry<String, Object> entry : variables.entrySet()) {
            template = template.replace("${{" + entry.getKey() + "}}", entry.getValue().toString());
        }

        return template;
    }
}
