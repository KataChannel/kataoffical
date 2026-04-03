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
echo "  0. Thoát"
echo ""
read -p "Lựa chọn của bạn (0-2): " mode

[ "$mode" == "0" ] && exit 0

is_dry_run=false
[ "$mode" == "1" ] && is_dry_run=true

echo ""
echo "-------------------------------------------------"
echo "📝 Bước 1: 🏗️ Đang xử lý môi trường & Build Image..."
echo "Mô tả: Tự động chuyển DATABASE sang bản Production (rausachfinal) và thực hiện Build."

# Backup original .env
ENV_FILE="api/.env"
cp "$ENV_FILE" "${ENV_FILE}.bak"

# Smart Switch: Comment out testdata and uncomment rausachfinal
# Tìm dòng chứa testdata (đang mở) -> đóng lại
sed -i 's/^DATABASE_URL=.*testdata.*/#&/g' "$ENV_FILE"
# Tìm dòng chứa rausachfinal (đang đóng) -> mở ra
sed -i 's/^#\(DATABASE_URL=.*rausachfinal.*\)/\1/g' "$ENV_FILE"

# Thực hiện Build
docker compose build --parallel
BUILD_RESULT=$?

# Restore original .env (Ngay sau khi build xong để dev tiếp tục dùng testdata)
mv "${ENV_FILE}.bak" "$ENV_FILE"
echo "♻️ Đã khôi phục DATABASE về bản Dev (testdata) cho môi trường Local."

if [ $BUILD_RESULT -ne 0 ]; then echo "❌ Lỗi khi build image!"; exit 1; fi

# Xác định tên Image (Dựa trên folder hiện tại)
BE_IMAGE=$(docker compose config --images | grep berausach)
FE_IMAGE=$(docker compose config --images | grep ferausach)

echo ""
echo "-------------------------------------------------"
echo "📝 Bước 2: 📦 Đang nén và đóng gói Image bản mới..."
echo "Mô tả: Xuất Image ra file vật lý (.tar.gz) để chuẩn bị chuyển đi."
PACKAGE_NAME="deploy_$(date +%Y%m%d_%H%M%S).tar.gz"
docker save $BE_IMAGE $FE_IMAGE | gzip > /tmp/$PACKAGE_NAME

echo ""
echo "-------------------------------------------------"
echo "📝 Bước 3: 🚚 Đang chuyển gói Image lên Server ($SERVER_IP)..."
echo "Mô tả: Sử dụng SCP để truyền file nén trực tiếp lên thư mục lưu trữ của Server."
ssh $SERVER_USER@$SERVER_IP "mkdir -p $BACKUP_DIR"
scp /tmp/$PACKAGE_NAME $SERVER_USER@$SERVER_IP:$BACKUP_DIR/
if [ $? -ne 0 ]; then echo "❌ Lỗi khi copy file!"; exit 1; fi

echo ""
echo "-------------------------------------------------"
echo "📝 Bước 4: 💾 Đang tạo điểm phục hồi (Rollback Point) trên Server..."
echo "Mô tả: Đánh dấu bản đang chạy hiện tại là 'stable' để có thể quay lại ngay lập tức nếu bản mới lỗi."
ssh $SERVER_USER@$SERVER_IP << EOF
  docker tag $BE_IMAGE:latest $BE_IMAGE:stable 2>/dev/null
  docker tag $FE_IMAGE:latest $FE_IMAGE:stable 2>/dev/null
EOF

echo ""
echo "-------------------------------------------------"
echo "📝 Bước 5: 📥 Đang nạp Image mới vào Docker Server..."
echo "Mô tả: Giải nén và đăng ký Image mới vào hệ thống quản lý của Server."
ssh $SERVER_USER@$SERVER_IP "gunzip -c $BACKUP_DIR/$PACKAGE_NAME | docker load"

