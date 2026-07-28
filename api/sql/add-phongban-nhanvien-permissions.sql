-- Script: Thêm permissions cho Phongban và Nhanvien module
-- Chạy script này trong PostgreSQL để thêm quyền vào database

-- 1. Thêm permissions cho Phongban
INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'phongban.view', 'Xem danh sách phòng ban', NOW(), NOW()),
  (gen_random_uuid(), 'phongban.create', 'Tạo phòng ban mới', NOW(), NOW()),
  (gen_random_uuid(), 'phongban.edit', 'Chỉnh sửa phòng ban', NOW(), NOW()),
  (gen_random_uuid(), 'phongban.delete', 'Xóa phòng ban', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- 2. Thêm permissions cho Nhanvien
INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'nhanvien.view', 'Xem danh sách nhân viên', NOW(), NOW()),
  (gen_random_uuid(), 'nhanvien.create', 'Tạo nhân viên mới', NOW(), NOW()),
  (gen_random_uuid(), 'nhanvien.edit', 'Chỉnh sửa nhân viên', NOW(), NOW()),
  (gen_random_uuid(), 'nhanvien.delete', 'Xóa nhân viên', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- 3. Gán tất cả quyền cho admin user (thay YOUR_USER_ID bằng ID user của bạn)
-- Tìm ID user admin:
-- SELECT id, username, email FROM "User" WHERE username = 'admin' OR email LIKE '%admin%';

-- Sau khi có ID, uncomment và chạy:
/*
DO $$
DECLARE
  admin_user_id TEXT := 'YOUR_USER_ID_HERE'; -- Thay bằng ID thực
  perm_record RECORD;
BEGIN
  FOR perm_record IN 
    SELECT id FROM "Permission" 
    WHERE name LIKE 'phongban.%' OR name LIKE 'nhanvien.%'
  LOOP
    INSERT INTO "UserPermission" (id, "userId", "permissionId", "createdAt", "updatedAt")
    VALUES (gen_random_uuid(), admin_user_id, perm_record.id, NOW(), NOW())
    ON CONFLICT ("userId", "permissionId") DO NOTHING;
  END LOOP;
END $$;
*/

-- 4. Kiểm tra permissions đã được thêm
SELECT id, name, description FROM "Permission" 
WHERE name LIKE 'phongban.%' OR name LIKE 'nhanvien.%'
ORDER BY name;

-- 5. Kiểm tra user permissions (thay YOUR_USER_ID)
/*
SELECT 
  u.username,
  p.name as permission_name,
  p.description
FROM "UserPermission" up
JOIN "User" u ON u.id = up."userId"
JOIN "Permission" p ON p.id = up."permissionId"
WHERE u.id = 'YOUR_USER_ID_HERE'
  AND (p.name LIKE 'phongban.%' OR p.name LIKE 'nhanvien.%')
ORDER BY p.name;
*/
