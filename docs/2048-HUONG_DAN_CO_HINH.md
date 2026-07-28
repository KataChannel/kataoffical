# 🖼️ Hướng Dẫn Có Hình - Vị Trí Nút Lịch Sử Giá

## 📍 Tìm Nút Lịch Sử Giá (History Button)

### Bước 1: Vào Danh Sách Bảng Giá

```
URL: http://localhost:4200/admin/banggia
```

**Màn hình sẽ hiển thị**:
```
┌─────────────────────────────────────────────────────────────┐
│  QUẢN LÝ BẢNG GIÁ                                      [+]  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │ 📋 Bảng giá tháng 10/2025                          │ ← Click vào đây!
│  │ Loại: Bán sỉ | Trạng thái: Đang bán               │    │
│  │ Từ: 01/10/2025 - Đến: 31/10/2025                  │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │ 📋 Bảng giá bán lẻ                                 │    │
│  │ Loại: Bán lẻ | Trạng thái: Đang bán               │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

### Bước 2: Click Vào Một Bảng Giá

**Drawer sẽ mở ra bên phải**, hiển thị chi tiết:

```
┌─────────────────────────────────────────────────────────────────────┐
│  ←  Bảng giá tháng 10/2025          [Active ▼] 🔼 📊 ⚖️ 📋 🖨️ 💾  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Tiêu đề: [Bảng giá tháng 10/2025      ]                           │
│  Loại:    [Bán sỉ ▼]                                                │
│  Bắt đầu: [01/10/2025 📅]  Kết thúc: [31/10/2025 📅]               │
│                                                                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                                      │
│  📦 Sản phẩm: [Tìm kiếm sản phẩm...                      ] [Thêm]  │
│                                                                      │
│  ⬇️ SCROLL XUỐNG ĐÂY! ⬇️                                           │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Chú ý 3 nút mới ở header**:
- 🔼 Upload (Bulk Update)
- 📊 Analytics (Phân tích)
- ⚖️ Compare (So sánh)

---

### Bước 3: Scroll Xuống - Tìm Bảng Sản Phẩm

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                         BẢNG SẢN PHẨM                                         │
├─────┬────────────────┬──────────┬──────┬────────────┬─────────────────────┐
│ STT │ Tiêu Đề        │ Mã SP    │ ĐVT  │ Giá Bán    │ Thao tác           │
├─────┼────────────────┼──────────┼──────┼────────────┼─────────────────────┤
│ 1🗑️ │ Rau xanh       │ RX-001   │ kg   │ 25,000₫    │ [🕐 History]       │ ← ĐÂY!
├─────┼────────────────┼──────────┼──────┼────────────┼─────────────────────┤
│ 2🗑️ │ Rau cải ngọt   │ RCN-002  │ kg   │ 22,000₫    │ [🕐 History]       │
├─────┼────────────────┼──────────┼──────┼────────────┼─────────────────────┤
│ 3🗑️ │ Cà chua        │ CT-003   │ kg   │ 30,000₫    │ [🕐 History]       │
├─────┼────────────────┼──────────┼──────┼────────────┼─────────────────────┤
│ 4🗑️ │ Ớt hiểm        │ OH-004   │ kg   │ 45,000₫    │ [🕐 History]       │
├─────┼────────────────┼──────────┼──────┼────────────┼─────────────────────┤
│ 5🗑️ │ Dưa leo        │ DL-005   │ kg   │ 18,000₫    │ [🕐 History]       │
└─────┴────────────────┴──────────┴──────┴────────────┴─────────────────────┘
                                                                │
                                                                │
                                                    NÚT NÀY ĐÂY! ──┘
```

**Tìm cột "Thao tác" (cuối cùng bên phải)**

---

### Bước 4: Click Nút History 🕐

**Dialog sẽ mở ra**:

```
┌────────────────────────────────────────────────────────────────────────┐
│  Lịch Sử Giá - Rau xanh                                           [✕]  │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Giá hiện tại: 25,000₫                                                 │
│                                                                         │
│  ━━━━━━━━━━━━━━━━━━━ TIMELINE ━━━━━━━━━━━━━━━━━━━                   │
│                                                                         │
│  📅 15/10/2025 10:30 AM                                                │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │ Giá cũ:   20,000₫                                            │    │
│  │ Giá mới:  25,000₫                                            │    │
│  │ Thay đổi: +5,000₫  (+25.0%) 📈                              │    │
│  │                                                               │    │
│  │ 👤 Người thay đổi: Nguyễn Văn A                              │    │
│  │ 📝 Lý do: Tăng giá theo mùa vụ                               │    │
│  │ 📋 Bảng giá: BG-10-2025 - Bảng giá tháng 10                  │    │
│  │ 🏷️  Mã SP: RX-001 - Rau xanh                                 │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                         │
│  📅 01/10/2025 09:00 AM                                                │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │ Giá cũ:   22,000₫                                            │    │
│  │ Giá mới:  20,000₫                                            │    │
│  │ Thay đổi: -2,000₫  (-9.1%) 📉                               │    │
│  │                                                               │    │
│  │ 👤 Người thay đổi: Trần Thị B                                │    │
│  │ 📝 Lý do: Điều chỉnh theo thị trường                         │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                         │
│  📅 15/09/2025 02:00 PM                                                │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │ Giá cũ:   18,000₫                                            │    │
│  │ Giá mới:  22,000₫                                            │    │
│  │ Thay đổi: +4,000₫  (+22.2%) 📈                              │    │
│  │                                                               │    │
│  │ 👤 Người thay đổi: Lê Văn C                                  │    │
│  │ 📝 Lý do: Khuyến mãi kết thúc                                │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                         │
│                                                   [Đóng]              │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📱 Trên Màn Hình Nhỏ (Mobile/Tablet)

