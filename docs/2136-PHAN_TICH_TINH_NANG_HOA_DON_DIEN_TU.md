# 📋 PHÂN TÍCH TÍNH KHẢ THI - HỆ THỐNG THU CHI & HÓA ĐƠN ĐIỆN TỬ

**Ngày phân tích:** 23/12/2025  
**Dự án:** RauSach Final  
**Tech Stack:** NestJS + Angular 18+ + PostgreSQL + Prisma + GraphQL

---

## 🏦 HỆ THỐNG THU CHI - TỔNG QUAN

### Hiện trạng Module Thu Chi

| Thành phần | Trạng thái | Ghi chú |
|------------|:----------:|---------|
| Phiếu thu/chi | ❌ **Chưa có** | Cần tạo module PhieuThuChi |
| BC dòng tiền | ❌ **Chưa có** | Thu - Chi - Tồn hàng ngày |
| Sổ quỹ tiền mặt | ❌ **Chưa có** | Theo dõi TM |
| Sổ TGNH | ❌ **Chưa có** | Theo dõi ngân hàng |
| Công nợ KH | ✅ **Có** | Module congnokhachhang |
| Công nợ NCC | ✅ **Có** | Module congnoncc |

### Kiến trúc tổng thể đề xuất

```
┌─────────────────────────────────────────────────────────────────────┐
│                    HỆ THỐNG THU CHI TỔNG HỢP                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐          │
│  │   DONHANG    │    │   DATHANG    │    │  PHIEUTHUCI  │          │
│  │  (Bán hàng)  │    │  (Mua hàng)  │    │  (Thu/Chi)   │          │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘          │
│         │                   │                   │                   │
│         ▼                   ▼                   ▼                   │
│  ┌─────────────────────────────────────────────────────────┐       │
│  │              THANH TOÁN (ThanhToan Model)               │       │
│  │   - Có hóa đơn / Không hóa đơn                          │       │
│  │   - Tiền mặt / Chuyển khoản / Thẻ                       │       │
│  └─────────────────────────────────────────────────────────┘       │
│                              │                                      │
│         ┌────────────────────┼────────────────────┐                │
│         ▼                    ▼                    ▼                │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐          │
│  │  CÔNG NỢ KH  │    │  CÔNG NỢ NCC │    │  HÓA ĐƠN ĐT  │          │
│  │  (Phải thu)  │    │  (Phải trả)  │    │   (MISA)     │          │
│  └──────────────┘    └──────────────┘    └──────────────┘          │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────┐       │
│  │           BÁO CÁO DÒNG TIỀN (Thu - Chi - Tồn)           │       │
│  └─────────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📊 TỔNG QUAN 6 TÍNH NĂNG ĐỀ XUẤT

| # | Tính năng | Mức độ khả thi | Độ phức tạp | Thời gian ước tính |
|---|-----------|:--------------:|:-----------:|:------------------:|
| 1 | Tích hợp xuất hóa đơn điện tử | ✅ CAO | 🟡 TB | 1-2 tuần |
| 2 | Công nợ tổng hợp → xuất HĐ | ✅ CAO | 🟢 Thấp | 3-5 ngày |
| 3 | Xác nhận KH 2 lần | ✅ CAO | 🟡 TB | 1 tuần |
| 4 | Gợi ý SP không xuất HĐ theo giá | ✅ CAO | 🟡 TB | 1 tuần |
| 5 | Thanh toán tách bạch HĐ/Không HĐ | ✅ CAO | 🟠 Cao | 2 tuần |
| 6 | Công nợ từ đặt hàng | ✅ CAO | 🟢 Thấp | 3-5 ngày |

---

## 1️⃣ TÍCH HỢP XUẤT HÓA ĐƠN ĐIỆN TỬ

### Hiện trạng hệ thống

| Thành phần | Có sẵn | Ghi chú |
|------------|:------:|---------|
| Callback Service MISA | ✅ | `api/src/callback/callback.service.ts` - Đã có app_id MISA |
| Đơn hàng có đủ thông tin | ✅ | Donhang, Donhangsanpham đầy đủ |
| Thông tin KH (MST, địa chỉ) | ✅ | Model Khachhang có `mst`, `diachi` |
| VAT tính toán | ✅ | Đơn hàng có `tongvat`, `isshowvat` |

### Đề xuất kiến trúc

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Đơn hàng      │ ──▶ │  HoaDonService  │ ──▶ │   MISA API      │
│   (dagiao/      │     │                 │     │   (E-Invoice)   │
│    hoanthanh)   │     │ - Tạo HĐ        │     │                 │
└─────────────────┘     │ - Ký số         │     └─────────────────┘
                        │ - Gửi CQT       │              │
                        └─────────────────┘              ▼
                                 ▲              ┌─────────────────┐
                                 └──────────────│   Callback      │
                                                │   (Cập nhật     │
                                                │   trạng thái)   │
                                                └─────────────────┘
```

