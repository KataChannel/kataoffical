-- Script để tạo Menu và Permission cho Cron Management
-- Chạy script này trong database để tạo menu và permission

-- 1. Tìm parent menu "Hệ thống" hoặc tạo mới nếu chưa có
-- Nếu đã có menu "Hệ thống", lấy id của nó để làm parentId

-- 2. Tạo Permission cho Cron Management
INSERT INTO "Permission"
    ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES
    (
        gen_random_uuid(),
        'P_CRON_VIEW',
        'cron-management.view',
        'Hệ thống',
        'Xem và quản lý Cron Jobs',
        100,
        NOW(),
        NOW()
)
ON CONFLICT
("name") DO NOTHING;

INSERT INTO "Permission"
    ("id", "codeId", "name", "group", "description", "order", "createdAt", "updatedAt")
VALUES
    (
        gen_random_uuid(),
        'P_CRON_EXEC',
        'cron-management.execute',
        'Hệ thống',
        'Kích hoạt Cron Jobs thủ công',
        101,
        NOW(),
        NOW()
)
ON CONFLICT
("name") DO NOTHING;

-- 3. Tạo Menu cho Cron Management
-- Kiểm tra và tạo menu parent "Hệ thống" nếu chưa có
INSERT INTO "Menu"
    ("id", "title", "icon", "slug", "parentId", "order", "isActive", "createdAt", "updatedAt")
SELECT
    gen_random_uuid(),
    'Hệ thống',
    'settings',
    NULL,
    NULL,
    99,
    true,
    NOW(),
    NOW()
WHERE NOT EXISTS (
  SELECT 1
FROM "Menu"
WHERE "title" = 'Hệ thống' AND "parentId" IS NULL
);

-- Tạo menu con "Quản lý Cron Jobs"
INSERT INTO "Menu"
    ("id", "title", "icon", "slug", "parentId", "order", "isActive", "createdAt", "updatedAt")
SELECT
    gen_random_uuid(),
    'Quản lý Cron Jobs',
    'schedule',
    '/admin/cron-management',
    (SELECT "id"
    FROM "Menu"
    WHERE "title" = 'Hệ thống' AND "parentId" IS NULL LIMIT
1),
  1,
  true,
  NOW
(),
  NOW
()
WHERE NOT EXISTS
(
  SELECT 1
FROM "Menu"
WHERE "slug" = '/admin/cron-management'
);

-- 4. Gán permission cho role Admin (nếu có)
-- Lấy permissionId và roleId rồi insert vào RolePermission
INSERT INTO "RolePermission"
    ("id", "roleId", "permissionId")
SELECT
    gen_random_uuid(),
    r."id",
    p."id"
FROM "Role" r
CROSS JOIN "Permission" p
WHERE r."name" = 'Admin'
    AND p."name" IN ('cron-management.view', 'cron-management.execute')
    AND NOT EXISTS (
    SELECT 1
    FROM "RolePermission" rp
    WHERE rp."roleId" = r."id" AND rp."permissionId" = p."id"
  );

-- Kiểm tra kết quả
SELECT 'Permissions created:' as info;
SELECT "id", "name", "group", "description"
FROM "Permission"
WHERE "name" LIKE 'cron-management%';

SELECT 'Menu created:' as info;
SELECT m."id", m."title", m."slug", m."icon", p."title" as parent_title
FROM "Menu" m
    LEFT JOIN "Menu" p ON m."parentId" = p."id"
WHERE m."slug" = '/admin/cron-management' OR m."title" = 'Hệ thống';

SELECT 'Role permissions assigned:' as info;
SELECT r."name" as role_name, p."name" as permission_name
FROM "RolePermission" rp
    JOIN "Role" r ON rp."roleId" = r."id"
    JOIN "Permission" p ON rp."permissionId" = p."id"
WHERE p."name" LIKE 'cron-management%';
