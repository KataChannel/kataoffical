# 📋 KẾ HOẠCH TRIỂN KHAI - THU CHI & HÓA ĐƠN ĐIỆN TỬ

**Ngày lập:** 23/12/2025 | **Tổng thời gian:** 12 ngày làm việc (~2.5 tuần)

> **Ghi chú:** Không tích hợp MISA API, Zalo ZNS. Hóa đơn điện tử tự quản lý, xác nhận qua link trên server.

---

## ⚡ SO SÁNH TIMELINE: MANUAL vs AI AGENT

| Phase | Manual Dev | AI Agent | Lý do rút ngắn |
|-------|:----------:|:--------:|----------------|
| Schema + Migration | 2-3 ngày | **1 ngày** | Generate tự động |
| Backend CRUD | 1 tuần | **2-3 ngày** | Scaffold modules |
| Frontend modules | 1 tuần | **2-3 ngày** | Component generation |
| Xác nhận 2 chiều | 3-4 ngày | **2 ngày** | Không cần Zalo/SMS |
| Testing & Debug | 1 tuần | **3-4 ngày** | Ít integration hơn |
| **TỔNG** | **4-5 tuần** | **~12 ngày** | ~65% nhanh hơn |

---

## 📅 TIMELINE CHI TIẾT (12 NGÀY LÀM VIỆC)

| STT | Ngày | Task | Output | Status |
|:---:|:----:|------|--------|:------:|
| 1 | **1** | Viết schema.prisma đầy đủ | PhieuThuChi, ThanhToan, HoaDonDienTu, ThongBaoKH | ⬜ |
| 2 | **1** | Thêm fields vào Donhang, Donhangsanpham | xacNhan, confirmToken, xuatHoaDon | ⬜ |
| 3 | **1** | Prisma migrate + generate | Database updated | ⬜ |
| 4 | **1** | Review schema, fix conflicts | Schema verified | ⬜ |
| | | **📍 Deliverable Ngày 1:** | ✅ Database schema hoàn chỉnh | |
| 5 | **2** | phieuthuchi.module.ts, phieuthuchi.service.ts | CRUD service | ⬜ |
| 6 | **2** | phieuthuchi.controller.ts + DTOs | REST endpoints | ⬜ |
| 7 | **2** | phieuthuchi.resolver.ts | GraphQL mutations/queries | ⬜ |
| 8 | **2** | Sinh mã phiếu tự động, validation | Business logic | ⬜ |
| | | **📍 Deliverable Ngày 2:** | ✅ Module PhieuThuChi backend | |
| 9 | **3** | thanhtoan.module + service + controller | Module ThanhToan | ⬜ |
| 10 | **3** | Tích hợp với Donhang, tính công nợ | Business logic | ⬜ |
| 11 | **3** | hoadon.module + service (tự quản lý) | Module HoaDon nội bộ | ⬜ |
| 12 | **3** | Extend optimized-congno.service (tách bạch) | Công nợ có HĐ/không HĐ | ⬜ |
| | | **📍 Deliverable Ngày 3:** | ✅ 2 modules backend + công nợ nâng cấp | |
| 13 | **4** | confirmation.service.ts | Token generation, validation | ⬜ |
| 14 | **4** | confirmation.controller.ts (public) | `/confirm/:token` endpoint | ⬜ |
| 15 | **4** | WebSocket gateway cho realtime | Socket events | ⬜ |
| 16 | **4** | Email notification (optional, Nodemailer) | Email gửi link xác nhận | ⬜ |
| | | **📍 Deliverable Ngày 4:** | ✅ Hệ thống xác nhận 2 chiều | |
| 17 | **5** | list-phieuthuchi.component | Danh sách + filter | ⬜ |
| 18 | **5** | detail-phieuthuchi.component | Form tạo/sửa | ⬜ |
| 19 | **5** | phieuthuchi.service.ts + GraphQL | API integration | ⬜ |
| 20 | **5** | Routing, menu integration | Navigation | ⬜ |
| | | **📍 Deliverable Ngày 5:** | ✅ Module PhieuThuChi frontend | |
| 21 | **6** | list-thanhtoan.component | Danh sách thanh toán | ⬜ |
| 22 | **6** | thanhtoan-donhang.component | Thanh toán tách bạch UI | ⬜ |
| 23 | **6** | list-hoadon.component | Quản lý HĐ điện tử nội bộ | ⬜ |
| 24 | **6** | Button "Xuất HĐ" trong đơn hàng | Integration | ⬜ |
| | | **📍 Deliverable Ngày 6:** | ✅ 2 modules frontend | |
| 25 | **7** | confirm-order.component (standalone) | Trang public | ⬜ |
| 26 | **7** | UI hiển thị đơn hàng, SP, giá | Read-only view | ⬜ |
| 27 | **7** | Actions: Xác nhận/Từ chối/Ghi chú | Interactive buttons | ⬜ |
| 28 | **7** | Mobile responsive, UX polish | Mobile-friendly | ⬜ |
| | | **📍 Deliverable Ngày 7:** | ✅ Trang xác nhận `/confirm/:token` | |
| 29 | **8** | baocao-dongtien.service.ts | Thu/Chi/Tồn query | ⬜ |
| 30 | **8** | baocao-dongtien.component | UI báo cáo | ⬜ |
| 31 | **8** | Dashboard widget - đơn chờ xác nhận | Widget | ⬜ |
| 32 | **8** | Dashboard widget - công nợ | Widget | ⬜ |
| | | **📍 Deliverable Ngày 8:** | ✅ Báo cáo + Dashboard widgets | |
| 33 | **9** | Unit tests: services | Jest tests | ⬜ |
| 34 | **9** | Integration tests: APIs | Supertest | ⬜ |
| 35 | **10** | Test flows: Tạo phiếu → Duyệt → Báo cáo | E2E backend | ⬜ |
| 36 | **10** | Test flows: Đơn hàng → Xác nhận → Thanh toán | E2E backend | ⬜ |
| | | **📍 Deliverable Ngày 9-10:** | ✅ Test coverage > 70% | |
| 37 | **11** | Test UI components | Cypress/Playwright | ⬜ |
| 38 | **11** | UAT với user thực | Feedback | ⬜ |
| 39 | **11** | Bug fixes từ UAT | Hotfixes | ⬜ |
| | | **📍 Deliverable Ngày 11:** | ✅ UAT passed | |
| 40 | **12** | Fix remaining bugs | Clean code | ⬜ |
| 41 | **12** | Performance optimization | Optimized | ⬜ |
| 42 | **12** | Documentation update | README, API docs | ⬜ |
| 43 | **12** | Deploy to staging/production | Live | ⬜ |
| | | **📍 Deliverable Ngày 12:** | ✅ **PRODUCTION READY** | |

