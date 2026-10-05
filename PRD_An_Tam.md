# PRD & Project Brief — An Tâm

- **Phiên bản:** 1.0
- **Ngày:** 06/10/2026
- **Nguồn tham chiếu:** Project “Pharmacity Pharmacy Web Interface” trên Stitch; repository `DA_NhaThuoc_3`
- **Trạng thái:** Bản nháp để thống nhất phạm vi và phụ thuộc trước khi triển khai thương mại điện tử

## 1. Tóm tắt dự án

An Tâm là trải nghiệm nhà thuốc trực tuyến giúp khách hàng tìm sản phẩm chăm sóc sức khỏe, xem thông tin thuốc rõ ràng, nhận tư vấn từ dược sĩ và chuẩn bị đơn mua thuận tiện. Thiết kế Stitch thể hiện bốn màn hình chính: trang chủ, danh mục và bộ lọc, chi tiết dược phẩm, giỏ hàng kèm luồng gửi toa thuốc.

Giao diện hướng đến cảm giác y tế đáng tin cậy: nền sáng, xanh dương làm màu hành động chính, xanh lá cho trạng thái sức khỏe/tin cậy, kiểu chữ Be Vietnam Pro và nội dung tiếng Việt. Trải nghiệm cần ưu tiên khả năng đọc nhanh, minh bạch giá/quy cách, trạng thái tồn hàng, thông tin kê đơn và cách liên hệ dược sĩ.

**Mục tiêu sản phẩm:** xây dựng cửa hàng web responsive kết nối dữ liệu thuốc của nhà thuốc; giúp khách hàng khám phá sản phẩm và gửi yêu cầu mua/tư vấn; giữ ranh giới rõ giữa thông tin tham khảo và tư vấn/chỉ định chuyên môn.

## 2. Vấn đề và cơ hội

- Khách hàng khó tìm nhanh đúng nhóm sản phẩm và so sánh giá, quy cách, tình trạng hàng.
- Thông tin về thuốc kê đơn, cách sử dụng an toàn và lúc nào cần hỏi dược sĩ cần hiển thị dễ thấy.
- Nhân viên cần một luồng tiếp nhận yêu cầu có toa thuốc và liên hệ khách hàng, thay vì coi thao tác “thêm giỏ” là đơn hàng đã được xác nhận.
- Backend hiện có dữ liệu quản lý kho nhưng chưa cung cấp đầy đủ dịch vụ đặt hàng trực tuyến; cần tách rõ giao diện trình diễn với khả năng vận hành thật.

## 3. Người dùng mục tiêu

1. **Người mua thuốc cho nhu cầu trước mắt:** cần tìm sản phẩm nhanh, biết còn hàng, giá và nơi được hỗ trợ.
2. **Người quản lý thuốc dài hạn:** cần tìm theo tên/nhóm sản phẩm, xem quy cách và lưu ý sử dụng; cần được chuyển tới dược sĩ khi có câu hỏi chuyên môn.
3. **Người chăm sóc gia đình:** tìm sản phẩm cho trẻ em, người lớn tuổi hoặc người có bệnh nền; cần bộ lọc dễ hiểu và tư vấn đáng tin.
4. **Dược sĩ/nhân viên nhà thuốc:** tiếp nhận yêu cầu, rà soát toa thuốc, tư vấn và xác nhận tồn kho/đơn trước khi hứa giao hàng.

## 4. Mục tiêu và chỉ số

### Mục tiêu

- Giúp người dùng tới đúng sản phẩm hoặc danh mục với ít thao tác.
- Trình bày rõ tên, giá, quy cách, thương hiệu, tình trạng hàng và trạng thái OTC/Rx.
- Tạo lối đi rõ ràng tới tư vấn dược sĩ, gửi toa thuốc và liên hệ nhà thuốc.
- Đồng bộ danh mục và lượng hàng với API hiện có khi kết nối được.

### Chỉ số đề xuất

