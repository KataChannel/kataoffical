#!/bin/bash

# Script để chạy file SQL tạo Menu và Permission mới
# Thường chạy sau khi sync database hoặc khi cần cập nhật menu

# Database connection details (Target V3)
TARGET_HOST="116.118.49.243"
TARGET_PORT="55432"
TARGET_DB="rausachv3"
TARGET_USER="AWois79wFA1bxMK"
TARGET_PASSWORD="7bhNHJcSEbWln9v"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 Bắt đầu khôi phục Menu và Permission mới...${NC}"

# Xác định đường dẫn SQL file
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SQL_FILE="$SCRIPT_DIR/../api/sql/create-new-menus.sql"

if [ ! -f "$SQL_FILE" ]; then
    echo -e "${RED}❌ Không tìm thấy file SQL: $SQL_FILE${NC}"
    exit 1
fi

echo -e "${YELLOW}📥 Đang chạy script SQL vào database $TARGET_DB...${NC}"

export PGPASSWORD="$TARGET_PASSWORD"
psql -h "$TARGET_HOST" -p "$TARGET_PORT" -U "$TARGET_USER" -d "$TARGET_DB" -f "$SQL_FILE"

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ Cập nhật Menu và Permission thành công!${NC}"
else
    echo -e "\n${RED}❌ Có lỗi xảy ra khi chạy script SQL.${NC}"
    exit 1
fi
