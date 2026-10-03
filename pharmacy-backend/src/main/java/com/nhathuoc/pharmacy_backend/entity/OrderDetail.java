package com.nhathuoc.pharmacy_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "order_details")
@Data
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private OnlineOrder onlineOrder;

    @ManyToOne
    @JoinColumn(name = "medicine_id")
    private Medicine medicine;

    private int quantity;

    private double price;
}
