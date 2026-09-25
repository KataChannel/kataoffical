#!/bin/bash
# =============================================================
# 🔄 Script Rollback Nhanh VPS: Quay lại Image :stable gần nhất
# =============================================================

SERVER_IP="116.118.49.243"
SERVER_USER="root"
PROJECT_DIR="rausachfinal"

echo "╔═══════════════════════════════════════════════╗"
echo "║      🔄 ROLLBACK PHỤC HỒI NHANH TRÊN VPS      ║"
echo "╚═══════════════════════════════════════════════╝"
echo ""

echo "⚠️  LƯU Ý: Thao tác này sẽ trả Backend & Frontend về bản :stable"
echo "   (phiên bản hoạt động tốt ngay trước lần deploy gần nhất)."
echo ""
read -p "Bạn có chắc chắn muốn Rollback về bản stable không? (y/N): " confirm

if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
    echo "👋 Đã hủy thao tác rollback."
    exit 0
fi

echo "🚀 Đang thực hiện Rollback trên server ($SERVER_IP)..."

ssh $SERVER_USER@$SERVER_IP << 'EOF'
  cd rausachfinal

  BE_IMAGE=$(docker compose config --images | grep berausach)
  FE_IMAGE=$(docker compose config --images | grep ferausach)

  echo "1. Đang kiểm tra image stable..."
  if ! docker image inspect $BE_IMAGE:stable >/dev/null 2>&1; then
      echo "❌ Không tìm thấy image $BE_IMAGE:stable trên server!"
      exit 1
  fi

  echo "2. Khôi phục nhãn :latest từ bản :stable..."
  docker tag $BE_IMAGE:stable $BE_IMAGE:latest
  docker tag $FE_IMAGE:stable $FE_IMAGE:latest

  echo "3. Khởi động lại Backend và Frontend..."
  docker rm -f rausach-backend rausach-frontend 2>/dev/null || true
  docker compose -p rausachfinal up -d --no-deps berausach ferausach

  echo "🎉 ROLLBACK HOÀN TẤT! Hệ thống đã phục hồi về bản ổn định trước đó."
EOF

echo "🔚 Kết thúc quá trình rollback."
