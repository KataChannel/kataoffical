# CẬP NHẬT DONHANG COMPONENT SỬ DỤNG GRAPHQL

## Tổng quan
Đã cập nhật component `detaildonhang.component.ts` để sử dụng GraphQL service thay vì DonhangService cũ cho các operations CRUD.

## Các phương thức đã cập nhật

### 1. `updateDonhang(status?: any)`
**Trước:** Sử dụng `this._DonhangService.updateDonhang()`
**Sau:** Sử dụng `this._GraphqlService.updateOne()`

**Tính năng mới:**
- Validation dữ liệu đầu vào
- Tính toán tự động `tongvat` và `tongtien`
- Xử lý lỗi chi tiết với thông báo cụ thể
- Convert Date sang ISO string
- Cập nhật local state sau khi thành công

```typescript
const result = await this._GraphqlService.updateOne('donhang', 
  { id: currentDonhang.id }, 
  updateData
);
```

### 2. `DeleteData()`
**Trước:** Sử dụng `this._DonhangService.DeleteDonhang()`
**Sau:** Sử dụng `this._GraphqlService.deleteOne()`

**Tính năng mới:**
- Validation ID trước khi xóa
- Xử lý lỗi constraint database
- Thông báo lỗi cụ thể cho user

```typescript
const result = await this._GraphqlService.deleteOne('donhang', { id: currentDonhang.id });
```

### 3. `CoppyDon()`
**Trước:** Sử dụng `this._DonhangService.CreateDonhang()`
**Sau:** Sử dụng `this._GraphqlService.createOne()`

**Tính năng mới:**
- Lấy `order` number tự động từ database
- Tạo `madonhang` mới với `DonhangnumberToCode()`
- Copy tất cả sản phẩm với nested create
- Validation và error handling chi tiết

```typescript
const maxOrderResult = await this._GraphqlService.findAll('donhang', {
  take: 1,
  orderBy: { order: 'desc' },
  select: { order: true },
});
```

### 4. `updateDonhangSanpham()` - Phương thức mới
Phương thức helper để xử lý cập nhật sản phẩm trong đơn hàng (nested relations).

## Cải tiến về Performance

### Cache và Optimization
- Sử dụng GraphQL cache built-in
- Chỉ select fields cần thiết
- Batch operations cho các thao tác lớn

### Error Handling
- Try-catch blocks cho tất cả async operations
- Thông báo lỗi cụ thể cho user
- Logging chi tiết cho debugging

### Data Validation
- Kiểm tra dữ liệu trước khi gửi
- Validation ID và required fields
- Type conversion an toàn

## Ví dụ Usage

### Update đơn hàng
```typescript
// Cập nhật status
this.UpdateStatus('danhan');

// Cập nhật thông tin chung
await this.updateDonhang();
```

### Copy đơn hàng
```typescript
await this.CoppyDon(); // Tự động tạo order number mới
```

### Xóa đơn hàng
```typescript
await this.DeleteData(); // Có validation constraint
```

## Lợi ích

1. **Performance:** GraphQL query optimization, cache hiệu quả
2. **Type Safety:** Better TypeScript support với GraphQL
3. **Error Handling:** Chi tiết và user-friendly
4. **Maintainability:** Code rõ ràng, dễ maintain
5. **Consistency:** Sử dụng cùng một GraphQL service across app

## Các phương thức đã được giữ nguyên

- `handleDonhangAction()` - Logic routing cho create/update
- `validateDonhang()` - Validation business logic
- `createDonhang()` - Đã được cập nhật trước đó

## Testing

- ✅ Build frontend thành công
- ✅ No TypeScript errors
- ✅ No lint errors
- ✅ GraphQL operations validated

## Next Steps

1. Test các operations trên production data
2. Implement unit tests cho các phương thức mới
3. Consider thêm optimistic updates cho UX tốt hơn
4. Monitor performance impact

---
**Ngày cập nhật:** 15/08/2025
**Version:** 3.1
**Branch:** rausachv2
