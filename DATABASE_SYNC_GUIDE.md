# Hướng dẫn sử dụng tính năng đồng bộ database tự động

## Tổng quan
Hệ thống đã được cấu hình để tự động đồng bộ dữ liệu từ database `rausachfinal` sang `rausachv3` vào 2 khung giờ:
- **7h sáng** (giờ Việt Nam)
- **17h chiều** (giờ Việt Nam)

## Các tệp tin đã được tạo

### 1. Script đồng bộ database
**File:** `api/scripts/sync-database.sh`
- Thực hiện dump database từ `rausachfinal`
- Restore vào database `rausachv3`
- Tự động ghi log vào `/tmp/db-sync-*.log`
- Tự động xóa file dump và log cũ > 7 ngày

### 2. Service lên lịch
**File:** `api/src/services/database-sync.service.ts`
- Sử dụng `node-cron` để lên lịch chạy tự động
- Timezone: Asia/Ho_Chi_Minh
- Tích hợp với NestJS lifecycle

## Cách hoạt động

1. **Tự động chạy định kỳ:**
   - Service sẽ tự động kích hoạt khi ứng dụng khởi động
   - Chạy vào 7h và 17h hàng ngày (giờ VN)

2. **Quy trình đồng bộ:**
   ```
   Source DB (rausachfinal) 
   → pg_dump 
   → file .sql 
   → psql restore 
   → Target DB (rausachv3)
   ```

3. **Logging:**
   - Log được lưu tại `/tmp/db-sync-YYYYMMDD-HHMMSS.log`
   - Log tự động xóa sau 7 ngày

## Kiểm tra hoạt động

### Xem log đồng bộ
```bash
# Xem log mới nhất
ls -lt /tmp/db-sync-*.log | head -1 | xargs tail -f

# Xem tất cả log
ls -lt /tmp/db-sync-*.log
```

### Đồng bộ thủ công (test)
```bash
# Chạy script trực tiếp
cd /chikiet/kata2025/rausachfinalv2/api
./scripts/sync-database.sh
```

### Kiểm tra trong ứng dụng
Sau khi khởi động ứng dụng, bạn sẽ thấy log:
```
[DatabaseSyncService] Đã thiết lập lịch đồng bộ database: 7h sáng và 17h chiều (giờ VN)
```

## Cấu hình Cron Schedule

Nếu muốn thay đổi thời gian chạy, sửa file `database-sync.service.ts`:

```typescript
// Cron format: minute hour * * *
cron.schedule('0 0 * * *', ...)  // 7h sáng VN (0h UTC)
cron.schedule('0 10 * * *', ...) // 17h VN (10h UTC)
```

## Lưu ý quan trọng

1. **Quyền truy cập database:** Đảm bảo database credentials đúng
2. **Dung lượng disk:** Script tự động xóa file dump và log cũ
3. **Thời gian chạy:** Quá trình có thể mất vài phút tùy kích thước database
4. **Network:** Cần kết nối đến database server `116.118.49.243:55432`
5. **PostgreSQL client:** Container đã được cài đặt `postgresql-client`

## Khởi động lại service

Sau khi deploy, rebuild Docker container:
```bash
cd /chikiet/kata2025/rausachfinalv2
docker-compose down
docker-compose up -d --build
```

## Troubleshooting

### Kiểm tra service có chạy không
```bash
docker logs <container_name> | grep "DatabaseSyncService"
```

### Kiểm tra quyền thực thi script
```bash
ls -la api/scripts/sync-database.sh
# Nếu không có quyền x, chạy:
chmod +x api/scripts/sync-database.sh
```

### Test kết nối database
```bash
PGPASSWORD=7bhNHJcSEbWln9v psql -h 116.118.49.243 -p 55432 -U AWois79wFA1bxMK -d rausachfinal -c "\dt"
```
