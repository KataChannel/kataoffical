#!/bin/bash

# Script test và setup Thu Chi & Hóa Đơn Điện Tử
# Chạy trong thư mục /chikiet/kata2025/rausachfinalv2/api

set -e

echo "========================================="
echo "SETUP THU CHI & HÓA ĐƠN ĐIỆN TỬ"
echo "========================================="

# Màu sắc
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Kiểm tra Prisma schema
echo -e "${BLUE}[1/6] Kiểm tra Prisma schema...${NC}"
if grep -q "model PhieuThuChi" prisma/schema.prisma; then
  echo -e "${GREEN}✓ PhieuThuChi model exists${NC}"
else
  echo -e "${RED}✗ PhieuThuChi model not found${NC}"
  exit 1
fi

if grep -q "model ThanhToan" prisma/schema.prisma; then
  echo -e "${GREEN}✓ ThanhToan model exists${NC}"
else
  echo -e "${RED}✗ ThanhToan model not found${NC}"
  exit 1
fi

if grep -q "model HoaDonDienTu" prisma/schema.prisma; then
  echo -e "${GREEN}✓ HoaDonDienTu model exists${NC}"
else
  echo -e "${RED}✗ HoaDonDienTu model not found${NC}"
  exit 1
fi

# 2. Generate Prisma Client
echo -e "${BLUE}[2/6] Generate Prisma Client...${NC}"
npx prisma generate
echo -e "${GREEN}✓ Prisma Client generated${NC}"

# 3. Push schema to database
echo -e "${BLUE}[3/6] Push schema to database...${NC}"
read -p "Bạn có muốn push schema (có thể mất data)? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  npx prisma db push --accept-data-loss
  echo -e "${GREEN}✓ Schema pushed to database${NC}"
else
  echo -e "${YELLOW}⊘ Bỏ qua push schema${NC}"
fi

# 4. Thêm menu items
echo -e "${BLUE}[4/6] Thêm menu items...${NC}"
read -p "Bạn có muốn thêm menu Tài chính? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  PGPASSWORD=kata@2025 psql -h 116.118.49.243 -p 55432 -U kata2025 -d rausachtrangia -f sql/add-thuci-menu-items.sql
  echo -e "${GREEN}✓ Menu items added${NC}"
else
  echo -e "${YELLOW}⊘ Bỏ qua thêm menu${NC}"
fi

# 5. Thêm permissions
echo -e "${BLUE}[5/6] Thêm permissions...${NC}"
read -p "Bạn có muốn thêm permissions? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  PGPASSWORD=kata@2025 psql -h 116.118.49.243 -p 55432 -U kata2025 -d rausachtrangia -f sql/add-thuci-permissions.sql
  echo -e "${GREEN}✓ Permissions added${NC}"
else
  echo -e "${YELLOW}⊘ Bỏ qua thêm permissions${NC}"
fi

# 6. Restart server
echo -e "${BLUE}[6/6] Restart server...${NC}"
read -p "Bạn có muốn restart server? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  if command -v pm2 &> /dev/null; then
    pm2 restart rausach-api
    echo -e "${GREEN}✓ Server restarted${NC}"
  else
    echo -e "${YELLOW}⊘ PM2 not found, bạn cần restart server manually${NC}"
  fi
else
  echo -e "${YELLOW}⊘ Bỏ qua restart server${NC}"
fi

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}SETUP HOÀN TẤT!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo -e "${BLUE}Test APIs bằng cách:${NC}"
echo "1. Mở file test-thuci-apis.http trong VS Code"
echo "2. Cài extension REST Client"
echo "3. Click 'Send Request' trên từng endpoint"
echo ""
echo -e "${BLUE}Hoặc test bằng curl:${NC}"
echo "curl -X GET http://localhost:3000/phieuthuchi"
echo ""
echo -e "${BLUE}Frontend URLs:${NC}"
echo "- Admin PhieuThuChi: http://localhost:4200/admin/phieuthuchi"
echo "- Admin ThanhToan: http://localhost:4200/admin/thanhtoan"
echo "- Admin HoaDon: http://localhost:4200/admin/hoadon"
echo "- Public Confirm: http://localhost:4200/confirm/:token"
echo ""
