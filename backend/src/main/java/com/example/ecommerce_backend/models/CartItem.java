package com.example.ecommerce_backend.models;

import lombok.Data;

@Data
public class CartItem {
    private String productId;
    private int quantity;
    private String name;
    private String description;
    private String imageUrl;
    private double price;
}
