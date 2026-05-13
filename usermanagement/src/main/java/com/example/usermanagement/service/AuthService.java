package com.example.usermanagement.service;

import com.example.usermanagement.dto.request.*;
import com.example.usermanagement.dto.response.AuthResponse;
import com.example.usermanagement.entity.*;
import com.example.usermanagement.repository.*;
import com.example.usermanagement.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authManager;
    private final UtilisateurRepository utilisateurRepo;
    private final RoleRepository roleRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuditService auditService;

    public AuthResponse login(LoginRequest req) {
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            req.getEmail(),
                            req.getMotDePasse()
                    )
            );
        } catch (Exception e) {
            // ← شوف هذا في console
            System.out.println("AUTH ERROR: " + e.getMessage());
            throw e;
        }

        Utilisateur user = utilisateurRepo
                .findByEmail(req.getEmail())
                .orElseThrow();

        String token = jwtUtil.generateToken(user.getEmail());
        auditService.log(user.getEmail(), "LOGIN", "Connexion réussie");
        return new AuthResponse(token, user.getEmail(),
                user.getRole().getNom());
    }
    public String register(RegisterRequest req) {
        if (utilisateurRepo.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email déjà utilisé");
        }
        Role role = roleRepo.findById(req.getRoleId())
                .orElseThrow(() -> new RuntimeException("Rôle introuvable"));

        Utilisateur user = Utilisateur.builder()
                .nom(req.getNom())
                .email(req.getEmail())
                .motDePasse(passwordEncoder.encode(req.getMotDePasse()))
                .role(role)
                .actif(true)
                .build();
        utilisateurRepo.save(user);
        return "Utilisateur créé avec succès";
    }
}