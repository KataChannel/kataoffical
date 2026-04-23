# HƯỚNG DẪN SỬ DỤNG VÀ KIỂM TRA HỆ THỐNG ĐỐI SOÁT KHO (INVENTORY CONTROL)

Tài liệu này hướng dẫn cách vận hành các tính năng mới và các bước kiểm tra (UAT) để đảm bảo hệ thống đáp ứng đầy đủ 7 yêu cầu cốt lõi (YC1 - YC7).

---

## 1. TỔNG QUAN CÁC ĐỊA CHỈ TRUY CẬP (UI PATHS)

| Tính năng | Đường dẫn (URL) | Mục đích |
| :--- | :--- | :--- |
| **Checklist Vận Hành** | `/admin/khotask` | Nhân viên kho thực hiện SOP hằng ngày. |
| **Chi tiết Chốt Kho** | `/admin/chotkho/:id` | Nhập tồn thực tế, xem hao hụt tiền, khóa sổ. |
| **Đối soát Nhập hàng** | `/admin/thongke/doisoat-nhap` | So sánh số lượng NCC giao vs Kho nhận. |
| **Dashboard Real-time** | `/admin/dashboard` | Theo dõi biến động kho trong ngày. |

---

## 2. HƯỚNG DẪN CHI TIẾT & CÁCH KIỂM TRA (UAT)

### YC1: Quản lý Lên đơn & Đặt hàng
*   **Cách sử dụng:** Truy cập `Đặt Hàng` -> `Đặt hàng Nhà Cung Cấp`. Tạo đơn mới hoặc Import từ Excel.
*   **Cách kiểm tra:**
    1.  Tạo 1 đơn đặt hàng. 
    2.  Kiểm tra xem mã đơn hàng có tự động tăng (`TGNCC-AAxxxxx`) không.
    3.  Kiểm tra số lượng tồn kho "Chờ nhập" (`slchonhap`) có tăng tương ứng không.

### YC2: Thống kê Nhập-Xuất-Hủy-Tồn (Real-time)
*   **Cách sử dụng:** Truy cập `Dashboard`. Hệ thống tự động tổng hợp dữ liệu từ các đơn hàng và phiếu kho trong ngày.
*   **Cách kiểm tra:**
    1.  Thực hiện 1 lệnh Nhập kho (Phiếu Kho).
    2.  Quay lại Dashboard xem mục "Nhập trong ngày" có cập nhật ngay lập tức không (không cần thực hiện Chốt kho).

### YC3: Cập nhật tồn thực tế (Ước lượng vs Cân thực tế)
*   **Cách sử dụng:** Trong giao diện `Chi tiết Chốt Kho`, khi nhập số lượng thực tế, chọn checkbox **"Hàng ước lượng"** cho các mã hàng không cân (ví dụ: hàng xá, hàng đóng bao số lượng lớn).
*   **Cách kiểm tra:**
    1.  Mở một phiên chốt kho chưa khóa.
    2.  Nhập số lượng thực tế và đánh dấu `isEstimated`.
    3.  Lưu lại và tải lại trang, kiểm tra xem trạng thái ước lượng có được giữ nguyên không.

### YC4: Tính toán hao hụt tài chính (Tiền)
*   **Cách sử dụng:** Xem trực tiếp tại bảng `Chi tiết Chốt Kho`.
*   **Cách kiểm tra:**
    1.  Nhập `SL Thực tế` thấp hơn `SL Hệ thống`.
    2.  Kiểm tra cột `Giá trị Lệch (VNĐ)` có hiển thị số tiền tương ứng với `Đơn giá x Số lượng lệch` không.
    3.  Nhập `SL Hủy`, kiểm tra cột `Giá trị Hủy (VNĐ)`.

### YC5: Đối soát Kho xuất vs Kế toán
*   **Cách sử dụng:** Truy cập `Thống Kê` -> `Đối soát Nhập hàng`.
*   **Cách kiểm tra:**
    1.  Tìm một đơn đặt hàng có `Số lượng NCC Giao` khác với `Số lượng thực nhận tại Kho`.
    2.  Vào trang Đối soát, chọn khoảng thời gian tương ứng.
    3.  Kiểm tra xem dòng dữ liệu đó có hiển thị màu đỏ ở cột `Chênh lệch` không.

### YC6: Quy trình vận hành (Checklist SOP)
*   **Cách sử dụng:** Truy cập `/admin/khotask`.
*   **Cách kiểm tra:**
    1.  Chọn kho hàng đang làm việc.
    2.  Tích chọn "Đã hoàn thành" cho các đầu việc (ví dụ: "Kiểm tra hàng nhập đầu ca").
    3.  Nhấn lưu và kiểm tra xem `Thời gian cập nhật` có hiển thị đúng lúc bạn tích chọn không.

### YC7: Khóa dữ liệu (Data Lock)
*   **Cách sử dụng:** Nút **"Khóa sổ"** nằm ở góc trên bên phải trang `Chi tiết Chốt Kho`.
*   **Cách kiểm tra:**
    1.  Nhấn nút "Khóa sổ" và xác nhận.
    2.  Thử click vào các ô nhập liệu số lượng thực tế hoặc ghi chú. Kiểm tra xem các ô này có bị vô hiệu hóa (ReadOnly) không.
    3.  Kiểm tra nút "Lưu" có bị ẩn đi không.
    4.  Nhấn "Mở khóa" (nếu có quyền Admin) và kiểm tra xem các ô nhập liệu có hoạt động trở lại không.

---

## 3. DANH SÁCH CÁC API CỐT LÕI (DÀNH CHO KỸ THUẬT)

Nếu cần kiểm tra dữ liệu thô từ Database/Backend, sử dụng các GraphQL Query/Mutation sau:

1.  **Lấy Dashboard Real-time:**
    ```graphql
    query { chotkhoDailyInventorySummary(khoId: "ID_KHO") }
    ```
2.  **Lấy báo cáo hao hụt:**
    ```graphql
    query { chotkhoScrapReport(filters: { startDate: "...", endDate: "..." }) }
    ```
3.  **Thực hiện Khóa sổ:**
    ```graphql
    mutation { chotkhoLock(id: "ID_PHIEN", userId: "ID_USER") }
    ```

---

## 4. CÂU HỎI THƯỜNG GẶP (FAQ)

*   **Tại sao tôi không thấy nút "Mở khóa"?**
    *   Quyền mở khóa chỉ dành cho tài khoản có vai trò `Admin`. Tài khoản `Nhân viên` chỉ có quyền Khóa sổ sau khi hoàn tất nhập liệu.
*   **Làm sao để biết một mặt hàng bị lệch tiền nhiều nhất?**
    *   Tại bảng `Chi tiết Chốt Kho`, bạn có thể nhấn vào tiêu đề cột `Giá trị Lệch (VNĐ)` để sắp xếp từ cao xuống thấp.

---
*Tài liệu được tạo tự động bởi Antigravity AI - 2026*
