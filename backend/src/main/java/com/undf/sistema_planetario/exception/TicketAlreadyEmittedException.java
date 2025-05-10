package com.undf.sistema_planetario.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class TicketAlreadyEmittedException extends RuntimeException {
    public TicketAlreadyEmittedException(String message) {
        super(message);
    }
}
