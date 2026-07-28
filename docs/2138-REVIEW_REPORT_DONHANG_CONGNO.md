# BÁO CÁO REVIEW CHỨC NĂNG ĐƠN HÀNG VÀ CÔNG NỢ

Chào anh, em đã tiến hành rà soát kỹ hệ thống (Backend & Frontend) liên quan đến hai yêu cầu của anh. Dưới đây là xác nhận chi tiết về các thao tác:

---

### 1. Chỉnh sửa đơn hàng sau khi đổi trạng thái (Xóa món hoặc sửa số liệu)
**Xác nhận: Hoạt động tốt và an toàn.**

*   **Cơ chế xử lý:** Hệ thống cho phép chỉnh sửa linh hoạt dựa trên trạng thái hiện tại của đơn hàng:
    *   **Trạng thái `dadat` (Đã đặt):** Cho phép sửa toàn bộ (thêm, xóa sản phẩm, đổi số lượng/giá). Hệ thống tự động tính toán lại tồn kho đặt hàng (`slchogiao`).
    *   **Trạng thái `dagiao` -> `danhan`:** Khi anh sửa số liệu nhận hàng (`slnhan`), nếu thực tế nhận ít hơn lúc giao, hệ thống sẽ:
        *   Tự động trả lại phần hàng thiếu vào kho (`slton`).
        *   Tạo phiếu nhập trả hàng thiếu tự động.
        *   Tính lại tiền dựa trên số lượng thực nhận.
    *   **Trạng thái `danhan` (Đã nhận):** Hệ thống có logic đặc biệt (Case `danhan special case` trong file service) cho phép anh sửa lại số lượng nhận hoặc ghi chú mà vẫn đảm bảo tổng tiền đơn hàng và công nợ được cập nhật chính xác ngay lập tức.
*   **Tồn kho:** Việc xóa món hoặc giảm số lượng được kiểm soát chặt chẽ, hoàn trả số lượng về kho tương ứng để tránh thất thoát dữ liệu.

---

### 2. Tạo đơn mới cho khách hàng và vị trí lưu công nợ
**Xác nhận: Hoạt động chính xác, đảm bảo tính liên kết dữ liệu.**

*   **Cơ chế tạo đơn:** Khi tạo đơn mới cho cùng một khách hàng tại cùng một thời điểm:
    *   Hệ thống tạo ra một ID và mã đơn hàng duy nhất (Unique).
    *   Không bị xung đột dữ liệu với các đơn hàng cũ.
*   **Công nợ lưu ở đâu?**
    *   **Dữ liệu gốc:** Công nợ không chỉ lưu ở một con số cố định mà được tổng hợp từ bảng `Donhang` và `Donhangsanpham` trong cơ sở dữ liệu Postgres.
    *   **Liên kết:** Mỗi đơn hàng đều gắn chặt với ID của khách hàng (`khachhangId`).
    *   **Cách thức xem:** Khi anh vào phần **Công nợ khách hàng**, hệ thống sẽ quét toàn bộ các đơn hàng có trạng thái `danhan` hoặc `hoanthanh` của khách hàng đó trong khoảng thời gian anh chọn để tính ra tổng nợ.
    *   **Tính tức thì:** Ngay khi đơn hàng mới được chuyển sang trạng thái "Đã nhận", giá trị của nó sẽ ngay lập tức được cộng dồn vào tổng công nợ của khách hàng đó trong các báo cáo xuất ra.

---

### TỔNG KẾT
Cả hai quy trình trên đều đã được thiết kế để xử lý các tình huống nghiệp vụ thực tế (sai sót khi giao nhận, đơn hàng phát sinh liên tục). Anh có thể hoàn toàn yên tâm thực hiện các thao tác này trên hệ thống.

*Báo cáo được tạo vào lúc: 30/01/2026*
