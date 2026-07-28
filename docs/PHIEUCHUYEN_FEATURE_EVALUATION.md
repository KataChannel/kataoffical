# 📋 ĐÁNH GIÁ TÍNH NĂNG MỚI - PHIẾU CHUYẾN

**Ngày tạo:** 2025-12-13  
**Cập nhật lần cuối:** 2025-12-13  
**File Excel tham khảo:** `VanDon_PhieuChuyen_2025-12-11_11_12_2025.xlsx`  
**Trạng thái:** ✅ ĐÁNH GIÁ HOÀN TẤT - Không thay đổi code

---

## 🔄 SUMMARY - KẾT QUẢ REVIEW SOURCE CODE

> **Ngày review:** 13/12/2025

### ✅ ĐÃ CÓ TRONG HỆ THỐNG:

| Tính năng | Vị trí | Ghi chú |
|-----------|--------|---------|
| **Field `nhanvienchiahang`** | `api/prisma/schema.prisma` (line 271) | ✅ Model Donhang đã có field `nhanvienchiahang String?` |
| **Field `shipper`** | `api/prisma/schema.prisma` (line 272) | ✅ Model Donhang đã có field `shipper String?` |
| **Field `phieuve`** | `api/prisma/schema.prisma` (line 267) | ✅ Model Donhang đã có |
| **Field `giodi`, `giove`, `kynhan`** | `api/prisma/schema.prisma` (line 268-270) | ✅ Đã có đầy đủ |
| **UI hiển thị NV chia hàng** | `listphieuchiahang.component.ts` | ✅ Cột `nhanvienchiahang` trong displayedColumns |
| **Import Excel NV chia hàng** | `listphieuchiahang.component.ts` (line 1057-1059) | ✅ Logic import từ cột `nhanvienchiahang` |
| **Export Excel Phiếu Chuyển** | `donhang-graphql.service.ts` | ✅ Export với Shipper, Phiếu Về |

### ⚠️ CHƯA CÓ / CẦN BỔ SUNG:

| Tính năng | Trạng thái | Đề xuất |
|-----------|------------|---------|
| **Export cột NV chia hàng** trong sheet Phiếu Chuyển | ❌ CHƯA CÓ | Thêm `'NV chia hàng': item.nhanvienchiahang` vào `exportVandonToExcel()` |
| **Import từ sheet Vận Đơn + Phiếu Chuyển** | ⚠️ MỘT PHẦN | `importPhieuChuyenFromExcel()` chưa xử lý `nhanvienchiahang` |
| **Field `slGiaoThucTe`** | ❌ CHƯA CÓ | Có thể dùng `loadpoint` hoặc tạo field mới |
| **Báo cáo hiệu suất NV** | ❌ CHƯA CÓ | Chỉ có `khoiluong-khachhang` thống kê theo KH |

### 📝 CHI TIẾT FINDINGS:

**1. Database Schema (`api/prisma/schema.prisma`):**
```prisma
model Donhang {
  // ...
  phieuve          String?           // Line 267
  giodi            String?           // Line 268
  giove            String?           // Line 269
  kynhan           String?           // Line 270
  nhanvienchiahang String?           // Line 271 ✅ ĐÃ CÓ
  shipper          String?           // Line 272 ✅ ĐÃ CÓ
  // ...
}
```

**2. Component Phiếu Chia Hàng (`listphieuchiahang.component.ts`):**
- ✅ displayedColumns có `'nhanvienchiahang'`
- ✅ Logic edit inline NV chia hàng (startEditNhanvien, confirmEditNhanvien)
- ✅ Import Excel hỗ trợ cập nhật `nhanvienchiahang`

**3. Export Excel (`donhang-graphql.service.ts`):**
- ❌ Sheet "Phiếu Chuyển" CHƯA export cột `NV chia hàng`
- ✅ Đã có export: Shipper, Phiếu Về, Giờ Đi, Giờ Về, Ký Nhận

**4. Thống kê hiện có:**
- `/frontend/src/app/admin/thongke/` chỉ có `khoiluong-khachhang`
- ❌ Chưa có thống kê hiệu suất theo nhân viên

---

## 📊 1. PHÂN TÍCH FILE EXCEL HIỆN TẠI

### 1.1 Cấu trúc file Excel

File Excel có **2 sheets**:

