package com.jobtrack.service;

import com.jobtrack.config.JwtUtils;
import com.jobtrack.dto.AuthResponse;
import com.jobtrack.dto.LoginRequest;
import com.jobtrack.dto.RegisterRequest;
import com.jobtrack.dto.UserResponse;
import com.jobtrack.entity.User;
import com.jobtrack.exception.ResourceNotFoundException;
import com.jobtrack.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service implementation handling user registration, credential verification,
 * and JWT generation.
 */
@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthServiceImpl.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public AuthServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           AuthenticationManager authenticationManager,
                           JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();
        log.info("Attempting registration for email: {}", normalizedEmail);

        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new IllegalArgumentException("Email is already registered: " + normalizedEmail);
        }

        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(normalizedEmail);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ROLE_USER");

        User savedUser = userRepository.save(user);
        log.info("Successfully registered user with id: {}", savedUser.getId());

        String token = jwtUtils.generateTokenFromEmail(savedUser.getEmail());
        return new AuthResponse(token, savedUser.getId(), savedUser.getName(), savedUser.getEmail());
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();
        log.info("Attempting login for email: {}", normalizedEmail);

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(normalizedEmail, request.getPassword())
            );
        } catch (BadCredentialsException e) {
            log.warn("Invalid login credentials for email: {}", normalizedEmail);
            throw new BadCredentialsException("Invalid email or password");
        }

        User user = getUserByEmail(normalizedEmail);
        String token = jwtUtils.generateTokenFromEmail(user.getEmail());
        log.info("Successfully authenticated user: {}", normalizedEmail);

        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail());
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getCurrentUser(String email) {
        User user = getUserByEmail(email);
        return UserResponse.fromEntity(user);
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserByEmail(String email) {
        String normalizedEmail = email != null ? email.trim().toLowerCase() : "";
        return userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", normalizedEmail));
    }
}
