package com.undf.sistema_planetario.dto;

import com.undf.sistema_planetario.validator.constraint.EmailMatchesForUser;
import com.undf.sistema_planetario.validator.constraint.PasswordMatchesForUser;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.validator.constraints.br.CPF;
import java.time.LocalDate;

@Getter
@AllArgsConstructor
@EmailMatchesForUser
@PasswordMatchesForUser
public class UserRequestDto {
    @NotBlank(message = "O nome deve ser preenchido")
    @Size(min = 5, max = 100, message = "O nome deve ter pelo menos 5 caracteres")
    private final String name;

    @NotBlank(message = "O CPF deve ser preenchido")
    @CPF(message = "CPF inválido")
    private final String cpf;

    @NotBlank(message = "O email deve ser preenchido")
    @Email(message = "Email inválido")
    private final String email;

    @Email(message = "Confirmação do E-mail inválida.")
    private final String confirmEmail;

    @NotBlank(message = "A senha deve ser preenchida")
    @Size(min = 8, message = "A senha deve ter pelo menos 8 caracteres")
    private final String password;

    @NotBlank(message = "A confirmação de senha deve ser preenchida")
    @Size(min = 8, message = "A confirmação de senha deve ter pelo menos 8 caracteres")
    private final String confirmPassword;

    @NotNull(message = "A etnia deve ser preenchida")
    private final String ethnicity;

    @NotNull(message = "O gênero deve ser preenchido")
    private final String genre;

    @Past(message = "A data de nascimento deve ser uma data no passado")
    private final LocalDate birthDate;

    @NotBlank(message = "A nacionalidade deve ser preenchida")
    private final String nationality;

    @NotBlank(message = "O país deve ser preenchido")
    private final String country;

    @NotBlank(message = "O estado deve ser preenchido")
    private final String state;

    @NotBlank(message = "A cidade deve ser preenchida")
    private final String city;
}