### Schema bổ sung

```prisma
model HoaDonDienTu {
  id              String   @id @default(uuid())
  donhangId       String   @unique
  soHoaDon        String?  // Số HĐ từ MISA trả về
  mauSo           String?  // Mẫu số: 01GTKT0/001
  kyHieu          String?  // Ký hiệu: AA/24E
  ngayLap         DateTime
  ngayKy          DateTime?
  trangThai       TrangThaiHoaDon @default(CHUA_GUI)
  orgRefId        String   @unique // Mã tham chiếu gửi MISA
  errorMessage    String?
  maTraCuu        String?  // Mã tra cứu
  linkTraCuu      String?  // Link xem HĐ
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  donhang         Donhang  @relation(fields: [donhangId], references: [id])
  
  @@index([trangThai])
  @@index([ngayLap])
}

enum TrangThaiHoaDon {
  CHUA_GUI        // Chưa gửi lên MISA
  DA_GUI          // Đã gửi, chờ xử lý
  DA_KY           // Đã ký số
  GUI_THANH_CONG  // Đã gửi CQT thành công
  LOI             // Có lỗi
  HUY             // Đã hủy
}
```

### Các bước triển khai

1. **Tạo HoaDonService** - Gọi MISA API tạo hóa đơn
2. **Mở rộng CallbackService** - Xử lý callback cập nhật trạng thái HĐ
3. **UI xuất HĐ** - Button "Xuất HĐ" trên chi tiết đơn hàng
4. **Danh sách HĐ** - Module quản lý hóa đơn đã xuất

### Đánh giá: ✅ KHẢ THI CAO
- Đã có sẵn integration MISA cơ bản
- Dữ liệu đơn hàng đầy đủ cho HĐ
- Thời gian: **1-2 tuần**

---

## 2️⃣ CÔNG NỢ TỔNG HỢP → XUẤT HÓA ĐƠN

### Hiện trạng

| Thành phần | Có sẵn | Ghi chú |
|------------|:------:|---------|
| Module Công nợ KH | ✅ | `congnokhachhang` với filter đầy đủ |
| OptimizedCongnoService | ✅ | Tổng hợp đơn hàng theo KH + thời gian |
| Tổng tiền, VAT | ✅ | Có sẵn trong Donhang |

### Logic đề xuất

```typescript
// Workflow: Công nợ → Xuất HĐ tổng hợp
async function xuatHoaDonTuCongNo(params: {
  khachhangId: string;
  tuNgay: Date;
  denNgay: Date;
  danhSachDonhangIds: string[]; // Các đơn hàng được chọn gộp
}) {
  // 1. Lấy danh sách đơn hàng chưa xuất HĐ
  const donhangs = await getDonhangChuaXuatHD(params);
  
  // 2. Tính tổng tiền, VAT
  const tongTien = donhangs.reduce((sum, d) => sum + d.tongtien, 0);
  const tongVAT = donhangs.reduce((sum, d) => sum + d.tongvat, 0);
  
  // 3. Tạo HĐ tổng hợp với danh sách SP gộp
  const hoaDon = await createHoaDonTongHop({
    khachhangId,
    donhangIds: danhSachDonhangIds,
    tongTien,
    tongVAT,
    chiTietSanPham: gopSanPhamTuNhieuDon(donhangs)
  });
  
  // 4. Gửi lên MISA
  return await misaService.taoHoaDon(hoaDon);
}
```

### UI Flow

```
┌─────────────────────────────────────────────────────────────┐
│  CÔNG NỢ KHÁCH HÀNG                                         │
├─────────────────────────────────────────────────────────────┤
│  ☑ TG-AA00123  │  15/12  │  Công ty ABC  │  5,000,000      │
│  ☑ TG-AA00125  │  18/12  │  Công ty ABC  │  3,200,000      │
│  ☐ TG-AA00130  │  20/12  │  Công ty XYZ  │  2,100,000      │
├─────────────────────────────────────────────────────────────┤
│  Đã chọn: 2 đơn │ Tổng: 8,200,000 │ [📄 XUẤT HĐ GỘP]       │
└─────────────────────────────────────────────────────────────┘
```

