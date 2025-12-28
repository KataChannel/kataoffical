-- ========================================
-- Script thêm Menu items cho Thu Chi & Hóa Đơn
-- ========================================
-- Chạy với: PGPASSWORD=xxx psql -h host -p port -U user -d db -f sql/add-thuchi-menu-items.sql
-- Hoặc: cd api && npm run db:sql sql/add-thuchi-menu-items.sql

DO $$
DECLARE
    parent_id UUID;
    ketoan_parent_id UUID;
BEGIN
    -- ========================================
    -- MENU KẾ TOÁN (Parent)
    -- ========================================
    
    -- Tìm hoặc tạo menu cha "Kế Toán"
    SELECT id INTO ketoan_parent_id FROM "Menu" WHERE slug = '/admin/ketoan' LIMIT 1;
    
    IF ketoan_parent_id IS NULL THEN
        INSERT INTO "Menu" (id, title, icon, slug, "parentId", "order", "isActive", "createdAt", "updatedAt")
        VALUES (gen_random_uuid(), 'Kế Toán', 'account_balance', '/admin/ketoan', NULL, 50, true, NOW(), NOW())
        RETURNING id INTO ketoan_parent_id;
        RAISE NOTICE '✓ Đã tạo menu cha: Kế Toán';
    ELSE
        RAISE NOTICE '→ Menu Kế Toán đã tồn tại';
    END IF;

    -- ========================================
    -- MENU PHIẾU THU CHI
    -- ========================================
    IF NOT EXISTS (SELECT 1 FROM "Menu" WHERE slug = '/admin/phieuthuchi') THEN
        INSERT INTO "Menu" (id, title, icon, slug, "parentId", "order", "isActive", "createdAt", "updatedAt")
        VALUES (gen_random_uuid(), 'Phiếu Thu Chi', 'receipt_long', '/admin/phieuthuchi', ketoan_parent_id, 1, true, NOW(), NOW());
        RAISE NOTICE '✓ Đã tạo menu: Phiếu Thu Chi';
    ELSE
        RAISE NOTICE '→ Menu Phiếu Thu Chi đã tồn tại';
    END IF;

    -- ========================================
    -- MENU THANH TOÁN
    -- ========================================
    IF NOT EXISTS (SELECT 1 FROM "Menu" WHERE slug = '/admin/thanhtoan') THEN
        INSERT INTO "Menu" (id, title, icon, slug, "parentId", "order", "isActive", "createdAt", "updatedAt")
        VALUES (gen_random_uuid(), 'Thanh toán', 'payments', '/admin/thanhtoan', ketoan_parent_id, 2, true, NOW(), NOW());
        RAISE NOTICE '✓ Đã tạo menu: Thanh toán';
    ELSE
        RAISE NOTICE '→ Menu Thanh toán đã tồn tại';
    END IF;

    -- ========================================
    -- MENU HÓA ĐƠN ĐIỆN TỬ
    -- ========================================
    IF NOT EXISTS (SELECT 1 FROM "Menu" WHERE slug = '/admin/hoadon') THEN
        INSERT INTO "Menu" (id, title, icon, slug, "parentId", "order", "isActive", "createdAt", "updatedAt")
        VALUES (gen_random_uuid(), 'Hóa đơn điện tử', 'description', '/admin/hoadon', ketoan_parent_id, 3, true, NOW(), NOW());
        RAISE NOTICE '✓ Đã tạo menu: Hóa đơn điện tử';
    ELSE
        RAISE NOTICE '→ Menu Hóa đơn điện tử đã tồn tại';
    END IF;

    -- ========================================
    -- MENU BÁO CÁO DÒNG TIỀN
    -- ========================================
    IF NOT EXISTS (SELECT 1 FROM "Menu" WHERE slug = '/admin/cashflow') THEN
        INSERT INTO "Menu" (id, title, icon, slug, "parentId", "order", "isActive", "createdAt", "updatedAt")
        VALUES (gen_random_uuid(), 'Báo cáo dòng tiền', 'trending_up', '/admin/cashflow', ketoan_parent_id, 4, true, NOW(), NOW());
        RAISE NOTICE '✓ Đã tạo menu: Báo cáo dòng tiền';
    ELSE
        RAISE NOTICE '→ Menu Báo cáo dòng tiền đã tồn tại';
    END IF;

    RAISE NOTICE '';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'HOÀN THÀNH TẠO MENU THU CHI & HÓA ĐƠN';
    RAISE NOTICE '========================================';
END $$;

-- ========================================
-- TẠO PERMISSIONS
-- ========================================

