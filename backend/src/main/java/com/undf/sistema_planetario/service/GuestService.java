package com.undf.sistema_planetario.service;

import com.undf.sistema_planetario.dto.GuestRequestDto;
import com.undf.sistema_planetario.dto.GuestResponseDto;
import com.undf.sistema_planetario.event.GuestCreatedEvent;
import com.undf.sistema_planetario.exception.ResourceNotFoundException;
import com.undf.sistema_planetario.exception.UserAlreadyExistsException;
import com.undf.sistema_planetario.mapper.GuestMapper;
import com.undf.sistema_planetario.model.Guest;
import com.undf.sistema_planetario.repository.GuestRepository;
import com.undf.sistema_planetario.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GuestService {

    @Autowired
    GuestRepository guestRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ApplicationEventPublisher publisher;

    public GuestResponseDto createGuest(GuestRequestDto guestDto) {
        userRepository.findByEmail(guestDto.getEmail())
                .ifPresent(user -> {
                    throw new UserAlreadyExistsException("Já existe um usuário associado a esse email.");
                });

        Guest guest = GuestMapper.INSTANCE.toEntity(guestDto);
        Guest savedGuest = guestRepository.save(guest);

        publisher.publishEvent(new GuestCreatedEvent(savedGuest.getId(), savedGuest.getName(), savedGuest.getEmail()));
        return GuestMapper.INSTANCE.toResponseDto(savedGuest);
    }

    public GuestResponseDto getGuestById(Long guestId) {
        Guest guest = guestRepository.findById(guestId)
                        .orElseThrow(() -> new ResourceNotFoundException("Nenhum usuário foi encontrado com o id: " + guestId));

        return GuestMapper.INSTANCE.toResponseDto(guest);
    }

    public List<GuestResponseDto> getAllGuests() {
        List<Guest> guests = guestRepository.findAll();

        return guests.stream().map(GuestMapper.INSTANCE::toResponseDto)
                .collect(Collectors.toList());
    }
}
