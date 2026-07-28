-- 📊 SQL Queries for Price Management & Audit Trail
-- File: audit-queries.sql

-- =============================================================================
-- 1. DONHANG PRICE AUDIT QUERIES
-- =============================================================================

-- 1.1. Xem tất cả thay đổi giá của đơn hàng cụ thể
SELECT 
    dpa.id,
    dh.madonhang,
    s.masp,
    s.title as sanpham_name,
    dpa."oldPrice"::numeric as gia_cu,
    dpa."newPrice"::numeric as gia_moi,
    dpa."changePercent"::numeric as phan_tram_thay_doi,
    dpa."changeReason" as ly_do,
    dpa."changedBy" as nguoi_thay_doi,
    dpa."changedByEmail" as email,
    dpa."ipAddress" as ip,
    dpa."createdAt" as thoi_gian
FROM "DonhangPriceAudit" dpa
JOIN "Donhang" dh ON dpa."donhangId" = dh.id
JOIN "Sanpham" s ON dpa."sanphamId" = s.id
WHERE dh.madonhang = 'DH001'  -- Thay đổi mã đơn hàng
ORDER BY dpa."createdAt" DESC;

-- 1.2. Tìm tất cả đơn hàng có thay đổi giá > 20%
SELECT 
    dh.madonhang,
    s.masp,
    s.title,
    dpa."oldPrice"::numeric,
    dpa."newPrice"::numeric,
    dpa."changePercent"::numeric,
    dpa."changeReason",
    dpa."createdAt"
FROM "DonhangPriceAudit" dpa
JOIN "Donhang" dh ON dpa."donhangId" = dh.id
JOIN "Sanpham" s ON dpa."sanphamId" = s.id
WHERE ABS(dpa."changePercent") > 20
ORDER BY ABS(dpa."changePercent") DESC;

-- 1.3. Thống kê số lần thay đổi giá theo đơn hàng
SELECT 
    dh.madonhang,
    dh."ngaygiao",
    COUNT(*) as so_lan_thay_doi,
    AVG(dpa."changePercent")::numeric(10,2) as phan_tram_trung_binh,
    MIN(dpa."createdAt") as lan_dau,
    MAX(dpa."createdAt") as lan_cuoi
FROM "DonhangPriceAudit" dpa
JOIN "Donhang" dh ON dpa."donhangId" = dh.id
GROUP BY dh.id, dh.madonhang, dh."ngaygiao"
HAVING COUNT(*) > 1
ORDER BY so_lan_thay_doi DESC;

-- 1.4. Thay đổi giá trong 24h qua
SELECT 
    dh.madonhang,
    s.title as sanpham,
    dpa."oldPrice"::numeric as gia_cu,
    dpa."newPrice"::numeric as gia_moi,
    dpa."changePercent"::numeric as thay_doi_percent,
    dpa."changeReason" as ly_do,
    dpa."changedByEmail" as nguoi_sua,
    dpa."createdAt" as thoi_gian
FROM "DonhangPriceAudit" dpa
JOIN "Donhang" dh ON dpa."donhangId" = dh.id
JOIN "Sanpham" s ON dpa."sanphamId" = s.id
WHERE dpa."createdAt" >= NOW() - INTERVAL '24 hours'
ORDER BY dpa."createdAt" DESC;

-- 1.5. Top 10 sản phẩm có nhiều thay đổi giá nhất
SELECT 
    s.masp,
    s.title,
    COUNT(*) as so_lan_thay_doi,
    AVG(dpa."changePercent")::numeric(10,2) as tb_thay_doi,
    MIN(dpa."newPrice")::numeric as gia_thap_nhat,
    MAX(dpa."newPrice")::numeric as gia_cao_nhat
FROM "DonhangPriceAudit" dpa
JOIN "Sanpham" s ON dpa."sanphamId" = s.id
GROUP BY s.id, s.masp, s.title
ORDER BY so_lan_thay_doi DESC
LIMIT 10;

-- =============================================================================
-- 2. BANGGIA PRICE HISTORY QUERIES
-- =============================================================================

-- 2.1. Xem lịch sử giá của sản phẩm trong bảng giá
SELECT 
    bh.id,
    bg.mabanggia,
    bg.title as ten_banggia,
    s.masp,
    s.title as ten_sanpham,
    bh."oldPrice"::numeric as gia_cu,
    bh."newPrice"::numeric as gia_moi,
    bh."changePercent"::numeric as phan_tram,
    bh."changeReason" as ly_do,
    bh."changedBy" as nguoi_thay_doi,
    bh."sourceType" as nguon,
    bh."changedAt" as thoi_gian
