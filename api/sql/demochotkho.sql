-- Tạo dữ liệu demo cho bảng ChotKho
INSERT INTO "ChotKho" (
    id, "codeId", title, description, status, "ngayChot", 
    "soLuongSanPham", "tongGiaTri", "chenhLech", "order", 
    "createdAt", "updatedAt"
) VALUES 
-- Chốt kho hàng ngày
('ck-demo-001', 'CK-2024-001', 'Chốt kho ngày 25/12/2024', 
 'Kiểm kho hàng ngày - ca sáng', 'completed', 
 '2024-12-25 08:00:00', 150, 2500000, -50000, 1,
 '2024-12-25 07:30:00', '2024-12-25 09:00:00'),

-- Chốt kho định kỳ
('ck-demo-002', 'CK-2024-002', 'Chốt kho tuần 51/2024',
 'Kiểm kho định kỳ hàng tuần - kho chính', 'in_progress',
 '2024-12-22 00:00:00', 850, 15600000, 0, 2,
 '2024-12-22 09:00:00', '2024-12-22 09:30:00'),

-- Chốt kho cuối tháng  
('ck-demo-003', 'CK-2024-003', 'Chốt kho tháng 12/2024',
 'Chốt kho cuối tháng - toàn bộ chi nhánh', 'review',
 '2024-12-31 23:59:59', 2150, 45800000, 150000, 3,
 '2024-12-31 10:00:00', '2024-12-31 11:00:00'),

-- Chốt kho quý
('ck-demo-004', 'CK-2024-004', 'Chốt kho quý IV/2024',
 'Chốt kho cuối quý - kiểm tra toàn diện', 'draft',
 '2024-12-31 23:59:59', 3200, 78500000, 0, 4,
 '2024-12-30 14:00:00', '2024-12-30 14:00:00'),

-- Chốt kho đột xuất
('ck-demo-005', 'CK-2024-005', 'Chốt kho đột xuất - Audit',
 'Kiểm tra đột xuất theo yêu cầu ban giám đốc', 'cancelled',
 '2024-12-20 16:00:00', 500, 8900000, -200000, 5,
 '2024-12-20 15:00:00', '2024-12-20 17:00:00');


 -- Tạo chi tiết chốt kho cho từng sản phẩm
INSERT INTO "ChotKhoSanpham" (
    id, "chotKhoId", "sanphamId", "slHeThong", "slThucTe", 
    "chenhLech", "giaTri", "ghiChu", "nguoiKiem", 
    "createdAt", "updatedAt"
) VALUES
-- Chi tiết cho CK-2024-001
('cksp-001', 'ck-demo-001', 'sp-001', 100, 98, -2, 196000, 'Thiếu 2 sp do hỏng', 'NV001', 
 '2024-12-25 08:30:00', '2024-12-25 08:30:00'),
('cksp-002', 'ck-demo-001', 'sp-002', 50, 52, 2, 104000, 'Thừa 2 sp', 'NV001',
 '2024-12-25 08:35:00', '2024-12-25 08:35:00'),

-- Chi tiết cho CK-2024-002  
('cksp-003', 'ck-demo-002', 'sp-001', 300, 300, 0, 588000, 'Khớp', 'NV002',
 '2024-12-22 10:00:00', '2024-12-22 10:00:00'),
('cksp-004', 'ck-demo-002', 'sp-003', 200, 195, -5, 390000, 'Thiếu 5 sp', 'NV002',
 '2024-12-22 10:15:00', '2024-12-22 10:15:00');