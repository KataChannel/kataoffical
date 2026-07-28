#!/bin/bash
# =============================================================
# 🧹 Script Dọn dẹp Database - Tối ưu hóa lưu trữ
# =============================================================

SCRIPT_DIR="$(dirname "$0")"
API_DIR="${SCRIPT_DIR}/../api"

echo ""
echo "╔═══════════════════════════════════════════════╗"
echo "║   🧹 DỌN DẸP DATABASE - RAUSACHFINAL         ║"
echo "╚═══════════════════════════════════════════════╝"
echo ""
echo "Chọn chế độ:"
echo "  1. 📊 Xem thống kê database (an toàn)"
echo "  2. 🔍 Xem trước sẽ dọn dẹp bao nhiêu (Dry Run)"
echo "  3. 🗑️  Thực hiện dọn dẹp thật (⚠️ cau thận!)"
echo "  0. Thoát"
echo ""
read -p "Chọn (0-3): " choice

case $choice in
    1)
        echo "=> Đang lấy thống kê..."
        cd "$API_DIR" && npx ts-node scripts/cleanup-database.ts --stats
        ;;
    2)
        echo "=> Đang chạy Dry Run..."
        cd "$API_DIR" && npx ts-node scripts/cleanup-database.ts --dry-run
        ;;
    3)
        echo ""
        echo "⚠️  CẢNH BÁO: Hành động này sẽ XÓA dữ liệu thật!"
        read -p "Bạn đã BACKUP chưa? (yes/no): " confirm
        if [ "$confirm" = "yes" ] || [ "$confirm" = "y" ]; then
            echo "=> Đang thực hiện dọn dẹp..."
            cd "$API_DIR" && npx ts-node scripts/cleanup-database.ts --execute
            
            # Thêm option VACUUM sau khi dọn dẹp
            echo ""
            echo "💡 Dọn dẹp xong. Bạn có muốn chạy 'VACUUM ANALYZE' để thu hồi dung lượng thực tế không?"
            echo "   (Hành động này giúp database chạy nhanh hơn nhưng có thể tốn thời gian)"
            read -p "Chạy VACUUM ngay? (yes/no): " vacuum_confirm
            
            if [ "$vacuum_confirm" = "yes" ] || [ "$vacuum_confirm" = "y" ]; then
                echo "=> Đang phân tích Database để thực thi VACUUM..."
                
                # Bóc tách thông tin từ DATABASE_URL trong .env
                DB_URI=$(grep -E "^DATABASE_URL=" "$API_DIR/.env" | cut -d'=' -f2- | tr -d '\r' | sed 's/^"//;s/"$//')
                
                # Regex để bóc tách: postgresql://user:pass@host:port/dbname?...
                DB_USER=$(echo "$DB_URI" | sed -E 's/.*:\/\/([^:]+):.*/\1/')
                DB_PASS=$(echo "$DB_URI" | sed -E 's/.*:\/\/([^:]+):([^@]+)@.*/\2/')
                DB_HOST=$(echo "$DB_URI" | sed -E 's/.*@([^:]+):.*/\1/')
                DB_PORT=$(echo "$DB_URI" | sed -E 's/.*:([0-9]+)\/.*/\1/')
                DB_NAME=$(echo "$DB_URI" | sed -E 's/.*\/([^?]+)(\?.*)?$/\1/')
                
                echo "🌐 Đang thực thi VACUUM trên: ${DB_HOST} -> ${DB_NAME}"
                PGPASSWORD=$DB_PASS psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "VACUUM (VERBOSE, ANALYZE);"
                
                if [ $? -eq 0 ]; then
                    echo "✅ Đã tối ưu hóa lưu trữ thành công!"
                else
                    echo "❌ Lỗi khi chạy VACUUM. Kiểm tra kết nối hoặc quyền hạn psql."
                fi
            fi
        else
            echo "=> Hãy backup trước: bash scripts/fast_backup.sh"
            exit 0
        fi
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
