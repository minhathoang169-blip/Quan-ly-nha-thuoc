# Pharmacy backend

Backend Spring Boot cung cấp CRUD cho sản phẩm và lô thuốc, cùng tồn kho tổng hợp và hạn dùng gần nhất.

## Yêu cầu

- JDK 22 (theo `pom.xml`); Maven Wrapper có sẵn.
- SQL Server tùy chọn. Mặc định backend dùng H2 local.

## Chạy local

```powershell
.\mvnw.cmd spring-boot:run
```

Backend chạy ở `http://localhost:8080`. Profile `local` dùng H2 trong bộ nhớ với ba mặt hàng mẫu; dữ liệu được tạo lại khi backend khởi động.

## SQL Server

`data.sql` tạo schema `QuanLyNhaThuocDB` gồm các bảng tiếng Việt và dữ liệu mẫu. Entity JPA ánh xạ vào `SanPham` và `LoThuoc`; schema không tự được tạo khi chạy profile SQL Server (`ddl-auto=none`).

Bật TCP/IP cho SQL Server instance và cấu hình loopback port `1433`, sau đó restart dịch vụ. Profile dùng Windows Authentication của tài khoản chạy backend; Maven copy native DLL vào `target/native`.

```powershell
$env:DB_HOST = 'localhost'
$env:DB_PORT = '1433'
$env:DB_NAME = 'QuanLyNhaThuocDB'
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=sqlserver"
```

Các API danh mục `/api/medicines`, `/api/batches`, `/api/customers`, `/api/employees`, `/api/suppliers` đều có `GET`, `GET /{id}`, `POST`, `PUT /{id}`, `DELETE /{id}`. GET công khai; request ghi yêu cầu HTTP Basic Auth, mật khẩu development được in trong log Spring.