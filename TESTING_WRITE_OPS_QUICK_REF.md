# Testing Dashboard - Write Operations Quick Reference 🚀

## 🎯 Quick Access

**URL:** `http://localhost:4200/admin/testing`

**Component:** `/frontend/src/app/admin/testing/testing.component.ts`

---

## 📝 Test Data Prefixes

| Module | Prefix | Generated Name |
|--------|--------|----------------|
| Đơn Hàng | `DH` | `TEST_DH_1729012345` |
| Đặt Hàng NCC | `DHNCC` | `TEST_DHNCC_1729012345` |
| Phiếu Kho | `PK` | `TEST_PK_1729012345` |
| Sản Phẩm | `SP` | `TEST_SP_1729012345` |
| Khách Hàng | `KH` | `TEST_KH_1729012345` |
| Nhà Cung Cấp | `NCC` | `TEST_NCC_1729012345` |
| Bảng Giá | `BG` | `TEST_BG_1729012345` |
| User | `USER` | `test_user_1729012345` |

---

## 🔧 Helper Methods

```typescript
// Generate timestamp
getTestTimestamp(): string
// Returns: '1729012345'

// Generate test name
getTestName('SP')
// Returns: 'TEST_SP_1729012345'

// Store test ID
storeTestId('donhang', createdId)

// Get stored IDs
getTestIds('donhang')
// Returns: [id1, id2, id3]

// Clear IDs after delete
clearTestIds('donhang')

// Confirm before delete
await confirmCleanup('Đơn Hàng', 5)
// Shows: "Xóa 5 bản ghi test của module Đơn Hàng?"
```

---

## 💡 Code Patterns

### 1️⃣ Create Pattern

```typescript
case 'Create [Entity]':
  const test[Entity] = {
    ma[entity]: this.getTestName('[PREFIX]'),
    // ... required fields
    ghichu: 'Test data - will be deleted'
  };
  
  try {
    await this._[Entity]Service.Create[Entity](test[Entity]);
    this._snackBar.open(`✅ Created: ${test[Entity].ma[entity]}`, 'Close', { duration: 2000 });
  } catch (e) {
    this._snackBar.open('⚠️ Simulation', 'Close', { duration: 2000 });
  }
  break;
```

### 2️⃣ Update Pattern

```typescript
case 'Update [Entity]':
  const updateIds = this.getTestIds('[module]');
  if (updateIds.length > 0) {
    await this._[Entity]Service.Update[Entity]({
      id: updateIds[0],
      // ... update fields
    });
    this._snackBar.open('✅ Updated', 'Close', { duration: 2000 });
  }
  break;
```

### 3️⃣ Delete Pattern

```typescript
case 'Delete [Entity]':
  const deleteIds = this.getTestIds('[module]');
  if (deleteIds.length > 0) {
    const confirmed = await this.confirmCleanup('[Module]', deleteIds.length);
    if (confirmed) {
      for (const id of deleteIds) {
        await this._[Entity]Service.Delete[Entity](id);
      }
      this.clearTestIds('[module]');
      this._snackBar.open(`🗑️ Deleted ${deleteIds.length} records`, 'Close', { duration: 3000 });
    }
  } else {
    this._snackBar.open('ℹ️ No data to delete', 'Close', { duration: 2000 });
  }
  break;
```

---

## 📊 MatSnackBar Icons

```typescript
✅ Success
⚠️ Warning/Simulation
❌ Error
ℹ️ Info
🗑️ Delete
📥 Import
🔄 Update
```

---

## 🎨 Mock Data Templates

### Đơn Hàng
```typescript
{
  madonhang: this.getTestName('DH'),
  ngaydonhang: new Date(),
  khachhangId: null,
  trangthai: 'CHUAXULY',
  tongtienhang: 1000000,
  ghichu: 'Test data - will be deleted'
}
```

### Sản Phẩm
```typescript
{
  masanpham: this.getTestName('SP'),
  tensanpham: 'Test Product ' + this.getTestTimestamp(),
  donvitinh: 'Cái',
  giaban: 100000,
  ghichu: 'Test data - will be deleted'
}
```

### Khách Hàng
```typescript
{
  makhachhang: this.getTestName('KH'),
  tenkhachhang: 'Test Customer ' + this.getTestTimestamp(),
  dienthoai: '0999999999',
  email: 'test@example.com',
  diachi: 'Test Address',
  ghichu: 'Test data - will be deleted'
}
```

### User
```typescript
{
  username: this.getTestName('USER').toLowerCase(),
  email: `test_${this.getTestTimestamp()}@example.com`,
  password: 'Test@123456',
  fullname: 'Test User ' + this.getTestTimestamp(),
  role: 'USER',
  active: true
}
```

---

## 🔒 Service Method Names

### PascalCase Services
```typescript
CreateDonhang()
UpdateDonhang()
deleteDonhang()

CreateDathang()
DeleteDathang()

CreatePhieukho()
CreateSanpham()
CreateKhachhang()
CreateNhacungcap()
CreateBanggia()
CreateUser()
```

### Mixed Case (Watch out!)
```typescript
updateDathang()  // lowercase u
updateDonhang()  // lowercase u
```

---

## ⚡ Common Tasks

### Add New Test Operation

```typescript
// 1. Add test case to module
tests: [
  { name: 'My New Test', status: 'pending' }
]

// 2. Add switch case
case 'My New Test':
  // Your implementation
  this._snackBar.open('✅ Success', 'Close', { duration: 2000 });
  break;
```

### Add New Module

```typescript
// 1. Add to constructor
constructor(
  private _MyNewService: MyNewService,
  // ...
) {}

// 2. Add to initializeTests()
{
  moduleName: 'mynew',
  name: '12. My New Module',
  icon: 'new_icon',
  color: '#HEXCODE',
  tests: [
    { name: 'Test 1', status: 'pending' }
  ]
}

// 3. Add to runTest()
case '12. My New Module':
  return this.testMynew(testName);

// 4. Create test method
private async testMynew(testName: string): Promise<void> {
  switch (testName) {
    case 'Test 1':
      // Implementation
      break;
  }
}
```

---

## 🐛 Debugging Tips

### Check Test Data IDs
```typescript
console.log(this.testDataIds);
// Map(3) {
//   'donhang' => [id1, id2],
//   'sanpham' => [id3],
//   'khachhang' => [id4, id5, id6]
// }
```

### Check Service Method Exists
```typescript
console.log(typeof this._DonhangService.CreateDonhang);
// 'function' = exists
// 'undefined' = doesn't exist
```

### Monitor Test Progress
```typescript
// Progress signal auto-updates
console.log(this.progress());
// 45.5 (percentage)

console.log(this.completedCount());
// 28 / 61
```

---

## ⚠️ Safety Checklist

✅ All test data has `TEST_` prefix  
✅ Confirmation dialog before delete  
✅ Try-catch around Create operations  
✅ Clear Map after cleanup  
✅ User notifications for all operations  
✅ Delay after operations (300ms)  

---

## 📞 Support

**Issues?** Check:
1. Service method name (PascalCase vs camelCase)
2. Service returns value? (some return void)
3. Required fields in mock data
4. Permissions (user có quyền Create/Delete không?)

**Documentation:**
- [TESTING_WRITE_OPERATIONS_COMPLETE.md](./TESTING_WRITE_OPERATIONS_COMPLETE.md)
- [TESTING_COMPONENT_COMPLETE.md](./TESTING_COMPONENT_COMPLETE.md)

---

*Quick Reference v1.0 - October 15, 2025*
