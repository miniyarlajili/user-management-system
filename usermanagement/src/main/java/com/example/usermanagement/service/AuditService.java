package com.example.usermanagement.service;

import com.example.usermanagement.entity.*;
import com.example.usermanagement.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditService {

    private final HistoriqueActionRepository historiqueRepo;
    private final UtilisateurRepository utilisateurRepo;

    public void log(String email, String action, String description) {
        utilisateurRepo.findByEmail(email).ifPresent(user -> {
            HistoriqueAction h = HistoriqueAction.builder()
                    .utilisateur(user)
                    .action(action)
                    .description(description)
                    .date(LocalDateTime.now())
                    .build();
            historiqueRepo.save(h);
        });
    }

    public List<HistoriqueAction> getAll() {
        return historiqueRepo.findAll();
    }
}