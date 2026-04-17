package com.example.ecommerce_backend.service;

import com.example.ecommerce_backend.events.InventoryEvent;
import com.example.ecommerce_backend.events.OrderEvent;
import com.example.ecommerce_backend.kafka.OrderEventProducer;
import com.example.ecommerce_backend.models.OrderStatus;
import com.example.ecommerce_backend.models.Orders;
import com.example.ecommerce_backend.repositories.CartRepository;
import com.example.ecommerce_backend.repositories.OrderRepository;
import com.example.ecommerce_backend.repositories.UserRepository;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final OrderEventProducer eventProducer;

    @Value("${razorpay.webhook-secret}")
    private String webhookSecret;

    public void processWebHooks(String payload, String signature) {
        try {
            boolean isValid = Utils.verifyWebhookSignature(payload, signature, webhookSecret);
            if (!isValid) {
                throw new SecurityException("Invalid Razorpay Signature");
            }

            JSONObject json = new JSONObject(payload);
            String event = json.getString("event");

            if ("payment.captured".equals(event)) {
                handlePaymentCaptured(json);
            } else if ("payment.failed".equals(event)) {
                handlePaymentFailed(json);
            }

        } catch (RazorpayException e) {
            throw new RuntimeException("Webhook verification failed", e);
        }
    }

    private void handlePaymentCaptured(JSONObject json) {
        JSONObject paymentEntity = json.getJSONObject("payload")
                .getJSONObject("payment")
                .getJSONObject("entity");

        String razorpayOrderId = paymentEntity.getString("order_id");
        String razorpayPaymentId = paymentEntity.getString("id");

        Orders order = orderRepository.findByRazorpayOrderId(razorpayOrderId)
                .orElseThrow(() -> new RuntimeException("Order not found for razorpay order: " + razorpayOrderId));

        order.setRazorpayPaymentId(razorpayPaymentId);
        order.setStatus(OrderStatus.PAID);
        orderRepository.save(order);

        // Clear the user's cart after successful payment
        userRepository.findById(order.getUserId()).ifPresent(user ->
                cartRepository.findByUserEmail(user.getEmail()).ifPresent(cart -> {
                    cart.getItems().clear();
                    cartRepository.save(cart);
                })
        );

        // Publish payment success event
        userRepository.findById(order.getUserId()).ifPresent(user -> {
            OrderEvent orderEvent = new OrderEvent(
                    order.getId(),
                    order.getUserId(),
                    user.getEmail(),
                    razorpayOrderId,
                    order.getTotalAmount(),
                    OrderEvent.OrderEventType.PAYMENT_SUCCESS,
                    LocalDateTime.now()
            );
            eventProducer.sendOrderEvent(orderEvent);
        });

        log.info("Payment captured for order: {}", order.getId());
    }

    private void handlePaymentFailed(JSONObject json) {
        JSONObject paymentEntity = json.getJSONObject("payload")
                .getJSONObject("payment")
                .getJSONObject("entity");

        String razorpayOrderId = paymentEntity.getString("order_id");

        Orders order = orderRepository.findByRazorpayOrderId(razorpayOrderId)
                .orElseThrow(() -> new RuntimeException("Order not found for razorpay order: " + razorpayOrderId));

        order.setStatus(OrderStatus.FAILED);
        orderRepository.save(order);

        // Release reserved inventory
        order.getItems().forEach(item -> {
            InventoryEvent inventoryEvent = new InventoryEvent(
                    item.getProductId(),
                    item.getProductName(),
                    item.getQuantity(),
                    order.getId(),
                    InventoryEvent.InventoryEventType.STOCK_RELEASED
            );
            eventProducer.sendInventoryEvent(inventoryEvent);
        });

        // Publish payment failed event
        userRepository.findById(order.getUserId()).ifPresent(user -> {
            OrderEvent orderEvent = new OrderEvent(
                    order.getId(),
                    order.getUserId(),
                    user.getEmail(),
                    razorpayOrderId,
                    order.getTotalAmount(),
                    OrderEvent.OrderEventType.PAYMENT_FAILED,
                    LocalDateTime.now()
            );
            eventProducer.sendOrderEvent(orderEvent);
        });

        log.info("Payment failed for order: {}", order.getId());
    }
}
