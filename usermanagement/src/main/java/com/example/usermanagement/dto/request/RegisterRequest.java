// RegisterRequest.java
package com.example.usermanagement.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank
    private String nom;
    @Email @NotBlank
    private String email;
    @NotBlank @Size(min = 8)
    private String motDePasse;
    private Long roleId;
}