- Tỷ lệ tìm kiếm dẫn tới trang sản phẩm hoặc hành động tiếp theo.
- Tỷ lệ thêm sản phẩm vào giỏ / bắt đầu gửi yêu cầu đặt hàng.
- Tỷ lệ yêu cầu gửi toa được dược sĩ phản hồi trong SLA đã thống nhất.
- Tỷ lệ lỗi hiển thị do mất kết nối API; tỷ lệ sản phẩm hiển thị giá/tồn kho cũ.
- Tỷ lệ hoàn thành tác vụ chính trên mobile và desktop.

Chỉ đặt mục tiêu số cụ thể sau khi có baseline, SLA vận hành và dữ liệu giao dịch.

## 5. Phạm vi sản phẩm

### MVP — trải nghiệm khách hàng

- Trang chủ theo bố cục Stitch: thanh điều hướng, tìm kiếm, banner/tiện ích, danh mục, sản phẩm nổi bật, khối hướng dẫn OTC/Rx, tư vấn dược sĩ, cam kết và chân trang.
- Danh mục thuốc/sản phẩm với tìm kiếm theo tên và bộ lọc khả thi dựa trên dữ liệu thực có.
- Trang chi tiết sản phẩm: tên, giá, quy cách, tình trạng còn hàng, mô tả đã được duyệt, phân loại kê đơn và đường dẫn tư vấn.
- Giỏ hàng phía trình duyệt: thêm/xóa/sửa số lượng, tính tạm tính và lưu giỏ trên cùng thiết bị.
- Luồng tạo yêu cầu đặt hàng/tư vấn có xác nhận tồn kho và điều kiện kê đơn trước khi chuyển thành đơn chính thức.
- Responsive, trạng thái tải/rỗng/lỗi API và cách liên hệ khi không thể đồng bộ.
- Khu vực nhân viên tiếp tục dùng màn hình quản trị hiện có tại `/admin`.

### Sau MVP / cần quyết định riêng

- Tài khoản khách hàng, lịch sử đơn, địa chỉ giao hàng và thành viên/điểm thưởng.
- Tải ảnh toa thuốc, lưu trữ an toàn, phân quyền truy cập, thời hạn lưu và nhật ký xử lý.
- Thanh toán trực tuyến, mã giảm giá, đối soát, giao hàng/tracking và chọn chi nhánh.
- Tư vấn chat/thời gian thực, thông báo và cam kết SLA.
- Bộ lọc y khoa nâng cao (hoạt chất, dạng bào chế, nhóm tuổi, tương tác, chống chỉ định) sau khi có dữ liệu được thẩm định.

## 6. Luồng người dùng chính

### A. Tìm và xem sản phẩm

1. Người dùng vào trang chủ hoặc gõ từ khóa.
2. Chọn danh mục hoặc bộ lọc thích hợp.
3. Xem thẻ sản phẩm: tên, giá, quy cách, tình trạng và thông tin kê đơn nếu có.
4. Mở chi tiết sản phẩm để xem nội dung được duyệt và liên hệ dược sĩ.

### B. Giỏ hàng và yêu cầu mua

1. Người dùng thêm sản phẩm, chỉnh số lượng hoặc xóa khỏi giỏ.
2. Hệ thống tính tạm tính; ghi rõ đây chưa phải xác nhận cuối về tồn kho/phí giao.
3. Trước khi tạo đơn, máy chủ kiểm tra giá, tồn và điều kiện bán tại thời điểm xử lý.
4. Nếu thuốc yêu cầu toa, dừng luồng tự xác nhận và chuyển sang quy trình dược sĩ thẩm định.
5. Chỉ hiển thị đơn đã xác nhận sau khi backend tạo đơn và trả mã đơn.

### C. Gửi toa/nhờ tư vấn (đề xuất)

1. Khách hàng chủ động gửi yêu cầu và toa qua kênh được bảo vệ.
2. Hệ thống thông báo dược sĩ và ghi nhận thời điểm tiếp nhận.
3. Dược sĩ xác minh toa, thuốc, liều và khả năng cung cấp; liên hệ lại nếu cần.
4. Khách hàng xác nhận phương án và điều kiện giao/nhận trước khi đơn được tạo.