#### Sheet 1: "Vận Đơn" (2739 rows)
| Cột | Header | Mô tả |
|-----|--------|-------|
| A | STT | Số thứ tự |
| B | Mã Đơn Hàng | VD: TG-AA16999 |
| C | Khách Hàng | Tên khách hàng |
| D | Tên Sản Phẩm | Tên SP |
| E | Đơn Vị Tính | Kg, Trái, Hộp... |
| F | SL Đặt | Số lượng đặt |
| G | SL Giao | Số lượng giao |
| H | SL Nhận | Số lượng nhận |
| I | Ngày Giao | VD: 11/12/2025 |
| J | Trạng Thái | VD: Đã Giao |

#### Sheet 2: "Phiếu Chuyển" (167 rows)
| Cột | Header | Mô tả | Trạng thái |
|-----|--------|-------|------------|
| A | STT | Số thứ tự | ✅ Đã có |
| B | Mã Đơn Hàng | VD: TG-AA16992 | ✅ Đã có |
| C | Ngày Giao | VD: 07:00:00 11/12/2025 | ✅ Đã có |
| D | Tên Khách Hàng | Tên KH | ✅ Đã có |
| E | Số Lượng | Tổng SL | ✅ Đã có |
| F | Mã Chuyến | Mã tuyến giao | ✅ Đã có |
| G | Địa Chỉ | Địa chỉ giao | ✅ Đã có |
| H | Liên Hệ | Người liên hệ | ✅ Đã có |
| I | Số Điện Thoại | SĐT | ✅ Đã có |
| J | Giờ Nhận Hàng | VD: 9h30 | ✅ Đã có |
| K | Tổng Số Món | Số món hàng | ✅ Đã có |
| L | Số Lượng TT | Số lượng thực tế | ✅ Đã có |
| **M** | **Phiếu về** | Có/Không | ⚠️ TRỐNG |
| **N** | **Shipper** | Mã NV Shipper | ⚠️ TRỐNG |
| **O** | **NV chia hàng** | Mã NV chia hàng | ⚠️ TRỐNG (có giá trị "3") |
| P | Giờ Đi | Giờ xuất phát | ⚠️ TRỐNG |
| Q | Giờ Về | Giờ kết thúc | ⚠️ TRỐNG |
| R | Ký Nhận | Chữ ký | ⚠️ TRỐNG |

---

## 📝 2. YÊU CẦU TÍNH NĂNG MỚI

### 2.1 Yêu cầu từ file đính kèm

Dựa trên phân tích file Excel và context trước đó, yêu cầu bao gồm:

1. **Thêm 3 cột mới** trong sheet "Phiếu Chuyển":
   - **M - Phiếu về:** Trạng thái phiếu về (Có/Không hoặc "x")
   - **N - SL giao:** Số lượng thực giao (hiện tại file có tên "Shipper" nhưng trống)
   - **O - NV chia hàng & Shipper:** Mã nhân viên chia hàng + Shipper

2. **Flow Download Excel:**
   - 3 cột M, N, O ban đầu **TRỐNG** khi xuất
   - Người dùng nhận file về để điền thông tin

3. **Flow Upload Excel:**
   - Ghi nhận dữ liệu từ cột N, O với ngày từ cột C
   - Cột M ghi nhận trạng thái "x" hoặc tương tự

4. **Báo cáo thống kê:**
   - **Hiệu suất làm việc:** Thống kê theo nhân viên
   - **Phiếu giao hàng:** Thống kê phiếu chuyển

---

## 🔍 3. PHÂN TÍCH HỆ THỐNG HIỆN TẠI

### 3.1 Code Frontend hiện có

#### A. `vandon.component.ts` - Quản lý vận đơn
```
Vị trí: /frontend/src/app/admin/donhang/vandon/vandon.component.ts
```

**Chức năng hiện tại:**
- ✅ Load dữ liệu vận đơn theo ngày
- ✅ Export Excel với 2 sheets (Vận Đơn + Phiếu Chuyển)
- ✅ Import Excel để cập nhật phiếu chuyển
- ✅ Filter, sort dữ liệu

**Columns hiện tại (Sheet Vận Đơn):**
```typescript
displayedColumns: string[] = [
  'madonhang', 'khachhang', 'title', 'dvt',
  'sldat', 'slgiao', 'slnhan', 'ngaygiao', 'status'
];
```

