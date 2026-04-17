package com.example.ecommerce_backend.events;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationEvent {
    private String userId;
    private String userEmail;
    private String subject;
    private String message;
    private NotificationType type;
    private LocalDateTime timestamp;

    public enum NotificationType {
        ORDER_CONFIRMATION,
        PAYMENT_SUCCESS,
        PAYMENT_FAILED,
        ORDER_SHIPPED,
        ORDER_CANCELLED
    }
}
