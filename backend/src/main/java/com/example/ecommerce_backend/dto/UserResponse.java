package com.example.ecommerce_backend.dto;

import com.example.ecommerce_backend.models.User;
import lombok.Data;

@Data
public class UserResponse {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String roles;
    private String countryCode;
    private String phoneNumber;
    private String address;
    private String city;
    private String state;
    private String pinCode;

    //Mapper
    public static UserResponse from(User user){
        UserResponse dto = new UserResponse();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setRoles(user.getRoles());
        dto.setCountryCode(user.getCountryCode());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setAddress(user.getAddress());
        dto.setCity(user.getCity());
        dto.setState(user.getState());
        dto.setPinCode(user.getPinCode());
        return dto;
    }
}
