#!/bin/bash
# =============================================================
# 🚀 Script Deploy An Toàn: Build Local -> Chuyển Image -> Safe Rollback
# =============================================================

SERVER_IP="116.118.49.243"
SERVER_USER="root"
PROJECT_DIR="rausachfinal"
BACKUP_DIR="/root/rausach_backups"

echo "╔═══════════════════════════════════════════════╗"
echo "║   🚀 TRIỂN KHAI AN TOÀN (SAFE LOCAL DEPLOY)   ║"
echo "╚═══════════════════════════════════════════════╝"
echo ""

# 1. Chọn chế độ
echo "Chọn chế độ vận hành:"
echo "  1. 🔍 Dry Run (Chạy thử cô lập trên Server port 53332)"
echo "  2. 🚀 Real Deploy (Triển khai chính thức lên Server)"
echo "  3. 🧪 Sandbox Deploy (Triển khai Sandbox port 53333/54303)"
echo "  0. Thoát"
echo ""
read -p "Lựa chọn của bạn (0-3): " mode

if [[ "$mode" != "1" && "$mode" != "2" && "$mode" != "3" ]]; then
    echo "⚠️ Lựa chọn không hợp lệ hoặc đã thoát."
    exit 0
fi

is_dry_run=false
is_sandbox=false
[ "$mode" == "1" ] && is_dry_run=true
[ "$mode" == "3" ] && is_sandbox=true

echo ""
echo "-------------------------------------------------"
echo "📝 Bước 1: 🏗️ Đang xử lý môi trường & Build Image..."

# Backup original environments
ENV_FILE="api/.env"
FE_ENV="frontend/src/environments/environment.ts"
FE_ENV_DEV="frontend/src/environments/environment.development.ts"

cp "$ENV_FILE" "${ENV_FILE}.bak"
cp "$FE_ENV" "${FE_ENV}.bak"
cp "$FE_ENV_DEV" "${FE_ENV_DEV}.bak"

if [ "$is_sandbox" == "true" ]; then
    echo "Mô tả: Tự động chuyển DATABASE sang bản Sandbox (testdata) và API URL sang domain apisandbox.rausachtrangia.com."
    # Backend DB switch
    sed -i 's/^DATABASE_URL=/#DATABASE_URL=/g' "$ENV_FILE"
    if grep -q "testdata" "$ENV_FILE"; then
        sed -i 's/^#\(DATABASE_URL=.*testdata.*\)/\1/g' "$ENV_FILE"
    else
        echo 'DATABASE_URL="postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/testdata?schema=public&connection_limit=25&pool_timeout=60&connect_timeout=20"' >> "$ENV_FILE"
    fi
    
    # Frontend API switch
    sed -i "s|APIURL:.*|APIURL: 'https://apisandbox.rausachtrangia.com',|g" "$FE_ENV"
    sed -i "s|APIURL:.*|APIURL: 'https://apisandbox.rausachtrangia.com',|g" "$FE_ENV_DEV"
else
    echo "Mô tả: Tự động chuyển DATABASE sang bản Production (rausachfinal) và thực hiện Build."
    # Backend DB switch
    sed -i 's/^DATABASE_URL=/#DATABASE_URL=/g' "$ENV_FILE"
    if grep -q "rausachfinal" "$ENV_FILE"; then
        sed -i 's/^#\(DATABASE_URL=.*rausachfinal.*\)/\1/g' "$ENV_FILE"
    else
        echo 'DATABASE_URL="postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public&connection_limit=25&pool_timeout=60&connect_timeout=20"' >> "$ENV_FILE"
    fi

    # Frontend API switch (Đảm bảo về Production)
    sed -i "s|APIURL:.*|APIURL: 'https://apitg.rausachtrangia.com',|g" "$FE_ENV"
    sed -i "s|APIURL:.*|APIURL: 'https://apitg.rausachtrangia.com',|g" "$FE_ENV_DEV"
fi

# Thực hiện Build Local
echo "📦 Đang build Backend locally..."
(cd api && bun run build)
if [ $? -ne 0 ]; then echo "❌ Lỗi khi build Backend!"; exit 1; fi

echo "📦 Đang build Frontend locally..."
(cd frontend && bun run build)
if [ $? -ne 0 ]; then echo "❌ Lỗi khi build Frontend!"; exit 1; fi

# Thực hiện Build Docker Image
docker compose build --parallel
BUILD_RESULT=$?

# Restore original .env & environments
mv "${ENV_FILE}.bak" "$ENV_FILE"
mv "${FE_ENV}.bak" "$FE_ENV"
mv "${FE_ENV_DEV}.bak" "$FE_ENV_DEV"
echo "♻️ Đã khôi phục môi trường về trạng thái ban đầu cho máy Local."

if [ $BUILD_RESULT -ne 0 ]; then echo "❌ Lỗi khi build image!"; exit 1; fi

# Xác định tên Image
BE_IMAGE=$(docker compose config --images | grep berausach)
FE_IMAGE=$(docker compose config --images | grep ferausach)

