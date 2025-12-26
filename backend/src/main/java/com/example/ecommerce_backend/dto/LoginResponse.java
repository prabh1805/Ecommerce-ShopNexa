package com.example.ecommerce_backend.dto;

public record LoginResponse(
        String id,
        String firstName,
        String lastName,
        String email,
        String role
) {}
