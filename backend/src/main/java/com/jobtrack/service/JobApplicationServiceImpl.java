package com.jobtrack.service;

import com.jobtrack.dto.JobApplicationRequest;
import com.jobtrack.dto.JobApplicationResponse;
import com.jobtrack.dto.JobStatsResponse;
import com.jobtrack.dto.JobStatusUpdateRequest;
import com.jobtrack.entity.JobApplication;
import com.jobtrack.entity.JobStatus;
import com.jobtrack.entity.User;
import com.jobtrack.exception.ResourceNotFoundException;
import com.jobtrack.repository.JobApplicationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Service implementation containing core business logic for JobApplication operations,
 * strictly enforcing user ownership boundaries.
 */
@Service
@Transactional
public class JobApplicationServiceImpl implements JobApplicationService {

    private static final Logger log = LoggerFactory.getLogger(JobApplicationServiceImpl.class);

    private final JobApplicationRepository repository;

    public JobApplicationServiceImpl(JobApplicationRepository repository) {
        this.repository = repository;
    }

    @Override
    public JobApplicationResponse createApplication(JobApplicationRequest request, User user) {
        log.info("Creating application for user: {}, company: '{}', role: '{}'",
                user.getEmail(), request.getCompanyName(), request.getJobRole());

        JobApplication application = new JobApplication();
        application.setCompanyName(request.getCompanyName().trim());
        application.setJobRole(request.getJobRole().trim());
        application.setLocation(request.getLocation() != null ? request.getLocation().trim() : null);
        application.setApplicationDate(request.getApplicationDate());
        application.setStatus(request.getStatus() != null ? request.getStatus() : JobStatus.SAVED);
        application.setJobUrl(request.getJobUrl() != null ? request.getJobUrl().trim() : null);
        application.setNotes(request.getNotes() != null ? request.getNotes().trim() : null);
        application.setUser(user);

        JobApplication saved = repository.save(application);
        log.info("Successfully created job application id: {} for user: {}", saved.getId(), user.getEmail());
        return JobApplicationResponse.fromEntity(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<JobApplicationResponse> getAllApplications(User user) {
        log.debug("Fetching all applications for user: {}", user.getEmail());
        return repository.findByUser(user)
                .stream()
                .map(JobApplicationResponse::fromEntity)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public JobApplicationResponse getApplicationById(Long id, User user) {
        log.debug("Fetching application id: {} for user: {}", id, user.getEmail());
        JobApplication application = findOrThrow(id, user);
        return JobApplicationResponse.fromEntity(application);
    }

    @Override
    public JobApplicationResponse updateApplication(Long id, JobApplicationRequest request, User user) {
        log.info("Updating application id: {} for user: {}", id, user.getEmail());
        JobApplication application = findOrThrow(id, user);

        application.setCompanyName(request.getCompanyName().trim());
        application.setJobRole(request.getJobRole().trim());
        application.setLocation(request.getLocation() != null ? request.getLocation().trim() : null);
        application.setApplicationDate(request.getApplicationDate());
        if (request.getStatus() != null) {
            application.setStatus(request.getStatus());
        }
        application.setJobUrl(request.getJobUrl() != null ? request.getJobUrl().trim() : null);
        application.setNotes(request.getNotes() != null ? request.getNotes().trim() : null);
        application.setUpdatedAt(LocalDateTime.now());

        JobApplication updated = repository.save(application);
        log.info("Successfully updated application id: {}", updated.getId());
        return JobApplicationResponse.fromEntity(updated);
    }

    @Override
    public JobApplicationResponse updateStatus(Long id, JobStatusUpdateRequest request, User user) {
        log.info("Updating status for application id: {} to '{}' for user: {}", id, request.getStatus(), user.getEmail());
        JobApplication application = findOrThrow(id, user);

        application.setStatus(request.getStatus());
        application.setUpdatedAt(LocalDateTime.now());

        JobApplication updated = repository.save(application);
        log.info("Successfully updated status for application id: {}", updated.getId());
        return JobApplicationResponse.fromEntity(updated);
    }

    @Override
    public void deleteApplication(Long id, User user) {
        log.info("Deleting application id: {} for user: {}", id, user.getEmail());
        JobApplication application = findOrThrow(id, user);
        repository.delete(application);
        log.info("Successfully deleted application id: {}", id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<JobApplicationResponse> searchAndFilterApplications(JobStatus status, String search, User user) {
        log.debug("Searching/filtering applications for user: {} - status: {}, search: '{}'", user.getEmail(), status, search);
        boolean hasStatus = status != null;
        boolean hasSearch = search != null && !search.trim().isEmpty();

        List<JobApplication> results;

        if (hasStatus && hasSearch) {
            String keyword = search.trim();
            results = repository.findByUserAndStatusAndCompanyNameContainingIgnoreCaseOrUserAndStatusAndJobRoleContainingIgnoreCase(
                    user, status, keyword, user, status, keyword);
        } else if (hasStatus) {
            results = repository.findByUserAndStatus(user, status);
        } else if (hasSearch) {
            String keyword = search.trim();
            results = repository.findByUserAndCompanyNameContainingIgnoreCaseOrUserAndJobRoleContainingIgnoreCase(
                    user, keyword, user, keyword);
        } else {
            results = repository.findByUser(user);
        }

        return results.stream()
                .map(JobApplicationResponse::fromEntity)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public JobStatsResponse getDashboardStats(User user) {
        log.debug("Calculating dashboard stats for user: {}", user.getEmail());

        long total = repository.countByUser(user);
        long applied = repository.countByUserAndStatus(user, JobStatus.APPLIED);
        long interviews = repository.countByUserAndStatus(user, JobStatus.INTERVIEW);
        long offers = repository.countByUserAndStatus(user, JobStatus.OFFER);
        long rejections = repository.countByUserAndStatus(user, JobStatus.REJECTED);
        long saved = repository.countByUserAndStatus(user, JobStatus.SAVED);
        long withdrawn = repository.countByUserAndStatus(user, JobStatus.WITHDRAWN);

        List<JobStatsResponse.StatusDistribution> distribution = new ArrayList<>();
        distribution.add(new JobStatsResponse.StatusDistribution("SAVED", "Saved", saved, "#64748b"));
        distribution.add(new JobStatsResponse.StatusDistribution("APPLIED", "Applied", applied, "#6366f1"));
        distribution.add(new JobStatsResponse.StatusDistribution("INTERVIEW", "Interviews", interviews, "#f59e0b"));
        distribution.add(new JobStatsResponse.StatusDistribution("OFFER", "Offers", offers, "#10b981"));
        distribution.add(new JobStatsResponse.StatusDistribution("REJECTED", "Rejections", rejections, "#ef4444"));
        distribution.add(new JobStatsResponse.StatusDistribution("WITHDRAWN", "Withdrawn", withdrawn, "#94a3b8"));

        return new JobStatsResponse(total, applied, interviews, offers, rejections, saved, withdrawn, distribution);
    }

    private JobApplication findOrThrow(Long id, User user) {
        return repository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("JobApplication", "id", id));
    }
}
