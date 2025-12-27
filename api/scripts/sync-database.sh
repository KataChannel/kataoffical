#!/bin/bash

# Script đồng bộ dữ liệu từ rausachfinal sang rausachv3
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

echo "[$TIMESTAMP] Bắt đầu đồng bộ dữ liệu từ $SOURCE_DB sang $TARGET_DB" | tee -a $LOG_FILE

# Export PGPASSWORD để không cần nhập password
export PGPASSWORD="$SOURCE_PASSWORD"

# Tạo file dump
DUMP_FILE="/tmp/rausachfinal-dump-$(date +"%Y%m%d-%H%M%S").sql"
echo "[$TIMESTAMP] Đang dump database $SOURCE_DB..." | tee -a $LOG_FILE

pg_dump -h "$SOURCE_HOST" -p "$SOURCE_PORT" -U "$SOURCE_USER" -d "$SOURCE_DB" \
  --no-owner --no-privileges --clean --if-exists > "$DUMP_FILE"

if [ $? -eq 0 ]; then
    echo "[$TIMESTAMP] Dump thành công. File: $DUMP_FILE" | tee -a $LOG_FILE
else
    echo "[$TIMESTAMP] Lỗi khi dump database!" | tee -a $LOG_FILE
    exit 1
fi

# Restore vào database đích
echo "[$TIMESTAMP] Đang restore vào database $TARGET_DB..." | tee -a $LOG_FILE
export PGPASSWORD="$TARGET_PASSWORD"

psql -h "$TARGET_HOST" -p "$TARGET_PORT" -U "$TARGET_USER" -d "$TARGET_DB" < "$DUMP_FILE" 2>&1 | tee -a $LOG_FILE

if [ $? -eq 0 ]; then
    echo "[$TIMESTAMP] Restore thành công!" | tee -a $LOG_FILE
else
    echo "[$TIMESTAMP] Có lỗi khi restore database (có thể do constraints)." | tee -a $LOG_FILE
fi

# Xóa file dump để tiết kiệm dung lượng
rm -f "$DUMP_FILE"
echo "[$TIMESTAMP] Đã xóa file dump tạm." | tee -a $LOG_FILE

# Giữ log file trong 7 ngày (chỉ trong /tmp)
if [ "$LOG_DIR" = "/tmp" ]; then
    find /tmp -name "db-sync-*.log" -mtime +7 -delete 2>/dev/null
fi

echo "[$TIMESTAMP] Hoàn thành đồng bộ!" | tee -a $LOG_FILE
echo "Log file: $LOG_FILE"