### Đánh giá: ✅ KHẢ THI CAO
- Module công nợ đã hoàn thiện
- Chỉ cần thêm logic gộp đơn + xuất HĐ
- Thời gian: **3-5 ngày**

---

## 3️⃣ GỬI XÁC NHẬN CHO KHÁCH HÀNG (2 LẦN)

### Hiện trạng

| Thành phần | Có sẵn | Ghi chú |
|------------|:------:|---------|
| Zalo Integration | ✅ | `api/src/auth/strategies/zalo.strategy.ts` |
| Email trong Khachhang | ✅ | Field `email` trong model |
| SĐT khách hàng | ✅ | Field `sdt` trong model |

### Workflow xác nhận 2 lần

```
                    ┌───────────────────┐
                    │ Tạo đơn hàng mới  │
                    └─────────┬─────────┘
                              │
                              ▼
              ┌───────────────────────────────┐
              │  XÁC NHẬN LẦN 1 (Tự động)     │
              │  - Gửi Zalo/Email/SMS         │
              │  - Nội dung: Đơn hàng + Link  │
              └───────────────┬───────────────┘
                              │
                              ▼
              ┌───────────────────────────────┐
              │  KH click xác nhận            │
              │  Status: dadat → dangxuly     │
              └───────────────┬───────────────┘
                              │
                              ▼
              ┌───────────────────────────────┐
              │  XÁC NHẬN LẦN 2 (Trước giao)  │
              │  - Gửi thông báo ngày giao    │
              │  - KH confirm nhận hàng       │
              └───────────────┬───────────────┘
                              │
                              ▼
              ┌───────────────────────────────┐
              │  Status: dangxuly → dagiao    │
              └───────────────────────────────┘
```

### Schema bổ sung

```prisma
// Thêm vào model Donhang
model Donhang {
  // ... existing fields ...
  
  xacNhanLan1       Boolean   @default(false)
  xacNhanLan1At     DateTime?
  xacNhanLan2       Boolean   @default(false)
  xacNhanLan2At     DateTime?
  confirmToken      String?   @unique // Token để KH xác nhận qua link
  tokenExpiredAt    DateTime?
}

model ThongBaoKhachHang {
  id              String   @id @default(uuid())
  donhangId       String
  khachhangId     String
  loai            LoaiThongBao
  kenhGui         KenhThongBao
  noiDung         String
  trangThai       TrangThaiThongBao @default(PENDING)
  guiLuc          DateTime?
  docLuc          DateTime?
  errorMessage    String?
  createdAt       DateTime @default(now())
  
  @@index([donhangId])
  @@index([khachhangId])
}

enum LoaiThongBao {
  XAC_NHAN_DON    // Xác nhận đơn hàng (lần 1)
  TRUOC_GIAO      // Thông báo trước giao (lần 2)
  DA_GIAO         // Đã giao hàng
  HOA_DON         // Gửi hóa đơn
}

enum KenhThongBao {
  EMAIL
  ZALO
  SMS
}

enum TrangThaiThongBao {
  PENDING
  SENT
  DELIVERED
  READ
  FAILED
}
```

### Service cần phát triển

```typescript
@Injectable()
export class NotificationService {
  // Gửi qua nhiều kênh
  async sendConfirmation(donhangId: string, lan: 1 | 2) {
    const donhang = await this.getDonhangWithKhachhang(donhangId);
    const khachhang = donhang.khachhang;
    
    // Tạo link xác nhận với token
    const token = this.generateConfirmToken();
    const confirmLink = `${BASE_URL}/confirm/${token}`;
    
    // Gửi qua các kênh có sẵn
    const results = await Promise.allSettled([
      khachhang.email && this.sendEmail(khachhang.email, confirmLink),
      khachhang.sdt && this.sendZaloZNS(khachhang.sdt, confirmLink),
    ]);
    
    return results;
  }
  
  // Xử lý khi KH click xác nhận
  async handleConfirmation(token: string) {
    const donhang = await this.findByToken(token);
    if (!donhang.xacNhanLan1) {
      await this.updateXacNhanLan1(donhang.id);
    } else {
      await this.updateXacNhanLan2(donhang.id);
    }
  }
}
```

