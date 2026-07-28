# Schema: Nhân Viên & Phòng Ban

## 📋 Tóm tắt

Thêm 2 model mới vào Prisma schema để quản lý **Nhân viên** và **Phòng ban** với đầy đủ tính năng:
- Tích hợp với model `User` (một User có thể là một Nhân viên)
- Phòng ban có cấu trúc phân cấp (parent-child)
- Phòng ban có nhiều loại: Phòng ban, Bộ phận, Phòng, Ban, Tổ, Nhóm
- Phòng ban có trưởng phòng (là một Nhân viên)

## 🏗️ Cấu trúc Schema

### Model: Phongban

```prisma
model Phongban {
  id            String        @id @default(uuid())
  ma            String        @unique // Mã phòng ban (VD: PB001, BP002)
  ten           String        // Tên phòng ban
  loai          LoaiPhongban  @default(PHONGBAN) // Loại phòng ban
  level         Int           @default(1) // Cấp bậc phân cấp
  moTa          String?       // Mô tả
  dienThoai     String?       // Số điện thoại
  email         String?       // Email phòng ban
  diaChi        String?       // Địa chỉ
  truongPhongId String?       // ID nhân viên làm trưởng phòng
  parentId      String?       // ID phòng ban cha (phân cấp)
  order         Int?          @default(1)
  isActive      Boolean       @default(true)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  
  // Relations
  parent        Phongban?     @relation("PhongbanChildren", fields: [parentId], references: [id])
  children      Phongban[]    @relation("PhongbanChildren")
  truongPhong   Nhanvien?     @relation("TruongPhong", fields: [truongPhongId], references: [id])
  nhanviens     Nhanvien[]    @relation("PhongbanNhanvien")
}
```

#### Enum: LoaiPhongban

```prisma
enum LoaiPhongban {
  PHONGBAN      // Phòng ban
  BOPHAN        // Bộ phận
  PHONG         // Phòng
  BAN           // Ban
  TO            // Tổ
  NHOM          // Nhóm
  KHAC          // Khác
}
```

#### Fields Breakdown

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `ma` | String (unique) | Mã định danh phòng ban | PB001, BP002 |
| `ten` | String | Tên phòng ban | "Phòng Kế toán" |
| `loai` | LoaiPhongban | Loại phòng ban | PHONGBAN, BOPHAN |
| `level` | Int | Cấp bậc (1=cao nhất) | 1, 2, 3 |
| `parentId` | String? | ID phòng ban cha | uuid |
| `truongPhongId` | String? | ID nhân viên làm trưởng phòng | uuid |

#### Indexes

```prisma
@@index([ma])
@@index([parentId])
@@index([level])
@@index([truongPhongId])
```

---

### Model: Nhanvien

```prisma
model Nhanvien {
  id                    String              @id @default(uuid())
  maNV                  String              @unique // Mã nhân viên
  hoTen                 String              // Họ và tên đầy đủ
  hoTenDem              String?             // Họ và tên đệm
  ten                   String?             // Tên
  gioiTinh              GioiTinh?           @default(KHAC)
  ngaySinh              DateTime?
  soDienThoai           String?
  email                 String?             @unique
  cmnd                  String?             @unique // CMND/CCCD
  ngayCapCmnd           DateTime?
  noiCapCmnd            String?
  diaChiThuongTru       String?
  diaChiTamTru          String?
  diaChiHienTai         String?
  
  // Thông tin công việc
  phongbanId            String?
  chucVu                String?             // Chức vụ
  viTri                 String?             // Vị trí công việc
  ngayVaoLam            DateTime?
  ngayNghiViec          DateTime?
  trangThai             TrangThaiNhanvien   @default(DANGLAMVIEC)
  loaiHopDong           String?
  
  // Thông tin lương
  luongCoBan            Decimal?            @default(0) @postgres.Decimal(20, 3)
  phuCap                Decimal?            @default(0) @postgres.Decimal(20, 3)
  heSoLuong             Decimal?            @default(1) @postgres.Decimal(10, 2)
  
  // Thông tin ngân hàng
  soTaiKhoan            String?
  nganHang              String?
  chiNhanh              String?
  
  // Thông tin liên hệ khẩn cấp
  nguoiLienHeKhanCap    String?
  sdtKhanCap            String?
  quanHeKhanCap         String?
  
  // Metadata
  ghiChu                String?
  avatar                String?
  order                 Int?                @default(1)
  isActive              Boolean             @default(true)
  createdAt             DateTime            @default(now())
  updatedAt             DateTime            @updatedAt
  
  // Tích hợp với User
  userId                String?             @unique
  
  // Relations
  phongban              Phongban?           @relation("PhongbanNhanvien", fields: [phongbanId], references: [id])
  user                  User?               @relation("UserNhanvien", fields: [userId], references: [id])
  truongPhongOf         Phongban[]          @relation("TruongPhong")
}
```

