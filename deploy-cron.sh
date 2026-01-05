#!/bin/bash

echo "🚀 DEPLOY CRON JOB LÊN SERVER"
echo "========================================"
echo ""

# Kiểm tra các thay đổi
echo "📋 Những gì đã được chuẩn bị:"
echo "  ✅ Script path tự động detect (local/production)"
echo "  ✅ Test cron chỉ chạy ở development"
echo "  ✅ Log directory support Docker volume"
echo "  ✅ Docker compose đã thêm volume & NODE_ENV"
echo ""

# Kiểm tra Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker chưa được cài đặt"
    exit 1
fi

# 1. Build Docker image mới...
read -p "Tiếp tục build image? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    SCRIPT_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    cd "$SCRIPT_PATH/api"
    docker build -t rausach-backend:latest .
    if [ $? -eq 0 ]; then
        echo "✅ Build image thành công"
    else
        echo "❌ Build image thất bại"
        exit 1
    fi
else
    echo "Bỏ qua build image"
fi

echo ""
echo "2️⃣  Tạo thư mục logs..."
cd "$SCRIPT_PATH"
mkdir -p logs
chmod 777 logs
echo "✅ Đã tạo thư mục logs"

echo ""
echo "3️⃣  Deploy container..."
read -p "Deploy lên server? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker-compose -f docker-compose.v3.yml down
    docker-compose -f docker-compose.v3.yml up -d
    if [ $? -eq 0 ]; then
        echo "✅ Deploy thành công"
    else
        echo "❌ Deploy thất bại"
        exit 1
    fi
else
    echo "Bỏ qua deploy"
    exit 0
fi

echo ""
echo "4️⃣  Kiểm tra container..."
sleep 3
docker ps | grep rausachv3-api
if [ $? -eq 0 ]; then
    echo "✅ Container đang chạy"
else
    echo "❌ Container không chạy"
    exit 1
fi

echo ""
echo "5️⃣  Kiểm tra log..."
echo "📋 Log khởi động (10 dòng cuối):"
docker logs rausachv3-api --tail 10

echo ""
echo "🔍 Kiểm tra DatabaseSyncService:"
docker logs rausachv3-api 2>&1 | grep "DatabaseSyncService" | tail -5

echo ""
echo "========================================"
echo "✅ DEPLOY HOÀN TẤT"
echo ""
echo "📊 Kiểm tra chi tiết:"
echo "  - Xem log: docker logs rausachv3-api -f"
echo "  - Xem log sync: ls -la logs/"
echo "  - Test API: curl -X POST https://apiv3.rausachtrangia.com/database-sync/manual-sync"
echo ""
echo "⏰ Cron sẽ tự động chạy vào:"
echo "  - 7:00 sáng (giờ VN)"
echo "  - 17:00 chiều (giờ VN)"
echo ""
