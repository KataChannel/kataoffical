# ĐỀ XUẤT GIẢI PHÁP: TÙY CHỌN "SỬ DỤNG PHIẾU GIAO HÀNG 2" (MẪU CÔNG TY CỔ PHẦN)

**Ngày lập:** 25/09/2026  
**Trạng thái:** Bản đề xuất / Chờ duyệt (Chưa sửa code)  
**Phạm vi áp dụng:** Phân hệ Khách hàng (`Khachhang`) & Phiếu giao hàng (`Phieugiaohang`)

---

## 1. MỤC TIÊU & BỐI CẢNH

* **Yêu cầu:** Thêm một công tắc tùy chọn **"Sử dụng phiếu giao hàng 2"** đặt ngay bên dưới mục **"Hiện Tên Sản Phẩm 2"** trong màn hình cấu hình chi tiết Khách Hàng.
* **Mục đích:** Khi một khách hàng được bật tùy chọn này, toàn bộ phiếu giao hàng / in bảng kê giao hàng của khách hàng đó sẽ mặc định hiển thị thông tin pháp nhân của **CÔNG TY CỔ PHẦN** thay vì thông tin mặc định hiện tại (**CÔNG TY TNHH NÔNG SẢN THỰC PHẨM TRẦN GIA & HTX**).
* **Nguyên tắc cốt lõi:**
  * **Không làm gián đoạn hoặc thay đổi dữ liệu** của các khách hàng hiện hữu.
  * Mặc định cờ này là `false` (sử dụng mẫu 1 - Công ty TNHH). Chỉ khi kế toán/admin chủ động bật thì mới kích hoạt mẫu 2.
  * Đảm bảo tính mở, dễ dàng tùy biến thông tin pháp nhân trong tương lai.

---

## 2. HIỆN TRẠNG HỆ THỐNG

### 2.1. Cấu hình Khách Hàng hiện tại
* Màn hình chi tiết khách hàng (`detailkhachhang.component.html`) hiện có các tùy chọn switch:
  * **Hiện Giá** (`hiengia: Boolean`)
  * **Hiện VAT** (`isshowvat: Boolean`)
  * **Hiện Tên Sản Phẩm 2** (`istitle2: Boolean`)
  * **Ghi Chú** (`ghichu: String`)

### 2.2. Mẫu in Phiếu Giao Hàng hiện tại (Mẫu 1)
Thông tin công ty đang hiển thị cố định (hardcoded) tại `detailphieugiaohang.component.html`:
* **Đơn vị:** CÔNG TY TNHH NÔNG SẢN THỰC PHẨM TRẦN GIA
* **Đơn vị thành viên:** Hợp Tác Xã Nông Nghiệp Công Nghệ Cao Trần Gia Farm
* **Địa chỉ HTX:** Ấp Lộc Tiến, Xã Mỹ Lộc, Huyện Cần Giuộc, Tỉnh Long An
* **Văn Phòng:** Tầng 3, An Phú Plaza, 117-119 Lý Chính Thắng, P. Võ Thị Sáu, Q. 3, TPHCM
* **Kho sơ chế:** 22 - 30 Kha Vạn Cân, P. Hiệp Bình Chánh, TP. Thủ Đức, TPHCM
* **Kho Đà Lạt:** 61 Lạc Long Quân, TT. Liên Nghĩa, Huyện Đức Trọng, Tỉnh Lâm Đồng
* **Website & Hotline:** http://rausachtrangia.com - 0868614214 – 0902458081
* **Logo & QR:** `/images/logo-dark.svg`, `/images/qrcodedonhang.svg`

---

## 3. THIẾT KẾ GIẢI PHÁP CHI TIẾT (NON-BREAKING)

### 3.1. Sơ đồ luồng hoạt động

