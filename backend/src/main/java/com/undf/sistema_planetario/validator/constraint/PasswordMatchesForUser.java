package com.undf.sistema_planetario.validator.constraint;

import com.undf.sistema_planetario.validator.PasswordMatchesForUserValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = PasswordMatchesForUserValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface PasswordMatchesForUser {
    String message() default "Os campos de senha precisam ser iguais.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
