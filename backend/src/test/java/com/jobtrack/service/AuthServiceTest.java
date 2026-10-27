package com.jobtrack.service;

import com.jobtrack.config.JwtUtils;
import com.jobtrack.dto.AuthResponse;
import com.jobtrack.dto.LoginRequest;
import com.jobtrack.dto.RegisterRequest;
import com.jobtrack.dto.UserResponse;
import com.jobtrack.entity.User;
import com.jobtrack.exception.ResourceNotFoundException;
import com.jobtrack.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtils jwtUtils;

    @InjectMocks
    private AuthServiceImpl authService;

    private User sampleUser;

    @BeforeEach
    void setUp() {
        sampleUser = new User("Alex", "alex@example.com", "encodedPassword");
        sampleUser.setId(10L);
    }

    @Test
    @DisplayName("register() - Successfully registers a new user with matching passwords")
    void shouldRegisterNewUser() {
        RegisterRequest request = new RegisterRequest("Alex", "alex@example.com", "StrongPassword123!", "StrongPassword123!");

        when(userRepository.existsByEmail("alex@example.com")).thenReturn(false);
        when(passwordEncoder.encode("StrongPassword123!")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(sampleUser);
        when(jwtUtils.generateTokenFromEmail("alex@example.com")).thenReturn("jwt-token-xyz");

        AuthResponse response = authService.register(request);

        assertThat(response).isNotNull();
        assertThat(response.getToken()).isEqualTo("jwt-token-xyz");
        assertThat(response.getAccessToken()).isEqualTo("jwt-token-xyz");
        assertThat(response.getEmail()).isEqualTo("alex@example.com");
        assertThat(response.getName()).isEqualTo("Alex");
        verify(userRepository).save(any(User.class));
    }

    @Test
    @DisplayName("register() - Throws IllegalArgumentException when passwords do not match")
    void shouldThrowWhenPasswordsDoNotMatch() {
        RegisterRequest request = new RegisterRequest("Alex", "alex@example.com", "StrongPassword123!", "DifferentPassword123!");

        assertThatThrownBy(() -> authService.register(request))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Passwords do not match");
    }

    @Test
    @DisplayName("register() - Throws IllegalArgumentException when email already registered")
    void shouldThrowWhenEmailAlreadyRegistered() {
        RegisterRequest request = new RegisterRequest("Alex", "alex@example.com", "StrongPassword123!", "StrongPassword123!");
        when(userRepository.existsByEmail("alex@example.com")).thenReturn(true);

        assertThatThrownBy(() -> authService.register(request))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Email is already registered");
    }

    @Test
    @DisplayName("login() - Successfully authenticates user and returns token")
    void shouldLoginSuccessfully() {
        LoginRequest request = new LoginRequest("alex@example.com", "StrongPassword123!");

        when(userRepository.findByEmail("alex@example.com")).thenReturn(Optional.of(sampleUser));
        when(jwtUtils.generateTokenFromEmail("alex@example.com")).thenReturn("jwt-token-xyz");

        AuthResponse response = authService.login(request);

        assertThat(response).isNotNull();
        assertThat(response.getToken()).isEqualTo("jwt-token-xyz");
        assertThat(response.getEmail()).isEqualTo("alex@example.com");
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

    @Test
    @DisplayName("login() - Throws BadCredentialsException on invalid credentials")
    void shouldThrowBadCredentialsOnFailedAuth() {
        LoginRequest request = new LoginRequest("alex@example.com", "WrongPassword");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Bad credentials"));

        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(BadCredentialsException.class)
                .hasMessageContaining("Invalid email or password");
    }

    @Test
    @DisplayName("getCurrentUser() - Returns UserResponse for existing user")
    void shouldGetCurrentUser() {
        when(userRepository.findByEmail("alex@example.com")).thenReturn(Optional.of(sampleUser));

        UserResponse response = authService.getCurrentUser("alex@example.com");

        assertThat(response).isNotNull();
        assertThat(response.getId()).isEqualTo(10L);
        assertThat(response.getEmail()).isEqualTo("alex@example.com");
    }

    @Test
    @DisplayName("getUserByEmail() - Throws ResourceNotFoundException when user not found")
    void shouldThrowWhenUserNotFound() {
        when(userRepository.findByEmail("unknown@example.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.getUserByEmail("unknown@example.com"))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}