```
                         ┌──────────────────────────────────────────┐
                         │      Khách Hàng (isPhieugiao2)           │
                         └────────────────────┬─────────────────────┘
                                              │
                     ┌────────────────────────┴────────────────────────┐
                     ▼ (Bật - true)                                    ▼ (Tắt / Mặc định - false)
     ┌────────────────────────────────┐                ┌────────────────────────────────┐
     │      PHIẾU GIAO HÀNG 2         │                │      PHIẾU GIAO HÀNG 1         │
     │   (Pháp nhân CÔNG TY CỔ PHẦN)  │                │    (Pháp nhân CÔNG TY TNHH)    │
     └────────────────────────────────┘                └────────────────────────────────┘
```

---

### 3.2. Chi tiết kỹ thuật từng tầng

#### Tầng 1: Cơ sở dữ liệu (Prisma Schema)
Bổ sung trường `isPhieugiao2` vào model `Khachhang`:
```prisma
model Khachhang {
  id            String          @id @default(uuid())
  name          String?
  ...
  hiengia       Boolean         @default(false)
  istitle2      Boolean         @default(false)
  isPhieugiao2  Boolean         @default(false) // 👈 Cờ chọn phiếu giao hàng 2 (Mặc định false)
  isshowvat     Boolean         @default(true)
  ...
}
```
* **Đánh giá an toàn:** Cột mới có giá trị `@default(false)`. Khi chạy migration (`prisma db push` hoặc migration), toàn bộ khách hàng cũ tự động nhận giá trị `false`, hoàn toàn không gây lỗi hay lệch dữ liệu.

#### Tầng 2: Backend API & GraphQL
* Cập nhật DTO `CreateKhachhangDto`, `UpdateKhachhangDto` và GraphQL Resolver/Service của Khách Hàng để nhận và trả về trường `isPhieugiao2`.
* Tại endpoint lấy chi tiết phiếu giao hàng (`Phieugiaohang`), quan hệ `khachhang` đã được query kèm nên client tự động nhận được giá trị `isPhieugiao2` mà không cần gọi thêm API phụ.

#### Tầng 3: Giao diện Khách Hàng (Frontend UI)
Tại `frontend/src/app/admin/khachhang/detailkhachhang/detailkhachhang.component.html`:
```html
<div class="flex flex-col space-y-3">
  <!-- Các toggle hiện tại -->
  <mat-slide-toggle color="primary" [checked]="DetailKhachhang()?.hiengia" (change)="updateHiengia($event)" [disabled]="!isEdit()">Hiện Giá</mat-slide-toggle>
  <mat-slide-toggle color="primary" [checked]="DetailKhachhang()?.isshowvat" (change)="updateIsshowvat($event)" [disabled]="!isEdit()">Hiện VAT</mat-slide-toggle>
  
  <mat-slide-toggle color="primary" [checked]="DetailKhachhang()?.istitle2" (change)="updateIstitle2($event)" [disabled]="!isEdit()">Hiện Tên Sản Phẩm 2</mat-slide-toggle>
  
  <!-- 👈 VỊ TRÍ MỚI: Nằm ngay dưới "Hiện Tên Sản Phẩm 2" -->
  <mat-slide-toggle color="primary" 
                    [checked]="DetailKhachhang()?.isPhieugiao2" 
                    (change)="updateIsPhieugiao2($event)" 
                    [disabled]="!isEdit()">
    Sử dụng phiếu giao hàng 2
  </mat-slide-toggle>

  <mat-form-field appearance="outline" subscriptSizing="dynamic">
    <mat-label>Ghi Chú</mat-label>
    <textarea matInput [value]="DetailKhachhang()?.ghichu || ''" (input)="updateGhichu($event)" [disabled]="!isEdit()"></textarea>
  </mat-form-field>
</div>
```

