# Quản lý nhà thuốc

Dự án gồm backend Spring Boot, dashboard React/Vite và ứng dụng Flutter. Backend cung cấp CRUD cho sản phẩm, lô thuốc, khách hàng, nhân viên và nhà cung cấp.

## Yêu cầu

- JDK 22 (được khai báo trong `pharmacy-backend/pom.xml`); Maven Wrapper đã có sẵn.
- Node.js 22.12+ và npm để chạy frontend Vite 8.
- Flutter SDK tương thích với Dart `^3.13.4` nếu chạy ứng dụng di động.
- SQL Server đã cài trên máy.

---

## Cài đặt lần đầu (chỉ làm 1 lần)

### Bước 1 — Bật TCP/IP trong SQL Server Configuration Manager

1. Nhấn **Windows + S**, tìm và mở **SQL Server Configuration Manager**
2. Ở cột trái, bấm vào **SQL Server Network Configuration → Protocols for MSSQLSERVER**
3. Nhìn sang cột phải, tìm dòng **TCP/IP** → chuột phải → **Enable**
4. Ở cột trái, bấm vào **SQL Server Services**
5. Chuột phải vào **SQL Server (MSSQLSERVER)** → **Restart** để áp dụng thay đổi

### Bước 2 — Tạo database trong SSMS

1. Mở **SQL Server Management Studio (SSMS)**
2. Kết nối vào server `localhost` bằng **Windows Authentication**
3. Bấm **New Query**, dán lệnh sau rồi bấm **Execute (F5)**:

```sql
CREATE DATABASE PharmacyDB;
```

### Bước 3 — Chạy backend lần đầu

Mở terminal rồi chạy 2 lệnh:

```powershell
cd pharmacy-backend
.\mvnw.cmd spring-boot:run
```

App sẽ tự động:
- Kết nối vào SQL Server
- Tạo toàn bộ bảng trong `PharmacyDB`
- Chèn dữ liệu mẫu (nhân viên, khách hàng, sản phẩm, lô thuốc, hóa đơn...)

Backend chạy tại: `http://localhost:8080`

---

## Từ lần sau

Chỉ cần chạy 2 lệnh này, không cần làm gì thêm vì database và dữ liệu đã có sẵn:

```powershell
cd pharmacy-backend
.\mvnw.cmd spring-boot:run
```

---

## Chạy frontend (web)

Mở **terminal mới** (để terminal backend vẫn chạy), sau đó:

```powershell
cd web-pharmacy
npm ci
npm run dev
```

Dashboard chạy tại: `http://localhost:5173`

---

## Ứng dụng di động (Flutter)

```powershell
cd pharmacy-backend\mobile_pharmacy
flutter pub get
flutter run
```

---

## Tài khoản mẫu

Sau khi chạy lần đầu, các tài khoản sau được tạo sẵn trong database:

| Vai trò | Username | Mật khẩu |
|---------|----------|-----------|
| Admin | `admin` | `admin123` |
| Dược sĩ | `duocsi` | `duocsi123` |
| Thủ kho | `thukho` | `thukho123` |
| Khách hàng | `khachhang1` | `kh123456` |

> Mật khẩu được mã hóa BCrypt trong database, không lưu dạng text thường.

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
- **POST / PUT / DELETE** yêu cầu **HTTP Basic Auth** — dùng một trong các tài khoản mẫu ở trên.

---

## Thư mục

- `pharmacy-backend/` — API Spring Boot, JPA và cấu hình database
- `web-pharmacy/` — Dashboard React/Vite
