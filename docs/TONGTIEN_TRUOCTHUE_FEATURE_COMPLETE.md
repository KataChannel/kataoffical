# Tính Năng "Tổng Tiền Trước Thuế" - Báo Cáo Công Nợ

## 🎯 Tổng Quan

Đã thành công thêm cột **"Tổng Tiền Trước Thuế"** vào báo cáo công nợ khách hàng, được đặt giữa cột "Tổng Tiền Sau Thuế" và "Tổng Cộng Khách Hàng" để cung cấp thông tin tài chính chi tiết hơn.

## ✅ Tính Năng Đã Implement

### 1. **Cấu Trúc Cột Excel Mới**

```typescript
const columns = [
  // ... existing columns
  { key: 'thanhtiensauvat', header: 'Thành Tiền Sau VAT', width: 20 },
  { key: 'tongtiensauvat', header: 'Tổng Tiền Sau Thuế', width: 20 },
  { key: 'tongtientruocthue', header: 'Tổng Tiền Trước Thuế', width: 20 }, // ← NEW
  { key: 'tongcong', header: 'Tổng Cộng Khách Hàng', width: 25 }
];
```

### 2. **Logic Tính Toán**

#### **Bước 1: Tính toán cơ bản**
```typescript
// Cho mỗi item trong đơn hàng
thanhtientruocvat: v1.slnhan * giaban  // Thành tiền trước VAT
```

#### **Bước 2: Nhóm theo khách hàng + ngày**
```typescript
if (!combinationTotals.has(combinationKey)) {
  combinationTotals.set(combinationKey, {
    tongtiensauvat: 0,        // Tổng tiền sau thuế
    tongtientruocthue: 0,     // ← NEW: Tổng tiền trước thuế
    itemCount: 0,
    // ... other fields
  });
}

// Tích lũy tổng tiền
combination.tongtiensauvat += item.thanhtiensauvat;
combination.tongtientruocthue += item.thanhtientruocvat; // ← NEW
```

#### **Bước 3: Áp dụng tổng cho từng item**
```typescript
return {
  ...item,
  tongtiensauvat: combination ? combination.tongtiensauvat : item.thanhtiensauvat,
  tongtientruocthue: combination ? combination.tongtientruocthue : item.thanhtientruocvat, // ← NEW
};
```

### 3. **Excel Export Integration**

#### **Row Values**
```typescript
row.values = {
  // ... existing values
  thanhtiensauvat: Number(item.thanhtiensauvat) || 0,
  ghichu: item.ghichu || '',
  tongtiensauvat: Number(item.tongtiensauvat) || 0,
  tongtientruocthue: Number(item.tongtientruocthue) || 0, // ← NEW
  tongcong: Number(customerData.tongtiensauvat) || 0
};
```

#### **Number Formatting**
```typescript
['soluong', 'dongia', 'thanhtientruocvat', 'dongiavathoadon', 
 'thanhtiensauvat', 'tongtiensauvat', 'tongtientruocthue', 'tongcong'] // ← NEW
.forEach(col => {
  const cell = row.getCell(col);
  cell.numFmt = '#,##0.00';
  cell.alignment = { horizontal: 'right' };
});
```

#### **Merge Ranges**
```typescript
// Merge tongtientruocthue cho cùng ngày giao của cùng khách hàng
const tongtientruocthueColIndex = columns.findIndex(c => c.key === 'tongtientruocthue') + 1;
mergeRanges.push({
  range: `${String.fromCharCode(64 + tongtientruocthueColIndex)}${dateStartRow}:${String.fromCharCode(64 + tongtientruocthueColIndex)}${dateEndRow}`,
  value: dateGroup.items[0].tongtientruocthue
});
```

## 📊 Cấu Trúc Báo Cáo Excel

