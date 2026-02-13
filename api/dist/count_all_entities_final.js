"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function countAll() {
    const [khachhang, nhacungcap, sanpham, donhang, dathang, phieukho, user, nhanvien, phongban] = await Promise.all([
        prisma.khachhang.count(),
        prisma.nhacungcap.count(),
        prisma.sanpham.count(),
        prisma.donhang.count(),
        prisma.dathang.count(),
        prisma.phieuKho.count(),
        prisma.user.count(),
        prisma.nhanvien.count(),
        prisma.phongban.count()
    ]);
    console.log('Customer (Khách Hàng):', khachhang);
    console.log('Supplier (Nhà Cung Cấp):', nhacungcap);
    console.log('Product (Sản Phẩm):', sanpham);
    console.log('Order (Đơn Hàng):', donhang);
    console.log('Purchase Order (Đặt Hàng):', dathang);
    console.log('Inventory Voucher (Phiếu Kho):', phieukho);
    console.log('User:', user);
    console.log('Employee (Nhân Viên):', nhanvien);
    console.log('Department (Phòng Ban):', phongban);
}
countAll()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=count_all_entities_final.js.map