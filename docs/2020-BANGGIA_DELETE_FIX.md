# Fix: Foreign Key Constraint Violation on Banggia Delete

## Issue
Khi xóa bảng giá (`Banggia`), hệ thống báo lỗi foreign key constraint:
```
Foreign key constraint violated on the constraint: `Banggiasanpham_banggiaId_fkey`
```

## Root Cause
Method `DeleteBanggia()` trong `banggia-graphql.service.ts` chỉ xóa trực tiếp bảng giá mà không xóa các bản ghi liên quan trước, dẫn đến vi phạm ràng buộc khóa ngoại.

### Các quan hệ của Banggia:
```prisma
model Banggia {
  sanpham   Banggiasanpham[]  // ❌ Chưa xóa (gây lỗi)
  Donhang   Donhang[]         // Cần kiểm tra
  khachhang Khachhang[]       // ❌ Chưa disconnect
}
```

## Solution
Cập nhật method `DeleteBanggia()` để thực hiện cascading delete theo đúng thứ tự:

### File: `frontend/src/app/admin/banggia/banggia-graphql.service.ts`

**Trước khi fix:**
```typescript
async DeleteBanggia(item: any) {    
  try {
    // ❌ Xóa trực tiếp mà không xử lý foreign keys
    await this._GraphqlService.deleteOne('banggia', { id: item.id });
    await this.getAllBanggia();
  } catch (error) {
    console.error('Lỗi xóa bảng giá:', error);
    throw error;
  }
}
```

**Sau khi fix:**
```typescript
async DeleteBanggia(item: any) {    
  try {
    // 1. Disconnect khách hàng (many-to-many relationship)
    await this._GraphqlService.updateOne('banggia', 
      { id: item.id }, 
      { khachhang: { set: [] } }
    );

    // 2. Lấy tất cả Banggiasanpham liên quan
    const banggiaSanpham = await this._GraphqlService.findMany('banggiasanpham', {
      where: { banggiaId: item.id },
      select: { id: true }
    });

    // 3. Xóa từng Banggiasanpham
    for (const bgsp of banggiaSanpham) {
      await this._GraphqlService.deleteOne('banggiasanpham', { id: bgsp.id });
    }

    // 4. Xóa bảng giá
    await this._GraphqlService.deleteOne('banggia', { id: item.id });
    
    // 5. Refresh danh sách
    await this.getAllBanggia();
  } catch (error) {
    console.error('Lỗi xóa bảng giá:', error);
    throw error;
  }
}
```

## Quy trình xóa chi tiết

### 1. Disconnect Khách hàng (Many-to-Many)
```typescript
await this._GraphqlService.updateOne('banggia', 
  { id: item.id }, 
  { khachhang: { set: [] } }
);
```
- Xóa tất cả liên kết với khách hàng
- Quan hệ many-to-many cần disconnect trước khi xóa

### 2. Lấy danh sách Banggiasanpham
```typescript
const banggiaSanpham = await this._GraphqlService.findMany('banggiasanpham', {
  where: { banggiaId: item.id },
  select: { id: true }
});
```
- Tìm tất cả sản phẩm trong bảng giá
- Chỉ lấy `id` để tối ưu performance

### 3. Xóa từng Banggiasanpham
```typescript
for (const bgsp of banggiaSanpham) {
  await this._GraphqlService.deleteOne('banggiasanpham', { id: bgsp.id });
}
```
- Xóa tuần tự từng sản phẩm trong bảng giá
- Không thể dùng `deleteMany` vì GraphQL service chưa support

### 4. Xóa Banggia
```typescript
await this._GraphqlService.deleteOne('banggia', { id: item.id });
```
- Sau khi xóa hết foreign keys, mới xóa bảng giá chính

### 5. Refresh danh sách
```typescript
await this.getAllBanggia();
```
- Tải lại dữ liệu để cập nhật UI

## Lưu ý kỹ thuật

### Tại sao không dùng deleteMany?
```typescript
// ❌ Không hoạt động - GraphQL service chưa có deleteMany
await this._GraphqlService.deleteMany('banggiasanpham', {
  where: { banggiaId: item.id }
});
```

GraphQL service hiện tại chỉ support:
- ✅ `findMany()` - Tìm nhiều records
- ✅ `deleteOne()` - Xóa 1 record
- ❌ `deleteMany()` - Chưa được implement

### Performance Consideration
- **Hiện tại**: Loop xóa từng item (O(n) requests)
- **Tối ưu trong tương lai**: 
  - Thêm `deleteMany()` vào GraphQL service
  - Hoặc tạo custom mutation `deleteBanggiaWithRelations`