#### Tầng 4: Mẫu in Phiếu Giao Hàng (`Phieugiaohang`)
Tại `frontend/src/app/admin/phieugiaohang/detailphieugiaohang/detailphieugiaohang.component.html`:
Rẽ nhánh hiển thị Header công ty dựa trên điều kiện:
```html
<!-- MẪU 1: CÔNG TY TNHH (Mặc định khi isPhieugiao2 không bật) -->
<ng-container *ngIf="!DetailPhieugiaohang()?.khachhang?.isPhieugiao2">
  <div class="w-full flex flex-row space-x-2 items-center justify-between">
    <img src="/images/logo-dark.svg" class="h-14 mx-auto">
    <div class="w-2/3 flex flex-col">
      <div class="font-bold text-[18px]">CÔNG TY TNHH NÔNG SẢN THỰC PHẨM TRẦN GIA</div>
      <div class="font-bold">Hợp Tác Xã Nông Nghiệp Công Nghệ Cao Trần Gia Farm</div>
      <div>Địa chỉ HTX: Ấp Lộc Tiến, Xã Mỹ Lộc, Huyện Cần Giuộc, Tỉnh Long An</div>
      <div>Văn Phòng: Tầng 3, An Phú Plaza, 117-119 Lý Chính Thắng, P. Võ Thị Sáu, Q. 3, TPHCM</div>
      <div>Kho sơ chế: 22 - 30 Kha Vạn Cân, P. Hiệp Bình Chánh, TP. Thủ Đức, TPHCM</div>
      <div>Kho Đà Lạt: 61 Lạc Long Quân, TT. Liên Nghĩa, Huyện Đức Trọng, Tỉnh Lâm Đồng</div>
      <div>Website: http://rausachtrangia.com - Hotline: 0868614214 – 0902458081</div>
    </div>
    <img src="/images/qrcodedonhang.svg" class="h-32 ml-auto p-4">
  </div>
</ng-container>

<!-- MẪU 2: CÔNG TY CỔ PHẦN (Khi isPhieugiao2 = true) -->
<ng-container *ngIf="DetailPhieugiaohang()?.khachhang?.isPhieugiao2">
  <div class="w-full flex flex-row space-x-2 items-center justify-between">
    <img src="/images/logo-dark.svg" class="h-14 mx-auto">
    <div class="w-2/3 flex flex-col">
      <div class="font-bold text-[18px]">[TÊN CÔNG TY CỔ PHẦN]</div>
      <div class="font-bold">[Đơn vị / Chi nhánh trực thuộc nếu có]</div>
      <div>[Địa chỉ trụ sở / văn phòng]</div>
      <div>[Địa chỉ kho bãi]</div>
      <div>[Mã số thuế / Website / Hotline]</div>
    </div>
    <img src="/images/qrcodedonhang.svg" class="h-32 ml-auto p-4">
  </div>
</ng-container>
```

---

## 4. CHECKLIST THÔNG TIN CẦN XÁC NHẬN TỪ NGƯỜI DÙNG

Trước khi triển khai mã nguồn, cần bổ sung nội dung chính xác của Mẫu số 2:
- [ ] **Tên pháp nhân chính xác:** `CÔNG TY CỔ PHẦN ...`
- [ ] **Tên đơn vị phụ / Chi nhánh (nếu có):** `...`
- [ ] **Địa chỉ trụ sở & văn phòng:** `...`
- [ ] **Địa chỉ kho bãi:** `...`
- [ ] **Mã số thuế / Số điện thoại / Hotline / Website:** `...`
- [ ] **Hình ảnh Logo / Mã QR:** Dùng chung logo Trần Gia hay có file logo/QR riêng?

---

## 5. KẾ HOẠCH TRIỂN KHAI DỰ KIẾN (KHI CÓ XÁC NHẬN)

1. **Bước 1 (Database):** Cập nhật `schema.prisma`, sinh client và đồng bộ schema an toàn.
2. **Bước 2 (Backend):** Cập nhật DTO và Service Khách Hàng.
3. **Bước 3 (Frontend Khách Hàng):** Thêm switch toggle và hàm `updateIsPhieugiao2` trong `detailkhachhang`.
4. **Bước 4 (Frontend Phiếu Giao):** Cập nhật header rẽ nhánh điều kiện Mẫu 1 / Mẫu 2 trong `detailphieugiaohang`.
5. **Bước 5 (Kiểm thử):**
   * Kiểm tra khách hàng bình thường: Vẫn in ra phiếu Mẫu 1 (TNHH).
   * Kiểm tra khách hàng bật switch: In ra phiếu Mẫu 2 (Cổ Phần).
   * Build test toàn bộ hệ thống để đảm bảo 0 lỗi.
