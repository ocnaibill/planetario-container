package com.undf.sistema_planetario.dto;

import com.undf.sistema_planetario.model.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;


@Getter
@AllArgsConstructor
public class UserResponseDto {

    private final Long id;
    private final String name;
    private final String cpf;
    private final String email;

    private final String ethnicity;
    private final String genre;
    private final LocalDate birthDate;

    private final String nationality;
    private final String country;
    private final String state;
    private final String city;
}