**Lưu ý phạm vi:** thời hạn phản hồi “5 phút”, giao “2 giờ” và hotline hiển thị trong thiết kế là nội dung đề xuất; chỉ công bố như cam kết sau khi chủ sản phẩm xác nhận khả năng vận hành, giờ áp dụng và khu vực phục vụ.

## 7. Yêu cầu chức năng

| ID | Yêu cầu | Ưu tiên | Tiêu chí chấp nhận |
|---|---|---|---|
| FR-01 | Duyệt trang chủ và danh mục | Must | Các nhóm sản phẩm và CTA chính mở đúng view; giao diện không vỡ ở mobile/desktop. |
| FR-02 | Tìm kiếm sản phẩm | Must | Tìm theo tên; trạng thái không có kết quả và lỗi API có hướng dẫn tiếp theo. |
| FR-03 | Danh sách/bộ lọc | Must | Chỉ dùng thuộc tính có dữ liệu; số lượng kết quả cập nhật theo bộ lọc. |
| FR-04 | Chi tiết sản phẩm | Must | Hiển thị giá và quy cách từ API; ngày/giá không được bịa khi không có dữ liệu. |
| FR-05 | Giỏ hàng cục bộ | Must | Thêm, bỏ, đổi số lượng; tổng tiền tính nhất quán và giỏ còn sau khi tải lại cùng trình duyệt. |
| FR-06 | Trạng thái OTC/Rx | Must | Thuốc Rx không được đi qua luồng tự xác nhận bán; có đường dẫn tới dược sĩ. |
| FR-07 | Tạo đơn/yêu cầu | Should | Chỉ bật sau khi có endpoint tạo đơn và xác minh giá/tồn ở backend. |
| FR-08 | Tải toa và hồ sơ | Should | Chỉ bật sau khi có nơi lưu trữ, kiểm soát truy cập và chính sách dữ liệu. |
| FR-09 | Quản trị kho | Must | Nhân viên vẫn quản lý được thuốc, lô, khách hàng, nhân viên và nhà cung cấp. |

## 8. Dữ liệu và tích hợp

### API hiện có trong repository

- `/api/medicines`: CRUD; response hiện có `id`, `name`, `category`, `price`, `stock`, `nearestExpiry`.
- `/api/batches`: CRUD lô; response có `medicineId`, `expiryDate`, `quantity`, `purchasePrice`.
- `/api/customers`, `/api/employees`, `/api/suppliers`: CRUD quản trị.
- GET hiện công khai; POST/PUT/DELETE yêu cầu HTTP Basic Auth theo mô tả dự án.

### Khoảng trống cần backend trước khi giao dịch thật

- Không thấy API giỏ hàng/đơn hàng, xác nhận tồn, thanh toán, địa chỉ, giao hàng, voucher, thành viên hoặc upload toa trong bộ endpoint hiện có.
- Dữ liệu thuốc hiện chưa thể hiện ảnh, hoạt chất, dạng bào chế, trạng thái OTC/Rx, nội dung dược lý đã duyệt, giá khuyến mãi hoặc khu vực giao nhanh.
- Cần API tìm kiếm/phân trang/bộ lọc nếu danh mục lớn; quy tắc giá, tồn và lô hết hạn phải được tính ở server.
- Không đưa thông tin liên hệ cá nhân, địa chỉ nhận hàng, hồ sơ bệnh án hoặc dữ liệu khách hàng vào log/localStorage. Cart cục bộ chỉ lưu mã sản phẩm và số lượng; không coi đây là đơn hàng.

## 9. Phi chức năng, an toàn và nội dung