### Đánh giá: ✅ KHẢ THI CAO
- Đã có Zalo strategy cơ bản
- Cần bổ sung Zalo ZNS API / Email Service
- Thời gian: **1 tuần**

---

## 4️⃣ GỢI Ý SẢN PHẨM KHÔNG XUẤT HĐ (THEO GIÁ)

### Yêu cầu chi tiết
Khi khách hàng có sản phẩm **không cần xuất hóa đơn**, hệ thống sẽ gợi ý các sản phẩm thay thế dựa trên:
- Giá tương đương (trong khoảng % cho phép)
- Cùng loại sản phẩm
- Có sẵn trong kho

### Logic gợi ý

```typescript
interface GoiYSanPham {
  sanphamGoc: Sanpham;
  danhSachGoiY: {
    sanpham: Sanpham;
    giaChenhlech: number;      // % chênh lệch giá
    lyDoGoiY: string;          // Lý do gợi ý
    coTheXuatHD: boolean;      // Có thể xuất HĐ không
  }[];
}

async function goiYSanPhamThayThe(params: {
  sanphamId: string;
  giaHienTai: number;
  phanTramChenhLech: number;  // VD: 10 = ±10%
}): Promise<GoiYSanPham> {
  const giaMin = giaHienTai * (1 - phanTramChenhLech / 100);
  const giaMax = giaHienTai * (1 + phanTramChenhLech / 100);
  
  // Tìm SP có giá trong khoảng, có VAT > 0 (xuất được HĐ)
  const sanphamGoiY = await prisma.sanpham.findMany({
    where: {
      id: { not: sanphamId },
      giaban: { gte: giaMin, lte: giaMax },
      vat: { gt: 0 },  // Có VAT = xuất được HĐ
      isActive: true,
      TonKho: { slton: { gt: 0 } }  // Còn hàng
    },
    include: { TonKho: true }
  });
  
  return {
    sanphamGoc: await prisma.sanpham.findUnique({ where: { id: sanphamId } }),
    danhSachGoiY: sanphamGoiY.map(sp => ({
      sanpham: sp,
      giaChenhlech: ((sp.giaban - giaHienTai) / giaHienTai * 100),
      lyDoGoiY: 'Giá tương đương, có thể xuất hóa đơn',
      coTheXuatHD: true
    }))
  };
}
```

### UI Component

```
┌─────────────────────────────────────────────────────────────┐
│  ⚠️ SP "Rau muống" không xuất được hóa đơn                  │
│                                                             │
│  💡 GỢI Ý SẢN PHẨM THAY THẾ (giá ±10%):                    │
│  ┌─────────────────────────────────────────────────────────┐
│  │ ☐ Rau muống hữu cơ   │ 18,000đ │ +5.8% │ ✅ Có HĐ      │
│  │ ☐ Rau cần tây        │ 16,500đ │ -3.0% │ ✅ Có HĐ      │
│  │ ☐ Rau mùng tơi       │ 17,200đ │ +1.1% │ ✅ Có HĐ      │
│  └─────────────────────────────────────────────────────────┘
│  [Thêm vào đơn] [Bỏ qua]                                   │
└─────────────────────────────────────────────────────────────┘
```

### Schema bổ sung

```prisma
// Thêm vào Sanpham
model Sanpham {
  // ... existing ...
  coTheXuatHD    Boolean  @default(true)  // Sản phẩm có thể xuất HĐ không
  nhomSPId       String?  // Để gợi ý SP cùng nhóm
}

// Cấu hình gợi ý
model CauHinhGoiY {
  id                String   @id @default(uuid())
  phanTramChenhLech Float    @default(10)  // % chênh lệch giá cho phép
  soLuongGoiYMax    Int      @default(5)   // Số SP gợi ý tối đa
  isActive          Boolean  @default(true)
}
```

### Đánh giá: ✅ KHẢ THI CAO
- Đã có đầy đủ data sản phẩm + giá + tồn kho
- Logic gợi ý đơn giản dựa trên query
- Thời gian: **1 tuần**

---

## 5️⃣ THANH TOÁN TÁCH BẠCH HĐ / KHÔNG HĐ

### Yêu cầu chi tiết
Trong 1 đơn hàng có thể có:
- Sản phẩm **có xuất hóa đơn** (có VAT)
- Sản phẩm **không xuất hóa đơn** (không VAT)

Thanh toán cần **tách riêng** để:
- Công nợ có HĐ → Theo dõi riêng, xuất HĐ được
- Công nợ không HĐ → Theo dõi riêng, không xuất HĐ

