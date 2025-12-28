-- Script thêm Permissions cho Thu Chi & Hóa Đơn
-- Chạy script này trong database để thêm quyền

-- ========================================
-- PHIẾU THU CHI PERMISSIONS
-- ========================================

INSERT INTO "Permission" (id, "codeId", name, "group", description, "order", "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'phieuthuchi.view', 'phieuthuchi.view', 'Phiếu Thu Chi', 'Xem danh sách phiếu thu chi', 1, NOW(), NOW()),
  (gen_random_uuid(), 'phieuthuchi.create', 'phieuthuchi.create', 'Phiếu Thu Chi', 'Tạo phiếu thu chi mới', 2, NOW(), NOW()),
  (gen_random_uuid(), 'phieuthuchi.update', 'phieuthuchi.update', 'Phiếu Thu Chi', 'Cập nhật phiếu thu chi', 3, NOW(), NOW()),
  (gen_random_uuid(), 'phieuthuchi.delete', 'phieuthuchi.delete', 'Phiếu Thu Chi', 'Xóa phiếu thu chi', 4, NOW(), NOW()),
  (gen_random_uuid(), 'phieuthuchi.approve', 'phieuthuchi.approve', 'Phiếu Thu Chi', 'Duyệt phiếu thu chi', 5, NOW(), NOW()),
  (gen_random_uuid(), 'phieuthuchi.cancel', 'phieuthuchi.cancel', 'Phiếu Thu Chi', 'Hủy phiếu thu chi', 6, NOW(), NOW()),
  (gen_random_uuid(), 'phieuthuchi.report', 'phieuthuchi.report', 'Phiếu Thu Chi', 'Xem báo cáo thu chi', 7, NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- ========================================
-- THANH TOÁN PERMISSIONS
-- ========================================

INSERT INTO "Permission" (id, "codeId", name, "group", description, "order", "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'thanhtoan.view', 'thanhtoan.view', 'Thanh toán', 'Xem danh sách thanh toán', 1, NOW(), NOW()),
  (gen_random_uuid(), 'thanhtoan.create', 'thanhtoan.create', 'Thanh toán', 'Tạo thanh toán mới', 2, NOW(), NOW()),
  (gen_random_uuid(), 'thanhtoan.update', 'thanhtoan.update', 'Thanh toán', 'Cập nhật thanh toán', 3, NOW(), NOW()),
  (gen_random_uuid(), 'thanhtoan.delete', 'thanhtoan.delete', 'Thanh toán', 'Xóa thanh toán', 4, NOW(), NOW()),
  (gen_random_uuid(), 'thanhtoan.report', 'thanhtoan.report', 'Thanh toán', 'Xem báo cáo thanh toán', 5, NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- ========================================
-- HÓA ĐƠN ĐIỆN TỬ PERMISSIONS
-- ========================================

INSERT INTO "Permission" (id, "codeId", name, "group", description, "order", "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'hoadon.view', 'hoadon.view', 'Hóa đơn điện tử', 'Xem danh sách hóa đơn', 1, NOW(), NOW()),
  (gen_random_uuid(), 'hoadon.create', 'hoadon.create', 'Hóa đơn điện tử', 'Tạo hóa đơn mới', 2, NOW(), NOW()),
  (gen_random_uuid(), 'hoadon.update', 'hoadon.update', 'Hóa đơn điện tử', 'Cập nhật hóa đơn', 3, NOW(), NOW()),
  (gen_random_uuid(), 'hoadon.delete', 'hoadon.delete', 'Hóa đơn điện tử', 'Xóa hóa đơn', 4, NOW(), NOW()),
  (gen_random_uuid(), 'hoadon.approve', 'hoadon.approve', 'Hóa đơn điện tử', 'Duyệt hóa đơn (xuất)', 5, NOW(), NOW()),
  (gen_random_uuid(), 'hoadon.cancel', 'hoadon.cancel', 'Hóa đơn điện tử', 'Hủy hóa đơn', 6, NOW(), NOW()),
  (gen_random_uuid(), 'hoadon.export', 'hoadon.export', 'Hóa đơn điện tử', 'Xuất PDF hóa đơn', 7, NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- ========================================
-- GÁN QUYỀN CHO ROLE ADMIN
-- (Thay 'ADMIN_ROLE_ID' bằng ID thực tế của role Admin)
-- ========================================

-- Lấy Admin role ID
DO $$
DECLARE 
  admin_role_id UUID;
  perm_id UUID;
BEGIN
  -- Tìm role Admin
  SELECT id INTO admin_role_id FROM "Role" WHERE name = 'Admin' LIMIT 1;
  
  IF admin_role_id IS NOT NULL THEN
    -- Gán tất cả permissions Thu Chi cho Admin
    FOR perm_id IN 
      SELECT id FROM "Permission" WHERE "group" IN ('Phiếu Thu Chi', 'Thanh toán', 'Hóa đơn điện tử')
    LOOP
      INSERT INTO "RolePermission" (id, "roleId", "permissionId")
      VALUES (gen_random_uuid(), admin_role_id, perm_id)
      ON CONFLICT DO NOTHING;
    END LOOP;
    
    RAISE NOTICE 'Đã gán quyền Thu Chi & Hóa Đơn cho role Admin';
  ELSE
    RAISE NOTICE 'Không tìm thấy role Admin';
  END IF;
END $$;

-- Kiểm tra kết quả
SELECT 
  p.name,
  p."group",
  p.description
FROM "Permission" p
WHERE p."group" IN ('Phiếu Thu Chi', 'Thanh toán', 'Hóa đơn điện tử')
ORDER BY p."group", p."order";