### Cột "Thao tác" có thể bị ẩn

**Giải pháp**: Scroll **SANG PHẢI** trong bảng

```
┌──────────────────────────────────────┐
│ STT │ Tiêu Đề    │ Mã SP   │        │
├─────┼────────────┼─────────┼────────┤
│ 1🗑️ │ Rau xanh   │ RX-001  │  ➡️    │ ← Scroll sang phải!
│ 2🗑️ │ Rau cải    │ RCN-002 │  ➡️    │
└─────┴────────────┴─────────┴────────┘

                     ⬇️ Scroll

┌──────────────────────────────────────┐
│ ĐVT  │ Giá Bán   │ Thao tác          │
├──────┼───────────┼───────────────────┤
│ kg   │ 25,000₫   │ [🕐 History]      │ ← Thấy rồi!
│ kg   │ 22,000₫   │ [🕐 History]      │
└──────┴───────────┴───────────────────┘
```

---

## 🎯 Các Nút Khác Trong Header

### Khi mở chi tiết bảng giá, nhìn lên Header:

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Bảng giá tháng 10                                            │
│                                                                  │
│  [Active ▼]  [🔼]  [📊]  [⚖️]  [📋]  [🖨️]  [💾]  [✏️]  [🗑️]   │
│              Upload Analytics Compare Copy Print Save Edit Del  │
│                NEW!    NEW!     NEW!                             │
└─────────────────────────────────────────────────────────────────┘
```

### Mô tả từng nút:

**Nút mới (Phase 2)**:
- 🔼 **Upload** → Cập nhật giá hàng loạt (Bulk Update)
- 📊 **Analytics** → Phân tích giá, độ biến động
- ⚖️ **Compare** → So sánh giá nhiều bảng giá

**Nút cũ (đã có từ trước)**:
- 📋 **Copy** → Sao chép bảng giá
- 🖨️ **Print** → In bảng giá
- 💾 **Save** → Lưu thay đổi (chỉ hiện khi đang edit)
- ✏️ **Edit** → Bật chế độ chỉnh sửa
- 🗑️ **Delete** → Xóa bảng giá

---

## 🔍 Tooltip Giúp Bạn

**Hover chuột** lên bất kỳ nút nào → Tooltip hiện ra

```
     🕐
     │
     └─── "Xem lịch sử giá"
```

```
     🔼
     │
     └─── "Cập nhật giá hàng loạt"
```

```
     📊
     │
     └─── "Phân tích giá"
```

```
     ⚖️
     │
     └─── "So sánh giá"
```

---

## 🎬 Flow Đầy Đủ

### Từ đầu đến cuối:

1. **Vào danh sách bảng giá**
   ```
   http://localhost:4200/admin/banggia
   ```

2. **Click vào một bảng giá**
   - Drawer mở ra bên phải

3. **Scroll xuống**
   - Tìm bảng sản phẩm

4. **Tìm cột "Thao tác"**
   - Cột cuối cùng
   - Có nút 🕐

5. **Click nút History**
   - Dialog mở ra
   - Xem timeline lịch sử

6. **Tùy chọn: Sử dụng các nút khác**
   - Click 🔼 → Bulk update
   - Click 📊 → Analytics
   - Click ⚖️ → Comparison

---

## 🐛 Nếu Không Thấy

### Checklist Debug:

**1. Kiểm tra URL**
```
✅ Đúng: /admin/banggia/clx123abc... (có ID)
❌ Sai:  /admin/banggia (không có ID)
```

**2. Kiểm tra đã scroll chưa**
```
Bảng sản phẩm ở DƯỚI form chi tiết
→ Phải scroll xuống mới thấy
```

**3. Kiểm tra cột Thao tác**
```
Nếu màn hình nhỏ:
→ Scroll SANG PHẢI trong bảng
```

**4. Kiểm tra console**
```bash
F12 → Console tab
# Không có lỗi đỏ → OK
# Có lỗi → Report lỗi
```

**5. Hard reload**
```bash
Ctrl + Shift + R
# hoặc
Ctrl + F5
```

---

## ✨ Tips & Tricks

### 1. Keyboard Shortcuts

```
Esc     → Đóng dialog
F12     → Mở DevTools
Ctrl+F  → Tìm kiếm trong trang
```

### 2. Xem Nhanh

Thay vì click từng nút History:
- Mở một dialog
- Xem xong → Đóng
- Click nút History sản phẩm khác
- Lặp lại

### 3. Export Data

Trong dialog lịch sử:
- Có thể copy text
- Hoặc screenshot (Print Screen)

---

## 📊 Màu Sắc Quan Trọng

### Trong Timeline:

**📈 Tăng giá**:
- Màu đỏ hoặc cam
- Icon: trending_up

**📉 Giảm giá**:
- Màu xanh lá
- Icon: trending_down

**─ Không đổi**:
- Màu xám
- Icon: trending_flat

---

## 🎯 Tóm Tắt Vị Trí

```
1. Vào /admin/banggia
2. Click một bảng giá
3. Scroll xuống
4. Tìm bảng sản phẩm
5. Cột cuối cùng "Thao tác"
6. Nút 🕐 History
7. Click → Dialog mở!
```

---

## 📞 Cần Trợ Giúp?

### Nếu vẫn không thấy nút:

1. **Check browser console (F12)**
   - Xem có lỗi gì không
   - Copy lỗi và báo cáo

2. **Take screenshot**
   - Chụp màn hình toàn bộ
   - Gửi để được hỗ trợ

3. **Check backend**
   - Backend có đang chạy?
   - Port 3000 có active?

---

**Chúc bạn thành công! 🎉**

Nút lịch sử giá đã có sẵn trong bảng sản phẩm của bạn rồi đó!
