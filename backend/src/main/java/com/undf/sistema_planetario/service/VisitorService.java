package com.undf.sistema_planetario.service;

import com.undf.sistema_planetario.exception.ResourceNotFoundException;
import com.undf.sistema_planetario.model.Visitor;
import com.undf.sistema_planetario.repository.GuestRepository;
import com.undf.sistema_planetario.repository.VisitorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitorService {

    @Autowired
    VisitorRepository visitorRepository;

    @Autowired
    GuestRepository guestRepository;

    public Visitor getVisitorById(Long visitorId) {
        return visitorRepository.findById(visitorId)
                .orElseThrow(() -> new ResourceNotFoundException("Nenhum visitante foi encontrado com o id: " + visitorId));
    }

    public List<Visitor> getAllVisitors() {
        return visitorRepository.findAll();
    }
}
