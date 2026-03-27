package com.theprathiksha.taskmanagerbackend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.theprathiksha.taskmanagerbackend.entity.Task;
import com.theprathiksha.taskmanagerbackend.repository.TaskRepository;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin
public class TaskController {

    private final TaskRepository repo;

    public TaskController(TaskRepository repo) {
        this.repo = repo;
    }


    @PostMapping
    public Task create(@RequestBody Task task) {
        return repo.save(task);
    }

    @GetMapping
    public List<Task> getTasks(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Long assignedTo
    ) {


        if ("ROLE_ADMIN".equals(role)) {

            if (status != null && assignedTo != null) {
                return repo.findByStatusAndAssignedTo(status, assignedTo);
            }

            if (status != null) {
                return repo.findByStatus(status);
            }

            if (assignedTo != null) {
                return repo.findByAssignedTo(assignedTo);
            }

            return repo.findAll();
        }


        List<Task> userTasks = repo.findByAssignedToOrCreatedBy(userId, userId);


        if (status != null) {
            return userTasks.stream()
                    .filter(t -> status.equals(t.getStatus()))
                    .toList();
        }

        return userTasks;
    }


    @PutMapping("/{id}")
    public Task update(@PathVariable Long id, @RequestBody Task updated) {

        Task task = repo.findById(id).orElseThrow();

        task.setTitle(updated.getTitle());
        task.setDescription(updated.getDescription());
        task.setStatus(updated.getStatus());
        task.setAssignedTo(updated.getAssignedTo());

        return repo.save(task);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}