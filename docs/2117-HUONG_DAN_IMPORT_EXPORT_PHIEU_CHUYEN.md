# 📖 Hướng Dẫn Sử Dụng: Import/Export Phiếu Chuyển

## 🎯 Mục Đích
Tính năng này cho phép bạn:
- **Xuất Excel**: Tạo file Excel chứa thông tin đơn hàng và phiếu chuyển
- **Chỉnh sửa**: Cập nhật thông tin Shipper, Giờ đi/về, Phiếu về, Ký nhận
- **Import lại**: Cập nhật hàng loạt thông tin vào hệ thống

## 📍 Vị Trí Tính Năng

**Menu:** Đơn Hàng → Vận Đơn

**Các nút chức năng:**
- 📥 **Xuất Excel**: Download file Excel với 2 sheet
- 📤 **Import Phiếu Chuyển**: Upload file Excel đã chỉnh sửa

---

## 📤 BƯỚC 1: XUẤT EXCEL

### Cách Thực Hiện:

1. **Vào trang Vận Đơn**
   - Click menu `Đơn Hàng` > `Vận Đơn`

2. **Chọn ngày cần xuất**
   - Chọn `Bắt Đầu`: Ngày bắt đầu
   - Chọn `Kết Thúc`: Ngày kết thúc
   - Hệ thống tự động load dữ liệu

3. **Click nút "Xuất Excel"**
   - Icon: 📥 (màu xanh dương - accent)
   - Tooltip: "Xuất Excel (2 sheet: Vận đơn + Phiếu chuyển)"

4. **Kết quả**
   - File Excel được download tự động
   - Tên file: `VanDon_PhieuChuyen_2025-10-30.xlsx`
   - Thông báo: ✅ "Xuất Excel thành công"

### Cấu Trúc File Excel:

File Excel có **2 sheets**:

#### **Sheet 1: "Vận Đơn"**
Danh sách chi tiết sản phẩm trong đơn hàng

| STT | Mã Đơn Hàng | Khách Hàng | Tên Sản Phẩm | Đơn Vị Tính | SL Đặt | SL Giao | SL Nhận | Ngày Giao | Trạng Thái |
|-----|-------------|------------|--------------|-------------|--------|---------|---------|-----------|------------|
| 1   | DH001       | Cty A      | Rau xà lách  | Thùng       | 10     | 10      | 10      | 30/10/25  | Đã Giao    |

#### **Sheet 2: "Phiếu Chuyển"** ⭐
Thông tin giao hàng - **Sheet quan trọng để chỉnh sửa**

| STT | Mã Đơn Hàng | Ngày Giao | Tên KH | Số Lượng | Địa Chỉ | SĐT | **Shipper** | **Phiếu Về** | **Giờ Đi** | **Giờ Về** | **Ký Nhận** |
|-----|-------------|-----------|--------|----------|---------|-----|-------------|--------------|------------|------------|-------------|
| 1   | DH001       | 30/10/25  | Cty A  | 10       | HN      | 090... | *empty*   | *empty*      | *empty*    | *empty*    | *empty*     |

**Chú ý:** Các cột **in đậm** là những trường bạn cần điền thông tin

---

## ✏️ BƯỚC 2: CHỈNH SỬA EXCEL

### Mở File Excel:

1. **Mở file vừa download**
   - Double-click file `VanDon_PhieuChuyen_2025-10-30.xlsx`
   - Excel/LibreOffice tự động mở

2. **Chọn Sheet "Phiếu Chuyển"**
   - Click tab "Phiếu Chuyển" ở cuối màn hình

### Điền Thông Tin:

**5 cột cần điền:**

| Cột | Mô Tả | Ví Dụ | Bắt Buộc |
|-----|-------|-------|----------|
| **Shipper** | Tên người giao hàng | "Nguyễn Văn A" | Không |
| **Phiếu Về** | Mã phiếu về | "PV-001" | Không |
| **Giờ Đi** | Giờ xuất phát giao hàng | "08:00" hoặc "8h30" | Không |
| **Giờ Về** | Giờ về đến kho | "17:00" hoặc "5h30 chiều" | Không |
| **Ký Nhận** | Người ký nhận hàng | "Trần Văn B" | Không |

