package com.csit321g6.TSK.UniEarn.controller;

import com.csit321g6.TSK.UniEarn.dto.*;
import com.csit321g6.TSK.UniEarn.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    /** Returns the logged-in user. The React app calls this to restore a session on page refresh. */
    @GetMapping("/me")
    public UserResponse me(Authentication authentication) {
        return authService.currentUser(authentication.getName());
    }
}
