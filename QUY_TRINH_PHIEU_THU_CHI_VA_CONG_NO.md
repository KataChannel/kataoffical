# 📋 QUY TRÌNH HOẠT ĐỘNG PHIẾU THU CHI & QUẢN LÝ CÔNG NỢ

Tài liệu này mô tả chi tiết quy trình xử lý tài chính (Thu/Chi) và quản lý công nợ trong hệ thống Rausach V3, đồng thời phân tích khả năng báo cáo cho ban giám đốc.

---

## 1. 🔄 QUY TRÌNH HOẠT ĐỘNG (WORKFLOW)

Hệ thống hoạt động dựa trên sự tách biệt rõ ràng nhưng có liên kết giữa **Bán hàng (Ghi nhận nợ)**, **Thanh toán (Giảm nợ)** và **Dòng tiền (Thực thu/chi)**.

### **Bước 1: Phát sinh công nợ (Bán hàng)**
*   **Hành động:** Nhân viên tạo đơn hàng mới (`Donhang`).
*   **Trạng thái:** Đơn hàng được tạo với trạng thái `dadat` (Đã đặt) hoặc `dagiao` (Đã giao).
*   **Ghi nhận nợ:** Tại thời điểm này, **Công nợ khách hàng tăng lên** tương ứng với `tongtien` của đơn hàng.
*   **Dữ liệu:** Hệ thống lưu trữ giá trị đơn hàng chờ thanh toán.

### **Bước 2: Ghi nhận thanh toán (Giảm trừ công nợ)**
Có 2 cách để xử lý thanh toán, phù hợp với thực tế vận hành:

#### **Cách A: Thanh toán theo từng đơn (Chi tiết)**
*   **Tình huống:** Khách hàng trả tiền ngay khi nhận hàng hoặc chuyển khoản cho đúng đơn hàng đó.
*   **Thao tác:** Vào chi tiết đơn hàng hoặc danh sách đơn hàng -> Tạo `ThanhToan`.
*   **Hệ thống xử lý:**
    1.  Tạo bản ghi `ThanhToan` liên kết với `Donhang`.
    2.  Tính toán lại số tiền còn thiếu.
    3.  Nếu `DaThanhToan` >= `TongTien`, hệ thống **tự động** chuyển trạng thái đơn sang `hoanthanh`.

#### **Cách B: Thanh toán gộp (Thu công nợ định kỳ) - *Tính năng mới***
*   **Tình huống:** Cuối tuần/tháng khách hàng chuyển một cục tiền (VD: 50 triệu) để trả cho nhiều đơn nợ cũ.
*   **Thao tác:** Sử dụng tính năng **Tạo thanh toán công nợ** (Bulk Payment).
*   **Hệ thống xử lý:**
    1.  Nhân viên chọn Khách hàng -> Hệ thống liệt kê toàn bộ đơn nợ (ưu tiên đơn cũ nhất).
    2.  Hệ thống tự động phân bổ 50 triệu vào các đơn hàng cũ nhất trước.
    3.  Tạo hàng loạt các bản ghi `ThanhToan` cho từng đơn hàng tương ứng.
    4.  Cập nhật trạng thái `hoanthanh` cho tất cả các đơn đã được trả đủ.

### **Bước 3: Ghi nhận dòng tiền (Phiếu Thu/Chi)**
*   **Mục đích:** Quản lý tiền mặt/tiền gửi thực tế của công ty (Sổ quỹ).
*   **Phiếu Thu:**
    *   Thường được tạo khi nhận tiền mặt tại quỹ hoặc nhận báo có ngân hàng.
    *   Có thể hoạt động độc lập (Thu khác) hoặc liên kết tham chiếu tới Đơn hàng.
*   **Phiếu Chi:**
    *   Ghi nhận các khoản chi mua hàng (`Dathang`), chi phí vận hành (điện, nước, lương).
    *   Cần quy trình duyệt: Nhân viên tạo -> Kế toán trưởng/Giám đốc duyệt -> Xuất tiền.

---

## 2. 📊 ĐÁNH GIÁ HỆ THỐNG CÔNG NỢ

### **Hệ thống này có báo cáo tốt cho Công nợ không?**

**ĐÁNH GIÁ: TỐT (8.5/10)**

**Lý do:**
1.  **Quản lý chi tiết tới từng đơn hàng (Invoice-based):** Không chỉ theo dõi tổng nợ, hệ thống biết chính xác đơn nào đã trả, đơn nào chưa. Điều này giúp tránh tranh chấp công nợ với khách hàng ("Đơn ngày 01/01 anh trả rồi mà?").
2.  **Xử lý linh hoạt:**
    *   Cho phép thanh toán một phần (Partial payment).
    *   Cho phép thanh toán gộp (Batch payment) tự động phân bổ.
3.  **Dữ liệu chính xác:** Công nợ được tính toán realtime: `Tổng đơn hàng - Tổng thanh toán đã duyệt`.
4.  **Minh bạch:** Mọi giao dịch thanh toán đều có lịch sử, người tạo, ngày giờ.

---

## 3. 👁️ GIÁM ĐỐC CÓ THỂ XEM NHANH CÔNG NỢ KHÔNG?

**TRẢ LỜI: CÓ, RẤT NHANH CHÓNG.**

Giám đốc có thể xem công nợ qua các kênh sau:

### **1. Xem Tổng Quan (Dashboard)**
*   **Widget Công Nợ:** Ngay trên màn hình chính Dashboard có biểu đồ/số liệu tổng quan:
    *   Tổng nợ phải thu của toàn công ty.
    *   Top khách hàng nợ nhiều nhất.

### **2. Xem Chi Tiết Một Khách Hàng (3 Click)**
Một Giám đốc không cần biết kỹ thuật có thể kiểm tra công nợ khách hàng "Nguyễn Văn A" như sau:
1.  Vào menu **Khách Hàng**.
2.  Gõ tên/SĐT "Nguyễn Văn A" vào ô tìm kiếm.
3.  Nhìn vào cột **Công Nợ** (hoặc bấm vào chi tiết): Hệ thống hiển thị ngay con số hiện tại (VD: *Nợ: 15.500.000đ*).
    *   Bấm vào số tiền đó sẽ ra danh sách chi tiết các đơn hàng đang nợ.

### **3. Báo Cáo Xuất Excel**
*   Nếu cần họp hoặc gửi cho khách hàng đối chiếu, Giám đốc (hoặc Kế toán) có thể bấm **"Xuất Báo Cáo Công Nợ"**. Hệ thống tạo file Excel chi tiết:
    *   Dư nợ đầu kỳ.
    *   Phát sinh tăng (Mua hàng).
    *   Phát sinh giảm (Thanh toán).
    *   Dư nợ cuối kỳ.

---

## 4. 🚀 KIẾN NGHỊ CẢI TIẾN (ĐỂ ĐẠT 10/10)

Để hệ thống hoàn hảo hơn cho Giám đốc, nên bổ sung:
1.  **Cảnh báo nợ xấu:** Tự động tô đỏ khách hàng nợ quá hạn mức (VD: > 100 triệu) hoặc quá hạn (VD: > 30 ngày).
2.  **Thông báo Zalo/Email:** Tự động gửi sao kê công nợ cho khách hàng vào cuối tháng.
3.  **Liên kết tự động PhieuThu:** Hiện tại `ThanhToan` và `PhieuThu` đang hơi tách biệt. Có thể thêm tùy chọn "Tự động tạo Phiếu Thu" khi tạo `ThanhToan` để giảm thao tác cho kế toán.
