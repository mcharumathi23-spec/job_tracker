package com.jobtrack.dto;

import com.jobtrack.entity.JobStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

/**
 * Data Transfer Object for creating or updating a JobApplication.
 */
public class JobApplicationRequest {

    @NotBlank(message = "Company name is required")
    @Size(max = 150, message = "Company name must not exceed 150 characters")
    private String companyName;

    @NotBlank(message = "Job role is required")
    @Size(max = 150, message = "Job role must not exceed 150 characters")
    private String jobRole;

    @Size(max = 150, message = "Location must not exceed 150 characters")
    private String location;

    @NotNull(message = "Application date is required")
    private LocalDate applicationDate;

    private JobStatus status = JobStatus.SAVED;

    @Size(max = 500, message = "Job URL must not exceed 500 characters")
    @Pattern(regexp = "^(https?://[a-zA-Z0-9-._~:/?#\\[\\]@!$&'()*+,;=%]+)?$", message = "Job URL must be a valid HTTP or HTTPS URL")
    private String jobUrl;

    @Size(max = 2000, message = "Notes must not exceed 2000 characters")
    private String notes;

    public JobApplicationRequest() {
    }

    public JobApplicationRequest(String companyName, String jobRole, String location,
                                 LocalDate applicationDate, JobStatus status, String jobUrl, String notes) {
        this.companyName = companyName;
        this.jobRole = jobRole;
        this.location = location;
        this.applicationDate = applicationDate;
        this.status = status != null ? status : JobStatus.SAVED;
        this.jobUrl = jobUrl;
        this.notes = notes;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDate getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(LocalDate applicationDate) {
        this.applicationDate = applicationDate;
    }

    public JobStatus getStatus() {
        return status;
    }

    public void setStatus(JobStatus status) {
        this.status = status;
    }

    public String getJobUrl() {
        return jobUrl;
    }

    public void setJobUrl(String jobUrl) {
        this.jobUrl = jobUrl;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
