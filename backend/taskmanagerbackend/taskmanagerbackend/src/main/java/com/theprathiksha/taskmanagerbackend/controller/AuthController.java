package com.theprathiksha.taskmanagerbackend.controller;

import org.springframework.web.bind.annotation.*;
import com.theprathiksha.taskmanagerbackend.entity.User;
import com.theprathiksha.taskmanagerbackend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;



@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    public AuthController(UserRepository repo) {
        this.repo = repo;
    }


    @PostMapping("/login")
    public User login(@RequestBody User user) {
        User dbUser = repo.findByEmail(user.getEmail());

        if (dbUser != null && encoder.matches(user.getPassword(), dbUser.getPassword())) {
            return dbUser;
        }
        throw new RuntimeException("Invalid credentials");
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        user.setPassword(encoder.encode(user.getPassword())); // 🔐 encrypt
        user.setRole("ROLE_USER");  // IMPORTANT
        return repo.save(user);
    }
}