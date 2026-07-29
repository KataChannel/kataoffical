# Phân hệ Kế toán (`ketoan`) — Công nợ + Hạch toán chuẩn VN (TT133)

Thay thế việc quản lý **công nợ KH/NCC bằng Excel**. Hạch toán tài khoản kép, hỗ trợ hóa đơn GTGT điện tử & khai thuế. Tất cả đã build + test trên **bản DB local mirror** (chưa apply production).

## Đã có

| Nhóm | Chức năng | Endpoint (REST, JWT) |
|---|---|---|
| Đầu kỳ | Import số dư đầu kỳ từ Excel | script `import-congno-dauky.js` |
| AR | Phiếu thu, gạch nợ, bút toán Nợ111/112-Có131 | `POST /ketoan/phieu-thu-chi` |
| AR | Ghi nhận bán hàng (Nợ131/Có511+3331) | `POST /ketoan/ghi-nhan-ban-hang/:donhangId` |
| AR | Công nợ ròng / tổng hợp / tuổi nợ / đối chiếu | `GET /ketoan/bao-cao-cong-no`, `/tuoi-no`, `/doi-chieu/:id`, `/cong-no-khach-hang/:id` |
| AP | Nhập mua (Nợ156/Có331), công nợ NCC | `POST /ketoan/ghi-nhan-nhap-mua/:dathangId`, `GET /ketoan/bao-cao-cong-no-ncc` |
| Sổ quỹ | Danh sách phiếu thu/chi | `GET /ketoan/phieu-thu-chi` |
| Khóa sổ | Khóa/mở kỳ, chặn sửa đơn kỳ đã khóa | `POST /ketoan/khoa-so`, `/mo-khoa-so` (guard đã nối `donhang.update`) |
| HĐĐT | Phát hành qua `HoaDonProvider` (mock), bảng kê | `POST /ketoan/phat-hanh-hoa-don/:donhangId`, `GET /ketoan/bang-ke-ban-ra`, `/bang-ke-mua-vao` |

**Logic doanh thu (đã verify):** `isshowvat ? tongtien : Σ(slnhan×giaban)` — bỏ `ttnhan`/`ttsauvat` (bẩn).
**Frontend Angular:** `/admin/ketoan/congno` (công nợ KH/tuổi nợ/NCC), `/admin/ketoan/soquy` (phiếu thu/chi).

## Chạy trên DB LOCAL (an toàn, không đụng server)

```bash
# 1) Container Postgres local (đã dựng): rausach-localdb @ localhost:55432 (cùng user/pass/db với server)
docker start rausach-localdb

# 2) DATABASE_URL local = URL trong api/.env nhưng đổi host -> localhost
cd api
LOCAL_URL=$(grep '^DATABASE_URL' .env | sed -E 's#@[^/]+/#@localhost:55432/#' | cut -d= -f2- | tr -d '"')

# 3) Seed tài khoản + import đầu kỳ + chạy API
DATABASE_URL="$LOCAL_URL" node scripts/seed-taikhoan.js
DATABASE_URL="$LOCAL_URL" node scripts/gen-template-congno-dauky.js   # -> Template_CongNo_DauKy.xlsx
DATABASE_URL="$LOCAL_URL" node scripts/import-congno-dauky.js <file.xlsx>
DATABASE_URL="$LOCAL_URL" npm run start:dev
```
Scripts test: `scripts/test-ketoan*.ts`, `test-aging.ts`, `test-baocao-congno.ts` (chạy `npx ts-node --transpile-only ...`).

## Apply lên PRODUCTION (khi sẵn sàng)

1. **BACKUP DB trước.**
2. Migration additive (chỉ THÊM bảng/cột, không xóa): `prisma/ketoan-init.sql`.
   ```bash
   psql "$DATABASE_URL" -f prisma/ketoan-init.sql   # hoặc prisma migrate
   ```
   ⚠️ `schema.prisma` đã được hòa hợp với DB thật (thêm `Chotkho.isLocked`, `Chotkhodetail.giaTri*`, `SystemSetting`… vốn có trong DB nhưng thiếu trong file). **KHÔNG chạy `prisma migrate dev` khi chưa `db pull`/đối chiếu** — bản gốc sẽ DROP 10 cột + bảng SystemSetting.
3. `npx prisma generate` rồi seed tài khoản + import đầu kỳ.

## Còn lại (tùy chọn)
- Chọn nhà cung cấp HĐĐT thật → thêm 1 class `implements HoaDonProvider` (thay `MockHoaDonProvider` trong `ketoan.module.ts`).
- Nối guard khóa sổ vào `phieukho.update` (đã nối `donhang.update`).
- Tạo bản ghi Menu + quyền `ketoan.view` để trang hiện trên sidebar (menu data-driven; hiện truy cập được qua URL trực tiếp).
- Backfill toàn bộ đơn `danhan` → `CongNoGiaoDich` nếu muốn subledger lưu sẵn (báo cáo hiện tính on-the-fly, đã đúng).
