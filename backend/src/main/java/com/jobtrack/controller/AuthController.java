package com.jobtrack.controller;

import com.jobtrack.dto.AuthResponse;
import com.jobtrack.dto.LoginRequest;
import com.jobtrack.dto.RegisterRequest;
import com.jobtrack.dto.UserResponse;
import com.jobtrack.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller exposing user authentication and registration endpoints.
 * Base path: /api/auth
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Register a new user account.
     *
     * @param request registration details
     * @return authentication response with JWT and user details
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Authenticate an existing user with email and password.
     *
     * @param request credentials
     * @return authentication response with JWT
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    /**
     * Get the authenticated user's profile details.
     *
     * @param userDetails authenticated principal
     * @return current user profile
     */
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UserResponse response = authService.getCurrentUser(userDetails.getUsername());
        return ResponseEntity.ok(response);
    }

    /**
     * Endpoint for user logout (clearing client state).
     *
     * @return success confirmation
     */
    @PostMapping("/logout")
    public ResponseEntity<java.util.Map<String, String>> logout() {
        return ResponseEntity.ok(java.util.Map.of("message", "User logged out successfully"));
    }
}
