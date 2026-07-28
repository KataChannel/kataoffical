# Hướng Dẫn Sử Dụng Mã Chuyến

> **Tính năng mới**: Quản lý mã tuyến đường giao hàng cho khách hàng

---

## 🎯 Mã Chuyến Là Gì?

**Mã Chuyến** giúp phân chia khách hàng theo tuyến đường giao hàng để tối ưu hóa việc phân công tài xế.

**Ví dụ**: `CH-01`, `Q1`, `TUYEN-DONG`, `SANG-A`

---

## 📝 Cách 1: Sửa Trực Tiếp Trong Form Khách Hàng

### Bước 1-2-3-4:
```
Quản Lý → Khách Hàng → Click tên khách hàng → Nút "Sửa" (✏️)
```

### Bước 5: Nhập Mã Chuyến
- Kéo xuống tìm ô **"Mã Chuyến"**
- Nhập mã (ví dụ: `CH-01`)

### Bước 6: Lưu
- Click nút **"Lưu"** (góc phải trên)
- Chờ thông báo thành công

---

## 📊 Cách 2: Cập Nhật Hàng Loạt Qua Excel

### Bước 1: Xuất Phiếu Chuyển
```
Quản Lý → Đơn Hàng → "Xuất Phiếu Chuyển"
```

### Bước 2: Sửa File Excel
1. Mở file `PhieuChuyen_*.xlsx`
2. Tìm cột **"Mã Chuyến"**
3. Sửa giá trị theo ý muốn:

```
| Mã Đơn Hàng | Mã Chuyến | Tên Khách Hàng |
|-------------|-----------|----------------|
| DH-001      | CH-01     | Nguyễn Văn A   |
| DH-002      | CH-01     | Trần Thị B     |
| DH-003      | CH-02     | Lê Văn C       |
```

4. Lưu file (Ctrl+S)

### Bước 3: Import Lại
```
Quản Lý → Đơn Hàng → "Nhập Phiếu Chuyển" → Chọn file → Open
```

Chờ thông báo "Import thành công" ✅

---

## ⚠️ Lưu Ý Quan Trọng

### ✅ NÊN:
- Đặt tên ngắn gọn: `CH-01`, `Q1`, `SANG`
- Thống nhất cách đặt tên
- Backup file Excel trước khi import

### ❌ KHÔNG NÊN:
- **KHÔNG** xóa hoặc sửa cột "Mã Đơn Hàng" trong Excel
- **KHÔNG** xóa header (dòng tiêu đề)
- Đặt tên quá dài hoặc phức tạp

---

## 💡 Ví Dụ Thực Tế

### Phân Theo Quận:
```
Q1, Q2, Q3, Q4, Q5...
```

### Phân Theo Buổi:
```
SANG, CHIEU, TOI
```

### Phân Theo Tài Xế:
```
TX-ANH, TX-BINH, TX-CUONG
```

### Phân Kết Hợp:
```
Q1-SANG, Q1-CHIEU
Q2-SANG, Q2-CHIEU
```

---

## 🐛 Xử Lý Lỗi Nhanh

| Lỗi | Nguyên Nhân | Cách Sửa |
|-----|-------------|----------|
| Không sửa được | Chưa click nút "Sửa" | Click nút ✏️ trước |
| Import không cập nhật | Sai tên cột Excel | Phải đúng "Mã Chuyến" (có dấu) |
| Mã chuyến bị mất | Excel có ô trống | Điền giá trị vào ô trống |

---

## ❓ Câu Hỏi Nhanh

**Q: Mã Chuyến có bắt buộc không?**  
A: Không. Có thể để trống.

**Q: Import có ghi đè lên giá trị cũ không?**  
A: Có. Giá trị mới sẽ thay thế giá trị cũ.

**Q: Có phân biệt hoa thường không?**  
A: Có. `CH-01` khác `ch-01`.

**Q: Một khách hàng có nhiều mã chuyến được không?**  
A: Không. Mỗi khách hàng chỉ 1 mã chuyến.

---

## 🎯 Quy Trình Làm Việc Khuyến Nghị

### Lần Đầu Thiết Lập:
1. Xuất Phiếu Chuyển
2. Phân loại khách hàng (theo quận/tuyến/tài xế)
3. Điền Mã Chuyến vào Excel
4. Import lại
5. Kiểm tra kết quả

### Cập Nhật Định Kỳ:
1. Xuất Phiếu Chuyển
2. Chỉnh sửa khách hàng mới/thay đổi
3. Import lại

### Sửa Nhanh 1 Khách:
1. Vào form khách hàng
2. Sửa → Nhập Mã Chuyến → Lưu

---

## 📞 Hỗ Trợ

Xem thêm: [HUONG_DAN_MA_CHUYEN_CHI_TIET.md](2050-HUONG_DAN_MA_CHUYEN.md)

---

**Chúc bạn sử dụng hiệu quả!** 🚀
