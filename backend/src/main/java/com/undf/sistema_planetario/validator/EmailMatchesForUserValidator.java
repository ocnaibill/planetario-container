package com.undf.sistema_planetario.validator;

import com.undf.sistema_planetario.dto.UserRequestDto;
import com.undf.sistema_planetario.validator.constraint.EmailMatchesForUser;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;



public class EmailMatchesForUserValidator implements ConstraintValidator<EmailMatchesForUser, Object> {

    @Override
    public void initialize(EmailMatchesForUser constraintAnnotation) {
    }

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext constraintValidatorContext) {
        UserRequestDto user = (UserRequestDto) obj;

        return user.getEmail() != null && user.getEmail().equals(user.getConfirmEmail());
    }
}
