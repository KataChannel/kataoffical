# Hướng Dẫn Quy Trình Quản Lý Công Nợ (V3 Optimization) - UI Guide

Tài liệu này hướng dẫn chi tiết quy trình quản lý Công nợ trên giao diện người dùng (UI), bao gồm các đường dẫn (Router) và nút bấm (Button) cụ thể.

---

## 🏗 Tổng Quan Mô Hình Công Nợ V3
Mô hình V3 thay đổi cách tính công nợ dựa trên **Số lượng thực nhận (slnhan)** và bắt buộc qua bước **Đối chiếu** để ghi nhận nợ chính xác.

---

## 1. Quy Trình Công Nợ Phải Trả (AP - Nhà Cung Cấp)

### Bước 1: Tạo & Nhận Hàng (PO)
- **Đường dẫn:** `Menu > Mua Hàng > Đặt Hàng` ([/admin/dathang](/admin/dathang))
- **Thao tác:** 
    1. Nhấn nút **[+ Thêm mới]** để tạo đơn PO.
    2. Sau khi hàng về, nhấn vào Mã đơn để xem chi tiết.
    3. Nhập số lượng thực tế vào cột **SL Nhận**.
    4. Nhấn **[Lưu thông tin]**. Trạng thái sẽ chuyển sang `DANHAN`.

### Bước 2: Đối Chiếu Cốt Lõi (Ghi nợ NCC)
- **Đường dẫn:** `Chi tiết đơn hàng PO` ([/admin/dathang/findid/:id](/admin/dathang))
- **Thao tác:** 
    1. Kiểm tra lại giá và số lượng thực nhận lần cuối.
    2. Nhấn nút màu xanh dương **[Đối chiếu]** (nằm ở góc phải phía trên hoặc cuối danh sách sản phẩm).
    3. Chọn xác nhận. 
- **Kết quả:** Trạng thái đơn đổi thành `DA_DOI_CHIEU`. **Công nợ NCC chính thức tăng lên**.

### Bước 3: Lập Đề Xuất Thanh Toán
- **Đường dẫn:** `Menu > Kế Toán > Công Nợ NCC` ([/admin/congnoncc](/admin/congnoncc))
- **Thao tác:** 
    1. Tìm kiếm các đơn hàng có trạng thái `DA_DOI_CHIEU`.
    2. Tích chọn các đơn hàng muốn thanh toán.
    3. Nhấn nút **[Lập đề xuất thanh toán]** phía trên bảng dữ liệu.
    4. Hệ thống chuyển hướng sang trang **Lập đề xuất**. Kiểm tra thông tin và nhấn **[Gửi đề xuất]**.
- **Kết quả:** Đơn hàng chuyển sang `CHO_THANH_TOAN` và bị khóa (Lock).

### Bước 4: Phê Duyệt & Chi Tiền
- **Đường dẫn:** `Menu > Kế Toán > Đề Xuất Thanh Toán` ([/admin/payment-proposal](/admin/payment-proposal))
- **Thao tác:** 
    1. Quản lý vào chi tiết Đề xuất, nhấn nút **[Duyệt đề xuất]**.
    2. Sau khi duyệt, nút **[Lập phiếu chi]** sẽ xuất hiện. Nhấn vào đó để tạo Phiếu Chi.
    3. Tại màn hình Phiếu Chi, kiểm tra số tiền và nhấn **[Xác nhận chi]**.
- **Kết quả:** PO chuyển sang `DA_THANH_TOAN`. **Công nợ NCC giảm xuống**.

---

## 2. Quy Trình Công Nợ Phải Thu (AR - Khách Hàng)

### Bước 1: Giao Hàng & Nhận Hàng (SO)
- **Đường dẫn:** `Menu > Bán Hàng > Đơn Hàng` ([/admin/donhang](/admin/donhang))
- **Thao tác:** 
    1. Nhấn vào Mã đơn SO đã giao xong.
    2. Xác nhận số lượng khách thực nhận (Update cột **SL Nhận**).
    3. Nhấn **[Lưu]**.

### Bước 2: Đối Chiếu Doanh Thu (Ghi nợ Khách)
- **Đường dẫn:** `Chi tiết đơn hàng SO` ([/admin/donhang/findid/:id](/admin/donhang))
- **Thao tác:** 
    1. Nhấn nút **[Đối chiếu]**.
- **Kết quả:** Trạng thái đổi thành `DA_DOI_CHIEU`. **Công nợ Khách hàng chính thức tăng lên**.

### Bước 3: Lập Chứng Từ Thu (AR Document)
- **Đường dẫn:** `Menu > Kế Toán > Công Nợ Khách Hàng` ([/admin/congnokhachhang](/admin/congnokhachhang))
- **Thao tác:** 
    1. Chọn các đơn SO đã `DA_DOI_CHIEU`.
    2. Nhấn nút **[Lập chứng từ thu tiền]**.
- **Kết quả:** SO chuyển sang `CHO_THU_TIEN` và bị khóa.

### Bước 4: Thu Tiền
- **Đường dẫn:** `Menu > Kế Toán > Phiếu Thu Chi` ([/admin/phieuthuchi](/admin/phieuthuchi)) hoặc từ `Chi tiết AR Document`.
- **Thao tác:** 
    1. Tạo Phiếu Thu liên kết với Chứng từ thu tiền/Khách hàng.
    2. Nhấn **[Xác nhận thu]**.
- **Kết quả:** SO chuyển sang `DA_THU_TIEN`. **Công nợ Khách hàng giảm xuống**.

---

## 🛡 Bảng Tra Cứu Trạng Thái & Nút Bấm

| Chặng Đường | Trạng Thái Đơn | Nút Bấm Cần Nhấn | Router Link |
| :--- | :--- | :--- | :--- |
| **Giao nhận** | `DADAT` -> `DANHAN` | `[Lưu]` (sau khi nhập SL Nhận) | `/admin/dathang` |
| **Chốt Nợ** | `DANHAN` -> `DA_DOI_CHIEU` | `[Đối chiếu]` | `/admin/dathang/:id` |
| **Kế toán** | `DA_DOI_CHIEU` -> `CHO_THANH_TOAN` | `[Lập đề xuất]` | `/admin/congnoncc` |
| **Chi tiền** | `CHO_THANH_TOAN` -> `DA_THANH_TOAN` | `[Xác nhận chi]` | `/admin/phieuthuchi` |

---

## 💡 Lưu ý cho người dùng:
- **Nút [Đối chiếu] bị mờ?** Kiểm tra xem bạn đã nhập số lượng thực nhận cho tất cả sản phẩm chưa.
- **Không tìm thấy đơn hàng trong trang Công nợ?** Đảm bảo đơn hàng đã ở trạng thái `DA_DOI_CHIEU`. Các trạng thái `DADAT`, `DANHAN` sẽ không xuất hiện để lập đề xuất thanh toán.
- **Tại sao không thể sửa đơn hàng?** Nếu trạng thái là `CHO_THANH_TOAN` hoặc `DA_THANH_TOAN`, dữ liệu đã được kế toán khóa để khớp sổ sách.

---
*Tài liệu hướng dẫn triển khai V3 Optimization - Hệ thống quản lý Rau Sạch.*
