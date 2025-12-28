-- Sample data cho Thu Chi & Hóa Đơn để test
-- Chạy với: PGPASSWORD=xxx psql -h host -p port -U user -d db -f sql/sample-thuci-data.sql

-- Lấy một số IDs cần thiết
DO $
$
DECLARE 
    nhanvien_id TEXT;
    khachhang_id TEXT;
    donhang_id TEXT;
BEGIN
    -- Lấy NhanVien ID đầu tiên
    SELECT id
    INTO nhanvien_id
    FROM "NhanVien" LIMIT
    1;

-- Lấy KhachHang ID đầu tiên
SELECT id
INTO khachhang_id
FROM "KhachHang" LIMIT
1;

-- Lấy Donhang ID đầu tiên (nếu có)
SELECT id
INTO donhang_id
FROM "Donhang" LIMIT
1;

IF nhanvien_id IS NULL THEN
        RAISE NOTICE 'Không tìm thấy NhanVien, cần tạo NhanVien trước';
RETURN;
END
IF;
    
    -- 1. Tạo mẫu Phiếu Thu (Receipt)
    INSERT INTO "PhieuThuChi"
    (id, "maPhieu", "loaiPhieu", "ngayPhieu", "soTien", "noiDung",
    "nguoiNop", "nguoiNhan", "loaiThuChi", "trangThai",
    "nguoiTaoId", "createdAt", "updatedAt")
VALUES
    -- Phiếu thu tiền mặt
    (
        gen_random_uuid(),
        'PTH-20250115-001',
        'THU',
        NOW(),
        5000000,
        'Thu tiền khách hàng Nguyễn Văn A - Đơn hàng DH001',
        'Nguyễn Văn A',
        'Nguyễn Thị B (Thu ngân)',
        'TIEN_MAT',
        'DA_DUYET',
        nhanvien_id,
        NOW(),
        NOW()
        ),
    -- Phiếu thu chuyển khoản
    (
        gen_random_uuid(),
        'PTH-20250115-002',
        'THU',
        NOW(),
        15000000,
        'Thu tiền khách hàng Trần Văn C - Chuyển khoản',
        'Trần Văn C',
        'Nguyễn Thị B (Thu ngân)',
        'CHUYEN_KHOAN',
        'CHO_DUYET',
        nhanvien_id,
        NOW(),
        NOW()
        );

-- 2. Tạo mẫu Phiếu Chi (Payment)
INSERT INTO "PhieuThuChi"
    (id, "maPhieu", "loaiPhieu", "ngayPhieu", "soTien", "noiDung",
    "nguoiNop", "nguoiNhan", "loaiThuChi", "trangThai",
    "nguoiTaoId", "createdAt", "updatedAt")
VALUES
    -- Phiếu chi mua hàng
    (
        gen_random_uuid(),
        'PTC-20250115-001',
        'CHI',
        NOW(),
        8000000,
        'Chi phí mua hàng từ nhà cung cấp XYZ',
        'Nguyễn Văn D (Thủ quỹ)',
        'Công ty XYZ',
        'TIEN_MAT',
        'DA_DUYET',
        nhanvien_id,
        NOW(),
        NOW()
        ),
    -- Phiếu chi lương
    (
        gen_random_uuid(),
        'PTC-20250115-002',
        'CHI',
        NOW(),
        25000000,
        'Chi lương tháng 1/2025 - Phòng Kinh doanh',
        'Nguyễn Văn D (Thủ quỹ)',
        'Nhân viên phòng KD',
        'CHUYEN_KHOAN',
        'CHO_DUYET',
        nhanvien_id,
        NOW(),
        NOW()
        );

-- 3. Tạo mẫu Thanh toán (Payment Transaction)
IF khachhang_id IS NOT NULL THEN
INSERT INTO "ThanhToan"
    (id, "maThamChieu", "soTien", "phuongThuc", "trangThai", "loaiThanhToan",
    "ghiChu", "khachHangId", "nhanVienId", "createdAt", "updatedAt")
