"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertData = convertData;
exports.removeVietnameseAccents = removeVietnameseAccents;
const client_1 = require("@prisma/client");
const fs = require('fs');
const path = require('path');
const prisma = new client_1.PrismaClient();
async function main() {
    try {
        const dh18Data = JSON.parse(fs.readFileSync(path.join(__dirname, 'dh18.json'), 'utf-8'));
        const dhsp = JSON.parse(fs.readFileSync(path.join(__dirname, 'dhsp.json'), 'utf-8'));
        const dhspMap = new Map(dhsp.map(dh => [dh.donhangId, dh]));
        const updatePromises = [];
        for (const donhangId of dh18Data) {
            const dhspItems = dhsp.filter(item => item.donhangId === donhangId);
            if (dhspItems.length === 0) {
                console.warn(`⚠️ Không tìm thấy donhangsanpham với donhangId: ${donhangId}`);
                continue;
            }
            for (const item of dhspItems) {
                updatePromises.push(prisma.donhangsanpham.update({
                    where: { id: item.id },
                    data: {
                        sldat: item.slgiao,
                        slgiao: item.slgiao,
                        slnhan: item.slnhan,
                    }
                }));
            }
        }
        await prisma.$transaction(updatePromises);
        console.log(`✅ Hoàn thành cập nhật ${updatePromises.length} bản ghi từ dh18.json`);
    }
    catch (error) {
        console.error('❌ Lỗi khi cập nhật dữ liệu:', error);
        throw error;
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