package com.example.usermanagement.controller;

import com.example.usermanagement.entity.HistoriqueAction;
import com.example.usermanagement.service.AuditService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/audit")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@Tag(name = "Audit")
@SecurityRequirement(name = "Bearer Auth")
public class AuditController {

    private final AuditService auditService;

    @GetMapping
    @Operation(summary = "Historique de toutes les actions")
    public ResponseEntity<List<HistoriqueAction>> getAll() {
        return ResponseEntity.ok(auditService.getAll());
    }
}