echo ""
echo "-------------------------------------------------"
echo "📝 Bước 2: 📦 Đang nén và đóng gói Image bản mới..."
PACKAGE_NAME="deploy_$( [ "$is_sandbox" == "true" ] && echo "sandbox_" )$(date +%Y%m%d_%H%M%S).tar.gz"
docker save $BE_IMAGE $FE_IMAGE | gzip > /tmp/$PACKAGE_NAME

echo ""
echo "-------------------------------------------------"
echo "📝 Bước 3: 🚚 Đang chuyển gói Image lên Server ($SERVER_IP)..."
ssh $SERVER_USER@$SERVER_IP "mkdir -p $BACKUP_DIR"
scp /tmp/$PACKAGE_NAME $SERVER_USER@$SERVER_IP:$BACKUP_DIR/
if [ $? -ne 0 ]; then echo "❌ Lỗi khi copy file!"; exit 1; fi

echo ""
echo "-------------------------------------------------"
echo "📝 Bước 4: 💾 Đang tạo điểm phục hồi (Rollback Point) trên Server..."
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
      cd $PROJECT_DIR
      docker rm -f dry-run-test 2>/dev/null || true
      docker run -d --name dry-run-test -p 53332:3331 --network rausachfinal_default --env-file api/.env -e REDIS_HOST="redis" -e REDIS_PORT="6379" $BE_IMAGE:latest
      echo "⏱️ Chờ 15s để Backend boot..."
      sleep 15
      if curl -s http://localhost:53332/database-info >/dev/null; then
         echo "✅ KẾT QUẢ DRY RUN: THÀNH CÔNG! (Link: http://$SERVER_IP:53332/database-info)"
      else
         echo "❌ KẾT QUẢ DRY RUN: THẤT BẠI!"
         exit 1
      fi
EOF
elif [ "$is_sandbox" == "true" ]; then
    echo ""
    echo "-------------------------------------------------"
    echo "📝 Bước 6 (Sandbox): 🔃 Đang cập nhật Sandbox..."
    ssh $SERVER_USER@$SERVER_IP << EOF
      cd $PROJECT_DIR
      echo "🧹 Đang dọn dẹp container sandbox cũ..."
      docker rm -f rausachsandbox-backend rausachsandbox-frontend rausachsandbox-mcp 2>/dev/null || true
      
      echo "🚀 Khởi chạy Sandbox Backend (Port 53333)..."
      docker run -d --name rausachsandbox-backend \
        -p 53333:3331 \
        --network rausachfinal_default \
        --env-file api/.env \
        -e DATABASE_URL="postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/testdata?schema=public" \
        -e REDIS_HOST="redis" \
        -e REDIS_PORT="6379" \
        -e MINIO_ENDPOINT="rausach-minio" \
        -e MINIO_PORT="9000" \
        $BE_IMAGE:latest

      echo "🚀 Khởi chạy Sandbox MCP Server (Port 53002)..."
      docker run -d --name rausachsandbox-mcp \
        -p 53002:3002 \
        --network rausachfinal_default \
        --env-file api/.env \
        -e DATABASE_URL="postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/testdata?schema=public" \
        --entrypoint bun \
        $BE_IMAGE:latest run scripts/mcp_server.ts --sse

      echo "🚀 Khởi chạy Sandbox Frontend (Port 54303)..."
      docker run -d --name rausachsandbox-frontend \
        -p 54303:4301 \
        --network rausachfinal_default \
        $FE_IMAGE:latest

      echo "🎉 TRIỂN KHAI SANDBOX THÀNH CÔNG!"
      echo "🌐 Backend: http://$SERVER_IP:53333"
      echo "🌐 MCP Server (SSE): http://$SERVER_IP:53002/sse"
      echo "🌐 Frontend: http://$SERVER_IP:54303"
EOF
else
    echo ""
    echo "-------------------------------------------------"
    echo "📝 Bước 6: 🔃 Đang cập nhật ứng dụng chính thức..."
    ssh $SERVER_USER@$SERVER_IP << EOF
      cd $PROJECT_DIR
      docker stop dry-run-test 2>/dev/null && docker rm dry-run-test 2>/dev/null
      git pull
      # 🛠️ Tự động dọn dẹp các container lỗi hoặc cũ để tránh lỗi 'Conflict Name'
      echo "🧹 Đang dọn dẹp các container xung đột..."
      # Dừng và xóa các container có thể gây xung đột tên
      docker rm -f rausach-backend rausach-frontend rausach-redis rausach-postgres rausach-minio 2>/dev/null || true
      docker compose -p rausachfinal down --remove-orphans 2>/dev/null || true
      
      echo "🚀 Đang khởi chạy hệ thống chính thức..."
      docker compose -p rausachfinal up -d --remove-orphans
      
      # 🧹 Dọn dẹp các image cũ để tiết kiệm dung lượng server
      docker image prune -f
      echo "🎉 DEPLOY THÀNH CÔNG! Hệ thống đã Online với bản mới nhất."
EOF
fi

# Cleanup local temp file
rm /tmp/$PACKAGE_NAME
echo ""
echo "🔚 Quy trình kết thúc."
