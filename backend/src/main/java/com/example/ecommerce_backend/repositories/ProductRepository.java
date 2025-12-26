package com.example.ecommerce_backend.repositories;

import com.example.ecommerce_backend.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {

    // ✅ MUST MATCH sellerId FIELD
    Page<Product> findBySellerId(String sellerId, Pageable pageable);

    // ✅ MUST MATCH sellerId FIELD
    Page<Product> findBySellerIdAndCategoryIgnoreCase(
            String sellerId,
            String category,
            Pageable pageable
    );

    Page<Product> findByCategoryIgnoreCase(String category, Pageable pageable);
}
