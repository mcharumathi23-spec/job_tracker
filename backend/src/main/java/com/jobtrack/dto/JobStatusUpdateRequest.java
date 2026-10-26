package com.jobtrack.dto;

import com.jobtrack.entity.JobStatus;
import jakarta.validation.constraints.NotNull;

/**
 * Data Transfer Object for PATCH updating application status.
 */
public class JobStatusUpdateRequest {

    @NotNull(message = "Status is required")
    private JobStatus status;

    public JobStatusUpdateRequest() {
    }

    public JobStatusUpdateRequest(JobStatus status) {
        this.status = status;
    }

    public JobStatus getStatus() {
        return status;
    }

    public void setStatus(JobStatus status) {
        this.status = status;
    }
}
