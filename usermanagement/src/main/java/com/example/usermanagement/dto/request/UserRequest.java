// UserRequest.java
package com.example.usermanagement.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UserRequest {
    @NotBlank
    private String nom;
    @Email @NotBlank
    private String email;
    @Size(min = 8)
    private String motDePasse;
    private Long roleId;
    private boolean actif = true;
}