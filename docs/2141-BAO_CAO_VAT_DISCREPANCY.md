# Báo Cáo Xử Lý Lệch Thuế VAT - Đơn Hàng TG-AA25883

## 1. Vấn Đề (Objective)
Người dùng phản ánh sự sai lệch tiền trong báo cáo "Tổng hợp công nợ". Cụ thể, đơn hàng **TG-AA25883** dù đã tắt "Hiện VAT" (`isshowvat: false`), nhưng tổng tiền (`tongtien`) vẫn bao gồm 5% thuế VAT.

## 2. Kết Quả Điều Tra (Investigation)
Sau khi kiểm tra dữ liệu và mã nguồn, chúng tôi phát hiện các nguyên nhân sau:

### Dữ liệu thực tế của đơn hàng TG-AA25883:
- **isshowvat**: `false`
- **vatRate**: `0.05` (5%)
- **Tổng tiền hàng (Base Amount)**: `84,000`
- **Tổng tiền (tongtien)**: `88,200` (Sai, đúng ra phải là 84,000)
- **Tổng VAT (tongvat)**: `4,200`

### Nguyên nhân gốc rễ (Root Causes):
1.  **Lỗi Logic Frontend**: Trong file `detaildonhang.component.ts`, hàm `calculateTotalVat()` khi tính toán tổng VAT đã không kiểm tra biến `isshowvat`. Nó luôn mặc định tính 5% nếu không có giá trị khác, dẫn đến việc gửi dữ liệu sai (có tax) lên server khi lưu đơn hàng.
2.  **Dữ liệu cũ không nhất quán**: Nhiều đơn hàng cũ đã bị lưu với giá trị `tongtien` bao gồm VAT dù không hiển thị VAT, dẫn đến các báo cáo tổng hợp (như "Công nợ khách hàng") lấy trực tiếp trường `tongtien` từ DB bị sai lệch.
3.  **Lỗi báo cáo Excel**: File xuất Excel "Tổng hợp công nợ" sử dụng trường `tongtien` trực tiếp mà không tính toán lại dựa trên cờ `isshowvat`.

## 3. Các Giải Pháp Đã Thực Hiện (Actions Taken)

### A. Sửa lỗi Logic Frontend
- Đã cập nhật file `/frontend/src/app/admin/donhang/detaildonhang/detaildonhang.component.ts`.
- Hàm `calculateTotalVat()` hiện tại sẽ trả về `0` ngay lập tức nếu `isshowvat` là `false`. Điều này đảm bảo khi người dùng thao tác hoặc sửa đơn hàng, giá trị tổng sẽ luôn chính xác.

### B. Cải thiện xuất báo cáo Excel
- Đã cập nhật file `/frontend/src/app/admin/congnokhachhang/listcongnokhachhang/listcongnokhachhang.component.ts`.
- Bổ sung trường `isshowvat` và `vat` vào câu lệnh truy vấn GraphQL khi chuẩn bị dữ liệu xuất.
- Cập nhật hàm `ExportExcelTwoSheets` để **tính toán lại tổng tiền thực tế** dựa trên cờ `isshowvat`. Việc này giúp báo cáo luôn đúng ngay cả khi dữ liệu trong database chưa kịp đồng bộ.

### C. Dọn dẹp và sửa lỗi dữ liệu (Data Fix)
- Đã tạo và chạy script bảo trì `fix_vat.js` trên máy chủ API.
- Script đã quét toàn bộ các đơn hàng từ đầu năm 2025.
- Thực hiện tính toán lại và cập nhật chính xác `tongvat` và `tongtien` cho hàng trăm đơn hàng có dấu hiệu sai lệch (trong đó có `TG-AA25883`).

## 4. Kết Quả Xác Minh (Verification)
Chúng tôi đã chạy script kiểm tra sau khi sửa lỗi:

| Mã Đơn Hàng | Trạng thái VAT | Tổng tiền trước fix | Tổng tiền sau fix | Kết Quả |
|:--- |:--- |:--- |:--- |:--- |
| **TG-AA25883** | Ẩn VAT | 88,200 | **84,000** | **ĐÚNG** |
| **TG-AA25843** | Ẩn VAT | 3,759,300 | 3,759,300 | Đang đúng |
| **TG-AA25871** | Ẩn VAT | 160,900 | 160,900 | Đang đúng |

**Kết luận**: Hệ thống hiện tại đã hiển thị và tính toán đúng công nợ cho các đơn hàng không có VAT. Các báo cáo xuất ra từ trang "Công nợ khách hàng" sẽ phản ánh đúng số liệu khớp với yêu cầu của người dùng.

---
*Ngày báo cáo: 02/02/2026*
*Người thực hiện: Antigravity AI*
