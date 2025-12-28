# 🚀 PHÂN TÍCH HIỆU NĂNG HỆ THỐNG - RAUSACH FINAL

**Ngày phân tích:** 23/12/2025  
**Mục tiêu:** Tối ưu tốc độ IDE, giảm dung lượng khi deploy

---

## 📊 TỔNG QUAN DUNG LƯỢNG HIỆN TẠI

| Thành phần | Dung lượng | Tỷ lệ | Vấn đề |
|------------|:---------:|:-----:|--------|
| **frontend/node_modules** | **4.0 GB** | 57% | 🔴 Quá lớn |
| **api/rausach_json** | **1.3 GB** | 18% | 🔴 Backup data trong source |
| **api/node_modules** | **942 MB** | 13% | 🟡 Bình thường |
| **.git** | **583 MB** | 8% | 🟡 Git history lớn |
| **frontend/.angular cache** | **87 MB** | 1% | 🟡 Cache build |
| **frontend/dist** | **36 MB** | 0.5% | ✅ OK |
| Khác | ~200 MB | 2.5% | — |
| **TỔNG** | **~7.0 GB** | 100% | — |

---

## 🔴 VẤN ĐỀ GÂY CHẬM IDE

### 1️⃣ Số lượng file TypeScript/JavaScript quá lớn

```
Tổng file .ts/.js trong workspace: 309,964 files
File source code thực sự (không node_modules): 935 files
```

**Nguyên nhân:** IDE (VS Code) phải index **310,000 files** bao gồm cả node_modules

**Giải pháp:**
```json
// .vscode/settings.json
{
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/.git/**": true,
    "**/dist/**": true,
    "**/rausach_json/**": true,
    "**/.angular/**": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/rausach_json": true,
    "**/.angular": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

---

### 2️⃣ Thư mục backup dữ liệu trong source

| File/Folder | Dung lượng | Vấn đề |
|-------------|:----------:|--------|
| `api/rausach_json/` | 1.3 GB | AuditLog backup JSON (25+ files) |
| `api/prisma_seed_*.json` | ~4 MB | Seed data cũ |
| `*.xlsx` files | ~500 KB | File Excel trong root |

**File lớn nhất:**
```
106M  AuditLog_part20.json
 76M  AuditLog_part1.json
 74M  AuditLog_part13.json
 53M  AuditLog_part22.json
 ...
```

**Giải pháp:**
- Di chuyển `rausach_json/` ra ngoài source hoặc server backup riêng
- Thêm vào `.gitignore` nếu chưa có
- Xóa các file `prisma_seed_*.json` cũ

---

### 3️⃣ File "copy" trùng lặp

| File | Dòng code | Vấn đề |
|------|:---------:|--------|
| `donhang.service.ts` | 4,059 | File gốc |
| `donhang.service copy.ts` | 2,826 | ❌ Trùng lặp |
| `donhang.service copy 2.ts` | 3,339 | ❌ Trùng lặp |
| `donhang.service copy 3.ts` | 3,339 | ❌ Trùng lặp |
| `dathang.service copy.ts` | ~1,000 | ❌ Trùng lặp |
| `dathang.service copy 2.ts` | 1,089 | ❌ Trùng lặp |
| `khachhang.service copy.ts` | — | ❌ Trùng lặp |

**Frontend tương tự:**
```
nhucaudathang.component copy 4.ts  (2,822 lines)
nhucaudathang.component copy 5.ts  (2,801 lines)
nhucaudathang.component copy 3.ts  (2,326 lines)
detaildonhang.component copy 3.ts  (1,568 lines)
listimportdata.component copy 2.ts (1,584 lines)
```

**Giải pháp:**
```bash
# Xóa các file copy trong API
rm -f api/src/donhang/donhang.service\ copy*.ts
rm -f api/src/dathang/dathang.service\ copy*.ts
rm -f api/src/khachhang/khachhang.service\ copy.ts

