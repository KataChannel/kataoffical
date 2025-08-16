"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDonhangTotals = calculateDonhangTotals;
exports.updateSpecificDonhangs = updateSpecificDonhangs;
exports.convertData = convertData;
exports.removeVietnameseAccents = removeVietnameseAccents;
exports.DonhangcodeToNumber = DonhangcodeToNumber;
exports.DonhangnumberToCode = DonhangnumberToCode;
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🚀 Bắt đầu cập nhật tongvat và tongtien cho tất cả đơn hàng...');
    const donhangs = await prisma.donhang.findMany({
        include: {
            sanpham: {
                select: {
                    id: true,
                    giaban: true,
                    slnhan: true,
                }
            }
        }
    });
    console.log(`📦 Tìm thấy ${donhangs.length} đơn hàng để xử lý`);
    let processedCount = 0;
    let errorCount = 0;
    for (const donhang of donhangs) {
        try {
            console.log(`\n📋 Xử lý đơn hàng: ${donhang.madonhang}`);
            const tong = donhang.sanpham.reduce((total, sp) => {
                const giaban = sp.giaban || new library_1.Decimal(0);
                const slnhan = sp.slnhan || new library_1.Decimal(0);
                const subtotal = giaban.mul(slnhan);
                return total.add(subtotal);
            }, new library_1.Decimal(0));
            const vatRate = donhang.vat || new library_1.Decimal(0.05);
            const tongvat = tong.mul(vatRate);
            const tongtien = tong.add(tongvat);
            console.log(`   💰 Tổng tiền gốc: ${tong.toString()}`);
            console.log(`   📊 VAT rate: ${vatRate.toString()} (${vatRate.mul(100).toString()}%)`);
            console.log(`   💸 Tổng VAT: ${tongvat.toString()}`);
            console.log(`   🎯 Tổng tiền cuối: ${tongtien.toString()}`);
            await prisma.donhang.update({
                where: { id: donhang.id },
                data: {
                    tongvat: tongvat,
                    tongtien: tongtien
                }
            });
            processedCount++;
            console.log(`   ✅ Đã cập nhật thành công đơn hàng ${donhang.madonhang}`);
        }
        catch (error) {
            errorCount++;
            console.error(`   ❌ Lỗi khi xử lý đơn hàng ${donhang.madonhang}:`, error);
        }
    }
    console.log(`\n🎉 Hoàn thành cập nhật:`);
    console.log(`   ✅ Đã xử lý thành công: ${processedCount} đơn hàng`);
    console.log(`   ❌ Lỗi: ${errorCount} đơn hàng`);
    console.log(`   📊 Tổng cộng: ${donhangs.length} đơn hàng`);
}
async function calculateDonhangTotals(donhangId) {
    try {
        const donhang = await prisma.donhang.findUnique({
            where: { id: donhangId },
            include: {
                sanpham: {
                    select: {
                        id: true,
                        giaban: true,
                        slnhan: true,
                    }
                }
            }
        });
        if (!donhang) {
            throw new Error(`Không tìm thấy đơn hàng với ID: ${donhangId}`);
        }
        const tong = donhang.sanpham.reduce((total, sp) => {
            const giaban = sp.giaban || new library_1.Decimal(0);
            const slnhan = sp.slnhan || new library_1.Decimal(0);
            return total.add(giaban.mul(slnhan));
        }, new library_1.Decimal(0));
        const vatRate = donhang.vat || new library_1.Decimal(0.05);
        const tongvat = tong.mul(vatRate);
        const tongtien = tong.add(tongvat);
        return {
            tong: tong,
            tongvat: tongvat,
            tongtien: tongtien,
            vatRate: vatRate
        };
    }
    catch (error) {
        console.error(`❌ Lỗi khi tính toán totals cho đơn hàng ${donhangId}:`, error);
        throw error;
    }
}
async function updateSpecificDonhangs(donhangIds) {
    console.log(`🎯 Cập nhật totals cho ${donhangIds.length} đơn hàng cụ thể...`);
    let processedCount = 0;
    let errorCount = 0;
    for (const donhangId of donhangIds) {
        try {
            const totals = await calculateDonhangTotals(donhangId);
            await prisma.donhang.update({
                where: { id: donhangId },
                data: {
                    tongvat: totals.tongvat,
                    tongtien: totals.tongtien
                }
            });
            processedCount++;
            console.log(`✅ Đã cập nhật đơn hàng ${donhangId}: tongvat=${totals.tongvat}, tongtien=${totals.tongtien}`);
        }
        catch (error) {
            errorCount++;
            console.error(`❌ Lỗi khi cập nhật đơn hàng ${donhangId}:`, error);
        }
    }
    console.log(`🎉 Kết quả: ${processedCount} thành công, ${errorCount} lỗi`);
    return { processedCount, errorCount };
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
//# sourceMappingURL=updatevat.js.map