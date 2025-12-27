#!/bin/bash

# Script đồng bộ dữ liệu TỐI ƯU - Loại trừ bảng log, dùng compression
# Chạy định kỳ vào 7h sáng và 17h chiều giờ Việt Nam

set -e

# Database connection details
SOURCE_HOST="116.118.49.243"
SOURCE_PORT="55432"
SOURCE_DB="rausachfinal"
SOURCE_USER="AWois79wFA1bxMK"
SOURCE_PASSWORD="7bhNHJcSEbWln9v"

TARGET_HOST="116.118.49.243"
TARGET_PORT="55432"
TARGET_DB="rausachv3"
TARGET_USER="AWois79wFA1bxMK"
TARGET_PASSWORD="7bhNHJcSEbWln9v"

# Timestamp for log
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

# Log directory - support both Docker and local
if [ -d "/app/logs" ]; then
    LOG_DIR="/app/logs"
else
    LOG_DIR="/tmp"
fi

LOG_FILE="${LOG_DIR}/db-sync-$(date +"%Y%m%d-%H%M%S").log"

echo "[$TIMESTAMP] 🚀 Bắt đầu đồng bộ dữ liệu (TỐI ƯU) từ $SOURCE_DB sang $TARGET_DB" | tee -a $LOG_FILE

# Kiểm tra dung lượng trống trước khi bắt đầu
AVAILABLE_MB=$(df /tmp | tail -1 | awk '{print int($4/1024)}')
REQUIRED_MB=100  # Yêu cầu ít nhất 100 MB trống

if [ $AVAILABLE_MB -lt $REQUIRED_MB ]; then
    echo "[$TIMESTAMP] ❌ ERROR: Không đủ dung lượng! Available: ${AVAILABLE_MB}MB, Required: ${REQUIRED_MB}MB" | tee -a $LOG_FILE
    exit 1
fi

echo "[$TIMESTAMP] ✅ Kiểm tra dung lượng: ${AVAILABLE_MB}MB available" | tee -a $LOG_FILE

# Export PGPASSWORD để không cần nhập password
export PGPASSWORD="$SOURCE_PASSWORD"

# Tạo file dump với compression
DUMP_FILE="/tmp/rausachfinal-dump-$(date +"%Y%m%d-%H%M%S").sql.gz"
echo "[$TIMESTAMP] 📦 Đang dump database $SOURCE_DB (với compression)..." | tee -a $LOG_FILE

# Dump với loại trừ các bảng log và dùng gzip
pg_dump -h "$SOURCE_HOST" -p "$SOURCE_PORT" -U "$SOURCE_USER" -d "$SOURCE_DB" \
  --no-owner \
  --no-privileges \
  --clean \
  --if-exists \
  --exclude-table=AuditLog \
  --exclude-table=performance_logs \
  --exclude-table=ErrorLog \
  --exclude-table-data='*_logs' \
  | gzip > "$DUMP_FILE"

if [ $? -eq 0 ]; then
    FILE_SIZE=$(ls -lh "$DUMP_FILE" | awk '{print $5}')
    echo "[$TIMESTAMP] ✅ Dump thành công. File: $DUMP_FILE (${FILE_SIZE})" | tee -a $LOG_FILE
else
    echo "[$TIMESTAMP] ❌ Lỗi khi dump database!" | tee -a $LOG_FILE
    exit 1
fi

# Restore vào database đích
echo "[$TIMESTAMP] 📥 Đang restore vào database $TARGET_DB..." | tee -a $LOG_FILE
export PGPASSWORD="$TARGET_PASSWORD"

gunzip < "$DUMP_FILE" | psql -h "$TARGET_HOST" -p "$TARGET_PORT" -U "$TARGET_USER" -d "$TARGET_DB" 2>&1 | tee -a $LOG_FILE

if [ $? -eq 0 ]; then
    echo "[$TIMESTAMP] ✅ Restore thành công!" | tee -a $LOG_FILE
else
    echo "[$TIMESTAMP] ⚠️  Có lỗi khi restore database (có thể do constraints)." | tee -a $LOG_FILE
fi

# Vacuum analyze để tối ưu database sau restore
echo "[$TIMESTAMP] 🔧 Đang vacuum analyze database..." | tee -a $LOG_FILE
psql -h "$TARGET_HOST" -p "$TARGET_PORT" -U "$TARGET_USER" -d "$TARGET_DB" -c "VACUUM ANALYZE;" 2>&1 | tee -a $LOG_FILE

# Xóa file dump để tiết kiệm dung lượng
rm -f "$DUMP_FILE"
echo "[$TIMESTAMP] 🗑️  Đã xóa file dump tạm." | tee -a $LOG_FILE

# Giữ log file trong 7 ngày
if [ "$LOG_DIR" = "/tmp" ]; then
    find /tmp -name "db-sync-*.log" -mtime +7 -delete 2>/dev/null
elif [ "$LOG_DIR" = "/app/logs" ]; then
    find /app/logs -name "db-sync-*.log" -mtime +7 -delete 2>/dev/null
fi

# Thống kê database sau sync
echo "[$TIMESTAMP] 📊 Thống kê database sau sync:" | tee -a $LOG_FILE
DB_SIZE=$(psql -h "$TARGET_HOST" -p "$TARGET_PORT" -U "$TARGET_USER" -d "$TARGET_DB" -t -c "SELECT pg_size_pretty(pg_database_size('$TARGET_DB'));" 2>/dev/null | xargs)
TABLE_COUNT=$(psql -h "$TARGET_HOST" -p "$TARGET_PORT" -U "$TARGET_USER" -d "$TARGET_DB" -t -c "SELECT COUNT(*) FROM pg_tables WHERE schemaname = 'public';" 2>/dev/null | xargs)

echo "[$TIMESTAMP] 📊 Database size: $DB_SIZE" | tee -a $LOG_FILE
echo "[$TIMESTAMP] 📊 Tables: $TABLE_COUNT" | tee -a $LOG_FILE

echo "[$TIMESTAMP] ✅ Hoàn thành đồng bộ!" | tee -a $LOG_FILE
echo "[$TIMESTAMP] 📄 Log file: $LOG_FILE" | tee -a $LOG_FILE
