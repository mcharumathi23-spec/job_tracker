package com.jobtrack.service;

import com.jobtrack.dto.JobApplicationRequest;
import com.jobtrack.dto.JobApplicationResponse;
import com.jobtrack.dto.JobStatsResponse;
import com.jobtrack.dto.JobStatusUpdateRequest;
import com.jobtrack.entity.JobStatus;
import com.jobtrack.entity.User;

import java.util.List;

/**
 * Service interface for managing JobApplication entities scoped to authenticated users.
 */
public interface JobApplicationService {

    /**
     * Create and persist a new job application belonging to the authenticated user.
     *
     * @param request creation payload
     * @param user    authenticated owner
     * @return created application response
     */
    JobApplicationResponse createApplication(JobApplicationRequest request, User user);

    /**
     * Retrieve all job applications belonging to the authenticated user.
     *
     * @param user authenticated owner
     * @return list of user applications
     */
    List<JobApplicationResponse> getAllApplications(User user);

    /**
     * Retrieve a specific job application by ID, ensuring it belongs to the authenticated user.
     *
     * @param id   application identifier
     * @param user authenticated owner
     * @return application response
     */
    JobApplicationResponse getApplicationById(Long id, User user);

    /**
     * Update an existing job application belonging to the authenticated user.
     *
     * @param id      application identifier
     * @param request update payload
     * @param user    authenticated owner
     * @return updated application response
     */
    JobApplicationResponse updateApplication(Long id, JobApplicationRequest request, User user);

    /**
     * Partially update the lifecycle status of an application owned by the user.
     *
     * @param id      application identifier
     * @param request status update payload
     * @param user    authenticated owner
     * @return updated application response
     */
    JobApplicationResponse updateStatus(Long id, JobStatusUpdateRequest request, User user);

    /**
     * Delete an existing job application owned by the user.
     *
     * @param id   application identifier
     * @param user authenticated owner
     */
    void deleteApplication(Long id, User user);

    /**
     * Filter and search job applications for the authenticated user by status and/or keyword.
     *
     * @param status optional status filter
     * @param search optional keyword to match company name or job role
     * @param user   authenticated owner
     * @return filtered list of applications
     */
    List<JobApplicationResponse> searchAndFilterApplications(JobStatus status, String search, User user);

    /**
     * Calculate dashboard statistics and status distribution for the authenticated user.
     *
     * @param user authenticated owner
     * @return dashboard statistics response
     */
    JobStatsResponse getDashboardStats(User user);
}
