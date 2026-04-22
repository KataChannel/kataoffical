#!/bin/bash
# =============================================================
# 🚀 Script Deploy An Toàn: Build Local -> Chuyển Image -> Multi Environment
# =============================================================

SERVER_IP="116.118.49.243"
SERVER_USER="root"
BACKUP_DIR="/root/rausach_backups"

echo "╔═══════════════════════════════════════════════╗"
echo "║   🚀 TRIỂN KHAI AN TOÀN (MULTI-ENV DEPLOY)    ║"
echo "╚═══════════════════════════════════════════════╝"
echo ""

# 1. Chọn chế độ
echo "Chọn chế độ vận hành:"
echo "  1. 🔍 Dry Run (Chạy thử cô lập trên Server port 53332)"
echo "  2. 🚀 Real Deploy (Triển khai chính thức - Port 53331)"
echo "  3. 🛠️  Sandbox Deploy (Triển khai Sandbox - Port 53333)"
echo "  0. Thoát"
echo ""
read -p "Lựa chọn của bạn (0-3): " mode

[ "$mode" == "0" ] && exit 0

is_dry_run=false
is_sandbox=false

if [ "$mode" == "1" ]; then
    is_dry_run=true
    PROJECT_DIR="rausachfinal"
    TARGET_DB="rausachfinal"
    BE_PORT=53332
    FE_PORT=54302
elif [ "$mode" == "3" ]; then
    is_sandbox=true
    PROJECT_DIR="rausachsandbox"
    TARGET_DB="testdata"
    BE_PORT=53333
    FE_PORT=54303
else
    PROJECT_DIR="rausachfinal"
    TARGET_DB="rausachfinal"
    BE_PORT=53331
    FE_PORT=54301
fi

echo ""
echo "-------------------------------------------------"
echo "📝 Bước 1: 🏗️  Đang xử lý môi trường & Build Image..."
echo "Mục tiêu: Build cho database: $TARGET_DB"

# Backup original .env
ENV_FILE="api/.env"
cp "$ENV_FILE" "${ENV_FILE}.bak"

# Tắt tất cả các dòng DATABASE_URL hiện tại
sed -i 's/^DATABASE_URL=/#DATABASE_URL=/g' "$ENV_FILE"
# Mở dòng DATABASE_URL tương ứng với TARGET_DB (dùng regex để linh hoạt hơn)
sed -i "s|^#DATABASE_URL=.*$TARGET_DB.*|DATABASE_URL=postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/$TARGET_DB?schema=public\&connection_limit=25\&pool_timeout=60\&connect_timeout=20|g" "$ENV_FILE"

# Thực hiện Build
export BE_PORT=$BE_PORT
export FE_PORT=$FE_PORT
docker compose build --parallel
BUILD_RESULT=$?

# Restore original .env
mv "${ENV_FILE}.bak" "$ENV_FILE"
echo "♻️  Đã khôi phục DATABASE về trạng thái ban đầu cho môi trường Local."

if [ $BUILD_RESULT -ne 0 ]; then echo "❌ Lỗi khi build image!"; exit 1; fi

# Xác định tên Image
BE_IMAGE=$(docker compose config --images | grep berausach)
FE_IMAGE=$(docker compose config --images | grep ferausach)

echo ""
echo "-------------------------------------------------"
echo "📝 Bước 2: 📦 Đang đóng gói Image..."
PACKAGE_NAME="deploy_${PROJECT_DIR}_$(date +%Y%m%d_%H%M%S).tar.gz"
docker save $BE_IMAGE $FE_IMAGE | gzip > /tmp/$PACKAGE_NAME

echo ""
echo "-------------------------------------------------"
echo "📝 Bước 3: 🚚 Đang chuyển Image lên Server ($SERVER_IP)..."
ssh $SERVER_USER@$SERVER_IP "mkdir -p $BACKUP_DIR"
scp /tmp/$PACKAGE_NAME $SERVER_USER@$SERVER_IP:$BACKUP_DIR/

echo ""
echo "-------------------------------------------------"
echo "📝 Bước 4: 💾 Đang tạo điểm phục hồi (Rollback Point)..."
ssh $SERVER_USER@$SERVER_IP << EOF
  docker tag $BE_IMAGE:latest $BE_IMAGE:stable 2>/dev/null
  docker tag $FE_IMAGE:latest $FE_IMAGE:stable 2>/dev/null
