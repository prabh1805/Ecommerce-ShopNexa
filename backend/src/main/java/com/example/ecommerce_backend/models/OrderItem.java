package com.example.ecommerce_backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
    private String productId;
    private String productName;
    private String imageUrl;
    private int quantity;
    private double price;

    public double getTotalPrice() {
        return quantity * price;
    }
}
