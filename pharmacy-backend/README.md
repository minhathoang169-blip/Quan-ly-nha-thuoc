# Pharmacy Backend

Backend Spring Boot cung cấp REST API CRUD cho sản phẩm, lô thuốc, khách hàng, nhân viên và nhà cung cấp.

## Yêu cầu

- JDK 22 (theo `pom.xml`); Maven Wrapper có sẵn (`mvnw.cmd`).
- SQL Server (bật TCP/IP, port `1433`).

---

## Hướng dẫn chạy

### Bước 1 — Tạo database trong SQL Server

Mở **SQL Server Management Studio (SSMS)** hoặc **Azure Data Studio**, kết nối vào `localhost` rồi chạy:

```sql
CREATE DATABASE PharmacyDB;
```

> Chỉ cần làm bước này **một lần**. Hibernate sẽ tự tạo toàn bộ bảng khi app khởi động.

---

### Bước 2 — Bật TCP/IP cho SQL Server

1. Mở **SQL Server Configuration Manager**
2. Vào **SQL Server Network Configuration → Protocols for MSSQLSERVER**
3. Bật **TCP/IP** (nếu chưa bật) → Restart dịch vụ SQL Server

---

### Bước 3 — Khởi động app

**Chạy bình thường** (không có dữ liệu mẫu):

```powershell
.\mvnw.cmd spring-boot:run
```

**Chạy với dữ liệu mẫu** (khuyến nghị lần đầu):

```powershell
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=local"
```

> Profile `local` sẽ tự động chèn dữ liệu mẫu vào DB (nhân viên, khách hàng, sản phẩm, lô thuốc...) nếu DB còn trống.

Backend chạy tại: `http://localhost:8080`

---

## Danh sách API

| Endpoint | Mô tả |
|----------|-------|
| `/api/medicines` | Sản phẩm / thuốc |
| `/api/batches` | Lô thuốc |
| `/api/customers` | Khách hàng |
| `/api/employees` | Nhân viên |
| `/api/suppliers` | Nhà cung cấp |

Mỗi endpoint hỗ trợ: `GET`, `GET /{id}`, `POST`, `PUT /{id}`, `DELETE /{id}`

- **GET** công khai, không cần xác thực.
- **POST / PUT / DELETE** yêu cầu **HTTP Basic Auth** (username/password in trong log khi khởi động).

---

## Lưu ý

- Project dùng **Code First** — Hibernate tự tạo và cập nhật bảng theo các class Entity (`ddl-auto=update`).
- Kết nối dùng **Windows Authentication** (`integratedSecurity=true`), không cần nhập username/password trong config.
