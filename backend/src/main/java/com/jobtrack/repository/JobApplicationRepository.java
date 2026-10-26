package com.jobtrack.repository;

import com.jobtrack.entity.JobApplication;
import com.jobtrack.entity.JobStatus;
import com.jobtrack.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA Repository for JobApplication entities with strict user ownership boundaries.
 */
@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    /**
     * Retrieve all applications belonging to a specific user.
     *
     * @param user owner user
     * @return list of matching applications
     */
    List<JobApplication> findByUser(User user);

    /**
     * Retrieve a single application by ID and verified owner.
     *
     * @param id   application identifier
     * @param user owner user
     * @return Optional of JobApplication
     */
    Optional<JobApplication> findByIdAndUser(Long id, User user);

    /**
     * Retrieve applications belonging to a user filtered by status.
     *
     * @param user   owner user
     * @param status status filter
     * @return list of matching applications
     */
    List<JobApplication> findByUserAndStatus(User user, JobStatus status);

    /**
     * Search applications belonging to a user matching keyword in company name or job role.
     *
     * @param user1       owner user
     * @param companyName company name keyword
     * @param user2       owner user
     * @param jobRole     job role keyword
     * @return list of matching applications
     */
    List<JobApplication> findByUserAndCompanyNameContainingIgnoreCaseOrUserAndJobRoleContainingIgnoreCase(
            User user1, String companyName, User user2, String jobRole);

    /**
     * Filter applications by status and search company or role for a specific user.
     *
     * @param user1       owner user
     * @param status1     status filter
     * @param companyName company keyword
     * @param user2       owner user
     * @param status2     status filter
     * @param jobRole     job role keyword
     * @return list of matching applications
     */
    List<JobApplication> findByUserAndStatusAndCompanyNameContainingIgnoreCaseOrUserAndStatusAndJobRoleContainingIgnoreCase(
            User user1, JobStatus status1, String companyName,
            User user2, JobStatus status2, String jobRole);

    /**
     * Count total applications belonging to a user.
     *
     * @param user owner user
     * @return total count
     */
    long countByUser(User user);

    /**
     * Count applications belonging to a user by status.
     *
     * @param user   owner user
     * @param status status filter
     * @return count of matching applications
     */
    long countByUserAndStatus(User user, JobStatus status);

    /**
     * Retain legacy count method if needed.
     */
    long countByStatus(JobStatus status);
}
