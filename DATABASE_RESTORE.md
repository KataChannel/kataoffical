# Database Restore System

Hệ thống restore database được tích hợp với fix AuditLog để xử lý dữ liệu hoàn chỉnh.

## 🚀 Cách sử dụng

### 1. Restore toàn bộ database
```bash
# Chạy restore đầy đủ (bao gồm fix AuditLog tự động)
bun db:restore
```

### 2. Chỉ fix AuditLog
```bash
# Chạy riêng fix AuditLog từ backup mới nhất
bun db:restore:audit
```

### 3. Chạy trực tiếp
```bash
# Restore đầy đủ
cd api && npx ts-node prisma/restore.ts

# Chỉ fix AuditLog
cd api && npx ts-node prisma/restore.ts --fix-audit-log
```

## 🔧 Tính năng

### **Integrated Fix AuditLog:**
- Tự động detect và xử lý AuditLog table
- Map `error_details` → `errorDetails`
- Validate foreign key relationships
- Handle user connection safely

### **Smart Restore:**
- Foreign key validation
- Dependency order restore
- Batch insert với fallback individual
- Error handling & continue processing
- Comprehensive statistics

### **Safety Features:**
- Skip duplicates
- Clean up before restore
- Progress indicators
- Detailed logging
- Warning/error collection

## 📊 Table Restore Order

```
Phase 1: Core Independent
├── Role, Permission, Menu
├── Congty, Nhomkhachhang
└── User system tables

Phase 2: User Relations  
├── User, Profile
├── UserRole, RolePermission
└── AuditLog (with fix)

Phase 3: Business Core
├── Banggia, Sanpham
├── Nhacungcap, Kho
└── Price & Customer relations

Phase 4: Transactions
├── Donhang, Dathang
├── PhieuKho (parent)
└── Detail tables (child)

Phase 5: Inventory
└── Chotkho, TonKho
```

## 🔍 AuditLog Fix Details

**Vấn đề fix:**
- Field mapping: `error_details` → `errorDetails`
- User relation handling cho optional FK
- Date format standardization
- Missing field defaults

**Transform process:**
```typescript
{
  // Input từ backup
  error_details: {...},
  userId: "uuid-or-null",
  status: undefined,
  
  // Output đã fix
  errorDetails: {...},
  user: { connect: { id: "uuid" } }, // nếu có userId
  status: "SUCCESS" // default value
}
```

## 📈 Kết quả

Sau khi chạy sẽ hiển thị:
- 📊 Số tables processed
- 📝 Tổng records restored  
- ⚠️ Warnings count
- ❌ Errors count
- ⏰ Execution time

## 🛠️ Troubleshooting

**Lỗi Foreign Key:**
- Script tự động validate và skip invalid records
- Check dependency order nếu cần

**File không tồn tại:**
- Kiểm tra thư mục `./rausach_json`
- Đảm bảo có backup data

**Memory issues:**
- Script dùng batch processing
- Automatic fallback cho large datasets
