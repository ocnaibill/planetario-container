package com.undf.sistema_planetario.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class EmailDto {
    private final String to;
    private final String subject;
}
