package com.jobtrack.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobtrack.config.JwtUtils;
import com.jobtrack.dto.JobApplicationRequest;
import com.jobtrack.dto.JobApplicationResponse;
import com.jobtrack.dto.JobStatsResponse;
import com.jobtrack.dto.JobStatusUpdateRequest;
import com.jobtrack.entity.JobStatus;
import com.jobtrack.entity.User;
import com.jobtrack.exception.GlobalExceptionHandler;
import com.jobtrack.exception.ResourceNotFoundException;
import com.jobtrack.service.AuthService;
import com.jobtrack.service.CustomUserDetailsService;
import com.jobtrack.service.JobApplicationService;
import org.junit.jupiter.api.BeforeEach;
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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(JobApplicationController.class)
@AutoConfigureMockMvc(addFilters = false)
@Import(GlobalExceptionHandler.class)
class JobApplicationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private JobApplicationService service;

    @MockBean
    private AuthService authService;

    @MockBean
    private JwtUtils jwtUtils;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    private User sampleUser;
    private JobApplicationResponse sampleResponse;

    @BeforeEach
    void setUp() {
        sampleUser = new User(1L, "Test User", "test@example.com", "password", "ROLE_USER");
        when(authService.getUserByEmail("test@example.com")).thenReturn(sampleUser);

        sampleResponse = new JobApplicationResponse(
                1L,
                "TCS",
                "Java Developer",
                "Chennai",
                LocalDate.of(2026, 10, 26),
                JobStatus.APPLIED,
                "https://example.com/jobs/123",
                "Applied through company website",
                LocalDateTime.now(),
                LocalDateTime.now()
        );
    }

    @Test
    @WithMockUser(username = "test@example.com")
    @DisplayName("POST /api/jobs - Should return 201 Created with valid request body")
    void shouldCreateApplication() throws Exception {
        JobApplicationRequest request = new JobApplicationRequest(
                "TCS",
                "Java Developer",
                "Chennai",
                LocalDate.of(2026, 10, 26),
                JobStatus.APPLIED,
                "https://example.com/jobs/123",
                "Applied through company website"
        );

        when(service.createApplication(any(JobApplicationRequest.class), any(User.class))).thenReturn(sampleResponse);

        mockMvc.perform(post("/api/jobs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.companyName").value("TCS"))
                .andExpect(jsonPath("$.status").value("APPLIED"));
    }

    @Test
    @WithMockUser(username = "test@example.com")
    @DisplayName("POST /api/jobs - Should return 400 Bad Request when company name is blank")
    void shouldReturn400WhenCompanyNameBlank() throws Exception {
        JobApplicationRequest request = new JobApplicationRequest(
                "",
                "Java Developer",
                "Chennai",
                LocalDate.of(2026, 10, 26),
                JobStatus.APPLIED,
                "https://example.com/jobs/123",
                "Notes"
        );

        mockMvc.perform(post("/api/jobs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.validationErrors.companyName").exists());
    }

    @Test
    @WithMockUser(username = "test@example.com")
    @DisplayName("GET /api/jobs - Should return 200 OK with user applications")
    void shouldReturnAllApplications() throws Exception {
        when(service.searchAndFilterApplications(null, null, sampleUser)).thenReturn(List.of(sampleResponse));

        mockMvc.perform(get("/api/jobs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].companyName").value("TCS"));
    }

    @Test
    @WithMockUser(username = "test@example.com")
    @DisplayName("GET /api/jobs/stats - Should return 200 OK with dashboard metrics")
    void shouldReturnDashboardStats() throws Exception {
        JobStatsResponse statsResponse = new JobStatsResponse(
                5L, 2L, 1L, 1L, 1L, 0L, 0L, new ArrayList<>()
        );
        when(service.getDashboardStats(sampleUser)).thenReturn(statsResponse);

        mockMvc.perform(get("/api/jobs/stats"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalApplications").value(5))
                .andExpect(jsonPath("$.applied").value(2));
    }

    @Test
    @WithMockUser(username = "test@example.com")
    @DisplayName("GET /api/jobs/{id} - Should return 200 OK when found")
    void shouldReturnApplicationById() throws Exception {
        when(service.getApplicationById(1L, sampleUser)).thenReturn(sampleResponse);

        mockMvc.perform(get("/api/jobs/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.companyName").value("TCS"));
    }

    @Test
    @WithMockUser(username = "test@example.com")
    @DisplayName("GET /api/jobs/{id} - Should return 404 Not Found when ID does not exist")
    void shouldReturn404WhenNotFound() throws Exception {
        when(service.getApplicationById(999L, sampleUser)).thenThrow(new ResourceNotFoundException("JobApplication", "id", 999L));

        mockMvc.perform(get("/api/jobs/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404));
    }

    @Test
    @WithMockUser(username = "test@example.com")
    @DisplayName("DELETE /api/jobs/{id} - Should return 204 No Content")
    void shouldDeleteApplication() throws Exception {
        doNothing().when(service).deleteApplication(1L, sampleUser);

        mockMvc.perform(delete("/api/jobs/1"))
                .andExpect(status().isNoContent());
    }
}
