package com.nhathuoc.pharmacy_backend.repository;

import com.nhathuoc.pharmacy_backend.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
}
