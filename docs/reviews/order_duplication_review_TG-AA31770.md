# Báo cáo xử lý lỗi trùng lặp sản phẩm - Đơn hàng TG-AA31770

## 1. Tổng quan vấn đề
Đơn hàng **TG-AA31770** gặp hiện tượng xuất hiện rất nhiều dòng sản phẩm cùng loại (**Chanh không hạt - Mã I100060**) trong cùng một đơn hàng, dẫn đến sai lệch số lượng và gây khó khăn trong việc quản lý.

## 2. Kết quả điều tra & Phân tích nguyên nhân
Qua kiểm tra Audit Log và mã nguồn, chúng tôi đã xác định được nguyên nhân gốc rễ:

### A. Race Condition tại Frontend (Nguyên nhân chính)
- **Hành vi lỗi:** Khi người dùng nhấn chọn thêm sản phẩm, hệ thống thực hiện gọi API lấy giá từ Bảng giá (xử lý bất đồng bộ). Việc thêm sản phẩm vào danh sách chỉ diễn ra sau khi có phản hồi từ API.
- **Vấn đề:** Nếu người dùng nhấn chuột nhiều lần liên tiếp khi API chưa kịp trả về, biến kiểm tra sự tồn tại của sản phẩm vẫn là `false`. Điều này dẫn đến việc sản phẩm bị "push" vào danh sách nhiều lần tương ứng với số lần nhấn.

### B. Cơ chế Deduplication (Xóa trùng lặp) yếu
- Logic kiểm tra trùng lặp trước đây chỉ dựa vào `record id`. Với các bản ghi đã lưu vào DB, chúng có ID khác nhau dù cùng mã sản phẩm, dẫn đến việc lưu chồng chéo không bị ngăn chặn.

## 3. Các hành động đã thực hiện

### A. Khắc phục mã nguồn (Fix Code)
Chúng tôi đã cập nhật file `frontend/src/app/admin/donhang/detaildonhang/detaildonhang.component.ts`:
1. **Khử Race Condition:** Thay đổi logic để thêm sản phẩm vào danh sách **ngay lập tức** khi nhấn chọn, sau đó mới cập nhật giá bất đồng bộ. Điều này ngăn chặn việc nhấn đúp tạo ra nhiều dòng.
2. **Cải tiến Deduplication:** Cập nhật hàm `removeDuplicateProducts` và logic validate để luôn kiểm tra trùng lặp dựa trên mã sản phẩm (`idSP`) thay vì ID bản ghi.

### B. Dọn dẹp dữ liệu (Data Cleanup)
1. **Phát hiện:** Tìm thấy **17 đơn hàng** (bao gồm đơn hàng gốc) trong hệ thống gặp tình trạng trùng lặp sản phẩm tương tự.
2. **Xử lý:** Đã triển khai script `global_cleanup_duplicates.js` để tự động gộp (merge) tất cả các dòng trùng lặp trên toàn hệ thống, cộng dồn số lượng và cập nhật ghi chú một cách an toàn.

**Danh sách các đơn hàng đã được chuẩn hóa:**

| STT | Mã Đơn Hàng | Ngày Giao | Trạng Thái |
| :--- | :--- | :--- | :--- |
| 1 | **TG-AA31770** | 12/03/2026 | Đã giao |
| 2 | **TG-AA29390** | 25/02/2026 | Đã đặt |
| 3 | **TG-AA28872** | 22/02/2026 | Đã nhận |
| 4 | **TG-AA27874** | 11/02/2026 | Đã nhận |
| 5 | **TG-AA27504** | 09/02/2026 | Đã nhận |
| 6 | **TG-AA26991** | 06/02/2026 | Đã nhận |
| 7 | **TG-AA19626** | 26/12/2025 | Đã nhận |
| 8 | **TG-AA15269** | 01/12/2025 | Đã nhận |
| 9 | **TG-AA12068** | 14/11/2025 | Đã nhận |
| 10 | **TG-AA10005** | 01/11/2025 | Đã nhận |
| 11 | **TG-AA09660** | 30/10/2025 | Đã nhận |
| 12 | **TG-AA06267** | 09/10/2025 | Đã nhận |
| 13 | **TG-AA02257** | 14/09/2025 | Đã nhận |
| 14 | **TG-AA01805** | 12/09/2025 | Đã nhận |
| 15 | **TG-AA01915** | 12/09/2025 | Đã nhận |
| 16 | **TG-AA00972** | 07/09/2025 | Đã nhận |
| 17 | **TG-AA00835** | 06/09/2025 | Đã nhận |

## 4. Trạng thái hiện tại
- **Hệ thống:** Đã vận hành với mã nguồn đã sửa lỗi tại Frontend, ngăn chặn hoàn toàn việc tái diễn tình trạng nhấn đúp tạo dòng mới.
- **Dữ liệu:** Toàn bộ dữ liệu trùng lặp cũ đã được dọn dẹp và chuẩn hóa.
- **Đơn hàng TG-AA31770:** Đã trở về trạng thái bình thường và đã được xử lý giao hàng.

---
*Ngày báo cáo: 12/03/2026*
*Người thực hiện: Antigravity AI*
