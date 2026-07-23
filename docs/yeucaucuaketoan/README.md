# HƯỚNG DẪN VÀ TỔNG HỢP THÔNG TIN XUẤT BÁO CÁO MISA (YÊU CẦU CỦA KẾ TOÁN)

Thư mục này chứa **các mẫu Excel chuẩn MISA** và **dữ liệu xuất chứng từ Kế toán** (Phiếu giao hàng / Mua hàng nhà cung cấp) dùng để nhập (import) trực tiếp vào phần mềm Kế toán MISA.

---

## 1. Danh sách các file trong thư mục

### A. File Template Mẫu chuẩn (MISA Baseline Templates)
* **`Phieu giao hang.xls`**: Mẫu Excel chuẩn của MISA dành cho chứng từ **Bán hàng / Xuất kho bán hàng**.
* **`Mua hang nha cung cap.xls`**: Mẫu Excel chuẩn của MISA dành cho chứng từ **Mua hàng nhà cung cấp / Nhập kho**.

### B. File Dữ liệu đã xuất cho Kế toán (Ví dụ dữ liệu ngày 16/07/2026)
* **`Mua hang nha cung cap_16-07-2026.xls`**: Chứa toàn bộ dữ liệu đơn nhập mua hàng nhà cung cấp đã hoàn tất trong ngày 16/07/2026.
* **`Phieu giao hang_16-07-2026_part1.xls` -> `part6.xls`**: Dữ liệu phiếu giao hàng/bán hàng ngày 16/07/2026 được tự động chia nhỏ thành các phần (tối đa **500 dòng/part**) để khi kế toán import vào phần mềm MISA không bị quá tải hoặc treo máy.
* **`Muahanggiaohang16072026.zip`**: File nén tổng hợp lại toàn bộ các file xuất ngày 16/07/2026.

---

## 2. Mã nguồn & Luồng xử lý tạo ra các file này

Toàn bộ logic truy vấn dữ liệu, ánh ánh (mapping) cột MISA và xuất file Excel được triển khai tại:
👉 **Mã nguồn script:** [`api/export_misa_data.js`](file:///home/kata/Coding/rausachfinal/api/export_misa_data.js)

### Quy trình xử lý của Script (`export_misa_data.js`):

1. **Truy vấn dữ liệu từ PostgreSQL (qua Prisma)**:
   * **Bán hàng (`donhang`)**: Lấy danh sách đơn hàng có `ngaygiao` thuộc ngày chỉ định và trạng thái `status: 'danhan'`. Kết nối lấy thông tin `khachhang`, `kho` và danh sách chi tiết `sanpham` (`slnhan`, `giaban`, `vat`).
   * **Mua hàng (`dathang`)**: Lấy danh sách đơn đặt mua nhà cung cấp có `ngaynhan` thuộc ngày chỉ định và trạng thái `status: 'danhan'`. Kết nối lấy thông tin `nhacungcap`, `kho` và chi tiết `sanpham` (`slnhan`, `gianhap`, `vat`).

2. **Cấu trúc Mapping cột MISA chuẩn**:
   * **Bán hàng (`Phieu giao hang.xls`)**: Ánh xạ 61 cột theo MISA.
     * Số chứng từ & Số phiếu xuất: `madonhang`
     * Mã & Tên khách hàng, Địa chỉ, Mã số thuế
     * Tài khoản công nợ (1331), Tài khoản doanh thu (5111), Tài khoản giá vốn (632), Tài khoản kho (1561)
     * Số lượng thực nhận (`slnhan`), Đơn giá bán (`giaban`), Thuế GTGT (33311)
   * **Mua hàng (`Mua hang nha cung cap.xls`)**: Ánh xạ 63 cột theo MISA.
     * Số chứng từ: `madncc`
     * Mã & Tên NCC, Địa chỉ, MST
     * Cột "Nhận kèm hóa đơn": **Bỏ trống** (`""`) theo yêu cầu kế toán
     * Tài khoản nợ (1561), Tài khoản có (331), Tài khoản thuế đầu vào (1331)
     * Số lượng thực nhận (`slnhan`), Đơn giá nhập (`gianhap`), Thuế GTGT đầu vào.

3. **Cơ chế chia nhỏ file (Chunking)**:
   * Script sử dụng hằng số `CHUNK_SIZE = 500` dòng/file.
   * Xóa toàn bộ dữ liệu mẫu từ dòng 9 trở đi trong file template, sau đó ghi các dòng dữ liệu thực tế và cập nhật lại thuộc tính vùng dữ liệu (`!ref`).

---

## 3. Hướng dẫn vận hành & Xuất báo cáo

### A. Xuất dữ liệu cho 1 ngày duy nhất
```bash
cd /home/kata/Coding/rausachfinal/api

# Cú pháp: node export_misa_data.js <YYYY-MM-DD>
node export_misa_data.js 2026-07-16
```

### B. Xuất dữ liệu hàng loạt theo từng ngày vào thư mục `dulieuxuat/`
Để kết xuất hàng loạt dữ liệu (ví dụ từ `01/01/2026` đến `19/07/2026`) phân chia theo từng thư mục ngày:

```bash
cd /home/kata/Coding/rausachfinal/api

# Cú pháp: node export_misa_range.js <TỪ_NGÀY> <ĐẾN_NGÀY>
node export_misa_range.js 2026-01-01 2026-07-19
```

> **Lưu ý:**
> - Kết quả sẽ được lưu tại [`docs/yeucaucuaketoan/dulieuxuat/YYYY-MM-DD/`](file:///home/kata/Coding/rausachfinal/docs/yeucaucuaketoan/dulieuxuat).
> - Mỗi thư mục ngày chứa đầy đủ: `Mua hang nha cung cap_DD-MM-YYYY.xls` và các `Phieu giao hang_DD-MM-YYYY_partX.xls`.
