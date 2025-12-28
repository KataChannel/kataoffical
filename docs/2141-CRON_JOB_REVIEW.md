# 📊 REVIEW TOÀN BỘ CẤU HÌNH CRON JOB

## 🎯 Tổng quan
Hệ thống cron job đồng bộ database từ `rausachfinal` sang `rausachv3` hiện đang được cấu hình để chạy **TRÊN SERVER** (trong Docker container), KHÔNG phải trên máy local.

---

## 🔍 Chi tiết cấu hình hiện tại

### 1. **Script đồng bộ database** ✅
**File:** `api/scripts/sync-database.sh`

**Kết nối database:**
```bash
SOURCE: 116.118.49.243:55432/rausachfinal
TARGET: 116.118.49.243:55432/rausachv3
```

**Vị trí chạy:** Cả local và server (tùy môi trường)
- ✅ Đã test thành công trên **local** (48 bảng, 445,725 records)
- ⏳ Chưa deploy lên **server**

---

### 2. **Service Cron Job** ✅
**File:** `api/src/services/database-sync.service.ts`

**Script path trong code:**
```typescript
const scriptPath = '/app/scripts/sync-database.sh';  // ⚠️ ĐÂY LÀ ĐƯỜNG DẪN DOCKER
```

**Lịch chạy:**
```typescript
// 7h sáng VN
cron.schedule('0 0 * * *', ..., { timezone: 'Asia/Ho_Chi_Minh' })

// 17h chiều VN  
cron.schedule('0 10 * * *', ..., { timezone: 'Asia/Ho_Chi_Minh' })
```

**Vị trí chạy:** Sẽ chạy **TRONG DOCKER CONTAINER** khi deploy
- Đường dẫn `/app/` là đường dẫn trong container
- Local test dùng đường dẫn tương đối `./scripts/sync-database.sh`

---

### 3. **Dockerfile** ✅
**File:** `api/Dockerfile`

```dockerfile
# Copy sync scripts
COPY scripts ./scripts

# Set permission
RUN chmod +x /app/scripts/*.sh
```

**Môi trường chạy:** **SERVER - Docker Container**
- Image: `rausach-backend:latest`
- Container sẽ có script tại `/app/scripts/sync-database.sh`
- Có cài `postgresql-client` để chạy pg_dump/psql

---

### 4. **Docker Compose** ⏳
**File:** `docker-compose.v3.yml`

```yaml
services:
  api:
    image: rausach-backend:latest
    container_name: rausachv3-api
    restart: always
    ports:
      - "12101:3331"
    environment:
      - DATABASE_URL=postgresql://...@116.118.49.243:55432/rausachv3
```

**Vị trí chạy:** **SERVER** (116.118.49.243 hoặc server khác)
- Container sẽ tự động restart nếu crash
- Cron job sẽ chạy trong container này

---

## 🏗️ Kiến trúc hiện tại

```
┌─────────────────────────────────────────────────────┐
│                   SERVER                             │
│                                                      │
│  ┌─────────────────────────────────────────┐        │
│  │  Docker Container: rausachv3-api        │        │
│  │  Image: rausach-backend:latest          │        │
│  │                                          │        │
│  │  ┌────────────────────────────┐          │        │
│  │  │  NestJS Application        │          │        │
│  │  │  - DatabaseSyncService     │          │        │
│  │  │  - Cron: 7h & 17h VN       │──────┐   │        │
│  │  └────────────────────────────┘      │   │        │
│  │                                      │   │        │
│  │  /app/scripts/sync-database.sh <────┘   │        │
│  │                                          │        │
│  └─────────────────────────────────────────┘        │
│                      │                               │
└──────────────────────┼───────────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────┐
        │  PostgreSQL Server       │
        │  116.118.49.243:55432    │
        │                          │
        │  ┌──────────────────┐    │
        │  │ rausachfinal     │◄───┤ SOURCE
        │  └──────────────────┘    │
        │                          │
        │  ┌──────────────────┐    │
        │  │ rausachv3        │◄───┤ TARGET
        │  └──────────────────┘    │
        └──────────────────────────┘
```

---

## ⚠️ VẤN ĐỀ QUAN TRỌNG

### 🔴 Problem 1: Đường dẫn script trong Service
**Hiện tại:**
```typescript
const scriptPath = '/app/scripts/sync-database.sh';  // Docker path
```

