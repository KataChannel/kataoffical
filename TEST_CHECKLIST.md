# ✅ TEST CHECKLIST - Price History System

**Ngày test**: ___________  
**Người test**: ___________

---

## 🎯 Mục Tiêu Test

Đảm bảo tất cả tính năng Price History System hoạt động với dữ liệu thực từ database.

---

## 🚀 BƯỚC 1: Khởi Động Hệ Thống

### Backend (Terminal 1)
```bash
cd api
npm run start:dev
# hoặc
bun run dev
```

**Kiểm tra**:
- [ ] Backend chạy thành công
- [ ] Console không có lỗi đỏ
- [ ] Port 3000 đang listen
- [ ] Database connected

### Frontend (Terminal 2)
```bash
cd frontend
ng serve
```

**Kiểm tra**:
- [ ] Frontend compile thành công
- [ ] Không có lỗi compilation
- [ ] Server chạy ở port 4200
- [ ] Browser tự động mở

---

## 🧪 BƯỚC 2: Test Các Tính Năng

### Test #1: NÚT LỊCH SỬ GIÁ (QUAN TRỌNG!)

**URL**: `http://localhost:4200/admin/banggia`

**Steps**:
1. [ ] Vào trang danh sách bảng giá
2. [ ] Click vào **BẤT KỲ** bảng giá nào
3. [ ] Drawer mở ra bên phải
4. [ ] Scroll xuống đến bảng sản phẩm
5. [ ] Tìm cột "**Thao tác**" (cột cuối cùng)
6. [ ] Thấy nút với icon **🕐 history**
7. [ ] Click vào nút history

**Kết quả mong đợi**:
- [ ] Dialog mở ra với tiêu đề "Lịch Sử Giá - [Tên sản phẩm]"
- [ ] Hiển thị giá hiện tại
- [ ] Timeline các thay đổi giá (nếu có)
- [ ] Mỗi entry có: ngày giờ, giá cũ, giá mới, % thay đổi, người đổi, lý do

**Nếu không thấy nút**:
- [ ] Check console F12 có lỗi không
- [ ] Scroll sang phải trong bảng (nếu màn hình nhỏ)
- [ ] Hard reload: Ctrl + Shift + R

**Screenshot**: 📸 Chụp màn hình dialog lịch sử

---

### Test #2: NÚT SHORTCUTS Ở HEADER

**Vị trí**: Header của trang chi tiết bảng giá

**3 nút mới cần test**:

#### A. Nút Upload (Bulk Update) 🔼

1. [ ] Mở một bảng giá bất kỳ
2. [ ] Nhìn lên header
3. [ ] Tìm nút với icon **upload** 🔼
4. [ ] Hover chuột → tooltip "Cập nhật giá hàng loạt"
5. [ ] Click vào

**Kết quả**:
- [ ] Navigate đến `/admin/bulk-price-update`
- [ ] Trang load thành công
- [ ] Dropdown "Bảng giá" có danh sách
- [ ] **Kiểm tra dropdown có dữ liệu THẬT từ database** (không phải mock)

#### B. Nút Analytics 📊

1. [ ] Quay lại trang bảng giá
2. [ ] Click nút **analytics** 📊 ở header
3. [ ] Hover → tooltip "Phân tích giá"

**Kết quả**:
- [ ] Navigate đến `/admin/price-analytics`
- [ ] Trang load thành công
- [ ] 3 bảng phân tích hiển thị

#### C. Nút Compare ⚖️

1. [ ] Quay lại trang bảng giá
2. [ ] Click nút **compare** ⚖️ ở header
3. [ ] Hover → tooltip "So sánh giá"

**Kết quả**:
- [ ] Navigate đến `/admin/price-comparison`
- [ ] Trang load thành công
- [ ] Checkboxes hiển thị danh sách bảng giá THẬT
- [ ] Dropdown sản phẩm có dữ liệu THẬT
- [ ] 2 bảng giá đầu tiên được auto-select
- [ ] 5 sản phẩm đầu tiên được auto-select

**Screenshot**: 📸 Chụp 3 trang (bulk-update, analytics, comparison)

