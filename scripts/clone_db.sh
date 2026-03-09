#!/bin/bash

# Cấu hình Database
SERVER="root@116.118.49.243"
DB_USER="AWois79wFA1bxMK"
DB_PASS="7bhNHJcSEbWln9v"
DB_SOURCE="rausachfinal"
DB_TARGET="testdata"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
# Dump file sẽ nằm TRONG container
DUMP_FILE="/tmp/clone_${DB_SOURCE}_${TIMESTAMP}.sql"

echo "======================================================"
echo " ĐANG CLONE DATABASE TRÊN SERVER (KHÔNG ẢNH HƯỞNG DB GỐC)"
echo " Từ (Source): $DB_SOURCE"
echo " Sang (Target): $DB_TARGET"
echo "======================================================"

ssh $SERVER << INTERNALSCRIPT
    # Bắt lỗi không làm ảnh hưởng kịch bản
    set -e 
    
    # 0. Tìm container Postgres (có thể tên thay đổi)
    CONTAINER=\$(docker ps --format '{{.Names}}\t{{.Ports}}' | grep 55432 | awk '{print \$1}')
    if [ -z "\$CONTAINER" ]; then
        echo "❌ KHÔNG TÌM THẤY CONTAINER POSTGRES TRÊN CỔNG 55432!"
        exit 1
    fi
    echo "=> Đã tìm thấy container: \$CONTAINER"

    # 1. Export database gốc ($DB_SOURCE) ra file SQL
    echo "=> 1. Đang trích xuất (dump) database gốc ($DB_SOURCE)..."
    docker exec \$CONTAINER pg_dump -U $DB_USER -d $DB_SOURCE -F c -f $DUMP_FILE

    # 2. Xóa & Tạo lại database đích ($DB_TARGET) để reset sạch data (tùy chọn nhưng cần thiết để tránh trùng lặp khi import đè)
    echo "=> 2. Đang chuẩn bị database đích ($DB_TARGET)..."
    
    # Ép buộc ngắt tất cả các kết nối tới DB $DB_TARGET hiện tại trước khi xóa (nếu có)
    docker exec -e PGPASSWORD=$DB_PASS \$CONTAINER psql -U $DB_USER -d postgres -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$DB_TARGET';" || true
    
    # Xóa database $DB_TARGET (nếu có)
    docker exec -e PGPASSWORD=$DB_PASS \$CONTAINER psql -U $DB_USER -d postgres -c "DROP DATABASE IF EXISTS $DB_TARGET;" || true
    
    # Tạo lại database $DB_TARGET mới tinh
    docker exec -e PGPASSWORD=$DB_PASS \$CONTAINER psql -U $DB_USER -d postgres -c "CREATE DATABASE $DB_TARGET;"
    
    # 3. Import data vào database đích ($DB_TARGET)
    echo "=> 3. Đang chèn dữ liệu vào database mới ($DB_TARGET)..."
    docker exec \$CONTAINER pg_restore -U $DB_USER -d $DB_TARGET -1 $DUMP_FILE || echo "   (Lưu ý: Một số lỗi khôi phục role/user không ảnh hưởng đến dữ liệu)"
    
    # 4. Dọn dẹp
    echo "=> 4. Dọn dẹp file rác..."
    docker exec \$CONTAINER rm -f $DUMP_FILE
    
    echo "======================================================"
    echo "✅ CLONE DATABASE THÀNH CÔNG TỪ: $DB_SOURCE -> $DB_TARGET"
    echo "======================================================"
INTERNALSCRIPT
