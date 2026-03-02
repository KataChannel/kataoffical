#!/bin/bash
# =============================================================
# 🚀 Script Tối ưu hóa Tất cả Sản phẩm (Khớp lệnh hàng loạt)
# Gọi API nội bộ optimize-all-internal - KHÔNG CẦN LOGIN
# =============================================================

# Đọc cấu hình từ .env
ENV_FILE="$(dirname "$0")/../api/.env"
if [ -f "$ENV_FILE" ]; then
    PORT=$(grep -E "^PORT=" "$ENV_FILE" | cut -d'=' -f2 | tr -d '\r')
fi
PORT=${PORT:-3331}

API_URL="http://localhost:${PORT}"

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║   🔧 TỐI ƯU HÓA TẤT CẢ SẢN PHẨM (BULK)          ║"
echo "║   API: ${API_URL}                            ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# Kiểm tra API backend có chạy không
echo "🔍 Kiểm tra API backend..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${API_URL}/sanpham/select" 2>/dev/null)

if [ "$HTTP_CODE" != "200" ] && [ "$HTTP_CODE" != "201" ]; then
    echo "❌ API backend KHÔNG chạy trên ${API_URL}!"
    echo "   Hãy khởi động backend trước: cd api && npx bun start"
    exit 1
fi
echo "✅ API backend đang chạy!"

# Đếm số sản phẩm
TOTAL=$(curl -s "${API_URL}/sanpham?pageSize=1&page=1" 2>/dev/null | grep -oP '"total"\s*:\s*\K[0-9]+')
echo "📦 Tổng sản phẩm: ${TOTAL:-???}"

echo ""
echo "⚡ Bắt đầu tối ưu hóa hàng loạt..."
echo "   (Xử lý theo batch 100 sản phẩm, có thể mất vài phút)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Gọi API nội bộ - 1 lệnh duy nhất, server tự xử lý tất cả
# Timeout 10 phút cho 1000+ sản phẩm
RESULT=$(curl -s --max-time 600 -X POST "${API_URL}/dathang/optimize-all-internal" \
    -H "Content-Type: application/json" 2>/dev/null)

# Parse kết quả
SUCCESS=$(echo "$RESULT" | grep -oP '"success"\s*:\s*\K(true|false)')
TOTAL_PRODUCTS=$(echo "$RESULT" | grep -oP '"totalProducts"\s*:\s*\K[0-9]+')
BATCHES=$(echo "$RESULT" | grep -oP '"processedBatches"\s*:\s*\K[0-9]+')
OPTIMIZED=$(echo "$RESULT" | grep -oP '"totalOptimized"\s*:\s*\K[0-9]+')

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║              📊 KẾT QUẢ TỐI ƯU                     ║"
echo "╠══════════════════════════════════════════════════════╣"

if [ "$SUCCESS" = "true" ]; then
    echo "║  ✅ Trạng thái: THÀNH CÔNG                         ║"
else
    echo "║  ⚠️  Trạng thái: CÓ LỖI                            ║"
fi

echo "║  📦 Tổng sản phẩm:    ${TOTAL_PRODUCTS:-???}                           ║"
echo "║  📋 Batch xử lý:       ${BATCHES:-???}                              ║"
echo "║  🔧 Mục khớp lệnh:    ${OPTIMIZED:-0}                              ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

if [ "$SUCCESS" = "true" ]; then
    echo "🎉 Hoàn tất! Dữ liệu kho đã được khớp lệnh và tối ưu."
else
    echo "⚠️  Có một số lỗi. Kiểm tra log backend để biết chi tiết."
    echo "   Response: $(echo "$RESULT" | head -c 500)"
fi