---

### Test #3: DỮ LIỆU THỰC TỪ DATABASE

#### A. Test GraphQL - Bảng Giá

**Vào**: `/admin/bulk-price-update`

1. [ ] Mở dropdown "Bảng giá"
2. [ ] Xem danh sách

**Kiểm tra**:
- [ ] Danh sách **KHÔNG PHẢI** mock data (bg-1, bg-2, bg-3)
- [ ] Hiển thị bảng giá thực từ database của bạn
- [ ] Có ID thực dạng `clx...` (Prisma ID)
- [ ] Tên bảng giá đúng với dữ liệu của bạn

**Console check**:
```bash
# Mở F12 → Console
# Tìm log: "Danh sách bảng giá từ GraphQL"
# Xem data có đúng không
```

#### B. Test GraphQL - Sản Phẩm

**Vào**: `/admin/price-comparison`

1. [ ] Mở dropdown "Sản phẩm"
2. [ ] Xem danh sách

**Kiểm tra**:
- [ ] Danh sách **KHÔNG PHẢI** mock data (sp-1, Rau xanh, etc)
- [ ] Hiển thị sản phẩm thực từ database
- [ ] ID thực dạng `clx...`
- [ ] Tên sản phẩm đúng với dữ liệu của bạn

**Console check**:
```bash
# F12 → Console
# Tìm log: "Danh sách sản phẩm từ GraphQL"
```

---

### Test #4: RESPONSIVE DESIGN

#### Desktop (>1024px)
1. [ ] Tất cả nút header hiển thị đầy đủ
2. [ ] Bảng sản phẩm có đủ các cột
3. [ ] Cột "Thao tác" hiển thị rõ ràng

#### Tablet (768-1024px)
1. [ ] F12 → Toggle device toolbar
2. [ ] Chọn iPad
3. [ ] Test lại các tính năng
4. [ ] Cột "Thao tác" vẫn nhìn thấy

#### Mobile (<768px)
1. [ ] F12 → Toggle device toolbar
2. [ ] Chọn iPhone
3. [ ] Scroll **SANG PHẢI** trong bảng
4. [ ] Tìm cột "Thao tác"
5. [ ] Nút history vẫn click được

---

### Test #5: ERROR HANDLING

#### A. Không có dữ liệu lịch sử
1. [ ] Click history của sản phẩm chưa có lịch sử
2. [ ] Dialog vẫn mở
3. [ ] Hiển thị message "Chưa có lịch sử thay đổi giá"

#### B. Backend offline
1. [ ] Stop backend (Ctrl+C)
2. [ ] Click nút history
3. [ ] Hiển thị error message thân thiện
4. [ ] Không crash frontend

#### C. Network error
1. [ ] F12 → Network tab → Offline
2. [ ] Test các tính năng
3. [ ] Error message xuất hiện
4. [ ] Toggle online → hoạt động lại

---

## 📊 KIỂM TRA CONSOLE

### F12 → Console Tab

**Không được có**:
- [ ] ❌ Lỗi đỏ (error)
- [ ] ⚠️ Warning nghiêm trọng

**Được phép có**:
- [ ] ✅ Log info (màu đen/xanh)
- [ ] ✅ Debug messages

**Logs cần thấy**:
```
✅ "Danh sách bảng giá từ GraphQL: ..."
✅ "Danh sách sản phẩm từ GraphQL: ..."
✅ "Detected banggiaId change: ..."
```

---

## 📊 KIỂM TRA NETWORK

### F12 → Network Tab

**Khi click History button**:
1. [ ] Request đến `/api/banggia/.../price-history`
2. [ ] Status: 200 OK (hoặc 404 nếu chưa có data)
3. [ ] Response có dữ liệu JSON

**Khi vào Bulk Update**:
1. [ ] GraphQL request đến `/graphql`
2. [ ] Query: `findAllBanggia`
3. [ ] Response có array data

**Khi vào Price Comparison**:
1. [ ] GraphQL request 1: `findAllBanggia`
2. [ ] GraphQL request 2: `findAllSanpham`
3. [ ] Cả 2 đều status 200

