package com.undf.sistema_planetario.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class GuestCreatedEvent {
    private final long id;
    private final String name;
    private final String email;
}
