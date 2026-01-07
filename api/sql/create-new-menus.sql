-- Script để tạo Menu và Permission cho các tính năng mới
-- Chạy script này trong database sau mỗi lần sync từ rausachfinal
-- File: api/sql/create-new-menus.sql

-- ============================================================
-- PHẦN 1: TẠO PERMISSIONS (Định nghĩa quyền trước)
-- ============================================================

-- 1.1. Cron Management
INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_CRON_VIEW', 'cron-management.view', 'Hệ thống', 'Xem và quản lý Cron Jobs', 100, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_CRON_EXEC', 'cron-management.execute', 'Hệ thống', 'Kích hoạt Cron Jobs thủ công', 101, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

-- 1.2. Kế Toán - Phiếu Thu Chi
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

-- 1.3. Kế Toán - Thanh toán
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

-- 1.4. Kế Toán - Hóa đơn điện tử
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

-- 1.5. Kế Toán - Báo cáo dòng tiền
INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_CASHFLOW_VIEW', 'cashflow.view', 'Kế toán', 'Xem báo cáo dòng tiền', 62, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_CASHFLOW_EXPORT', 'cashflow.export', 'Kế toán', 'Xuất báo cáo dòng tiền', 63, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

-- 1.6. Kế Toán - Menu Tổng
INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_KETOAN_VIEW', 'ketoan.view', 'Kế toán', 'Xem menu Kế Toán', 49, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

-- 1.7. Kế Toán - Đề xuất thanh toán (AP)
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

-- 1.8. Kế Toán - Chứng từ công nợ (AR)
INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_AR_VIEW', 'ar-document.view', 'Kế toán', 'Xem danh sách chứng từ công nợ', 69, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_AR_CREATE', 'ar-document.create', 'Kế toán', 'Tạo chứng từ công nợ', 70, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_AR_UPDATE', 'ar-document.update', 'Kế toán', 'Cập nhật chứng từ công nợ', 71, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_AR_DELETE', 'ar-document.delete', 'Kế toán', 'Xóa chứng từ công nợ', 72, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Permission" ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'P_AR_APPROVE', 'ar-document.approve', 'Kế toán', 'Phê duyệt chứng từ công nợ', 73, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;


-- ============================================================
-- PHẦN 2: TẠO MENU (Cấu trúc Menu)
-- ============================================================

