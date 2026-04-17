package com.example.ecommerce_backend.service;

import com.example.ecommerce_backend.events.InventoryEvent;
import com.example.ecommerce_backend.events.OrderEvent;
import com.example.ecommerce_backend.kafka.OrderEventProducer;
import com.example.ecommerce_backend.models.*;
import com.example.ecommerce_backend.repositories.CartRepository;
import com.example.ecommerce_backend.repositories.OrderRepository;
import com.example.ecommerce_backend.repositories.UserRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final RazorpayClient razorpayClient;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final OrderEventProducer eventProducer;

    public Orders createOrder(String username) throws Exception {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUserEmail(username)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        List<OrderItem> orderItems = cart.getItems().stream()
                .map(cartItem -> new OrderItem(
                        cartItem.getProductId(),
                        cartItem.getName(),
                        cartItem.getImageUrl(),
                        cartItem.getQuantity(),
                        cartItem.getPrice()
                ))
                .toList();

        Orders order = new Orders();
        order.setUserId(user.getId());
        order.setItems(orderItems);
        order.setTotalAmount(calculateTotal(orderItems));
        order.setStatus(OrderStatus.CREATED);

        Orders savedOrder = orderRepository.save(order);

        // Publish order created event via Kafka
        OrderEvent orderEvent = new OrderEvent(
                savedOrder.getId(),
                user.getId(),
                user.getEmail(),
                null,
                savedOrder.getTotalAmount(),
                OrderEvent.OrderEventType.ORDER_CREATED,
                LocalDateTime.now()
        );
        eventProducer.sendOrderEvent(orderEvent);

        // Publish inventory reservation events for each item
        for (OrderItem item : orderItems) {
            InventoryEvent inventoryEvent = new InventoryEvent(
                    item.getProductId(),
                    item.getProductName(),
                    item.getQuantity(),
                    savedOrder.getId(),
                    InventoryEvent.InventoryEventType.STOCK_RESERVED
            );
            eventProducer.sendInventoryEvent(inventoryEvent);
        }

        return savedOrder;
    }

    private BigDecimal calculateTotal(List<OrderItem> items) {
        return items.stream()
                .map(item ->
                        BigDecimal.valueOf(item.getPrice())
                                .multiply(BigDecimal.valueOf(item.getQuantity()))
                )
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public Orders createRazorpayOrder(String username) throws Exception {
        Orders orders = createOrder(username);

        long amountInPaise = orders.getTotalAmount()
                .multiply(BigDecimal.valueOf(100))
                .longValueExact();

        JSONObject options = new JSONObject();
        options.put("amount", amountInPaise);
        options.put("currency", "INR");
        options.put("receipt", "order_" + orders.getId());

        Order razorpayOrder = razorpayClient.orders.create(options);

        orders.setRazorpayOrderId(razorpayOrder.get("id"));
        orderRepository.save(orders);

        return orders;
    }
}
