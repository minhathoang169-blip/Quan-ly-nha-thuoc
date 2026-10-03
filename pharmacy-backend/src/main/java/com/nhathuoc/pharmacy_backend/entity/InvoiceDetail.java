package com.nhathuoc.pharmacy_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "invoice_details")
@Data
public class InvoiceDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;

    @ManyToOne
    @JoinColumn(name = "batch_id")
    private MedicineBatch batch;

    private int quantity;

    private double unitPrice;
}