#### B. `listphieuchuyen.component.ts` - Danh sách phiếu chuyển
```
Vị trí: /frontend/src/app/admin/phieuchuyen/listphieuchuyen/listphieuchuyen.component.ts
```

**Columns hiện tại:**
```typescript
displayedColumns: string[] = [
  'ngaygiao', 'name', 'tongsomon', 'soluong', 'soluongtt',
  'loadpoint', 'machuyen', 'status', 'diachi', 'sdt',
  'gionhanhang', 'shipper', 'phieuve', 'giodi', 'giove', 'kynhan'
];
```

**Nhận xét:** Đã có các cột `shipper`, `phieuve`, `giodi`, `giove`, `kynhan`

#### C. `donhang-graphql.service.ts` - Service xử lý
```
Vị trí: /frontend/src/app/admin/donhang/donhang-graphql.service.ts
```

**Chức năng:**
- ✅ `exportVandonToExcel()` - Xuất Excel 2 sheets
- ✅ `importPhieuChuyenFromExcel()` - Import và cập nhật

**Cấu trúc export Phiếu Chuyển hiện tại:**
```typescript
{
  'STT': index + 1,
  'Mã Đơn Hàng': item.madonhang,
  'Ngày Giao': item.ngaygiao,
  'Tên Khách Hàng': item.name,
  'Số Lượng': item.soluongtt,
  'Mã Chuyến': item.machuyen,
  'Địa Chỉ': item.diachi,
  'Liên Hệ': '',
  'Số Điện Thoại': item.sdt,
  'Giờ Nhận Hàng': item.gionhanhang,
  'Tổng Số Món': item.tongsomon,
  'Số Lượng TT': item.loadpoint,
  'Shipper': shipper,           // Cột N trong Excel
  'Phiếu Về': item.phieuve,     // Cột M trong Excel
  'Giờ Đi': item.giodi,
  'Giờ Về': item.giove,
  'Ký Nhận': item.kynhan
}
```

### 3.2 Code Backend/Database

#### A. Schema Prisma - Model Donhang
```
Vị trí: /api/prisma/schema.prisma
```

**Fields liên quan:**
```prisma
model Donhang {
  shipper    String?    // Shipper/NV giao hàng
  phieuve    String?    // Trạng thái phiếu về
  giodi      String?    // Giờ đi
  giove      String?    // Giờ về
  kynhan     String?    // Ký nhận
  // ... other fields
}

model Khachhang {
  machuyen   String?    // Mã chuyến/tuyến giao hàng
}
```

---

## 🔧 4. GAP ANALYSIS - NHỮNG GÌ CẦN BỔ SUNG (CẬP NHẬT)

### 4.1 Database Schema

| Yêu cầu | Trạng thái | Ghi chú |
|---------|------------|---------|
| Field `shipper` trong Donhang | ✅ **ĐÃ CÓ** | `shipper String?` (line 272) |
| Field `phieuve` trong Donhang | ✅ **ĐÃ CÓ** | `phieuve String?` (line 267) |
| Field `nhanvienchiahang` trong Donhang | ✅ **ĐÃ CÓ** | `nhanvienchiahang String?` (line 271) |
| Field `giodi`, `giove`, `kynhan` | ✅ **ĐÃ CÓ** | Lines 268-270 |
| Field `slGiaoThucTe` trong Donhang | ⚠️ **CHƯA CÓ** | Cần thêm hoặc dùng `loadpoint` |

### 4.2 Export Excel

| Cột | Trạng thái Export | Ghi chú |
|-----|-------------------|---------|
| M - Phiếu về | ✅ **ĐÃ CÓ** | `'Phiếu Về': item.phieuve` |
| N - Shipper | ✅ **ĐÃ CÓ** | `'Shipper': shipper` |
| O - NV chia hàng | ❌ **CHƯA CÓ** | Cần thêm `'NV chia hàng': item.nhanvienchiahang` |
| SL giao (thực tế) | ⚠️ **THIẾU** | Khác với 'Số Lượng TT' hiện tại |

### 4.3 Import Excel

