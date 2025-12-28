-- Sample data đơn giản cho Thu Chi & Hóa Đơn
-- Chạy với: PGPASSWORD=xxx psql -h host -p port -U user -d db -f sql/sample-thuchi-data-simple.sql

-- 1. Tạo Phiếu Thu (Receipt)
INSERT INTO "PhieuThuChi"
    (id, "maPhieu", loai, ngay, "soTien", "doiTuong", "tenDoiTuong",
    "phuongThuc", "coHoaDon", "trangThai", ghichu, "createdAt", "updatedAt")
VALUES
    (
        gen_random_uuid(),
        'PTH-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-001',
        'THU',
        NOW(),
        5000000,
        'KHACHHANG',
        'Nguyễn Văn A',
        'TIEN_MAT',
        true,
        'DA_DUYET',
        'Thu tiền khách hàng - Đơn hàng DH001',
        NOW(),
        NOW()
    ),
    (
        gen_random_uuid(),
        'PTH-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-002',
        'THU',
        NOW(),
        15000000,
        'KHACHHANG',
        'Trần Văn B',
        'CHUYEN_KHOAN',
        false,
        'CHO_DUYET',
        'Thu tiền chuyển khoản - Đơn hàng DH002',
        NOW(),
        NOW()
    );

-- 2. Tạo Phiếu Chi (Payment)
INSERT INTO "PhieuThuChi"
    (id, "maPhieu", loai, ngay, "soTien", "doiTuong", "tenDoiTuong",
    "phuongThuc", "coHoaDon", "trangThai", ghichu, lydo, "createdAt", "updatedAt")
VALUES
    (
        gen_random_uuid(),
        'PTC-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-001',
        'CHI',
        NOW(),
        8000000,
        'NHACUNGCAP',
        'Công ty ABC',
        'TIEN_MAT',
        true,
        'DA_DUYET',
        'Mua hàng từ nhà cung cấp',
        'Chi phí mua hàng',
        NOW(),
        NOW()
    ),
    (
        gen_random_uuid(),
        'PTC-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-002',
        'CHI',
        NOW(),
        25000000,
        'NHANVIEN',
        'Phòng Kinh doanh',
        'CHUYEN_KHOAN',
        false,
        'CHO_DUYET',
        'Chi lương tháng 1/2025',
        'Lương nhân viên',
        NOW(),
        NOW()
    );

-- 3. Kiểm tra kết quả
SELECT
    "maPhieu",
    loai,
    TO_CHAR(ngay, 'DD/MM/YYYY') as ngay,
    "soTien",
    "trangThai",
    ghichu
FROM "PhieuThuChi"
ORDER BY "createdAt" DESC
LIMIT 10;

SELECT COUNT
(*) as total_phieuthuchi FROM "PhieuThuChi";
