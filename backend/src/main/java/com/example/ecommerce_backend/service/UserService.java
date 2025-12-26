package com.example.ecommerce_backend.service;

import com.example.ecommerce_backend.dto.UpdateUserRequest;
import com.example.ecommerce_backend.models.User;
import com.example.ecommerce_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User updateUser(String userId, UpdateUserRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.firstName() != null) user.setFirstName(request.firstName());
        if (request.lastName() != null) user.setLastName(request.lastName());
        if (request.email() != null && !request.email().equals(user.getEmail())) {
            boolean emailExists = userRepository.findByEmail(request.email()).isPresent();
            if (emailExists) {
                throw new RuntimeException("Email already exists");
            }
            user.setEmail(request.email());
        }

        if (request.address() != null) user.setAddress(request.address());
        if (request.city() != null) user.setCity(request.city());
        if (request.state() != null) user.setState(request.state());
        if (request.pinCode() != null) user.setPinCode(request.pinCode());
        if (request.phoneNumber() != null) user.setPhoneNumber(request.phoneNumber());

        return userRepository.save(user);
    }
}