### Schema đề xuất

```prisma
// Cập nhật Donhangsanpham
model Donhangsanpham {
  // ... existing ...
  xuatHoaDon    Boolean  @default(true)  // SP này có xuất HĐ không
  ghiChuHD      String?  // Ghi chú cho HĐ
}

// Model Thanh toán mới
model ThanhToan {
  id            String   @id @default(uuid())
  maThanhToan   String   @unique
  donhangId     String
  loai          LoaiThanhToan
  soTien        Decimal  @postgres.Decimal(20, 3)
  phuongThuc    PhuongThucThanhToan
  ngayThanhToan DateTime
  ghiChu        String?
  nguoiTaoId    String?
  trangThai     TrangThaiThanhToan @default(CHO_DUYET)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  donhang       Donhang  @relation(fields: [donhangId], references: [id])
  
  @@index([donhangId])
  @@index([loai])
  @@index([ngayThanhToan])
}

enum LoaiThanhToan {
  CO_HOA_DON      // Thanh toán phần có HĐ
  KHONG_HOA_DON   // Thanh toán phần không HĐ
  TONG_HOP        // Thanh toán chung (legacy)
}

enum PhuongThucThanhToan {
  TIEN_MAT
  CHUYEN_KHOAN
  THE
  KHAC
}

enum TrangThaiThanhToan {
  CHO_DUYET
  DA_DUYET
  HUY
}
```

### Logic tính toán

```typescript
interface ThongTinThanhToanDonHang {
  donhangId: string;
  
  // Phần có hóa đơn
  tongTienCoHD: number;
  vatCoHD: number;
  daThanhToanCoHD: number;
  conNoCoHD: number;
  
  // Phần không hóa đơn
  tongTienKhongHD: number;
  daThanhToanKhongHD: number;
  conNoKhongHD: number;
  
  // Tổng
  tongCong: number;
  tongDaThanhToan: number;
  tongConNo: number;
}

async function tinhThanhToanDonHang(donhangId: string): Promise<ThongTinThanhToanDonHang> {
  const donhang = await prisma.donhang.findUnique({
    where: { id: donhangId },
    include: {
      sanpham: { include: { sanpham: true } },
      ThanhToan: true
    }
  });
  
  // Tính tổng theo loại
  let tongCoHD = 0, vatCoHD = 0, tongKhongHD = 0;
  
  for (const sp of donhang.sanpham) {
    const thanhTien = Number(sp.slnhan) * Number(sp.giaban);
    if (sp.xuatHoaDon) {
      tongCoHD += thanhTien;
      vatCoHD += thanhTien * Number(sp.vat);
    } else {
      tongKhongHD += thanhTien;
    }
  }
  
  // Tính đã thanh toán theo loại
  const daThanhToanCoHD = donhang.ThanhToan
    .filter(tt => tt.loai === 'CO_HOA_DON' && tt.trangThai === 'DA_DUYET')
    .reduce((sum, tt) => sum + Number(tt.soTien), 0);
    
  const daThanhToanKhongHD = donhang.ThanhToan
    .filter(tt => tt.loai === 'KHONG_HOA_DON' && tt.trangThai === 'DA_DUYET')
    .reduce((sum, tt) => sum + Number(tt.soTien), 0);
  
  return {
    donhangId,
    tongTienCoHD: tongCoHD,
    vatCoHD,
    daThanhToanCoHD,
    conNoCoHD: tongCoHD + vatCoHD - daThanhToanCoHD,
    tongTienKhongHD: tongKhongHD,
    daThanhToanKhongHD,
    conNoKhongHD: tongKhongHD - daThanhToanKhongHD,
    tongCong: tongCoHD + vatCoHD + tongKhongHD,
    tongDaThanhToan: daThanhToanCoHD + daThanhToanKhongHD,
    tongConNo: (tongCoHD + vatCoHD - daThanhToanCoHD) + (tongKhongHD - daThanhToanKhongHD)
  };
}
```

### UI đề xuất thanh toán