### Ví Dụ Điền Thông Tin:

**Before (sau khi xuất):**
```
| Mã Đơn Hàng | Shipper | Phiếu Về | Giờ Đi | Giờ Về | Ký Nhận |
|-------------|---------|----------|--------|--------|---------|
| DH001       |         |          |        |        |         |
| DH002       |         |          |        |        |         |
```

**After (sau khi điền):**
```
| Mã Đơn Hàng | Shipper      | Phiếu Về | Giờ Đi | Giờ Về | Ký Nhận      |
|-------------|--------------|----------|--------|--------|--------------|
| DH001       | Nguyễn Văn A | PV-001   | 08:00  | 17:00  | Trần Văn B   |
| DH002       | Lê Thị C     | PV-002   | 09:00  | 18:30  | Nguyễn Văn D |
```

### Lưu Ý Quan Trọng:

✅ **ĐƯỢC:**
- Điền một số cột, bỏ trống các cột khác
- Sửa thông tin cũ sang thông tin mới
- Thêm thông tin vào dòng trống

❌ **KHÔNG ĐƯỢC:**
- Đổi tên các cột (Header phải giữ nguyên)
- Xóa cột "Mã Đơn Hàng"
- Thêm/xóa dòng (chỉ sửa dữ liệu)
- Thay đổi Sheet name "Phiếu Chuyển"

### Lưu File:

- **Ctrl + S** hoặc **File > Save**
- Giữ nguyên format `.xlsx`
- Đóng Excel

---

## 📤 BƯỚC 3: IMPORT LẠI HỆ THỐNG

### Cách Thực Hiện:

1. **Quay lại trang Vận Đơn**
   - Đảm bảo đang ở trang `Đơn Hàng` > `Vận Đơn`

2. **Click nút "Import Phiếu Chuyển"**
   - Icon: 📤 (màu xanh lá - primary)
   - Tooltip: "Import Phiếu Chuyển (Cập nhật Shipper, Giờ đi/về, v.v.)"

3. **Chọn file Excel đã chỉnh sửa**
   - Hộp thoại chọn file xuất hiện
   - Chọn file `VanDon_PhieuChuyen_2025-10-30.xlsx`
   - Click **Open**

4. **Theo dõi tiến trình**
   
   Hệ thống sẽ hiển thị các thông báo theo thứ tự:

   ```
   📂 Đang đọc file Excel...
   
   ⏳ Đang xử lý 0/50...
   
   ⏳ Đang xử lý 10/50 (20%)...
   
   ⏳ Đang xử lý 20/50 (40%)...
   
   ⏳ Đang xử lý 50/50 (100%)...
   
   ✅ Import thành công 48 đơn hàng
   ```

5. **Kiểm tra kết quả**
   - Nếu thành công 100%: `✅ Import thành công 48 đơn hàng`
   - Nếu có lỗi: `⚠️ 45 thành công, 3 lỗi`
   - Dữ liệu tự động refresh trên màn hình

---

## 🎯 CÁC TÌNH HUỐNG THƯỜNG GẶP

### ✅ Tình Huống 1: Import Thành Công Hoàn Toàn

**Kịch bản:**
- File Excel có 50 dòng
- Tất cả Mã Đơn Hàng đều tồn tại trong hệ thống
- Không có lỗi

**Kết quả:**
```
✅ Import thành công 50 đơn hàng
```

**Console Log:**
```
[IMPORT] Bắt đầu import 50 dòng...
[IMPORT] Đang xóa cache...
[IMPORT] Đang làm mới dữ liệu...
[IMPORT] Hoàn thành trong 8.5s: { success: 50, error: 0, total: 50 }
```

---

### ⚠️ Tình Huống 2: Có Một Số Lỗi

**Kịch bản:**
- File có 50 dòng
- 3 dòng có Mã Đơn Hàng không tồn tại
- 47 dòng import thành công

**Kết quả:**
```
⚠️ 47 thành công, 3 lỗi
```

