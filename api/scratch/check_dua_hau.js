const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const XLSX = require('xlsx');

async function main() {
    // 1. Check in Excel
    const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 24-5.xlsx';
    const workbook = XLSX.readFile(filePath);
    const sheet1 = workbook.Sheets['sheet1'];
    const data = XLSX.utils.sheet_to_json(sheet1);
    
    console.log('=== CHECK EXCEL DATA FOR I100480 ===');
    const excelRow = data.find(r => r.masp === 'I100480');
    if (excelRow) {
        console.log('Found in Excel:', excelRow);
    } else {
        console.log('NOT found in Excel!');
    }

    // 2. Check in Database (rausachfinal)
    console.log('\n=== CHECK DATABASE FOR I100480 ===');
    const sp = await prisma.sanpham.findUnique({
        where: { masp: 'I100480' },
        include: {
            SanphamKho: true,
            TonKho: true
        }
    });

    if (sp) {
        console.log('Product Info:', {
            id: sp.id,
            masp: sp.masp,
            title: sp.title,
            giagoc: sp.giagoc
        });
        console.log('SanphamKho:', sp.SanphamKho);
        console.log('TonKho:', sp.TonKho);

        // Fetch ChotkhoDetail for this product (last 10 records)
        console.log('\n=== RECENT CHOT KHO DETAILS ===');
        const chotDetails = await prisma.chotkhodetail.findMany({
            where: { sanphamId: sp.id },
            include: {
                chotkho: true
            },
            orderBy: {
                ngaychot: 'desc' // Most recent first
            },
            take: 10
        });

        chotDetails.forEach(d => {
            console.log(`Ngày chốt: ${d.ngaychot.toLocaleString('vi-VN')} | Title: ${d.chotkho.title} | Hệ thống: ${d.sltonhethong} | Thực tế: ${d.sltonthucte} | Hủy: ${d.slhuy} | Lệch: ${d.chenhlech} | Ghi chú: ${d.ghichu}`);
        });

    } else {
        console.log('Product not found in DB!');
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
