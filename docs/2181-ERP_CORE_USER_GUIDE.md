# HƯỚNG DẪN VẬN HÀNH QUY TRÌNH ERP LÕI TRÊN HỆ THỐNG RAUSACH V3

Tài liệu này hướng dẫn chi tiết từng bước (Step-by-step) để thực hiện quy trình nghiệp vụ Mua hàng (AP) và Bán hàng (AR) theo tiêu chuẩn ERP 3 lớp: **Kinh doanh - Kế toán - Thủ quỹ**.

---

## 🟦 QUY TRÌNH 1: BÁN HÀNG & THU TIỀN KHÁCH HÀNG (AR)

Dành cho bộ phận Kinh doanh và Kế toán Phải thu.

### Bước 1: Khởi tạo Đơn hàng (Sales Order - SO)
- **Truy cập**: Tại thanh Menu xanh bên trái, chọn `Bán hàng` -> `Danh sách đơn hàng`.
- **Thực hiện**: 
    1. Nhấn nút **"+ Thêm mới"** (góc trên bên phải).
    2. Chọn **Khách hàng** từ danh sách thả xuống.
    3. Thêm **Sản phẩm** bằng cách gõ tên vào ô tìm kiếm hàng hóa, nhập **Số lượng** và **Đơn giá**.
    4. Nhấn **"Lưu đơn hàng"**. Trạng thái mặc định sẽ là `cho_xac_nhan`.
- **Ghi chú**: Đây là giai đoạn ghi nhận nhu cầu, chưa phát sinh công nợ.

### Bước 2: Xác nhận Giao hàng (Công nợ tạm tính)
- **Truy cập**: Click trực tiếp vào **Mã đơn hàng** trong danh sách để mở màn hình chi tiết.
- **Thực hiện**: 
    1. Khi hàng bắt đầu đi: Nhấn nút trạng thái sang `Đang giao`.
    2. Khi shipper xác nhận khách đã nhận: Nhấn chuyển sang `Đã giao`.
- **Kết quả**: Hệ thống tự động đẩy trạng thái đơn về `da_nhan`. Lúc này số nợ được ghi nhận là "Tạm tính" dựa trên số lượng đặt ban đầu.

### Bước 3: Đối chiếu Kế toán (Chốt số liệu)
- **Truy cập**: Tại màn hình chi tiết đơn hàng -> Tìm Tab **"Đối chiếu"** (bên cạnh tab Thông tin chung).
- **Thực hiện**: 
    1. Kế toán xác nhận lại số lượng thực tế khách nhận (có thể sửa đổi nếu khách trả lại hàng hoặc giao thiếu).
    2. Nhấn nút xanh **"Chốt đối chiếu"**.
- **Kết quả**: Đơn hàng chuyển sang trạng thái `doi_chieu`. Toàn bộ dữ liệu đơn hàng bị KHÓA, không thể chỉnh sửa thêm.

### Bước 4: Thu tiền (Lập Phiếu Thu)
- **Truy cập**: Menu `Kế toán` -> `Phiếu Thu Chi`.
- **Thực hiện**: 
    1. Nhấn **"Tạo phiếu thu"**. 
    2. Chọn loại: **"Thu tiền đơn hàng"**.
    3. Tìm và chọn các đơn hàng đã `doi_chieu`.
    4. Nhập số tiền thu thực tế và nhấn **"Xác nhận"**.
- **Kết quả**: Đơn hàng tự động chuyển sang `hoan_thanh`, dòng tiền được ghi nhận vào báo cáo.

---

## 🟧 QUY TRÌNH 2: MUA HÀNG & THANH TOÁN NCC (AP)

Quy trình ưu tiên trên dự án Demo để kiểm soát dòng tiền chi ra.

### Bước 1: Tạo Đơn đặt hàng NCC (Purchase Order - PO)
- **Truy cập**: Menu `Mua hàng` -> `Đặt hàng NCC`.
- **Thực hiện**: 
    1. Nhấn **"Thêm mới"**. Chọn **Nhà cung cấp**.
    2. Nhập các mặt hàng cần mua từ NCC này và nhấn **"Lưu"**.

