# 🧪 Testing Dashboard - Complete Workflow Guide

## 📍 Access Testing Dashboard
```
http://localhost:4200/admin/testing
```

## 🎯 Overview
Testing Dashboard cung cấp giao diện **table-based** với Tailwind CSS để test toàn bộ hệ thống. Dashboard theo dõi và quản lý test data lifecycle hoàn chỉnh.

---

## 🔄 Complete Workflow

### **Step 1: Access Dashboard**
```
Navigate to: http://localhost:4200/admin/testing
```

**Giao diện hiển thị:**
- ✅ **Stats Cards**: Total Tests, Completed, Success, Failed
- ✅ **Progress Bar**: Real-time testing progress với shimmer animation
- ✅ **Control Buttons**: Run All Tests | Delete Test Data | Reset Status
- ✅ **Modules Table**: 13 modules với expandable test details

---

### **Step 2: Run Tests**

#### **Option A: Run All Tests**
```typescript
Click button: "Run All Tests"
```

**Quá trình:**
1. ⚡ Component tạo test data với prefix `TEST_`
2. 📊 Real-time progress bar updates
3. 🔔 MatSnackBar notifications cho mỗi module
4. ✅ Test results hiển thị ngay lập tức
5. 💾 Test data IDs được lưu vào Map tracking

**Tracking System:**
```typescript
testDataIds = new Map<string, any[]>();
// Example:
// 'donhang' => [id1, id2, id3]
// 'dathang' => [id4, id5]
```

#### **Option B: Run Individual Module**
```typescript
Click icon "play_circle" trên module row
```

**Features:**
- Test chỉ 1 module cụ thể
- Nhanh hơn khi debug
- Tracking riêng biệt cho module

---

### **Step 3: Watch Real-time Results**

**Progress Tracking:**
```
Testing Progress: 45%
Current: donhang - Create Đơn Hàng
```

**Test States:**
- 🔵 **Running**: Blue border, animated spinner icon
- 🟢 **Success**: Green border, check icon, duration displayed
- 🔴 **Failed**: Red border, error icon, error message shown
- ⚪ **Pending**: Gray border, empty circle icon

**Module Status:**
```typescript
Module Row Classes:
- border-l-4 border-blue-500   // Running
- border-l-4 border-green-500  // All Success
- border-l-4 border-red-500    // Has Failed
- border-l-4 border-slate-300  // Pending
```

---

### **Step 4: Delete Test Data**

#### **Option A: Delete All Test Data**
```typescript
Click button: "Delete Test Data (count)"
```

**Confirmation Dialog:**
```
🗑️ Cleanup Test Data

Module: ALL MODULES
Test records to delete: 25

Xác nhận xóa dữ liệu test?
[Cancel] [OK]
```

**Process:**
1. ✅ Confirm deletion
2. 🗑️ Delete all tracked test data across modules
3. 🧹 Clear tracking Map
4. 🔔 Success notification: "Cleanup complete! Deleted: 25, Failed: 0"

#### **Option B: Delete Module Test Data**
```typescript
Click icon "delete" trên module row
```

**Features:**
- Delete chỉ test data của 1 module
- Tracking count hiển thị trên tooltip
- Disabled nếu không có test data

**Example Notification:**
```
✅ Đã xóa 5 test records từ donhang
```

---

### **Step 5: Reset Test Status**
```typescript
Click button: "Reset Status"
```

**Chức năng:**
- Reset tất cả test status về `pending`
- Clear duration và error messages
- **KHÔNG** xóa test data đã tạo
- Chỉ reset UI state

---

## 🎨 UI Features (Tailwind CSS)

### **Responsive Design**
```scss
Mobile (< 640px):   Single column stats, stacked buttons
Tablet (640-768px): 2-column stats grid
Desktop (> 768px):  Full 4-column layout, all columns visible
```

### **Animations**
```css
/* Shimmer effect on progress bar */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Spin animation for running tests */
.animate-spin { animation: spin 1s linear infinite; }
```

### **Color System**
```scss
Primary (Blue):   #3b82f6 - Running tests
Success (Green):  #10b981 - Passed tests  
Error (Red):      #ef4444 - Failed tests
Neutral (Slate):  #64748b - Pending tests
Purple:           #8b5cf6 - Completed tests
```

---

## 📊 Test Data Management

### **Create Test Data**
```typescript
// Example: Donhang test data
const testData = {
  madonhang: `TEST_DH_${timestamp}`,
  tenkhachhang: 'TEST Customer',
  ghichu: 'Test data - will be deleted'
};

// Store ID for tracking
this.storeTestId('donhang', createdId);
```

### **Track Test Data**
```typescript
// Helper methods
storeTestId(module: string, id: any): void
getTestIds(module: string): any[]
clearTestIds(module: string): void
getTotalTestDataCount(): number
getModuleTestDataCount(moduleName: string): number
```

### **Delete Test Data**
```typescript
// Cleanup implementation
private async deleteModuleTestData(moduleName: string, ids: any[]): Promise<void> {
  switch (moduleName) {
    case 'donhang':
      for (const id of ids) {
        await this._DonhangService.deleteDonhang(id);
      }
      break;
    // ... other modules
  }
}
```

---

## 🎯 Modules Coverage

