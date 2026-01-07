# SO SÁNH & PHÂN TÍCH TỐI ƯU QUY TRÌNH CÔNG NỢ: LEGACY VS. V3 OPTIMIZATION

Tài liệu này phân tích sự khác biệt về mặt kiến trúc và nghiệp vụ trong cách xử lý công nợ giữa hệ thống cũ (Legacy) và giải pháp tối ưu hóa trên dự án Demo (V3).

---

## 1. ĐỐI CHIẾU & CÔNG NỢ TẠM (ACCOUNT RECEIVABLE / PAYABLE FORECAST)

| Đặc điểm | Hệ thống hiện tại (Legacy) | Dự án Demo (V3 Optimization) |
| :--- | :--- | :--- |
| **Ghi nhận công nợ tạm** | Dựa trên trạng thái `da_giao` hoặc `da_nhan`. Dữ liệu lấy trực tiếp từ SO/PO gốc. | Dựa trên `da_nhan` nhưng tách biệt rõ ranh giới giữa **Số lượng đặt (sldat)** và **Số lượng thực nhận (slnhan)**. |
| **Điểm chốt số liệu (Recon)** | Thường bỏ qua hoặc làm thủ công bên ngoài, dẫn đến sai lệch khi thanh toán thực tế. | **Bắt buộc (`doi_chieu`)**. Hệ thống khóa hoàn toàn đơn hàng sau khi đối chiếu để kế toán chốt nợ cuối cùng. |
| **Tính toàn vẹn dữ liệu** | Có thể sửa đơn hàng ngay cả khi đã thanh toán (nguy cơ sai lệch audit). | **Hard Lock**: Nếu đơn đã vào luồng kế toán (`doi_chieu`, `payment-proposal`), hệ thống chặn mọi thao tác sửa đổi. |

---

## 2. XỬ LÝ THANH TOÁN & CÔNG NỢ CHÍNH THỨC

| Đặc điểm | Hệ thống hiện tại (Legacy) | Dự án Demo (V3 Optimization) |
| :--- | :--- | :--- |
| **Đơn vị xử lý** | Thao tác rời rạc trên từng Đơn hàng một. | Xử lý theo **Chứng từ (Documents)**: Gom nhiều đơn hàng vào một Đề xuất thanh toán hoặc AR Document. |
| **Luồng phê duyệt** | Thường là `Đơn hàng -> Thanh toán`. Thiếu khâu kiểm soát chéo. | **Nguyên tắc 4 mắt**: Người lập Đề xuất -> Cấp trên Duyệt -> Thủ quỹ Chi tiền. Đảm bảo tính minh bạch. |
| **Cập nhật trạng thái** | Phải vào từng đơn hàng đánh dấu "Đã thanh toán" thủ công sau khi chi tiền. | **Cascade Update (Tự động)**: Khi Phiếu Chi/Thu xác nhận, hệ thống tự cập nhật trạng thái cho toàn bộ đơn hàng liên quan. |
| **Tính chính xác** | Dễ xảy ra thanh toán thừa/thiếu do không đối soát được số thực nhập/thực giao. | Công nợ tính toán lại chính xác tại bước `doi_chieu` dựa trên đơn giá và số lượng thực tế cuối cùng. |

---

## 3. ĐÁNH GIÁ TÍNH TỐI ƯU CỦA PHIÊN BẢN V3

Giải pháp trên dự án **Demo (V3)** tối ưu hơn vượt trội về mặt quản trị tài chính doanh nghiệp (ERP Standard) nhờ 4 yếu tố then chốt:

1.  **Tối ưu về Kiểm soát (Control):** V3 đưa ra trạng thái `DA_DOI_CHIEU` như một chốt chặn kỹ thuật. Kế toán chỉ được phép chi tiền đối với các dữ liệu đã được xác nhận khớp giữa các bộ phận (Kho - Thu mua - NCC).
2.  **Tối ưu về Hiệu suất (Efficiency):** Thay vì xử lý 100 giao dịch nhỏ lẻ, kế toán chỉ cần quản lý 1 Chứng từ tổng. Việc này giúp giảm 80% thời gian thao tác nhập liệu và rà soát thủ công.
3.  **Tối ưu về Audit (Tra cứu):** Mọi giao dịch đều có vết (Log) xuyên suốt từ khâu khởi tạo đến khâu dòng tiền. Dễ dàng truy xuất "Tại sao chi?", "Chi cho đơn nào?" và "Ai đã duyệt?".
4.  **Tối ưu về Dòng tiền (Cashflow):** Báo cáo dòng tiền được đồng bộ trực tiếp với các nghiệp vụ kế toán thực tế, giúp lãnh đạo có cái nhìn Real-time về sức khỏe tài chính của doanh nghiệp.

---

## KẾT LUẬN
Dự án **Demo (V3)** không chỉ là việc nâng cấp giao diện mà là một cuộc cải tổ về quy chuẩn nghiệp vụ. Hệ thống này giúp doanh nghiệp vận hành chuyên nghiệp hơn, triệt tiêu các rủi ro về sai lệch dữ liệu và xây dựng được lòng tin giữa các bộ phận thông qua quy trình phê duyệt minh bạch.

---
*Phân tích thực hiện tại dự án ERP Rausach V3 - Tháng 01/2026.*
