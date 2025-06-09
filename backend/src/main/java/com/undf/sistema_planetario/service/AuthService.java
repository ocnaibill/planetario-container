package com.undf.sistema_planetario.service;

import com.undf.sistema_planetario.dto.UserRequestDto;
import com.undf.sistema_planetario.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Nenhum usuário associado ao email informado: " + email));
    }

    public Optional<UserDetails> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
