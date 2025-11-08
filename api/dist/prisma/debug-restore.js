"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new client_1.PrismaClient();
async function debugRestore() {
    const backupDir = '/chikiet/kataoffical/rausachfinal/api/rausach_json/20251016_165325';
    console.log('\n🔍 DEBUGGING RESTORE ISSUE\n');
    const banggiaBackup = JSON.parse(fs.readFileSync(path.join(backupDir, 'Banggia.json'), 'utf-8'));
    console.log(`📄 Banggia backup: ${banggiaBackup.length} records`);
    const bg24 = banggiaBackup.find((b) => b.id === 'cc845265-66d1-4363-a1f9-5e7c9ad591aa');
    console.log(`\n🎯 Bảng giá BG24:`);
    console.log(JSON.stringify(bg24, null, 2));
    const banggiaDB = await prisma.banggia.findMany();
    console.log(`\n💾 Banggia in DB: ${banggiaDB.length} records`);
    const bg24InDB = await prisma.banggia.findUnique({
        where: { id: 'cc845265-66d1-4363-a1f9-5e7c9ad591aa' }
    });
    console.log(`\n🔍 BG24 in DB: ${bg24InDB ? 'EXISTS ✅' : 'NOT FOUND ❌'}`);
    if (!bg24InDB) {
        console.log('\n❌ BG24 không có trong database!');
        console.log('Nguyên nhân: Banggia bị reject trong quá trình restore');
    }
    const khachhangBackup = JSON.parse(fs.readFileSync(path.join(backupDir, 'Khachhang.json'), 'utf-8'));
    const khWithBG24 = khachhangBackup.filter((k) => k.banggiaId === 'cc845265-66d1-4363-a1f9-5e7c9ad591aa');
    console.log(`\n👥 Khách hàng sử dụng BG24: ${khWithBG24.length} records`);
    const khachhangDB = await prisma.khachhang.findMany();
    console.log(`💾 Khachhang in DB: ${khachhangDB.length} records`);
    const khWithBG24InDB = await prisma.khachhang.count({
        where: { banggiaId: 'cc845265-66d1-4363-a1f9-5e7c9ad591aa' }
    });
    console.log(`🔍 Khách hàng có BG24 in DB: ${khWithBG24InDB} records`);
    console.log(`\n📊 SUMMARY:`);
    console.log(`- Banggia backup: ${banggiaBackup.length}`);
    console.log(`- Banggia in DB: ${banggiaDB.length}`);
    console.log(`- Missing: ${banggiaBackup.length - banggiaDB.length} banggia`);
    console.log(`\n- Khachhang backup: ${khachhangBackup.length}`);
    console.log(`- Khachhang in DB: ${khachhangDB.length}`);
    console.log(`- Missing: ${khachhangBackup.length - khachhangDB.length} khachhang`);
    console.log(`- Khách hàng với BG24 bị reject: ${khWithBG24.length - khWithBG24InDB}`);
    console.log(`\n🔍 CHECKING BANGGIA FK DEPENDENCIES:\n`);
    const sampleBanggia = banggiaBackup[0];
    console.log('Sample Banggia fields:', Object.keys(sampleBanggia));
    await prisma.$disconnect();
}
debugRestore().catch(console.error);
//# sourceMappingURL=debug-restore.js.map