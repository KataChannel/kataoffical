#!/bin/bash

# Lấy DATABASE_URL từ file .env của api
ENV_FILE="api/.env"
if [ -f "$ENV_FILE" ]; then
    # Chỉ lấy dòng không bắt đầu bằng #
    DB_URL=$(grep -E "^DATABASE_URL=" "$ENV_FILE" | cut -d'=' -f2- | tr -d '\r' | sed 's/^"//;s/"$//')
    # Ẩn mật khẩu để bảo mật: tìm chuỗi giữa : và @
    MASKED_DB_URL=$(echo "$DB_URL" | sed -E 's/([a-zA-Z]+:\/\/.*:)(.*)(@.*)/\1****\3/')
else
    MASKED_DB_URL="Không tìm thấy file .env"
fi

# Lấy IP LAN hiện tại
LAN_IP=$(hostname -I | awk '{print $1}')
[ -z "$LAN_IP" ] && LAN_IP="localhost"

echo "🚀 MENU QUẢN LÝ DỰ ÁN RAUSACHCOPHAN (PORT 49xxx)"
echo "🌐 Database: ${MASKED_DB_URL}"
echo "📍 LAN IP: ${LAN_IP}"
echo "-----------------------------------"
echo "1. Chạy Dev (Localhost - 127.0.0.1)"
echo "2. Chạy Dev (Mạng LAN - ${LAN_IP})"
echo "3. Backup dữ liệu từ VPS (rausachcophan)"
echo "4. Nhân bản Database (Copy từ rausachfinal -> rausachcophan)"
echo "5. Phục hồi dữ liệu lên Local Docker"
echo "6. ⚡ Tối ưu hóa Tất cả Sản phẩm"
echo "7. 🧹 Dọn dẹp Database"
echo "8. 🔧 Sửa lỗi 'too many open files'"
echo "9. 🚀 Triển khai An toàn lên Server rausachcophan (49xxx)"
echo "10. 🚀 Triển khai An toàn lên Server rausachcophan (49xxx)"
echo "11. ⏫ Cập nhật Schema Database (Push)"
echo "12. 🔄 Phục hồi dữ liệu từ Local lên VPS (rausachcophan)"
echo "0. Thoát"
echo "-----------------------------------"
read -p "Vui lòng chọn chức năng (0-12): " choice

case $choice in
    1)
        TARGET_HOST="localhost"
        echo "=> ⏩ Đang khởi chạy môi trường Dev (Localhost)..."
        ;;
    2)
        TARGET_HOST="${LAN_IP}"
        echo "=> ⏩ Đang khởi chạy môi trường Dev (LAN: ${TARGET_HOST})..."
        ;;
    3)
        echo "=> Tiến hành Backup từ Server..."
        bash scripts/fast_backup.sh
        exit 0
        ;;
    4)
        echo "=> Tiến hành Nhân bản Database..."
        bash scripts/clone_db.sh
        exit 0
        ;;
    5)
        echo "=> Khởi chạy trình Phục hồi Restore..."
        bash scripts/fast_restore.sh
        exit 0
        ;;
    6|7|8)
        if [ "$choice" -eq 6 ]; then bash scripts/optimize_all.sh; fi
        if [ "$choice" -eq 7 ]; then bash scripts/cleanup_database.sh; fi
        if [ "$choice" -eq 8 ]; then 
            sudo sysctl -w fs.inotify.max_user_watches=524288
            sudo sysctl -w fs.inotify.max_user_instances=512
        fi
        exit 0
        ;;
    9|10)
        echo "=> 🚀 Đang triển khai An toàn Rausachcophan (Port 49xxx)..."
        bash scripts/deploy_safe_local.sh
        exit 0
        ;;
    11)
        echo "=> ⏫ Tiến hành Push Database (prisma db push)..."
        (cd api && bunx prisma db push)
        exit 0
        ;;
    12)
        echo "=> 🔄 Khởi chạy trình Phục hồi dữ liệu từ Local lên VPS (rausachcophan)..."
        bash scripts/restore_to_vps.sh rausachcophan
        exit 0
        ;;
    0)
        echo "👋 Đã thoát."
        exit 0
        ;;
    *)
        echo "⚠️ Lựa chọn không hợp lệ."
        exit 1
        ;;
esac

# Cập nhật context host cho Frontend
FE_ENV="frontend/src/environments/environment.development.ts"
if [ -f "$FE_ENV" ]; then
    echo "⚙️ Cập nhật APIURL: http://${TARGET_HOST}:3331"
    sed -i "s|APIURL: '.*'|APIURL: 'http://${TARGET_HOST}:3331'|g" "$FE_ENV"
fi

echo "-----------------------------------"
echo "Đang khởi động Server Backend và Frontend..."

# Chạy API trong background
(cd api && bun start) &
API_PID=$!

# Chạy Frontend trong background
(cd frontend && bun start) &
FE_PID=$!

cleanup() {
    echo ""
    echo "🛑 Đang tắt Backend (PID: $API_PID) và Frontend (PID: $FE_PID)..."
    kill $API_PID $FE_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

wait $API_PID $FE_PID
