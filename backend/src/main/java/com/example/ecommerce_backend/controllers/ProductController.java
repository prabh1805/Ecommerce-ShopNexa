package com.example.ecommerce_backend.controllers;

import com.example.ecommerce_backend.models.Product;
import com.example.ecommerce_backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // ✅ SELLER ONLY
    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(
            @RequestBody Product product,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(
                productService.addProduct(product, userDetails.getUsername())
        );
    }

    // ✅ SELLER PRODUCTS
    @GetMapping("/seller")
    public ResponseEntity<?> getSellerProducts(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(required = false) String category
    ) {
        var pageResult =
                productService.getFilteredSellerProducts(
                        userDetails.getUsername(),
                        page,
                        size,
                        category
                );

        return ResponseEntity.ok(
                java.util.Map.of(
                        "products", pageResult.getContent(),
                        "page", pageResult.getNumber(),
                        "size", pageResult.getSize(),
                        "totalPages", pageResult.getTotalPages(),
                        "totalElements", pageResult.getTotalElements()
                )
        );
    }

    // ✅ UPDATE PRODUCT
    @PutMapping("/{productId}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable String productId,
            @RequestBody Product product,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(
                productService.updateProduct(
                        productId,
                        product,
                        userDetails.getUsername()
                )
        );
    }

    // ✅ PUBLIC PRODUCTS
    @GetMapping
    public Page<Product> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String category
    ) {
        return productService.getAllProducts(page, size, category);
    }

    //Delete Product (Seller only)
    @DeleteMapping("/{productId}")
    public ResponseEntity<?> deleteProduct(
            @PathVariable String productId,
            @AuthenticationPrincipal UserDetails userDetails
    ){
        productService.deleteProduct(productId, userDetails.getUsername());
        return  ResponseEntity.noContent().build();
    }
}
