const XLSX = require('xlsx');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

const excelPath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 8-5.xlsx';
const outputPath = '/home/kata/Coding/rausachfinal/doisoat/chotkhohangngay/Bao_cao_doi_soat_08_05_2026.md';

async function main() {
    try {
        // 1. Get Last ChotKho
        const lastChotkho = await prisma.chotkho.findFirst({
            where: { isActive: true },
            orderBy: { ngaychot: 'desc' },
            include: {
                details: { include: { sanpham: true } }
            }
        });

        if (!lastChotkho) {
            console.log("No last ChotKho found.");
            return;
        }

        const startDate = lastChotkho.ngaychot;
        const endDate = new Date();

        // 2. Read Excel Actual
        const workbook = XLSX.readFile(excelPath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const excelRows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const excelData = new Map();
        
        // Header detection (based on previous debug)
        const headerRow = excelRows[0];
        const colIdx = {
            masp: headerRow.indexOf('masp'),
            slton: headerRow.indexOf('slton'),
            slhuy: headerRow.indexOf('slhuy')
        };

        for (let i = 1; i < excelRows.length; i++) {
            const row = excelRows[i];
            if (row[colIdx.masp]) {
                excelData.set(row[colIdx.masp].toString().trim(), {
                    actual: parseFloat(row[colIdx.slton]) || 0,
                    huy: parseFloat(row[colIdx.slhuy]) || 0
                });
            }
        }

        // 3. Fetch Transactions
        const phieuKhos = await prisma.phieuKho.findMany({
            where: { ngay: { gt: startDate }, isActive: true },
            include: { sanpham: { include: { sanpham: true } } }
        });

        const donhangs = await prisma.donhang.findMany({
            where: { ngaygiao: { gt: startDate }, status: { in: ['dagiao', 'danhan', 'hoanthanh'] } },
            include: { sanpham: { include: { sanpham: true } } }
        });

        const dathangs = await prisma.dathang.findMany({
            where: { ngaynhan: { gt: startDate }, status: { in: ['danhan', 'hoanthanh'] } },
            include: { sanpham: { include: { sanpham: true } } }
        });

        // 4. Compile Stats
        const audit = new Map();

        // Initialize from Last ChotKho
        lastChotkho.details.forEach(d => {
            if (!d.sanpham) return;
            audit.set(d.sanpham.masp, {
                id: d.sanphamId,
                masp: d.sanpham.masp,
                title: d.sanpham.title,
                initial: Number(d.sltonthucte || 0),
                nhap: 0,
                xuat: 0,
                sales: 0,
                purchases: 0,
                excelActual: 0,
                excelHuy: 0,
                foundInExcel: false
            });
        });

        // Add from Excel if not in ChotKho
        excelData.forEach((val, masp) => {
            if (!audit.has(masp)) {
                audit.set(masp, {
                    masp, title: 'Unknown', initial: 0, nhap: 0, xuat: 0, sales: 0, purchases: 0, excelActual: val.actual, excelHuy: val.huy, foundInExcel: true
                });
            } else {
                const a = audit.get(masp);
                a.excelActual = val.actual;
                a.excelHuy = val.huy;
                a.foundInExcel = true;
            }
        });

        // Update stats from transactions
        phieuKhos.forEach(pk => {
            pk.sanpham.forEach(pks => {
                if (!pks.sanpham?.masp) return;
                const a = audit.get(pks.sanpham.masp);
                if (!a) return;
                if (!pk.madonhang && !pk.madncc) {
                    if (pk.type === 'nhap') a.nhap += Number(pks.soluong || 0);
                    else if (pk.type === 'xuat') a.xuat += Number(pks.soluong || 0);
                }
            });
        });

        donhangs.forEach(dh => {
            dh.sanpham.forEach(dhs => {
                if (!dhs.sanpham?.masp) return;
                const a = audit.get(dhs.sanpham.masp);
                if (a) a.sales += Number(dhs.slnhan || dhs.slgiao || 0);
            });
        });

        dathangs.forEach(dt => {
            dt.sanpham.forEach(dts => {
                if (!dts.sanpham?.masp) return;
                const a = audit.get(dts.sanpham.masp);
                if (a) a.purchases += Number(dts.slnhan || dts.slgiao || 0);
            });
        });

        // 5. Generate Markdown
        let md = `# Báo cáo Đối soát Kho & Luồng Vận hành (08/05/2026)\n\n`;
        md += `## 1. Thông tin chung\n`;
        md += `- **Lần chốt kho gốc:** ${lastChotkho.title} (${startDate.toISOString()})\n`;
        md += `- **Thời điểm đối soát:** ${endDate.toISOString()}\n`;
        md += `- **File Excel thực tế:** \`Ton-Huy 8-5.xlsx\`\n\n`;

        md += `## 2. Luồng vận hành trong ngày\n`;
        md += `| Chỉ số | Số lượng |\n`;
        md += `| :--- | :--- |\n`;
        md += `| Đơn hàng bán (Sales Orders) | ${donhangs.length} |\n`;
        md += `| Đơn đặt hàng NCC (Purchase Orders) | ${dathangs.length} |\n`;
        md += `| Phiếu kho lẻ (Internal Vouchers) | ${phieuKhos.length} |\n\n`;

        md += `## 3. Phân tích Chênh lệch (Top các mã biến động mạnh)\n`;
        md += `*Công thức: Expected = Tồn đầu + Nhập NCC + Nhập lẻ - Xuất lẻ - Bán hàng*\n\n`;
        md += `| Mã SP | Tên Sản phẩm | Tồn đầu | Nhập | Bán | Hủy (Excel) | **Expected** | **Thực tế (Excel)** | **Lệch** |\n`;
        md += `| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n`;

        const reportData = Array.from(audit.values())
            .map(a => {
                const expected = a.initial + a.purchases + a.nhap - a.xuat - a.sales;
                const diff = a.excelActual - expected;
                return { ...a, expected: Number(expected.toFixed(2)), diff: Number(diff.toFixed(2)) };
            })
            .filter(a => a.foundInExcel || Math.abs(a.diff) > 0.1)
            .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));

        reportData.slice(0, 40).forEach(a => {
            md += `| ${a.masp} | ${a.title} | ${a.initial} | ${a.purchases + a.nhap} | ${a.sales} | ${a.excelHuy} | **${a.expected}** | **${a.excelActual}** | **${a.diff > 0 ? '+' : ''}${a.diff}** |\n`;
        });

        md += `\n\n## 4. Nguyên nhân chênh lệch tiêu biểu\n`;
        
        // Logic for identifying causes
        const causes = [];
        
        const largeNegativeDiff = reportData.filter(a => a.diff < -50);
        if (largeNegativeDiff.length > 0) {
            causes.push(`- **Thất thoát/Chưa ghi nhận Hủy:** Các mã như ${largeNegativeDiff.map(a => a.title).join(', ')} có tồn thực tế thấp hơn nhiều so với hệ thống. Có khả năng hàng đã hỏng và vứt đi nhưng chưa được bấm "Hủy" trên App.`);
        }

        const largePositiveDiff = reportData.filter(a => a.diff > 50);
        if (largePositiveDiff.length > 0) {
            causes.push(`- **Chưa ghi nhận Nhập hàng:** Các mã như ${largePositiveDiff.map(a => a.title).join(', ')} có tồn thực tế cao hơn hệ thống. Có thể hàng đã về kho nhưng kế toán/kho chưa xác nhận phiếu nhập.`);
        }

        const zeroSalesButLargeDiff = reportData.filter(a => a.sales === 0 && Math.abs(a.diff) > 10);
        if (zeroSalesButLargeDiff.length > 0) {
            causes.push(`- **Sai lệch tồn đầu hoặc Phiếu kho lẻ:** Một số mã không có doanh số nhưng vẫn lệch (Ví dụ: ${zeroSalesButLargeDiff.slice(0, 3).map(a => a.title).join(', ')}). Cần kiểm tra lại phiếu điều chỉnh kho lẻ.`);
        }

        md += causes.join('\n') + '\n\n';

        md += `## 5. Kiến nghị vận hành\n`;
        md += `1. **Cập nhật phiếu Hủy:** Toàn bộ số lượng trong cột "HỦY" của file Excel cần được nhập vào hệ thống ngay lập tức.\n`;
        md += `2. **Xác nhận Nhập hàng:** Kiểm tra lại các mã có Lệch dương (+) để xem có phiếu nhập nào đang ở trạng thái "Chờ" không.\n`;
        md += `3. **Mãng cầu xiêm:** Mã này không xuất hiện trong file kiểm kho hôm nay nhưng hệ thống vẫn báo tồn. Cần xác minh xem mã này còn hàng thực tế không.\n`;

        fs.writeFileSync(outputPath, md);
        console.log(`Report generated: ${outputPath}`);

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
