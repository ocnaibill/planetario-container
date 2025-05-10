package com.undf.sistema_planetario.validator.constraint;

import com.undf.sistema_planetario.validator.EmailMatchesForUserValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = EmailMatchesForUserValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface EmailMatchesForUser {
    String message() default "Os campos de email precisam ser iguais.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
