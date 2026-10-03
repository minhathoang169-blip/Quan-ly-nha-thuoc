package com.nhathuoc.pharmacy_backend.config;

import com.nhathuoc.pharmacy_backend.entity.*;
import com.nhathuoc.pharmacy_backend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Configuration
@Profile("local")
public class LocalDataSeeder {

    @Bean
    CommandLineRunner seedData(
            MedicineRepository medicineRepo,
            MedicineBatchRepository batchRepo,
            SupplierRepository supplierRepo,
            CustomerRepository customerRepo,
            EmployeeRepository employeeRepo,
            ActiveIngredientRepository activeIngredientRepo,
            UserRepository userRepo,
            InvoiceRepository invoiceRepo,
            OnlineOrderRepository onlineOrderRepo
    ) {
        return args -> {
            // Chỉ seed nếu DB còn trống
            if (medicineRepo.count() > 0) {
                return;
            }

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

            // ── 1. HOẠT CHẤT ──────────────────────────────────────────────
            activeIngredientRepo.saveAll(List.of(
                saveActiveIngredient("Paracetamol",
                        "Thuốc hạ sốt, giảm đau phổ biến"),
                saveActiveIngredient("Amoxicillin",
                        "Kháng sinh nhóm penicillin, dùng trị nhiễm khuẩn"),
                saveActiveIngredient("Vitamin C (Ascorbic Acid)",
                        "Tăng đề kháng, chống oxy hóa"),
                saveActiveIngredient("Cetirizine",
                        "Thuốc kháng histamine H1, trị dị ứng, viêm mũi"),
                saveActiveIngredient("Ibuprofen",
                        "Thuốc kháng viêm không steroid (NSAID), giảm đau, hạ sốt")
            ));

            // ── 2. NHÀ CUNG CẤP ──────────────────────────────────────────
            supplierRepo.saveAll(List.of(
                saveSupplier("NCC001", "Công ty Dược phẩm Trung Ương 1",
                        "0243123456", "Quận Hoàn Kiếm, Hà Nội"),
                saveSupplier("NCC002", "Dược Hậu Giang (DHG Pharma)",
                        "02923891433", "Quận Bình Thủy, Cần Thơ"),
                saveSupplier("NCC003", "Công ty TNHH Traphaco",
                        "0243942553", "Quận Đống Đa, Hà Nội")
            ));

            // ── 3. NHÂN VIÊN ──────────────────────────────────────────────
            employeeRepo.saveAll(List.of(
                saveEmployee("NV001", "Nguyễn Văn Trưởng", "0912345678",
                        LocalDate.of(1990, 5, 12), "Quản lý",
                        LocalDate.of(2022, 1, 15)),
                saveEmployee("NV002", "Trần Thị Dược Sĩ", "0987654321",
                        LocalDate.of(1995, 8, 20), "Nhân viên bán thuốc",
                        LocalDate.of(2023, 3, 1)),
                saveEmployee("NV003", "Lê Hoàng Kho", "0905556667",
                        LocalDate.of(1993, 11, 2), "Nhân viên kho",
                        LocalDate.of(2024, 6, 10))
            ));

            // ── 4. KHÁCH HÀNG ─────────────────────────────────────────────
            customerRepo.saveAll(List.of(
                saveCustomer("KH001", "Phạm Minh Tuấn", "0933444555",
                        "Thủ Đức, TP.HCM", LocalDate.of(2025, 1, 10)),
                saveCustomer("KH002", "Hoàng Lệ Thu", "0944555666",
                        "Quận 9, TP.HCM", LocalDate.of(2025, 2, 14)),
                saveCustomer("KH003", "Khách Vãng Lai", "0000000000",
                        "Không có", LocalDate.of(2025, 1, 1))
            ));

            // ── 5. TÀI KHOẢN USER ─────────────────────────────────────────
            User admin = saveUser(userRepo, encoder,
                    "admin", "admin123", "Nguyễn Văn Trưởng",
                    "admin@nhathuoc.vn", "0912345678", "ADMIN");
            User duocSi = saveUser(userRepo, encoder,
                    "duocsi", "duocsi123", "Trần Thị Dược Sĩ",
                    "duocsi@nhathuoc.vn", "0987654321", "PHARMACIST");
            User kho = saveUser(userRepo, encoder,
                    "thukho", "thukho123", "Lê Hoàng Kho",
                    "kho@nhathuoc.vn", "0905556667", "WAREHOUSE");
            User khachHang = saveUser(userRepo, encoder,
                    "khachhang1", "kh123456", "Phạm Minh Tuấn",
                    "tuan@gmail.com", "0933444555", "CUSTOMER");

            // ── 6. SẢN PHẨM ──────────────────────────────────────────────
            Medicine paracetamol = saveMedicine(medicineRepo,
                    "SP001", "Thuốc hạ sốt Paracetamol 500mg", "Thuốc giảm đau", 2000);
            Medicine amoxicillin = saveMedicine(medicineRepo,
                    "SP002", "Thuốc kháng sinh Amoxicillin 500mg", "Thuốc kháng sinh", 5000);
            Medicine vitaminC = saveMedicine(medicineRepo,
                    "SP003", "Vitamin C tăng sức đề kháng Enervon", "Thực phẩm chức năng", 3500);
            Medicine siroHo = saveMedicine(medicineRepo,
                    "SP004", "Siro ho bổ phế Bảo Thanh", "Thuốc ho", 35000);
            Medicine cetirizine = saveMedicine(medicineRepo,
                    "SP005", "Thuốc dị ứng Cetirizine 10mg", "Thuốc dị ứng", 1800);
            Medicine ibuprofen = saveMedicine(medicineRepo,
                    "SP006", "Thuốc giảm đau Ibuprofen 400mg", "Thuốc giảm đau", 3000);

            // ── 7. LÔ THUỐC ──────────────────────────────────────────────
            MedicineBatch lot1 = saveBatch(batchRepo,
                    "LOT001", paracetamol, 202601, LocalDate.of(2028, 12, 31), 990, 1200);
            MedicineBatch lot2 = saveBatch(batchRepo,
                    "LOT002", paracetamol, 202602, LocalDate.of(2027, 6, 30), 480, 1200);
            MedicineBatch lot3 = saveBatch(batchRepo,
                    "LOT003", amoxicillin, 202603, LocalDate.of(2027, 6, 30), 480, 3500);
            MedicineBatch lot4 = saveBatch(batchRepo,
                    "LOT004", vitaminC, 202604, LocalDate.of(2028, 3, 15), 298, 2200);
            MedicineBatch lot5 = saveBatch(batchRepo,
                    "LOT005", siroHo, 202605, LocalDate.of(2026, 11, 20), 49, 25000); // lô gần hết hạn
            MedicineBatch lot6 = saveBatch(batchRepo,
                    "LOT006", cetirizine, 202606, LocalDate.of(2028, 9, 10), 150, 1000);
            MedicineBatch lot7 = saveBatch(batchRepo,
                    "LOT007", ibuprofen, 202607, LocalDate.of(2029, 1, 15), 200, 1800);

            // ── 8. HÓA ĐƠN BÁN LẺ (Invoice) ─────────────────────────────
            // Hóa đơn 1: Khách Tuấn mua Paracetamol + Vitamin C
            Invoice invoice1 = new Invoice();
            invoice1.setSaleDate(LocalDateTime.of(2026, 3, 1, 9, 30));
            invoice1.setPharmacist(duocSi);

            InvoiceDetail id1a = new InvoiceDetail();
            id1a.setInvoice(invoice1);
            id1a.setBatch(lot1);
            id1a.setQuantity(10);
            id1a.setUnitPrice(2000);

            InvoiceDetail id1b = new InvoiceDetail();
            id1b.setInvoice(invoice1);
            id1b.setBatch(lot4);
            id1b.setQuantity(2);
            id1b.setUnitPrice(3500);

            invoice1.setInvoiceDetails(List.of(id1a, id1b));
            invoice1.setTotalAmount(10 * 2000 + 2 * 3500);
            invoiceRepo.save(invoice1);

            // Hóa đơn 2: Khách Thu mua Siro ho
            Invoice invoice2 = new Invoice();
            invoice2.setSaleDate(LocalDateTime.of(2026, 3, 2, 14, 0));
            invoice2.setPharmacist(duocSi);

            InvoiceDetail id2a = new InvoiceDetail();
            id2a.setInvoice(invoice2);
            id2a.setBatch(lot5);
            id2a.setQuantity(1);
            id2a.setUnitPrice(35000);

            invoice2.setInvoiceDetails(List.of(id2a));
            invoice2.setTotalAmount(35000);
            invoiceRepo.save(invoice2);

            // Hóa đơn 3: Khách vãng lai mua Amoxicillin
            Invoice invoice3 = new Invoice();
            invoice3.setSaleDate(LocalDateTime.of(2026, 3, 2, 16, 45));
            invoice3.setPharmacist(duocSi);

            InvoiceDetail id3a = new InvoiceDetail();
            id3a.setInvoice(invoice3);
            id3a.setBatch(lot3);
            id3a.setQuantity(20);
            id3a.setUnitPrice(5000);

            invoice3.setInvoiceDetails(List.of(id3a));
            invoice3.setTotalAmount(20 * 5000);
            invoiceRepo.save(invoice3);

            // ── 9. ĐƠN HÀNG ONLINE (OnlineOrder) ─────────────────────────
            // Đơn 1: Khách hàng Tuấn đặt Cetirizine + Ibuprofen
            OnlineOrder order1 = new OnlineOrder();
            order1.setCustomer(khachHang);
            order1.setOrderDate(LocalDateTime.of(2026, 3, 5, 10, 0));
            order1.setStatus("COMPLETED");
            order1.setShippingAddress("123 Đường Thủ Đức, TP.HCM");

            OrderDetail od1a = new OrderDetail();
            od1a.setOnlineOrder(order1);
            od1a.setMedicine(cetirizine);
            od1a.setQuantity(2);
            od1a.setPrice(1800);

            OrderDetail od1b = new OrderDetail();
            od1b.setOnlineOrder(order1);
            od1b.setMedicine(ibuprofen);
            od1b.setQuantity(1);
            od1b.setPrice(3000);

            order1.setOrderDetails(List.of(od1a, od1b));
            order1.setTotalAmount(2 * 1800 + 3000);
            onlineOrderRepo.save(order1);

            // Đơn 2: Khách hàng Tuấn đặt Paracetamol (đang chờ xử lý)
            OnlineOrder order2 = new OnlineOrder();
            order2.setCustomer(khachHang);
            order2.setOrderDate(LocalDateTime.of(2026, 3, 10, 8, 30));
            order2.setStatus("PENDING");
            order2.setShippingAddress("123 Đường Thủ Đức, TP.HCM");

            OrderDetail od2a = new OrderDetail();
            od2a.setOnlineOrder(order2);
            od2a.setMedicine(paracetamol);
            od2a.setQuantity(5);
            od2a.setPrice(2000);

            order2.setOrderDetails(List.of(od2a));
            order2.setTotalAmount(5 * 2000);
            onlineOrderRepo.save(order2);
        };
    }

