# 📋 KẾ HOẠCH TRIỂN KHAI - THU CHI & HÓA ĐƠN ĐIỆN TỬ

**Ngày lập:** 23/12/2025 | **Tổng thời gian:** 12 ngày làm việc (~2.5 tuần)

---

## 📊 1. TỔNG HỢP DELIVERABLES

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

## 📊 2. HIỆN TRẠNG

| Nhóm tính năng | % Hoàn thành | Còn thiếu |
|----------------|:------------:|-----------|
| Đơn hàng/Đặt hàng | 85% | Thanh toán, Xuất HĐ, Xác nhận 2 chiều |
| Thu chi/Dòng tiền | 10% | PhieuThuChi, Sổ quỹ, BC dòng tiền |
| Hóa đơn/Công nợ | 40% | HĐ điện tử, Tách bạch HĐ |

---

## 📈 3. MỤC TIÊU % HOÀN THÀNH

| Milestone | Đơn hàng | Thu chi | HĐ/Công nợ | **Tổng** |
|-----------|:--------:|:-------:|:----------:|:--------:|
| Hiện tại | 85% | 10% | 40% | **45%** |
| Ngày 4 | 90% | 70% | 60% | **73%** |
| Ngày 8 | 95% | 90% | 85% | **90%** |
| Ngày 12 | 100% | 100% | 100% | **100%** |

---

## 📅 4. TIMELINE CHI TIẾT (12 NGÀY LÀM VIỆC)

| STT | Ngày | Task | Output | Status |
|:---:|:----:|------|--------|:------:|
| 1 | **1** | Viết schema.prisma đầy đủ | PhieuThuChi, ThanhToan, HoaDonDienTu, ThongBaoKH | ⬜ |
| 2 | **1** | Thêm fields vào Donhang, Donhangsanpham | xacNhan, confirmToken, xuatHoaDon | ⬜ |
| 3 | **1** | Prisma migrate + generate | Database updated | ⬜ |
| 4 | **1** | Review schema, fix conflicts | Schema verified | ⬜ |
| | | **📍 Deliverable Ngày 1:** | ✅ Database schema hoàn chỉnh | |
| 5 | **2** | phieuthuci.module.ts, phieuthuci.service.ts | CRUD service | ⬜ |
| 6 | **2** | phieuthuci.controller.ts + DTOs | REST endpoints | ⬜ |
| 7 | **2** | phieuthuci.resolver.ts | GraphQL mutations/queries | ⬜ |
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
| 17 | **5** | list-phieuthuci.component | Danh sách + filter | ⬜ |
| 18 | **5** | detail-phieuthuci.component | Form tạo/sửa | ⬜ |
| 19 | **5** | phieuthuci.service.ts + GraphQL | API integration | ⬜ |
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