FROM "BanggiasanphamHistory" bh
JOIN "Banggia" bg ON bh."banggiaId" = bg.id
JOIN "Sanpham" s ON bh."sanphamId" = s.id
WHERE s.masp = 'SP001'  -- Thay đổi mã sản phẩm
ORDER BY bh."changedAt" DESC;

-- 2.2. Thay đổi giá theo nguồn (MANUAL, IMPORT, SYNC, BULK_UPDATE)
SELECT 
    bh."sourceType" as nguon,
    COUNT(*) as so_luong,
    AVG(bh."changePercent")::numeric(10,2) as tb_thay_doi,
    MIN(bh."changedAt") as tu_ngay,
    MAX(bh."changedAt") as den_ngay
FROM "BanggiasanphamHistory" bh
GROUP BY bh."sourceType"
ORDER BY so_luong DESC;

-- 2.3. Lịch sử giá của bảng giá cụ thể
SELECT 
    s.masp,
    s.title,
    bh."oldPrice"::numeric,
    bh."newPrice"::numeric,
    bh."changePercent"::numeric,
    bh."sourceType",
    bh."changedAt"
FROM "BanggiasanphamHistory" bh
JOIN "Banggia" bg ON bh."banggiaId" = bg.id
JOIN "Sanpham" s ON bh."sanphamId" = s.id
WHERE bg.mabanggia = 'BG202501'  -- Thay đổi mã bảng giá
ORDER BY bh."changedAt" DESC;

-- 2.4. Thống kê biến động giá 30 ngày qua
SELECT 
    s.masp,
    s.title,
    COUNT(*) as so_lan_thay_doi,
    AVG(bh."changePercent")::numeric(10,2) as tb_thay_doi,
    MIN(bh."newPrice")::numeric as gia_thap_nhat,
    MAX(bh."newPrice")::numeric as gia_cao_nhat,
    STDDEV(bh."newPrice")::numeric(10,2) as do_lech_chuan
FROM "BanggiasanphamHistory" bh
JOIN "Sanpham" s ON bh."sanphamId" = s.id
WHERE bh."changedAt" >= NOW() - INTERVAL '30 days'
GROUP BY s.id, s.masp, s.title
HAVING COUNT(*) > 1
ORDER BY so_lan_thay_doi DESC;

-- =============================================================================
-- 3. VERIFICATION QUERIES
-- =============================================================================

-- 3.1. So sánh giá đơn hàng vs bảng giá hiện tại
SELECT 
    dh.madonhang,
    s.masp,
    s.title,
    dhs."giaban"::numeric as gia_donhang,
    bgs."giaban"::numeric as gia_banggia,
    (bgs."giaban" - dhs."giaban")::numeric as chenh_lech,
    CASE 
        WHEN bgs."giaban" = dhs."giaban" THEN 'MATCH'
        WHEN bgs."giaban" > dhs."giaban" THEN 'HIGHER'
        ELSE 'LOWER'
    END as trang_thai,
    ((bgs."giaban" - dhs."giaban") / dhs."giaban" * 100)::numeric(10,2) as phan_tram_chenh_lech
FROM "Donhang" dh
JOIN "Donhangsanpham" dhs ON dhs."donhangId" = dh.id
JOIN "Sanpham" s ON s.id = dhs."idSP"
LEFT JOIN "Banggiasanpham" bgs ON bgs."sanphamId" = dhs."idSP" AND bgs."banggiaId" = dh."banggiaId"
WHERE dh.madonhang = 'DH001'  -- Thay đổi mã đơn hàng
ORDER BY ABS(bgs."giaban" - dhs."giaban") DESC;

-- 3.2. Tìm đơn hàng có giá không khớp với bảng giá
SELECT 
    dh.madonhang,
    dh."ngaygiao",
    bg.mabanggia,
    COUNT(*) as so_sp_khong_khop,
    SUM(ABS(bgs."giaban" - dhs."giaban"))::numeric as tong_chenh_lech
FROM "Donhang" dh
JOIN "Donhangsanpham" dhs ON dhs."donhangId" = dh.id
JOIN "Banggia" bg ON bg.id = dh."banggiaId"
LEFT JOIN "Banggiasanpham" bgs ON bgs."sanphamId" = dhs."idSP" AND bgs."banggiaId" = dh."banggiaId"
WHERE bgs."giaban" != dhs."giaban"
GROUP BY dh.id, dh.madonhang, dh."ngaygiao", bg.mabanggia
ORDER BY so_sp_khong_khop DESC;

-- =============================================================================
-- 4. ANALYTICS QUERIES
-- =============================================================================

