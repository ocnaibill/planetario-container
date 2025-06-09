package com.undf.sistema_planetario.controller;

import com.undf.sistema_planetario.dto.LoginRequestDto;
import com.undf.sistema_planetario.dto.LoginResponseDto;
import com.undf.sistema_planetario.dto.UserRequestDto;
import com.undf.sistema_planetario.dto.UserResponseDto;
import com.undf.sistema_planetario.exception.UnauthorizedException;
import com.undf.sistema_planetario.exception.UserAlreadyExistsException;
import com.undf.sistema_planetario.model.User;
import com.undf.sistema_planetario.security.TokenService;
import com.undf.sistema_planetario.service.AuthService;
import com.undf.sistema_planetario.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.apache.tomcat.util.http.SameSiteCookies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @Autowired
    private TokenService tokenService;

    @PostMapping("login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody @Valid LoginRequestDto data, HttpServletResponse response) {
        var userPassword = new UsernamePasswordAuthenticationToken(data.getEmail(), data.getPassword());
        var auth = this.authenticationManager.authenticate(userPassword);

        var user = (User) auth.getPrincipal();
        var token = tokenService.generateToken(new LoginRequestDto(user.getEmail(), user.getPassword()));
        ResponseCookie cookie = ResponseCookie.from("auth-token", token)
                .httpOnly(true)
               // .secure(true) deve ser mantido quando estabelecermos uma conexão https
                .path("/")
                .maxAge(3600)
                .sameSite(SameSiteCookies.STRICT.toString())
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return new ResponseEntity<>(new LoginResponseDto(data.getEmail(), user.getAuthorities()), HttpStatus.OK);
    }

    @PostMapping("validate")
    public ResponseEntity<LoginResponseDto> validate(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            throw new UnauthorizedException("Usuário não encontrado.");
        }

        LoginResponseDto user = new LoginResponseDto(userDetails.getUsername(), userDetails.getAuthorities());
        return ResponseEntity.ok(user);
    }
    @PostMapping("register")
    public ResponseEntity<UserResponseDto> register(@Valid @RequestBody UserRequestDto userRequest) {
        this.authService.findUserByEmail(userRequest.getEmail()).ifPresent(user -> {
            throw new UserAlreadyExistsException("O e-mail informado já está em uso.");
        });

        UserResponseDto user = userService.createUser(userRequest);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping("logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("auth-token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);

        return ResponseEntity.ok("Logout realizado com sucesso");
    }
}
