# Ứng dụng quản lý nhà thuốc

Dự án gồm backend Java Spring Boot và ứng dụng di động Flutter. Hiện đây là dự án đang phát triển, chưa phải ứng dụng hoàn chỉnh để sử dụng thực tế.

## Cần cài

- **JDK 17** để chạy backend.
- **Flutter SDK** tương thích với Dart SDK `^3.13.4` để chạy ứng dụng di động.
- **SQL Server** và SQL Server Management Studio (SSMS) để tạo/quản lý cơ sở dữ liệu.
- **Android Studio** nếu muốn chạy app trên máy ảo Android; hoặc điện thoại Android đã bật USB debugging.
- Có thể dùng **Visual Studio Code** hoặc **IntelliJ IDEA** để mở mã nguồn.

Maven Wrapper (`mvnw.cmd`) đã có sẵn trong dự án nên không bắt buộc cài Maven riêng.

## Những gì đã có

- Khung backend Spring Boot, dùng Java 17, Spring Data JPA, Spring Security và SQL Server.
- Một số entity JPA cho hoạt chất, thuốc, lô thuốc, người dùng, hóa đơn và đơn hàng online.
- Script SQL Server `src/main/resources/data.sql` mô tả dữ liệu quản lý nhân viên, khách hàng, thuốc, nhà cung cấp, lô thuốc, nhập hàng và đơn hàng; có thêm một số ràng buộc và trigger quản lý tồn kho.
- Khung ứng dụng Flutter cho Android, iOS, web và desktop.

## Trạng thái hiện tại

- Giao diện Flutter hiện vẫn là màn hình demo bộ đếm mặc định, chưa có giao diện nghiệp vụ nhà thuốc.
- Chưa thấy API nghiệp vụ/controller để ứng dụng Flutter gọi tới backend.
- Script SQL và các entity JPA hiện chưa đồng nhất về tên database/bảng; cần thống nhất trước khi tích hợp và chạy dữ liệu thực.
- Cấu hình SQL Server nằm trong `src/main/resources/application.properties`. Hãy tự thay địa chỉ máy chủ, tên database và thông tin đăng nhập phù hợp với máy của bạn; không chia sẻ mật khẩu trong mã nguồn.

## Chạy backend

1. Cài và khởi động SQL Server.
2. Mở `src/main/resources/data.sql` bằng SSMS và chạy nếu muốn tạo schema theo script. Kiểm tra nội dung script và chọn đúng database trước khi chạy.
3. Mở `src/main/resources/application.properties`, cập nhật `spring.datasource.url`, username và password. Lưu ý cấu hình hiện trỏ tới database `PharmacyDB`, trong khi script SQL tạo `QuanLyNhaThuocDB`; hai tên này cần được đổi cho khớp.
4. Tại thư mục gốc dự án, chạy:

   ```powershell
   .\mvnw.cmd spring-boot:run
   ```

Backend mặc định chạy tại `http://localhost:8080`.

## Chạy ứng dụng Flutter

Mở terminal tại thư mục `mobile_pharmacy` rồi chạy:

```powershell
flutter pub get
flutter run
```

Cần kết nối máy ảo/thiết bị trước khi chạy. Hiện app chỉ hiển thị màn hình demo Flutter, chưa kết nối backend.

## Thư mục chính

- `src/main/java/`: mã nguồn backend và các entity.
- `src/main/resources/`: cấu hình backend và script SQL.
- `mobile_pharmacy/`: mã nguồn ứng dụng Flutter.