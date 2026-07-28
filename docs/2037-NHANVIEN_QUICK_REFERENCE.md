# Nhanvien Model - Quick Reference Guide

## 🚀 Quick Start

### Backend Endpoints

```bash
# Get all employees
GET http://localhost:3331/nhanvien

# Get employees for dropdown
GET http://localhost:3331/nhanvien/forselect

# Get one employee
GET http://localhost:3331/nhanvien/:id

# Get by employee code
GET http://localhost:3331/nhanvien/manv/:manv

# Create employee (requires JWT)
POST http://localhost:3331/nhanvien
Authorization: Bearer <token>
{
  "manv": "NV001",
  "tennv": "Nguyễn Văn A",
  "sdtnv": "0901234567",
  "emailnv": "email@example.com"
}

# Update employee (requires JWT)
PATCH http://localhost:3331/nhanvien/:id
Authorization: Bearer <token>

# Delete employee (requires JWT)
DELETE http://localhost:3331/nhanvien/:id
Authorization: Bearer <token>

# Import employees (requires JWT)
POST http://localhost:3331/nhanvien/import
Authorization: Bearer <token>
```

---

## 🔧 Frontend Integration

### Step 1: Import NhanvienService

```typescript
// In your component
import { NhanvienService } from '../nhanvien/nhanvien.service';

constructor(
  private _NhanvienService: NhanvienService,
  // ...
) {}
```

### Step 2: Load Nhanvien List

```typescript
ListNhanvien: any[] = [];

async ngOnInit(): Promise<void> {
  try {
    this.ListNhanvien = await this._NhanvienService.getNhanvienforselect();
  } catch (error) {
    console.error('Error loading nhanvien list:', error);
  }
}
```

### Step 3: Use in Template

```html
<!-- Dropdown for selecting employee -->
<mat-form-field appearance="outline" subscriptSizing="dynamic">
  <mat-label>Nhân viên</mat-label>
  <mat-select [(ngModel)]="selectedNhanvienId">
    <mat-option value="">-- Chọn nhân viên --</mat-option>
    <mat-option *ngFor="let nv of ListNhanvien" [value]="nv.id">
      {{ nv.tennv }} ({{ nv.manv }})
    </mat-option>
  </mat-select>
</mat-form-field>

<!-- Display employee name -->
<span>{{ getNhanvienName(row.nhanvienchiahangId) }}</span>
```

### Step 4: Helper Method

```typescript
getNhanvienName(nhanvienId: string): string {
  if (!nhanvienId || this.ListNhanvien.length === 0) return '';
  const nhanvien = this.ListNhanvien.find(nv => nv.id === nhanvienId);
  return nhanvien ? nhanvien.tennv : '';
}
```

---

## 📝 Database Schema

```prisma
model Nhanvien {
  id                    String    @id @default(uuid())
  manv                  String    @unique        // Employee code
  tennv                 String                   // Employee name
  sdtnv                 String?                  // Phone
  ngaysinhnv            DateTime?                // Date of birth
  emailnv               String?                  // Email
  diachinv              String?                  // Address
  hinhccnv              String?                  // ID card image
  isActive              Boolean   @default(true)
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
  donhangChiahang       Donhang[] @relation("DonhangNhanvienChiahang")
  donhangShipper        Donhang[] @relation("DonhangShipper")
}

model Donhang {
  // ... other fields
  nhanvienchiahangId   String?
  shipperId            String?
  nhanvienchiahang     Nhanvien?  @relation("DonhangNhanvienChiahang")
  shipper              Nhanvien?  @relation("DonhangShipper")
}
```

---

## 🔄 Updating Donhang with Nhanvien

### Before (String field):
```typescript
await this._DonhangService.updateDonhang({
  ...fullOrder,
  nhanvienchiahang: "Nguyễn Văn A"  // ❌ Plain text
});
```

### After (Relation):
```typescript
await this._DonhangService.updateDonhang({
  ...fullOrder,
  nhanvienchiahangId: "uuid-nhanvien-1"  // ✅ Foreign key
});
```

---

## 🎯 Common Use Cases

### 1. Create New Employee
```typescript
const newEmployee = {
  manv: "NV001",
  tennv: "Nguyễn Văn A",
  sdtnv: "0901234567",
  emailnv: "nguyenvana@example.com",
  diachinv: "123 Đường ABC, TP.HCM",
  isActive: true
};

await this._NhanvienService.CreateNhanvien(newEmployee);
```