---

## 📊 TỔNG HỢP DELIVERABLES

| Ngày | Deliverable | Tổng tasks |
|:----:|-------------|:----------:|
| 1 | Database schema hoàn chỉnh | 4 |
| 2 | Module PhieuThuChi backend | 4 |
| 3 | Module ThanhToan + HoaDon backend | 4 |
| 4 | Hệ thống xác nhận 2 chiều | 4 |
| 5 | Module PhieuThuChi frontend | 4 |
| 6 | Module ThanhToan + HoaDon frontend | 4 |
| 7 | Trang xác nhận public | 4 |
| 8 | Báo cáo + Dashboard | 4 |
| 9-10 | Testing backend | 4 |
| 11 | Testing frontend + UAT | 3 |
| 12 | Production deploy | 4 |
| **TỔNG** | **43 tasks** | **12 ngày** |

---

## 📊 HIỆN TRẠNG

| Nhóm tính năng | % Hoàn thành | Còn thiếu |
|----------------|:------------:|-----------|
| Đơn hàng/Đặt hàng | 85% | Thanh toán, Xuất HĐ, Xác nhận 2 chiều |
| Thu chi/Dòng tiền | 10% | PhieuThuChi, Sổ quỹ, BC dòng tiền |
| Hóa đơn/Công nợ | 40% | HĐ điện tử, Tách bạch HĐ |

---

## 📁 SCHEMA CHÍNH

