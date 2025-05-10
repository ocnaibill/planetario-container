package com.undf.sistema_planetario.validator;

import com.undf.sistema_planetario.dto.UserRequestDto;
import com.undf.sistema_planetario.validator.constraint.PasswordMatchesForUser;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;



public class PasswordMatchesForUserValidator implements ConstraintValidator<PasswordMatchesForUser, Object> {

    @Override
    public void initialize(PasswordMatchesForUser constraintAnnotation) {
    }

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext constraintValidatorContext) {
        UserRequestDto user = (UserRequestDto) obj;

        return user.getPassword() != null && user.getPassword().equals(user.getConfirmPassword());
    }
}
