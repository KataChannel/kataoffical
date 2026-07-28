# 🔄 Cancel Order Feature - Quick Reference

## ✅ Đã Hoàn Thành

### 1. **Database Schema**
- ✅ Thêm `lydohuy` (Text) vào `Donhang`
- ✅ Thêm `lydohuy` (Text) vào `Dathang`
- ✅ Migration đã chạy thành công: `20251014154936_add_lydohuy_to_orders`

### 2. **Backend Services**
- ✅ `CancelOrderService` - Xử lý logic hủy đơn
- ✅ `CancelOrderController` - API endpoints
- ✅ Module đã được cập nhật

### 3. **API Endpoints**

| Method | Endpoint | Mô Tả |
|--------|----------|-------|
| POST | `/orders/donhang/:id/cancel` | Hủy đơn hàng |
| POST | `/orders/dathang/:id/cancel` | Hủy đơn đặt hàng |
| GET | `/orders/donhang/canceled` | DS đơn hàng đã hủy |
| GET | `/orders/dathang/canceled` | DS đơn đặt hàng đã hủy |

## 🚀 Cách Sử Dụng

### Hủy Đơn Hàng

```bash
POST /orders/donhang/{id}/cancel
Authorization: Bearer {token}
Content-Type: application/json

{
  "lydohuy": "Lý do hủy tối thiểu 10 ký tự"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Đơn hàng đã được hủy và tồn kho đã được hoàn trả",
  "restoredInventory": true,
  "oldStatus": "dagiao"
}
```

## 🔍 Business Rules

### Validation
- ✅ `lydohuy` **bắt buộc**
- ✅ Tối thiểu **10 ký tự**
- ✅ Không thể hủy đơn đã hủy
- ✅ Không thể hủy đơn hoàn thành

### Inventory Management

**Donhang (Xuất Kho):**
- Có PhieuKho → **HOÀN TRẢ** tồn kho (tăng)
- Không PhieuKho → Không đổi

**Dathang (Nhập Kho):**
- Có PhieuKho → **TRỪ LẠI** tồn kho (giảm)
- Không PhieuKho → Không đổi

## 📝 Frontend TODO

### 1. Service Methods
```typescript
// donhang.service.ts
async cancelDonhang(id: string, lydohuy: string): Promise<any> {
  const response = await fetch(`${API}/orders/donhang/${id}/cancel`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ lydohuy })
  });
  return response.json();
}
```

### 2. UI Components
- ❌ **TODO**: Dialog nhập lý do hủy
- ❌ **TODO**: Nút "Hủy Đơn" trong danh sách
- ❌ **TODO**: Hiển thị `lydohuy` khi xem đơn đã hủy
- ❌ **TODO**: Badge status "Đã Hủy" với màu đỏ

### 3. Validation
```typescript
if (lydohuy.trim().length < 10) {
  this.snackBar.open('Lý do hủy phải có ít nhất 10 ký tự', 'Đóng');
  return;
}
```

## 🧪 Test Cases

### ✅ Backend Ready
- ✅ Hủy đơn chưa xuất kho
- ✅ Hủy đơn đã xuất kho → Hoàn trả
- ✅ Validate lydohuy bắt buộc
- ✅ Validate độ dài >= 10
- ✅ Không cho hủy đơn đã hủy
- ✅ Transaction safety

### ❌ Frontend Needed
- ❌ Dialog nhập lý do
- ❌ Xác nhận trước khi hủy
- ❌ Hiển thị thông báo success/error
- ❌ Reload data sau khi hủy

## 📊 Files Created

### Backend
```
api/
├── prisma/
│   └── migrations/
│       └── 20251014154936_add_lydohuy_to_orders/
├── src/
│   └── donhang/
│       ├── cancel-order.service.ts     ✅ NEW
│       ├── cancel-order.controller.ts  ✅ NEW
│       └── donhang.module.ts          ✅ UPDATED
```

### Documentation
```
CANCEL_ORDER_GUIDE.md           ✅ Full guide
CANCEL_ORDER_QUICK_REFERENCE.md ✅ This file
```

## 🔗 Next Steps

1. **Frontend Implementation:**
   - Tạo dialog component
   - Thêm nút hủy vào UI
   - Integrate với service

2. **Testing:**
   - Test API endpoints
   - Test UI flow
   - Test inventory restoration

3. **Deployment:**
   - Deploy backend code
   - Run migration trên production
   - Update frontend

---

**Status:** Backend ✅ Complete | Frontend ❌ Pending  
**Date:** 14/10/2025
