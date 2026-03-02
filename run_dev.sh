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

echo "🚀 MENU QUẢN LÝ DỰ ÁN"
echo "🌐 Database: ${MASKED_DB_URL}"
echo "-----------------------------------"
echo "1. Chạy môi trường Dev (Frontend + Backend)"
echo "2. Backup dữ liệu (DB & Cấu hình) từ VPS"
echo "3. Thực hiện cả hai (Backup xong rồi chạy Dev)"
echo "4. Nhân bản Database (Copy từ rausachfinal -> testdata trên Server)"
echo "5. Phục hồi (Restore) dữ liệu Backup từ máy lên Docker Local"
echo "6. ⚡ Tối ưu hóa Tất cả Sản phẩm (Khớp lệnh hàng loạt)"
echo "7. 🧹 Dọn dẹp Database (Xóa Log & Tối ưu lưu trữ)"
echo "0. Thoát"
echo "-----------------------------------"
read -p "Vui lòng chọn chức năng (0-7): " choice

case $choice in
    1)
        echo "=> ⏩ Đang khởi chạy môi trường Dev..."
        ;;
    2)
        echo "=> Tiến hành Backup từ Server..."
        echo "🌐 Target Database: ${MASKED_DB_URL}"
        bash scripts/fast_backup.sh
        echo "🎉 Đã hoàn tất Backup! Thoát chương trình."
        exit 0
        ;;
    3)
        echo "=> Tiến hành Backup từ Server..."
        bash scripts/fast_backup.sh
        echo "=> ⏩ Đang khởi chạy môi trường Dev..."
        ;;
    4)
        echo "=> Tiến hành Nhân bản Database (Clone DB) trên Server..."
        echo "🌐 Server Database: ${MASKED_DB_URL}"
        bash scripts/clone_db.sh
        echo "🎉 Đã hoàn tất Clone Data! Thoát chương trình."
        exit 0
        ;;
    5)
        echo "=> Khởi chạy trình Phục hồi Restore bằng file thiết lập local..."
        echo "🌐 Local Database: ${MASKED_DB_URL}"
        bash scripts/fast_restore.sh
        echo "🎉 Đã Restore xong! Thoát chương trình."
        exit 0
        ;;
    6)
        echo "=> ⚡ Tiến hành Tối ưu hóa Tất cả Sản phẩm..."
        echo "🌐 API Database: ${MASKED_DB_URL}"
        bash scripts/optimize_all.sh
        echo "🎉 Đã hoàn tất Tối ưu! Thoát chương trình."
        exit 0
        ;;
    7)
        echo "=> 🧹 Tiến hành Dọn dẹp Database..."
        echo "🌐 Clean Database: ${MASKED_DB_URL}"
        bash scripts/cleanup_database.sh
        echo "🎉 Đã dọn dẹp xong! Thoát chương trình."
        exit 0
        ;;
    0)
        echo "👋 Đã thoát."
        exit 0
        ;;
    *)
        echo "⚠️ Lựa chọn không hợp lệ, thoát chương trình."
        exit 1
        ;;
esac

echo "-----------------------------------"
echo "Đang khởi động Server Backend và Frontend..."

# Chạy API trong background subshell để không đổi đường dẫn của script gốc
(cd api && npx bun start) &
API_PID=$!

# Chạy Frontend (đường dẫn vẫn ở thư mục gốc)
(cd frontend && bun start) &
FE_PID=$!

# Bắt sự kiện Ctrl+C (SIGINT) để tự đóng luôn cả tiến trình BE & FE chạy ngầm
cleanup() {
    echo ""
    echo "🛑 Đang tắt Backend (PID: $API_PID) và Frontend (PID: $FE_PID)..."
    kill $API_PID $FE_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

# Chờ để giữ terminal không thoát
wait $API_PID $FE_PID