- **Responsive & accessibility:** dùng được bằng bàn phím, nhãn điều khiển rõ, tương phản đủ, nội dung không phụ thuộc riêng màu sắc.
- **Performance:** ảnh tối ưu kích thước, lazy-load ảnh dưới màn hình; giao diện vẫn dùng được khi API chậm/lỗi.
- **Freshness:** đánh dấu rõ dữ liệu giá/tồn được cập nhật khi nào; xác nhận lại với server trước đặt hàng.
- **Bảo mật:** không lưu thông tin xác thực Basic Auth hoặc dữ liệu nhạy cảm trên trình duyệt; cần cơ chế phiên/token phù hợp trước khi mở rộng khách hàng.
- **Dược phẩm:** thông tin công dụng/liều dùng/chống chỉ định phải qua người có chuyên môn duyệt; không suy luận khuyến nghị điều trị từ từ khóa triệu chứng.
- **Rx:** tuân thủ chính sách bán thuốc kê đơn và quy định áp dụng; yêu cầu dược sĩ xác minh toa trước khi tiếp tục.
- **Tuyên bố:** nội dung trên website không thay thế tư vấn trực tiếp của bác sĩ/dược sĩ; khi có dấu hiệu cấp cứu, hướng người dùng tìm trợ giúp y tế thích hợp.

## 10. Rủi ro và phụ thuộc

- Thiết kế Stitch chứa dữ liệu minh họa và lời hứa dịch vụ chưa được xác minh; cần thay bằng thông tin kinh doanh đã duyệt.
- Ảnh/giá/tồn từ nội dung demo có thể khác kho thật; phải ghép sản phẩm bằng ID ổn định và quản lý ảnh có nguồn hợp lệ.
- Chức năng thương mại bị chặn nếu thiếu API đơn hàng và xử lý Rx; cần quyết định backend trước khi phát hành đặt hàng thật.
- Yêu cầu lưu toa liên quan dữ liệu sức khỏe nhạy cảm; cần có quy trình bảo vệ, retention, consent và quyền truy cập trước khi triển khai.
- Đăng nhập Basic Auth hiện phù hợp công cụ nội bộ, không phải nền tảng khách hàng cuối.

## 11. Điều kiện sẵn sàng phát hành MVP

- Danh mục lấy dữ liệu có nguồn từ API; lỗi API hiển thị có hướng xử lý.
- Tìm kiếm, mở chi tiết và giỏ hàng chạy được trên desktop/mobile.
- Tồn kho/giá trong giỏ được xác minh lại từ server trước khi tạo đơn.
- Thuốc Rx bị chặn khỏi luồng xác nhận tự động và có quy trình dược sĩ.
- Có bản duyệt nội dung y khoa, giá, thương hiệu, cam kết giao hàng/đổi trả và chính sách bảo mật.
- Các chức năng chưa có backend được ghi rõ “chưa hỗ trợ” thay vì hiển thị như dịch vụ đang hoạt động.

## 12. Câu hỏi cần chủ dự án chốt

1. Phạm vi giai đoạn đầu là storefront giới thiệu/catalog hay bao gồm đặt hàng và thanh toán thật?
2. Ai là người duyệt nội dung dược lý, phân loại OTC/Rx và cảnh báo an toàn?
3. Có chấp nhận đơn online cho thuốc Rx không; toa được gửi và lưu ở hệ thống nào, ai có quyền xem?
4. Địa bàn giao 2 giờ, phí, giờ hoạt động và SLA dược sĩ thực tế là gì?
5. Hệ thống đăng nhập/thành viên/thanh toán nào sẽ tích hợp; API backend do team nào cung cấp?
6. Tên hiển thị đã chốt theo yêu cầu hiện tại là **An Tâm**; chủ dự án cần xác nhận tên pháp lý, logo chính thức và thông tin doanh nghiệp trước khi phát hành.

## 13. Đề xuất lộ trình

1. **Giai đoạn 1 — Catalog:** chốt brand, dữ liệu sản phẩm, tìm kiếm/bộ lọc, trang chủ và chi tiết.
2. **Giai đoạn 2 — Cart & Rx handoff:** thêm endpoint kiểm tra tồn/giá, tạo yêu cầu đơn và quy trình thẩm định toa.
3. **Giai đoạn 3 — Fulfillment:** thanh toán, giao nhận/tracking, tài khoản khách hàng và chăm sóc sau bán.
4. **Giai đoạn 4 — Tối ưu:** phân tích hành vi, đề xuất nội dung an toàn, loyalty và cá nhân hóa sau khi có dữ liệu/consent phù hợp.
