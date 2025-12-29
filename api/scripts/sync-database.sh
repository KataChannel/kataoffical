#!/bin/bash

# Script đồng bộ dữ liệu từ rausachfinal sang rausachv3
# Chạy định kỳ vào 7h sáng và 17h chiều giờ Việt Nam
# CHÚ Ý: Chỉ sync các bảng từ source, KHÔNG xóa các bảng mới trong target

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

LOG_FILE="${LOG_DIR}/db-sync-$(date +"%Y%m%d-%H%M%S").log"

echo "[$TIMESTAMP] Bắt đầu đồng bộ dữ liệu từ $SOURCE_DB sang $TARGET_DB" | tee -a $LOG_FILE

# Export PGPASSWORD để không cần nhập password
export PGPASSWORD="$SOURCE_PASSWORD"

# Tạo file dump - chỉ dump DATA, không drop/create tables
DUMP_FILE="/tmp/rausachfinal-dump-$(date +"%Y%m%d-%H%M%S").sql"
echo "[$TIMESTAMP] Đang dump database $SOURCE_DB..." | tee -a $LOG_FILE

# Dùng --data-only để chỉ sync dữ liệu, không đụng đến schema
# Dùng --disable-triggers để tạm tắt foreign key constraints khi insert
pg_dump -h "$SOURCE_HOST" -p "$SOURCE_PORT" -U "$SOURCE_USER" -d "$SOURCE_DB" \
  --no-owner --no-privileges --data-only --disable-triggers > "$DUMP_FILE"

if [ $? -eq 0 ]; then
    echo "[$TIMESTAMP] Dump thành công. File: $DUMP_FILE" | tee -a $LOG_FILE
else
    echo "[$TIMESTAMP] Lỗi khi dump database!" | tee -a $LOG_FILE
    exit 1
fi

# Restore vào database đích
echo "[$TIMESTAMP] Đang restore vào database $TARGET_DB..." | tee -a $LOG_FILE
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
        '_KhachhangNhom', '_NhacungcapNhom', '_NhacungcapToSanpham', '_prisma_migrations',
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

echo "[$TIMESTAMP] Đang xóa dữ liệu cũ trong target database..." | tee -a $LOG_FILE
psql -h "$TARGET_HOST" -p "$TARGET_PORT" -U "$TARGET_USER" -d "$TARGET_DB" -f "$TRUNCATE_SCRIPT" 2>&1 | tee -a $LOG_FILE

echo "[$TIMESTAMP] Đang import dữ liệu mới..." | tee -a $LOG_FILE
# Dùng ON_ERROR_STOP=0 để tiếp tục khi có lỗi không quan trọng (như transaction_timeout warning)
psql -h "$TARGET_HOST" -p "$TARGET_PORT" -U "$TARGET_USER" -d "$TARGET_DB" \
  -v ON_ERROR_STOP=0 < "$DUMP_FILE" 2>&1 | grep -v "transaction_timeout" | tee -a $LOG_FILE

# Xóa file dump để tiết kiệm dung lượng
rm -f "$DUMP_FILE"
rm -f "$TRUNCATE_SCRIPT"
echo "[$TIMESTAMP] Đã xóa file dump tạm." | tee -a $LOG_FILE

# ============================================================
# KHÔI PHỤC CÁC MENU VÀ PERMISSION MỚI SAU KHI SYNC
# ============================================================
echo "[$TIMESTAMP] Đang khôi phục các menu và permission mới..." | tee -a $LOG_FILE

# Xác định đường dẫn SQL file
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SQL_FILE="$SCRIPT_DIR/../sql/create-new-menus.sql"

if [ -f "$SQL_FILE" ]; then
    psql -h "$TARGET_HOST" -p "$TARGET_PORT" -U "$TARGET_USER" -d "$TARGET_DB" -f "$SQL_FILE" 2>&1 | tee -a $LOG_FILE
    echo "[$TIMESTAMP] Đã khôi phục menu và permission!" | tee -a $LOG_FILE
else
    echo "[$TIMESTAMP] ⚠️ Không tìm thấy file SQL: $SQL_FILE" | tee -a $LOG_FILE
fi

# Giữ log file trong 7 ngày (chỉ trong /tmp)
if [ "$LOG_DIR" = "/tmp" ]; then
    find /tmp -name "db-sync-*.log" -mtime +7 -delete 2>/dev/null
fi

echo "[$TIMESTAMP] ✅ Hoàn thành đồng bộ!" | tee -a $LOG_FILE
echo "Log file: $LOG_FILE"

# Exit với code 0 để đánh dấu thành công
exit 0