# Xóa các file copy trong Frontend
find frontend/src -name "*copy*.ts" -delete
```

---

### 4️⃣ File backup .bak

```
api/package.json.bak
api/.env.backup
api/src/nhacungcap/nhacungcap.service.ts.bak
api/src/phieukho/phieukho.service.ts.bak
api/src/sanpham/sanpham.service.ts.bak
api/src/chotkho/chotkho.service.ts.bak
api/src/banggia/banggia.service.ts.bak
api/src/dashboard/dashboard.service.ts.bak
api/src/khachhang/khachhang.service.ts.bak
api/src/shared/interceptors/date-response.interceptor.ts.bak
```

**Giải pháp:**
```bash
find . -name "*.bak" -delete
find . -name "*.backup" -delete
find . -name "*.old" -delete
```

---

### 5️⃣ Service files quá lớn (God Class)

| File | Lines | Vấn đề |
|------|:-----:|--------|
| `donhang.service.ts` | **4,059** | 🔴 Quá lớn, cần tách |
| `dathang.service.ts` | 2,095 | 🟡 Lớn |
| `graphql/enhanced-universal.service.ts` | 1,008 | 🟡 OK |
| `banggia.service.ts` | 837 | ✅ OK |

**Đề xuất tách `donhang.service.ts`:**
```
donhang/
├── donhang.service.ts        (core CRUD)
├── donhang-search.service.ts (search, filter)
├── donhang-status.service.ts (status machine)
├── donhang-export.service.ts (export Excel, PDF)
├── donhang-congno.service.ts (công nợ)
└── donhang-report.service.ts (báo cáo)
```

---

## 🟡 TỐI ƯU KHI DEPLOY LÊN SERVER

### 1️⃣ Dockerfile API - Hiện tại

**Vấn đề:**
```dockerfile
# Copy TOÀN BỘ app từ builder (bao gồm node_modules 942MB)
COPY --from=builder /app /app
```

**Tối ưu:**
```dockerfile
# === OPTIMIZED DOCKERFILE ===
FROM oven/bun:latest AS builder
RUN apt-get update -y && apt-get install -y openssl libssl-dev
WORKDIR /app

# Copy package files first (cache layer)
COPY package.json bun.lockb ./
RUN bun install --production --frozen-lockfile

# Copy source
COPY prisma ./prisma
COPY src ./src
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Generate Prisma
RUN bun prisma generate

# Build
RUN bun run build

# === PRODUCTION IMAGE ===
FROM oven/bun:slim
RUN apt-get update -y && apt-get install -y openssl libssl-dev && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# Copy only production dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Non-root user for security
RUN addgroup --system app && adduser --system --group app
USER app

EXPOSE 3331
CMD ["bun", "run", "dist/src/main.js"]
```

**Kết quả ước tính:**
| | Hiện tại | Tối ưu |
|--|:-------:|:------:|
| Image size | ~1.5 GB | ~400 MB |
| Build time | ~5 phút | ~3 phút |

---

### 2️⃣ Dockerfile Frontend - Đã tốt

Frontend Dockerfile đã tối ưu (chỉ copy dist):
```dockerfile
COPY ./dist/frontend /app/dist/frontend
```

**Cải thiện thêm:**
```dockerfile
FROM node:18-alpine AS runtime
WORKDIR /app

# Add non-root user
RUN addgroup -S app && adduser -S app -G app

COPY --chown=app:app ./dist/frontend /app/dist/frontend

USER app
EXPOSE 4301
CMD ["node", "dist/frontend/server/server.mjs"]
```

---

### 3️⃣ Docker Compose Optimization

**Thêm resource limits:**
```yaml
services:
  berausach:
    # ... existing config ...
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '0.5'
          memory: 512M
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3331/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  ferausach:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
```

---

### 4️⃣ Database Connection Pool

**Hiện tại trong docker-compose:**
```
connection_limit=25&pool_timeout=60&connect_timeout=20
```

**Đề xuất theo traffic:**
| Traffic | connection_limit | pool_timeout |
|---------|:----------------:|:------------:|
| Thấp (<100 users) | 10-15 | 30s |
| Trung bình | 25-50 | 60s |
| Cao (>500 users) | 50-100 | 120s |

---

## 📁 CẤU TRÚC .GITIGNORE TỐI ƯU

```gitignore
# === NODE MODULES ===
node_modules/
**/node_modules/

# === BUILD OUTPUTS ===
dist/
**/dist/
.angular/
.next/

# === DATA & BACKUPS ===
rausach_json/
*.bak
*.backup
*.old
prisma_seed_*.json

