# 📋 ĐỀ XUẤT CẢI TIẾN CÔNG THỨC "SL CẦN ĐẶT (GỢI Ý)"

> **Ngày tạo:** 25/12/2024  
> **Người tạo:** Dev Team  
> **Mục đích:** Trình bày các phương án cải tiến công thức tính "SL Cần Đặt (Gợi Ý)" để Ban lãnh đạo đưa ra quyết định

---

## 📌 MỤC LỤC

1. [Tổng quan vấn đề](#1-tổng-quan-vấn-đề)
2. [Phân tích công thức hiện tại](#2-phân-tích-công-thức-hiện-tại)
3. [Phương án 1: Dựa trên Tồn kho thực tế](#3-phương-án-1-dựa-trên-tồn-kho-thực-tế)
4. [Phương án 2: Tính cả đơn chờ nhập từ NCC](#4-phương-án-2-tính-cả-đơn-chờ-nhập-từ-ncc)
5. [Phương án 3: Tách biệt các cột thông tin](#5-phương-án-3-tách-biệt-các-cột-thông-tin)
6. [So sánh tổng hợp](#6-so-sánh-tổng-hợp)
7. [Khuyến nghị](#7-khuyến-nghị)

---

## 1. TỔNG QUAN VẤN ĐỀ

### 1.1. Bối cảnh

Màn hình "Nhu cầu đặt hàng" hiện có cột **"SL Cần Đặt (Gợi Ý)"** để hỗ trợ nhân viên mua hàng biết cần đặt bao nhiêu sản phẩm từ Nhà cung cấp (NCC).

### 1.2. Vấn đề phát hiện

Qua quá trình sử dụng, phát hiện một số vấn đề:

| STT | Vấn đề | Mô tả |
|-----|--------|-------|
| 1 | **Giá trị âm gây nhầm lẫn** | Ví dụ: -64.8 kg nghĩa là gì? Dư hay thiếu? |
| 2 | **Ý nghĩa không trực quan** | Nhân viên khó hiểu công thức đang tính gì |
| 3 | **Có thể thiếu chính xác** | Không tính đến tồn kho thực tế |

### 1.3. Ví dụ thực tế gây nhầm lẫn

**Sản phẩm: Tắc trái (Cô Tí Chanh)**

| Thời điểm | SL Cần Đặt (Gợi Ý) | Nhân viên hiểu | Thực tế |
|-----------|-------------------|----------------|---------|
| 2-3h sáng | -64.8 kg | ??? | Không cần đặt thêm |
| 9h sáng | -94.2 kg | ??? | Không cần đặt thêm |

❓ **Câu hỏi:** Số âm nghĩa là không cần đặt? Hay đặt dư? Dư bao nhiêu?

---

## 2. PHÂN TÍCH CÔNG THỨC HIỆN TẠI

### 2.1. Công thức

```
SL CẦN ĐẶT (GỢI Ý) = TỔNG SL KHÁCH ĐẶT + SL HAO HỤT - TỔNG KHO
```

### 2.2. Giải thích các thành phần

| Thành phần | Cách tính | Ý nghĩa |
|------------|-----------|---------|
| **TỔNG SL KHÁCH ĐẶT** | Tổng `sldat` của đơn hàng có `status = 'dadat'` | Số lượng khách đã đặt nhưng **chưa giao** |
| **SL HAO HỤT** | `TỔNG SL KHÁCH ĐẶT × Tỉ lệ hao hụt%` | Dự phòng hao hụt khi vận chuyển/xử lý |
| **TỔNG KHO** | Tổng số lượng đã đặt từ NCC theo các kho | Số lượng **đã đặt** từ NCC trong ngày |

### 2.3. DỮ LIỆU THỰC TẾ TỪ DATABASE (25/12/2025 - 09:07:39)

#### 📦 Sản phẩm: Tắc trái (Cô Tí Chanh)

**Thông tin sản phẩm:**
```
ID: 59b483e0-0ae7-43d1-83c3-fdf952ca6f59
Mã SP: I100216
Tên: Tắc trái / Trái tắc (quất) 55-60 trái/kg
ĐVT: Kg
Tỉ lệ hao hụt: 0%
```

**Dữ liệu TỒN KHO (bảng TonKho):**
```json
{
  "slton": "-96.3",      // Tồn kho ảo (có thể âm do công nợ)
  "slchogiao": "119.76", // Số lượng chờ giao
  "slchonhap": "6288.15", // Tổng số đã nhập lịch sử
  "sltontt": "0.2"       // TỒN KHO THỰC TẾ = 0.2 kg
}
```

---

### 2.4. CHI TIẾT ĐƠN ĐẶT HÀNG NCC (Ngày 25/12/2025)

**Có 2 đơn đặt hàng NCC cho Tắc trái:**

| STT | Mã đơn NCC | Kho | SL Đặt | SL Giao | SL Nhận | Status |
|-----|------------|-----|--------|---------|---------|--------|
| 1 | TGNCC-KJ00046 | **SG2** | 54 kg | 54 kg | 54 kg | dadat |
| 2 | (đơn khác) | **TG-LONG AN** | 40 kg | 40 kg | 40 kg | dadat |
| | **TỔNG** | | **94 kg** | | | |

➡️ **TỔNG KHO = 54 + 40 = 94 kg** (đây là số đã đặt từ NCC trong ngày)

---

### 2.5. CHI TIẾT ĐƠN HÀNG KHÁCH (Ngày 25/12/2025)

**Tổng cộng 41 đơn hàng khách có Tắc trái:**

| Chỉ số | Giá trị |
|--------|---------|
| Tổng SL đặt (sldat) | **98.5 kg** |
| Tổng SL giao (slgiao) | 90.2 kg |
| Số đơn hàng | 41 đơn |
| Status tất cả đơn | **dagiao** (đã giao hết) |

---

### 2.6. SO SÁNH HÌNH 1 VÀ HÌNH 2

#### 📊 HÌNH 2 (Xuất lúc 2-3h sáng VN - 25/12/2025)

| Cột | Giá trị | Giải thích từ DB |
|-----|---------|------------------|
| TỔNG SL KHÁCH ĐẶT | **29.4 kg** | Có 1 số đơn status = 'dadat' (chưa giao) |
| TỔNG SL BÁN | 69.1 kg | Các đơn đã giao (status ≠ 'dadat') |
| TỔNG KHO | 94.2 kg | Đã đặt NCC: SG2 (54) + TG-LA (40) = 94 kg |
| TỒN KHO | 0.2 kg | `sltontt` từ bảng TonKho |
| **SL CẦN ĐẶT** | **-64.8 kg** | = 29.4 + 0 - 94.2 |

**Tính toán:**
```
Khách đặt chưa giao: 29.4 kg
+ Hao hụt (0%):      0 kg
- Đã đặt NCC:        94.2 kg
= GỢI Ý:             -64.8 kg (ÂM = không cần đặt thêm)
```

---

#### 📊 HÌNH 1 (Xuất bây giờ - khoảng 9h sáng VN)

| Cột | Giá trị | Giải thích từ DB |
|-----|---------|------------------|
| TỔNG SL KHÁCH ĐẶT | **0 kg** | Tất cả 41 đơn đã giao (status = 'dagiao') |
| TỔNG SL BÁN | 98.5 kg | Tổng sldat của 41 đơn đã giao |
| TỔNG KHO | 94.2 kg | Không đổi (vẫn 2 đơn NCC) |
| TỒN KHO | 0.2 kg | Không đổi |
| **SL CẦN ĐẶT** | **-94.2 kg** | = 0 + 0 - 94.2 |

**Tính toán:**
```
Khách đặt chưa giao: 0 kg (đã giao hết)
+ Hao hụt (0%):      0 kg
- Đã đặt NCC:        94.2 kg
= GỢI Ý:             -94.2 kg (ÂM = không cần đặt thêm)
```

---

### 2.7. NGUYÊN NHÂN KHÁC BIỆT

| Thời điểm | Sự kiện | Ảnh hưởng |
|-----------|---------|-----------|
| 2-3h sáng | Có **29.4 kg** đơn còn ở status `dadat` | TỔNG SL KHÁCH ĐẶT = 29.4 |
| 2-3h → 9h sáng | Nhân viên **cập nhật status → dagiao** | Đơn 29.4 kg chuyển sang TỔNG SL BÁN |
| 9h sáng | Tất cả đơn đã giao | TỔNG SL KHÁCH ĐẶT = 0 |

**Kết luận:** Sự khác biệt là do **thay đổi status đơn hàng**, không phải bug hệ thống.

---

### 2.8. VẤN ĐỀ VỚI CÔNG THỨC HIỆN TẠI

| Vấn đề | Mô tả | Ví dụ |
|--------|-------|-------|
| **1. Không tính TỒN KHO thực tế** | Công thức dùng "TỔNG KHO" (đã đặt NCC) thay vì "TỒN KHO TT" (thực có) | TỒN KHO TT = 0.2 kg nhưng không dùng |
| **2. Số âm khó hiểu** | -64.8 hay -94.2 nghĩa là gì? | Dư hay thiếu? Bao nhiêu? |
| **3. Logic không nhất quán** | Nếu đã đặt NCC 94 kg nhưng chưa nhận, sao lại trừ? | Hàng chưa về kho vẫn tính là "có" |

### 2.9. CÂU HỎI NGHIỆP VỤ CẦN LÀM RÕ

1. **TỔNG KHO 94 kg** = Đã đặt NCC hay đã nhận từ NCC vào kho?
2. Nếu đã đặt nhưng **chưa nhận**, có nên tính vào nguồn cung không?
3. Tại sao không dùng **TỒN KHO THỰC TẾ** (0.2 kg) trong công thức?
4. Công thức nên phản ánh: "Cần đặt NCC bao nhiêu" hay "Còn thiếu bao nhiêu để giao"?

---

## 3. PHƯƠNG ÁN 1: DỰA TRÊN TỒN KHO THỰC TẾ

### 3.1. Công thức đề xuất

```
SL CẦN ĐẶT (GỢI Ý) = TỔNG SL KHÁCH ĐẶT + SL HAO HỤT - TỒN KHO THỰC TẾ
```

### 3.2. Giải thích

| Thành phần | Ý nghĩa | Thay đổi |
|------------|---------|----------|
| TỔNG SL KHÁCH ĐẶT | Nhu cầu cần đáp ứng | Giữ nguyên |
| SL HAO HỤT | Dự phòng hao hụt | Giữ nguyên |
| **TỒN KHO THỰC TẾ** | Số hàng **đang có sẵn** trong kho | ✅ THAY ĐỔI |

### 3.3. Ví dụ tính toán

#### 📦 Ví dụ 1: Tắc trái (dữ liệu thực tế)

**Dữ liệu:**
- TỔNG SL KHÁCH ĐẶT: 29.4 kg
- Tỉ lệ hao hụt: 0%
- TỒN KHO THỰC TẾ: 0.2 kg

**Tính toán:**
```
SL CẦN ĐẶT = 29.4 + (29.4 × 0%) - 0.2
           = 29.4 + 0 - 0.2
           = 29.2 kg ✅
```

**Kết quả:** Cần đặt thêm **29.2 kg** từ NCC để đáp ứng đơn hàng

---

#### 📦 Ví dụ 2: Cà chua beef

**Dữ liệu:**
- TỔNG SL KHÁCH ĐẶT: 50 kg
- Tỉ lệ hao hụt: 5%
- TỒN KHO THỰC TẾ: 10 kg

**Tính toán:**
```
SL CẦN ĐẶT = 50 + (50 × 5%) - 10
           = 50 + 2.5 - 10
           = 42.5 kg ✅
```

**Kết quả:** Cần đặt thêm **42.5 kg** từ NCC

---

#### 📦 Ví dụ 3: Xà lách (tồn kho nhiều)

**Dữ liệu:**
- TỔNG SL KHÁCH ĐẶT: 20 kg
- Tỉ lệ hao hụt: 3%
- TỒN KHO THỰC TẾ: 50 kg

**Tính toán:**
```
SL CẦN ĐẶT = 20 + (20 × 3%) - 50
           = 20 + 0.6 - 50
           = -29.4 kg ⚠️
```

**Kết quả:** Số âm = Không cần đặt thêm, **dư 29.4 kg**

### 3.4. Ưu điểm & Nhược điểm

| Ưu điểm | Nhược điểm |
|---------|------------|
| ✅ Đơn giản, dễ hiểu | ❌ Vẫn có giá trị âm |
| ✅ Phản ánh đúng tồn kho thực tế | ❌ Không tính đơn đã đặt NCC (đang chờ nhận) |
| ✅ Thay đổi code ít | ❌ Có thể đặt trùng lặp |

### 3.5. Độ phức tạp triển khai

| Hạng mục | Đánh giá |
|----------|----------|
| Thay đổi code | ⭐ Thấp (1 dòng) |
| Thời gian | ~ 30 phút |
| Rủi ro | Thấp |

---

## 4. PHƯƠNG ÁN 2: TÍNH CẢ ĐƠN CHỜ NHẬP TỪ NCC

### 4.1. Công thức đề xuất

```
SL CẦN ĐẶT (GỢI Ý) = TỔNG SL KHÁCH ĐẶT + SL HAO HỤT - TỒN KHO THỰC TẾ - SL CHỜ NHẬP
```

### 4.2. Giải thích

| Thành phần | Ý nghĩa |
|------------|---------|
| TỔNG SL KHÁCH ĐẶT | Nhu cầu cần đáp ứng (đơn chưa giao) |
| SL HAO HỤT | Dự phòng hao hụt |
| TỒN KHO THỰC TẾ | Số hàng đang có trong kho |
| **SL CHỜ NHẬP** | Số lượng đã đặt NCC nhưng **chưa nhận** (status đặt hàng = đã đặt, chưa nhận) |

### 4.3. Ví dụ tính toán

#### 📦 Ví dụ 1: Tắc trái

**Dữ liệu:**
- TỔNG SL KHÁCH ĐẶT: 29.4 kg
- Tỉ lệ hao hụt: 0%
- TỒN KHO THỰC TẾ: 0.2 kg
- SL CHỜ NHẬP (đã đặt NCC): 94.2 kg

**Tính toán:**
```
SL CẦN ĐẶT = 29.4 + 0 - 0.2 - 94.2
           = 29.4 - 94.4
           = -65 kg
```

**Kết quả:** Số âm = Không cần đặt thêm (đã đặt NCC đủ rồi)

---

#### 📦 Ví dụ 2: Cà chua beef

**Dữ liệu:**
- TỔNG SL KHÁCH ĐẶT: 100 kg
- Tỉ lệ hao hụt: 5%
- TỒN KHO THỰC TẾ: 10 kg
- SL CHỜ NHẬP: 30 kg

**Tính toán:**
```
SL CẦN ĐẶT = 100 + (100 × 5%) - 10 - 30
           = 100 + 5 - 10 - 30
           = 65 kg ✅
```

**Kết quả:** Cần đặt thêm **65 kg** từ NCC

---

#### 📦 Ví dụ 3: Rau muống

**Dữ liệu:**
- TỔNG SL KHÁCH ĐẶT: 80 kg
- Tỉ lệ hao hụt: 10%
- TỒN KHO THỰC TẾ: 5 kg
- SL CHỜ NHẬP: 100 kg

**Tính toán:**
```
SL CẦN ĐẶT = 80 + (80 × 10%) - 5 - 100
           = 80 + 8 - 5 - 100
           = -17 kg
```

**Kết quả:** Số âm = Không cần đặt thêm, đã đặt NCC đủ

---

#### 📦 Ví dụ 4: Khoai tây (cần gấp)

**Dữ liệu:**
- TỔNG SL KHÁCH ĐẶT: 200 kg
- Tỉ lệ hao hụt: 2%
- TỒN KHO THỰC TẾ: 0 kg
- SL CHỜ NHẬP: 50 kg

**Tính toán:**
```
SL CẦN ĐẶT = 200 + (200 × 2%) - 0 - 50
           = 200 + 4 - 0 - 50
           = 154 kg ✅
```

**Kết quả:** Cần đặt **GẤP** thêm **154 kg** từ NCC

### 4.4. Ưu điểm & Nhược điểm

| Ưu điểm | Nhược điểm |
|---------|------------|
| ✅ Chính xác nhất | ❌ Vẫn có giá trị âm |
| ✅ Tránh đặt trùng lặp | ❌ Cần xác định rõ status đơn đặt NCC |
| ✅ Tính đầy đủ các nguồn hàng | ❌ Phức tạp hơn phương án 1 |

### 4.5. Độ phức tạp triển khai

| Hạng mục | Đánh giá |
|----------|----------|
| Thay đổi code | ⭐⭐ Trung bình |
| Thời gian | ~ 2-3 giờ |
| Rủi ro | Trung bình |

---

## 5. PHƯƠNG ÁN 3: TÁCH BIỆT CÁC CỘT THÔNG TIN

### 5.1. Đề xuất thay đổi giao diện

Thay vì 1 cột "SL Cần Đặt (Gợi Ý)", tách thành **3 cột rõ ràng**:

| Cột mới | Công thức | Ý nghĩa |
|---------|-----------|---------|
| **NHU CẦU** | `Khách đặt + Hao hụt` | Tổng số cần để đáp ứng đơn |
| **SẴN CÓ** | `Tồn kho + Chờ nhập` | Tổng số đã có + sắp có |
| **CẦN ĐẶT THÊM** | `MAX(0, Nhu cầu - Sẵn có)` | Số cần đặt (**không âm**) |

### 5.2. Mockup giao diện mới

```
┌─────────────┬─────────┬─────────┬─────────┬──────────┬─────────┬──────────────┐
│ Sản phẩm    │ Khách   │ Hao hụt │ NHU CẦU │ TỒN KHO  │ CHỜ     │ CẦN ĐẶT     │
│             │ đặt     │         │ (mới)   │ thực tế  │ NHẬP    │ THÊM (mới)  │
├─────────────┼─────────┼─────────┼─────────┼──────────┼─────────┼──────────────┤
│ Tắc trái    │ 29.4    │ 0       │ 29.4    │ 0.2      │ 94.2    │ 0 ✅        │
│ Cà chua     │ 100     │ 5       │ 105     │ 10       │ 30      │ 65 ⚠️       │
│ Rau muống   │ 80      │ 8       │ 88      │ 5        │ 100     │ 0 ✅        │
│ Khoai tây   │ 200     │ 4       │ 204     │ 0        │ 50      │ 154 🔴      │
└─────────────┴─────────┴─────────┴─────────┴──────────┴─────────┴──────────────┘
```

### 5.3. Ví dụ tính toán chi tiết

#### 📦 Ví dụ 1: Tắc trái

| Bước | Tính toán | Kết quả |
|------|-----------|---------|
| 1. NHU CẦU | 29.4 + 0 | **29.4 kg** |
| 2. SẴN CÓ | 0.2 + 94.2 | **94.4 kg** |
| 3. CẦN ĐẶT THÊM | MAX(0, 29.4 - 94.4) = MAX(0, -65) | **0 kg** ✅ |

**Hiển thị:** Cần đặt thêm = **0 kg** (Không cần đặt)

---

#### 📦 Ví dụ 2: Cà chua beef

| Bước | Tính toán | Kết quả |
|------|-----------|---------|
| 1. NHU CẦU | 100 + 5 | **105 kg** |
| 2. SẴN CÓ | 10 + 30 | **40 kg** |
| 3. CẦN ĐẶT THÊM | MAX(0, 105 - 40) | **65 kg** ⚠️ |

**Hiển thị:** Cần đặt thêm = **65 kg**

---

#### 📦 Ví dụ 3: Rau muống

| Bước | Tính toán | Kết quả |
|------|-----------|---------|
| 1. NHU CẦU | 80 + 8 | **88 kg** |
| 2. SẴN CÓ | 5 + 100 | **105 kg** |
| 3. CẦN ĐẶT THÊM | MAX(0, 88 - 105) = MAX(0, -17) | **0 kg** ✅ |

**Hiển thị:** Cần đặt thêm = **0 kg** (Không cần đặt)

---

#### 📦 Ví dụ 4: Khoai tây (cần gấp)

| Bước | Tính toán | Kết quả |
|------|-----------|---------|
| 1. NHU CẦU | 200 + 4 | **204 kg** |
| 2. SẴN CÓ | 0 + 50 | **50 kg** |
| 3. CẦN ĐẶT THÊM | MAX(0, 204 - 50) | **154 kg** 🔴 |

**Hiển thị:** Cần đặt thêm = **154 kg** (CẦN ĐẶT GẤP!)

### 5.4. Tính năng bổ sung đề xuất

#### 🎨 Màu sắc cảnh báo

| Giá trị CẦN ĐẶT | Màu | Ý nghĩa |
|-----------------|-----|---------|
| 0 | 🟢 Xanh lá | Đủ hàng |
| 1 - 50 | 🟡 Vàng | Cần đặt |
| > 50 | 🔴 Đỏ | Cần đặt gấp |

#### 📊 Cột phụ (tùy chọn)

| Cột | Công thức | Hiển thị |
|-----|-----------|----------|
| **% Đáp ứng** | `(Sẵn có / Nhu cầu) × 100%` | Tỉ lệ % đáp ứng nhu cầu |
| **SL DƯ** | `MAX(0, Sẵn có - Nhu cầu)` | Số lượng dư thừa |

### 5.5. Ưu điểm & Nhược điểm

| Ưu điểm | Nhược điểm |
|---------|------------|
| ✅ Rõ ràng, dễ hiểu nhất | ❌ Thay đổi nhiều code |
| ✅ **KHÔNG có giá trị âm** | ❌ Thêm nhiều cột |
| ✅ Nhân viên dễ ra quyết định | ❌ Cần test kỹ |
| ✅ Có thể thêm màu sắc cảnh báo | ❌ Thời gian triển khai lâu hơn |
| ✅ Minh bạch từng bước tính | |

### 5.6. Độ phức tạp triển khai

| Hạng mục | Đánh giá |
|----------|----------|
| Thay đổi code | ⭐⭐⭐ Cao |
| Thời gian | ~ 1-2 ngày |
| Rủi ro | Trung bình (cần test kỹ UI) |

---

## 6. SO SÁNH TỔNG HỢP

### 6.1. Bảng so sánh chi tiết

| Tiêu chí | Hiện tại | Phương án 1 | Phương án 2 | Phương án 3 |
|----------|----------|-------------|-------------|-------------|
| **Công thức** | Khách đặt + Hao hụt - Tổng kho | Khách đặt + Hao hụt - Tồn kho TT | Khách đặt + Hao hụt - Tồn kho - Chờ nhập | Tách 3 cột riêng |
| **Dễ hiểu** | ❌ Khó | ✅ Dễ | ✅ Dễ | ✅ Rất dễ |
| **Giá trị âm** | ❌ Có | ❌ Có thể có | ❌ Có thể có | ✅ **Không** |
| **Tính chính xác** | ⚠️ Không rõ | ✅ Tốt | ✅ Rất tốt | ✅ Rất tốt |
| **Tránh đặt trùng** | ⚠️ Không | ❌ Không | ✅ Có | ✅ Có |
| **Thay đổi code** | - | ⭐ Ít | ⭐⭐ Vừa | ⭐⭐⭐ Nhiều |
| **Thời gian** | - | 30 phút | 2-3 giờ | 1-2 ngày |
| **Rủi ro** | - | Thấp | Trung bình | Trung bình |

### 6.2. Ví dụ kết quả với cùng dữ liệu

**Sản phẩm: Tắc trái**
- Khách đặt: 29.4 kg
- Hao hụt: 0%
- Tồn kho TT: 0.2 kg
- Tổng kho (đã đặt NCC): 94.2 kg

| Phương án | Kết quả | Ý nghĩa hiển thị |
|-----------|---------|------------------|
| **Hiện tại** | -64.8 kg | ❓ Khó hiểu |
| **Phương án 1** | 29.2 kg | Cần đặt 29.2 kg |
| **Phương án 2** | -65 kg | Không cần đặt (đã đặt NCC đủ) |
| **Phương án 3** | 0 kg | ✅ Không cần đặt thêm |

---

## 7. KHUYẾN NGHỊ

### 7.1. Tùy theo mức độ ưu tiên

| Nếu ưu tiên | Chọn phương án | Lý do |
|-------------|----------------|-------|
| **Sửa nhanh** | Phương án 1 | Thay đổi ít, triển khai nhanh |
| **Chính xác** | Phương án 2 | Tính đầy đủ các nguồn hàng |
| **Dễ dùng nhất** | Phương án 3 | UX tốt nhất, không giá trị âm |

### 7.2. Khuyến nghị của Dev Team

> 🏆 **KHUYẾN NGHỊ: Phương án 3**

**Lý do:**
1. ✅ Không có giá trị âm - Nhân viên không bị nhầm lẫn
2. ✅ Minh bạch - Hiển thị rõ từng thành phần
3. ✅ Dễ ra quyết định - Nhìn cột "CẦN ĐẶT THÊM" là biết ngay
4. ✅ Có thể thêm màu sắc cảnh báo sau này

**Nếu không chọn Phương án 3:**
- Chọn Phương án 2 nếu muốn giữ giao diện cũ nhưng chính xác hơn
- Chọn Phương án 1 nếu cần sửa gấp trong ngày

---

## 📝 GHI CHÚ

### Câu hỏi cần xác nhận từ nghiệp vụ:

1. **"TỔNG KHO" hiện tại** là số đã đặt NCC hay số đã nhận từ NCC?
2. Có cần phân biệt trạng thái đơn đặt NCC (đã đặt, đang giao, đã nhận)?
3. Có cần hiển thị thông tin "SL Dư" không?

---

**Kính trình Ban lãnh đạo xem xét và cho ý kiến.**

*Dev Team - 25/12/2024*
