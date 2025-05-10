package com.undf.sistema_planetario.repository;

import com.undf.sistema_planetario.model.Guest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestRepository extends JpaRepository<Guest, Long>{
}
