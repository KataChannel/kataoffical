# PROMPT FINAL – TRIỂN KHAI MODULE MUA HÀNG & THANH TOÁN NCC (ERP)

## 🎯 Mục tiêu
Bạn là **Senior ERP Architect + Backend Lead + Accounting BA**. Hãy thiết kế và triển khai **Module Mua hàng & Thanh toán Nhà Cung Cấp (NCC)** theo chuẩn ERP, đảm bảo:
- Đúng nghiệp vụ kế toán VN
- Mở rộng SaaS / multi-tenant
- Truy vết, audit, in ấn chuẩn
- Không cho chỉnh sửa offline

---

## I. PHẠM VI MODULE

### 1. Mua hàng – Đơn mua hàng
- Tạo ĐƠN MUA HÀNG
- Trạng thái:
  - `ĐƠN_MỚI`
  - `ĐÃ_ĐỐI_CHIẾU`
  - `ĐÃ_THANH_TOÁN`
- Chỉ đơn `ĐÃ_ĐỐI_CHIẾU` mới được đưa vào công nợ & đề xuất thanh toán

### 2. Công nợ Nhà Cung Cấp
- Ghi nhận công nợ theo:
  - NCC
  - Mã đơn mua
  - Ngày phát sinh
  - Số tiền còn phải trả
- Công nợ cập nhật **tự động** khi phiếu chi hoàn tất

### 3. Đề xuất thanh toán (MULTI NCC)
- **1 Đề xuất có thể chứa NHIỀU NCC**
- Mỗi NCC trong đề xuất có **01 hoặc nhiều đơn mua hàng**
- Trạng thái đề xuất:
  - `MỚI`
  - `KHÔNG_DUYỆT`
  - `CHỜ_THANH_TOÁN`
  - `ĐÃ_THANH_TOÁN`

### 4. Phê duyệt
- Giám đốc DUYỆT / KHÔNG DUYỆT
- Nếu KHÔNG DUYỆT:
  - Cho phép nhập comment (optional)
  - Không được sửa dữ liệu đã chọn

### 5. Phiếu chi
- Chỉ tạo từ **Đề xuất đã DUYỆT**
- **1 NCC = 1 Phiếu chi**
- **1 Đề xuất = N Phiếu chi**
- Upload hình bill/chứng từ
- Khi phiếu chi `ĐÃ_THANH_TOÁN`:
  - Update ngược trạng thái đơn mua
  - Giảm công nợ NCC
  - Update tiến độ đề xuất

---

## II. WORKFLOW CHUẨN (STATE MACHINE)

### Đơn mua hàng
`ĐƠN_MỚI → ĐÃ_ĐỐI_CHIẾU → ĐÃ_THANH_TOÁN`

### Đề xuất thanh toán
`MỚI → (KHÔNG_DUYỆT | CHỜ_THANH_TOÁN) → ĐÃ_THANH_TOÁN`

### Phiếu chi
`MỚI → ĐÃ_THANH_TOÁN`

---

## III. RÀNG BUỘC NGHIỆP VỤ (BUSINESS RULES)

1. Không cho sửa đơn mua hàng khi đã `ĐÃ_ĐỐI_CHIẾU`
2. Không cho xoá đề xuất khi đã gửi duyệt
3. Phiếu chi chỉ thanh toán cho **01 NCC**
4. Đề xuất chỉ `ĐÃ_THANH_TOÁN` khi **100% NCC hoàn tất phiếu chi**
5. Tất cả file in (PDF) phải sinh từ server, có hash / version

---

## IV. DATABASE DESIGN (LOGIC)

```
PURCHASE_ORDERS
  └─ SUPPLIER_DEBTS
        └─ PAYMENT_PROPOSALS (MASTER)
              └─ PAYMENT_PROPOSAL_SUPPLIERS
                    └─ PAYMENT_VOUCHERS
                          └─ PAYMENT_VOUCHER_LINES
```

- Tất cả bảng có:
  - `tenant_id`
  - `status`
  - `created_by`, `approved_by`
  - `created_at`, `updated_at`

---

## V. UI / UX YÊU CẦU

- Filter đa điều kiện: ngày, NCC (multi), trạng thái
- Click đề xuất → xem chi tiết theo NCC
- Thanh toán từng NCC trong cùng đề xuất
- Timeline / audit log bên phải màn hình
- Dark mode, animation mượt

---

## VI. IN ẤN & LƯU TRỮ

- File ĐỀ XUẤT THANH TOÁN:
  - Render HTML → PDF
  - Lưu server
  - In trực tiếp
- Không cho upload file đề xuất từ ngoài vào

---

## VII. OUTPUT BẮT BUỘC

Hãy tạo:
1. Database schema chi tiết (SQL hoặc ORM)
2. API spec (REST)
3. State machine diagram
4. HTML/PDF template cho Đề xuất & Phiếu chi
5. Checklist test nghiệp vụ

---

## VIII. NGUYÊN TẮC
- Code sạch, có comment
- Ưu tiên mở rộng SaaS
- Không hardcode nghiệp vụ
- Chuẩn kế toán Việt Nam

---

🚀 **Bắt đầu triển khai ngay, không hỏi lại yêu cầu.**
