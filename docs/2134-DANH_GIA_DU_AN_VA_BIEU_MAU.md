# 📊 ĐÁNH GIÁ DỰ ÁN RAUSACH & KẾ HOẠCH ĐÁP ỨNG 100% YÊU CẦU

**Ngày:** 22/12/2025 | **Phiên bản:** rausachfinal

---

## 1. TỔNG QUAN

**Tech Stack:** NestJS + Angular 18+ + PostgreSQL + Prisma + GraphQL + JWT + MinIO

**Modules hiện có:** Sản phẩm, Bảng giá, Khách hàng, NCC, Đơn hàng, Đặt hàng, Kho, Phiếu kho, Chốt kho, Xuất nhập tồn, Công nợ KH/NCC, Nhân viên, Phòng ban, Dashboard, Thống kê, Audit log

---

## 2. TỔNG HỢP YÊU CẦU TỪ FILE XLSX

### 📁 Danh sách file đã review (10 files):

| File | Sheets | Trạng thái |
|------|--------|------------|
| BCTC.xlsx | B01-DN, BC KQKD, B03-DN Lưu chuyển tiền, Cân đối TK | ⚠️ Cần bổ sung |
| Chung tu ke toan.xlsx | Chứng từ kế toán | ⚠️ Cần bổ sung |
| CongNo KHACH HANG.xlsx | CN KH, TH bán hàng, TH CN phải thu | ✅ Có |
| Congno NCC.xlsx | CN NCC, TH mua hàng, TH CN phải trả | ✅ Có |
| DANH MUC TAI KHOAN.xlsx | Hệ thống tài khoản kế toán | ❌ Chưa có |
| Dong_tien.xlsx | Dòng tiền Thu-Chi-Tồn | ❌ Chưa có |
| MẪU PHIẾU.xlsx | Phiếu thu/chi, Phiếu XNK, Thu chi NH | ⚠️ Một phần |
| SỔ KẾ TOÁN.xlsx | Sổ chi tiết TK, Nhật ký chung, Quỹ TM, TGNH | ❌ Chưa có |
| SỔ KHO.xlsx | Sổ chi tiết vật tư, TH tồn kho | ✅ Có |
| SỔ THUẾ.xlsx | Bảng kê mua vào, bán ra | ⚠️ Một phần |

---

## 3. BẢNG ĐỐI CHIẾU CHI TIẾT

### A. Báo cáo Kết quả Kinh doanh (bieu_mau_can_co.md)

| Yêu cầu | Trạng thái | Giải pháp |
|---------|------------|-----------|
| I.1 Doanh thu thuần | ✅ | Dashboard `totalRevenue` |
| I.2 Giá vốn hàng bán | ⚠️ | Bổ sung BC tổng hợp từ Dathang |
| I.3 Lợi nhuận gộp | ⚠️ | Bổ sung chi tiết theo SP/KH |
| I.4 Chi phí hoạt động | ❌ | **Tạo module ChiPhi** |
| I.5 Lợi nhuận ròng | ❌ | Tính từ DT - Giá vốn - Chi phí |
| I.6 Phân chia cổ tức | ❌ | Module tài chính (ưu tiên thấp) |

### B. Các báo cáo định kỳ

| Yêu cầu | Trạng thái | Giải pháp |
|---------|------------|-----------|
| II.1 BC dòng tiền hàng ngày | ❌ | **Tạo module PhieuThuChi** |
| II.2 BC công nợ đã thu/trả tuần | ⚠️ | Thêm filter tuần vào module CN |
| II.3 BC công nợ phải thu/trả | ✅ | congnokhachhang, congnoncc |
| II.4 Công nợ quá hạn + cảnh báo | ⚠️ | Thêm logic cảnh báo |
| II.5 Dự báo dòng tiền | ❌ | Phase 2 |
| II.6 BC độ lệch DT vs CN | ⚠️ | Thêm BC so sánh |

### C. Báo cáo hệ thống

| Yêu cầu | Trạng thái | Giải pháp |
|---------|------------|-----------|
| III.1-4 DT SP/KH/Kênh/NV | ✅/⚠️ | Dashboard có, cần mở rộng |
| III.5 BC chi phí & lợi nhuận | ❌ | Sau khi có module ChiPhi |
| III.6 BC XNT & hao hụt | ✅ | xuatnhapton, chotkho |
| III.7 BC XNT gia công | ❌ | Phase 2 |
| III.8 Nhật ký công việc | ❌ | Phase 2 |
| III.9 KPI vận hành | ⚠️ | Thêm KPI bộ phận |
| III.10 BC thuế/BHXH | ⚠️ | **Tạo module SoThue** |

### D. Biểu mẫu từ file XLSX

| Biểu mẫu | Trạng thái | Giải pháp |
|----------|------------|-----------|
| Phiếu thu/chi | ❌ | **Module PhieuThuChi** |
| Phiếu XNK | ✅ | phieukho |
| Sổ chi tiết TK | ❌ | **Module SoKeToan** |
| Sổ nhật ký chung | ❌ | **Module SoKeToan** |
| Sổ quỹ tiền mặt | ❌ | **Module PhieuThuChi** |
| Sổ TGNH | ❌ | **Module PhieuThuChi** |
| Bảng kê thuế MV/BR | ⚠️ | **Module SoThue** |
| BC lưu chuyển tiền tệ | ❌ | Từ PhieuThuChi |
| Danh mục TK kế toán | ❌ | **Module TaiKhoan** |
| Chứng từ kế toán | ❌ | **Module ChungTu** |

