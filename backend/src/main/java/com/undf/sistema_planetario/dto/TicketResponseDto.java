package com.undf.sistema_planetario.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class TicketResponseDto {
    private final String ticketCode;
    private final LocalDate visitDate;
    private final String qrCodePath;
}
