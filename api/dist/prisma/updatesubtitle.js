"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertData = convertData;
exports.removeVietnameseAccents = removeVietnameseAccents;
exports.toSnakeCase = toSnakeCase;
exports.toKebabCase = toKebabCase;
const client_1 = require("@prisma/client");
const dulieu_1 = require("./migrations/dulieu");
const prisma = new client_1.PrismaClient();
const dulieus = dulieu_1.bangiakhachahng;
async function main() {
    const customers = await prisma.khachhang.findMany({
        select: { id: true, name: true },
    });
    for (const customer of customers) {
        await prisma.khachhang.update({
            where: { id: customer.id },
            data: {
                subtitle: removeVietnameseAccents(customer.name),
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
function toSnakeCase(text) {
    return removeVietnameseAccents(text)
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/\W+/g, "_")
        .toLowerCase();
}
function toKebabCase(text) {
    return removeVietnameseAccents(text)
        .replace(/\s+/g, "-")
        .toLowerCase();
}
//# sourceMappingURL=updatesubtitle.js.map