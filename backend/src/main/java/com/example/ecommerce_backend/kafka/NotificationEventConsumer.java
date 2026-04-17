package com.example.ecommerce_backend.kafka;

import com.example.ecommerce_backend.config.KafkaConfig;
import com.example.ecommerce_backend.events.NotificationEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationEventConsumer {

    @KafkaListener(
            topics = KafkaConfig.NOTIFICATION_TOPIC,
            groupId = "notification-processing-group",
            properties = {
                    "spring.json.value.default.type=com.example.ecommerce_backend.events.NotificationEvent"
            }
    )
    public void handleNotificationEvent(NotificationEvent event) {
        log.info("Received notification event: {} for user: {}", event.getType(), event.getUserEmail());

        switch (event.getType()) {
            case ORDER_CONFIRMATION -> sendOrderConfirmation(event);
            case PAYMENT_SUCCESS -> sendPaymentSuccess(event);
            case PAYMENT_FAILED -> sendPaymentFailed(event);
            case ORDER_SHIPPED -> sendOrderShipped(event);
            case ORDER_CANCELLED -> sendOrderCancelled(event);
        }
    }

    private void sendOrderConfirmation(NotificationEvent event) {
        // In production, integrate with an email/SMS service (SendGrid, SES, Twilio, etc.)
        log.info("📧 Sending order confirmation to {}: {}", event.getUserEmail(), event.getMessage());
    }

    private void sendPaymentSuccess(NotificationEvent event) {
        log.info("📧 Sending payment success notification to {}: {}", event.getUserEmail(), event.getMessage());
    }

    private void sendPaymentFailed(NotificationEvent event) {
        log.info("📧 Sending payment failure notification to {}: {}", event.getUserEmail(), event.getMessage());
    }

    private void sendOrderShipped(NotificationEvent event) {
        log.info("📧 Sending order shipped notification to {}: {}", event.getUserEmail(), event.getMessage());
    }

    private void sendOrderCancelled(NotificationEvent event) {
        log.info("📧 Sending order cancellation notification to {}: {}", event.getUserEmail(), event.getMessage());
    }
}
