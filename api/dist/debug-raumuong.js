"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const sp = await prisma.sanpham.findFirst({
        where: { masp: 'I100185' },
        include: {
            TonKho: true,
            Donhangsanpham: {
                include: { donhang: true }
            },
            Dathangsanpham: {
                include: { dathang: true }
            }
        }
    });
    if (!sp) {
        console.log("Sanpham not found");
        return;
    }
    console.log("Sanpham:", sp.title, sp.masp);
    console.log("TonKho:", JSON.stringify(sp.TonKho, null, 2));
    console.log("--- Donhangsanpham ---");
    sp.Donhangsanpham.forEach(dhs => {
        console.log(`DH: ${dhs.donhang.madonhang}, Status: ${dhs.donhang.status}, slgiao: ${dhs.slgiao}`);
    });
    console.log("--- Dathangsanpham ---");
    sp.Dathangsanpham.forEach(dts => {
        console.log(`DT: ${dts.dathang.madncc}, Status: ${dts.dathang.status}, slgiao: ${dts.slgiao}`);
    });
}
main().catch(console.error).finally(() => prisma.$disconnect());
//# sourceMappingURL=debug-raumuong.js.map