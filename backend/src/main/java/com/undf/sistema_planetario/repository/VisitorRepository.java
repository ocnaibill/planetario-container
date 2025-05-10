package com.undf.sistema_planetario.repository;

import com.undf.sistema_planetario.model.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitorRepository extends JpaRepository<Visitor, Long> {
}
