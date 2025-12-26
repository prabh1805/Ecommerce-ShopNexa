package com.example.ecommerce_backend.service;

import com.example.ecommerce_backend.models.Cart;
import com.example.ecommerce_backend.models.CartItem;
import com.example.ecommerce_backend.models.Product;
import com.example.ecommerce_backend.repositories.CartRepository;
import com.example.ecommerce_backend.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    // ✅ GET OR CREATE CART
    public Cart getCart(String userEmail) {

        return cartRepository.findByUserEmail(userEmail)
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setUserEmail(userEmail);
                    cart.setItems(new ArrayList<>());
                    return cartRepository.save(cart);
                });
    }

    // ✅ ADD TO CART
    public Cart addToCart(String userEmail, String productId, int quantity) {

        if (quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than zero");
        }

        Cart cart = getCart(userEmail);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        for (CartItem item : cart.getItems()) {
            if (item.getProductId().equals(productId)) {
                item.setQuantity(item.getQuantity() + quantity);
                return cartRepository.save(cart);
            }
        }

        CartItem item = new CartItem();
        item.setProductId(productId);
        item.setQuantity(quantity);
        item.setName(product.getName());
        item.setDescription(product.getDescription());
        item.setPrice(product.getPrice());
        item.setImageUrl(product.getImageUrl());

        cart.getItems().add(item);
        return cartRepository.save(cart);
    }

    // ✅ UPDATE QUANTITY
    public Cart updateQuantity(String userEmail, String productId, int quantity) {

        if (quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than zero");
        }

        Cart cart = getCart(userEmail);

        cart.getItems().forEach(item -> {
            if (item.getProductId().equals(productId)) {
                item.setQuantity(quantity);
            }
        });

        return cartRepository.save(cart);
    }

    // ✅ REMOVE ITEM
    public Cart removeFromCart(String userEmail, String productId) {

        Cart cart = getCart(userEmail);
        cart.getItems().removeIf(item -> item.getProductId().equals(productId));
        return cartRepository.save(cart);
    }

    // ✅ CLEAR CART
    public void clearCart(String userEmail) {

        Cart cart = getCart(userEmail);
        cart.getItems().clear();
        cartRepository.save(cart);
    }
}
