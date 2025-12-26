package com.example.ecommerce_backend.dto;

public record RegisterRequest(
        String firstName,
        String lastName,
        String email,
        String password,
        String roles, //BUYER or SELLER
        String countryCode,
        String phoneNumber,
        String address,
        String city,
        String state,
        String pinCode
) {
}
