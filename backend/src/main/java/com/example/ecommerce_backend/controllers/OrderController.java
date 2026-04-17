package com.example.ecommerce_backend.controllers;

import com.example.ecommerce_backend.dto.CreateOrderResponse;
import com.example.ecommerce_backend.models.Orders;
import com.example.ecommerce_backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    //Auth Required
    @PostMapping("/create")
    public ResponseEntity<CreateOrderResponse> createOrder(
            @AuthenticationPrincipal UserDetails userDetails
    ) throws Exception{
        Orders orders = orderService.createRazorpayOrder(userDetails.getUsername());
        return ResponseEntity.ok(
                new CreateOrderResponse(
                        orders.getId(),
                        orders.getRazorpayOrderId(),
                        orders.getTotalAmount(),
                        "INR"
                )
        );
    }
}
