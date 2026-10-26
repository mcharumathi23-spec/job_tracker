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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class JobApplicationServiceTest {

    @Mock
    private JobApplicationRepository repository;

    @InjectMocks
    private JobApplicationServiceImpl service;

    private User sampleUser;
    private JobApplication sampleEntity;
    private JobApplicationRequest sampleRequest;

    @BeforeEach
    void setUp() {
        sampleUser = new User(1L, "Test User", "test@example.com", "password", "ROLE_USER");

        sampleEntity = new JobApplication(
                1L,
                "TCS",
                "Java Developer",
                "Chennai",
                LocalDate.of(2026, 10, 26),
                JobStatus.APPLIED,
                "https://example.com/jobs/123",
                "Applied through company website",
                sampleUser,
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        sampleRequest = new JobApplicationRequest(
                "TCS",
                "Java Developer",
                "Chennai",
                LocalDate.of(2026, 10, 26),
                JobStatus.APPLIED,
                "https://example.com/jobs/123",
                "Applied through company website"
        );
    }

    @Test
    @DisplayName("Should successfully create and return a job application")
    void shouldCreateApplicationSuccessfully() {
        when(repository.save(any(JobApplication.class))).thenReturn(sampleEntity);

        JobApplicationResponse response = service.createApplication(sampleRequest, sampleUser);

        assertThat(response).isNotNull();
        assertThat(response.getId()).isEqualTo(1L);
        assertThat(response.getCompanyName()).isEqualTo("TCS");
        assertThat(response.getJobRole()).isEqualTo("Java Developer");
        assertThat(response.getStatus()).isEqualTo(JobStatus.APPLIED);
        verify(repository).save(any(JobApplication.class));
    }

    @Test
    @DisplayName("Should retrieve all job applications for user")
    void shouldRetrieveAllApplications() {
        when(repository.findByUser(sampleUser)).thenReturn(List.of(sampleEntity));

        List<JobApplicationResponse> result = service.getAllApplications(sampleUser);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getCompanyName()).isEqualTo("TCS");
        verify(repository).findByUser(sampleUser);
    }

    @Test
    @DisplayName("Should retrieve single application by ID for user")
    void shouldRetrieveApplicationById() {
        when(repository.findByIdAndUser(1L, sampleUser)).thenReturn(Optional.of(sampleEntity));

        JobApplicationResponse response = service.getApplicationById(1L, sampleUser);

        assertThat(response).isNotNull();
        assertThat(response.getId()).isEqualTo(1L);
        verify(repository).findByIdAndUser(1L, sampleUser);
    }

    @Test
    @DisplayName("Should throw ResourceNotFoundException when application ID does not exist for user")
    void shouldThrowExceptionWhenNotFound() {
        when(repository.findByIdAndUser(999L, sampleUser)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.getApplicationById(999L, sampleUser))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("JobApplication not found with id: '999'");
    }

    @Test
    @DisplayName("Should successfully update an existing application for user")
    void shouldUpdateApplication() {
        when(repository.findByIdAndUser(1L, sampleUser)).thenReturn(Optional.of(sampleEntity));
        when(repository.save(any(JobApplication.class))).thenReturn(sampleEntity);

        JobApplicationRequest updateRequest = new JobApplicationRequest(
                "TCS Digital",
                "Senior Java Developer",
                "Bangalore",
                LocalDate.of(2026, 10, 26),
                JobStatus.INTERVIEW,
                "https://example.com/jobs/456",
                "First round completed"
        );

        JobApplicationResponse updated = service.updateApplication(1L, updateRequest, sampleUser);

        assertThat(updated).isNotNull();
        verify(repository).save(sampleEntity);
    }

    @Test
    @DisplayName("Should successfully update status of an application for user")
    void shouldUpdateStatus() {
        when(repository.findByIdAndUser(1L, sampleUser)).thenReturn(Optional.of(sampleEntity));
        when(repository.save(any(JobApplication.class))).thenReturn(sampleEntity);

        JobStatusUpdateRequest statusRequest = new JobStatusUpdateRequest(JobStatus.OFFER);
        JobApplicationResponse response = service.updateStatus(1L, statusRequest, sampleUser);

        assertThat(response).isNotNull();
        assertThat(sampleEntity.getStatus()).isEqualTo(JobStatus.OFFER);
        verify(repository).save(sampleEntity);
    }

    @Test
    @DisplayName("Should delete application by ID for user")
    void shouldDeleteApplication() {
        when(repository.findByIdAndUser(1L, sampleUser)).thenReturn(Optional.of(sampleEntity));

        service.deleteApplication(1L, sampleUser);

        verify(repository).delete(sampleEntity);
    }

    @Test
    @DisplayName("Should search and filter applications for user")
    void shouldSearchAndFilterApplications() {
        when(repository.findByUserAndStatusAndCompanyNameContainingIgnoreCaseOrUserAndStatusAndJobRoleContainingIgnoreCase(
                sampleUser, JobStatus.APPLIED, "Java", sampleUser, JobStatus.APPLIED, "Java")).thenReturn(List.of(sampleEntity));

        List<JobApplicationResponse> result = service.searchAndFilterApplications(JobStatus.APPLIED, "Java", sampleUser);

        assertThat(result).hasSize(1);
        verify(repository).findByUserAndStatusAndCompanyNameContainingIgnoreCaseOrUserAndStatusAndJobRoleContainingIgnoreCase(
                sampleUser, JobStatus.APPLIED, "Java", sampleUser, JobStatus.APPLIED, "Java");
    }

    @Test
    @DisplayName("Should calculate dashboard stats for user")
    void shouldCalculateDashboardStats() {
        when(repository.countByUser(sampleUser)).thenReturn(5L);
        when(repository.countByUserAndStatus(sampleUser, JobStatus.APPLIED)).thenReturn(2L);
        when(repository.countByUserAndStatus(sampleUser, JobStatus.INTERVIEW)).thenReturn(1L);
        when(repository.countByUserAndStatus(sampleUser, JobStatus.OFFER)).thenReturn(1L);
        when(repository.countByUserAndStatus(sampleUser, JobStatus.REJECTED)).thenReturn(1L);
        when(repository.countByUserAndStatus(sampleUser, JobStatus.SAVED)).thenReturn(0L);
        when(repository.countByUserAndStatus(sampleUser, JobStatus.WITHDRAWN)).thenReturn(0L);

        JobStatsResponse stats = service.getDashboardStats(sampleUser);

        assertThat(stats.getTotalApplications()).isEqualTo(5L);
        assertThat(stats.getApplied()).isEqualTo(2L);
        assertThat(stats.getInterviews()).isEqualTo(1L);
        assertThat(stats.getStatusDistribution()).hasSize(6);
    }
}
