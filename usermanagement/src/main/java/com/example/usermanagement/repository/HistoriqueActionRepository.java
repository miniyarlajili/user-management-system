// HistoriqueActionRepository.java
package com.example.usermanagement.repository;

import com.example.usermanagement.entity.HistoriqueAction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HistoriqueActionRepository extends JpaRepository<HistoriqueAction, Long> {
    List<HistoriqueAction> findByUtilisateurIdOrderByDateDesc(Long utilisateurId);
}