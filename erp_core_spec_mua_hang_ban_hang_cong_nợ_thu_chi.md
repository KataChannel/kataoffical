# ERP CORE SPEC
## Chuẩn nghiệp vụ & kiến trúc lõi cho hệ thống ERP

> Tài liệu gốc (Single Source of Truth) cho DEV – KẾ TOÁN – VẬN HÀNH

---

## I. MỤC TIÊU TÀI LIỆU

- Chuẩn hóa **toàn bộ nghiệp vụ cốt lõi ERP**
- Làm tài liệu:
  - Thiết kế hệ thống
  - Triển khai backend / frontend
  - Đào tạo kế toán & vận hành
- Đảm bảo:
  - Không hiểu sai nghiệp vụ
  - Không code lệch quy trình
  - Dễ audit – quyết toán – mở rộng SaaS

---

## II. TRIẾT LÝ THIẾT KẾ CHUNG

### 1. Tách bạch 3 lớp nghiệp vụ

| Lớp | Vai trò | Ví dụ |
|---|---|---|
| Kinh doanh | Phát sinh giao dịch | Đơn mua, Đơn bán |
| Kế toán | Ghi nhận công nợ | AP / AR Document |
| Tiền tệ | Dòng tiền thực | Phiếu thu / Phiếu chi |

> ❗ Không cho phép thao tác tiền trực tiếp trên Đơn

---

## III. CÁC THỰC THỂ CỐT LÕI

### 1️⃣ ĐƠN MUA HÀNG (PURCHASE ORDER)

**Trạng thái chuẩn:**
```
MOI
→ DA_DOI_CHIEU
→ CHO_THANH_TOAN
→ DA_THANH_TOAN
```

**Ý nghĩa:**
- `DA_DOI_CHIEU`: cập nhật SL nhận & giá thực tế
- Là nguồn phát sinh **Công nợ NCC (AP)**

---

### 2️⃣ CÔNG NỢ NHÀ CUNG CẤP – AP DOCUMENT

```
MOI
→ CHO_THANH_TOAN
→ DA_THANH_TOAN

MOI → KHONG_DUYET
```

- 1 NCC – N Đơn mua
- Là căn cứ duy nhất để **Chi tiền**

---

### 3️⃣ PHIẾU CHI (PAYMENT)

```
MOI → DA_THANH_TOAN
```

- Gắn với AP Document
- Bắt buộc upload chứng từ (chuyển khoản)

---

## IV. NHÁNH BÁN HÀNG (SALES – AR – RECEIPT)

### 4️⃣ ĐƠN BÁN HÀNG (SALES ORDER)

```
MOI
→ DA_GIAO_THUC_TE
→ DA_DOI_CHIEU
→ CHO_THU_TIEN
→ DA_THU_TIEN
```

- `DA_GIAO_THUC_TE`: Admin xác nhận giao hàng
- `DA_DOI_CHIEU`: Kế toán chốt SL + giá + hóa đơn

---

### 5️⃣ CÔNG NỢ KHÁCH HÀNG – AR DOCUMENT

```
MOI
→ CHO_THU_TIEN
→ DA_THU_TIEN

MOI → KHONG_DUYET
```

- 1 KH – N Đơn bán
- Thay thế khái niệm "Mã công nợ"
- Là căn cứ duy nhất để **Thu tiền**

---

### 6️⃣ PHIẾU THU (RECEIPT)

```
MOI → DA_THU_TIEN
```

- Gắn với AR Document
- Có thể thu nhiều lần
- Bắt buộc upload chứng từ

---

## V. CASCADE & AUTOMATION (BACKEND ONLY)

### Khi PHIẾU THU = ĐÃ_THU_TIEN

```
→ Giảm số dư AR Document
→ Nếu AR.balance = 0
   → AR = DA_THU_TIEN
   → Toàn bộ Sales Order = DA_THU_TIEN
```

### Khi PHIẾU CHI = ĐÃ_THANH_TOAN

```
→ Giảm số dư AP Document
→ Nếu AP.balance = 0
   → AP = DA_THANH_TOAN
   → Toàn bộ Purchase Order = DA_THANH_TOAN
```

> ⚠️ UI không được phép set trạng thái trực tiếp

---

## VI. DIAGRAM TƯ DUY (MIRROR DESIGN)

| MUA HÀNG (AP) | BÁN HÀNG (AR) |
|---|---|
| Đơn mua | Đơn bán |
| Đối chiếu NCC | Đối chiếu KH |
| Công nợ NCC | Công nợ KH |
| Đề xuất thanh toán | AR Document |
| Phiếu chi | Phiếu thu |

---

## VII. NGUYÊN TẮC TRIỂN KHAI

- Mọi module mới phải bám tài liệu này
- Không bypass công nợ
- Không cho sửa số liệu sau đối chiếu
- Log toàn bộ lịch sử trạng thái

---

## VIII. KẾT LUẬN

✔ Tài liệu này là **ERP CORE SPEC**
✔ Là nền tảng để:
- Viết schema DB
- Viết API
- Viết UI
- Audit & quyết toán

📌 Khuyến nghị: gắn file này làm **tài liệu lõi bắt buộc** cho toàn bộ team ERP