if [ "$is_dry_run" == "true" ]; then
    echo ""
    echo "-------------------------------------------------"
    echo "📝 Bước 6 (Dry Run): 🧪 Đang chạy thử nghiệm cô lập..."
    echo "Mô tả: Khởi động Backend mới trên PORT 53332 (Cổng kiểm thử)."
    ssh $SERVER_USER@$SERVER_IP << EOF
      cd $PROJECT_DIR
      docker stop dry-run-test 2>/dev/null && docker rm dry-run-test 2>/dev/null
      
      echo "🚀 Đang khởi chạy container thử nghiệm..."
      # Dọn dẹp dấu nháy kép dư thừa trong .env trên server (nếu có)
      sed -i 's/DATABASE_URL=\"\(.*\)\"/DATABASE_URL=\1/' api/.env
      
      # Chạy trực tiếp qua docker run, nạp toàn bộ .env và kết nối network
      docker run -d --name dry-run-test \
        -p 53332:3331 \
        --network rausachfinal_default \
        --env-file api/.env \
        -e REDIS_HOST="redis" \
        $BE_IMAGE:latest
      
      echo "⏱️ Chờ 15s để Backend boot..."
      sleep 15
      
      # Kiểm tra Health
      if curl -s http://localhost:53332/database-info >/dev/null; then
         echo "✅ KẾT QUẢ DRY RUN: THÀNH CÔNG!"
         echo "🌐 Bạn có thể xem thử thực tế tại: http://$SERVER_IP:53332/database-info"
         echo ""
         echo "⏸️  CONTAINER ĐANG CHỜ... Hãy kiểm tra link trên trình duyệt."
      else
         echo "❌ KẾT QUẢ DRY RUN: THẤT BẠI!"
         echo "📋 Kiểm tra LOGS để tìm lỗi:"
         docker logs dry-run-test | tail -n 20
         echo "⚠️ Container 'dry-run-test' vẫn đang được giữ lại trên server để bạn kiểm tra (docker ps)."
         echo "💡 Hãy tự xóa bằng lệnh: docker rm -f dry-run-test sau khi kiểm tra xong."
         exit 1
      fi
EOF
    # Tạm dừng ở máy local để người dùng kịp check trình duyệt
    if [ $? -eq 0 ]; then
        echo ""
        read -p "🖥️ Nhấn [Enter] sau khi bạn đã kiểm tra xong để dọn dẹp và kết thúc..." 
        ssh $SERVER_USER@$SERVER_IP "docker stop dry-run-test >/dev/null && docker rm dry-run-test >/dev/null"
        echo "🧹 Đã dọn dẹp container thử nghiệm xong."
    fi
else
    echo ""
    echo "-------------------------------------------------"
    echo "📝 Bước 6: 🔃 Đang cập nhật ứng dụng chính thức..."
    echo "Mô tả: Thay thế phiên bản cũ bằng phiên bản mới và khởi động lại."
    ssh $SERVER_USER@$SERVER_IP << EOF
      cd $PROJECT_DIR
      
      echo "🧹 Đang dọn dẹp các container thử nghiệm cũ (nếu có)..."
      docker stop dry-run-test 2>/dev/null && docker rm dry-run-test 2>/dev/null
      
      git pull  # Cập nhật cấu hình docker-compose.yml mới nhất
      docker compose up -d
      
      echo "⏱️ Đang kiểm tra Healthcheck sau Deploy (20s)..."
      sleep 20
      
      # Kiểm tra lỗi
      if ! curl -s http://localhost:53331/database-info >/dev/null; then
         echo "⚠️ CẢNH BÁO: Phát hiện lỗi sau khi Deploy! Đang tự động Fallback..."
         docker tag $BE_IMAGE:stable $BE_IMAGE:latest
         docker tag $FE_IMAGE:stable $FE_IMAGE:latest
         docker compose up -d
         echo "✅ Đã phục hồi thành công bản chạy ổn định trước đó."
      else
         echo "🎉 DEPLOY THÀNH CÔNG! Hệ thống đã Online với bản mới nhất."
      fi
EOF
fi

# Cleanup local temp file
rm /tmp/$PACKAGE_NAME
echo ""
echo "🔚 Quy trình kết thúc."
