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
echo "📝 Bước 1: 🏗️ Đang Build Image ở máy Local..."
echo "Mô tả: Thực hiện biên dịch source code và đóng gói vào Docker Image ngay tại máy tính của bạn."
docker compose build --parallel
if [ $? -ne 0 ]; then echo "❌ Lỗi khi build image!"; exit 1; fi

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
    echo "Mô tả: Khởi động Backend mới trên PORT 53332 để kiểm tra mà không ảnh hưởng người dùng."
    ssh $SERVER_USER@$SERVER_IP << EOF
      docker stop dry-run-test 2>/dev/null && docker rm dry-run-test 2>/dev/null
      docker run -d --name dry-run-test -p 53332:3331 $BE_IMAGE:latest
      echo "⏱️ Chờ 10s để khởi động..."
      sleep 10
      if curl -f http://localhost:3331/health >/dev/null 2>&1 || curl -s http://localhost:53332/database-info >/dev/null; then
         echo "✅ KẾT QUẢ DRY RUN: THÀNH CÔNG! Image hoạt động tốt."
      else
         echo "❌ KẾT QUẢ DRY RUN: THẤT BẠI! Có lỗi khi khởi chạy Backend."
      fi
      docker stop dry-run-test >/dev/null && docker rm dry-run-test >/dev/null
EOF
else
    echo ""
    echo "-------------------------------------------------"
    echo "📝 Bước 6: 🔃 Đang cập nhật ứng dụng chính thức..."
    echo "Mô tả: Thay thế phiên bản cũ bằng phiên bản mới và khởi động lại."
    ssh $SERVER_USER@$SERVER_IP << 'EOF'
      cd rausachfinal
      git pull  # Cập nhật cấu hình docker-compose.yml mới nhất
      docker compose up -d
      
      echo "⏱️ Đang kiểm tra Healthcheck sau Deploy (20s)..."
      sleep 20
      
      # Kiểm tra lỗi (Giả sử check database-info endpoint có sẵn)
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
