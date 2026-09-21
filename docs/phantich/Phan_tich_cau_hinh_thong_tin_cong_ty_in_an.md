# PHÂN TÍCH VÀ ĐỀ XUẤT GIẢI PHÁP DYNAMIC THÔNG TIN CÔNG TY & CẤU HÌNH MẪU IN

**Ngày tạo:** 04/09/2026  
**Mục tiêu:** Chuyển đổi toàn bộ thông tin công ty / đơn vị phát hành (đang bị cố định/hardcode) thành cấu hình động (dynamic), hỗ trợ đa cấu hình (nhiều pháp nhân/chi nhánh) khi in phiếu và xuất Excel.

---

## 1. THỰC TRẠNG HIỆN TẠI (HARDCODED)

Hiện tại, thông tin công ty đang được gắn cố định trực tiếp tại mã nguồn (HTML/TS) của các mẫu in và xuất Excel:

| STT | Vị trí / Tính năng | File mã nguồn | Dạng hiển thị |
| :--- | :--- | :--- | :--- |
| 1 | **In Phiếu giao hàng / Bảng kê giao hàng** | `frontend/src/app/admin/phieugiaohang/detailphieugiaohang/detailphieugiaohang.component.html` (dòng ~131) | Template In HTML |
| 2 | **In Chi tiết đơn hàng** | `frontend/src/app/admin/donhang/detaildonhang/detaildonhang.component.html` (dòng ~82) | Template In HTML |
| 3 | **In Chi tiết công nợ khách hàng** | `frontend/src/app/admin/congnokhachhang/detailcongnokhachhang/detailcongnokhachhang.component.html` (dòng ~48) | Template In HTML |
| 4 | **In & Xuất Excel Bảng sao kê công nợ KH** | `frontend/src/app/admin/congnokhachhang/listcongnokhachhang/listcongnokhachhang.component.html` (dòng ~531) & `.ts` (dòng ~1645) | HTML + SheetJS Excel |
| 5 | **In Công nợ nhà cung cấp** | `frontend/src/app/admin/congnoncc/listcongnoncc/listcongnoncc.component.html` (dòng ~527) | Template In HTML |
| 6 | **In Phiếu chia hàng** | `frontend/src/app/admin/phieuchiahang/listphieuchiahang/listphieuchiahang.component copy.ts` | HTML String |

### Nội dung thông tin đang hiển thị:
* **Tên chính:** CÔNG TY TNHH NÔNG SẢN THỰC PHẨM TRẦN GIA
* **Tên phụ:** Hợp Tác Xã Nông Nghiệp Công Nghệ Cao Trần Gia Farm
* **Địa chỉ HTX:** Ấp Lộc Tiến, Xã Mỹ Lộc, Huyện Cần Giuộc, Tỉnh Long An
* **Văn Phòng:** Tầng 3, An Phú Plaza, 117-119 Lý Chính Thắng, P. Võ Thị Sáu, Q. 3, TPHCM
* **Kho sơ chế:** 22 - 30 Kha Vạn Cân, P. Hiệp Bình Chánh, TP. Thủ Đức, TPHCM
* **Kho Đà Lạt:** 61 Lạc Long Quân, TT. Liên Nghĩa, Huyện Đức Trọng, Tỉnh Lâm Đồng
* **Website & Hotline:** Website: http://rausachtrangia.com - Hotline: 0868614214 – 0902458081
* **Hình ảnh:** Logo (`/images/logo-dark.svg`), QR Code (`/images/qrcodedonhang.svg`)

---

## 2. CÁC PHƯƠNG ÁN TRIỂN KHAI

### 🌟 PHƯƠNG ÁN 1: Quản lý Cấu hình Công ty trên Database (Khuyên dùng - Chuẩn kiến trúc)

