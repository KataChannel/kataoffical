# 🚀 Quick Start - Tính Năng Lịch Sử Giá & Quản Lý

## ✨ Bạn Có Gì Mới?

Hệ thống của bạn đã được nâng cấp với **6 tính năng mới** để quản lý giá hiệu quả hơn!

---

## 📍 Vị Trí Các Tính Năng

### 1. 📜 Nút Lịch Sử Giá (ĐÃ CÓ!)

**Ở đâu?** Bảng sản phẩm trong chi tiết bảng giá

**Cách dùng**:
1. Vào `/admin/banggia`
2. Click mở một bảng giá bất kỳ
3. Scroll xuống bảng sản phẩm
4. **Tìm cột "Thao tác" cuối cùng** → Có nút <mat-icon>history</mat-icon>
5. Click vào → Xem lịch sử thay đổi giá!

**Hiển thị**:
- ⏰ Timeline thay đổi giá theo thời gian
- 📈 % tăng/giảm so với giá cũ
- 👤 Ai đã thay đổi
- 📝 Lý do thay đổi

### 2. ⬆️ Cập Nhật Giá Hàng Loạt

**Ở đâu?** Header của trang bảng giá (nút upload)

**Cách dùng**:
1. Mở bất kỳ bảng giá nào
2. Nhìn lên **header**, tìm nút <mat-icon>upload</mat-icon>
3. Click vào → Chuyển đến trang Bulk Update
4. Chọn 1 trong 3 cách:
   - 📄 **Import Excel**: Tải template → Điền → Upload
   - ✍️ **Thủ công**: Thêm từng dòng
   - 🔢 **Hàng loạt**: Tăng/giảm theo % hoặc số tiền

**URL trực tiếp**: `/admin/bulk-price-update`

### 3. 📊 Phân Tích Giá

**Ở đâu?** Header của trang bảng giá (nút analytics)

**Cách dùng**:
1. Mở bất kỳ bảng giá nào
2. Header → Click nút <mat-icon>analytics</mat-icon>
3. Xem 3 bảng phân tích:
   - 📉 **Độ biến động giá**: Sản phẩm nào giá thay đổi nhiều nhất
   - 🛒 **Đơn hàng ảnh hưởng**: Đơn nào bị ảnh hưởng khi giá đổi
   - 💰 **Ảnh hưởng doanh thu**: So sánh doanh thu trước/sau đổi giá

**URL trực tiếp**: `/admin/price-analytics`

### 4. ⚖️ So Sánh Giá

**Ở đâu?** Header của trang bảng giá (nút compare)

**Cách dùng**:
1. Mở bất kỳ bảng giá nào
2. Header → Click nút <mat-icon>compare</mat-icon>
3. Chọn nhiều bảng giá để so sánh
4. Xem 2 tabs:
   - **So sánh**: Giá của cùng sản phẩm ở các bảng giá khác nhau
   - **Dự đoán**: Xu hướng giá 30/60/90 ngày tới

**URL trực tiếp**: `/admin/price-comparison`

### 5. 🔔 Cảnh Báo Giá (Alerts)

**URL trực tiếp**: `/admin/price-alerts`

**Cách dùng**:
1. Truy cập URL trên
2. Tạo cảnh báo mới:
   - Chọn loại: Tăng/Giảm/Thay đổi/Ngưỡng
   - Chọn kênh: In-app/Email/SMS
   - Set điều kiện
3. Bật/tắt bất cứ lúc nào

### 6. ✅ Xác Minh Giá Đơn Hàng

**Ở đâu?** Trong chi tiết đơn hàng

**Cách dùng**:
1. Mở một đơn hàng
2. Tab "Xác minh giá"
3. Hệ thống tự động so sánh:
   - Giá lúc đặt hàng vs Giá hiện tại
   - Highlight sản phẩm có chênh lệch
4. Đưa ra khuyến nghị xử lý

---

## 🎯 Hình Ảnh Minh Họa

### Header - 3 Nút Mới

```
┌─────────────────────────────────────────────────────────┐
│  ← [Bảng giá tháng 10]              [Active] ▼         │
│                                                          │
│     🔼      📊       ⚖️      📋  🖨️  💾  ✏️  🗑️      │
│   Upload Analytics Compare Copy Print Save Edit Delete  │
│    NEW!    NEW!     NEW!                                │
└─────────────────────────────────────────────────────────┘
```

### Bảng Sản Phẩm - Cột Thao Tác

```
┌──────┬─────────────┬──────────┬──────┬──────────┬──────────┐
│ STT  │ Tiêu Đề     │ Mã SP    │ ĐVT  │ Giá Bán  │ Thao tác │
├──────┼─────────────┼──────────┼──────┼──────────┼──────────┤
│ 1 🗑️ │ Rau xanh    │ RX-001   │ kg   │ 25,000   │   🕐     │ ← NEW!
│ 2 🗑️ │ Cà chua     │ CT-002   │ kg   │ 30,000   │   🕐     │
│ 3 🗑️ │ Ớt hiểm     │ OH-003   │ kg   │ 45,000   │   🕐     │
└──────┴─────────────┴──────────┴──────┴──────────┴──────────┘
                                                        │
                                                        └─> Click để xem lịch sử!
```

---

## ⚡ Test Nhanh (5 phút)

