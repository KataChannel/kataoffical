#!/bin/bash

# Kiểm tra nếu được gọi với option
SERVER="root@116.118.49.243"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="backup/$TIMESTAMP"
mkdir -p "$BACKUP_DIR"

echo "======================================================"
echo " BẮT ĐẦU BACKUP FULL DOCKER (APP & DB) TỪ SERVER"
echo " Server: $SERVER"
echo " Thư mục lưu: $BACKUP_DIR"
echo "======================================================"

echo "=> 1. Đang yêu cầu server tạo file backup (PostgreSQL, Redis, MinIO, App Config)..."
ssh $SERVER << EOF
    # Tạo folder chứa tạm trên Host
    mkdir -p /tmp/rausach_backup_$TIMESTAMP
    
    # Tìm tên container (có thể có prefix/suffix)
    DB_CONTAINER=\$(docker ps --format '{{.Names}}' | grep rausach-postgres | head -n 1)
    REDIS_CONTAINER=\$(docker ps --format '{{.Names}}' | grep rausach-redis | head -n 1)
    MINIO_CONTAINER=\$(docker ps --format '{{.Names}}' | grep rausach-minio | head -n 1)

    # 1. Backup Database PostgreSQL
    echo "   -> Trích xuất database PostgreSQL (\$DB_CONTAINER)..."
    docker exec \$DB_CONTAINER pg_dump -U AWois79wFA1bxMK -d rausachfinal -F c > /tmp/rausach_backup_$TIMESTAMP/rausachfinal_db.dump || echo "      Lỗi: Không tìm thấy PostgreSQL container hoặc sai tên DB"
    
    # 2. Backup Redis
    echo "   -> Backup Redis dump.rdb (\$REDIS_CONTAINER)..."
    docker exec \$REDIS_CONTAINER redis-cli SAVE || true
    docker cp \$REDIS_CONTAINER:/data/dump.rdb /tmp/rausach_backup_$TIMESTAMP/redis_dump.rdb 2>/dev/null || echo "      Lỗi: Không copy được Redis data"

    # 3. Backup Minio Data (ảnh/video uploads)
    echo "   -> Backup MinIO Uploads (\$MINIO_CONTAINER)..."
    docker cp \$MINIO_CONTAINER:/data /tmp/rausach_backup_$TIMESTAMP/minio_data 2>/dev/null || echo "      Lỗi: Không copy được Minio data"

    # 4. Backup docker-compose.yml và env
    echo "   -> Backup configs (.env, docker-compose.yml)..."
    cp /root/rausachfinal/docker-compose.yml /tmp/rausach_backup_$TIMESTAMP/docker-compose.yml 2>/dev/null || true
    cp /root/rausachfinal/.env* /tmp/rausach_backup_$TIMESTAMP/ 2>/dev/null || true

    # Lấy thông tin Docker
    docker ps > /tmp/rausach_backup_$TIMESTAMP/docker_ps.txt

    # 5. Nén toàn bộ
    echo "   -> Đang nén file..."
    cd /tmp
    tar -czf rausach_backup_$TIMESTAMP.tar.gz rausach_backup_$TIMESTAMP 2>/dev/null
    
    # Dọn dẹp thư mục tạm
    rm -rf /tmp/rausach_backup_$TIMESTAMP
EOF

echo "=> 2. Đang tải file backup về máy gốc ($BACKUP_DIR)..."
scp $SERVER:/tmp/rausach_backup_$TIMESTAMP.tar.gz "$BACKUP_DIR/rausach_backup_$TIMESTAMP.tar.gz"

if [ -f "$BACKUP_DIR/rausach_backup_$TIMESTAMP.tar.gz" ]; then
    echo "=> 3. Đã tải thành công. Đang dọn dẹp file tạm trên server..."
    ssh $SERVER "rm -f /tmp/rausach_backup_$TIMESTAMP.tar.gz"

    echo "======================================================"
    echo " BACKUP HOÀN TẤT THÀNH CÔNG!"
    echo " Bản lưu được cất tại: $BACKUP_DIR/rausach_backup_$TIMESTAMP.tar.gz"
    echo " Dung lượng file: $(du -sh $BACKUP_DIR/rausach_backup_$TIMESTAMP.tar.gz | cut -f1)"
    echo "======================================================"
else
    echo "LỖI: Không kéo được file backup về máy tính!"
fi
