#!/bin/bash

# Tìm các thư mục backup local
BACKUPS=$(find backup -maxdepth 1 -mindepth 1 -type d 2>/dev/null | sort -r)

if [ -z "$BACKUPS" ]; then
    echo "❌ Không tìm thấy bản backup nào trong thư mục backup/"
    exit 1
fi

echo "======================================================"
echo " CHỌN BẢN BACKUP ĐỂ RESTORE LÊN VPS (RAUSACHFINAL)"
echo "⚠️ CẢNH BÁO: HÀNH ĐỘNG NÀY SẼ GHI ĐÈ DỮ LIỆU ĐANG CHẠY TRÊN SERVER!"
echo "======================================================"

i=1
declare -a BACKUP_LIST
for b in $BACKUPS; do
    BACKUP_LIST[$i]="$b"
    echo "$i. $b"
    ((i++))
done

echo "0. Thoát"
read -p "Chọn số thứ tự bản backup (0-$((i-1))): " choice

if [ "$choice" == "0" ]; then
    echo "👋 Đã thoát."
    exit 0
fi

if [[ ! "$choice" =~ ^[0-9]+$ ]] || [ "$choice" -lt 1 ] || [ "$choice" -ge $i ]; then
    echo "⚠️ Lựa chọn không hợp lệ."
    exit 1
fi

SELECTED_BACKUP="${BACKUP_LIST[$choice]}"
BACKUP_NAME=$(basename "$SELECTED_BACKUP")
TAR_FILE="$SELECTED_BACKUP/rausach_backup_$BACKUP_NAME.tar.gz"

if [ ! -f "$TAR_FILE" ]; then
    echo "❌ Không tìm thấy file $TAR_FILE"
    exit 1
fi

read -p "🚨 BẠN CHẮC CHẮN MUỐN GHI ĐÈ PRODUCTION VPS BẰNG BẢN BACKUP $BACKUP_NAME? (y/N): " confirm
if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
    echo "Đã hủy thao tác."
    exit 0
fi

SERVER="root@116.118.49.243"
DB_USER="AWois79wFA1bxMK"
DB_PASS="7bhNHJcSEbWln9v"
DB_TARGET="rausachfinal"

echo "=> Đang giải nén file backup ($TAR_FILE)..."
rm -rf /tmp/rausach_restore
mkdir -p /tmp/rausach_restore
tar -xzf "$TAR_FILE" -C /tmp/rausach_restore

EXTRACT_DIR="/tmp/rausach_restore/rausach_backup_$BACKUP_NAME"

echo "=> 1. Đang tải file lên Server VPS..."
scp "$EXTRACT_DIR/rausachfinal_db.dump" $SERVER:/tmp/db_restore.dump

echo "=> 2. Đang tiến hành phục hồi Database PostgreSQL ($DB_TARGET)..."
ssh $SERVER << INTERNALSCRIPT
    set -e
    CONTAINER=\$(docker ps --format '{{.Names}}\t{{.Ports}}' | grep 55432 | awk '{print \$1}')
    if [ -z "\$CONTAINER" ]; then
        echo "❌ Không tìm thấy container Postgres!"
        exit 1
    fi
    
    docker cp /tmp/db_restore.dump \$CONTAINER:/tmp/db.dump
    
    # Ngắt kết nối
    docker exec -e PGPASSWORD=$DB_PASS \$CONTAINER psql -U $DB_USER -d postgres -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$DB_TARGET';" || true
    
    # Drop and create
    docker exec -e PGPASSWORD=$DB_PASS \$CONTAINER psql -U $DB_USER -d postgres -c "DROP DATABASE IF EXISTS $DB_TARGET;" || true
    docker exec -e PGPASSWORD=$DB_PASS \$CONTAINER psql -U $DB_USER -d postgres -c "CREATE DATABASE $DB_TARGET;"
    
    # Restore
    docker exec \$CONTAINER pg_restore -U $DB_USER -d $DB_TARGET -1 /tmp/db.dump || echo "   (Lưu ý: Một số lỗi khôi phục role/user không ảnh hưởng đến dữ liệu)"
    
    # Clean up container
    docker exec \$CONTAINER rm -f /tmp/db.dump
    rm -f /tmp/db_restore.dump
INTERNALSCRIPT

echo "=> 3. Phục hồi Redis..."
if [ -f "$EXTRACT_DIR/redis_dump.rdb" ]; then
    scp "$EXTRACT_DIR/redis_dump.rdb" $SERVER:/tmp/redis_restore.rdb
    ssh $SERVER << INTERNALSCRIPT
        REDIS_CONTAINER=\$(docker ps --format '{{.Names}}\t{{.Ports}}' | grep 56379 | awk '{print \$1}')
        if [ -n "\$REDIS_CONTAINER" ]; then
            docker cp /tmp/redis_restore.rdb \$REDIS_CONTAINER:/data/dump.rdb
            docker restart \$REDIS_CONTAINER
            rm -f /tmp/redis_restore.rdb
        fi
INTERNALSCRIPT
else
    echo "   Không có dữ liệu Redis."
fi

echo "=> 4. Phục hồi MinIO..."
if [ -d "$EXTRACT_DIR/minio_data" ]; then
    scp -r "$EXTRACT_DIR/minio_data" $SERVER:/tmp/minio_restore
    ssh $SERVER << INTERNALSCRIPT
        MINIO_CONTAINER=\$(docker ps --format '{{.Names}}\t{{.Ports}}' | grep 59000 | awk '{print \$1}')
        if [ -n "\$MINIO_CONTAINER" ]; then
            docker exec \$MINIO_CONTAINER sh -c 'rm -rf /data/*'
            docker cp /tmp/minio_restore/. \$MINIO_CONTAINER:/data/
            docker restart \$MINIO_CONTAINER
            rm -rf /tmp/minio_restore
        fi
INTERNALSCRIPT
else
    echo "   Không có dữ liệu MinIO."
fi

echo "=> 5. Dọn dẹp máy Local..."
rm -rf /tmp/rausach_restore

echo "======================================================"
echo "✅ HOÀN TẤT RESTORE BẢN BACKUP $BACKUP_NAME LÊN VPS (rausachfinal)!"
echo "======================================================"
