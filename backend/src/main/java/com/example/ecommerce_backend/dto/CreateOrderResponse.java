package com.example.ecommerce_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class CreateOrderResponse {
    private String orderId;
    private String razorpayOrderId;
    private BigDecimal amount;
    private String currency;
}
