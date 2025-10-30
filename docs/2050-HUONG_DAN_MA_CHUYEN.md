# Hướng Dẫn Sử Dụng Mã Chuyến (machuyen)

> **Tính năng**: Quản lý mã tuyến đường giao hàng cho khách hàng  
> **Ngày cập nhật**: 2025-01-XX  
> **Trạng thái**: ✅ Sẵn sàng sử dụng

---

## 📋 Mã Chuyến Là Gì?

**Mã Chuyến** (machuyen) là mã định danh cho tuyến đường giao hàng. Mỗi khách hàng sẽ được gán vào một chuyến cụ thể để tài xế có thể giao hàng hiệu quả.

**Ví dụ**:
- `CH-01` - Chuyến 1
- `CH-A` - Chuyến A
- `TUYEN-DONG` - Tuyến phía Đông
- `Q1-SANG` - Quận 1 buổi sáng

---

## 🎯 Khi Nào Cần Dùng?

✅ **Cần dùng khi**:
- Phân chia khách hàng theo tuyến đường giao hàng
- Lập kế hoạch giao hàng cho tài xế
- Tối ưu hóa lộ trình giao hàng
- Theo dõi đơn hàng theo chuyến

❌ **Không bắt buộc**:
- Trường này có thể để trống
- Hệ thống vẫn hoạt động bình thường nếu không điền

---

## 📝 Cách 1: Nhập Trực Tiếp Vào Form Khách Hàng

### Bước 1: Mở Thông Tin Khách Hàng
1. Vào **Quản Lý** → **Khách Hàng**
2. Click vào tên khách hàng cần sửa

### Bước 2: Bật Chế Độ Chỉnh Sửa
1. Nhìn góc phải trên cùng
2. Click nút **Sửa** (biểu tượng bút chì ✏️)
3. Các ô nhập liệu sẽ sáng lên, có thể chỉnh sửa

### Bước 3: Nhập Mã Chuyến
1. Kéo xuống tìm ô **Mã Chuyến**
2. Nhập mã chuyến (ví dụ: `CH-01`)
3. Có thể dùng chữ cái, số, gạch ngang
4. Không giới hạn độ dài

### Bước 4: Lưu Thay Đổi
1. Click nút **Lưu** (góc phải trên)
2. Chờ thông báo "Cập nhật khách hàng thành công"
3. Mã chuyến đã được lưu

---

## 📊 Cách 2: Cập Nhật Hàng Loạt Qua Excel

### Bước 1: Xuất Phiếu Chuyển
1. Vào **Quản Lý** → **Đơn Hàng**
2. Click nút **Xuất Phiếu Chuyển**
3. File Excel sẽ tự động tải về

### Bước 2: Mở File Excel
1. Tìm file có tên `PhieuChuyen_YYYY-MM-DD.xlsx`
2. Mở bằng Microsoft Excel hoặc Google Sheets
3. Tìm cột **Mã Chuyến**

### Bước 3: Chỉnh Sửa Mã Chuyến
```
| STT | Mã Đơn Hàng | Mã Chuyến | Tên Khách Hàng | ... |
|-----|-------------|-----------|----------------|-----|
| 1   | DH-001      | CH-01     | Nguyễn Văn A   | ... |
| 2   | DH-002      | CH-01     | Trần Thị B     | ... |
| 3   | DH-003      | CH-02     | Lê Văn C       | ... |
```

**Lưu ý**:
- ✅ Chỉ sửa cột **Mã Chuyến**
- ✅ Có thể sửa nhiều dòng cùng lúc
- ❌ KHÔNG xóa hoặc sửa cột **Mã Đơn Hàng** (hệ thống dùng để tìm đơn)
- ❌ KHÔNG xóa header (dòng tiêu đề)

### Bước 4: Lưu File Excel
1. Click **File** → **Save** (Ctrl+S)
2. Đóng Excel

### Bước 5: Import Lại Vào Hệ Thống
1. Quay lại màn hình **Đơn Hàng**
2. Click nút **Nhập Phiếu Chuyển**
3. Chọn file Excel vừa chỉnh sửa
4. Click **Open**

### Bước 6: Chờ Xử Lý
1. Hệ thống sẽ hiển thị:
   ```
   Đang xử lý: 10/100 dòng...
   Đang xử lý: 20/100 dòng...
   ...
   Import thành công 100 dòng
   ```