### 2. Assign Employee to Order (Chia Hàng)
```typescript
const fullOrder = await this._DonhangService.SearchField({
  madonhang: 'DH001'
});

fullOrder.nhanvienchiahangId = selectedNhanvienId;
await this._DonhangService.updateDonhang(fullOrder);
```

### 3. Assign Shipper to Order
```typescript
const fullOrder = await this._DonhangService.SearchField({
  madonhang: 'DH001'
});

fullOrder.shipperId = selectedShipperId;
await this._DonhangService.updateDonhang(fullOrder);
```

### 4. Search Employee by Code
```typescript
const employee = await this._NhanvienService.SearchField({
  manv: 'NV001'
});
```

### 5. Import Multiple Employees
```typescript
const employees = [
  { manv: "NV001", tennv: "Nguyễn Văn A", sdtnv: "0901234567" },
  { manv: "NV002", tennv: "Trần Thị B", sdtnv: "0902345678" },
  { manv: "NV003", tennv: "Lê Văn C", sdtnv: "0903456789" }
];

await this._NhanvienService.ImportNhanvien(employees);
```

---

## 🛠️ Troubleshooting

### Issue: Cannot find NhanvienService
**Solution:** Import the service in your component:
```typescript
import { NhanvienService } from '../nhanvien/nhanvien.service';
```

### Issue: ListNhanvien is empty
**Solution:** Check if the API endpoint returns data:
```bash
curl http://localhost:3331/nhanvien/forselect
```

### Issue: Cannot update nhanvienchiahangId
**Solution:** Make sure to fetch the full order object first:
```typescript
const fullOrder = await this._DonhangService.SearchField({
  madonhang: row.madonhang
});
fullOrder.nhanvienchiahangId = selectedNhanvienId;
await this._DonhangService.updateDonhang(fullOrder);
```

### Issue: Duplicate manv error
**Solution:** Employee code (manv) must be unique. Check existing codes:
```typescript
const existing = await this._NhanvienService.SearchField({ manv: 'NV001' });
```

### Issue: Cannot delete employee
**Solution:** Employee is being used in orders. Check relations:
```typescript
const employee = await this._NhanvienService.getOneNhanvien(id);
// Check employee._count.donhangChiahang and employee._count.donhangShipper
```

---

## 📊 Excel Import Template

### CSV Format
```csv
manv,tennv,sdtnv,emailnv,diachinv,ngaysinhnv
NV001,Nguyễn Văn A,0901234567,nguyenvana@example.com,123 Đường ABC,1990-01-15
NV002,Trần Thị B,0902345678,tranthib@example.com,456 Đường XYZ,1992-03-20
NV003,Lê Văn C,0903456789,levanc@example.com,789 Đường DEF,1988-07-10
```

### Import Code
```typescript
async importFromExcel(data: any[]) {
  const employees = data.map(row => ({
    manv: row.manv,
    tennv: row.tennv,
    sdtnv: row.sdtnv,
    emailnv: row.emailnv,
    diachinv: row.diachinv,
    ngaysinhnv: row.ngaysinhnv ? new Date(row.ngaysinhnv) : undefined,
    isActive: true
  }));
  
  await this._NhanvienService.ImportNhanvien(employees);
}
```

---

## 🔐 Authentication

All write operations (POST, PATCH, DELETE) require JWT authentication:

```typescript
// In your service
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this._StorageService.getItem('token')}`
  },
  body: JSON.stringify(data)
};
```

---

## 🎯 Best Practices

1. **Always validate manv uniqueness** before creating
2. **Fetch full order object** before updating relations
3. **Use getNhanvienforselect()** for dropdowns (minimal data)
4. **Cache employee list** in component to avoid repeated API calls
5. **Handle errors gracefully** with try-catch and user-friendly messages
6. **Log errors** to ErrorLogService for debugging
7. **Use signals** for reactive state management
8. **Validate before deletion** to prevent orphaned relations

---

## 📚 Related Documentation

- [Full Implementation Guide](./2037-NHANVIEN_MODEL_IMPLEMENTATION.md)
- Migration: `20251110073857_add_nhanvien_model/migration.sql`
- Backend: `/api/src/nhanvien/`
- Frontend: `/frontend/src/app/admin/nhanvien/`

---

**Last Updated:** November 10, 2025  
**Version:** 1.0.0  
**Status:** ✅ Production Ready
