package com.example.ecommerce_backend.kafka;

import com.example.ecommerce_backend.config.KafkaConfig;
import com.example.ecommerce_backend.events.InventoryEvent;
import com.example.ecommerce_backend.events.NotificationEvent;
import com.example.ecommerce_backend.events.OrderEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderEventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void sendOrderEvent(OrderEvent event) {
        log.info("Publishing order event: {} for order: {}", event.getEventType(), event.getOrderId());
        kafkaTemplate.send(KafkaConfig.ORDER_TOPIC, event.getOrderId(), event);
    }

    public void sendInventoryEvent(InventoryEvent event) {
        log.info("Publishing inventory event: {} for product: {}", event.getEventType(), event.getProductId());
        kafkaTemplate.send(KafkaConfig.INVENTORY_TOPIC, event.getProductId(), event);
    }

    public void sendNotificationEvent(NotificationEvent event) {
        log.info("Publishing notification event: {} for user: {}", event.getType(), event.getUserEmail());
        kafkaTemplate.send(KafkaConfig.NOTIFICATION_TOPIC, event.getUserId(), event);
    }
}
