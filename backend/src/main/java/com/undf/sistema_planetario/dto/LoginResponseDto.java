package com.undf.sistema_planetario.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Collection;

@Getter
@AllArgsConstructor
public class LoginResponseDto {
    private final String email;
    private final Collection<?> roles;
}
