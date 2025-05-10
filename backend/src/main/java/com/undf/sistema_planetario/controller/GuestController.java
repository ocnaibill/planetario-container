package com.undf.sistema_planetario.controller;

import com.undf.sistema_planetario.dto.GuestRequestDto;
import com.undf.sistema_planetario.dto.GuestResponseDto;
import com.undf.sistema_planetario.service.GuestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guests")
public class GuestController {
    @Autowired
    private GuestService guestService;

    @PostMapping()
    ResponseEntity<GuestResponseDto> createGuest(@Valid @RequestBody GuestRequestDto guestRequestDto) {
        GuestResponseDto savedGuest = guestService.createGuest(guestRequestDto);

        return new ResponseEntity<>(savedGuest, HttpStatus.CREATED);
    }

    @GetMapping()
    ResponseEntity<List<GuestResponseDto>> getAllGuests() {
        List<GuestResponseDto> savedGuests = guestService.getAllGuests();

        return new ResponseEntity<>(savedGuests, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    ResponseEntity<GuestResponseDto> getGuestById(@PathVariable("id") Long GuestId) {
        GuestResponseDto savedGuest = guestService.getGuestById(GuestId);

        return new ResponseEntity<>(savedGuest, HttpStatus.OK);
    }
}
