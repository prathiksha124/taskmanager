package com.theprathiksha.taskmanagerbackend.repository;

import com.theprathiksha.taskmanagerbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}