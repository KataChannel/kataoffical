#!/bin/bash

# Script đồng bộ dữ liệu TỐI ƯU - Dùng data-only và compression
# Chạy định kỳ vào 7h sáng và 17h chiều giờ Việt Nam
# CHÚ Ý: Chỉ sync DATA từ source, KHÔNG đụng schema, GIỮ NGUYÊN các bảng mới trong target

# Không dùng set -e vì psql có thể trả về warning nhưng vẫn hoạt động

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

LOG_FILE="${LOG_DIR}/db-sync-optimized-$(date +"%Y%m%d-%H%M%S").log"

# Check and create logs directory if it doesn't exist
mkdir -p "$(dirname "$LOG_FILE")"

echo "[$TIMESTAMP] 🚀 Bắt đầu đồng bộ dữ liệu (TỐI ƯU) từ $SOURCE_DB sang $TARGET_DB" | tee -a $LOG_FILE

# Kiểm tra dung lượng trống trước khi bắt đầu
AVAILABLE_MB=$(df /tmp | tail -1 | awk '{print int($4/1024)}')
REQUIRED_MB=100  # Yêu cầu ít nhất 100 MB trống

if [ $AVAILABLE_MB -lt $REQUIRED_MB ]; then
    echo "[$TIMESTAMP] ❌ ERROR: Không đủ dung lượng! Available: ${AVAILABLE_MB}MB, Required: ${REQUIRED_MB}MB" | tee -a $LOG_FILE
    exit 1
fi

echo "[$TIMESTAMP] ✅ Kiểm tra dung lượng: ${AVAILABLE_MB}MB available" | tee -a $LOG_FILE

# ============================================================
# BACKUP CÁC BẢNG CHỈ CÓ Ở V3 (TARGET-ONLY) TRƯỚC KHI SYNC
# ============================================================
TARGET_ONLY_F_DUMP="/tmp/rausachv3-target-only-$(date +"%Y%m%d-%H%M%S").sql"
TARGET_ONLY_TABLES=(
    "PhieuThuChi"
    "ThanhToan"
    "HoaDonDienTu"
    "CronExecutionLog"
)

echo "[$TIMESTAMP] 🚜 Đang backup các bảng chỉ có ở V3..." | tee -a $LOG_FILE
export PGPASSWORD="$TARGET_PASSWORD"
TABLES_STR=""
for t in "${TARGET_ONLY_TABLES[@]}"; do
    TABLES_STR="$TABLES_STR -t \"$t\""
done

# Backup data-only, dùng --no-owner và --no-privileges để dễ restore
pg_dump -h "$TARGET_HOST" -p "$TARGET_PORT" -U "$TARGET_USER" -d "$TARGET_DB" \
    --data-only --column-inserts --no-owner --no-privileges $TABLES_STR > "$TARGET_ONLY_F_DUMP" 2>/dev/null || true

if [ -s "$TARGET_ONLY_F_DUMP" ]; then
    echo "[$TIMESTAMP] ✅ Đã backup xong dữ liệu V3 hiện tại vào: $TARGET_ONLY_F_DUMP" | tee -a $LOG_FILE
else
    echo "[$TIMESTAMP] ⚠️ Không có dữ liệu V3 cũ hoặc lỗi backup (thường do bảng chưa có dữ liệu)." | tee -a $LOG_FILE
    rm -f "$TARGET_ONLY_F_DUMP"
fi


# Export PGPASSWORD để không cần nhập password
export PGPASSWORD="$SOURCE_PASSWORD"

# Tạo file dump với compression - CHỈ DATA, KHÔNG SCHEMA
DUMP_FILE="/tmp/rausachfinal-dump-$(date +"%Y%m%d-%H%M%S").sql.gz"
echo "[$TIMESTAMP] 📦 Đang dump database $SOURCE_DB (data-only + compression)..." | tee -a $LOG_FILE

