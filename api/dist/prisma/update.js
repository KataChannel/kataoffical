"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertData = convertData;
exports.removeVietnameseAccents = removeVietnameseAccents;
const client_1 = require("@prisma/client");
const dulieu_1 = require("./migrations/dulieu");
const prisma = new client_1.PrismaClient();
const dulieus = dulieu_1.bangiakhachahng;
async function main() {
    const donhangsanphams = await prisma.donhangsanpham.findMany({
        select: { id: true, sldat: true }
    });
    for (const item of donhangsanphams) {
        await prisma.donhangsanpham.update({
            where: { id: item.id },
            data: {
                slgiao: item.sldat,
                slnhan: item.sldat,
            },
        });
    }
}
main()
    .catch((e) => {
    console.error('❌ Lỗi khi seed dữ liệu:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
function convertData(data1) {
    const result = {};
    data1.forEach(item => {
        if (item.banggiaId) {
            if (!result[item.banggiaId]) {
                result[item.banggiaId] = [];
            }
            result[item.banggiaId].push(item.khachhangId);
        }
    });
    return Object.keys(result).map(key => ({
        banggiaId: key,
        khachhangIds: result[key]
    }));
}
function removeVietnameseAccents(text) {
    if (!text) {
        return "";
    }
    return text
        .replace(/đ/g, "d")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();
}
//# sourceMappingURL=update.js.map