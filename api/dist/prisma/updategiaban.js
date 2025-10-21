"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSpecificDonhangsGiaban = updateSpecificDonhangsGiaban;
exports.updateAllDonhangsGiaban = updateAllDonhangsGiaban;
exports.updateDonhangsByKhachhang = updateDonhangsByKhachhang;
exports.updateDonhangsByBanggia = updateDonhangsByBanggia;
exports.testUpdateDonhang = testUpdateDonhang;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const stats = {
    totalDonhang: 0,
    updatedDonhang: 0,
    totalSanpham: 0,
    updatedSanpham: 0,
    errors: [],
    warnings: []
};
async function updateDonhangsanphamGiaban(donhangsanphamId, newGiaban) {
    try {
        await prisma.donhangsanpham.update({
            where: { id: donhangsanphamId },
            data: { giaban: newGiaban }
        });
        return true;
    }
    catch (error) {
        stats.errors.push(`Error updating donhangsanpham ${donhangsanphamId}: ${error}`);
        return false;
    }
}
async function updateDonhangGiaban(donhangId) {
    try {
        const donhang = await prisma.donhang.findUnique({
            where: { id: donhangId },
            include: {
                khachhang: {
                    include: {
                        banggia: {
                            include: {
                                sanpham: true
                            }
                        }
                    }
                },
                sanpham: {
                    include: {
                        sanpham: true
                    }
                }
            }
        });
        if (!donhang) {
            stats.warnings.push(`Donhang ${donhangId} not found`);
            return;
        }
        if (!donhang.khachhang) {
            stats.warnings.push(`Donhang ${donhang.madonhang} has no khachhang`);
            return;
        }
        if (!donhang.khachhang.banggia) {
            stats.warnings.push(`Khachhang ${donhang.khachhang.makh} has no banggia`);
            return;
        }
        let hasUpdates = false;
        const banggiaSanphamMap = new Map();
        donhang.khachhang.banggia.sanpham.forEach(bgs => {
            banggiaSanphamMap.set(bgs.sanphamId, parseFloat(bgs.giaban.toString()));
        });
        for (const donhangsanpham of donhang.sanpham) {
            stats.totalSanpham++;
            const sanphamId = donhangsanpham.idSP;
            const currentGiaban = parseFloat(donhangsanpham.giaban.toString());
            const bangGiaban = banggiaSanphamMap.get(sanphamId);
            if (bangGiaban !== undefined) {
                if (Math.abs(currentGiaban - bangGiaban) > 0.01) {
                    const success = await updateDonhangsanphamGiaban(donhangsanpham.id, bangGiaban);
                    if (success) {
                        console.log(`Updated ${donhang.madonhang} - ${donhangsanpham.sanpham.masp}: ${currentGiaban} -> ${bangGiaban}`);
                        stats.updatedSanpham++;
                        hasUpdates = true;
                    }
                }
            }
            else {
                stats.warnings.push(`No price found for product ${donhangsanpham.sanpham.masp} in banggia ${donhang.khachhang.banggia.mabanggia}`);
            }
        }
        if (hasUpdates) {
            stats.updatedDonhang++;
        }
    }
    catch (error) {
        stats.errors.push(`Error processing donhang ${donhangId}: ${error}`);
    }
}
async function updateSpecificDonhangsGiaban(donhangIds) {
    console.log(`🎯 Starting update for ${donhangIds.length} specific donhang...`);
    const startTime = Date.now();
    for (let i = 0; i < donhangIds.length; i++) {
        const donhangId = donhangIds[i];
        await updateDonhangGiaban(donhangId);
        if ((i + 1) % 10 === 0) {
            console.log(`📊 Processed ${i + 1}/${donhangIds.length} donhang`);
        }
    }
    const duration = Date.now() - startTime;
    console.log(`\n✅ Update completed in ${duration}ms`);
    printStats();
}
async function updateAllDonhangsGiaban() {
    console.log('🚀 Starting bulk update of all donhang giaban...');
    const startTime = Date.now();
    try {
        const donhangs = await prisma.donhang.findMany({
            where: {
                khachhangId: { not: null },
                khachhang: {
                    banggiaId: { not: null }
                }
            },
            select: { id: true, madonhang: true }
        });
        stats.totalDonhang = donhangs.length;
        console.log(`📋 Found ${donhangs.length} donhang with khachhang and banggia`);
        for (let i = 0; i < donhangs.length; i++) {
            const donhang = donhangs[i];
            await updateDonhangGiaban(donhang.id);
            if ((i + 1) % 100 === 0) {
                const progress = ((i + 1) / donhangs.length * 100).toFixed(1);
                console.log(`📊 Progress: ${i + 1}/${donhangs.length} (${progress}%) - Updated: ${stats.updatedDonhang} donhang, ${stats.updatedSanpham} sanpham`);
            }
        }
        const duration = Date.now() - startTime;
        console.log(`\n✅ Bulk update completed in ${duration}ms (${(duration / 1000).toFixed(1)}s)`);
    }
    catch (error) {
        stats.errors.push(`Fatal error in bulk update: ${error}`);
        console.error('❌ Fatal error:', error);
    }
    printStats();
}
async function updateDonhangsByKhachhang(khachhangId) {
    console.log(`🎯 Starting update for khachhang: ${khachhangId}`);
    try {
        const donhangs = await prisma.donhang.findMany({
            where: { khachhangId },
            select: { id: true, madonhang: true }
        });
        console.log(`📋 Found ${donhangs.length} donhang for this khachhang`);
        for (const donhang of donhangs) {
            await updateDonhangGiaban(donhang.id);
        }
        printStats();
    }
    catch (error) {
        console.error('❌ Error updating by khachhang:', error);
    }
}
async function updateDonhangsByBanggia(banggiaId) {
    console.log(`🎯 Starting update for banggia: ${banggiaId}`);
    try {
        const donhangs = await prisma.donhang.findMany({
            where: {
                banggiaId,
                khachhangId: { not: null }
            },
            select: { id: true, madonhang: true }
        });
        console.log(`📋 Found ${donhangs.length} donhang for this banggia`);
        for (const donhang of donhangs) {
            await updateDonhangGiaban(donhang.id);
        }
        printStats();
    }
    catch (error) {
        console.error('❌ Error updating by banggia:', error);
    }
}
function printStats() {
    console.log('\n📊 UPDATE STATISTICS:');
    console.log(`├─ Total Donhang: ${stats.totalDonhang}`);
    console.log(`├─ Updated Donhang: ${stats.updatedDonhang}`);
    console.log(`├─ Total Sanpham: ${stats.totalSanpham}`);
    console.log(`├─ Updated Sanpham: ${stats.updatedSanpham}`);
    console.log(`├─ Errors: ${stats.errors.length}`);
    console.log(`└─ Warnings: ${stats.warnings.length}`);
    if (stats.errors.length > 0) {
        console.log('\n❌ ERRORS:');
        stats.errors.forEach(error => console.log(`   ${error}`));
    }
    if (stats.warnings.length > 0 && stats.warnings.length <= 10) {
        console.log('\n⚠️  WARNINGS:');
        stats.warnings.forEach(warning => console.log(`   ${warning}`));
    }
    else if (stats.warnings.length > 10) {
        console.log(`\n⚠️  WARNINGS: ${stats.warnings.length} warnings (showing first 10)`);
        stats.warnings.slice(0, 10).forEach(warning => console.log(`   ${warning}`));
    }
}
async function testUpdateDonhang(madonhang) {
    console.log(`🧪 Testing update for donhang: ${madonhang}`);
    try {
        const donhang = await prisma.donhang.findUnique({
            where: { madonhang },
            select: { id: true }
        });
        if (!donhang) {
            console.log(`❌ Donhang ${madonhang} not found`);
            return;
        }
        await updateDonhangGiaban(donhang.id);
        printStats();
    }
    catch (error) {
        console.error('❌ Test error:', error);
    }
}
async function main() {
    const args = process.argv.slice(2);
    try {
        if (args.includes('--test') && args[1]) {
            await testUpdateDonhang(args[1]);
        }
        else if (args.includes('--khachhang') && args[1]) {
            await updateDonhangsByKhachhang(args[1]);
        }
        else if (args.includes('--banggia') && args[1]) {
            await updateDonhangsByBanggia(args[1]);
        }
        else if (args.includes('--ids')) {
            const ids = args.slice(1);
            await updateSpecificDonhangsGiaban(ids);
        }
        else {
            await updateAllDonhangsGiaban();
        }
    }
    catch (error) {
        console.error('❌ Main execution error:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
if (require.main === module) {
    main().catch(console.error);
}
//# sourceMappingURL=updategiaban.js.map