# Dùng --data-only để chỉ sync dữ liệu, không đụng đến schema
# Dùng --disable-triggers để tạm tắt foreign key constraints khi insert
# Loại trừ các bảng log để giảm dung lượng
pg_dump -h "$SOURCE_HOST" -p "$SOURCE_PORT" -U "$SOURCE_USER" -d "$SOURCE_DB" \
  --no-owner \
  --no-privileges \
  --data-only \
  --disable-triggers \
  --exclude-table-data=AuditLog \
  --exclude-table-data=performance_logs \
  --exclude-table-data=ErrorLog \
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

# Tạo script để truncate các bảng trước khi import (giữ lại các bảng mới)
# Các bảng MỚI trong rausachv3 cần giữ nguyên: PhieuThuChi, ThanhToan, HoaDonDienTu
TRUNCATE_SCRIPT="/tmp/truncate-before-sync.sql"
cat > "$TRUNCATE_SCRIPT" << 'EOF'
-- Tắt foreign key checks tạm thời
SET session_replication_role = replica;

-- TRUNCATE TẤT CẢ các bảng có data từ source (dùng IF EXISTS để tránh lỗi)
DO $$
DECLARE
    tables_to_truncate TEXT[] := ARRAY[
        'Auditlog', 'AuditLog', 'Banggia', 'Banggiasanpham', 'BanggiasanphamHistory',
        'Chotkho', 'Chotkhodetail', 'Dathang', 'Dathangsanpham',
        'Deal', 'Dealsanpham', 'Donhang', 'Donhangsanpham',
        'ErrorLog', 'File', 'FileManager', 'ImportHistory',
        'Khachhang', 'Kho', 'Loaisanpham', 'Menu',
        'Nhacungcap', 'Nhapkho', 'Nhapkhosanpham', 'Nhanvien', 'Nhomkhachhang', 'NhomNhacungcap',
        'Permission', 'Phieugiamgia', 'PhieuKho', 'PhieuKhoSanpham', 'Phongban', 'Profile',
        'Role', 'RoleMenu', 'RolePermission',
        'Sanpham', 'SanphamKho',
        'TonKho', 'Tonkho',
        'User', 'UserPermission', 'UserRole', 'UserguidBlock', 'UserguidStep',
        'Xuatkho', 'Xuatkhosanpham',
        '_KhachhangNhom', '_NhacungcapNhom', '_NhacungcapToSanpham',
        'performance_logs', 'support_attachments', 'support_responses', 'support_tickets'
    ];
    t TEXT;
BEGIN
    FOREACH t IN ARRAY tables_to_truncate
    LOOP
        BEGIN
            EXECUTE format('TRUNCATE TABLE %I CASCADE', t);
            RAISE NOTICE 'Truncated table: %', t;
        EXCEPTION WHEN undefined_table THEN
            RAISE NOTICE 'Table % does not exist, skipping', t;
        END;
    END LOOP;
END $$;

-- Bật lại foreign key checks
SET session_replication_role = DEFAULT;
EOF

echo "[$TIMESTAMP] 🗑️ Đang xóa dữ liệu cũ trong target database..." | tee -a $LOG_FILE
psql -h "$TARGET_HOST" -p "$TARGET_PORT" -U "$TARGET_USER" -d "$TARGET_DB" -f "$TRUNCATE_SCRIPT" 2>&1 | tee -a $LOG_FILE

echo "[$TIMESTAMP] 📥 Đang import dữ liệu mới (từ file nén)..." | tee -a $LOG_FILE
# Dùng ON_ERROR_STOP=0 để tiếp tục khi có lỗi không quan trọng
# Giải nén và pipe trực tiếp vào psql
gunzip -c "$DUMP_FILE" | psql -h "$TARGET_HOST" -p "$TARGET_PORT" -U "$TARGET_USER" -d "$TARGET_DB" \
  -v ON_ERROR_STOP=0 2>&1 | grep -v "transaction_timeout" | tee -a $LOG_FILE

# Vacuum analyze để tối ưu database sau restore
echo "[$TIMESTAMP] 🔧 Đang vacuum analyze database..." | tee -a $LOG_FILE
psql -h "$TARGET_HOST" -p "$TARGET_PORT" -U "$TARGET_USER" -d "$TARGET_DB" -c "VACUUM ANALYZE;" 2>&1 | tee -a $LOG_FILE