#### Enum: GioiTinh

```prisma
enum GioiTinh {
  NAM
  NU
  KHAC
}
```

#### Enum: TrangThaiNhanvien

```prisma
enum TrangThaiNhanvien {
  DANGLAMVIEC   // Đang làm việc
  NGHIPHEP      // Nghỉ phép
  THUVIEC       // Thử việc
  DANGHIVIEC    // Đã nghỉ việc
  TAMNGHI       // Tạm nghỉ
  KHAC          // Khác
}
```

#### Fields Breakdown - Thông tin cá nhân

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `maNV` | String (unique) | Mã nhân viên | NV001 |
| `hoTen` | String | Họ và tên đầy đủ | "Nguyễn Văn A" |
| `hoTenDem` | String? | Họ và tên đệm (tách riêng) | "Nguyễn Văn" |
| `ten` | String? | Tên (tách riêng) | "A" |
| `gioiTinh` | GioiTinh | Giới tính | NAM, NU, KHAC |
| `ngaySinh` | DateTime? | Ngày sinh | 1990-01-01 |
| `soDienThoai` | String? | Số điện thoại | 0912345678 |
| `email` | String? (unique) | Email | user@example.com |
| `cmnd` | String? (unique) | CMND/CCCD | 001234567890 |

#### Fields Breakdown - Thông tin công việc

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `phongbanId` | String? | ID phòng ban | uuid |
| `chucVu` | String? | Chức vụ | "Trưởng phòng", "Nhân viên" |
| `viTri` | String? | Vị trí công việc | "Kế toán viên" |
| `ngayVaoLam` | DateTime? | Ngày vào làm | 2020-01-01 |
| `ngayNghiViec` | DateTime? | Ngày nghỉ việc | 2023-12-31 |
| `trangThai` | TrangThaiNhanvien | Trạng thái | DANGLAMVIEC |
| `loaiHopDong` | String? | Loại hợp đồng | "Chính thức", "Thử việc" |

#### Fields Breakdown - Thông tin lương

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `luongCoBan` | Decimal? | Lương cơ bản | 10000000.000 |
| `phuCap` | Decimal? | Phụ cấp | 2000000.000 |
| `heSoLuong` | Decimal? | Hệ số lương | 2.50 |

#### Fields Breakdown - Tích hợp User

| Field | Type | Description |
|-------|------|-------------|
| `userId` | String? (unique) | ID của User nếu nhân viên có tài khoản đăng nhập |

#### Indexes

```prisma
@@index([maNV])
@@index([hoTen])
@@index([phongbanId])
@@index([userId])
@@index([email])
@@index([trangThai])
```

---

### Tích hợp với Model User

```prisma
model User {
  // ... existing fields ...
  nhanvien Nhanvien? @relation("UserNhanvien")
}
```

## 📊 Relationships

### 1. Phongban Self-Reference (Phân cấp)

```
Phongban (parent)
  ├── Phongban (child level 2)
  │   ├── Phongban (child level 3)
  │   └── Phongban (child level 3)
  └── Phongban (child level 2)
```