EOF

echo ""
echo "-------------------------------------------------"
echo "📝 Bước 5: 📥 Đang nạp Image mới vào Docker Server..."
ssh $SERVER_USER@$SERVER_IP "gunzip -c $BACKUP_DIR/$PACKAGE_NAME | docker load"

if [ "$is_dry_run" == "true" ]; then
    echo ""
    echo "-------------------------------------------------"
    echo "📝 Bước 6 (Dry Run): 🧪 Đang chạy thử nghiệm cô lập..."
    ssh $SERVER_USER@$SERVER_IP << EOF
      docker stop dry-run-test 2>/dev/null && docker rm dry-run-test 2>/dev/null
      docker run -d --name dry-run-test \
        -p $BE_PORT:3331 \
        --network rausachfinal_default \
        --env-file $PROJECT_DIR/api/.env \
        -e REDIS_HOST="redis" \
        $BE_IMAGE:latest
      sleep 15
      if curl -s http://localhost:$BE_PORT/database-info >/dev/null; then
         echo "✅ KẾT QUẢ DRY RUN: THÀNH CÔNG! Link: http://$SERVER_IP:$BE_PORT/database-info"
      else
         echo "❌ KẾT QUẢ DRY RUN: THẤT BẠI!"
         exit 1
      fi
EOF
    read -p "🖥️  Nhấn [Enter] để dọn dẹp..." 
    ssh $SERVER_USER@$SERVER_IP "docker stop dry-run-test >/dev/null && docker rm dry-run-test >/dev/null"
else
    echo ""
    echo "-------------------------------------------------"
    echo "📝 Bước 6: 🔃 Đang cập nhật ứng dụng ($PROJECT_DIR)..."
    
    # Chuẩn bị file .env cho server (nếu là sandbox)
    if [ "$is_sandbox" == "true" ]; then
        ssh $SERVER_USER@$SERVER_IP "mkdir -p $PROJECT_DIR/api"
        scp docker-compose.yml $SERVER_USER@$SERVER_IP:$PROJECT_DIR/
        echo "DATABASE_URL=postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/testdata?schema=public" > /tmp/.env.sandbox
        scp /tmp/.env.sandbox $SERVER_USER@$SERVER_IP:$PROJECT_DIR/api/.env
    fi

    ssh $SERVER_USER@$SERVER_IP << EOF
      cd $PROJECT_DIR
      
      # Cấu hình biến môi trường để tránh xung đột với bản Product
      export BE_PORT=$BE_PORT
      export FE_PORT=$FE_PORT
      export BE_CONTAINER_NAME="${PROJECT_DIR}-backend"
      export FE_CONTAINER_NAME="${PROJECT_DIR}-frontend"
      export PG_CONTAINER_NAME="${PROJECT_DIR}-postgres"
      export REDIS_CONTAINER_NAME="${PROJECT_DIR}-redis"
      export PGADMIN_CONTAINER_NAME="${PROJECT_DIR}-pgadmin"
      export MINIO_CONTAINER_NAME="${PROJECT_DIR}-minio"
      
      # Cổng phụ cho các dịch vụ khác (Sandbox)
      export PG_PORT=55433
      export REDIS_PORT_EXT=56380
      export PGADMIN_PORT=55051
      export MINIO_PORT_EXT=59001
      export MINIO_CONSOLE_PORT=59091
      
      docker compose -p $PROJECT_DIR up -d
      
      echo "⏱️  Đang kiểm tra Healthcheck (20s)..."
      sleep 20
      
      if ! curl -s http://localhost:$BE_PORT/database-info >/dev/null; then
         echo "⚠️  LỖI! Đang tự động Rollback..."
         docker tag $BE_IMAGE:stable $BE_IMAGE:latest
         docker tag $FE_IMAGE:stable $FE_IMAGE:latest
         docker compose -p $PROJECT_DIR up -d
      else
         echo "🎉 DEPLOY THÀNH CÔNG ($PROJECT_DIR)! Link: http://$SERVER_IP:$BE_PORT/database-info"
      fi
EOF
fi

rm /tmp/$PACKAGE_NAME 2>/dev/null
echo ""
echo "🔚 Quy trình kết thúc."
