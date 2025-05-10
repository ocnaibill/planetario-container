package com.undf.sistema_planetario.controller;

import com.undf.sistema_planetario.model.Visitor;
import com.undf.sistema_planetario.service.VisitorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/visitors")
public class VisitorController {
    @Autowired
    private VisitorService visitorService;

    @GetMapping("/")
    ResponseEntity<List<Visitor>> getAllVisitors() {
        List<Visitor> visitors = visitorService.getAllVisitors();

        return new ResponseEntity<>(visitors, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    ResponseEntity<Visitor> getVisitorById(@Valid @PathVariable("id") Long visitorId) {
        Visitor visitor = visitorService.getVisitorById(visitorId);

        return new ResponseEntity<>(visitor, HttpStatus.OK);
    }
}
