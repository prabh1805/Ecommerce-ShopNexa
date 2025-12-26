package com.example.ecommerce_backend.dto;

public record UpdateUserRequest(
        String firstName,
        String lastName,
        String email,
        String address,
        String city,
        String state,
        String pinCode,
        String phoneNumber
) {
}
