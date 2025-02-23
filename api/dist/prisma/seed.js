"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.menu.createMany({
        data: [
            {
                "id": "af1e7c0b-5886-4a1d-b7fd-e6ff457b4248",
                "title": "Sản Phẩm",
                "icon": null,
                "slug": "/admin/sanpham",
                "parentId": null,
                "order": 1,
                "isActive": true,
                "createdAt": "2025-02-22T17:51:53.358Z",
                "updatedAt": "2025-02-22T19:33:46.417Z"
            },
            {
                "id": "73f27006-bcf4-4de0-a9dd-fd8caa2caf83",
                "title": "Bảng Giá",
                "icon": null,
                "slug": "/admin/banggia",
                "parentId": null,
                "order": 2,
                "isActive": true,
                "createdAt": "2025-02-22T18:13:16.660Z",
                "updatedAt": "2025-02-22T19:33:46.417Z"
            },
            {
                "id": "360f9354-e14d-4d95-b850-c9339dfd1520",
                "title": "Khách Hàng",
                "icon": null,
                "slug": "/admin/khachhang",
                "parentId": null,
                "order": 3,
                "isActive": true,
                "createdAt": "2025-02-22T18:13:16.660Z",
                "updatedAt": "2025-02-22T19:33:46.417Z"
            },
            {
                "id": "d6f09514-e2f3-40d6-b0a8-12baa5f18320",
                "title": "Đơn hàng",
                "icon": null,
                "slug": "/admin/donhang",
                "parentId": null,
                "order": 4,
                "isActive": true,
                "createdAt": "2025-02-22T18:07:21.788Z",
                "updatedAt": "2025-02-22T19:33:46.417Z"
            },
            {
                "id": "9868f801-38fd-45e0-a890-ee570684ac79",
                "title": "Nhà Cung Cấp",
                "icon": null,
                "slug": "/admin/nhacungcap",
                "parentId": null,
                "order": 5,
                "isActive": true,
                "createdAt": "2025-02-22T18:13:16.660Z",
                "updatedAt": "2025-02-22T19:33:46.417Z"
            },
            {
                "id": "0b3d3ce0-9222-4962-8771-6fd6fa35f7bc",
                "title": "Đặt hàng",
                "icon": null,
                "slug": "/admin/dathang",
                "parentId": null,
                "order": 6,
                "isActive": true,
                "createdAt": "2025-02-22T18:13:16.660Z",
                "updatedAt": "2025-02-22T19:33:46.417Z"
            },
            {
                "id": "a1674f3a-1dc7-47be-bde1-72a734c5fffe",
                "title": "Vận đơn",
                "icon": null,
                "slug": "/admin/vandon",
                "parentId": null,
                "order": 7,
                "isActive": true,
                "createdAt": "2025-02-22T18:13:16.660Z",
                "updatedAt": "2025-02-22T19:33:46.417Z"
            },
            {
                "id": "6a0eb8f8-ba03-4f31-9504-50d126ed39dc",
                "title": "Xuất Nhập Tồn",
                "icon": null,
                "slug": "/admin/xuatnhapton",
                "parentId": null,
                "order": 8,
                "isActive": true,
                "createdAt": "2025-02-22T18:13:16.660Z",
                "updatedAt": "2025-02-22T19:33:46.417Z"
            },
            {
                "id": "d8019643-a950-4cb2-9b2e-db988d37e663",
                "title": "Quản Lý Kho",
                "icon": null,
                "slug": "/admin/quanlykho",
                "parentId": null,
                "order": 9,
                "isActive": true,
                "createdAt": "2025-02-22T18:13:16.660Z",
                "updatedAt": "2025-02-22T19:34:38.106Z"
            },
            {
                "id": "239a76bd-7d74-4ead-9323-bb16cc1c9460",
                "title": "Menu",
                "icon": null,
                "slug": "/admin/menu",
                "parentId": null,
                "order": 10,
                "isActive": true,
                "createdAt": "2025-02-22T18:15:00.528Z",
                "updatedAt": "2025-02-22T19:34:38.106Z"
            }
        ]
    });
}
main()
    .catch((e) => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map