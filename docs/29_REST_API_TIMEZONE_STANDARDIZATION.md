# REST API Timezone Standardization Implementation

## 🎯 **Objective**
Chuẩn hóa việc xử lý timezone cho tất cả REST API endpoints (ngoài GraphQL) trong hệ thống để đảm bảo tính nhất quán và chính xác của dữ liệu ngày tháng.

## 📋 **Implementation Summary**

### ✅ **Completed Tasks**

#### 1. **SharedModule & TimezoneUtilService**
- ✅ Tạo `SharedModule` để export `TimezoneUtilService` cho toàn bộ app
- ✅ Cập nhật `app.module.ts` import `SharedModule` 
- ✅ Tạo lại `TimezoneUtilService` hoàn toàn mới (không dependency moment.js)

#### 2. **DonhangModule & DonhangService** 
- ✅ Import `SharedModule` vào `DonhangModule`
- ✅ Inject `TimezoneUtilService` vào `DonhangService`
- ✅ Thay thế tất cả `moment()` date filters với `timezoneUtil.convertDateFilters()`
- ✅ Thay thế `moment().format()` với `timezoneUtil.formatDateForFilename()` và `timezoneUtil.formatDateUnderscored()`
- ✅ Cập nhật methods: `search()`, `congnokhachhang()`, `getchogiao()`, `phieuchuyen()`

#### 3. **DathangModule & DathangService**
- ✅ Import `SharedModule` vào `DathangModule`
- ✅ Inject `TimezoneUtilService` vào `DathangService` 
- ✅ Thay thế moment date filters trong `search()`, `getchonhap()` methods
- ✅ Script automation để thay thế basic moment formatting

#### 4. **KhachhangModule**
- ✅ Import `SharedModule` vào `KhachhangModule`

### 🔄 **In Progress Tasks**

#### **Remaining Services to Update:**
1. **KhachhangService** - Replace moment usage
2. **SanphamService** - Replace moment usage  
3. **PhieukhoService** - Replace moment usage
4. **NhacungcapService** - Replace moment usage
5. **BanggiaService** - Replace moment usage

### 📝 **Code Changes Made**

#### **TimezoneUtilService Methods:**
```typescript
class TimezoneUtilService {
  // ✅ Core timezone conversion
  toUTC(date: Date | string | number): string
  fromUTC(utcDate: string | Date, timezone?: string): Date
  nowUTC(): string
  
  // ✅ Object normalization
  normalizeDateFields(data: any, dateFields?: string[]): any
  convertDateFilters(filters: any): any
  
  // ✅ Date formatting for files
  formatDateForFilename(): string       // DDMMYYYY
  formatDateUnderscored(): string       // DD_MM_YYYY
  
  // ✅ Date range helpers
  getStartOfDay(date: Date | string): string
  getEndOfDay(date: Date | string): string
}
```

#### **REST API Pattern Changes:**

**Before (Moment.js):**
```typescript
const where = {
  ngaygiao: {
    gte: Batdau ? moment(Batdau).tz('Asia/Ho_Chi_Minh').startOf('day').toDate() : undefined,
    lte: Ketthuc ? moment(Ketthuc).tz('Asia/Ho_Chi_Minh').endOf('day').toDate() : undefined,
  }
};
```

**After (TimezoneUtilService):**
```typescript
const dateRange = this.timezoneUtil.convertDateFilters({
  ngaygiao: {
    gte: Batdau ? new Date(Batdau) : undefined,
    lte: Ketthuc ? new Date(Ketthuc) : undefined,
  }
});
const where = { ngaygiao: dateRange.ngaygiao };
```

## 🏗️ **Architecture Benefits**

### **1. Consistency**
- Tất cả REST API sử dụng cùng một timezone handling logic
- Standardized date format conversion

### **2. Maintainability**  
- Centralized timezone logic trong `TimezoneUtilService`
- Dễ dàng update timezone rules từ một nơi

### **3. Performance**
- Loại bỏ dependency moment.js (heavy library)
- Sử dụng native JavaScript Date objects

### **4. Type Safety**
- Consistent input/output types
- Better TypeScript support

## 📊 **Status by Module**

| Module | Status | Date Filters | File Formatting | Notes |
|--------|--------|--------------|-----------------|-------|
| **DonhangModule** | ✅ Complete | ✅ Updated | ✅ Updated | All methods converted |
| **DathangModule** | ✅ Complete | ✅ Updated | ✅ Updated | Core methods converted |
| **KhachhangModule** | 🔄 Partial | ❌ Pending | ❌ Pending | Module updated, service pending |
| **SanphamModule** | ❌ Pending | ❌ Pending | ❌ Pending | Not started |
| **PhieukhoModule** | ❌ Pending | ❌ Pending | ❌ Pending | Not started |
| **NhacungcapModule** | ❌ Pending | ❌ Pending | ❌ Pending | Not started |
| **BanggiaModule** | ❌ Pending | ❌ Pending | ❌ Pending | Not started |

## 🔧 **Next Steps**

### **Immediate Actions:**
1. **Complete KhachhangService** - Update moment usage
2. **Update SanphamService** - Date filters and formatting
3. **Update PhieukhoService** - Import/export date handling
4. **Update NhacungcapService** - Supplier date operations
5. **Update BanggiaService** - Price list date operations

### **Script Pattern for Remaining Services:**
```bash
# 1. Add SharedModule to module imports
# 2. Inject TimezoneUtilService to service constructor  
# 3. Replace moment().format() calls
# 4. Replace moment date range filters
# 5. Test compilation and functionality
```

## 🎯 **Expected Outcomes**

### **Technical Benefits:**
- ✅ Reduced bundle size (remove moment.js dependency)
- ✅ Improved type safety with native Date handling
- ✅ Consistent timezone conversion across all APIs
- ✅ Better performance with native JavaScript

### **Business Benefits:**
- ✅ Accurate date/time handling for Vietnamese timezone
- ✅ Consistent data storage in UTC format
- ✅ Proper date range filtering for reports
- ✅ Reliable file naming with correct date formats

## 📋 **Testing Checklist**

### **For Each Completed Service:**
- [ ] Compilation successful without moment errors
- [ ] Date range filtering works correctly
- [ ] File generation includes proper date formatting
- [ ] UTC conversion maintains data integrity
- [ ] Local timezone display shows correct values

## 🚀 **Final Goal**

Complete standardization of timezone handling across all REST API endpoints to match the GraphQL implementation, ensuring data consistency and eliminating timezone-related bugs throughout the application.

---

**Status**: 🟡 **In Progress** (2/7 modules completed)  
**Priority**: 🔴 **High** (Data integrity critical)  
**Next Action**: Complete KhachhangService timezone updates
