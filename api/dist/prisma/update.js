"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertData = convertData;
exports.removeVietnameseAccents = removeVietnameseAccents;
const client_1 = require("@prisma/client");
const dulieu_1 = require("./migrations/dulieu");
const prisma = new client_1.PrismaClient();
const dulieus = dulieu_1.bangiakhachahng;
async function main() {
    const khachangs = await prisma.khachhang.findMany({
        select: { id: true, makh: true },
    });
    const banggias = await prisma.banggia.findMany({
        select: { id: true, mabanggia: true, title: true },
    });
    console.log(dulieus);
    const newData = dulieus.map((dulieu) => {
        const makh = dulieu.makh;
        const mabanggia = dulieu.mabanggia;
        const khachhangId = khachangs.find((khachang) => khachang.makh === makh)?.id;
        const banggiaId = banggias.find((banggia) => banggia.mabanggia === mabanggia)?.id;
        return { khachhangId, banggiaId, makh, mabanggia };
    });
    console.log(newData);
    const dataxulys = convertData(newData);
    console.log(convertData(newData));
    console.log(dataxulys[1].kh.map(id => ({ id })));
    for (const dataxuly of dataxulys) {
        const banggiaId = dataxuly.bg;
        const khachhangIds = dataxuly.kh;
        return await prisma.banggia.update({
            where: { id: banggiaId },
            data: {
                khachhang: {
                    connect: khachhangIds.map(id => ({ id })),
                },
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
        bg: key,
        kh: result[key]
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