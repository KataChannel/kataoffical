# QUY TRÌNH CHUẨN BÁN HÀNG → CÔNG NỢ KHÁCH HÀNG → THU TIỀN

> Phiên bản chuẩn ERP – mirror logic MUA HÀNG → CÔNG NỢ NCC → CHI TIỀN

---

## I. MỤC TIÊU & NGUYÊN TẮC

### 🎯 Mục tiêu
- Chuẩn hóa quy trình bán hàng – thu tiền theo **chuẩn kế toán Việt Nam**
- Tách bạch rõ:
  - Nghiệp vụ kinh doanh
  - Chứng từ kế toán
  - Nghiệp vụ tiền mặt / ngân hàng
- Đảm bảo:
  - Audit rõ ràng
  - Không thu trùng / thu thiếu
  - Mở rộng ERP / SaaS không cần refactor

### 🔑 Nguyên tắc cốt lõi
- **Đơn bán hàng**: phản ánh giao dịch kinh doanh
- **Chứng từ công nợ (AR Document)**: phản ánh nghĩa vụ phải thu
- **Phiếu thu**: phản ánh tiền thực nhận

---

## II. CÁC ĐỐI TƯỢNG NGHIỆP VỤ CHÍNH

1. Đơn Bán Hàng (Sales Order)
2. Chứng Từ Công Nợ Khách Hàng – AR Document
3. Phiếu Thu (Receipt)

---

## III. QUY TRÌNH CHI TIẾT

### 1️⃣ ĐƠN BÁN HÀNG (SALES ORDER)

#### 1.1. Trạng thái
```
MOI
→ DA_GIAO_THUC_TE
→ DA_DOI_CHIEU
→ CHO_THU_TIEN
→ DA_THU_TIEN
```

#### 1.2. Mô tả nghiệp vụ

| Trạng thái | Người thao tác | Nội dung |
|---|---|---|
| MOI | Sale | Tạo đơn bán ban đầu |
| DA_GIAO_THUC_TE | Admin | Cập nhật số lượng giao thực tế |
| DA_DOI_CHIEU | Kế toán | Chốt SL + giá + xuất hóa đơn |
| CHO_THU_TIEN | System | Đã gắn vào AR Document |
| DA_THU_TIEN | System | Thu đủ tiền |

#### 1.3. Ràng buộc
- Không cho sửa SL / giá sau `DA_DOI_CHIEU`
- `CHO_THU_TIEN` chỉ set khi đơn đã nằm trong AR Document hợp lệ
- `DA_THU_TIEN` chỉ set bởi hệ thống khi Phiếu thu hoàn tất

---

### 2️⃣ CHỨNG TỪ CÔNG NỢ KH (AR DOCUMENT)

> Đây là **"MÃ CÔNG NỢ" CHUẨN ERP**, thay thế khái niệm thủ công

#### 2.1. Đặc điểm
- 1 AR Document = 1 Khách hàng
- Có thể chứa N Đơn bán hàng
- Là căn cứ duy nhất để thu tiền

#### 2.2. Trạng thái
```
MOI
→ CHO_THU_TIEN
→ DA_THU_TIEN

MOI
→ KHONG_DUYET
```

#### 2.3. Ý nghĩa trạng thái

| Trạng thái | Ý nghĩa |
|---|---|
| MOI | Kế toán tạo & gom các đơn đã đối chiếu |
| CHO_THU_TIEN | Đã duyệt, cho phép thu tiền |
| KHONG_DUYET | Không duyệt (có comment) |
| DA_THU_TIEN | Đã thu đủ tiền, khóa vĩnh viễn |

#### 2.4. Ràng buộc
- Không chỉnh sửa AR Document sau khi `CHO_THU_TIEN`
- AR Document chỉ chứa các đơn `DA_DOI_CHIEU`

---

### 3️⃣ PHIẾU THU (RECEIPT)

#### 3.1. Nguồn tạo
- Chỉ tạo từ:
```
AR Document = CHO_THU_TIEN
```

#### 3.2. Trạng thái
```
MOI → DA_THU_TIEN
```

#### 3.3. Quy định bắt buộc
- 1 Phiếu thu chỉ gắn với **01 AR Document**
- 1 AR Document có thể có **N Phiếu thu** (thu nhiều lần)
- Bắt buộc:
  - Chọn hình thức thu (Tiền mặt / Chuyển khoản)
  - Upload chứng từ (đặc biệt với chuyển khoản)

---

## IV. LOGIC TỰ ĐỘNG CẬP NHẬT (CASCADE)

Khi **Phiếu thu = DA_THU_TIEN**:

1. Giảm số dư của AR Document
2. Nếu số dư = 0:
   - AR Document → `DA_THU_TIEN`
3. Toàn bộ Đơn bán trong AR Document:
   - → `DA_THU_TIEN`

> ⚠️ Logic này **chỉ được xử lý ở Backend Service**, UI không được phép can thiệp trực tiếp

---

## V. BẢNG ĐỐI XỨNG MUA – BÁN (ĐỂ VẬN HÀNH & DEV NHỚ)

| MUA HÀNG | BÁN HÀNG |
|---|---|
| Đơn mua hàng | Đơn bán hàng |
| Công nợ NCC | Công nợ KH |
| Đề xuất thanh toán | AR Document |
| Phiếu chi | Phiếu thu |
| ĐÃ_THANH_TOÁN | ĐÃ_THU_TIEN |

---

## VI. KẾT LUẬN

✔ Quy trình này **match 100%** với logic MUA HÀNG đã xây dựng
✔ Dùng chung engine:
- Approval
- Debt tracking
- Voucher
✔ Phù hợp để:
- Triển khai ERP thực tế
- Mở rộng SaaS
- Đào tạo kế toán & dev

---

📌 **Khuyến nghị:** Gắn tài liệu này làm *Core Sales–AR–Receipt Workflow* trong hệ thống ERP.

