package com.example.ecommerce_backend.events;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderEvent {
    private String orderId;
    private String userId;
    private String userEmail;
    private String razorpayOrderId;
    private BigDecimal totalAmount;
    private OrderEventType eventType;
    private LocalDateTime timestamp;

    public enum OrderEventType {
        ORDER_CREATED,
        PAYMENT_SUCCESS,
        PAYMENT_FAILED,
        ORDER_CANCELLED
    }
}
