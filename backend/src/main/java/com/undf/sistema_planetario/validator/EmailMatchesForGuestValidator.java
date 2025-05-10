package com.undf.sistema_planetario.validator;

import com.undf.sistema_planetario.dto.GuestRequestDto;
import com.undf.sistema_planetario.validator.constraint.EmailMatchesForGuest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EmailMatchesForGuestValidator implements ConstraintValidator<EmailMatchesForGuest, Object> {
    @Override
    public void initialize(EmailMatchesForGuest constraintAnnotation) {
    }

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext constraintValidatorContext) {
        GuestRequestDto guest = (GuestRequestDto) obj;

        return guest.getEmail() != null && guest.getEmail().equals(guest.getConfirmEmail());
    }
}