**Console Log:**
```
[IMPORT] Hoàn thành trong 9.2s: { success: 47, error: 3, total: 50 }
[IMPORT] Lỗi: [
  "DH099: Không tìm thấy",
  "DH100: Không tìm thấy",
  "Dòng 45: Timeout"
]
```

**Cách xử lý:**
1. Mở Console (F12)
2. Xem chi tiết lỗi
3. Sửa Mã Đơn Hàng trong Excel
4. Import lại

---

### ❌ Tình Huống 3: Lỗi File Excel

**Kịch bản:**
- File không có Sheet "Phiếu Chuyển"
- File bị lỗi format
- File rỗng

**Kết quả:**
```
⚠️ File không có dữ liệu
```

**Cách xử lý:**
1. Xuất lại Excel từ hệ thống
2. Đảm bảo Sheet name là "Phiếu Chuyển"
3. Kiểm tra file có dữ liệu

---

### 🔄 Tình Huống 4: Chỉ Update Một Số Cột

**Excel:**
```
| Mã Đơn Hàng | Shipper      | Phiếu Về | Giờ Đi | Giờ Về | Ký Nhận |
|-------------|--------------|----------|--------|--------|---------|
| DH001       | Nguyễn Văn A |          |        |        |         |
| DH002       |              | PV-002   | 09:00  |        |         |
```

**Kết quả:**
- DH001: Chỉ cập nhật `shipper = "Nguyễn Văn A"`
- DH002: Cập nhật `phieuve = "PV-002"` và `giodi = "09:00"`
- Các trường khác giữ nguyên giá trị cũ

---

## 📊 KIỂM TRA DỮ LIỆU SAU IMPORT

### Cách 1: Xem Trên Màn Hình

1. **Thêm cột hiển thị** (nếu chưa có)
   - Click icon ⚙️ (Tune) ở góc trên
   - Tick chọn: Shipper, Phiếu Về, Giờ Đi, Giờ Về, Ký Nhận
   - Các cột tự động xuất hiện trong bảng

2. **Kiểm tra giá trị**
   - Scroll qua các dòng
   - Verify thông tin đã cập nhật đúng

### Cách 2: Xuất Excel Lại

1. Click "Xuất Excel" lần nữa
2. Mở file mới download
3. So sánh Sheet "Phiếu Chuyển" với file gốc
4. Verify dữ liệu đã update

### Cách 3: Xem Console Log

1. Mở Developer Tools (F12)
2. Tab Console
3. Tìm log `[IMPORT] Hoàn thành trong...`
4. Xem chi tiết result

---

## ⚡ MẸO VÀ THỦ THUẬT

### Mẹo 1: Import Nhanh Với Template

**Tạo Template:**
1. Xuất Excel một lần
2. Lưu file với tên `Template_PhieuChuyen.xlsx`
3. Xóa hết dữ liệu, chỉ giữ header
4. Lưu lại

**Sử dụng:**
- Copy dữ liệu mới vào template
- Import trực tiếp

### Mẹo 2: Import Từng Batch

**Nếu có nhiều đơn (>100):**
1. Chia file Excel thành các file nhỏ (50-100 dòng/file)
2. Import lần lượt từng file
3. Giảm thời gian chờ và dễ kiểm soát lỗi

### Mẹo 3: Backup Trước Khi Import

**An toàn hơn:**
1. Xuất Excel để backup dữ liệu hiện tại
2. Lưu với tên `Backup_YYYY-MM-DD.xlsx`
3. Import dữ liệu mới
4. Nếu có vấn đề, dùng backup để restore

### Mẹo 4: Sử dụng Excel Functions

**Tự động điền:**
```excel
// Tự động thêm prefix cho Phiếu Về
=CONCATENATE("PV-", TEXT(ROW()-1, "000"))
// Result: PV-001, PV-002, ...

// Copy Shipper từ dòng trước
=B2
// Kéo xuống để copy
```

---

## ❓ CÂU HỎI THƯỜNG GẶP

### Q1: Import có ghi đè dữ liệu cũ không?

