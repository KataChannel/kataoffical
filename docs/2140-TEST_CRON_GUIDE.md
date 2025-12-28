# 🧪 HƯỚNG DẪN TEST CRON JOB

## Test đã thực hiện

### ✅ Test 1: Kiểm tra script đồng bộ
```bash
cd /chikiet/kata2025/rausachfinalv2/api
./test-sync.sh
```

**Kết quả:**
- ✅ Kết nối database source thành công
- ✅ Kết nối database target thành công  
- ✅ Script đồng bộ hoạt động (48 bảng, 445,725 records)
- ✅ node-cron đã được cài đặt

---

## 🔍 Test 2: Kiểm tra cron job trong ứng dụng

### Option 1: Test bằng cách chạy ứng dụng (Recommended)

```bash
cd /chikiet/kata2025/rausachfinalv2/api
./test-cron-app.sh
# hoặc
bun run start:dev
```

**Quan sát log - bạn sẽ thấy:**
```
[DatabaseSyncService] ✅ Đã thiết lập lịch đồng bộ database: 7h sáng và 17h chiều (giờ VN)
[DatabaseSyncService] 🧪 Test cron đã được thiết lập (chạy mỗi phút để test)
[DatabaseSyncService] ⏰ Test cron đang chạy - 27/12/2025 21:30:00
[DatabaseSyncService] ⏰ Test cron đang chạy - 27/12/2025 21:31:00
[DatabaseSyncService] ⏰ Test cron đang chạy - 27/12/2025 21:32:00
```

**Sau khi test xong**, xóa hoặc comment test cron:
- Mở file: [src/services/database-sync.service.ts](api/src/services/database-sync.service.ts)
- Xóa dòng `this.setupTestCron();` trong `onModuleInit()`
- Xóa hoặc comment method `setupTestCron()`

---

### Option 2: Test API endpoint để trigger thủ công

**Bước 1:** Khởi động ứng dụng
```bash
bun run start:dev
```

**Bước 2:** Login để lấy token
```bash
curl -X POST http://localhost:3331/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"your_username","password":"your_password"}'
```

**Bước 3:** Test manual sync endpoint
```bash
curl -X POST http://localhost:3331/database-sync/manual-sync \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "message": "Đồng bộ database đã được kích hoạt",
  "timestamp": "2025-12-27T14:30:00.000Z"
}
```

---

### Option 3: Test trong Docker (Production-like)

```bash
cd /chikiet/kata2025/rausachfinalv2
docker-compose up --build
```

**Xem log:**
```bash
docker logs <container_name> -f | grep "DatabaseSyncService"
```

---

## 📅 Lịch chạy thực tế

Sau khi test xong và xóa test cron, hệ thống sẽ chạy:

| Thời gian | Timezone | Cron Expression | Mô tả |
|-----------|----------|-----------------|-------|
| 7:00 AM | Asia/Ho_Chi_Minh | `0 0 * * *` | Đồng bộ buổi sáng |
| 5:00 PM | Asia/Ho_Chi_Minh | `0 10 * * *` | Đồng bộ buổi chiều |

---

## 🔧 Troubleshooting

### Cron không chạy?
1. Kiểm tra timezone:
   ```typescript
   timezone: 'Asia/Ho_Chi_Minh'
   ```

2. Kiểm tra log:
   ```bash
   docker logs <container> | grep "cron"
   ```

### Script lỗi?
1. Test script trực tiếp:
   ```bash
   ./scripts/sync-database.sh
   ```

2. Kiểm tra quyền:
   ```bash
   ls -la scripts/sync-database.sh
   chmod +x scripts/sync-database.sh
   ```

### Database không đồng bộ?
1. Kiểm tra connection:
   ```bash
   PGPASSWORD=7bhNHJcSEbWln9v psql -h 116.118.49.243 -p 55432 -U AWois79wFA1bxMK -d rausachfinal -c "SELECT 1"
   ```

2. Xem log chi tiết:
   ```bash
   tail -f /tmp/db-sync-*.log
   ```

---

## ✅ Checklist trước khi deploy

- [x] Test script đồng bộ thành công
- [x] Test cron job local
- [ ] Xóa/comment test cron (setupTestCron)
- [ ] Build Docker image
- [ ] Test trong Docker
- [ ] Deploy production
- [ ] Kiểm tra log sau 7h sáng & 17h chiều

---

## 📝 Files đã tạo

1. **Script đồng bộ:** [api/scripts/sync-database.sh](api/scripts/sync-database.sh)
2. **Service:** [api/src/services/database-sync.service.ts](api/src/services/database-sync.service.ts)
3. **Controller:** [api/src/database-sync/database-sync.controller.ts](api/src/database-sync/database-sync.controller.ts)
4. **Module:** [api/src/database-sync/database-sync.module.ts](api/src/database-sync/database-sync.module.ts)
5. **Test scripts:** 
   - [api/test-sync.sh](api/test-sync.sh)
   - [api/test-cron-app.sh](api/test-cron-app.sh)

---

## 🚀 Quick Start Test

```bash
# 1. Test script đồng bộ
cd /chikiet/kata2025/rausachfinalv2/api
./test-sync.sh

# 2. Test cron trong app
bun run start:dev
# Xem log → thấy test cron chạy mỗi phút

# 3. Sau khi OK, xóa test cron trong code

# 4. Deploy
cd /chikiet/kata2025/rausachfinalv2
docker-compose up -d --build
```
