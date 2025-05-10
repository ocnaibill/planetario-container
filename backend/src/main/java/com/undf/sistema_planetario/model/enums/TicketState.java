package com.undf.sistema_planetario.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TicketState {
    APPROVED("approved"),
    EMITTED("emitted"),
    EXPIRED("expired");

    private final String state;
}
