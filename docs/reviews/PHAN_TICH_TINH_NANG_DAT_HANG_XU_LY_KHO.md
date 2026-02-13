# Phân Tích & Đánh Giá Tính Năng Đặt Hàng và Tồn Kho - KataCore (Rau Sạch Trần Gia)

Dưới đây là báo cáo phân tích chi tiết về các tính năng liên quan đến nhu cầu đặt hàng, cập nhật tồn kho và báo cáo Excel tổng hợp dựa trên cấu trúc mã nguồn hiện tại của dự án.

## 1. Phân Tích Tính Năng "Nhu Cầu Đặt Hàng" (nhucaudathang)

Tính năng này là trung tâm của việc lập kế hoạch cung ứng, giúp người quản lý biết được cần đặt thêm bao nhiêu sản phẩm để đáp ứng đơn hàng khách hàng.

### Cơ Chế Hoạt Động
- **Nguồn dữ liệu**: Kết hợp dữ liệu từ 4 bảng chính qua GraphQL: `donhang` (đơn khách), `dathang` (đơn NCC), `tonkho` (tồn hiện tại), và `sanpham` (danh mục & tỷ lệ hao hụt).
- **Logic Tổng Hợp (Aggregation)**:
    - **Tổng Khố**: Được tính bằng cách cộng tồn từ 6 kho khác nhau (`kho1` đến `kho6`) cộng với tồn thực tế (`sltontt`).
    - **Tổng Khách Đặt**: Lấy từ các đơn hàng có trạng thái `dadat`.
    - **Hao Hụt**: Tính toán dựa trên `% hao hụt` cấu hình cho từng sản phẩm. Công thức: `SL Hao Hụt = Tổng Khách Đặt * % Hao Hụt / 100`.
    - **Gợi Ý Đặt Hàng (goiy)**: Công thức: `Tổng Khách Đặt + SL Hao Hụt - Tổng Kho`.

### Đánh Giá
- **Ưu điểm**: 
    - Khả năng lọc theo khoảng thời gian linh hoạt (mặc định là hôm nay).
    - Hiển thị chi tiết tồn kho phân rã theo từng kho bãi (Long An, Đà Lạt, HCM...).
    - Hỗ trợ xem nhanh các đơn hàng/đặt hàng liên quan qua tính năng "Expand".
- **Hạn chế**: 
    - Logic tính toán nặng tập trung ở Frontend (`loadDonhangWithRelations` gần 350 dòng code). Khi dữ liệu lớn (>10,000 dòng), hiệu năng có thể bị ảnh hưởng.
    - Phụ thuộc nhiều vào việc cập nhật trạng thái đơn hàng chính xác.

---

## 2. Tính Năng "Cập Nhật Tồn Kho" (Inventory Update)

Hệ thống cho phép cập nhật tồn kho nhanh chóng thông qua tệp Excel, tránh được việc nhập liệu thủ công từng mặt hàng.

### Quy Trình Xử Lý
1. **Tải Mẫu Excel**: Cung cấp file mẫu với các cột `masp`, `title`, `slton`.
2. **Đọc Dữ Liệu**: Sử dụng thư viện `xlsx` để phân tích file tại Frontend.
3. **Xử Lý Database**:
    - Đối chiếu mã sản phẩm (`masp`).
    - Nếu đã có bản ghi tồn kho: Cập nhật `slton` và `sltontt` qua `updateOne`.
    - Nếu chưa có: Tạo mới bản ghi qua `createOne`.
    - Tất cả các mã không có trong file Excel sẽ được hệ thống ngầm định giữ nguyên hoặc thông báo nếu có lỗi.

### Đánh Giá
- **Ưu điểm**: Quy trình khép kín, có thông báo lỗi chi tiết (line-by-line) nếu dữ liệu không hợp lệ.
- **Hạn chế**: Việc cập nhật được thực hiện bằng cách lặp (loop) và gọi API từng dòng. Điều này có thể gây quá tải API hoặc chậm nếu file Excel có hàng nghìn dòng. Nên chuyển sang sử dụng "Bulk Update" ở Backend.

---

## 3. Tải Excel "Tổng Hợp Nhu Cầu Đặt Hàng"

Tính năng xuất báo cáo phục vụ việc in ấn hoặc gửi cho nhà cung cấp/tổ đóng gói.

### Đặc Điểm Bản Xuất (Export)
File Excel xuất ra bao gồm 2 Sheet chuyên biệt:
- **Sheet 1 (Tổng Hợp)**: Danh sách sản phẩm kèm theo Tổng Khách Đặt, Tổng Kho, và quan trọng nhất là **Số lượng cần đặt (Gợi ý)**.
- **Sheet 2 (Chi Tiết)**: Bảng phân rã nhu cầu theo từng kho cụ thể để điều phối vận chuyển.

### Đánh Giá
- **Ưu điểm**: Dữ liệu đã được map nhãn (mapping) sang tiếng Việt dễ đọc (VD: `kho1` -> `TG-LONG AN`). Định dạng số được làm tròn 3 chữ số thập phân, phù hợp với ngành rau củ quả.
- **Hạn chế**: Chưa có tính năng tùy chỉnh mẫu template (header/footer) trực tiếp trên giao diện.

---

## 4. Tổng Kết & Đề Xuất

| Tính Năng | Trạng Thái | Hiệu Quả | Đề Xuất Cải Thiện |
| :--- | :--- | :--- | :--- |
| **Nhu Cầu Đặt Hàng** | Hoàn thiện | Cao | Chuyển logic tổng hợp về Backend (Database views hoặc Cached Service) để giảm tải cho trình duyệt. |
| **Cập Nhật Tồn Kho** | Hoàn thiện | Khá | Triển khai xử lý Worker hoặc Batch Update ở Backend để xử lý file lớn nhanh hơn. |
| **Tải Excel** | Tốt | Cao | Thêm tùy chọn xuất theo NCC cụ thể để gửi thẳng đơn đặt hàng. |

**Kết luận**: Hệ thống hiện tại đáp ứng tốt nhu cầu vận hành thực tế của Rau Sạch Trần Gia, đặc biệt là sự phối hợp giữa các kho bãi và tính toán số lượng hao hụt tự động. Cấu trúc mã nguồn rõ ràng, có xử lý lỗi và trải nghiệm người dùng (UX) tốt nhờ các loading spinner và snackbar thông báo.