* **Thiết kế Database (Prisma Schema):**
  Thêm model `CompanyProfile` (hoặc `PrintSetting`):
  ```prisma
  model CompanyProfile {
    id             String   @id @default(uuid())
    name           String   // Tên profile: vd "Trần Gia - Mặc định", "HTX Cần Giuộc", "Chi nhánh Đà Lạt"
    code           String?  @unique // Mã viết tắt
    isDefault      Boolean  @default(false)
    
    companyName    String   // Tên công ty chính
    subName        String?  // Tên phụ (HTX / Chi nhánh)
    taxCode        String?  // Mã số thuế
    
    addressHtx     String?  // Địa chỉ HTX
    addressOffice  String?  // Địa chỉ Văn phòng
    addressKho1    String?  // Kho sơ chế
    addressKho2    String?  // Kho Đà Lạt
    extraAddresses Json?    // Danh sách địa chỉ linh hoạt (nếu có thêm kho mới)
    
    website        String?
    hotline        String?
    email          String?
    bankInfo       String?  // Thông tin chuyển khoản
    
    logoUrl        String?  // URL Logo
    qrCodeUrl      String?  // URL QR code
    
    createdAt      DateTime @default(now())
    updatedAt      DateTime @updatedAt
  }
  ```

* **Module Backend (NestJS / GraphQL):**
  * CRUD `companyProfile`: Lấy danh sách, tạo mới, chỉnh sửa, gán mặc định.
* **Giao diện Admin (Frontend):**
  * Trang `Cấu hình / Thông tin công ty`: Cho phép thêm/sửa/xóa các mẫu cấu hình, đổi số hotline, địa chỉ, logo mà không cần đụng đến code.
* **Tích hợp khi In / Xuất Excel:**
  * Mặc định phiếu in sẽ load profile có `isDefault = true`.
  * Trên thanh công cụ in (Toolbar / Header của phiếu): Có thêm **Dropdown chọn Mẫu Công Ty / Pháp Nhân** để chuyển đổi nhanh khi cần in dưới danh nghĩa pháp nhân/chi nhánh khác.

---

### ⚡ PHƯƠNG ÁN 2: Dynamic kèm Gán sẵn theo Khách Hàng / Kho

* Kế thừa toàn bộ **Phương án 1**.
* Mở rộng thêm liên kết:
  * Khách hàng thuộc nhóm Doanh nghiệp/Chuỗi siêu thị -> Mặc định gán Profile `CÔNG TY TNHH`.
  * Khách hàng cá nhân/chợ/bếp ăn -> Mặc định gán Profile `HTX NÔNG NGHIỆP`.
  * Khi mở chi tiết đơn hàng / phiếu giao của khách hàng đó, hệ thống tự động nhận diện và áp dụng đúng cấu hình công ty tương ứng.

---

### 🔧 PHƯƠNG ÁN 3: Cấu hình nhanh ở Frontend (Config file / Preset)

* Định nghĩa file cấu hình `company-profiles.config.ts` ở Frontend.
* Thêm dropdown chọn profile khi in.
* **Ưu điểm:** Nhanh gọn, không cần chỉnh sửa DB/Backend.
* **Nhược điểm:** Khi thay đổi địa chỉ hay hotline phải chỉnh sửa code frontend và deploy lại.

---

## 3. LỘ TRÌNH THỰC HIỆN DỰ KIẾN (KHI ĐƯỢC XÁC NHẬN)

1. **Bước 1: Backend & DB**
   - Khởi tạo schema `CompanyProfile` trong `schema.prisma`.
   - Chạy migration & tạo GraphQL Service/Resolver cho CompanyProfile.
   - Seed sẵn dữ liệu hiện tại của Trần Gia thành profile mặc định (`isDefault: true`).
2. **Bước 2: Giao diện Cài đặt Admin**
   - Tạo trang UI quản lý danh sách và form sửa thông tin công ty.
3. **Bước 3: Tích hợp vào các mẫu In & Xuất Excel**
   - Thay thế các đoạn text hardcoded bằng biến dynamic từ `CompanyProfileService`.
   - Bổ sung Dropdown chọn profile trên thanh công cụ in ấn (`Phieugiaohang`, `Donhang`, `CongnoKhachhang`, `CongnoNCC`).
4. **Bước 4: Kiểm thử & Nghiệm thu**
   - Test in ấn và xuất file Excel thực tế trên các trình duyệt và thiết bị.