**A:** Có, nhưng chỉ các trường bạn điền vào Excel.

**Ví dụ:**
- Dữ liệu cũ: `shipper="ABC", giodi="08:00"`
- Excel: Chỉ điền `shipper="XYZ"`, bỏ trống `giodi`
- Kết quả: `shipper="XYZ", giodi="08:00"` (giodi giữ nguyên)

### Q2: Có thể import nhiều lần không?

**A:** Có, không giới hạn số lần.
- Mỗi lần import sẽ update lại dữ liệu
- Giá trị mới nhất sẽ được lưu

### Q3: Mất bao lâu để import?

**A:** Phụ thuộc số lượng:
- 10-50 dòng: 3-10 giây
- 50-100 dòng: 10-20 giây
- 100-200 dòng: 20-40 giây

### Q4: Import có ảnh hưởng đến đơn hàng khác không?

**A:** Không.
- Chỉ update đúng các đơn hàng có trong Excel
- Các đơn khác không bị ảnh hưởng

### Q5: Tên cột có phân biệt chữ hoa/thường không?

**A:** Có.
- Phải giữ chính xác: "Shipper", "Phiếu Về", "Giờ Đi", "Giờ Về", "Ký Nhận"
- Không được viết: "shipper", "SHIPPER", "Shiper"

### Q6: Có thể import file CSV không?

**A:** Không.
- Chỉ hỗ trợ file `.xlsx` (Excel)
- Nếu có CSV, convert sang Excel trước

### Q7: Import lỗi có rollback không?

**A:** Không.
- Import thành công từng dòng một
- Nếu dòng lỗi, dòng đó bị bỏ qua
- Các dòng đã import thành công vẫn được lưu

---

## 🚨 XỬ LÝ LỖI

### Lỗi: "Không tìm thấy đơn hàng"

**Nguyên nhân:**
- Mã Đơn Hàng không tồn tại trong hệ thống
- Đánh máy sai Mã Đơn Hàng

**Cách fix:**
1. Kiểm tra Mã Đơn Hàng trong hệ thống
2. Sửa lại trong Excel
3. Import lại

### Lỗi: "File không có dữ liệu"

**Nguyên nhân:**
- Sheet "Phiếu Chuyển" bị xóa hoặc đổi tên
- File Excel rỗng

**Cách fix:**
1. Xuất lại Excel từ hệ thống
2. Đảm bảo Sheet name chính xác
3. Điền dữ liệu

### Lỗi: Timeout/Connection Failed

**Nguyên nhân:**
- Mạng chậm
- Server quá tải

**Cách fix:**
1. Chia nhỏ file Excel (50 dòng/file)
2. Import từng batch
3. Thử lại sau vài phút

---

## 📞 HỖ TRỢ

**Nếu gặp vấn đề:**

1. **Kiểm tra Console Log**
   - F12 > Console
   - Screenshot lỗi

2. **Liên hệ IT Support**
   - Gửi file Excel gặp lỗi
   - Gửi screenshot lỗi
   - Mô tả chi tiết vấn đề

3. **Tham khảo Log**
   - Mở Console (F12)
   - Tìm `[IMPORT]` để xem chi tiết

---

## 📝 CHECKLIST SỬ DỤNG

**Trước khi Import:**
- [ ] Đã xuất Excel thành công
- [ ] Đã điền đầy đủ thông tin cần thiết
- [ ] Đã kiểm tra Mã Đơn Hàng chính xác
- [ ] Đã lưu file Excel
- [ ] Sheet name là "Phiếu Chuyển"

**Trong khi Import:**
- [ ] Theo dõi progress bar
- [ ] Chờ đến khi có thông báo kết quả
- [ ] Không đóng trình duyệt

**Sau khi Import:**
- [ ] Đọc thông báo kết quả
- [ ] Kiểm tra dữ liệu trên màn hình
- [ ] Xem Console log nếu có lỗi
- [ ] Backup file Excel nếu cần

---

**🎉 Chúc bạn sử dụng tính năng thành công!**

*Cập nhật: 30/10/2025*
