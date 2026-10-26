package com.jobtrack.service;

import com.jobtrack.dto.AuthResponse;
import com.jobtrack.dto.LoginRequest;
import com.jobtrack.dto.RegisterRequest;
import com.jobtrack.dto.UserResponse;
import com.jobtrack.entity.User;

/**
 * Service interface for registration, authentication, and user profile retrieval.
 */
public interface AuthService {

    /**
     * Register a new user and generate access token.
     *
     * @param request registration payload
     * @return authentication response with JWT
     */
    AuthResponse register(RegisterRequest request);

    /**
     * Authenticate an existing user and return access token.
     *
     * @param request login payload
     * @return authentication response with JWT
     */
    AuthResponse login(LoginRequest request);

    /**
     * Retrieve the current authenticated user's profile.
     *
     * @param email user email
     * @return user profile response
     */
    UserResponse getCurrentUser(String email);

    /**
     * Retrieve the User entity by email for service operations.
     *
     * @param email user email
     * @return User entity
     */
    User getUserByEmail(String email);
}
