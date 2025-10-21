"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function findMysteryId() {
    const mysteryId = '6b567353-7d8b-4dda-be20-0819c6b35b41';
    console.log('🔍 Investigating ID:', mysteryId);
    console.log('');
    const sanpham = await prisma.sanpham.findUnique({
        where: { id: mysteryId }
    });
    if (sanpham) {
        console.log('✅ Found as Sanpham:');
        console.log('   ', sanpham.masp, '-', sanpham.title);
        console.log('');
    }
    else {
        console.log('❌ Not a Sanpham');
        console.log('');
    }
    const bgsp = await prisma.banggiasanpham.findUnique({
        where: { id: mysteryId },
        include: {
            banggia: { select: { mabanggia: true, title: true } },
            sanpham: { select: { masp: true, title: true } }
        }
    });
    if (bgsp) {
        console.log('✅ Found as Banggiasanpham:');
        console.log('   Banggia:', bgsp.banggia.mabanggia, '-', bgsp.banggia.title);
        console.log('   Sanpham:', bgsp.sanpham.masp, '-', bgsp.sanpham.title);
        console.log('   Price:', bgsp.giaban);
        console.log('   Sanpham ID:', bgsp.sanphamId);
        console.log('');
    }
    else {
        console.log('❌ Not a Banggiasanpham');
        console.log('');
    }
    const banggia = await prisma.banggia.findUnique({
        where: { id: mysteryId }
    });
    if (banggia) {
        console.log('✅ Found as Banggia:');
        console.log('   ', banggia.mabanggia, '-', banggia.title);
    }
    else {
        console.log('❌ Not a Banggia');
    }
    await prisma.$disconnect();
}
findMysteryId().catch(console.error);
//# sourceMappingURL=find-mystery-id.js.map