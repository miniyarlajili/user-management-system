// UserResponse.java
package com.example.usermanagement.dto.response;

import lombok.Data;

@Data
public class UserResponse {
    private Long id;
    private String nom;
    private String email;
    private String role;
    private boolean actif;
}