# === COPY FILES (development artifacts) ===
**/*copy*.ts
**/*copy*.js
**/* copy *.ts
**/* copy *.js

# === LARGE FILES ===
*.xlsx
*.csv
uploads/

# === ENVIRONMENT ===
.env
.env.*
!.env.example

# === LOGS ===
*.log
logs/

# === IDE ===
.idea/
.vscode/
*.swp
*.swo

# === OS ===
.DS_Store
Thumbs.db
```

---

## 📈 BẢNG TỔNG HỢP TỐI ƯU

| Hành động | Tiết kiệm | Độ ưu tiên | Thời gian |
|-----------|:---------:|:----------:|:---------:|
| Xóa `rausach_json/` khỏi source | **1.3 GB** | 🔴 Cao | 5 phút |
| Xóa file `*copy*.ts` | ~50 MB | 🔴 Cao | 5 phút |
| Xóa file `*.bak` | ~5 MB | 🟡 TB | 2 phút |
| Cấu hình VS Code excludes | - | 🔴 Cao (IDE speed) | 5 phút |
| Tối ưu Dockerfile API | ~1 GB image | 🟡 TB | 30 phút |
| Tách donhang.service.ts | - | 🟡 TB (maintainability) | 2-3 giờ |
| Clean git history | ~400 MB | ⚪ Thấp | 30 phút |

---

## 🛠️ SCRIPT TỐI ƯU NHANH

```bash
#!/bin/bash
# cleanup-workspace.sh

echo "🧹 Cleaning up workspace..."

# 1. Remove copy files
find . -name "*copy*.ts" -not -path "*/node_modules/*" -delete
find . -name "*copy*.js" -not -path "*/node_modules/*" -delete
find . -name "* copy *.ts" -not -path "*/node_modules/*" -delete

# 2. Remove backup files  
find . -name "*.bak" -delete
find . -name "*.backup" -delete
find . -name "*.old" -delete

# 3. Remove old seed files
rm -f api/prisma_seed_*.json

# 4. Clean Angular cache
rm -rf frontend/.angular

# 5. Clean dist folders (nếu cần rebuild)
# rm -rf api/dist frontend/dist

# 6. Move rausach_json to backup location
if [ -d "api/rausach_json" ]; then
  echo "⚠️  Moving rausach_json to /backup/rausach_json..."
  mkdir -p /backup
  mv api/rausach_json /backup/
fi

echo "✅ Cleanup complete!"
```

---

## 📊 KẾT QUẢ SAU TỐI ƯU (DỰ KIẾN)

| Metric | Trước | Sau | Cải thiện |
|--------|:-----:|:----:|:---------:|
| Workspace size | 7.0 GB | 5.2 GB | -26% |
| IDE indexing time | 30-60s | 5-10s | **-80%** |
| Docker image (API) | 1.5 GB | 400 MB | **-73%** |
| Git clone time | 2-3 phút | 30s | **-75%** |
| TypeScript compilation | 15-20s | 8-10s | -50% |

---

## ✅ CHECKLIST TỐI ƯU

### Ngay lập tức (5 phút)
- [ ] Thêm VS Code settings.json với excludes
- [ ] Xóa các file `*copy*.ts`
- [ ] Xóa các file `*.bak`

### Ngắn hạn (1 ngày)
- [ ] Di chuyển `rausach_json/` ra ngoài source
- [ ] Cập nhật `.gitignore`
- [ ] Tối ưu Dockerfile API

### Dài hạn (1-2 tuần)
- [ ] Tách `donhang.service.ts` thành các module nhỏ
- [ ] Clean git history với `git filter-branch` hoặc BFG
- [ ] Setup CI/CD với Docker layer caching

---

## 🎯 KẾT LUẬN

**Nguyên nhân chính khiến IDE chậm:**
1. **310,000 files** trong workspace (chủ yếu node_modules)
2. **1.3 GB backup data** (`rausach_json/`) trong source
3. **Nhiều file copy trùng lặp** (~15,000 lines code thừa)

**Ưu tiên cao nhất:**
1. ✅ Cấu hình VS Code excludes
2. ✅ Xóa file copy/backup
3. ✅ Di chuyển rausach_json ra ngoài

**Không cần thay đổi code** - chỉ cần cleanup và cấu hình đúng!