### **Thứ Tự Cột Mới:**
1. Ngày Giao
2. Mã Khách Hàng  
3. Tên Khách Hàng
4. Mã Đơn Hàng
5. Mã Hàng
6. Tên Hàng
7. ĐVT
8. Số Lượng
9. Đơn Giá
10. Thành Tiền Trước VAT
11. Ghi Chú
12. VAT (%)
13. Đơn Giá VAT
14. Thành Tiền Sau VAT
15. **Tổng Tiền Sau Thuế**
16. **🆕 Tổng Tiền Trước Thuế**
17. **Tổng Cộng Khách Hàng**

### **Ví Dụ Tính Toán:**

```
Khách hàng A - Ngày 01/01/2025:
├── Sản phẩm 1: 100,000 VND (trước thuế) → 110,000 VND (sau thuế)
├── Sản phẩm 2: 200,000 VND (trước thuế) → 220,000 VND (sau thuế)
└── Tổng:
    ├── Tổng Tiền Trước Thuế: 300,000 VND
    ├── Tổng Tiền Sau Thuế: 330,000 VND
    └── Tổng Cộng Khách Hàng: 330,000 VND
```

## 🎯 Lợi Ích

### 1. **Báo Cáo Tài Chính Chi Tiết**
- **Trước thuế**: Giá trị hàng hóa thuần túy
- **Sau thuế**: Giá trị bao gồm VAT/thuế
- **Tổng cộng**: Tổng toàn bộ của khách hàng

### 2. **Phân Tích Tốt Hơn**
- So sánh thu nhập trước và sau thuế
- Tính toán thuế phải nộp chính xác
- Phân tích margin và lợi nhuận

### 3. **Tuân Thủ Quy Định**
- Đáp ứng yêu cầu báo cáo thuế
- Minh bạch trong kê khai
- Dễ dàng kiểm toán

## 🔧 Technical Implementation

### **Files Modified:**
- `api/src/donhang/donhang.service.ts`

### **Key Methods:**
- `congno()` - Main export method
- `createCongnoExcelFile()` - Excel generation

### **Database Impact:**
- ✅ **No database changes required**
- ✅ **Pure calculation-based feature**
- ✅ **Uses existing data fields**

### **Performance:**
- ✅ **Minimal impact** - just additional calculation
- ✅ **Memory efficient** - uses Map for grouping
- ✅ **Fast execution** - single pass processing

## 📋 Test Cases

### **Test Case 1: Single Customer, Single Date**
```
Input: 1 customer, 1 date, 2 products
Expected: tongtientruocthue = sum of thanhtientruocvat
```

### **Test Case 2: Multiple Customers**
```
Input: 2 customers, same date, different products
Expected: Separate tongtientruocthue for each customer
```

### **Test Case 3: Same Customer, Multiple Dates**
```
Input: 1 customer, 2 dates, different products  
Expected: Separate tongtientruocthue for each date
```

### **Test Case 4: Excel Formatting**
```
Expected: 
- Right-aligned numbers
- #,##0.00 format
- Proper merge ranges
- Bold headers
```

## 🚀 Usage Instructions

### **1. Tạo Báo Cáo:**
```bash
GET /api/donhang/congno?fromDate=2025-01-01&toDate=2025-01-31
```

### **2. Kiểm Tra Excel:**
- Mở file Excel được tạo
- Verify cột "Tổng Tiền Trước Thuế" ở vị trí 16
- Kiểm tra tính toán chính xác
- Verify formatting và merge ranges

### **3. Phân Tích Dữ Liệu:**
- So sánh trước và sau thuế
- Tính % thuế: (Sau thuế - Trước thuế) / Trước thuế
- Phân tích xu hướng theo thời gian

## ✅ Status: COMPLETED

- ✅ **Column added** to Excel export
- ✅ **Calculation logic** implemented
- ✅ **Excel formatting** applied
- ✅ **Merge ranges** configured
- ✅ **Build successful** - no errors
- ✅ **Ready for production** use

Tính năng "Tổng Tiền Trước Thuế" đã được integrate hoàn chỉnh vào báo cáo công nợ khách hàng! 🎉