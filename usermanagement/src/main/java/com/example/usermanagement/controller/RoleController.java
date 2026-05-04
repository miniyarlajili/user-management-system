package com.example.usermanagement.controller;

import com.example.usermanagement.entity.Role;
import com.example.usermanagement.repository.RoleRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@Tag(name = "Rôles")
@SecurityRequirement(name = "Bearer Auth")
public class RoleController {

    private final RoleRepository roleRepository;

    @GetMapping
    @Operation(summary = "Liste tous les rôles")
    public ResponseEntity<List<Role>> getAll() {
        return ResponseEntity.ok(roleRepository.findAll());
    }

    @PostMapping
    @Operation(summary = "Créer un rôle")
    public ResponseEntity<Role> create(@RequestBody Role role) {
        return ResponseEntity.ok(roleRepository.save(role));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer un rôle")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        roleRepository.deleteById(id);
        return ResponseEntity.ok("Rôle supprimé");
    }
}