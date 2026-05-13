package com.example.usermanagement.service;

import com.example.usermanagement.dto.request.UserRequest;
import com.example.usermanagement.dto.response.UserResponse;
import com.example.usermanagement.entity.*;
import com.example.usermanagement.repository.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UtilisateurRepository utilisateurRepo;
    private final RoleRepository roleRepo;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final AuditService auditService;

    public List<UserResponse> getAll() {
        return utilisateurRepo.findAll().stream()
                .map(this::toResponse).toList();
    }

    public UserResponse getById(Long id) {
        return toResponse(utilisateurRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable")));
    }

    public UserResponse create(UserRequest req, String adminEmail) {
        Role role = roleRepo.findById(req.getRoleId())
                .orElseThrow(() -> new RuntimeException("Rôle introuvable"));
        Utilisateur user = Utilisateur.builder()
                .nom(req.getNom())
                .email(req.getEmail())
                .motDePasse(passwordEncoder.encode(req.getMotDePasse()))
                .role(role)
                .actif(req.isActif())
                .build();
        Utilisateur saved = utilisateurRepo.save(user);
        auditService.log(adminEmail, "CREATE_USER", "Création de " + req.getEmail());
        return toResponse(saved);
    }

    public UserResponse update(Long id, UserRequest req, String adminEmail) {
        Utilisateur user = utilisateurRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        Role role = roleRepo.findById(req.getRoleId())
                .orElseThrow(() -> new RuntimeException("Rôle introuvable"));
        user.setNom(req.getNom());
        user.setEmail(req.getEmail());
        user.setRole(role);
        user.setActif(req.isActif());
        if (req.getMotDePasse() != null && !req.getMotDePasse().isEmpty()) {
            user.setMotDePasse(passwordEncoder.encode(req.getMotDePasse()));
        }
        auditService.log(adminEmail, "UPDATE_USER", "Modification de " + req.getEmail());
        return toResponse(utilisateurRepo.save(user));
    }

    public void delete(Long id, String adminEmail) {
        Utilisateur user = utilisateurRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        auditService.log(adminEmail, "DELETE_USER", "Suppression de " + user.getEmail());
        utilisateurRepo.deleteById(id);
    }

    private UserResponse toResponse(Utilisateur u) {
        UserResponse r = new UserResponse();
        r.setId(u.getId());
        r.setNom(u.getNom());
        r.setEmail(u.getEmail());
        r.setActif(u.isActif());
        r.setRole(u.getRole() != null ? u.getRole().getNom() : null);
        return r;
    }
}