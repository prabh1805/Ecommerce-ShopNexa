package com.example.ecommerce_backend.controllers;

import com.example.ecommerce_backend.dto.AuthRequest;
import com.example.ecommerce_backend.dto.AuthResponse;
import com.example.ecommerce_backend.dto.UserResponse;
import com.example.ecommerce_backend.models.User;
import com.example.ecommerce_backend.service.JwtService;
import com.example.ecommerce_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // 🔐 LOGIN
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody AuthRequest request
    ) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        String token = jwtService.generateToken(user);

        return ResponseEntity.ok(
                new AuthResponse(token, UserResponse.from(user))
        );
    }

    // 📝 REGISTER
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @RequestBody User user
    ) {
        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        userRepository.save(user);

        String token = jwtService.generateToken(user);

        return ResponseEntity.ok(
                new AuthResponse(token, UserResponse.from(user))
        );
    }
}