### **Fully Implemented (11 modules):**
1. ✅ **Đơn Hàng** - 8 tests (Create, Update, Delete, Search, Cancel, Import)
2. ✅ **Đặt Hàng NCC** - 6 tests (CRUD, Confirm, Nhu Cầu)
3. ✅ **Phiếu Kho** - 7 tests (CRUD, Xuất Nhập Tồn, Adjustment)
4. ✅ **Sản Phẩm** - 6 tests (CRUD, Search, Import)
5. ✅ **Khách Hàng** - 5 tests (CRUD, Công Nợ)
6. ✅ **Nhà Cung Cấp** - 4 tests (CRUD)
7. ✅ **Bảng Giá** - 5 tests (CRUD, Check Exists)
8. ✅ **Chốt Kho** - 4 tests (Create, Process, Outstanding)
9. ✅ **Tồn Kho** - 3 tests (Get All, By Sản Phẩm, Sync)
10. ✅ **User & Permissions** - 5 tests (Users CRUD, Roles)
11. ⚠️ **Phiếu Giao Hàng** - 3 tests (Get All, Filter, Export)

### **Placeholder (2 modules):**
12. 🔄 **Support Ticket** - 3 tests (simulated)
13. 🔄 **Import Data** - 2 tests (simulated)

**Total: 61 test cases**

---

## 🚀 Quick Commands

```bash
# Start Frontend
cd frontend
npm start
# or
bun run start

# Access Dashboard
open http://localhost:4200/admin/testing

# Check Backend API
curl http://localhost:3000/graphql
```

---

## 🎯 Best Practices

### **Testing Workflow:**
1. ✅ Run tests trong môi trường development
2. ✅ Check console logs cho error details
3. ✅ Delete test data sau khi hoàn thành
4. ✅ Reset status trước khi run lại
5. ✅ Test từng module trước khi run all

### **Data Cleanup:**
1. ✅ Luôn delete test data sau khi test
2. ✅ Check count trước khi delete
3. ✅ Confirm dialog để tránh xóa nhầm
4. ✅ Monitor success/failed notifications

### **Performance:**
1. ✅ Use individual module tests khi debug
2. ✅ Delay 500ms giữa các tests (tránh overload)
3. ✅ Background tasks không block UI
4. ✅ Real-time progress updates

---

## 📝 Example Complete Flow

```typescript
// 1. Navigate to dashboard
http://localhost:4200/admin/testing

// 2. Click "Run All Tests"
Button: "RUN ALL TESTS"
→ Progress: 0% → 100%
→ Notifications: Each module completion
→ Final: "Hoàn thành! 61/61 tests passed, 0 failed"

// 3. View results
Expand modules to see test details
Check: ✅ Green = Pass, ❌ Red = Fail

// 4. Delete test data
Button: "DELETE TEST DATA (25)"
→ Confirm dialog
→ OK
→ Notification: "Cleanup complete! Deleted: 25, Failed: 0"

// 5. Reset for next run
Button: "RESET STATUS"
→ All tests back to pending
→ Ready for next test cycle
```

---

## 🎨 Screenshot Flow

```
┌─────────────────────────────────────────────┐
│  🧪 Test Dashboard                          │
│  Comprehensive Testing for All 13 Modules   │
└─────────────────────────────────────────────┘

┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│📊 61 │ │✅ 45 │ │🎉 42 │ │❌ 3 │
│Total │ │Done  │ │Pass  │ │Fail│
└──────┘ └──────┘ └──────┘ └──────┘

┌─────────────────────────────────────────────┐
│ Testing Progress            ████████ 73%    │
│ Current: donhang - Create Đơn Hàng          │
└─────────────────────────────────────────────┘

[▶ RUN ALL TESTS] [🗑️ DELETE (25)] [🔄 RESET]

┌─────────────────────────────────────────────┐
│ Module              Stats    Status  Action │
├─────────────────────────────────────────────┤
│ 🛒 Đơn Hàng        5/8 ✓    Running ▼ ▶ 🗑│
│ ├─ Get All            [✅ 234ms]           │
│ ├─ Create             [✅ 567ms]           │
│ ├─ Update             [🔵 Running...]      │
│ └─ Delete             [⚪ Pending]         │
└─────────────────────────────────────────────┘
```

---

## 🔧 Troubleshooting

### **Tests không chạy:**
- ✅ Check backend API running (port 3000)
- ✅ Check console errors
- ✅ Verify service imports

### **Delete không hoạt động:**
- ✅ Check test data IDs được track
- ✅ Verify delete methods tồn tại
- ✅ Check permissions

### **UI không responsive:**
- ✅ Clear browser cache
- ✅ Check Tailwind CSS loaded
- ✅ Resize browser window

---

## 📚 Related Documentation

- `TESTING_WRITE_OPERATIONS_COMPLETE.md` - Write Operations implementation
- `TESTING_WRITE_OPS_QUICK_REF.md` - Quick reference guide
- `TESTING_FULL_IMPLEMENTATION_SUMMARY.md` - Achievement summary
- `README.md` - Project overview

---

## ✅ Summary

**Testing Dashboard provides:**
- ✅ **Table-based UI** with Tailwind CSS
- ✅ **Real-time testing** với progress tracking
- ✅ **Complete lifecycle**: Create → Track → Test → Delete
- ✅ **Responsive design** cho all devices
- ✅ **Professional UX** với animations và notifications
- ✅ **61 test cases** across 13 modules
- ✅ **Full cleanup system** để manage test data

**Ready to use! 🚀**
