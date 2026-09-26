package com.nhathuoc.pharmacy_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "medicines")
@Data
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name; // Tên thương mại (Ví dụ: Panadol Extra)

    @Column(length = 50)
    private String unit; // Đơn vị tính (Viên, Hộp, Vỉ, Chai...)

    private double price; // Giá bán lẻ

    @ManyToOne
    @JoinColumn(name = "active_ingredient_id")
    private ActiveIngredient activeIngredient;

    @Column(columnDefinition = "TEXT")
    private String usageInstructions;
}