    // ── Helper methods ────────────────────────────────────────────────────────

    private ActiveIngredient saveActiveIngredient(String name, String description) {
        ActiveIngredient ai = new ActiveIngredient();
        ai.setName(name);
        ai.setDescription(description);
        return ai;
    }

    private Supplier saveSupplier(String id, String name, String phone, String address) {
        Supplier s = new Supplier();
        s.setId(id);
        s.setName(name);
        s.setPhone(phone);
        s.setAddress(address);
        return s;
    }

    private Employee saveEmployee(String id, String name, String phone,
            LocalDate birthDate, String role, LocalDate startDate) {
        Employee e = new Employee();
        e.setId(id);
        e.setName(name);
        e.setPhone(phone);
        e.setBirthDate(birthDate);
        e.setRole(role);
        e.setStartDate(startDate);
        return e;
    }

    private Customer saveCustomer(String id, String name, String phone,
            String address, LocalDate createdAt) {
        Customer c = new Customer();
        c.setId(id);
        c.setName(name);
        c.setPhone(phone);
        c.setAddress(address);
        c.setCreatedAt(createdAt);
        return c;
    }

    private User saveUser(UserRepository repo, BCryptPasswordEncoder encoder,
            String username, String rawPassword, String fullName,
            String email, String phone, String role) {
        User u = new User();
        u.setUsername(username);
        u.setPassword(encoder.encode(rawPassword));
        u.setFullName(fullName);
        u.setEmail(email);
        u.setPhone(phone);
        u.setRole(role);
        u.setCreatedAt(LocalDateTime.now());
        return repo.save(u);
    }

    private Medicine saveMedicine(MedicineRepository repo, String id,
            String name, String category, double price) {
        Medicine m = new Medicine();
        m.setId(id);
        m.setName(name);
        m.setCategory(category);
        m.setPrice(price);
        return repo.save(m);
    }

    private MedicineBatch saveBatch(MedicineBatchRepository repo, String id,
            Medicine medicine, int batchNumber, LocalDate expiryDate,
            int quantity, double purchasePrice) {
        MedicineBatch b = new MedicineBatch();
        b.setId(id);
        b.setMedicine(medicine);
        b.setBatchNumber(batchNumber);
        b.setExpiryDate(expiryDate);
        b.setQuantity(quantity);
        b.setPurchasePrice(purchasePrice);
        return repo.save(b);
    }
}