### Bước 2: Nhập hàng & Đối chiếu công nợ
- **Truy cập**: Menu `Kho` -> `Nhập kho`.
- **Thực hiện**: 
    1. Thủ kho chọn lệnh nhập khớp với PO vừa tạo.
    2. Nhập số lượng thực tế xe hàng về. Nhấn **"Xác nhận nhập kho"**.
    3. **QUAN TRỌNG**: Kế toán vào `Mua hàng` -> `Công nợ NCC`. Tại đây, kiểm tra các đơn hàng đã nhập kho, nhấn **"Xác nhận đối chiếu"** để chốt số tiền phải trả chính xác.

### Bước 3: Lập Đề xuất Thanh toán (Payment Proposal)
Đây là tính năng mới trên V3 để quản lý phê duyệt tập trung.
- **Truy cập**: Menu `Kế toán` -> `Công nợ Nhà cung cấp`.
- **Thực hiện Step-by-step**:
    1. **Chọn ngày**: Sử dụng bộ lọc "Bắt đầu" - "Kết thúc" ở thanh trên cùng để tìm các đơn hàng trong kỳ.
    2. **Chọn đơn**: Tích vào ô vuông đầu mỗi dòng đơn hàng (hoặc nhấn nút "Chọn tất cả" nếu muốn trả hết).
    3. **Kích hoạt**: Nhấn nút **"Lập đề xuất"** (biểu tượng mũi tên xanh `send` xuất hiện ở góc trên khi có ít nhất 1 đơn được chọn).
    4. **Nhập thông tin**: Hệ thống chuyển sang màn hình **Lập đề xuất mới**.
        - Nhập **Mã đề xuất** (ví dụ: TToan_Thang01_2026).
        - Nhập **Mô tả** lý do thanh toán.
    5. **Kiểm tra**: Xem lại danh sách PO bên cột phải và Tổng tiền đề xuất bên cột trái.
    6. **Gửi**: Nhấn nút **"Gửi phê duyệt"** (màu xanh Teal).

### Bước 4: Phê duyệt & Thanh toán
- **Người thực hiện**: Cấp quản lý/Kế toán trưởng.
- **Thực hiện**: 
    1. Truy cập `Kế toán` -> `Đề xuất thanh toán`.
    2. Chọn đề xuất đang ở trạng thái `CHO_DUYET`.
    3. Kiểm tra xong nhấn nút **"Duyệt"**.
    4. Sau khi duyệt, Nhấn nút **"Thanh toán"**. Hệ thống sẽ tự động chuyển sang màn hình lập **Phiếu Chi** với đầy đủ thông tin đã được duyệt trước đó.

---

## ⚙️ QUẢN TRỊ HỆ THỐNG (ADMIN & TECHNICAL)

### 1. Đồng bộ dữ liệu từ hệ thống cũ (Sync)
- **Vị trí**: Menu `Hệ thống` -> `Quản lý Cron Jobs` (biểu tượng đồng hồ).
- **Thực hiện**: 
    - Nhấn vào job **"Đồng bộ Database"**.
    - Nhấn nút **"Chạy ngay"**. Hệ thống sẽ kéo dữ liệu Đơn hàng, Sản phẩm, Khách hàng từ Database gốc sang V3 mà không làm mất dữ liệu Kế toán bạn đã tạo trên V3.

### 2. Quản lý Quyền truy cập
- **Vị trí**: `Thiết lập` -> `Phân quyền`.
- **Thực hiện**: 
    - Nếu một nhân viên không thấy menu "Đề xuất thanh toán", hãy vào mục này, tìm Member đó và tích chọn quyền `payment-proposal.view`.

---

## 📑 CÁC PHÍM TẮT & BIỂU TƯỢNG NHANH
- 🔃 **Refresh**: Nút ở góc trên bên phải để cập nhật dữ liệu mới nhất mà không cần load lại trang.
- 👁️ **Visibility**: Biểu tượng con mắt để xem chi tiết chứng từ.
- ✅ **Check**: Các dòng màu xám nhẹ trong danh sách là các dòng bạn đã tích chọn.

---
*Tài liệu hướng dẫn dựa trên hệ thống Rausach V3 - Phiên bản ERP Core 2026.*