-- 4.1. Xu hướng giá theo thời gian
SELECT 
    DATE(bh."changedAt") as ngay,
    s.masp,
    s.title,
    AVG(bh."newPrice")::numeric(10,2) as gia_trung_binh,
    MIN(bh."newPrice")::numeric as gia_thap_nhat,
    MAX(bh."newPrice")::numeric as gia_cao_nhat,
    COUNT(*) as so_lan_thay_doi
FROM "BanggiasanphamHistory" bh
JOIN "Sanpham" s ON bh."sanphamId" = s.id
WHERE bh."changedAt" >= NOW() - INTERVAL '90 days'
GROUP BY DATE(bh."changedAt"), s.id, s.masp, s.title
ORDER BY ngay DESC, s.masp;

-- 4.2. Top 10 người dùng thay đổi giá nhiều nhất
SELECT 
    dpa."changedByEmail" as email,
    COUNT(*) as so_lan_thay_doi,
    AVG(ABS(dpa."changePercent"))::numeric(10,2) as tb_thay_doi,
    MIN(dpa."createdAt") as lan_dau,
    MAX(dpa."createdAt") as lan_cuoi
FROM "DonhangPriceAudit" dpa
WHERE dpa."changedByEmail" IS NOT NULL
GROUP BY dpa."changedByEmail"
ORDER BY so_lan_thay_doi DESC
LIMIT 10;

-- 4.3. Phân tích tần suất thay đổi giá theo giờ trong ngày
SELECT 
    EXTRACT(HOUR FROM dpa."createdAt") as gio,
    COUNT(*) as so_lan_thay_doi,
    AVG(ABS(dpa."changePercent"))::numeric(10,2) as tb_thay_doi
FROM "DonhangPriceAudit" dpa
WHERE dpa."createdAt" >= NOW() - INTERVAL '30 days'
GROUP BY EXTRACT(HOUR FROM dpa."createdAt")
ORDER BY gio;

-- 4.4. Tổng quan audit log
SELECT 
    'Donhang Price Audit' as loai,
    COUNT(*) as tong_so,
    COUNT(DISTINCT "donhangId") as so_donhang,
    COUNT(DISTINCT "sanphamId") as so_sanpham,
    MIN("createdAt") as tu_ngay,
    MAX("createdAt") as den_ngay
FROM "DonhangPriceAudit"

UNION ALL

SELECT 
    'Banggia Price History' as loai,
    COUNT(*) as tong_so,
    COUNT(DISTINCT "banggiaId") as so_banggia,
    COUNT(DISTINCT "sanphamId") as so_sanpham,
    MIN("changedAt") as tu_ngay,
    MAX("changedAt") as den_ngay
FROM "BanggiasanphamHistory";

-- =============================================================================
-- 5. CLEANUP QUERIES (Use with caution!)
-- =============================================================================

-- 5.1. Xóa audit logs cũ hơn 1 năm (Backup trước khi chạy!)
-- BACKUP FIRST:
-- COPY "DonhangPriceAudit" TO '/tmp/donhang_audit_backup.csv' CSV HEADER;
-- COPY "BanggiasanphamHistory" TO '/tmp/banggia_history_backup.csv' CSV HEADER;

-- DELETE FROM "DonhangPriceAudit" 
-- WHERE "createdAt" < NOW() - INTERVAL '1 year';

-- DELETE FROM "BanggiasanphamHistory" 
-- WHERE "changedAt" < NOW() - INTERVAL '1 year';

-- 5.2. Archive old records
-- CREATE TABLE "DonhangPriceAudit_Archive" AS 
-- SELECT * FROM "DonhangPriceAudit"
-- WHERE "createdAt" < NOW() - INTERVAL '1 year';

-- CREATE TABLE "BanggiasanphamHistory_Archive" AS 
-- SELECT * FROM "BanggiasanphamHistory"
-- WHERE "changedAt" < NOW() - INTERVAL '1 year';

-- =============================================================================
-- 6. PERFORMANCE OPTIMIZATION
-- =============================================================================

-- 6.1. Check index usage
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan as so_lan_su_dung,
    idx_tup_read as so_rows_doc,
    idx_tup_fetch as so_rows_tra_ve
FROM pg_stat_user_indexes
WHERE tablename IN ('DonhangPriceAudit', 'BanggiasanphamHistory')
ORDER BY idx_scan DESC;

-- 6.2. Table sizes
SELECT 
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS kich_thuoc
FROM pg_tables
WHERE tablename IN ('DonhangPriceAudit', 'BanggiasanphamHistory')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- 6.3. Vacuum and analyze (Maintenance)
-- VACUUM ANALYZE "DonhangPriceAudit";
-- VACUUM ANALYZE "BanggiasanphamHistory";

-- =============================================================================
-- END OF FILE
-- =============================================================================
