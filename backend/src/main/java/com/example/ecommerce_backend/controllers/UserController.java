package com.example.ecommerce_backend.controllers;

import com.example.ecommerce_backend.dto.UpdateUserRequest;
import com.example.ecommerce_backend.models.User;
import com.example.ecommerce_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @PutMapping("/update")
    public ResponseEntity<User> updateUser(
            @AuthenticationPrincipal User user,
            @RequestBody UpdateUserRequest request
    ) {
        User updatedUser = userService.updateUser(user.getId(), request);
        return ResponseEntity.ok(updatedUser);
    }

}
