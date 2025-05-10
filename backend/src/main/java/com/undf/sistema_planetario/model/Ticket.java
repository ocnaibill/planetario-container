package com.undf.sistema_planetario.model;


import com.undf.sistema_planetario.model.enums.TicketState;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Entity
@Table(name = "ingressos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, name = "codigo_ingresso")
    private String ticketCode;

    @ManyToOne
    @JoinColumn(name = "visitor_id", nullable = false)
    private Visitor visitor;

    @Column(name = "data_visita",nullable = false, updatable = false)
    private LocalDate visitDate;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDate createdAt;

    @Column(name = "caminho_qrcode",nullable = false)
    private String qrCodePath;

    @Column(name = "estado", nullable = false)
    private TicketState state;
}
