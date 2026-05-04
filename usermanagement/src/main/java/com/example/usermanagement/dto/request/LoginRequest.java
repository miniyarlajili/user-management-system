// LoginRequest.java
package com.example.usermanagement.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class LoginRequest {
    @Email @NotBlank
    private String email;
    @NotBlank
    private String motDePasse;
}