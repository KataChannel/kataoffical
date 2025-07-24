-- Insert menu items for Inventory Management System
-- Based on the Menu table schema and existing routes

-- First, insert the main Inventory Management parent menu
INSERT INTO "Menu" (
    id, 
    title, 
    icon, 
    slug, 
    "parentId", 
    "order", 
    "isActive", 
    "createdAt", 
    "updatedAt"
) VALUES (
    'inventory-parent-menu-id',
    'Quản lý tồn kho',
    'inventory_2',
    '/admin/inventory',
    NULL,
    50,
    true,
    NOW(),
    NOW()
);

-- Insert Current Inventory Overview submenu
INSERT INTO "Menu" (
    id, 
    title, 
    icon, 
    slug, 
    "parentId", 
    "order", 
    "isActive", 
    "createdAt", 
    "updatedAt"
) VALUES (
    'current-inventory-menu-id',
    'Tồn kho hiện tại',
    'warehouse',
    '/admin/ton-kho-hien-tai',
    'inventory-parent-menu-id',
    1,
    true,
    NOW(),
    NOW()
);

-- Insert Inventory History submenu
INSERT INTO "Menu" (
    id, 
    title, 
    icon, 
    slug, 
    "parentId", 
    "order", 
    "isActive", 
    "createdAt", 
    "updatedAt"
) VALUES (
    'inventory-history-menu-id',
    'Lịch sử tồn kho',
    'history',
    '/admin/lichsu-tonkho',
    'inventory-parent-menu-id',
    2,
    true,
    NOW(),
    NOW()
);

-- Insert Inventory Closing submenu
INSERT INTO "Menu" (
    id, 
    title, 
    icon, 
    slug, 
    "parentId", 
    "order", 
    "isActive", 
    "createdAt", 
    "updatedAt"
) VALUES (
    'inventory-closing-menu-id',
    'Chốt kho',
    'task_alt',
    '/admin/lichsu-tonkho/chot-kho',
    'inventory-parent-menu-id',
    3,
    true,
    NOW(),
    NOW()
);

-- Insert Create New Transaction submenu
INSERT INTO "Menu" (
    id, 
    title, 
    icon, 
    slug, 
    "parentId", 
    "order", 
    "isActive", 
    "createdAt", 
    "updatedAt"
) VALUES (
    'new-transaction-menu-id',
    'Tạo giao dịch mới',
    'add_circle',
    '/admin/lichsu-tonkho/0',
    'inventory-parent-menu-id',
    4,
    true,
    NOW(),
    NOW()
);

-- Note: After running this script, you may need to restart the application
-- for the new menu items to appear in the navigation
