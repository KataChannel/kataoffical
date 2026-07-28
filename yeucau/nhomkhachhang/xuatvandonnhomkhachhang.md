### Tổng hợp và Phân tích Yêu cầu: Xuất Vận Đơn - Nhóm SIÊU THỊ

#### 1. Đối tượng và Điều kiện Lọc:
- **Nhóm Khách hàng**: Chỉ lấy các khách hàng thuộc nhóm "SIÊU THỊ" (Căn cứ trên trường `nhomkhachhang` Siêu Thị (30128727-7c5c-43c0-bc4b-0da5c6db0141) trong hệ thống).
- **Thời gian**: Lọc theo ngày giao hàng (`ngaygiao`) được chọn.
- **Trạng thái**: Chỉ lấy các đơn hàng có đơn thành công (không tính đơn hủy).

#### 2. Cấu trúc File Xuất (Excel):
File xuất ra sẽ mang tên "Vận đơn" và bao gồm 3 Sheet dữ liệu chi tiết:

1.  **Sheet: Vận đơn**
    - **Nội dung**: Danh sách tổng hợp các đơn hàng vận chuyển.
    - **Cột dữ liệu**: Theo template mẫu (thường bao gồm: STT, Mã đơn, Tên khách hàng, Địa chỉ, Số điện thoại, Tổng tiền, Ghi chú).

2.  **Sheet: Hàng Siêu Thị**
    - **Nội dung**: Chi tiết các mã sản phẩm giao cho nhóm siêu thị.
    - **Mục tiêu**: Hỗ trợ bộ phận soạn hàng/kho nhận diện nhanh hàng hóa của kênh siêu thị.
    - **Cột dữ liệu**: Theo template (thường bao gồm: STT, Tên sản phẩm, ĐVT, Số lượng, Đơn giá, Thành tiền).

3.  **Sheet: Phiếu Chuyến**
    - **Nội dung**: Thông tin điều phối chuyến/xe giao hàng.
    - **Cột dữ liệu**: Theo template (thường bao gồm: STT, Mã chuyến, Tài xế, Danh sách khách hàng trong chuyến, Thời gian bắt đầu/kết thúc).

#### 3. Quy trình Xử lý:
- Bước 1: Người dùng chọn ngày cần xuất dữ liệu.
- Bước 2: Hệ thống truy vấn SQL/Prisma lọc khách hàng thuộc nhóm SIÊU THỊ và có đơn hàng trong ngày đó.
- Bước 3: Ánh xạ dữ liệu đơn hàng và sản phẩm vào cấu trúc 3 sheet của template.
- Bước 4: Tạo file Excel (.xlsx) và cho phép người dùng tải về.

#### 4. Đề xuất Kiến trúc Dữ liệu (Nhóm vs Tag):
- **Lựa chọn**: Sử dụng quan hệ bảng (`Nhomkhachhang`) liên kết với `Khachhang` (như cấu trúc Prisma hiện tại).
- **Lý do**:
    - **Nhất quán**: Tránh sai sót do nhập liệu văn bản tự do (tag string).
    - **Mở rộng**: Dễ dàng cấu hình các logic đặc thù cho nhóm Siêu thị (như template 3 sheet, ngày chốt công nợ riêng) mà không làm rác bảng Khách hàng.
    - **Linh hoạt**: Cho phép một khách hàng thuộc nhiều phân nhóm khác nhau nếu cần (Many-to-Many).
- **Kết luận**: Dùng `Nhomkhachhang` để định danh chính xác các đối tượng cần xuất báo cáo 3 sheet này.

---

**Yêu cầu gốc:**
nhóm SIÊU THỊ
lọc tất cả Khách hàng thuộc nhóm này theo ngày -> Nếu có đơn thì lấy các cột như template
gom chung vào file Vận đơn
=> file vận đơn sẽ có 3 sheet: Vận đơn - Hàng Siêu Thị - Phiếu Chuyến