# Xóa file dump để tiết kiệm dung lượng
rm -f "$DUMP_FILE"
rm -f "$TRUNCATE_SCRIPT"
echo "[$TIMESTAMP] 🗑️ Đã xóa file dump tạm." | tee -a $LOG_FILE

# ============================================================
# KHÔI PHỤC CÁC MENU VÀ PERMISSION MỚI SAU KHI SYNC
# ============================================================
echo "[$TIMESTAMP] 🔄 Đang khôi phục các menu và permission mới..." | tee -a $LOG_FILE

# Xác định đường dẫn SQL file
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SQL_FILE="$SCRIPT_DIR/../sql/create-new-menus.sql"

if [ -f "$SQL_FILE" ]; then
    psql -h "$TARGET_HOST" -p "$TARGET_PORT" -U "$TARGET_USER" -d "$TARGET_DB" -f "$SQL_FILE" 2>&1 | tee -a $LOG_FILE
    echo "[$TIMESTAMP] ✅ Đã khôi phục menu và permission!" | tee -a $LOG_FILE
else
    echo "[$TIMESTAMP] ⚠️ Không tìm thấy file SQL: $SQL_FILE" | tee -a $LOG_FILE
fi

# ============================================================
# KHÔI PHỤC DỮ LIỆU V3 ĐÃ BACKUP (TARGET-ONLY)
# ============================================================
if [ -f "$TARGET_ONLY_F_DUMP" ]; then
    echo "[$TIMESTAMP] 📥 Đang khôi phục lại dữ liệu V3..." | tee -a $LOG_FILE
    export PGPASSWORD="$TARGET_PASSWORD"
    
    # Tắt triggers để tránh lỗi FK trong quá trình restore
    psql -h "$TARGET_HOST" -p "$TARGET_PORT" -U "$TARGET_USER" -d "$TARGET_DB" \
        -c "SET session_replication_role = replica;" \
        -f "$TARGET_ONLY_F_DUMP" \
        -c "SET session_replication_role = DEFAULT;" 2>&1 | tee -a $LOG_FILE
        
    echo "[$TIMESTAMP] ✅ Đã khôi phục xong dữ liệu V3!" | tee -a $LOG_FILE
    rm -f "$TARGET_ONLY_F_DUMP"
fi

# Giữ log file trong 7 ngày
if [ "$LOG_DIR" = "/tmp" ]; then
    find /tmp -name "db-sync-optimized-*.log" -mtime +7 -delete 2>/dev/null
elif [ "$LOG_DIR" = "/app/logs" ]; then
    find /app/logs -name "db-sync-optimized-*.log" -mtime +7 -delete 2>/dev/null
fi

# Thống kê database sau sync
echo "[$TIMESTAMP] 📊 Thống kê database sau sync:" | tee -a $LOG_FILE
DB_SIZE=$(psql -h "$TARGET_HOST" -p "$TARGET_PORT" -U "$TARGET_USER" -d "$TARGET_DB" -t -c "SELECT pg_size_pretty(pg_database_size('$TARGET_DB'));" 2>/dev/null | xargs)
TABLE_COUNT=$(psql -h "$TARGET_HOST" -p "$TARGET_PORT" -U "$TARGET_USER" -d "$TARGET_DB" -t -c "SELECT COUNT(*) FROM pg_tables WHERE schemaname = 'public';" 2>/dev/null | xargs)

echo "[$TIMESTAMP] 💾 Database size: $DB_SIZE" | tee -a $LOG_FILE
echo "[$TIMESTAMP] 📋 Tables: $TABLE_COUNT" | tee -a $LOG_FILE

echo "[$TIMESTAMP] ✅ Hoàn thành đồng bộ!" | tee -a $LOG_FILE
echo "[$TIMESTAMP] 📄 Log file: $LOG_FILE" | tee -a $LOG_FILE

# Exit với code 0 để đánh dấu thành công
exit 0
