package com.example.ecommerce_backend.events;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryEvent {
    private String productId;
    private String productName;
    private int quantityChange;
    private String orderId;
    private InventoryEventType eventType;

    public enum InventoryEventType {
        STOCK_RESERVED,
        STOCK_RELEASED,
        STOCK_DEPLETED
    }
}
