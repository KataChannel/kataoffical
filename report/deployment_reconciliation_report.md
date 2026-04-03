# Báo Cáo Đối Soát Dữ Liệu & Quy Trình Triển Khai Mới
*Ngày báo cáo: 03-04-2026*

## 1. Kết Quả Đối Soát Report Excel "Tổng Hợp"
Sau khi điều chỉnh logic Backend và Frontend, số liệu trên hệ thống đã khớp **100%** với file đích (File mẫu của người dùng).

### Bảng so sánh tổng hợp (April 3rd, 2026):
| Chỉ số (Sum)           | File Mẫu (Target) | Hệ Thống Mới (Export) | Chênh lệch | Kết quả |
|:-----------------------|:------------------|:----------------------|:-----------|:--------|
| **TỔNG BÁN (GIAO)**    | 4,564.62          | 4,564.62              | **0.00**   | ✅ Khớp |
| **TỔNG ĐẶT (KHÁCH)**   | 11.50             | 11.50                 | **0.00**   | ✅ Khớp |
| **TỔNG TỒN (CÁC KHO)** | 8,478.10          | 8,478.10              | **0.00**   | ✅ Khớp |
| **TỒN HỆ THỐNG**       | 3,913.48          | 3,913.48              | **0.00**   | ✅ Khớp |
| **GỢI Ý CẦN ĐẶT**      | -3,901.98         | -3,901.98             | **0.00**   | ✅ Khớp |

### Các thay đổi kỹ thuật:
- **Backend (`NhuCauDatHangResolver`):** Sửa lỗi tính toán `khachgiao` từ cột `slnhan` sang `sldat` để đảm bảo tính đúng đắn của nhu cầu bán hàng ngay cả khi đơn hàng chưa hoàn tất việc nhập thực nhận.
- **Frontend (`DonhangGraphqlService`):** Khắc phục lỗi hiển thị 0.00 bằng cách lấy dữ liệu từ các trường đã tổng hợp sẵn (`item.khachdat`, `item.khachgiao`) thay vì tính toán lại từ mảng chi tiết (vốn đã được tối ưu hóa để trả về rỗng).

---

## 2. Quy Trình Triển Khai An Toàn (Safe Local Deploy)
Đã tích hợp vào Menu quản lý dự án (`./run_dev.sh` hoặc `bun dev`) - **Option 9**.

### 🛠 Các thành phần mới:
1. **Script quản lý:** `scripts/deploy_safe_local.sh`.
2. **Cơ chế Fallback:** Tự động lưu vết bản cũ (`:stable`). Nếu bản mới khởi động lỗi (Healthcheck thất bại), hệ thống tự động quay về bản cũ trong 2 giây.
3. **Chế độ Dry Run:** Cho phép chạy thử Image mới trên cổng phụ (53332) để "test thực tế" trên server trước khi thay thế bản chính thức.

### 📝 Chi tiết quy trình 8 bước (Workflow):
1.  **Bước 1 - Build Image:** Chạy lệnh `docker compose build --parallel` tại máy workstation. Tận dụng tối đa CPU nội bộ để nén thời gian đóng gói.
2.  **Bước 2 - Đóng gói:** Nén các Service thành file vật lý `.tar.gz`. Điều này tạo ra một "gói cài đặt" duy nhất chứa toàn bộ Logic Backend và Frontend.
3.  **Bước 3 - Chuyển dữ liệu:** Dùng SCP (hoặc RSYNC) đẩy trực tiếp file lên thư mục `/root/rausach_backups` trên Server. Không phụ thuộc vào GitHub/Docker Hub.
4.  **Bước 4 - Tạo điểm phục hồi:** Trước khi thay bản cũ, script tự động đánh tag `:stable` cho các Image đang chạy tốt. Đây chính là "phao cứu sinh" nếu có sự cố.
5.  **Bước 5 - Nạp Image:** Giải nén và nạp gói mới vào Docker Engine của Server bằng lệnh `docker load`.
6.  **Bước 6 - Triển khai / Dry Run:** 
    *   *Dry Run:* Khởi động Backend mới trên cổng **53332** để test.
    *   *Real Deploy:* Dùng `docker compose up -d` để ghi đè phiên bản mới lên bản chính thức.
7.  **Bước 7 - Healthcheck:** Tự động gửi tín hiệu kiểm tra (curl) vào Backend để xác nhận trạng thái database & kết nối.
8.  **Bước 8 - Tự động Phục hồi (Fallback):** Nếu Bước 7 trả về lỗi, hệ thống ngay lập tức đổi tag `:stable` về `:latest` và khởi động lại. Hệ thống quay về trạng thái an toàn trong vòng **< 5 giây**.

---

## 3. Hướng dẫn sử dụng cho Quản trị viên
1.  **Mở Menu:** Chạy `./run_dev.sh` (hoặc `bun dev`).
2.  **Chọn phím 9:** Triển khai An toàn.
3.  **Lựa chọn chế độ:** 
    *   Nên chọn **Dry Run** trước khi có thay đổi lớn về cấu trúc DB hoặc Logic quan trọng.
    *   Sau khi Dry Run báo ✅ thành công, tiến hành **Real Deploy**.

---

## 4. Quản Lý Database & Tối Ưu
- Tích hợp thêm script `scripts/cleanup_database.sh` (Option 7) để dọn dẹp log, dữ liệu cũ và thực hiện lệnh `VACUUM ANALYZE` giúp database chạy nhanh hơn và thu hồi dung lượng đĩa.

> [!IMPORTANT]
> **Khuyến nghị:** Việc build tại local giúp tiết kiệm tài nguyên Server (tránh treo VPS do thiếu RAM khi NPM build phần Frontend). Hãy luôn backup database trước khi thực hiện các thay đổi lớn.
