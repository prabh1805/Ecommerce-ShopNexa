package com.example.ecommerce_backend.kafka;

import com.example.ecommerce_backend.config.KafkaConfig;
import com.example.ecommerce_backend.events.InventoryEvent;
import com.example.ecommerce_backend.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class InventoryEventConsumer {

    private final ProductRepository productRepository;

    @KafkaListener(
            topics = KafkaConfig.INVENTORY_TOPIC,
            groupId = "inventory-processing-group",
            properties = {
                    "spring.json.value.default.type=com.example.ecommerce_backend.events.InventoryEvent"
            }
    )
    @CacheEvict(value = {"products", "productPages"}, allEntries = true)
    public void handleInventoryEvent(InventoryEvent event) {
        log.info("Received inventory event: {} for product: {}", event.getEventType(), event.getProductId());

        switch (event.getEventType()) {
            case STOCK_RESERVED -> reserveStock(event);
            case STOCK_RELEASED -> releaseStock(event);
            case STOCK_DEPLETED -> handleStockDepleted(event);
        }
    }

    private void reserveStock(InventoryEvent event) {
        productRepository.findById(event.getProductId()).ifPresent(product -> {
            int newQuantity = product.getQuantity() - event.getQuantityChange();
            if (newQuantity < 0) {
                log.warn("Insufficient stock for product: {}. Available: {}, Requested: {}",
                        event.getProductId(), product.getQuantity(), event.getQuantityChange());
                return;
            }
            product.setQuantity(newQuantity);
            productRepository.save(product);
            log.info("Stock reserved for product: {}. New quantity: {}", event.getProductId(), newQuantity);
        });
    }

    private void releaseStock(InventoryEvent event) {
        productRepository.findById(event.getProductId()).ifPresent(product -> {
            product.setQuantity(product.getQuantity() + event.getQuantityChange());
            productRepository.save(product);
            log.info("Stock released for product: {}. New quantity: {}", event.getProductId(), product.getQuantity());
        });
    }

    private void handleStockDepleted(InventoryEvent event) {
        log.warn("Stock depleted for product: {} ({})", event.getProductName(), event.getProductId());
    }
}
