package com.example.ecommerce_backend.service;

import com.example.ecommerce_backend.models.Product;
import com.example.ecommerce_backend.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    // ✅ ADD PRODUCT
    public Product addProduct(Product product, String sellerId) {
        product.setSellerId(sellerId);
        return productRepository.save(product);
    }

    // ✅ SELLER PRODUCTS
    public Page<Product> getFilteredSellerProducts(
            String sellerId,
            int page,
            int size,
            String category
    ) {
        Pageable pageable =
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));

        if (category != null && !category.isBlank()) {
            return productRepository.findBySellerIdAndCategoryIgnoreCase(
                    sellerId, category, pageable
            );
        }

        return productRepository.findBySellerId(sellerId, pageable);
    }

    // ✅ UPDATE PRODUCT (seller-only)
    public Product updateProduct(
            String productId,
            Product updated,
            String sellerId
    ) {
        return productRepository.findById(productId)
                .map(existing -> {
                    if (!existing.getSellerId().equals(sellerId)) {
                        throw new RuntimeException("Unauthorized");
                    }

                    applyUpdates(existing, updated);
                    return productRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    private void applyUpdates(Product old, Product updated) {
        old.setName(updated.getName());
        old.setCategory(updated.getCategory());
        old.setPrice(updated.getPrice());
        old.setQuantity(updated.getQuantity());
        old.setImageUrl(updated.getImageUrl());
        old.setDescription(updated.getDescription());
    }

    // ✅ PUBLIC PRODUCTS
    public Page<Product> getAllProducts(
            int page,
            int size,
            String category
    ) {
        Pageable pageable =
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));

        if (category != null && !category.isBlank()) {
            return productRepository.findByCategoryIgnoreCase(category, pageable);
        }

        return productRepository.findAll(pageable);
    }

    //Delete Products
    public void deleteProduct(String productId, String sellerId){
        Product product = productRepository.findById(productId).
                orElseThrow(() -> new RuntimeException("Product not found"));
        if(!product.getSellerId().equals(sellerId)){
            throw new RuntimeException("Unauthorized");
        }
        productRepository.delete(product);
    }
}