**Example:**
```typescript
// Phòng ban cấp 1
const phongKinhDoanh = {
  ma: "PKD",
  ten: "Phòng Kinh Doanh",
  loai: "PHONGBAN",
  level: 1,
  parentId: null
}

// Bộ phận cấp 2 (thuộc Phòng Kinh Doanh)
const boPhanMarketing = {
  ma: "PKD-MKT",
  ten: "Bộ phận Marketing",
  loai: "BOPHAN",
  level: 2,
  parentId: phongKinhDoanh.id
}

// Tổ cấp 3 (thuộc Bộ phận Marketing)
const toDigitalMarketing = {
  ma: "PKD-MKT-DM",
  ten: "Tổ Digital Marketing",
  loai: "TO",
  level: 3,
  parentId: boPhanMarketing.id
}
```

### 2. Phongban ↔ Nhanvien (One-to-Many)

Một phòng ban có nhiều nhân viên:
```typescript
const phongKeToan = await prisma.phongban.findUnique({
  where: { id: "..." },
  include: {
    nhanviens: true // Danh sách nhân viên thuộc phòng ban
  }
})
```

### 3. Phongban ↔ Nhanvien (Trưởng phòng)

Một phòng ban có một trưởng phòng (là nhân viên):
```typescript
const phongKeToan = await prisma.phongban.findUnique({
  where: { id: "..." },
  include: {
    truongPhong: true // Thông tin trưởng phòng
  }
})
```

### 4. Nhanvien ↔ User (One-to-One)

Một nhân viên có thể có một tài khoản User:
```typescript
const nhanvien = await prisma.nhanvien.findUnique({
  where: { id: "..." },
  include: {
    user: true // Thông tin tài khoản đăng nhập
  }
})
```

## 🎯 Use Cases

### 1. Tạo cấu trúc phòng ban phân cấp

```typescript
// Tạo phòng ban cấp 1
const phongKinhDoanh = await prisma.phongban.create({
  data: {
    ma: "PKD",
    ten: "Phòng Kinh Doanh",
    loai: "PHONGBAN",
    level: 1,
    isActive: true
  }
})

// Tạo bộ phận cấp 2 thuộc Phòng Kinh Doanh
const boPhanMarketing = await prisma.phongban.create({
  data: {
    ma: "PKD-MKT",
    ten: "Bộ phận Marketing",
    loai: "BOPHAN",
    level: 2,
    parentId: phongKinhDoanh.id,
    isActive: true
  }
})

// Tạo tổ cấp 3 thuộc Bộ phận Marketing
const toDigital = await prisma.phongban.create({
  data: {
    ma: "PKD-MKT-DM",
    ten: "Tổ Digital Marketing",
    loai: "TO",
    level: 3,
    parentId: boPhanMarketing.id,
    isActive: true
  }
})
```

### 2. Tạo nhân viên và gán vào phòng ban

```typescript
const nhanvien = await prisma.nhanvien.create({
  data: {
    maNV: "NV001",
    hoTen: "Nguyễn Văn A",
    hoTenDem: "Nguyễn Văn",
    ten: "A",
    gioiTinh: "NAM",
    ngaySinh: new Date("1990-01-01"),
    soDienThoai: "0912345678",
    email: "nguyenvana@company.com",
    
    // Gán vào phòng ban
    phongbanId: boPhanMarketing.id,
    
    // Thông tin công việc
    chucVu: "Nhân viên",
    viTri: "Marketing Executive",
    ngayVaoLam: new Date("2020-01-01"),
    trangThai: "DANGLAMVIEC",
    loaiHopDong: "Chính thức",
    
    // Thông tin lương
    luongCoBan: 15000000,
    phuCap: 2000000,
    heSoLuong: 1.5,
    
    isActive: true
  }
})
```

### 3. Gán trưởng phòng cho phòng ban

```typescript
// Cập nhật phòng ban để gán trưởng phòng
await prisma.phongban.update({
  where: { id: boPhanMarketing.id },
  data: {
    truongPhongId: nhanvien.id
  }
})

// Query phòng ban với trưởng phòng
const phongban = await prisma.phongban.findUnique({
  where: { id: boPhanMarketing.id },
  include: {
    truongPhong: true,
    nhanviens: true
  }
})
```

### 4. Tích hợp Nhân viên với User

