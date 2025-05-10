package com.undf.sistema_planetario.service;

import com.undf.sistema_planetario.dto.UserRequestDto;
import com.undf.sistema_planetario.dto.UserResponseDto;
import com.undf.sistema_planetario.event.UserRegisteredEvent;
import com.undf.sistema_planetario.exception.ResourceNotFoundException;
import com.undf.sistema_planetario.mapper.UserMapper;
import com.undf.sistema_planetario.model.User;
import com.undf.sistema_planetario.model.enums.UserRole;
import com.undf.sistema_planetario.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ApplicationEventPublisher publisher;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserResponseDto createUser(UserRequestDto userDto){
        User user = UserMapper.INSTANCE.toEntity(userDto);

        String passwordEncrypted = passwordEncoder.encode(userDto.getPassword());
        user.setPassword(passwordEncrypted);
        user.setRole(UserRole.USER);

        User savedUser = userRepository.save(user);
        publisher.publishEvent(new UserRegisteredEvent(savedUser.getEmail(), savedUser.getName()));

        return UserMapper.INSTANCE.toResponseDto(savedUser);
    }

    public UserResponseDto getUserById(Long userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Nenhum usuário foi encontrado"));
        return UserMapper.INSTANCE.toResponseDto(user);
    }

    public List<UserResponseDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(UserMapper.INSTANCE::toResponseDto).collect(Collectors.toList());
    }

    public UserResponseDto getUserByEmail(String email){
        UserDetails savedUser = userRepository.findByEmail(email);
        return UserMapper.INSTANCE.toResponseDto((User) savedUser);
    }
}
