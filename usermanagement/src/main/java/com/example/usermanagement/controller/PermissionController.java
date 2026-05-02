package com.example.usermanagement.controller;

import com.example.usermanagement.entity.*;
import com.example.usermanagement.service.PermissionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/permissions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@Tag(name = "Permissions")
@SecurityRequirement(name = "Bearer Auth")
public class PermissionController {

    private final PermissionService permissionService;

    @GetMapping
    @Operation(summary = "Liste toutes les permissions")
    public ResponseEntity<List<Permission>> getAll() {
        return ResponseEntity.ok(permissionService.getAll());
    }

    @PostMapping
    @Operation(summary = "Créer une permission")
    public ResponseEntity<Permission> create(
            @RequestBody Permission permission) {
        return ResponseEntity.ok(
                permissionService.create(permission));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer une permission")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        permissionService.delete(id);
        return ResponseEntity.ok("Permission supprimée");
    }

    @PostMapping("/roles/{roleId}/add/{permissionId}")
    @Operation(summary = "Ajouter permission à un rôle")
    public ResponseEntity<Role> addToRole(
            @PathVariable Long roleId,
            @PathVariable Long permissionId) {
        return ResponseEntity.ok(
                permissionService.addPermissionToRole(roleId, permissionId));
    }

    @DeleteMapping("/roles/{roleId}/remove/{permissionId}")
    @Operation(summary = "Retirer permission d'un rôle")
    public ResponseEntity<Role> removeFromRole(
            @PathVariable Long roleId,
            @PathVariable Long permissionId) {
        return ResponseEntity.ok(
                permissionService.removePermissionFromRole(roleId, permissionId));
    }
}