```typescript
// Tạo User trước
const user = await prisma.user.create({
  data: {
    email: "nguyenvana@company.com",
    password: hashedPassword,
    name: "Nguyễn Văn A",
    isActive: true
  }
})

// Tạo Nhân viên và link với User
const nhanvien = await prisma.nhanvien.create({
  data: {
    maNV: "NV001",
    hoTen: "Nguyễn Văn A",
    email: "nguyenvana@company.com",
    userId: user.id, // Link với User
    phongbanId: boPhanMarketing.id,
    // ... other fields
  }
})

// Hoặc update Nhân viên có sẵn để link với User
await prisma.nhanvien.update({
  where: { id: nhanvien.id },
  data: {
    userId: user.id
  }
})
```

### 5. Query phân cấp phòng ban (lấy toàn bộ cây)

```typescript
// Lấy phòng ban cấp 1 với tất cả children
const phongbanTree = await prisma.phongban.findMany({
  where: { level: 1 },
  include: {
    children: {
      include: {
        children: {
          include: {
            children: true // Lấy đến cấp 4
          }
        }
      }
    },
    truongPhong: true,
    nhanviens: true
  }
})
```

### 6. Tìm nhân viên theo phòng ban và trạng thái

```typescript
const nhanviens = await prisma.nhanvien.findMany({
  where: {
    phongbanId: boPhanMarketing.id,
    trangThai: "DANGLAMVIEC",
    isActive: true
  },
  include: {
    phongban: true,
    user: true
  },
  orderBy: {
    hoTen: 'asc'
  }
})
```

### 7. Tìm tất cả phòng ban con của một phòng ban

```typescript
const childPhongbans = await prisma.phongban.findMany({
  where: {
    parentId: phongKinhDoanh.id
  },
  include: {
    nhanviens: true,
    truongPhong: true
  }
})
```

### 8. Thống kê nhân viên theo phòng ban

```typescript
const phongbanStats = await prisma.phongban.findMany({
  include: {
    _count: {
      select: {
        nhanviens: true
      }
    },
    nhanviens: {
      where: {
        trangThai: "DANGLAMVIEC"
      }
    }
  }
})
```

## 🔍 Query Examples - Advanced

### Query 1: Lấy toàn bộ nhân viên thuộc một phòng ban và các phòng ban con

```typescript
async function getNhanviensByPhongbanHierarchy(phongbanId: string) {
  // Lấy phòng ban và tất cả children
  const phongban = await prisma.phongban.findUnique({
    where: { id: phongbanId },
    include: {
      children: {
        include: {
          children: {
            include: {
              children: true
            }
          }
        }
      }
    }
  })
  
  // Collect tất cả IDs của phòng ban và children
  const phongbanIds = collectPhongbanIds(phongban)
  
  // Lấy tất cả nhân viên
  const nhanviens = await prisma.nhanvien.findMany({
    where: {
      phongbanId: { in: phongbanIds }
    },
    include: {
      phongban: true,
      user: true
    }
  })
  
  return nhanviens
}

function collectPhongbanIds(phongban: any): string[] {
  let ids = [phongban.id]
  
  if (phongban.children && phongban.children.length > 0) {
    for (const child of phongban.children) {
      ids = ids.concat(collectPhongbanIds(child))
    }
  }
  
  return ids
}
```

### Query 2: Tìm User và thông tin Nhân viên tương ứng

```typescript
const userWithNhanvien = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    nhanvien: {
      include: {
        phongban: {
          include: {
            parent: true,
            truongPhong: true
          }
        }
      }
    }
  }
})

if (userWithNhanvien?.nhanvien) {
  console.log(`Nhân viên: ${userWithNhanvien.nhanvien.hoTen}`)
  console.log(`Phòng ban: ${userWithNhanvien.nhanvien.phongban?.ten}`)
  console.log(`Chức vụ: ${userWithNhanvien.nhanvien.chucVu}`)
}
```

## 📝 Notes

### 1. Về tích hợp User-Nhanvien
- `userId` trong Nhanvien là **optional** - không phải nhân viên nào cũng cần tài khoản
- Nhân viên có `userId` có thể đăng nhập vào hệ thống
- Nhân viên không có `userId` chỉ là thông tin quản lý nội bộ

### 2. Về cấu trúc phân cấp Phongban
- `level` giúp xác định cấp bậc: 1 (cao nhất), 2, 3, ...
- `parentId` tạo mối quan hệ cha-con
- Có thể có nhiều cấp phân cấp tùy theo cơ cấu tổ chức