```
┌─────────────────────────────────────────────────────────────┐
│  ĐỀ XUẤT THANH TOÁN - ĐƠN HÀNG TG-AA00123                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📄 PHẦN CÓ HÓA ĐƠN                                        │
│  ├── Tổng tiền hàng:      5,000,000đ                       │
│  ├── VAT (10%):             500,000đ                       │
│  ├── Đã thanh toán:       3,000,000đ                       │
│  └── CÒN NỢ:              2,500,000đ                       │
│       [💳 Thanh toán]                                       │
│                                                             │
│  ──────────────────────────────────────────────────────────│
│                                                             │
│  📝 PHẦN KHÔNG HÓA ĐƠN                                     │
│  ├── Tổng tiền hàng:      1,200,000đ                       │
│  ├── Đã thanh toán:               0đ                       │
│  └── CÒN NỢ:              1,200,000đ                       │
│       [💳 Thanh toán]                                       │
│                                                             │
│  ══════════════════════════════════════════════════════════│
│  TỔNG CÒN NỢ:             3,700,000đ                       │
│                     [💰 Thanh toán tất cả]                  │
└─────────────────────────────────────────────────────────────┘
```

### Đánh giá: ✅ KHẢ THI CAO (nhưng phức tạp)
- Cần schema ThanhToan mới
- Cần update logic tính công nợ
- UI cần thiết kế lại phức tạp
- Thời gian: **2 tuần**

---

## 6️⃣ CÔNG NỢ TOÀN BỘ TỪ ĐẶT HÀNG (DATHANG)

### Hiện trạng

| Thành phần | Có sẵn | Ghi chú |
|------------|:------:|---------|
| Model Dathang | ✅ | Đơn đặt hàng NCC |
| Model Dathangsanpham | ✅ | Chi tiết SP đặt |
| Model Nhacungcap | ✅ | Thông tin NCC |
| Module congnoncc | ✅ | Công nợ NCC hiện tại |

### Logic công nợ từ Dathang

```typescript
// Tương tự congnokhachhang nhưng cho NCC
async function getCongNoNCC(params: {
  nhacungcapId?: string;
  tuNgay: Date;
  denNgay: Date;
  status?: string[];
}): Promise<CongNoNCC[]> {
  const dathangs = await prisma.dathang.findMany({
    where: {
      nhacungcapId: params.nhacungcapId,
      ngaynhan: { gte: params.tuNgay, lte: params.denNgay },
      status: { in: params.status || ['danhan', 'hoanthanh'] }
    },
    include: {
      nhacungcap: true,
      sanpham: true,
      ThanhToanNCC: true  // Cần thêm model này
    }
  });
  
  return dathangs.map(dh => ({
    ...dh,
    tongTien: dh.sanpham.reduce((sum, sp) => 
      sum + Number(sp.slnhan) * Number(sp.gianhap), 0),
    daThanhToan: dh.ThanhToanNCC?.reduce((sum, tt) => 
      sum + Number(tt.soTien), 0) || 0,
    conNo: /* tongTien - daThanhToan */
  }));
}
```

### Schema bổ sung

```prisma
model ThanhToanNCC {
  id            String   @id @default(uuid())
  maThanhToan   String   @unique
  dathangId     String
  soTien        Decimal  @postgres.Decimal(20, 3)
  phuongThuc    PhuongThucThanhToan
  ngayThanhToan DateTime
  ghiChu        String?
  nguoiTaoId    String?
  trangThai     TrangThaiThanhToan @default(CHO_DUYET)
  createdAt     DateTime @default(now())
  
  dathang       Dathang  @relation(fields: [dathangId], references: [id])
  
  @@index([dathangId])
}
```

### Đánh giá: ✅ KHẢ THI CAO
- Đã có module congnoncc cơ bản
- Logic tương tự congnokhachhang
- Thời gian: **3-5 ngày**

---

## 📊 TỔNG HỢP & LỘ TRÌNH TRIỂN KHAI

### Thứ tự ưu tiên đề xuất

| Ưu tiên | Tính năng | Lý do | Thời gian |
|:-------:|-----------|-------|:---------:|
| 1 | Xuất HĐ điện tử | Nền tảng cho các tính năng khác | 1-2 tuần |
| 2 | Công nợ → Xuất HĐ | Extend từ tính năng 1 | 3-5 ngày |
| 3 | Công nợ từ Dathang | Độc lập, dễ làm | 3-5 ngày |
| 4 | Gợi ý SP thay thế | UX quan trọng | 1 tuần |
| 5 | Xác nhận KH 2 lần | Cần setup Zalo/Email | 1 tuần |
| 6 | Thanh toán tách bạch | Phức tạp nhất | 2 tuần |

### Timeline đề xuất