-- 2.1. Parent Menu "Hệ thống"
INSERT INTO "Menu" ("id", "title", "icon", "slug", "parentId", "order", "isActive", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Hệ thống', 'settings', NULL, NULL, 99, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Menu" WHERE "title" = 'Hệ thống' AND "parentId" IS NULL);

-- 2.2. Submenu "Quản lý Cron Jobs"
INSERT INTO "Menu" ("id", "title", "icon", "slug", "parentId", "order", "isActive", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Quản lý Cron Jobs', 'schedule', '/admin/cron-management',
  (SELECT "id" FROM "Menu" WHERE "title" = 'Hệ thống' AND "parentId" IS NULL LIMIT 1), 1, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Menu" WHERE "slug" = '/admin/cron-management');

-- 2.3. Parent Menu "Kế Toán"
INSERT INTO "Menu" ("id", "title", "icon", "slug", "parentId", "order", "isActive", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Kế Toán', 'account_balance', '/admin/ketoan', NULL, 50, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Menu" WHERE "slug" = '/admin/ketoan');

-- 2.4. Submenu "Đề xuất thanh toán (AP)"
INSERT INTO "Menu" ("id", "title", "icon", "slug", "parentId", "order", "isActive", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Đề xuất thanh toán (AP)', 'assignment_turned_in', '/admin/payment-proposal',
  (SELECT "id" FROM "Menu" WHERE "slug" = '/admin/ketoan' LIMIT 1), 1, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Menu" WHERE "slug" = '/admin/payment-proposal');

-- 2.5. Submenu "Chứng từ công nợ (AR)"
INSERT INTO "Menu" ("id", "title", "icon", "slug", "parentId", "order", "isActive", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Chứng từ công nợ (AR)', 'assignment_ind', '/admin/ar-document',
  (SELECT "id" FROM "Menu" WHERE "slug" = '/admin/ketoan' LIMIT 1), 2, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Menu" WHERE "slug" = '/admin/ar-document');

-- 2.6. Submenu "Phiếu Thu Chi"
INSERT INTO "Menu" ("id", "title", "icon", "slug", "parentId", "order", "isActive", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Phiếu Thu Chi', 'receipt_long', '/admin/phieuthuchi',
  (SELECT "id" FROM "Menu" WHERE "slug" = '/admin/ketoan' LIMIT 1), 3, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Menu" WHERE "slug" = '/admin/phieuthuchi');

-- 2.7. Submenu "Thanh toán"
INSERT INTO "Menu" ("id", "title", "icon", "slug", "parentId", "order", "isActive", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Thanh toán', 'payments', '/admin/thanhtoan',
  (SELECT "id" FROM "Menu" WHERE "slug" = '/admin/ketoan' LIMIT 1), 4, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Menu" WHERE "slug" = '/admin/thanhtoan');

-- 2.8. Submenu "Hóa đơn điện tử"
INSERT INTO "Menu" ("id", "title", "icon", "slug", "parentId", "order", "isActive", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Hóa đơn điện tử', 'description', '/admin/hoadon',
  (SELECT "id" FROM "Menu" WHERE "slug" = '/admin/ketoan' LIMIT 1), 5, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Menu" WHERE "slug" = '/admin/hoadon');

-- 2.9. Submenu "Báo cáo dòng tiền"
INSERT INTO "Menu" ("id", "title", "icon", "slug", "parentId", "order", "isActive", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Báo cáo dòng tiền', 'trending_up', '/admin/cashflow',
  (SELECT "id" FROM "Menu" WHERE "slug" = '/admin/ketoan' LIMIT 1), 6, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Menu" WHERE "slug" = '/admin/cashflow');


-- ============================================================
-- PHẦN 3: GÁN QUYỀN CHO ROLE ADMIN (FULL ACCESS)
-- ============================================================

INSERT INTO "RolePermission" ("id", "roleId", "permissionId")
SELECT gen_random_uuid(), r."id", p."id"
FROM "Role" r CROSS JOIN "Permission" p
WHERE r."name" = 'Admin' AND (
    p."name" LIKE 'cron-management.%' OR
    p."name" LIKE 'phieuthuchi.%' OR
    p."name" LIKE 'thanhtoan.%' OR
    p."name" LIKE 'hoadon.%' OR
    p."name" LIKE 'cashflow.%' OR
    p."name" = 'ketoan.view' OR
    p."name" LIKE 'payment-proposal.%' OR
    p."name" LIKE 'ar-document.%'
)
AND NOT EXISTS (SELECT 1 FROM "RolePermission" rp WHERE rp."roleId" = r."id" AND rp."permissionId" = p."id");


-- ============================================================
-- KIỂM TRA KẾT QUẢ
-- ============================================================
SELECT '=== Menus ===' as info;
SELECT m."title", m."slug", m."icon", COALESCE(p."title", 'ROOT') as parent 
FROM "Menu" m LEFT JOIN "Menu" p ON m."parentId" = p."id" 
WHERE m."slug" LIKE '/admin/%'
ORDER BY parent DESC, m."order" ASC;

SELECT '=== Permissions Count per Group ===' as info;
SELECT "group", count(*) FROM "Permission" GROUP BY "group";

SELECT '=== Admin Full Permissions ===' as info;
SELECT p."name" as permission_name
FROM "RolePermission" rp
JOIN "Role" r ON rp."roleId" = r."id"
JOIN "Permission" p ON rp."permissionId" = p."id"
WHERE r."name" = 'Admin' AND (p."name" LIKE 'payment-proposal%' OR p."name" LIKE 'ar-document%')
ORDER BY p."name";
