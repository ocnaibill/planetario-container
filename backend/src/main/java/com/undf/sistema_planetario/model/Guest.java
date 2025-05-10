package com.undf.sistema_planetario.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "visitantes")
@DiscriminatorValue("GUEST")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Guest extends Visitor {
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String cpf;
    @Column(nullable = false)
    private String email;

    private String ethnicity;
    private String genre;
    private LocalDate birthDate;

    private String nationality;
    private String country;
    private String state;
    private String city;
}
