package com.example.usermanagement.controller;

import com.example.usermanagement.dto.request.UserRequest;
import com.example.usermanagement.dto.response.UserResponse;
import com.example.usermanagement.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@Tag(name = "Utilisateurs")
@SecurityRequirement(name = "Bearer Auth")
public class UserController {

    private final UserService userService;

    @GetMapping
    @Operation(summary = "Liste tous les utilisateurs")
    public ResponseEntity<List<UserResponse>> getAll() {
        return ResponseEntity.ok(userService.getAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Récupérer un utilisateur par ID")
    public ResponseEntity<UserResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getById(id));
    }

    @PostMapping
    @Operation(summary = "Créer un utilisateur")
    public ResponseEntity<UserResponse> create(
            @Valid @RequestBody UserRequest req,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(userService.create(req, userDetails.getUsername()));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Modifier un utilisateur")
    public ResponseEntity<UserResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody UserRequest req,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(userService.update(id, req, userDetails.getUsername()));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer un utilisateur")
    public ResponseEntity<String> delete(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        userService.delete(id, userDetails.getUsername());
        return ResponseEntity.ok("Utilisateur supprimé");
    }
}