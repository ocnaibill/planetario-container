package com.undf.sistema_planetario.dto;

import com.undf.sistema_planetario.validator.constraint.EmailMatchesForGuest;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.validator.constraints.br.CPF;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@EmailMatchesForGuest
public class GuestRequestDto {
    @NotBlank(message = "O nome deve ser preenchido.")
    private final String name;
    @CPF(message = "CPF inválido.")
    private final String cpf;
    @Email(message = "E-mail inválido.")
    private final String email;
    @Email(message = "Confirmação do E-mail inválida.")
    private final String confirmEmail;

    @NotBlank(message = "A etnia deve ser preenchida.")
    private final String ethnicity;
    @NotBlank(message = "O gênero deve ser preenchido.")
    private final String genre;
    @PastOrPresent(message = "Data inválida.")
    private final LocalDate birthDate;

    @NotBlank(message = "A nacionalidade deve ser preenchida.")
    private final String nationality;
    @NotBlank(message = "O país deve ser preenchido.")
    private final String country;
    @NotBlank(message = "O estado deve ser preenchido.")
    private final String state;
    @NotBlank(message = "A cidade deve ser preenchida.")
    private final String city;
}