```
Tuần 1-2:  [====== Xuất HĐ điện tử ======]
Tuần 2:    [=== Công nợ → HĐ ===]
Tuần 2-3:  [=== Công nợ Dathang ===]
Tuần 3:    [==== Gợi ý SP ====]
Tuần 3-4:  [==== Xác nhận 2 lần ====]
Tuần 4-5:  [======== Thanh toán tách bạch ========]
```

### Tổng thời gian ước tính: **5-6 tuần**

---

## 🏦 MODULE THU CHI BỔ SUNG

### Schema PhieuThuChi (Nền tảng cho hệ thống thu chi)

```prisma
model PhieuThuChi {
  id              String              @id @default(uuid())
  maPhieu         String              @unique
  loai            LoaiPhieuThuChi     // THU / CHI
  ngay            DateTime
  soTien          Decimal             @postgres.Decimal(20, 3)
  
  // Liên kết nguồn
  donhangId       String?             // Thu từ đơn hàng
  dathangId       String?             // Chi cho đặt hàng NCC
  doiTuong        String?             // KH/NCC/Nội bộ/Khác
  doiTuongId      String?             // ID KH hoặc NCC
  
  // Nội dung
  noiDung         String?
  ghiChu          String?
  
  // Phân loại
  phuongThuc      PhuongThucThanhToan // TIEN_MAT / CHUYEN_KHOAN / THE
  coHoaDon        Boolean             @default(false)  // Có xuất HĐ không
  hoaDonDienTuId  String?             // Link đến HĐ nếu có
  
  // Workflow
  nguoiLapId      String?
  nguoiDuyetId    String?
  trangThai       TrangThaiPhieu      @default(NHAP)
  ngayDuyet       DateTime?
  
  // Metadata
  createdAt       DateTime            @default(now())
  updatedAt       DateTime            @updatedAt
  
  // Relations
  donhang         Donhang?            @relation(fields: [donhangId], references: [id])
  dathang         Dathang?            @relation(fields: [dathangId], references: [id])
  hoaDonDienTu    HoaDonDienTu?       @relation(fields: [hoaDonDienTuId], references: [id])
  
  @@index([loai])
  @@index([ngay])
  @@index([donhangId])
  @@index([dathangId])
  @@index([trangThai])
}

enum LoaiPhieuThuChi {
  THU       // Phiếu thu (tiền vào)
  CHI       // Phiếu chi (tiền ra)
}

enum TrangThaiPhieu {
  NHAP          // Nháp, chưa duyệt
  CHO_DUYET     // Chờ duyệt
  DA_DUYET      // Đã duyệt
  HUY           // Đã hủy
}

enum PhuongThucThanhToan {
  TIEN_MAT
  CHUYEN_KHOAN
  THE
  KHAC
}
```

### Flow Thu Chi tích hợp với Đơn hàng

```
                    ┌───────────────────────────────────────┐
                    │           ĐƠN HÀNG (Donhang)          │
                    │  - Tổng tiền có HĐ: 5,000,000đ        │
                    │  - Tổng tiền không HĐ: 1,200,000đ     │
                    └───────────────────┬───────────────────┘
                                        │
              ┌─────────────────────────┼─────────────────────────┐
              │                         │                         │
              ▼                         ▼                         ▼
    ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
    │  PHIẾU THU #1   │     │  PHIẾU THU #2   │     │  XUẤT HÓA ĐƠN   │
    │  (Có hóa đơn)   │     │ (Không hóa đơn) │     │  (Chỉ phần có   │
    │  3,000,000đ     │     │  1,200,000đ     │     │   hóa đơn)      │
    │  ✅ Đã duyệt    │     │  ✅ Đã duyệt    │     │  → MISA API     │
    └─────────────────┘     └─────────────────┘     └─────────────────┘
              │                         │                         │
              └─────────────────────────┼─────────────────────────┘
                                        ▼
                          ┌───────────────────────────┐
                          │     CÔNG NỢ KHÁCH HÀNG    │
                          │  Còn nợ có HĐ: 2,500,000đ │
                          │  Còn nợ không HĐ: 0đ      │
                          └───────────────────────────┘
```

### API Endpoints cần tạo

