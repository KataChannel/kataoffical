#!/bin/bash
# =============================================================
# 🚀 Script Deploy An Toàn Dự Án RAUSACHCOPHAN (Dải Port 49xxx)
# Build Local -> Chuyển Image -> Safe Rollback
# =============================================================

SERVER_IP="116.118.49.243"
SERVER_USER="root"
SSH_KEY="/home/kata/.ssh/rausachfinal"
PROJECT_DIR="/root/rausachcophan"
BACKUP_DIR="/root/rausach_backups"

echo "╔═══════════════════════════════════════════════╗"
echo "║ 🚀 TRIỂN KHAI AN TOÀN - RAUSACHCOPHAN (49xxx) ║"
echo "╚═══════════════════════════════════════════════╝"
echo ""

# 1. Chọn chế độ
echo "Chọn chế độ vận hành:"
echo "  1. 🔍 Dry Run (Chạy thử cô lập trên Server port 49331)"
echo "  2. 🚀 Real Deploy (Triển khai chính thức rausachcophan lên Server)"
echo "  3. 🧪 Sandbox Deploy (Triển khai rausachcophan-sandbox)"
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

echo "Mô tả: Tự động đảm bảo DATABASE (rausachcophan @ 49432) và API URL (https://cpapi.rausachtrangia.com)."
# Backend DB switch - Giữ nguyên rausachcophan
sed -i 's/^DATABASE_URL=/#DATABASE_URL=/g' "$ENV_FILE"
if grep -q "rausachcophan" "$ENV_FILE"; then
    sed -i 's/^#\(DATABASE_URL=.*rausachcophan.*\)/\1/g' "$ENV_FILE"
else
    echo 'DATABASE_URL="postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:49432/rausachcophan?schema=public&connection_limit=25&pool_timeout=60&connect_timeout=20"' >> "$ENV_FILE"
fi

# Frontend API switch (Đảm bảo về cpapi.rausachtrangia.com)
sed -i "s|APIURL:.*|APIURL: 'https://cpapi.rausachtrangia.com',|g" "$FE_ENV"
sed -i "s|APIURL:.*|APIURL: 'https://cpapi.rausachtrangia.com',|g" "$FE_ENV_DEV"

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
PACKAGE_NAME="deploy_rausachcophan_$(date +%Y%m%d_%H%M%S).tar.gz"
docker save $BE_IMAGE $FE_IMAGE | gzip > /tmp/$PACKAGE_NAME

echo ""
echo "-------------------------------------------------"
echo "📝 Bước 3: 🚚 Đang chuyển gói Image lên Server ($SERVER_IP)..."
ssh -i $SSH_KEY -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "mkdir -p $BACKUP_DIR"
scp -i $SSH_KEY -o StrictHostKeyChecking=no /tmp/$PACKAGE_NAME $SERVER_USER@$SERVER_IP:$BACKUP_DIR/
if [ $? -ne 0 ]; then echo "❌ Lỗi khi copy file!"; exit 1; fi

echo ""
echo "-------------------------------------------------"
echo "📝 Bước 4: 💾 Đang tạo điểm phục hồi (Rollback Point) trên Server..."
ssh -i $SSH_KEY -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP << EOF
  docker tag $BE_IMAGE:latest $BE_IMAGE:stable 2>/dev/null
  docker tag $FE_IMAGE:latest $FE_IMAGE:stable 2>/dev/null
EOF

echo ""
echo "-------------------------------------------------"
echo "📝 Bước 5: 📥 Đang nạp Image mới vào Docker Server..."
ssh -i $SSH_KEY -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "gunzip -c $BACKUP_DIR/$PACKAGE_NAME | docker load"

echo ""
echo "-------------------------------------------------"
echo "📝 Bước 6: 🔃 Đang cập nhật ứng dụng rausachcophan chính thức..."
ssh -i $SSH_KEY -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP << EOF
  cd $PROJECT_DIR
  
  echo "🚀 Đang khởi chạy hệ thống rausachcophan (Port 49xxx)..."
  docker compose -p rausachcophan up -d --remove-orphans
  
  # 🧹 Dọn dẹp các image cũ để tiết kiệm dung lượng server
  docker image prune -f
  echo "🎉 DEPLOY THÀNH CÔNG! Hệ thống rausachcophan đã Online tại https://cp.rausachtrangia.com"
EOF

# Cleanup local temp file
rm /tmp/$PACKAGE_NAME
echo ""
echo "🔚 Quy trình kết thúc."