```prisma
// 1. Phiếu thu/chi
model PhieuThuChi {
  id, maPhieu, loai (THU/CHI), ngay, soTien
  donhangId?, dathangId?, doiTuong, doiTuongId
  phuongThuc (TIEN_MAT/CHUYEN_KHOAN/THE)
  coHoaDon, trangThai (NHAP/CHO_DUYET/DA_DUYET/HUY)
}

// 2. Thanh toán đơn hàng
model ThanhToan {
  id, maThanhToan, donhangId, soTien
  loai (CO_HOA_DON/KHONG_HOA_DON/TONG_HOP)
  phuongThuc, ngayThanhToan, trangThai
}

// 3. Hóa đơn điện tử (TỰ QUẢN LÝ - không MISA)
model HoaDonDienTu {
  id, donhangId, soHoaDon, mauSo, kyHieu
  ngayLap, tongTien, tongVAT
  trangThai (NHAP/DA_XUAT/HUY)
  pdfUrl?, nguoiTaoId, nguoiDuyetId
}

// 4. Xác nhận đơn hàng (thêm vào Donhang)
// confirmToken, tokenExpiredAt
// xacNhanLan1, xacNhanLan1At, xacNhanLan2, xacNhanLan2At
// ghiChuKH
```

---

## ✅ CHECKLIST TRIỂN KHAI

### Backend
- [ ] Migrate schema (PhieuThuChi, ThanhToan, HoaDonDienTu)
- [ ] Module phieuthuchi (CRUD + duyệt)
- [ ] Module thanhtoan (CRUD + tách bạch)
- [ ] Module hoadon (tự quản lý, xuất PDF)
- [ ] Module confirmation (xác nhận 2 chiều qua link)
- [ ] Service báo cáo dòng tiền
- [ ] WebSocket realtime cho xác nhận

### Frontend
- [ ] /admin/phieuthuchi
- [ ] /admin/thanhtoan
- [ ] /admin/hoadon
- [ ] /admin/baocao/dongtien
- [ ] Button "Xuất HĐ" trên đơn hàng
- [ ] Cập nhật congnokhachhang
- [ ] Trang /confirm/:token (public - xác nhận đơn)
- [ ] Widget đơn chờ xác nhận trên Dashboard

### Integration (Đơn giản hóa)
- [ ] Email service (Nodemailer - optional)
- [ ] WebSocket realtime cho xác nhận
- [ ] PDF generation cho hóa đơn

---

## 📈 MỤC TIÊU % HOÀN THÀNH

| Milestone | Đơn hàng | Thu chi | HĐ/Công nợ | **Tổng** |
|-----------|:--------:|:-------:|:----------:|:--------:|
| Hiện tại | 85% | 10% | 40% | **45%** |
| Ngày 4 | 90% | 70% | 60% | **73%** |
| Ngày 8 | 95% | 90% | 85% | **90%** |
| Ngày 12 | 100% | 100% | 100% | **100%** |

---

## ✨ ƯU ĐIỂM KHI LOẠI BỎ MISA & ZALO ZNS

| Aspect | Trước | Sau |
|--------|-------|-----|
| **Timeline** | 17 ngày | **12 ngày** (-30%) |
| **Phụ thuộc bên thứ 3** | MISA, Zalo OA | **Không có** |
| **Chi phí** | API fees | **Miễn phí** |
| **Kiểm soát** | Phụ thuộc API | **100% nội bộ** |
| **Bottleneck** | 5 ngày chờ approve | **0 ngày** |

---

## 🔄 XÁC NHẬN 2 CHIỀU QUA LINK

**Flow đơn giản:**
```
1. Tạo đơn hàng → Generate token
2. Copy link /confirm/:token → Gửi cho KH (qua bất kỳ kênh nào)
3. KH click link → Xem đơn → Xác nhận/Từ chối
4. WebSocket realtime → Admin thấy ngay trạng thái
```

**Không cần:**
- ❌ Zalo OA đăng ký
- ❌ Zalo ZNS API
- ❌ Chi phí SMS/Zalo

**Tùy chọn bổ sung:**
- ✅ Email notification (Nodemailer miễn phí)
- ✅ Copy link thủ công qua Zalo/Messenger/SMS

---

## 🎯 BẮT ĐẦU NGAY

```bash
# 1. Cập nhật schema
cd api && npx prisma migrate dev --name add_thuci_hoadon

# 2. Tạo module phieuthuchi
nest g module phieuthuchi
nest g controller phieuthuchi
nest g service phieuthuchi
```

**File tham khảo chi tiết:** [PHAN_TICH_TINH_NANG_HOA_DON_DIEN_TU.md](PHAN_TICH_TINH_NANG_HOA_DON_DIEN_TU.md)
