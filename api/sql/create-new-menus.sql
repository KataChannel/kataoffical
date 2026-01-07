-- Script để tạo Menu và Permission cho các tính năng mới
-- Chạy script này trong database sau mỗi lần sync từ rausachfinal
-- File: api/sql/create-new-menus.sql

-- ============================================================
-- PHẦN 1: CRON MANAGEMENT
-- ============================================================

-- 1. Tạo Permission cho Cron Management
INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_CRON_VIEW', 'cron-management.view', 'Hệ thống', 'Xem và quản lý Cron Jobs', 100, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_CRON_EXEC', 'cron-management.execute', 'Hệ thống', 'Kích hoạt Cron Jobs thủ công', 101, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

-- 2. Tạo Menu parent "Hệ thống" nếu chưa có
INSERT INTO "Menu" ("id", "title", "icon", "slug", "parentId", "order", "isActive", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Hệ thống', 'settings', NULL, NULL, 99, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Menu" WHERE "title" = 'Hệ thống' AND "parentId" IS NULL);

-- 3. Tạo menu con "Quản lý Cron Jobs"
INSERT INTO "Menu" ("id", "title", "icon", "slug", "parentId", "order", "isActive", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Quản lý Cron Jobs', 'schedule', '/admin/cron-management',
  (SELECT "id" FROM "Menu" WHERE "title" = 'Hệ thống' AND "parentId" IS NULL LIMIT 1), 1, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Menu" WHERE "slug" = '/admin/cron-management');

-- 4. Gán permission cho role Admin (Cron)
INSERT INTO "RolePermission" ("id", "roleId", "permissionId")
SELECT gen_random_uuid(), r."id", p."id"
FROM "Role" r CROSS JOIN "Permission" p
WHERE r."name" = 'Admin' AND p."name" IN ('cron-management.view', 'cron-management.execute')
  AND NOT EXISTS (SELECT 1 FROM "RolePermission" rp WHERE rp."roleId" = r."id" AND rp."permissionId" = p."id");

-- ============================================================
-- PHẦN 2: KẾ TOÁN (Thu Chi, Thanh toán, Hóa đơn, Báo cáo)
-- ============================================================

-- 1. Tạo Permission cho Phiếu Thu Chi
INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_THUCHI_VIEW', 'phieuthuchi.view', 'Kế toán', 'Xem danh sách phiếu thu chi', 50, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_THUCHI_CREATE', 'phieuthuchi.create', 'Kế toán', 'Tạo phiếu thu chi', 51, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_THUCHI_UPDATE', 'phieuthuchi.update', 'Kế toán', 'Cập nhật phiếu thu chi', 52, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_THUCHI_DELETE', 'phieuthuchi.delete', 'Kế toán', 'Xóa phiếu thu chi', 53, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

-- 2. Tạo Permission cho Thanh toán
INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_THANHTOAN_VIEW', 'thanhtoan.view', 'Kế toán', 'Xem danh sách thanh toán', 54, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_THANHTOAN_CREATE', 'thanhtoan.create', 'Kế toán', 'Tạo thanh toán', 55, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_THANHTOAN_UPDATE', 'thanhtoan.update', 'Kế toán', 'Cập nhật thanh toán', 56, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_THANHTOAN_DELETE', 'thanhtoan.delete', 'Kế toán', 'Xóa thanh toán', 57, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

-- 3. Tạo Permission cho Hóa đơn điện tử
INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_HOADON_VIEW', 'hoadon.view', 'Kế toán', 'Xem danh sách hóa đơn', 58, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_HOADON_CREATE', 'hoadon.create', 'Kế toán', 'Tạo hóa đơn', 59, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_HOADON_UPDATE', 'hoadon.update', 'Kế toán', 'Cập nhật hóa đơn', 60, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_HOADON_DELETE', 'hoadon.delete', 'Kế toán', 'Xóa hóa đơn', 61, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

-- 4. Tạo Permission cho Báo cáo dòng tiền
INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_CASHFLOW_VIEW', 'cashflow.view', 'Kế toán', 'Xem báo cáo dòng tiền', 62, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_CASHFLOW_EXPORT', 'cashflow.export', 'Kế toán', 'Xuất báo cáo dòng tiền', 63, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

-- 5. Tạo Permission cho menu cha Kế Toán
INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_KETOAN_VIEW', 'ketoan.view', 'Kế toán', 'Xem menu Kế Toán', 49, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

-- 6. Tạo Menu parent "Kế Toán" nếu chưa có
INSERT INTO "Menu" ("id", "title", "icon", "slug", "parentId", "order", "isActive", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Kế Toán', 'account_balance', '/admin/ketoan', NULL, 50, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Menu" WHERE "slug" = '/admin/ketoan');

-- 7. Tạo menu "Phiếu Thu Chi"
INSERT INTO "Menu" ("id", "title", "icon", "slug", "parentId", "order", "isActive", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Phiếu Thu Chi', 'receipt_long', '/admin/phieuthuchi',
  (SELECT "id" FROM "Menu" WHERE "slug" = '/admin/ketoan' LIMIT 1), 1, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Menu" WHERE "slug" = '/admin/phieuthuchi');

-- 8. Tạo menu "Thanh toán"
INSERT INTO "Menu" ("id", "title", "icon", "slug", "parentId", "order", "isActive", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Thanh toán', 'payments', '/admin/thanhtoan',
  (SELECT "id" FROM "Menu" WHERE "slug" = '/admin/ketoan' LIMIT 1), 2, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Menu" WHERE "slug" = '/admin/thanhtoan');

-- 9. Tạo menu "Hóa đơn điện tử"
INSERT INTO "Menu" ("id", "title", "icon", "slug", "parentId", "order", "isActive", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Hóa đơn điện tử', 'description', '/admin/hoadon',
  (SELECT "id" FROM "Menu" WHERE "slug" = '/admin/ketoan' LIMIT 1), 3, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Menu" WHERE "slug" = '/admin/hoadon');

-- 10. Tạo menu "Báo cáo dòng tiền"
INSERT INTO "Menu" ("id", "title", "icon", "slug", "parentId", "order", "isActive", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Báo cáo dòng tiền', 'trending_up', '/admin/cashflow',
  (SELECT "id" FROM "Menu" WHERE "slug" = '/admin/ketoan' LIMIT 1), 4, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Menu" WHERE "slug" = '/admin/cashflow');

-- 11. Gán permission cho role Admin (Kế Toán)
INSERT INTO "RolePermission" ("id", "roleId", "permissionId")
SELECT gen_random_uuid(), r."id", p."id"
FROM "Role" r CROSS JOIN "Permission" p
WHERE r."name" = 'Admin' AND p."name" IN (
  'ketoan.view',
  'phieuthuchi.view', 'phieuthuchi.create', 'phieuthuchi.update', 'phieuthuchi.delete',
  'thanhtoan.view', 'thanhtoan.create', 'thanhtoan.update', 'thanhtoan.delete',
  'hoadon.view', 'hoadon.create', 'hoadon.update', 'hoadon.delete',
  'cashflow.view', 'cashflow.export',
  'payment-proposal.view', 'payment-proposal.create', 'payment-proposal.update', 'payment-proposal.delete', 'payment-proposal.approve'
)
AND NOT EXISTS (SELECT 1 FROM "RolePermission" rp WHERE rp."roleId" = r."id" AND rp."permissionId" = p."id");

-- 12. Tạo Permission cho Đề xuất thanh toán
INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_PP_VIEW', 'payment-proposal.view', 'Kế toán', 'Xem danh sách đề xuất thanh toán', 64, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_PP_CREATE', 'payment-proposal.create', 'Kế toán', 'Tạo đề xuất thanh toán', 65, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_PP_UPDATE', 'payment-proposal.update', 'Kế toán', 'Cập nhật đề xuất thanh toán', 66, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_PP_DELETE', 'payment-proposal.delete', 'Kế toán', 'Xóa đề xuất thanh toán', 67, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_PP_APPROVE', 'payment-proposal.approve', 'Kế toán', 'Phê duyệt đề xuất thanh toán', 68, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

-- 13. Tạo menu "Đề xuất thanh toán"
INSERT INTO "Menu" ("id", "title", "icon", "slug", "parentId", "order", "isActive", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Đề xuất thanh toán', 'assignment_turned_in', '/admin/payment-proposal',
  (SELECT "id" FROM "Menu" WHERE "slug" = '/admin/ketoan' LIMIT 1), 0, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Menu" WHERE "slug" = '/admin/payment-proposal');

-- ============================================================
-- KIỂM TRA KẾT QUẢ
-- ============================================================
SELECT '=== Menus Kế Toán ===' as info;
SELECT m."title", m."slug", m."icon", COALESCE(p."title", 'ROOT') as parent 
FROM "Menu" m LEFT JOIN "Menu" p ON m."parentId" = p."id" 
WHERE m."slug" IN ('/admin/ketoan', '/admin/phieuthuchi', '/admin/thanhtoan', '/admin/hoadon', '/admin/cashflow', '/admin/cron-management', '/admin/payment-proposal')
   OR m."title" IN ('Kế Toán', 'Hệ thống')
ORDER BY m."order";

SELECT '=== Permissions Kế Toán ===' as info;
SELECT "name", "group" FROM "Permission" 
WHERE "name" LIKE 'phieuthuchi%' OR "name" LIKE 'thanhtoan%' OR "name" LIKE 'hoadon%' 
   OR "name" LIKE 'cashflow%' OR "name" LIKE 'ketoan%' OR "name" LIKE 'cron-management%' 
   OR "name" LIKE 'payment-proposal%'
ORDER BY "group", "name";

SELECT '=== Admin Permissions ===' as info;
SELECT r."name" as role_name, p."name" as permission_name
FROM "RolePermission" rp
JOIN "Role" r ON rp."roleId" = r."id"
JOIN "Permission" p ON rp."permissionId" = p."id"
WHERE p."name" LIKE 'phieuthuchi%' OR p."name" LIKE 'thanhtoan%' OR p."name" LIKE 'hoadon%' 
   OR p."name" LIKE 'cashflow%' OR p."name" LIKE 'ketoan%' OR p."name" LIKE 'cron-management%'
   OR p."name" LIKE 'payment-proposal%'
ORDER BY p."name";