```typescript
// PhieuThuChi Controller
@Controller('phieu-thu-chi')
export class PhieuThuChiController {
  
  @Post()
  create(@Body() dto: CreatePhieuThuChiDto) {}
  
  @Get()
  findAll(@Query() params: SearchPhieuThuChiParams) {}
  
  @Get(':id')
  findOne(@Param('id') id: string) {}
  
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePhieuThuChiDto) {}
  
  @Post(':id/duyet')
  approve(@Param('id') id: string, @Body() dto: ApproveDto) {}
  
  @Post(':id/huy')
  cancel(@Param('id') id: string, @Body() dto: CancelDto) {}
  
  // Tạo phiếu thu từ đơn hàng
  @Post('tu-donhang/:donhangId')
  createFromDonhang(
    @Param('donhangId') donhangId: string,
    @Body() dto: { loai: 'CO_HOA_DON' | 'KHONG_HOA_DON'; soTien: number }
  ) {}
  
  // Báo cáo dòng tiền
  @Get('bao-cao/dong-tien')
  reportCashFlow(@Query() params: { tuNgay: Date; denNgay: Date }) {}
  
  // Sổ quỹ tiền mặt
  @Get('bao-cao/so-quy-tien-mat')
  reportCashBook(@Query() params: DateRangeParams) {}
  
  // Sổ tiền gửi ngân hàng
  @Get('bao-cao/so-tgnh')
  reportBankBook(@Query() params: DateRangeParams) {}
}
```

---

## 📋 CHECKLIST CHUẨN BỊ

### Trước khi bắt đầu

- [ ] Đăng ký tài khoản MISA API production
- [ ] Setup Email Service (SendGrid/AWS SES/Mailgun)
- [ ] Setup Zalo ZNS API (cho notification)
- [ ] Review và finalize schema với stakeholders
- [ ] Chuẩn bị test data

### Công nghệ cần bổ sung

| Công nghệ | Mục đích | Ghi chú |
|-----------|----------|---------|
| MISA E-Invoice API | Xuất HĐ điện tử | Đã có app_id |
| Nodemailer / SendGrid | Gửi email | Cần setup |
| Zalo ZNS | Gửi thông báo Zalo | Cần đăng ký |
| Bull Queue | Queue job gửi thông báo | Optional |

---

## ✅ KẾT LUẬN

**Tất cả 6 tính năng đều KHẢ THI** với hệ thống hiện tại vì:

1. ✅ **Dữ liệu nền tảng đầy đủ**: Donhang, Khachhang, Sanpham, Dathang
2. ✅ **Integration MISA có sẵn**: Callback service đã setup
3. ✅ **Module công nợ hoàn thiện**: Có thể extend dễ dàng
4. ✅ **Zalo strategy có sẵn**: Cần bổ sung ZNS API

**Rủi ro cần lưu ý:**
- 🟡 API MISA có thể cần thời gian đăng ký/approve
- 🟡 Zalo ZNS cần doanh nghiệp đăng ký OA
- 🟡 UI thanh toán tách bạch cần design kỹ

**Đề xuất:** Bắt đầu với **Tính năng 1 (Xuất HĐ điện tử)** vì là nền tảng cho các tính năng còn lại.

---

## 📊 BẢNG TỔNG HỢP CUỐI CÙNG

| # | Tính năng | Khả thi | Module liên quan | Ưu tiên |
|---|-----------|:-------:|------------------|:-------:|
| 0 | **Hệ thống Thu Chi** | ✅ | PhieuThuChi (mới) | 🔴 **P0** |
| 1 | Xuất HĐ điện tử | ✅ | HoaDonDienTu + MISA | 🔴 **P1** |
| 2 | Công nợ → Xuất HĐ | ✅ | CongnoKH + HoaDon | 🟠 P2 |
| 3 | Xác nhận KH 2 lần | ✅ | Notification + Zalo | 🟡 P3 |
| 4 | Gợi ý SP thay thế | ✅ | Sanpham + Banggia | 🟡 P3 |
| 5 | Thanh toán tách bạch | ✅ | ThanhToan + PhieuThuChi | 🟠 P2 |
| 6 | Công nợ từ Dathang | ✅ | CongnoNCC | 🟠 P2 |

### Lộ trình đề xuất (theo priority)

```
Phase 0 (Tuần 1):     [=== Module PhieuThuChi cơ bản ===]
Phase 1 (Tuần 1-2):   [======= Xuất HĐ điện tử MISA =======]
Phase 2 (Tuần 2-3):   [=== Công nợ → HĐ ===][=== Thanh toán tách bạch ===]
Phase 3 (Tuần 3-4):   [=== Công nợ Dathang ===]
Phase 4 (Tuần 4-5):   [=== Xác nhận 2 lần ===][=== Gợi ý SP ===]
```

**Tổng thời gian: 5-6 tuần**

