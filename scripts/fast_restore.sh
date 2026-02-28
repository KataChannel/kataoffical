#!/bin/bash

# Tìm các thư mục backup
# Đường dẫn tương đối từ gốc project
BACKUPS=$(find backup -maxdepth 1 -mindepth 1 -type d 2>/dev/null | sort -r)

if [ -z "$BACKUPS" ]; then
    echo "❌ Không tìm thấy bản backup nào trong thư mục backup/"
    exit 1
fi

echo "======================================================"
echo " CHỌN BẢN BACKUP ĐỂ RESTORE VỀ LOCAL"
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

echo "=> 0. Đang bật các Database Container Local trước khi Restore..."
docker compose -f docker-compose.yml up -d postgres redis minio_rausach

echo "=> Đang giải nén file backup ($TAR_FILE)..."
rm -rf /tmp/rausach_restore
mkdir -p /tmp/rausach_restore
tar -xzf "$TAR_FILE" -C /tmp/rausach_restore

EXTRACT_DIR="/tmp/rausach_restore/rausach_backup_$BACKUP_NAME"

echo "=> 1. Phục hồi Database PostgreSQL (rausachfinal)..."
# File dump từ fast_backup có dạng rausachfinal_db.dump
DUMP_FILE="$EXTRACT_DIR/rausachfinal_db.dump"
# Copy file dump vào container
docker cp "$DUMP_FILE" rausach-postgres:/tmp/db.dump 2>/dev/null || echo "Không tìm thấy db dump"

if docker exec rausach-postgres stat /tmp/db.dump >/dev/null 2>&1; then
    docker exec rausach-postgres psql -U AWois79wFA1bxMK -d postgres -c "DROP DATABASE IF EXISTS rausachfinal;" || true
    docker exec rausach-postgres psql -U AWois79wFA1bxMK -d postgres -c "CREATE DATABASE rausachfinal;"
    docker exec rausach-postgres pg_restore -U AWois79wFA1bxMK -d rausachfinal -1 /tmp/db.dump || echo "   (Bỏ qua một số cảnh báo owner...)"
    docker exec rausach-postgres rm -f /tmp/db.dump
fi

echo "=> 2. Phục hồi Redis..."
if [ -f "$EXTRACT_DIR/redis_dump.rdb" ]; then
    docker cp "$EXTRACT_DIR/redis_dump.rdb" rausach-redis:/data/dump.rdb
    docker restart rausach-redis
else
    echo "   Không có dữ liệu Redis."
fi

echo "=> 3. Phục hồi MinIO..."
if [ -d "$EXTRACT_DIR/minio_data" ]; then
    docker exec rausach-minio sh -c 'rm -rf /data/*'
    docker cp "$EXTRACT_DIR/minio_data/." rausach-minio:/data/
    docker restart rausach-minio
else
    echo "   Không có dữ liệu MinIO."
fi

echo "=> 4. Dọn dẹp..."
rm -rf /tmp/rausach_restore

echo "======================================================"
echo "✅ RESTORE HOÀN TẤT BẢN BACKUP TỪ: $BACKUP_NAME"
echo "======================================================"
