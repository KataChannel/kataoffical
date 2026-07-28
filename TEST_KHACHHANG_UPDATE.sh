#!/bin/bash

echo "🧪 TEST KHÁCH HÀNG UPDATE - Kiểm tra các logs"
echo "================================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}1️⃣  Kiểm tra FRONTEND logs${NC}"
echo "   Mở DevTools (F12) → Console → tìm:"
echo "   - ${GREEN}[CUSTOMER] Updating customers for banggia${NC}"
echo "   - ${GREEN}[CUSTOMER] Current IDs${NC}"
echo "   - ${GREEN}[CUSTOMER] New IDs${NC}"
echo "   - ${GREEN}[UPDATE-BG] updateData after cleanup${NC}"
echo ""

echo -e "${BLUE}2️⃣  Kiểm tra BACKEND logs${NC}"
echo "   Chạy lệnh:"
echo ""
echo -e "${YELLOW}   tail -f /tmp/backend.log | grep -E '\\[RELATION\\]|\\[CLEAN\\]|✅|🧹'${NC}"
echo ""
echo "   Kỳ vọng thấy:"
echo "   - ${GREEN}✅ [RELATION] Validated connect for 'khachhang'${NC}"
echo "   - ${GREEN}✅ [RELATION] Validated disconnect for 'khachhang'${NC}"
echo "   - ${GREEN}🧹 [CLEAN] Cleaned khachhang${NC}"
echo ""

echo -e "${BLUE}3️⃣  TEST STEPS${NC}"
echo ""
echo "   Step 1: Mở bảng giá detail"
echo "   Step 2: Xóa 1 khách hàng"
echo "   Step 3: Thêm 2 khách hàng khác"
echo "   Step 4: Nhấn 'Cập nhật'"
echo ""
echo "   ✅ PASS nếu:"
echo "      - Số lượng hiển thị: tổng khách hàng chính xác"
echo "      - Frontend logs: thấy connect/disconnect arrays"
echo "      - Backend logs: thấy validation messages"
echo "      - Database: dữ liệu persisted (reload page → vẫn đúng)"
echo ""

echo -e "${BLUE}4️⃣  EXPECTED LOGS OUTPUT${NC}"
echo ""
echo -e "${GREEN}Frontend Console:${NC}"
cat << 'EOF'
[CUSTOMER] Updating customers for banggia: 
[CUSTOMER] Current banggia from server: 
[CUSTOMER] Current IDs from server: [id1, id2, id3, ...]
[CUSTOMER] New IDs: [id2, id3, id4, id5, ...]
[CUSTOMER] To Connect: [id4, id5]
[CUSTOMER] To Disconnect: [id1]
[UPDATE-BG] Input dulieu: {"id": "...", "khachhang": {"disconnect": [...], "connect": [...]}}
[UPDATE-BG] Processing khachhang: {"disconnect": [...], "connect": [...]}
[UPDATE-BG] khachhang is Prisma structure: 
[UPDATE-BG] GraphQL response khachhang count: 5
[CUSTOMER] Final customer count: 5
✓ Cập nhật 5 khách hàng thành công
EOF

echo ""
echo -e "${GREEN}Backend Logs:${NC}"
cat << 'EOF'
✅ [RELATION] Validated connect for 'khachhang': [{"id":"..."}, ...]
✅ [RELATION] Connect count for 'khachhang': 2
✅ [RELATION] Validated disconnect for 'khachhang': [{"id":"..."}, ...]
✅ [RELATION] Disconnect count for 'khachhang': 1
🧹 [CLEAN] Original data keys: [id, khachhang, ...]
🧹 [CLEAN] Cleaned data keys: [id, khachhang, ...]
🧹 [CLEAN] Original khachhang: {"disconnect": [...], "connect": [...]}
🧹 [CLEAN] Cleaned khachhang: {"disconnect": [...], "connect": [...]}
📤 Final update options for banggia:
  {
    "where": {"id": "..."},
    "data": {
      "khachhang": {
        "disconnect": [{"id": "..."}, ...],
        "connect": [{"id": "..."}, ...]
      }
    }
  }
✅ Update result for banggia: {..., "khachhang": [...17 items...]}
EOF

echo ""
echo "================================================"
echo -e "${GREEN}✅ TEST READY${NC}"
echo ""
echo "Ghi chú:"
echo "- Nếu thấy ${RED}[UPDATE-BG] khachhang is array${NC} → Dữ liệu gửi sai format"
echo "- Nếu không thấy ${GREEN}[RELATION]${NC} logs → Backend chưa rebuild"
echo "- Nếu số lượng vẫn cũ → Check kết nối server/cache"
echo ""
