package com.jobtrack.controller;

import com.jobtrack.dto.JobApplicationRequest;
import com.jobtrack.dto.JobApplicationResponse;
import com.jobtrack.dto.JobStatsResponse;
import com.jobtrack.dto.JobStatusUpdateRequest;
import com.jobtrack.entity.JobStatus;
import com.jobtrack.entity.User;
import com.jobtrack.service.AuthService;
import com.jobtrack.service.JobApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * REST Controller exposing user-scoped CRUD and analytics endpoints for Job Applications.
 * Base path: /api/jobs
 */
@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobApplicationController {

    private final JobApplicationService service;
    private final AuthService authService;

    public JobApplicationController(JobApplicationService service, AuthService authService) {
        this.service = service;
        this.authService = authService;
    }

    private User getAuthenticatedUser(UserDetails userDetails) {
        return authService.getUserByEmail(userDetails.getUsername());
    }

    /**
     * Create a new job application for the authenticated user.
     *
     * @param request     creation payload with validation
     * @param userDetails authenticated user
     * @return created application with HTTP 201 Created
     */
    @PostMapping
    public ResponseEntity<JobApplicationResponse> createApplication(
            @Valid @RequestBody JobApplicationRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = getAuthenticatedUser(userDetails);
        JobApplicationResponse response = service.createApplication(request, user);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Retrieve all job applications for the authenticated user, optionally filtered.
     *
     * @param status      optional status filter
     * @param search      optional keyword search on company or role
     * @param userDetails authenticated user
     * @return list of matching applications
     */
    @GetMapping
    public ResponseEntity<List<JobApplicationResponse>> getAllApplications(
            @RequestParam(required = false) JobStatus status,
            @RequestParam(required = false) String search,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = getAuthenticatedUser(userDetails);
        List<JobApplicationResponse> applications = service.searchAndFilterApplications(status, search, user);
        return ResponseEntity.ok(applications);
    }

    /**
     * Retrieve dashboard KPI stats and status distribution for the authenticated user.
     *
     * @param userDetails authenticated user
     * @return dashboard statistics
     */
    @GetMapping("/stats")
    public ResponseEntity<JobStatsResponse> getDashboardStats(@AuthenticationPrincipal UserDetails userDetails) {
        User user = getAuthenticatedUser(userDetails);
        JobStatsResponse stats = service.getDashboardStats(user);
        return ResponseEntity.ok(stats);
    }

    /**
     * Retrieve a single job application by ID owned by the authenticated user.
     *
     * @param id          application identifier
     * @param userDetails authenticated user
     * @return application details with HTTP 200 OK
     */
    @GetMapping("/{id}")
    public ResponseEntity<JobApplicationResponse> getApplicationById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = getAuthenticatedUser(userDetails);
        JobApplicationResponse response = service.getApplicationById(id, user);
        return ResponseEntity.ok(response);
    }

    /**
     * Update an existing job application owned by the authenticated user.
     *
     * @param id          application identifier
     * @param request     update payload
     * @param userDetails authenticated user
     * @return updated application details with HTTP 200 OK
     */
    @PutMapping("/{id}")
    public ResponseEntity<JobApplicationResponse> updateApplication(
            @PathVariable Long id,
            @Valid @RequestBody JobApplicationRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = getAuthenticatedUser(userDetails);
        JobApplicationResponse response = service.updateApplication(id, request, user);
        return ResponseEntity.ok(response);
    }

    /**
     * Partially update status for an application owned by the authenticated user.
     *
     * @param id          application identifier
     * @param request     status update payload
     * @param userDetails authenticated user
     * @return updated application details with HTTP 200 OK
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<JobApplicationResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody JobStatusUpdateRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = getAuthenticatedUser(userDetails);
        JobApplicationResponse response = service.updateStatus(id, request, user);
        return ResponseEntity.ok(response);
    }

    /**
     * Delete an application owned by the authenticated user.
     *
     * @param id          application identifier
     * @param userDetails authenticated user
     * @return HTTP 204 No Content
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteApplication(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = getAuthenticatedUser(userDetails);
        service.deleteApplication(id, user);
        return ResponseEntity.noContent().build();
    }
}