### 3. Về Trưởng phòng
- `truongPhongId` trỏ đến một Nhanvien
- Trưởng phòng cũng phải là nhân viên thuộc phòng ban đó (nên validate trong business logic)

### 4. Về validation
- Nên validate `email` unique trong Nhanvien
- Nên validate `cmnd` unique
- Nên validate `maNV` unique
- Nên validate `level` phù hợp với `parentId`

## 🚀 Migration Status

✅ Schema đã được sync với database sử dụng `prisma db push`

**Command đã chạy:**
```bash
bunx prisma db push
```

**Result:**
```
🚀 Your database is now in sync with your Prisma schema.
✔ Generated Prisma Client
```

## 📦 Tables Created

1. **Phongban** table với các columns:
   - id, ma, ten, loai, level, moTa, dienThoai, email, diaChi
   - truongPhongId, parentId, order, isActive, createdAt, updatedAt

2. **Nhanvien** table với các columns:
   - Thông tin cá nhân: id, maNV, hoTen, hoTenDem, ten, gioiTinh, ngaySinh, soDienThoai, email, cmnd, v.v.
   - Thông tin công việc: phongbanId, chucVu, viTri, ngayVaoLam, ngayNghiViec, trangThai, loaiHopDong
   - Thông tin lương: luongCoBan, phuCap, heSoLuong
   - Thông tin ngân hàng: soTaiKhoan, nganHang, chiNhanh
   - Tích hợp: userId

3. **Enums created:**
   - LoaiPhongban (PHONGBAN, BOPHAN, PHONG, BAN, TO, NHOM, KHAC)
   - GioiTinh (NAM, NU, KHAC)
   - TrangThaiNhanvien (DANGLAMVIEC, NGHIPHEP, THUVIEC, DANGHIVIEC, TAMNGHI, KHAC)

## 🎨 UI Considerations

### Form Nhân viên nên có các sections:
1. **Thông tin cá nhân**: Họ tên, giới tính, ngày sinh, CMND, địa chỉ
2. **Thông tin liên hệ**: SĐT, email
3. **Thông tin công việc**: Phòng ban (dropdown), chức vụ, vị trí, ngày vào làm, trạng thái
4. **Thông tin lương**: Lương cơ bản, phụ cấp, hệ số lương
5. **Thông tin ngân hàng**: Số tài khoản, ngân hàng
6. **Liên hệ khẩn cấp**: Người liên hệ, SĐT
7. **Tích hợp tài khoản**: Chọn User (nếu cần)

### Form Phòng ban nên có:
1. **Thông tin cơ bản**: Mã, tên, loại, cấp bậc
2. **Phân cấp**: Chọn phòng ban cha (nếu có)
3. **Trưởng phòng**: Chọn nhân viên (dropdown)
4. **Thông tin liên hệ**: Điện thoại, email, địa chỉ

## 🔐 Security Considerations

1. Chỉ cho phép admin/HR quản lý Nhân viên & Phòng ban
2. Nhân viên chỉ được xem thông tin của mình (trừ admin)
3. Dữ liệu nhạy cảm như lương, CMND nên được bảo vệ đặc biệt
4. Log mọi thay đổi về thông tin nhân viên (sử dụng AuditLog)

## ✅ Checklist

- [x] Thêm model Phongban vào schema
- [x] Thêm model Nhanvien vào schema
- [x] Thêm các enums cần thiết
- [x] Tích hợp với model User
- [x] Tạo indexes cho performance
- [x] Sync schema với database
- [ ] Tạo NestJS module cho Nhanvien
- [ ] Tạo NestJS module cho Phongban
- [ ] Tạo CRUD APIs
- [ ] Tạo GraphQL resolvers (nếu cần)
- [ ] Tạo UI components (Angular)
- [ ] Thêm permissions cho các actions
- [ ] Thêm validation rules
- [ ] Viết tests

## 📚 Related Documentation

- Prisma Documentation: https://www.prisma.io/docs
- NestJS Prisma: https://docs.nestjs.com/recipes/prisma