2. Chờ thông báo "Import thành công"
3. Mã chuyến đã được cập nhật cho tất cả khách hàng

---

## ✅ Kiểm Tra Kết Quả

### Kiểm Tra Khách Hàng Đơn Lẻ
1. Vào **Quản Lý** → **Khách Hàng**
2. Click vào tên khách hàng vừa sửa
3. Xem ô **Mã Chuyến** đã có giá trị mới chưa

### Kiểm Tra Qua Phiếu Chuyển
1. Xuất lại Phiếu Chuyển
2. Mở Excel
3. Xem cột **Mã Chuyến** đã cập nhật đúng chưa

---

## 🎓 Ví Dụ Thực Tế

### Tình Huống 1: Phân Chia Theo Quận
```
Khách hàng ở Quận 1 → Mã Chuyến: Q1
Khách hàng ở Quận 2 → Mã Chuyến: Q2
Khách hàng ở Quận 3 → Mã Chuyến: Q3
```

**Cách làm**:
1. Xuất Phiếu Chuyển
2. Sắp xếp theo cột Địa Chỉ
3. Điền Mã Chuyến theo từng quận
4. Import lại

### Tình Huống 2: Phân Chia Theo Buổi
```
Giao buổi sáng → Mã Chuyến: SANG
Giao buổi chiều → Mã Chuyến: CHIEU
Giao buổi tối → Mã Chuyến: TOI
```

**Cách làm**:
1. Xem cột Giờ Nhận Hàng
2. Điền Mã Chuyến tương ứng:
   - 6h-12h → SANG
   - 12h-18h → CHIEU
   - 18h-21h → TOI

### Tình Huống 3: Phân Chia Theo Tài Xế
```
Tài xế Anh → Mã Chuyến: TAI-ANH
Tài xế Bình → Mã Chuyến: TAI-BINH
Tài xế Cường → Mã Chuyến: TAI-CUONG
```

**Cách làm**:
1. Lập danh sách khách hàng cho từng tài xế
2. Xuất Phiếu Chuyển
3. Điền Mã Chuyến theo tài xế phụ trách
4. Import lại

---

## 🐛 Xử Lý Lỗi Thường Gặp

### Lỗi 1: Không Sửa Được Mã Chuyến
**Hiện tượng**: Click vào ô Mã Chuyến nhưng không nhập được

**Nguyên nhân**: Chưa bật chế độ chỉnh sửa

**Cách sửa**:
1. Nhìn góc phải trên
2. Tìm nút **Sửa** (✏️)
3. Click vào nút Sửa
4. Thử lại

### Lỗi 2: Import Không Cập Nhật Mã Chuyến
**Hiện tượng**: Import thành công nhưng Mã Chuyến không thay đổi

**Nguyên nhân**: 
- Sai tên cột trong Excel
- Thiếu cột Mã Đơn Hàng

**Cách sửa**:
1. Mở lại file Excel
2. Kiểm tra header phải chính xác:
   - ✅ `Mã Chuyến` (có dấu)
   - ❌ `Ma Chuyen` (không dấu)
   - ❌ `mã chuyến` (chữ thường)
3. Kiểm tra cột `Mã Đơn Hàng` phải có giá trị
4. Lưu file
5. Import lại

### Lỗi 3: Mã Chuyến Bị Mất Sau Khi Import
**Hiện tượng**: Import xong, check lại thấy Mã Chuyến trống

**Nguyên nhân**: File Excel có ô trống trong cột Mã Chuyến

**Cách sửa**:
1. Mở file Excel
2. Tìm các ô trống trong cột Mã Chuyến
3. Điền giá trị cho các ô đó (hoặc giữ nguyên nếu muốn để trống)
4. Import lại

### Lỗi 4: Thông Báo "Không tìm thấy đơn hàng"
**Hiện tượng**: Import báo lỗi không tìm thấy một số đơn hàng

**Nguyên nhân**: 
- Mã Đơn Hàng sai
- Đơn hàng đã bị xóa

**Cách sửa**:
1. Kiểm tra cột Mã Đơn Hàng
2. Đối chiếu với danh sách đơn hàng hiện có
3. Xóa hoặc sửa các dòng có mã sai
4. Import lại

---

## 💡 Mẹo Sử Dụng

### Mẹo 1: Đặt Tên Mã Chuyến Ngắn Gọn
✅ **Tốt**: `CH-01`, `Q1`, `SANG`  
❌ **Không tốt**: `Chuyen-So-1-Khu-Vuc-Quan-1-Buoi-Sang`

