package com.example.ecommerce_backend.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "orders")
@Data
public class Orders {
    @Id
    private String id;
    private String userId;
    private List<OrderItem> items;
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private OrderStatus status;
    private BigDecimal totalAmount;
    private LocalDateTime createdAt = LocalDateTime.now();

}