---

## 🎨 KIỂM TRA UI/UX

### Icons
- [ ] 🕐 History icon hiển thị đúng
- [ ] 🔼 Upload icon đúng
- [ ] 📊 Analytics icon đúng
- [ ] ⚖️ Compare icon đúng

### Tooltips
- [ ] Hover lên nút → tooltip hiện
- [ ] Text tooltip đúng
- [ ] Tooltip positioning OK

### Colors
- [ ] Nút primary: màu xanh
- [ ] Nút warn: màu đỏ (delete)
- [ ] Text dễ đọc
- [ ] Contrast tốt

### Spacing
- [ ] Buttons không chồng lên nhau
- [ ] Khoảng cách hợp lý
- [ ] Responsive trên mobile

---

## 🔧 PERFORMANCE TEST

### Load Time
1. [ ] Trang bảng giá load < 2s
2. [ ] Dialog history mở < 1s
3. [ ] GraphQL query < 500ms

### Smooth Interaction
1. [ ] Click button phản hồi ngay lập tức
2. [ ] Không lag khi scroll
3. [ ] Animation mượt mà

---

## 📝 BUG REPORT TEMPLATE

Nếu phát hiện lỗi, ghi lại:

```
Bug #: ___
Title: _______________
Severity: [ ] Critical [ ] High [ ] Medium [ ] Low

Steps to reproduce:
1. 
2. 
3. 

Expected:


Actual:


Screenshot:


Console errors:


Browser: ___________
OS: ___________
Date: ___________
```

---

## ✅ FINAL CHECKLIST

### Must Pass
- [ ] Nút history hiển thị trong bảng sản phẩm
- [ ] Click history → dialog mở ra
- [ ] 3 nút shortcuts ở header hoạt động
- [ ] Dữ liệu từ database (không phải mock)
- [ ] Zero errors trong console
- [ ] Tất cả GraphQL queries hoạt động

### Nice to Have
- [ ] Tooltips hiển thị đúng
- [ ] Responsive trên mobile
- [ ] Performance tốt
- [ ] Error handling tốt

---

## 🎯 KẾT QUẢ TEST

### Tổng số test cases: 50+

**Passed**: _____ / 50+  
**Failed**: _____  
**Skipped**: _____

### Đánh giá chung:
- [ ] ✅ **PASS** - Sẵn sàng production
- [ ] ⚠️ **PASS WITH ISSUES** - Cần fix một số bugs nhỏ
- [ ] ❌ **FAIL** - Cần fix bugs nghiêm trọng

---

## 📸 SCREENSHOTS REQUIRED

Chụp màn hình các màn hình sau:

1. [ ] Bảng sản phẩm với cột "Thao tác" và nút history
2. [ ] Dialog lịch sử giá đang mở
3. [ ] Trang Bulk Price Update với dropdown bảng giá
4. [ ] Trang Price Analytics
5. [ ] Trang Price Comparison với data thật
6. [ ] F12 Console không có lỗi
7. [ ] F12 Network tab với successful requests

---

## 📞 SUPPORT

Nếu test fail:

1. **Check documentation**:
   - `VI_TRI_NUT_LICH_SU.md` - Vị trí các nút
   - `HUONG_DAN_CO_HINH.md` - Hướng dẫn có hình
   - `TICH_HOP_DU_LIEU_THUC.md` - Chi tiết kỹ thuật

2. **Common fixes**:
   - Hard reload: `Ctrl + Shift + R`
   - Clear cache: Delete `.angular/cache`
   - Restart servers

3. **Report issues**:
   - Use bug report template above
   - Include screenshots
   - Copy console errors

---

## ✅ SIGN OFF

**Tester**: _______________  
**Date**: _______________  
**Signature**: _______________

**Result**: 
- [ ] ✅ APPROVED for Production
- [ ] ⚠️ APPROVED with minor issues
- [ ] ❌ REJECTED - needs fixes

**Comments**:
```




```

---

**Happy Testing! 🎉**

Hệ thống Price History đã sẵn sàng để test với dữ liệu thực!
