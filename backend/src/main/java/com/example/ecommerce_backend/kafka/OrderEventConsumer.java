package com.example.ecommerce_backend.kafka;

import com.example.ecommerce_backend.config.KafkaConfig;
import com.example.ecommerce_backend.events.NotificationEvent;
import com.example.ecommerce_backend.events.OrderEvent;
import com.example.ecommerce_backend.models.OrderStatus;
import com.example.ecommerce_backend.models.Orders;
import com.example.ecommerce_backend.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderEventConsumer {

    private final OrderRepository orderRepository;
    private final OrderEventProducer eventProducer;

    @KafkaListener(
            topics = KafkaConfig.ORDER_TOPIC,
            groupId = "order-processing-group",
            properties = {
                    "spring.json.value.default.type=com.example.ecommerce_backend.events.OrderEvent"
            }
    )
    public void handleOrderEvent(OrderEvent event) {
        log.info("Received order event: {} for order: {}", event.getEventType(), event.getOrderId());

        switch (event.getEventType()) {
            case ORDER_CREATED -> handleOrderCreated(event);
            case PAYMENT_SUCCESS -> handlePaymentSuccess(event);
            case PAYMENT_FAILED -> handlePaymentFailed(event);
            case ORDER_CANCELLED -> handleOrderCancelled(event);
        }
    }

    private void handleOrderCreated(OrderEvent event) {
        log.info("Processing new order: {}", event.getOrderId());

        // Send order confirmation notification
        NotificationEvent notification = new NotificationEvent(
                event.getUserId(),
                event.getUserEmail(),
                "Order Created",
                "Your order #" + event.getOrderId() + " has been created. Total: ₹" + event.getTotalAmount(),
                NotificationEvent.NotificationType.ORDER_CONFIRMATION,
                LocalDateTime.now()
        );
        eventProducer.sendNotificationEvent(notification);
    }

    private void handlePaymentSuccess(OrderEvent event) {
        log.info("Payment successful for order: {}", event.getOrderId());

        orderRepository.findById(event.getOrderId()).ifPresent(order -> {
            order.setStatus(OrderStatus.PAID);
            orderRepository.save(order);
        });

        NotificationEvent notification = new NotificationEvent(
                event.getUserId(),
                event.getUserEmail(),
                "Payment Successful",
                "Payment for order #" + event.getOrderId() + " was successful. Amount: ₹" + event.getTotalAmount(),
                NotificationEvent.NotificationType.PAYMENT_SUCCESS,
                LocalDateTime.now()
        );
        eventProducer.sendNotificationEvent(notification);
    }

    private void handlePaymentFailed(OrderEvent event) {
        log.info("Payment failed for order: {}", event.getOrderId());

        orderRepository.findById(event.getOrderId()).ifPresent(order -> {
            order.setStatus(OrderStatus.FAILED);
            orderRepository.save(order);
        });

        NotificationEvent notification = new NotificationEvent(
                event.getUserId(),
                event.getUserEmail(),
                "Payment Failed",
                "Payment for order #" + event.getOrderId() + " failed. Please retry.",
                NotificationEvent.NotificationType.PAYMENT_FAILED,
                LocalDateTime.now()
        );
        eventProducer.sendNotificationEvent(notification);
    }

    private void handleOrderCancelled(OrderEvent event) {
        log.info("Order cancelled: {}", event.getOrderId());

        orderRepository.findById(event.getOrderId()).ifPresent(order -> {
            order.setStatus(OrderStatus.CANCELLED);
            orderRepository.save(order);
        });

        NotificationEvent notification = new NotificationEvent(
                event.getUserId(),
                event.getUserEmail(),
                "Order Cancelled",
                "Your order #" + event.getOrderId() + " has been cancelled.",
                NotificationEvent.NotificationType.ORDER_CANCELLED,
                LocalDateTime.now()
        );
        eventProducer.sendNotificationEvent(notification);
    }
}
