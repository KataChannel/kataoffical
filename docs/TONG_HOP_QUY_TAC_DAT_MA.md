# Tổng Hợp Quy Tắc Đặt Mã (Coding Conventions) - Hệ thống KataChannel

Tài liệu này tổng hợp các quy tắc đặt mã định danh (Codes/IDs) cho các thực thể trong hệ thống KataChannel (rausachfinal), giúp đảm bảo tính nhất quán và dễ dàng quản lý.

---

## 1. Quy Tắc Chung Cho Mã Tự Động (Auto-generated Codes)

Hệ thống sử dụng một logic tăng tiến chung cho các mã dài (như đơn hàng, phiếu kho):
- **Phần chữ cái (`LL`)**: Gồm 2 ký tự từ `AA` đến `ZZ`. Khi phần số đạt giới hạn, phần chữ cái sẽ tăng tiến (ví dụ: `AA` -> `AB` -> ... -> `AZ` -> `BA`).
- **Phần số (`NNNNN`)**: Gồm 5 chữ số từ `00001` đến `99999`. Khi đạt `99999`, sẽ reset về `00001` và tăng phần chữ cái.

---

## 2. Chi Tiết Mã Cho Từng Thực Thể

| Thực thể | Tên trường | Định dạng | Tiền tố (Prefix) | Ví dụ |
| :--- | :--- | :--- | :--- | :--- |
| **Đơn hàng (Sales Order)** | `madonhang` | `PREFIX-LLNNNNN` | `TG-` | `TG-AA00001` |
| **Đặt hàng NCC (Purchase Order)** | `madncc` | `PREFIX-LLNNNNN` | `TGNCC-` | `TGNCC-AA00001` |
| **Phiếu Nhập Kho** | `maphieu` | `PREFIXLLNNNNN` | `PKN` | `PKNAA00001` |
| **Phiếu Xuất Kho** | `maphieu` | `PREFIXLLNNNNN` | `PKX` | `PKXAA00001` |
| **Sản phẩm (Product)** | `masp` | `PREFIXNNNNN` | `I1` | `I100001` |
| **Khách hàng Sỉ** | `makh` | `PREFIXNNNNN` | `TG-KS` | `TG-KS00001` |
| **Khách hàng Lẻ** | `makh` | `PREFIXNNNNN` | `TG-KL` | `TG-KL00001` |
| **Nhà cung cấp (Vendor)** | `mancc` | `PREFIXNNNNN` | `TG-NCC` | `TG-NCC00001` |
| **Quyền (Permission ID)** | `codeId` | `PREFIXNNNNN` | `PEM` | `PEM00001` |
| **Nhân viên** | `maNV` | `PREFIXNNN` | `NV` | `NV001` |
| **Phòng ban** | `ma` | `PREFIXNNN` | `PB`, `BP`, `TO`... | `PB001` |

---

## 3. Quy Tắc Đặt Tên Quyền (Permission Names)

Ngoài `codeId` mang tính kỹ thuật, các quyền còn có tên (`name`) theo quy tắc:
- **Định dạng**: `[module].[action]`
- **Ví dụ**:
    - `donhang.view`: Quyền xem danh sách đơn hàng.
    - `donhang.edit`: Quyền chỉnh sửa đơn hàng.
    - `dathang.create`: Quyền tạo đơn đặt hàng NCC.
    - `kho.view`: Quyền xem tồn kho.

---

## 4. Logic Phụ Trợ

### 4.1 Phiếu Giao Hàng & Vận Đơn
- Thông thường, mã vận đơn hoặc phiếu giao hàng có thể đi kèm mã đơn hàng để dễ truy vết.
- Ví dụ: Một phiếu kho xuất cho đơn hàng `TG-AA00001` có thể được ghi chú hoặc liên kết trực tiếp để kế toán đối soát.

### 4.2 Xử Lý Sai Lệch (RET)
- Khi có hàng trả về (Return), mã phiếu thường có tiền tố **`RET-`** hoặc được tạo dựa trên mã đơn gốc để cấn trừ công nợ.

---

## 5. Lưu Ý Khi Khởi Tạo Thủ Công
Khi người dùng nhập mã thủ công (không thông qua hệ thống tự sinh):
1. **Duy nhất (Unique)**: Tất cả các mã trên đều được đánh index `UNIQUE` trong database. Nếu trùng sẽ gây lỗi `Conflict`.
2. **Đúng định dạng**: Nên tuân thủ tiền tố của hệ thống để các chức năng tìm kiếm, lọc (Filter) hoạt động chính xác.

---
*Tài liệu được tổng hợp từ dữ liệu hệ thống KataChannel - 2026.*
