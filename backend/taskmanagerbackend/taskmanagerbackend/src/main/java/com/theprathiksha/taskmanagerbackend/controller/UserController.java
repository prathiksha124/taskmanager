package com.theprathiksha.taskmanagerbackend.controller;

import com.theprathiksha.taskmanagerbackend.entity.Task;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.theprathiksha.taskmanagerbackend.entity.User;
import com.theprathiksha.taskmanagerbackend.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    private final UserRepository repo;

    public UserController(UserRepository repo) {
        this.repo = repo;
    }


    @GetMapping
    public List<User> getAllUsers() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }


    @PutMapping("/{id}/deactivate")
    public User deactivateUser(@PathVariable Long id) {
        User user = repo.findById(id).orElseThrow();
        user.setRole("INACTIVE");
        return repo.save(user);
    }
}