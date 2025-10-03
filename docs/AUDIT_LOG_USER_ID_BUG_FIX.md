# 🔧 BUG FIX: AUDIT LOG KHÔNG GHI NHẬN USER ID

## ❌ Vấn đề đã phát hiện

Khi test **tạo đơn hàng, import đơn hàng, đặt hàng**, audit log **không ghi nhận userId** vì:

### **Root Cause:**
- Các controller có `@Audit` decorator nhưng **thiếu `@UseGuards(JwtAuthGuard)`**
- Không có JWT authentication → `request.user` = `undefined` 
- Audit interceptor không thể lấy `userId` và `userEmail`

## ✅ Giải pháp đã áp dụng

### **1. Sửa DonhangController**
📍 File: `/api/src/donhang/donhang.controller.ts`

**Đã thêm `@UseGuards(JwtAuthGuard)` cho tất cả endpoints có `@Audit`:**
- ✅ `POST /` - Create Donhang
- ✅ `POST /importold` - Import Donhang Cu  
- ✅ `POST /importold/confirmed` - Import Donhang Cu Confirmed
- ✅ `POST /import` - Import Donhang
- ✅ `PATCH /phieugiao/:id` - Update Phieugiao
- ✅ `PATCH /bulk` - Update bulk Donhang
- ✅ `PATCH /:id` - Update Donhang
- ✅ `DELETE /bulk` - Delete Donhang bulk
- ✅ `DELETE /:id` - Delete Donhang
- ✅ `POST /:id/dagiao` - Đã giao
- ✅ `POST /:id/danhan` - Đã nhận
- ✅ `GET /autoCompleteOrdersDaily` - Manual Auto Complete
- ✅ `POST /manualAutoComplete` - Manual Auto Complete with date
- ✅ `POST /complete-pending-deliveries/:sanphamId` - Complete Pending Deliveries

### **2. Sửa DathangController** 
📍 File: `/api/src/dathang/dathang.controller.ts`

**Đã thêm `@UseGuards(JwtAuthGuard)` cho tất cả endpoints có `@Audit`:**
- ✅ `POST /` - Create Dathang
- ✅ `POST /import` - Import Dathang
- ✅ `POST /importcu` - Import Dathang Cu  
- ✅ `POST /bynhucau` - Create Dathang by nhu cau
- ✅ `PATCH /:id` - Update Dathang
- ✅ `DELETE /:id` - Delete Dathang
- ✅ `POST /deletebulk` - Delete Bulk Dathang
- ✅ `POST /complete-pending-receipts/:sanphamId` - Complete Pending Receipts

### **3. Đã thêm imports cần thiết:**
```typescript
// Thêm vào imports
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
```

## 🔍 Pattern đã áp dụng

**Trước (BUG):**
```typescript
@Post()
@Audit({entity: 'Create Donhang', action: AuditAction.CREATE, includeResponse: true})
create(@Body() createDonhangDto: any) {
  // request.user = undefined → userId = null trong audit log
  return this.donhangService.create(createDonhangDto);
}
```

**Sau (FIXED):**
```typescript
@Post()
@UseGuards(JwtAuthGuard)  // ← THÊM DÒNG NÀY
@Audit({entity: 'Create Donhang', action: AuditAction.CREATE, includeResponse: true})
create(@Body() createDonhangDto: any) {
  // request.user = {id: "userId", email: "user@email.com"} → audit log có đầy đủ user info
  return this.donhangService.create(createDonhangDto);
}
```

## 🎯 Kết quả

### **Trước khi sửa:**
```json
{
  "entityName": "Create Donhang",
  "action": "CREATE", 
  "userId": null,           // ❌ NULL
  "userEmail": null,        // ❌ NULL
  "ipAddress": "192.168.1.1",
  "metadata": {
    "authenticated": false  // ❌ FALSE
  }
}
```

### **Sau khi sửa:**
```json
{
  "entityName": "Create Donhang", 
  "action": "CREATE",
  "userId": "user-123",           // ✅ CÓ USER ID
  "userEmail": "user@email.com",  // ✅ CÓ EMAIL  
  "ipAddress": "192.168.1.1",
  "metadata": {
    "authenticated": true         // ✅ TRUE
  }
}
```

## ⚠️ Lưu ý quan trọng

1. **Breaking Change:** Các endpoints này giờ yêu cầu authentication
2. **Frontend cần update:** Đảm bảo gửi JWT token trong header `Authorization: Bearer <token>`
3. **Testing:** Cần test lại với valid JWT token

## 🔄 Endpoints cần kiểm tra tiếp

Có thể còn controllers khác có cùng vấn đề:
- `nhomkhachhang.controller.ts`
- `sanpham.controller.ts` 
- `phieukho.controller.ts`
- `permission.controller.ts`
- `role.controller.ts`

---

**✅ BUG FIXED:** Giờ tất cả audit logs từ donhang và dathang operations đều sẽ ghi nhận đúng user đã xác thực!