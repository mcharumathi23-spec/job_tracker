package com.jobtrack.repository;

import com.jobtrack.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data JPA Repository for User entity operations.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find a user by their unique email address.
     *
     * @param email user email
     * @return Optional of User
     */
    Optional<User> findByEmail(String email);

    /**
     * Check if a user with the given email already exists.
     *
     * @param email user email
     * @return true if exists, false otherwise
     */
    boolean existsByEmail(String email);
}
