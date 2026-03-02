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
