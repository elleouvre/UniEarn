package com.csit321section.groupname.projectname.dto;

import com.csit321section.groupname.projectname.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "Name is required") @Size(max = 100) String name,
        @NotBlank(message = "Email is required") @Email(message = "Enter a valid email") @Size(max = 150) String email,
        @NotBlank(message = "Password is required")
        @Size(min = 8, max = 72, message = "Password must be 8 to 72 characters") String password,
        @NotNull(message = "Role is required") Role role,
        // Student-only
        String school,
        String course,
        // Employer-only
        String companyName,
        String address
) {}