| Chức năng | Trạng thái | Vị trí/Ghi chú |
|-----------|------------|----------------|
| Import Shipper | ✅ **ĐÃ CÓ** | `donhang-graphql.service.ts` - `row['Shipper']` |
| Import Phiếu về | ✅ **ĐÃ CÓ** | `row['Phiếu Về']` |
| Import Giờ đi/về | ✅ **ĐÃ CÓ** | `row['Giờ Đi']`, `row['Giờ Về']` |
| Import NV chia hàng (Phiếu Chia Hàng) | ✅ **ĐÃ CÓ** | `listphieuchiahang.component.ts` (line 1057-1059) |
| Import NV chia hàng (Phiếu Chuyển) | ❌ **CHƯA CÓ** | `importPhieuChuyenFromExcel()` chưa xử lý |
| Import SL giao thực tế | ❌ **CHƯA CÓ** | Cần thêm logic |
| Validate Mã NV | ✅ **MỘT PHẦN** | `listphieuchiahang.component.ts` có validate với listNhanvien |

### 4.4 Báo cáo thống kê

| Báo cáo | Trạng thái | Ghi chú |
|---------|------------|---------|
| Thống kê khối lượng theo KH | ✅ **ĐÃ CÓ** | `/thongke/khoiluong-khachhang` |
| Hiệu suất làm việc NV | ❌ **CHƯA CÓ** | Cần tạo component mới |
| Phiếu giao hàng | ✅ **MỘT PHẦN** | `listphieuchuyen` có thể mở rộng |

---

## 📋 5. ĐỀ XUẤT TRIỂN KHAI (CẬP NHẬT)

### 5.1 Phase 1: Database Schema - ✅ KHÔNG CẦN THAY ĐỔI

> **Kết quả review:** Field `nhanvienchiahang` đã có trong schema.

```prisma
model Donhang {
  // Đã có sẵn các fields cần thiết:
  phieuve          String?   // ✅ Đã có
  giodi            String?   // ✅ Đã có
  giove            String?   // ✅ Đã có
  kynhan           String?   // ✅ Đã có
  nhanvienchiahang String?   // ✅ ĐÃ CÓ (không phải nvChiaHang)
  shipper          String?   // ✅ Đã có
}
```

**Chỉ cần thêm nếu muốn lưu SL giao thực tế:**
```sql
ALTER TABLE "Donhang" ADD COLUMN IF NOT EXISTS "slGiaoThucTe" DECIMAL(10,2);
```

### 5.2 Phase 2: Cập nhật Export Excel - CẦN LÀM

**File:** `donhang-graphql.service.ts` - method `exportVandonToExcel()`

**Thay đổi:**
```typescript
const phieuchuyenExcelData = phieuchuyenData.map((item: any, index: number) => ({
  // ... existing fields
  'Số Lượng TT': item.loadpoint || 0,
  'Phiếu Về': item.phieuve || '',
  'Shipper': shipper,
  'NV chia hàng': item.nhanvienchiahang || '',  // 🆕 THÊM MỚI
  'Giờ Đi': item.giodi || '',
  'Giờ Về': item.giove || '',
  'Ký Nhận': item.kynhan || ''
}));
```

### 5.3 Phase 3: Cập nhật Import Excel - CẦN LÀM

**File:** `donhang-graphql.service.ts` - method `importPhieuChuyenFromExcel()`

**Thêm xử lý:**
```typescript
// Thêm dòng này vào logic update
if (row['NV chia hàng']) {
  updateData.nhanvienchiahang = row['NV chia hàng'].toString().trim();
}
```

> **Lưu ý:** Component `listphieuchiahang.component.ts` đã có logic import NV chia hàng riêng, nhưng `importPhieuChuyenFromExcel()` trong vandon chưa có.

### 5.4 Phase 4: Báo cáo thống kê hiệu suất - CẦN LÀM (Optional)

**Tạo component mới:**
```
/frontend/src/app/admin/thongke/hieusuat-nhanvien/
├── hieusuat-nhanvien.component.ts
├── hieusuat-nhanvien.component.html
└── hieusuat-nhanvien.component.scss
```

**Thống kê bao gồm:**
- Số đơn giao theo NV
- Số lượng hàng đã giao
- Tỷ lệ hoàn thành
- Thời gian giao hàng trung bình

---

## ⏰ 6. ƯỚC TÍNH THỜI GIAN (CẬP NHẬT)

