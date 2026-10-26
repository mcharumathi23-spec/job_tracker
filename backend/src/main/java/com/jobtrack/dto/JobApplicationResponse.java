package com.jobtrack.dto;

import com.jobtrack.entity.JobApplication;
import com.jobtrack.entity.JobStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Data Transfer Object for responding with JobApplication details.
 */
public class JobApplicationResponse {

    private Long id;
    private String companyName;
    private String jobRole;
    private String location;
    private LocalDate applicationDate;
    private JobStatus status;
    private String jobUrl;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public JobApplicationResponse() {
    }

    public JobApplicationResponse(Long id, String companyName, String jobRole, String location,
                                  LocalDate applicationDate, JobStatus status, String jobUrl,
                                  String notes, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.companyName = companyName;
        this.jobRole = jobRole;
        this.location = location;
        this.applicationDate = applicationDate;
        this.status = status;
        this.jobUrl = jobUrl;
        this.notes = notes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    /**
     * Map a JPA JobApplication entity to a response DTO.
     *
     * @param entity the entity to convert
     * @return response DTO
     */
    public static JobApplicationResponse fromEntity(JobApplication entity) {
        if (entity == null) {
            return null;
        }
        return new JobApplicationResponse(
                entity.getId(),
                entity.getCompanyName(),
                entity.getJobRole(),
                entity.getLocation(),
                entity.getApplicationDate(),
                entity.getStatus(),
                entity.getJobUrl(),
                entity.getNotes(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
