package com.nhathuoc.pharmacy_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "medicine_batches")
@Data
public class MedicineBatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String batchNumber; // Mã số lô hàng

    @ManyToOne
    @JoinColumn(name = "medicine_id", nullable = false)
    private Medicine medicine;

    @Column(nullable = false)
    private int quantity; // Số lượng tồn kho

    @Column(nullable = false)
    private LocalDate manufacturingDate; // Ngày sản xuất

    @Column(nullable = false)
    private LocalDate expiryDate; // Hạn sử dụng
}