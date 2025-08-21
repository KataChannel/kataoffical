# FIX BUG: DONHANG UPDATE NESTED SANPHAM RELATIONS

## Bug Description
```
Argument `sanpham`: Invalid value provided. Expected DonhangsanphamUncheckedUpdateManyWithoutDonhangNestedInput, provided (Object, Object, Object, Object).
```

## Root Cause
Lỗi xảy ra vì đang cố gắng update nested relation `sanpham` trực tiếp trong GraphQL mutation `updateOne`. Prisma GraphQL không hỗ trợ update nested relations với cấu trúc dữ liệu đơn giản như array objects.

## Solution Implemented

### 1. **Split Update Operations**
Tách riêng việc update `donhang` và `donhangsanpham` thành 2 operations riêng biệt:

```typescript
// OLD - Lỗi
const updateData = {
  ...donhangData,
  sanpham: currentDonhang.sanpham // ❌ Invalid for Prisma update
};

// NEW - Fixed
const updateData = {
  ...donhangData,
  // Không bao gồm sanpham
};
```

### 2. **Separate Sanpham Update Method**
Tạo phương thức riêng để xử lý update sanpham:

```typescript
private async updateDonhangSanpham() {
  // 1. Get existing sanpham records
  const existingSanpham = await this._GraphqlService.findMany('donhangsanpham', {
    where: { donhangId: currentDonhang.id }
  });

  // 2. Delete existing records
  if (existingSanpham.length > 0) {
    await this._GraphqlService.batchDelete('donhangsanpham', deleteWhereConditions);
  }

  // 3. Create new records
  await this._GraphqlService.batchCreate('donhangsanpham', sanphamCreateData);
}
```

### 3. **Enhanced Update Methods**

#### `updateDonhang(status?: any)`
- ✅ Chỉ update fields cơ bản của donhang
- ✅ Loại bỏ `sanpham` khỏi update payload
- ✅ Giữ nguyên sanpham data trong local state
- ✅ Error handling cải thiện

#### `updateDonhangSanpham()`
- ✅ Xử lý riêng nested relation updates
- ✅ Delete + Create strategy để đảm bảo consistency
- ✅ Batch operations cho performance

#### `updateDonhangWithSanpham(status?: any)`
- ✅ Comprehensive update cho cả donhang và sanpham
- ✅ Sequential operations với proper error handling

### 4. **Data Structure Fix**

#### Before (❌ Error):
```typescript
const updateData = {
  title: "Đơn hàng ABC",
  ngaygiao: "2025-08-15",
  sanpham: [  // ❌ Invalid nested update format
    { id: "1", sldat: 10, slgiao: 8 },
    { id: "2", sldat: 5, slgiao: 5 }
  ]
};
```

#### After (✅ Fixed):
```typescript
// Main donhang update
const updateData = {
  title: "Đơn hàng ABC",
  ngaygiao: "2025-08-15"
  // sanpham excluded
};

// Separate sanpham operations
const sanphamCreateData = [
  {
    donhangId: "donhang-id",
    idSP: "1",
    sldat: 10,
    slgiao: 8,
    // ... other fields
  }
];
```

## Updated Methods

### 1. `updateDonhang()`
- Loại bỏ sanpham từ update payload
- Giữ nguyên sanpham trong local state
- Clean error messages

### 2. `updateDonhangSanpham()`
- New method cho nested updates
- Delete existing + Create new strategy
- Batch operations

### 3. `updateDonhangWithSanpham()`
- Comprehensive update method
- Sequential operations

### 4. `printContent()`
- Sử dụng GraphQL thay vì service cũ
- Update printCount via GraphQL

## Benefits

1. **✅ Bug Fixed**: Không còn lỗi nested relation update
2. **🚀 Performance**: Batch operations thay vì individual updates
3. **🛡️ Data Integrity**: Delete + Create strategy đảm bảo consistency
4. **🔧 Maintainability**: Code rõ ràng, tách biệt concerns
5. **📊 Error Handling**: Chi tiết và user-friendly

## Usage Examples

### Basic Update (không update sanpham):
```typescript
await this.updateDonhang();
```

### Update với status:
```typescript
await this.updateDonhang('danhan');
```

### Full update (cả donhang và sanpham):
```typescript
await this.updateDonhangWithSanpham();
```

### Chỉ update sanpham:
```typescript
await this.updateDonhangSanpham();
```

## Testing Status
- ✅ TypeScript compilation successful
- ✅ No lint errors
- ✅ GraphQL operations validated
- ✅ Error handling tested

## Performance Impact
- **Reduced**: Fewer failed requests due to invalid nested updates
- **Improved**: Batch operations for sanpham updates
- **Optimized**: Separate concerns reduce payload size

---
**Fix Date:** 15/08/2025  
**Version:** 3.1  
**Branch:** rausachv2  
**Status:** ✅ RESOLVED
