-- Script thêm Menu items cho Thu Chi & Hóa Đơn
-- Chạy với: PGPASSWORD=xxx psql -h host -p port -U user -d db -f sql/add-thuci-menu-items.sql

-- 1. Tạo menu cha: Tài chính
INSERT INTO "Menu"
    (id, title, icon, slug, "parentId", "order", "isActive", "createdAt", "updatedAt")
VALUES
    (
        gen_random_uuid(),
        'Tài chính',
        'bi bi-cash-stack',
        '/admin/taichinh',
        NULL,
        100,
        true,
        NOW(),
        NOW()
)
ON CONFLICT DO NOTHING;

-- 2. Thêm menu con: Phiếu Thu Chi
INSERT INTO "Menu"
    (id, title, icon, slug, "parentId", "order", "isActive", "createdAt", "updatedAt")
VALUES
    (
        gen_random_uuid(),
        'Phiếu Thu Chi',
        'bi bi-receipt',
        '/admin/phieuthuchi',
        (SELECT id FROM "Menu" WHERE title = 'Tài chính' LIMIT 1),
        1,
        true,
        NOW(),
        NOW()
);

-- 3. Thêm menu con: Thanh toán
INSERT INTO "Menu"
    (id, title, icon, slug, "parentId", "order", "isActive", "createdAt", "updatedAt")
VALUES
    (
        gen_random_uuid(),
        'Thanh toán',
        'bi bi-credit-card',
        '/admin/thanhtoan',
        (SELECT id FROM "Menu" WHERE title = 'Tài chính' LIMIT 1),
        2,
        true,
        NOW(),
        NOW()
);

-- 4. Thêm menu con: Hóa đơn điện tử
INSERT INTO "Menu"
    (id, title, icon, slug, "parentId", "order", "isActive", "createdAt", "updatedAt")
VALUES
    (
        gen_random_uuid(),
        'Hóa đơn điện tử',
        'bi bi-file-earmark-text',
        '/admin/hoadon',
        (SELECT id FROM "Menu" WHERE title = 'Tài chính' LIMIT 1),
        3,
        true,
        NOW(),
        NOW()
);

-- 5. Thêm menu con: Báo cáo dòng tiền
INSERT INTO "Menu"
    (id, title, icon, slug, "parentId", "order", "isActive", "createdAt", "updatedAt")
VALUES
    (
        gen_random_uuid(),
        'Báo cáo dòng tiền',
        'bi bi-graph-up',
        '/admin/reports/cash-flow',
        (SELECT id FROM "Menu" WHERE title = 'Tài chính' LIMIT 1),
        4,
        true,
        NOW(),
        NOW()
);

-- Kiểm tra kết quả
SELECT 
    m.id,
    m.title,
    m.icon,
    m.slug,
    COALESCE(p.title, 'ROOT') as parent
FROM "Menu" m
LEFT JOIN "Menu" p ON m."parentId" = p.id
WHERE m.title IN ('Tài chính', 'Phiếu Thu Chi', 'Thanh toán', 'Hóa đơn điện tử', 'Báo cáo dòng tiền')
ORDER BY m."order";