VALUES
    -- Thanh toán đơn hàng
    (
        gen_random_uuid(),
        'TT-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-001',
        5000000,
        'TIEN_MAT',
        'THANH_CONG',
        'THANH_TOAN_DON',
        'Thanh toán đơn hàng DH001 - Tiền mặt',
        khachhang_id,
        nhanvien_id,
        NOW(),
        NOW()
            ),
    -- Thanh toán chuyển khoản
    (
        gen_random_uuid(),
        'TT-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-002',
        15000000,
        'CHUYEN_KHOAN',
        'DANG_XU_LY',
        'THANH_TOAN_DON',
        'Thanh toán đơn hàng DH002 - Chuyển khoản Vietcombank',
        khachhang_id,
        nhanvien_id,
        NOW(),
        NOW()
            );
END
IF;
    
    -- 4. Tạo mẫu Hóa đơn điện tử (E-Invoice)
    IF khachhang_id IS NOT NULL THEN
INSERT INTO "HoaDonDienTu"
    (id, "soHoaDon", "ngayHoaDon", "loaiHoaDon", "trangThai",
    "tenKhachHang", "maSoThue", "diaChi", "email", "soDienThoai",
    "tongTienHang", "tienThueGTGT", "tongThanhToan", "ghiChu",
    "khachHangId", "nguoiTaoId", "createdAt", "updatedAt")
VALUES
    -- Hóa đơn bán hàng
    (
        gen_random_uuid(),
        'HD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-001',
        NOW(),
        'BAN_HANG',
        'DA_XUAT',
        'Công ty TNHH ABC',
        '0123456789',
        '123 Đường Nguyễn Huệ, Q1, TP.HCM',
        'abc@company.com',
        '0901234567',
        5000000,
        500000,
        5500000,
        'Hóa đơn GTGT - Đơn hàng DH001',
        khachhang_id,
        nhanvien_id,
        NOW(),
        NOW()
            ),
    -- Hóa đơn chờ duyệt
    (
        gen_random_uuid(),
        'HD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-002',
        NOW(),
        'DICH_VU',
        'CHO_DUYET',
        'Công ty CP XYZ',
        '9876543210',
        '456 Đường Lê Lợi, Q1, TP.HCM',
        'xyz@company.com',
        '0909876543',
        15000000,
        1500000,
        16500000,
        'Hóa đơn dịch vụ - Tháng 01/2025',
        khachhang_id,
        nhanvien_id,
        NOW(),
        NOW()
            );
END
IF;
    
    -- 5. Tạo confirmation token cho một đơn hàng (nếu có)
    IF donhang_id IS NOT NULL THEN
UPDATE "Donhang"
        SET 
            "confirmToken" = encode(gen_random_bytes(32), 'hex'),
            "xuatHoaDon" = false,
            "updatedAt" = NOW()
        WHERE id = donhang_id;

RAISE NOTICE 'Đã tạo confirmation token cho Donhang ID: %', donhang_id;
END
IF;
    
    RAISE NOTICE 'Sample data đã được tạo thành công!';

END $$;

-- Kiểm tra kết quả
    SELECT 'PhieuThuChi' as table_name, COUNT(*) as total
    FROM "PhieuThuChi"
UNION ALL
    SELECT 'ThanhToan', COUNT(*)
    FROM "ThanhToan"
UNION ALL
    SELECT 'HoaDonDienTu', COUNT(*)
    FROM "HoaDonDienTu";

-- Hiển thị phiếu thu chi vừa tạo
SELECT
    "maPhieu",
    "loaiPhieu",
    TO_CHAR("ngayPhieu", 'DD/MM/YYYY') as ngay,
    "soTien",
    "trangThai",
    "noiDung"
FROM "PhieuThuChi"
ORDER BY "createdAt" DESC
LIMIT 10;
