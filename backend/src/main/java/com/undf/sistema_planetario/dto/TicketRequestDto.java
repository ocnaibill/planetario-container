package com.undf.sistema_planetario.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TicketRequestDto {
    @NotNull(message = "O ID do visitante deve ser informado!")
    private Long visitorId;
    @NotNull(message = "A data da visita deve ser preenchida!")
    @FutureOrPresent(message = "A data não pode ser passada!")
    private LocalDate visitDate;
}