## Database Schema Context

```prisma
model Banggia {
  id        String           @id @default(uuid())
  title     String?
  mabanggia String?
  type      String?
  batdau    DateTime?
  ketthuc   DateTime?
  status    String?
  isActive  Boolean          @default(true)
  
  // Relations
  sanpham   Banggiasanpham[]  // ✅ Đã xử lý
  Donhang   Donhang[]         // ⚠️ Cần kiểm tra nếu có đơn hàng
  khachhang Khachhang[]       // ✅ Đã disconnect
}

model Banggiasanpham {
  id         String   @id @default(uuid())
  banggiaId  String   // ← Foreign key constraint
  sanphamId  String
  giaban     Decimal
  
  banggia    Banggia  @relation(fields: [banggiaId], references: [id])
  sanpham    Sanpham  @relation(fields: [sanphamId], references: [id])
}
```

## Testing

### Test Cases
1. ✅ Xóa bảng giá không có sản phẩm
2. ✅ Xóa bảng giá có 1 sản phẩm
3. ✅ Xóa bảng giá có nhiều sản phẩm
4. ✅ Xóa bảng giá có khách hàng liên kết
5. ✅ Xóa nhiều bảng giá cùng lúc (bulk delete)
6. ⚠️ Xóa bảng giá đang được sử dụng trong đơn hàng (cần handle)

### Expected Results
```bash
# Test xóa 1 bảng giá
✅ Disconnect khách hàng
✅ Xóa X sản phẩm trong bảng giá
✅ Xóa bảng giá thành công
✅ UI refresh và hiển thị snackbar

# Test bulk delete 3 bảng giá
✅ Xóa thành công 3 bảng giá, 0 lỗi
```

## Error Handling

### Các lỗi có thể xảy ra:

1. **Banggia đang được sử dụng trong Donhang**
   - Hiện tại: Chưa handle
   - Solution: Check trước khi xóa
   ```typescript
   const donhangCount = await this._GraphqlService.count('donhang', {
     where: { banggiaId: item.id }
   });
   if (donhangCount > 0) {
     throw new Error('Không thể xóa bảng giá đang được sử dụng trong đơn hàng');
   }
   ```

2. **Network error khi xóa**
   - Đã handle: Try-catch và throw error
   - UI sẽ hiển thị snackbar lỗi

3. **Xóa một số thành công, một số thất bại**
   - Đã handle: Counter trong `DeleteListItem()`
   - Hiển thị: "Xóa thành công X bảng giá, Y lỗi"

## Comparison với Sanpham Delete Fix

| Aspect | Sanpham | Banggia |
|--------|---------|---------|
| Related tables | 8 tables | 2 tables (sanpham, khachhang) |
| Delete method | Backend service | Frontend GraphQL loop |
| Transaction | ✅ Backend transaction | ❌ Separate GraphQL calls |
| Performance | Fast (1 request) | Slower (N+2 requests) |

## Future Improvements

### 1. Backend Batch Delete Service
Tạo method trong backend để xử lý cascading delete:

```typescript
// api/src/banggia/banggia.service.ts
async deleteBanggiaWithRelations(id: string) {
  return this.prisma.$transaction(async (tx) => {
    // Disconnect khách hàng
    await tx.banggia.update({
      where: { id },
      data: { khachhang: { set: [] } }
    });
    
    // Xóa Banggiasanpham
    await tx.banggiasanpham.deleteMany({
      where: { banggiaId: id }
    });
    
    // Xóa Banggia
    return await tx.banggia.delete({ where: { id } });
  });
}
```

### 2. GraphQL deleteMany Support
Thêm mutation vào GraphQL service:

```typescript
async deleteMany<T = any>(
  modelName: string,
  where: any
): Promise<{ count: number }> {
  // Implementation
}
```

### 3. Validation Before Delete
Kiểm tra các điều kiện trước khi xóa:
- Có đơn hàng đang sử dụng bảng giá này không?
- Bảng giá có phải là default không?

## Status
✅ **Fixed** - Bảng giá có thể xóa thành công mà không gặp lỗi foreign key constraint

## Related Files
- ✅ `frontend/src/app/admin/banggia/banggia-graphql.service.ts` - Updated DeleteBanggia method
- ✅ `frontend/src/app/admin/banggia/listbanggia/listbanggia.component.ts` - Sử dụng DeleteBanggia
- 📄 `api/prisma/schema.prisma` - Database schema reference
