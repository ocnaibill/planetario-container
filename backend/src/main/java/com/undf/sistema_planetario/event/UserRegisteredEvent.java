package com.undf.sistema_planetario.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserRegisteredEvent {

    private final String email;
    private final String name;
}