-- Phiếu Thu Chi permissions
INSERT INTO "Permission" (id, "codeId", name, "group", description, "order", "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'phieuthuchi.view', 'phieuthuchi.view', 'Phiếu Thu Chi', 'Xem danh sách phiếu thu chi', 1, NOW(), NOW()),
  (gen_random_uuid(), 'phieuthuchi.create', 'phieuthuchi.create', 'Phiếu Thu Chi', 'Tạo phiếu thu chi mới', 2, NOW(), NOW()),
  (gen_random_uuid(), 'phieuthuchi.update', 'phieuthuchi.update', 'Phiếu Thu Chi', 'Cập nhật phiếu thu chi', 3, NOW(), NOW()),
  (gen_random_uuid(), 'phieuthuchi.delete', 'phieuthuchi.delete', 'Phiếu Thu Chi', 'Xóa phiếu thu chi', 4, NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Thanh toán permissions
INSERT INTO "Permission" (id, "codeId", name, "group", description, "order", "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'thanhtoan.view', 'thanhtoan.view', 'Thanh toán', 'Xem danh sách thanh toán', 1, NOW(), NOW()),
  (gen_random_uuid(), 'thanhtoan.create', 'thanhtoan.create', 'Thanh toán', 'Tạo thanh toán mới', 2, NOW(), NOW()),
  (gen_random_uuid(), 'thanhtoan.update', 'thanhtoan.update', 'Thanh toán', 'Cập nhật thanh toán', 3, NOW(), NOW()),
  (gen_random_uuid(), 'thanhtoan.delete', 'thanhtoan.delete', 'Thanh toán', 'Xóa thanh toán', 4, NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Hóa đơn điện tử permissions
INSERT INTO "Permission" (id, "codeId", name, "group", description, "order", "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'hoadon.view', 'hoadon.view', 'Hóa đơn điện tử', 'Xem danh sách hóa đơn', 1, NOW(), NOW()),
  (gen_random_uuid(), 'hoadon.create', 'hoadon.create', 'Hóa đơn điện tử', 'Tạo hóa đơn mới', 2, NOW(), NOW()),
  (gen_random_uuid(), 'hoadon.update', 'hoadon.update', 'Hóa đơn điện tử', 'Cập nhật hóa đơn', 3, NOW(), NOW()),
  (gen_random_uuid(), 'hoadon.delete', 'hoadon.delete', 'Hóa đơn điện tử', 'Xóa hóa đơn', 4, NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Báo cáo dòng tiền permissions
INSERT INTO "Permission" (id, "codeId", name, "group", description, "order", "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'cashflow.view', 'cashflow.view', 'Báo cáo dòng tiền', 'Xem báo cáo dòng tiền', 1, NOW(), NOW()),
  (gen_random_uuid(), 'cashflow.export', 'cashflow.export', 'Báo cáo dòng tiền', 'Xuất báo cáo dòng tiền', 2, NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Kế toán (menu cha) permissions
INSERT INTO "Permission" (id, "codeId", name, "group", description, "order", "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'ketoan.view', 'ketoan.view', 'Kế Toán', 'Xem menu Kế Toán', 1, NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- ========================================
-- GÁN QUYỀN CHO ADMIN ROLE
-- ========================================

DO $$
DECLARE 
  admin_role_id UUID;
  perm_id UUID;
  count_added INT := 0;
BEGIN
  SELECT id INTO admin_role_id FROM "Role" WHERE name = 'Admin' LIMIT 1;
  
  IF admin_role_id IS NOT NULL THEN
    FOR perm_id IN 
      SELECT id FROM "Permission" 
      WHERE "group" IN ('Phiếu Thu Chi', 'Thanh toán', 'Hóa đơn điện tử', 'Báo cáo dòng tiền', 'Kế Toán')
    LOOP
      INSERT INTO "RolePermission" (id, "roleId", "permissionId")
      VALUES (gen_random_uuid(), admin_role_id, perm_id)
      ON CONFLICT DO NOTHING;
      count_added := count_added + 1;
    END LOOP;
    
    RAISE NOTICE '✓ Đã gán % quyền cho role Admin', count_added;
  ELSE
    RAISE NOTICE '✗ Không tìm thấy role Admin';
  END IF;
END $$;

-- ========================================
-- KIỂM TRA KẾT QUẢ
-- ========================================
SELECT 
    m.id,
    m.title,
    m.icon,
    m.slug,
    m."order",
    COALESCE(p.title, '(ROOT)') as parent,
    m."isActive"
FROM "Menu" m
LEFT JOIN "Menu" p ON m."parentId" = p.id
WHERE m.slug IN (
    '/admin/ketoan',
    '/admin/phieuthuchi', 
    '/admin/thanhtoan', 
    '/admin/hoadon', 
    '/admin/cashflow'
)
ORDER BY p.title NULLS FIRST, m."order";

-- Kiểm tra permissions
SELECT name, "group", description FROM "Permission"
WHERE "group" IN ('Phiếu Thu Chi', 'Thanh toán', 'Hóa đơn điện tử', 'Báo cáo dòng tiền', 'Kế Toán')
ORDER BY "group", "order";
