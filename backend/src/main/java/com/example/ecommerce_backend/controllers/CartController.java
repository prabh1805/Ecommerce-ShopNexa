package com.example.ecommerce_backend.controllers;

import com.example.ecommerce_backend.models.Cart;
import com.example.ecommerce_backend.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    // ✅ GET CART
    @GetMapping
    public ResponseEntity<Cart> getCart(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(
                cartService.getCart(userDetails.getUsername())
        );
    }

    // ✅ ADD TO CART
    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam String productId,
            @RequestParam(defaultValue = "1") int quantity
    ) {
        return ResponseEntity.ok(
                cartService.addToCart(
                        userDetails.getUsername(), productId, quantity
                )
        );
    }

    // ✅ UPDATE QUANTITY
    @PutMapping("/update")
    public ResponseEntity<Cart> updateQuantity(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam String productId,
            @RequestParam int quantity
    ) {
        return ResponseEntity.ok(
                cartService.updateQuantity(
                        userDetails.getUsername(), productId, quantity
                )
        );
    }

    // ✅ REMOVE ITEM
    @DeleteMapping("/remove")
    public ResponseEntity<Cart> removeFromCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam String productId
    ) {
        return ResponseEntity.ok(
                cartService.removeFromCart(
                        userDetails.getUsername(), productId
                )
        );
    }

    // ✅ CLEAR CART
    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        cartService.clearCart(userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}
