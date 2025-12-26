package com.example.ecommerce_backend.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "cart")
public class Cart {

    @Id
    private String id;

    private String userEmail;

    private List<CartItem> items = new ArrayList<>();
}
