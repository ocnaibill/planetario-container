package com.undf.sistema_planetario.controller;

import com.undf.sistema_planetario.dto.UserRequestDto;
import com.undf.sistema_planetario.dto.UserResponseDto;
import com.undf.sistema_planetario.service.UserService;
import jakarta.servlet.ServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping()
    ResponseEntity<List<UserResponseDto>> getAllUsers() {
        List<UserResponseDto> savedUsers = service.getAllUsers();

        return new ResponseEntity<>(savedUsers, HttpStatus.OK);
    }

    @GetMapping("/me")
    ResponseEntity<UserResponseDto> getAuthenticatedUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserResponseDto savedUser = service.getUserByEmail(email);

        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    ResponseEntity<UserResponseDto> getUserByID(@PathVariable("id")Long UserId) {
        UserResponseDto savedUsers = service.getUserById(UserId);

        return new ResponseEntity<>(savedUsers, HttpStatus.OK);
    }
}