---

## 4. KẾ HOẠCH PHÁT TRIỂN 100%

### Phase 1: Module Tài chính cơ bản (2-3 tuần)

**4.1 Module PhieuThuChi** (Ưu tiên cao)
```
Model: PhieuThuChi
- id, maPhieu, loai (thu/chi), ngay
- soTien, doiTuong, noiDung
- taiKhoanNo, taiKhoanCo
- phuongThuc (tienMat/nganHang/khac)
- nguoiLap, nguoiDuyet, trangThai

Features:
- CRUD phiếu thu/chi
- BC dòng tiền hàng ngày (Thu-Chi-Tồn)
- Sổ quỹ tiền mặt
- Sổ tiền gửi ngân hàng
```

**4.2 Module TaiKhoan** (Hệ thống TK kế toán)
```
Model: TaiKhoan
- id, maTK, tenTK, loai, capDo
- taiKhoanCha, isActive

Features:
- Danh mục hệ thống TK
- Cây TK phân cấp
```

**4.3 Module ChiPhi**
```
Model: ChiPhi
- id, loaiChiPhi, soTien, ngay
- phongbanId, ghiChu, phieuChiId

Features:
- Danh mục loại chi phí
- Ghi nhận chi phí theo loại
- BC chi phí theo thời gian/bộ phận
```

### Phase 2: Sổ sách kế toán (2 tuần)

**4.4 Module SoKeToan**
```
Features:
- Sổ nhật ký chung (từ PhieuThuChi)
- Sổ chi tiết các TK
- Bảng cân đối TK
```

**4.5 Module SoThue**
```
Model: HoaDon (mở rộng từ Donhang)
- soHoaDon, ngayHoaDon, mauSo, kyHieu
- tenNguoiMua, mst, diaChi

Features:
- Bảng kê hóa đơn mua vào
- Bảng kê hóa đơn bán ra
- Tổng hợp thuế GTGT
```

### Phase 3: Báo cáo nâng cao (1-2 tuần)

**4.6 Nâng cấp Dashboard**
- BC kết quả kinh doanh (DT - Giá vốn - CP = LN)
- BC lưu chuyển tiền tệ
- Cảnh báo công nợ quá hạn
- DT theo nhân viên chi tiết

**4.7 Module KPI**
```
Model: KPITarget
- phongbanId, chiTieu, giaTri, kyBaoCao

Features:
- Thiết lập KPI theo bộ phận
- Dashboard KPI
- So sánh Target vs Actual
```

### Phase 4: Tính năng bổ sung (Tương lai)

- Module gia công
- Dự báo dòng tiền
- Quản lý BHXH
- Nhật ký công việc
- Phân chia cổ tức

---

## 5. SCHEMA BỔ SUNG

```prisma
model TaiKhoan {
  id         String   @id @default(uuid())
  maTK       String   @unique
  tenTK      String
  loai       String   // Tài sản, Nguồn vốn, DT, CP...
  capDo      Int      @default(1)
  parentId   String?
  isActive   Boolean  @default(true)
}

model PhieuThuChi {
  id           String   @id @default(uuid())
  maPhieu      String   @unique
  loai         String   // thu/chi
  ngay         DateTime
  soTien       Decimal  @postgres.Decimal(20, 3)
  doiTuong     String?  // KH/NCC/Nội bộ
  doiTuongId   String?
  noiDung      String?
  taiKhoanNoId String?
  taiKhoanCoId String?
  phuongThuc   String   // tienMat/nganHang
  nguoiLapId   String?
  trangThai    String   @default("draft")
  createdAt    DateTime @default(now())
}

model ChiPhi {
  id          String   @id @default(uuid())
  loaiChiPhi  String
  soTien      Decimal  @postgres.Decimal(20, 3)
  ngay        DateTime
  phongbanId  String?
  ghiChu      String?
  phieuChiId  String?
  createdAt   DateTime @default(now())
}

model HoaDonThue {
  id          String    @id @default(uuid())
  loai        String    // muaVao/banRa
  soHoaDon    String
  ngayHoaDon  DateTime
  mauSo       String?
  kyHieu      String?
  tenDoiTac   String
  mst         String?
  giaTriChuaThue Decimal @postgres.Decimal(20, 3)
  thueGTGT    Decimal   @postgres.Decimal(20, 3)
  tongGiaTri  Decimal   @postgres.Decimal(20, 3)
  donhangId   String?
  dathangId   String?
}
```

---

## 6. TIẾN ĐỘ MỤC TIÊU

| Phase | Nội dung | Thời gian | Hoàn thành |
|-------|----------|-----------|------------|
| 1 | PhieuThuChi + TaiKhoan + ChiPhi | 2-3 tuần | → 70% |
| 2 | SoKeToan + SoThue | 2 tuần | → 85% |
| 3 | Dashboard + KPI nâng cao | 1-2 tuần | → 95% |
| 4 | Tính năng bổ sung | TBD | → 100% |

---

## 7. KẾT LUẬN

| Chỉ số | Hiện tại | Sau Phase 1-3 |
|--------|----------|---------------|
| Đáp ứng đầy đủ | 24% | 85% |
| Đáp ứng một phần | 43% | 10% |
| Chưa có | 33% | 5% |

**Ưu tiên ngay:** Module PhieuThuChi (giải quyết dòng tiền, sổ quỹ, phiếu thu chi)

---
*Cập nhật: 22/12/2025*