**Vấn đề:**
- Đường dẫn này chỉ hoạt động trong Docker
- Khi chạy local (bun run start:dev), sẽ **LỖI** vì không tìm thấy `/app/scripts/`

**Giải pháp:**
```typescript
// Tự động detect môi trường
const scriptPath = process.env.NODE_ENV === 'production' 
  ? '/app/scripts/sync-database.sh'      // Docker
  : './scripts/sync-database.sh';        // Local
```

---

### 🔴 Problem 2: Test Cron vẫn đang bật
**Hiện tại:**
```typescript
this.setupTestCron(); // Test cron chạy mỗi phút
```

**Vấn đề:**
- Nếu deploy lên server như này, test cron sẽ chạy mỗi phút
- Spam log không cần thiết

**Giải pháp:**
- Xóa hoặc comment dòng `this.setupTestCron();`
- Hoặc chỉ enable khi `NODE_ENV !== 'production'`

---

### 🟡 Problem 3: Log file location
**Hiện tại:**
```bash
LOG_FILE="/tmp/db-sync-$(date +"%Y%m%d-%H%M%S").log"
```

**Vấn đề:**
- Log trong container sẽ mất khi container restart
- Không có volume mount cho `/tmp`

**Giải pháp:**
```yaml
# Trong docker-compose.v3.yml
volumes:
  - ./logs:/app/logs

# Trong script
LOG_FILE="/app/logs/db-sync-$(date +"%Y%m%d-%H%M%S").log"
```

---

## ✅ Những gì đã ĐÚNG

1. ✅ Cron schedule đúng timezone (Asia/Ho_Chi_Minh)
2. ✅ Script đồng bộ đã test thành công
3. ✅ Dockerfile có cài postgresql-client
4. ✅ Script có permission execute
5. ✅ Database connections đúng (116.118.49.243)
6. ✅ Module đã được import vào AppModule
7. ✅ Service tự động khởi động với onModuleInit()

---

## 📋 TÓM TẮT

| Thành phần | Vị trí hiện tại | Trạng thái |
|------------|-----------------|------------|
| Script đồng bộ | Local & Server (chưa deploy) | ✅ Hoạt động |
| Cron Service | Server (Docker) | ⏳ Chưa deploy |
| Database Source | Server 116.118.49.243 | ✅ Online |
| Database Target | Server 116.118.49.243 | ✅ Online |
| Docker Image | Chưa build | ⏳ Chưa có |
| Test cron | Đang bật | ⚠️ Cần tắt |

---

## 🚀 KẾ HOẠCH DEPLOY

### Bước 1: Fix code trước khi deploy
```typescript
// 1. Fix script path trong database-sync.service.ts
const scriptPath = process.env.NODE_ENV === 'production' 
  ? '/app/scripts/sync-database.sh' 
  : './scripts/sync-database.sh';

// 2. Disable test cron trong production
if (process.env.NODE_ENV !== 'production') {
  this.setupTestCron();
}
```

### Bước 2: Update docker-compose
```yaml
# Thêm volume cho logs
volumes:
  - ./logs:/app/logs
```

### Bước 3: Build & Deploy
```bash
# Build image mới
docker build -t rausach-backend:latest ./api

# Deploy
docker-compose -f docker-compose.v3.yml up -d --build

# Kiểm tra log
docker logs rausachv3-api -f | grep "DatabaseSyncService"
```

### Bước 4: Verify
```bash
# Kiểm tra cron đã setup
docker logs rausachv3-api | grep "Đã thiết lập lịch đồng bộ"

# Test manual sync
curl -X POST https://apiv3.rausachtrangia.com/database-sync/manual-sync \
  -H "Authorization: Bearer TOKEN"
```

---

## 🎯 KẾT LUẬN

**Cron job hiện tại được thiết kế để chạy TRÊN SERVER (trong Docker container)**

**Trạng thái:**
- ✅ Code đã sẵn sàng 90%
- ⚠️ Cần fix 3 vấn đề trước khi deploy
- ⏳ Chưa được deploy lên server thực tế
- ✅ Đã test thành công ở local

**Next steps:**
1. Fix script path detection
2. Disable test cron cho production
3. Add volume cho logs
4. Build Docker image
5. Deploy lên server
6. Monitor log vào 7h & 17h
