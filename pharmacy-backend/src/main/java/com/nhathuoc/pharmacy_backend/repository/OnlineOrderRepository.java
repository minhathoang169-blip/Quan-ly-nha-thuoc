package com.nhathuoc.pharmacy_backend.repository;

import com.nhathuoc.pharmacy_backend.entity.OnlineOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OnlineOrderRepository extends JpaRepository<OnlineOrder, Long> {
}
