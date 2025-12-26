package com.example.ecommerce_backend.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("products")
public class Product {
    @Id
    private String id;
    private String sellerId;
    private String description;
    private String name;
    private String category;
    private double price;
    private int quantity;
    private String imageUrl;
}
