package com.example.usermanagement.controller;

import com.example.usermanagement.dto.request.*;
import com.example.usermanagement.dto.response.AuthResponse;
import com.example.usermanagement.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@Tag(name = "Authentification")
public class AuthController {

    private final AuthService authService;
    private final PasswordEncoder passwordEncoder;
    @PostMapping("/login")
    @Operation(summary = "Connexion — retourne un JWT token")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest req) {
        return ResponseEntity.ok(authService.login(req));
    }

    @PostMapping("/register")
    @Operation(summary = "Créer un compte")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest req) {
        return ResponseEntity.ok(authService.register(req));
    }
    @GetMapping("/encode")
    public String encode(@RequestParam String pwd) {
        return passwordEncoder.encode(pwd);
    }
}