**Lý do**: Dễ nhìn, dễ nhớ, tiết kiệm thời gian nhập

### Mẹo 2: Thống Nhất Cách Đặt Tên
Ví dụ: Nếu dùng `CH-01`, thì dùng `CH-02`, `CH-03`...  
Không nên lẫn lộn `CH-01`, `Chuyen2`, `tuyen-3`

### Mẹo 3: Dùng Prefix Để Phân Loại
```
Q1, Q2, Q3 → Theo quận
CH-A, CH-B, CH-C → Theo chuyến
TX-Anh, TX-Binh → Theo tài xế
```

### Mẹo 4: Backup File Excel Trước Khi Import
1. Export Phiếu Chuyển
2. Copy file ra 1 bản backup
3. Chỉnh sửa bản gốc
4. Nếu sai, dùng lại bản backup

### Mẹo 5: Import Từng Phần Nếu Dữ Liệu Lớn
Nếu có 1000 đơn hàng:
1. Chia thành 10 file, mỗi file 100 dòng
2. Import từng file một
3. Dễ kiểm soát lỗi hơn

---

## 📊 Ứng Dụng Thực Tế

### 1. Lập Kế Hoạch Giao Hàng
```
Buổi sáng:
- Chuyến SANG-1: 20 đơn (Quận 1, 2, 3)
- Chuyến SANG-2: 15 đơn (Quận 4, 5, 6)

Buổi chiều:
- Chuyến CHIEU-1: 25 đơn (Quận 7, 8)
- Chuyến CHIEU-2: 18 đơn (Quận 9, 10)
```

### 2. Theo Dõi Tiến Độ
- Xuất Phiếu Chuyển theo Mã Chuyến
- Tài xế cập nhật Ký Nhận
- Quản lý biết chuyến nào xong, chuyến nào chưa

### 3. Báo Cáo Hiệu Suất
- Thống kê số đơn mỗi chuyến
- Tính thời gian trung bình mỗi chuyến
- Tối ưu phân bổ đơn hàng

---

## ❓ Câu Hỏi Thường Gặp

### Q1: Mã Chuyến có bắt buộc không?
**A**: Không bắt buộc. Có thể để trống. Hệ thống vẫn chạy bình thường.

### Q2: Một khách hàng có thể có nhiều Mã Chuyến không?
**A**: Không. Mỗi khách hàng chỉ có 1 Mã Chuyến. Nếu cần thay đổi, sửa lại giá trị cũ.

### Q3: Import có ghi đè lên Mã Chuyến cũ không?
**A**: Có. Nếu import file có giá trị mới, sẽ thay thế giá trị cũ.

### Q4: Nếu để trống Mã Chuyến trong Excel khi import?
**A**: Mã Chuyến của khách hàng sẽ bị xóa (set về trống).

### Q5: Có giới hạn độ dài Mã Chuyến không?
**A**: Không có giới hạn cụ thể, nhưng nên giữ dưới 20 ký tự.

### Q6: Mã Chuyến có phân biệt hoa thường không?
**A**: Có. `CH-01` khác với `ch-01`.

### Q7: Có thể dùng tiếng Việt có dấu không?
**A**: Được. Ví dụ: `Chuyến-Đông`, `Tuyến-Sáng`.

### Q8: Nếu import 2 lần, có bị duplicate không?
**A**: Không. Hệ thống sẽ cập nhật theo Mã Đơn Hàng, không tạo mới.

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề không giải quyết được:

1. **Check Console Log**:
   - Bấm F12 trong trình duyệt
   - Tab Console
   - Tìm dòng `[IMPORT] Updated machuyen`
   - Chụp màn hình gửi IT

2. **Liên Hệ IT Support**:
   - Email: it@example.com
   - Hotline: 1900-xxxx
   - Gửi kèm file Excel đang lỗi

3. **Tham Khảo Tài Liệu Kỹ Thuật**:
   - [2050-MACHUYEN_IMPLEMENTATION.md](2050-MACHUYEN_IMPLEMENTATION.md)

---

## 📅 Lịch Sử Cập Nhật

| Ngày | Phiên Bản | Nội Dung |
|------|-----------|----------|
| 2025-01-XX | 1.0.0 | Ra mắt tính năng Mã Chuyến |

---

**Hết**
