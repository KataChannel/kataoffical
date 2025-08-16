"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertData = convertData;
exports.removeVietnameseAccents = removeVietnameseAccents;
exports.DonhangcodeToNumber = DonhangcodeToNumber;
exports.DonhangnumberToCode = DonhangnumberToCode;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const Donhangs = await prisma.donhangsanpham.findMany();
    for (const donhang of Donhangs) {
        try {
            await prisma.donhangsanpham.update({
                where: {
                    id: donhang.id
                },
                data: {
                    sldat: donhang.slgiao
                }
            });
        }
        catch (error) {
            console.error(`Lỗi khi xử lý đơn hàng ${donhang.idSP}:`, error);
        }
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
function DonhangcodeToNumber(code) {
    if (!code.match(/^TG-[A-Z]{2}\d{5}$/)) {
        throw new Error("Mã không đúng định dạng TG-XXYYYYY");
    }
    const letters = code.slice(3, 5);
    const number = parseInt(code.slice(5), 10);
    const letterValue = (letters.charCodeAt(0) - 65) * 26 + (letters.charCodeAt(1) - 65);
    return letterValue * 99999 + (number - 1) + 1;
}
function DonhangnumberToCode(number) {
    if (number < 1 || number > 676 * 99999) {
        throw new Error("Số thứ tự không hợp lệ");
    }
    number -= 1;
    const letterValue = Math.floor(number / 99999);
    const numValue = (number % 99999) + 1;
    const firstLetter = String.fromCharCode(65 + Math.floor(letterValue / 26));
    const secondLetter = String.fromCharCode(65 + (letterValue % 26));
    const numStr = numValue.toString().padStart(5, '0');
    return `TG-${firstLetter}${secondLetter}${numStr}`;
}
//# sourceMappingURL=updatesldatdonhang.js.map