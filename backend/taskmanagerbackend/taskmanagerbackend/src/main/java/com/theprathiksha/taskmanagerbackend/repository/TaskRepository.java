package com.theprathiksha.taskmanagerbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.theprathiksha.taskmanagerbackend.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {


    List<Task> findByAssignedToOrCreatedBy(Long assignedTo, Long createdBy);


    List<Task> findByStatus(String status);


    List<Task> findByAssignedTo(Long assignedTo);


    List<Task> findByStatusAndAssignedTo(String status, Long assignedTo);
}