package com.jobtrack.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobtrack.config.AuthEntryPointJwt;
import com.jobtrack.config.CustomAccessDeniedHandler;
import com.jobtrack.config.JwtUtils;
import com.jobtrack.dto.AuthResponse;
import com.jobtrack.dto.LoginRequest;
import com.jobtrack.dto.RegisterRequest;
import com.jobtrack.dto.UserResponse;
import com.jobtrack.exception.GlobalExceptionHandler;
import com.jobtrack.service.AuthService;
import com.jobtrack.service.CustomUserDetailsService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
@Import(GlobalExceptionHandler.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    @MockBean
    private JwtUtils jwtUtils;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @Test
    @DisplayName("POST /api/auth/register - Should return 201 Created with token")
    void shouldRegisterSuccessfully() throws Exception {
        RegisterRequest request = new RegisterRequest("Charu", "charu@example.com", "password123");
        AuthResponse response = new AuthResponse("mock-jwt-token", 1L, "Charu", "charu@example.com");

        when(authService.register(any(RegisterRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.token").value("mock-jwt-token"))
                .andExpect(jsonPath("$.name").value("Charu"))
                .andExpect(jsonPath("$.email").value("charu@example.com"));
    }

    @Test
    @DisplayName("POST /api/auth/login - Should return 200 OK with token")
    void shouldLoginSuccessfully() throws Exception {
        LoginRequest request = new LoginRequest("charu@example.com", "password123");
        AuthResponse response = new AuthResponse("mock-jwt-token", 1L, "Charu", "charu@example.com");

        when(authService.login(any(LoginRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("mock-jwt-token"))
                .andExpect(jsonPath("$.email").value("charu@example.com"));
    }

    @Test
    @WithMockUser(username = "charu@example.com")
    @DisplayName("GET /api/auth/me - Should return 200 OK with user profile")
    void shouldReturnCurrentUser() throws Exception {
        UserResponse response = new UserResponse(1L, "Charu", "charu@example.com", "ROLE_USER");
        when(authService.getCurrentUser("charu@example.com")).thenReturn(response);

        mockMvc.perform(get("/api/auth/me"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Charu"))
                .andExpect(jsonPath("$.email").value("charu@example.com"));
    }

    @Test
    @DisplayName("POST /api/auth/register - Should fail with 400 when password is under 8 characters")
    void shouldFailRegisterWhenPasswordTooShort() throws Exception {
        RegisterRequest request = new RegisterRequest("Charu", "charu@example.com", "short");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.validationErrors.password").exists());
    }

    @Test
    @DisplayName("POST /api/auth/logout - Should return 200 OK")
    void shouldLogoutSuccessfully() throws Exception {
        mockMvc.perform(post("/api/auth/logout"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("User logged out successfully"));
    }
}