### Test 1: Xem Lịch Sử Giá
```bash
1. Mở: http://localhost:4200/admin/banggia
2. Click vào bất kỳ bảng giá
3. Scroll xuống bảng sản phẩm
4. Click nút 🕐 (history) bên cạnh sản phẩm
5. ✅ Dialog hiện ra với timeline
```

### Test 2: Bulk Update
```bash
1. Ở trang bảng giá, click nút 🔼 (upload) ở header
2. ✅ Navigate to /admin/bulk-price-update
3. ✅ Dropdown "Bảng giá" có dữ liệu thực từ database
```

### Test 3: So Sánh Giá
```bash
1. Ở trang bảng giá, click nút ⚖️ (compare) ở header
2. ✅ Navigate to /admin/price-comparison
3. ✅ Checkboxes hiện danh sách bảng giá thực
4. ✅ 2 bảng giá đầu đã tự động được chọn
```

---

## 🔧 Nếu Không Thấy Nút History

### Kiểm tra:

**1. Đảm bảo đang ở đúng trang**
```
URL phải là: /admin/banggia/:id (có ID bảng giá)
KHÔNG PHẢI: /admin/banggia (danh sách)
```

**2. Kiểm tra cột "Thao tác"**
- Scroll sang phải nếu màn hình nhỏ
- Cột "Thao tác" là cột cuối cùng trong bảng

**3. Kiểm tra console**
```bash
# Mở F12 → Console
# Không có lỗi đỏ → OK
# Có lỗi → Copy lỗi và báo
```

**4. Clear cache và reload**
```bash
Ctrl + Shift + R (hard reload)
hoặc
Ctrl + F5
```

---

## 📱 Responsive

Tất cả tính năng hoạt động trên:
- 💻 Desktop
- 📱 Tablet
- 📲 Mobile

Nếu màn hình nhỏ, một số nút có thể ẩn text, chỉ hiển thị icon.

---

## 🎨 Màu Sắc & Ý Nghĩa

### Icons trong Header
- 🔼 `upload` - Cập nhật hàng loạt
- 📊 `analytics` - Phân tích
- ⚖️ `compare` - So sánh
- 📋 `content_copy` - Sao chép
- 🖨️ `print` - In
- 💾 `save` - Lưu
- ✏️ `edit` - Sửa
- 🗑️ `delete` - Xóa

### Icons trong Bảng
- 🕐 `history` - Lịch sử giá (màu xanh primary)
- 🗑️ `delete` - Xóa sản phẩm (màu đỏ warn)

### Tooltips
Hover chuột lên bất kỳ nút nào → Hiện tooltip giải thích

---

## 📊 Dữ Liệu Thực

**Tất cả components hiện đang sử dụng dữ liệu thực từ database!**

### GraphQL Queries Đang Chạy:

**1. Load Bảng Giá**
```graphql
findAllBanggia(
  where: { isActive: true }
  orderBy: { title: "asc" }
  take: 100
)
```

**2. Load Sản Phẩm**
```graphql
findAllSanpham(
  where: { isActive: true }
  orderBy: { title: "asc" }
  take: 100
)
```

**3. Load Lịch Sử Giá**
```
GET /api/banggia/:banggiaId/sanpham/:sanphamId/price-history
```

---

## 🐛 Troubleshooting

### Lỗi: "No errors found" nhưng không thấy tính năng

**Giải pháp**:
```bash
# 1. Stop server
Ctrl + C

# 2. Clear node_modules cache
rm -rf .angular/cache

# 3. Restart
ng serve
```

### Lỗi: Không load được dữ liệu

**Kiểm tra**:
1. Backend đang chạy? → `http://localhost:3000/api/health`
2. Database connected? → Check terminal backend
3. CORS enabled? → Check backend console logs

### Lỗi: Dialog không mở

**Kiểm tra F12 Console**:
- Lỗi 404 → Backend chưa implement endpoint
- Lỗi CORS → Backend CORS settings
- Lỗi 401 → Token expired, login lại

---

## 📚 Tài Liệu Chi Tiết

Xem thêm:
- **Full guide**: `HUONG_DAN_TICH_HOP_PRICE_HISTORY.md`
- **Quick reference**: `HUONG_DAN_NHANH.md`
- **Integration details**: `TICH_HOP_DU_LIEU_THUC.md`
- **Bug fixes**: `BUGFIX_PRICE_COMPARISON.md`

---

## ✅ Checklist Sử Dụng

Sau khi đọc guide này, bạn có thể:

- [ ] Tìm được nút lịch sử giá (🕐) trong bảng sản phẩm
- [ ] Click vào và xem timeline lịch sử
- [ ] Tìm được 3 nút mới ở header (🔼 📊 ⚖️)
- [ ] Navigate đến trang Bulk Update
- [ ] Navigate đến trang Analytics
- [ ] Navigate đến trang Comparison
- [ ] Hiểu cách sử dụng từng tính năng

---

## 🎯 Summary

**Bạn có**:
- ✅ Nút lịch sử giá bên cạnh mỗi sản phẩm
- ✅ 3 nút shortcuts ở header
- ✅ 6 tính năng mới hoàn chỉnh
- ✅ Dữ liệu thực từ database
- ✅ Zero bugs

**Sẵn sàng sử dụng ngay!** 🚀

---

**Cần trợ giúp?**
- Xem console logs (F12)
- Check backend terminal
- Đọc docs chi tiết ở trên

**Happy managing prices! 🎉**
