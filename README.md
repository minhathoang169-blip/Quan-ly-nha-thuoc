# Quản lý nhà thuốc

Dự án gồm backend Spring Boot, dashboard React/Vite và ứng dụng Flutter. Backend cung cấp CRUD cho sản phẩm, lô thuốc, khách hàng, nhân viên và nhà cung cấp.

## Yêu cầu

- JDK 22 (được khai báo trong `pharmacy-backend/pom.xml`); Maven Wrapper đã có sẵn.
- Node.js 22.12+ và npm để chạy frontend Vite 8.
- Flutter SDK tương thích với Dart `^3.13.4` nếu chạy ứng dụng di động.
- SQL Server chỉ cần khi chạy với database thật; chế độ local mặc định dùng H2.

## Chạy local

Từ thư mục dự án:

```powershell
Push-Location .\pharmacy-backend
.\mvnw.cmd spring-boot:run
Pop-Location
```

Backend chạy ở `http://localhost:8080`. Profile `local` dùng H2 trong bộ nhớ với ba mặt hàng mẫu; dữ liệu được tạo lại khi backend khởi động.

Các màn hình danh mục có đăng nhập Basic Auth trước khi thêm/sửa/xóa. Tài khoản mặc định là `user`; mật khẩu phát triển ngẫu nhiên được in trong terminal backend mỗi lần khởi động và không được lưu trong giao diện.

Mở terminal thứ hai:

```powershell
Push-Location .\web-pharmacy
npm ci
npm run dev
Pop-Location
```

Dashboard chạy ở `http://localhost:5173` và proxy `/api` tới backend. API đọc kho: `GET http://localhost:8080/api/medicines`.

## Ứng dụng di động

Ứng dụng Flutter nằm tại `pharmacy-backend/mobile_pharmacy`. Hiện đây vẫn là skeleton Flutter mặc định, chưa gọi API nghiệp vụ.

```powershell
Push-Location .\pharmacy-backend\mobile_pharmacy
flutter pub get
flutter run
Pop-Location
```

## Kết nối SQL Server

Schema `QuanLyNhaThuocDB` được tạo từ `pharmacy-backend/src/main/resources/data.sql` và backend ánh xạ trực tiếp vào `SanPham`/`LoThuoc`. Profile SQL Server dùng Windows Authentication của tài khoản đang chạy backend. Instance `SQLEXPRESS01` cần bật TCP/IP trên loopback và lắng nghe cổng `1433`; bật TCP/IP cần restart dịch vụ SQL Server. Native auth DLL được Maven copy vào `pharmacy-backend/target/native`.

```powershell
$env:DB_HOST = 'localhost'
$env:DB_PORT = '1433'
$env:DB_NAME = 'QuanLyNhaThuocDB'
Push-Location .\pharmacy-backend
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=sqlserver"
Pop-Location
```

CRUD danh mục: `/api/medicines`, `/api/batches`, `/api/customers`, `/api/employees`, `/api/suppliers`, mỗi nhóm có `GET`, `GET /{id}`, `POST`, `PUT /{id}`, `DELETE /{id}`. GET công khai; thao tác ghi yêu cầu HTTP Basic Auth. Mật khẩu phát triển được Spring in trong log backend; không dùng cơ chế này thay cho tài khoản quản trị production.

## Postman

Import `postman/Quan-ly-nha-thuoc.postman_collection.json`. Đặt `apiPassword` trong collection variables thành mật khẩu đang được in trong terminal backend, sau đó chạy collection; các request tạo record tự lưu mã để GET/PUT/DELETE tiếp theo dùng lại. Collection đã được chạy bằng Newman: 25 request, 25 assertion, không lỗi.

SQL Server phải được khởi động với TCP/IP bật; hiện môi trường kiểm tra chưa bật TCP, nên ứng dụng Java chưa thể kết nối tới database dù schema đã được tạo. Tài khoản Windows chạy backend cũng cần quyền đọc/ghi trên `QuanLyNhaThuocDB`.

## Thư mục

- `pharmacy-backend/`: API Spring Boot, JPA và cấu hình database.
- `web-pharmacy/`: dashboard React/Vite.