| Phase | Task | Thời gian ước tính | Ghi chú |
|-------|------|-------------------|---------|
| ~~1~~ | ~~Database schema update~~ | ~~0 giờ~~ | ✅ Không cần - field đã có |
| 2 | Export Excel thêm cột NV chia hàng | 1-2 giờ | Thêm 1 cột vào export |
| 3 | Import Excel xử lý NV chia hàng | 1-2 giờ | Thêm logic import |
| 4 | Testing & Fix bugs | 1-2 giờ | Test export/import |
| 5 | Báo cáo thống kê (nếu cần) | 8-12 giờ | Component mới |

**Tổng thời gian Phase 2-4:** ~3-6 giờ (giảm từ 8-12 giờ)  
**Tổng thời gian bao gồm Phase 5:** ~11-18 giờ

---

## ⚠️ 7. RỦI RO VÀ LƯU Ý

### 7.1 Rủi ro
1. **Migration database:** Cần backup trước khi chạy migration
2. **Tương thích ngược:** File Excel cũ có thể không import được nếu thay đổi tên cột
3. **Performance:** Với 2739 rows vận đơn + 167 phiếu chuyển, cần optimize import

### 7.2 Lưu ý
1. **Tên cột Excel:** Hiện tại có sự không nhất quán giữa Excel file và code:
   - Excel: `Shipper` (cột N), `NV chia hàng` (cột O)
   - Code: `'Shipper'`, chưa có `'NV chia hàng'`

2. **Giá trị mặc định:** Cột O trong file có giá trị "3" - có thể là mã nhân viên mặc định

3. **Thứ tự cột:** Cần đảm bảo thứ tự cột trong Excel export khớp với yêu cầu:
   - M: Phiếu về
   - N: SL giao (hoặc Shipper?)
   - O: NV chia hàng

---

## 📌 8. KẾT LUẬN (CẬP NHẬT SAU REVIEW SOURCE)

### Yêu cầu có thể thực hiện được: ✅ CÓ - DỄ DÀNG HƠN DỰ KIẾN

**✅ Những gì ĐÃ CÓ SẴN trong source:**
| Chức năng | Trạng thái | Vị trí |
|-----------|------------|--------|
| Field `nhanvienchiahang` trong DB | ✅ ĐÃ CÓ | `schema.prisma` line 271 |
| Field `shipper` trong DB | ✅ ĐÃ CÓ | `schema.prisma` line 272 |
| Fields `phieuve`, `giodi`, `giove`, `kynhan` | ✅ ĐÃ CÓ | `schema.prisma` lines 267-270 |
| Export Excel 2 sheets (Vận Đơn + Phiếu Chuyển) | ✅ ĐÃ CÓ | `donhang-graphql.service.ts` |
| Import NV chia hàng (Phiếu Chia Hàng) | ✅ ĐÃ CÓ | `listphieuchiahang.component.ts` |
| Import Shipper, Phiếu về, Giờ đi/về | ✅ ĐÃ CÓ | `donhang-graphql.service.ts` |

**❌ Những gì CẦN LÀM (ít hơn dự kiến ban đầu):**
| Task | Mức độ | Ước tính |
|------|--------|----------|
| Thêm cột 'NV chia hàng' vào Export Excel | Nhỏ | 30 phút |
| Thêm logic import NV chia hàng cho Phiếu Chuyển | Nhỏ | 30 phút |
| Báo cáo hiệu suất NV (nếu cần) | Lớn | 8-12 giờ |

### Kết luận:
> **Ban đầu nghĩ cần thêm field `nvChiaHang` vào DB → Thực tế field `nhanvienchiahang` đã tồn tại!**

**Công việc thực tế chỉ cần:**
1. ✏️ **Export:** Thêm 1 dòng code `'NV chia hàng': item.nhanvienchiahang || ''`
2. ✏️ **Import:** Thêm logic xử lý `row['NV chia hàng']` trong `importPhieuChuyenFromExcel()`
3. 🆕 (Optional) Tạo báo cáo thống kê hiệu suất NV

### Khuyến nghị:
- ✅ Triển khai Task 1+2 trước (chỉ mất ~1-2 giờ)
- ✅ Test với file Excel mẫu
- ⏳ Đánh giá lại nhu cầu báo cáo hiệu suất sau

---

*Document cập nhật ngày: $(date). Đã review toàn bộ source code và điều chỉnh đánh giá cho chính xác.*

*KHÔNG có thay đổi code nào được thực hiện - chỉ đánh giá và cập nhật tài liệu.*
