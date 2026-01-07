# DIAGRAM TỔNG THỂ ERP
## MUA HÀNG – BÁN HÀNG – CÔNG NỢ – THU / CHI TIỀN

> Diagram logic nghiệp vụ & luồng trạng thái (Business + Accounting Flow)

---

## I. TỔNG QUAN KIẾN TRÚC NGHIỆP VỤ

```text
                ┌──────────────┐
                │   ĐƠN MUA     │
                │ (PURCHASE)   │
                └──────┬───────┘
                       │
                       ▼
              ┌──────────────────┐
              │ ĐÃ_ĐỐI_CHIẾU NCC │
              └──────┬───────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ CÔNG NỢ NCC (AP) │◄───────────┐
              └──────┬───────────┘            │
                       │                        │
                       ▼                        │
              ┌──────────────────┐            │
              │ ĐỀ XUẤT THANH TOÁN│            │
              └──────┬───────────┘            │
                       │                        │
                       ▼                        │
              ┌──────────────────┐            │
              │   PHIẾU CHI      │────────────┘
              └──────────────────┘

-------------------------------------------------

                ┌──────────────┐
                │   ĐƠN BÁN    │
                │   (SALES)    │
                └──────┬───────┘
                       │
                       ▼
              ┌──────────────────┐
              │ ĐÃ_GIAO_THỰC_TẾ │
              └──────┬───────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ ĐÃ_ĐỐI_CHIẾU KH │
              └──────┬───────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ CÔNG NỢ KH (AR)  │◄───────────┐
              └──────┬───────────┘            │
                       │                        │
                       ▼                        │
              ┌──────────────────┐            │
              │    PHIẾU THU     │────────────┘
              └──────────────────┘
```

---

## II. DIAGRAM CHI TIẾT – NHÁNH BÁN HÀNG (SALES → AR → RECEIPT)

```text
[SALE ORDER]
   |
   | MOI
   ▼
[DA_GIAO_THUC_TE]
   |
   | (Admin xác nhận SL giao)
   ▼
[DA_DOI_CHIEU]
   |
   | (Kế toán chốt SL + giá + HĐ)
   ▼
[CHO_THU_TIEN]
   |
   | (System gắn vào AR Document)
   ▼
[DA_THU_TIEN]
```

---

## III. DIAGRAM – CHỨNG TỪ CÔNG NỢ KH (AR DOCUMENT)

```text
           ┌───────────────┐
           │  AR DOCUMENT  │
           └──────┬────────┘
                  │
        ┌─────────┴──────────┐
        │                    │
        ▼                    ▼
   [CHO_THU_TIEN]     [KHONG_DUYET]
        │
        ▼
   [DA_THU_TIEN]
```

> AR Document:
> - 1 KH
> - N Sales Order
> - Căn cứ DUY NHẤT để thu tiền

---

## IV. DIAGRAM – PHIẾU THU (RECEIPT)

```text
[AR DOCUMENT = CHO_THU_TIEN]
            │
            ▼
       [PHIẾU THU]
            │
            ▼
     [DA_THU_TIEN]
            │
            ▼
   (CASCADE UPDATE)
```

### Cascade logic:
```text
Phiếu thu = ĐÃ_THU_TIEN
 → Giảm số dư AR Document
 → Nếu AR balance = 0
    → AR = ĐÃ_THU_TIEN
    → Sales Orders = ĐÃ_THU_TIEN
```

---

## V. DIAGRAM ĐỐI XỨNG MUA – BÁN (MIRROR DESIGN)

```text
MUA HÀNG (AP)               BÁN HÀNG (AR)
──────────────             ──────────────
Đơn mua hàng                Đơn bán hàng
Đã đối chiếu NCC             Đã đối chiếu KH
Công nợ NCC (AP)             Công nợ KH (AR)
Đề xuất thanh toán           AR Document
Phiếu chi                    Phiếu thu
Đã thanh toán                Đã thu tiền
```

---

## VI. KẾT LUẬN KIẾN TRÚC

✔ Hai nhánh **MUA – BÁN** dùng chung triết lý
✔ Công nợ là trục kế toán trung tâm
✔ Thu / Chi chỉ là nghiệp vụ tiền tệ
✔ Status & Cascade xử lý **100% ở backend**

📌 Diagram này nên được dùng làm:
- Tài liệu kiến trúc ERP
- Chuẩn đào tạo dev & kế toán
- Căn cứ refactor / mở rộng hệ thống

