package com.undf.sistema_planetario.validator.constraint;

import com.undf.sistema_planetario.validator.EmailMatchesForGuestValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = EmailMatchesForGuestValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface EmailMatchesForGuest {
    String message() default "Os campos de email precisam ser iguais.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
