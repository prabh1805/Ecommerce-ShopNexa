package com.example.ecommerce_backend.repositories;

import com.example.ecommerce_backend.models.Orders;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface OrderRepository extends MongoRepository<Orders, String> {
    Optional<Orders> findByRazorpayOrderId(String razorpayOrderId);
}
