# Tổng Hợp Chức Năng Chứng Từ Công Nợ (AR) & Đơn Hàng

Tài liệu này tổng hợp các cải tiến đã thực hiện cho hệ thống Chứng từ Công nợ (AR) và theo dõi Đơn hàng nhằm tăng cường tính minh bạch tài chính và hiệu quả vận hành.

## 1. Cải Tiến Chứng Từ AR (Phải Thu Khách Hàng)
Các component đã chỉnh sửa: `DetailARDocumentComponent`, `ListARDocumentComponent`

### Các điểm cải tiến:
- **Định danh Khách hàng**: Thêm cột "Khách hàng" vào danh sách tổng hợp để dễ dàng nhận diện.
- **Trạng thái Tài chính Tức thời**: Chế độ xem chi tiết hiện hiển thị rõ ràng:
    - **Tổng doanh số (CN Tạm)**: Tổng giá trị của tất cả các đơn hàng liên kết.
    - **Đã thanh toán**: Tổng số tiền thực tế đã thu qua các Phiếu Thu liên quan.
    - **Còn lại**: Tính toán chính xác số tiền còn nợ cần thu.
- **Truy xuất chi tiết Đơn hàng**:
    - Bảng chi tiết hiển thị từng đơn hàng trong chứng từ.
    - Ánh xạ trạng thái hệ thống sang thuật ngữ nghiệp vụ dễ hiểu:
        - `MOI`: **Đã Nhận (Mới)**
        - `DA_DOI_CHIEU`: **Đã Đối Chiếu (Verified)**
        - `DA_THU_TIEN`: **Đã Thanh Toán (Paid)**
    - Liên kết trực tiếp đến Đơn hàng gốc để kiểm tra chi tiết sản phẩm.

## 2. Bảng Theo Dõi Công Nợ Khách Hàng
Các component đã chỉnh sửa: `ListcongnokhachhangComponent`, `DonhangService` (Backend)

### Các điểm cải tiến:
- **Thẻ Tóm tắt Trực quan (Summary Cards)**: Ba thẻ thông tin nổi bật ở đầu danh sách công nợ:
    - **Doanh Số (Xanh dương)**: Tổng doanh số theo bộ lọc.
    - **Thanh Toán (Xanh lá)**: Tổng tiền đã thu thực tế.
    - **Còn Lại (Đỏ)**: Dư nợ ròng cần thu.
- **Tích hợp Theo dõi Thanh toán**: Backend hiện đã tự động kết hợp dữ liệu từ `ThanhToan` (Thanh toán chuẩn) và `PhieuThuChi` (Chứng từ kế toán) vào từng đơn hàng thời gian thực.
- **Cột Chi tiết Sổ cái**:
    - **Đã Thanh Toán**: Hiển thị chính xác số tiền đã trả cho từng đơn hàng cụ thể.
    - **Còn Lại**: Hiển thị số dư nợ chính xác trên mỗi đơn hàng.
- **Định dạng Nâng cao**: Các giá trị số được định dạng gọn gàng (làm tròn số nguyên) và mã hóa màu sắc để tăng khả năng đọc.

## 3. Chi Tiết Triển Khai

### Backend (`api/src/donhang/donhang.service.ts`)
- Cập nhật phương thức `getCongnoKhachHangOptimized` để:
    - Kết nối (Join) với bảng `ThanhToan`.
    - Kết nối (Join) với bảng `PhieuThuChi`.
    - Tổng hợp và trả về các trường `dathanhtoan` và `conlai`.

### Frontend (`frontend/.../congnokhachhang/...`)
- Triển khai các phương thức getter `totalRevenue`, `totalPaid`, và `totalRemaining` để hiển thị dữ liệu trên các thẻ tóm tắt.
- Cải tiến bảng dữ liệu để hỗ trợ lọc cột động với các chỉ số mới được bật mặc định.

---
**Ngày hoàn thành**: 07 tháng 01, 2026
**Mục tiêu đạt được**: Xác minh thành công dữ liệu của Khách hàng A từ ngày 01 đến ngày 15 với khả năng truy xuất trạng thái chi tiết (Nhận/Đối chiếu/Thanh toán).
