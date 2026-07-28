const { PrismaClient } = require('@prisma/client');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
const moment = require('moment-timezone');

const prisma = new PrismaClient();

// Target date: defaults to today (Asia/Ho_Chi_Minh)
const targetDateStr = process.argv[2] || moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD');

async function main() {
    console.log(`=== STARTING MISA EXPORT FOR DATE: ${targetDateStr} ===`);

    // Parse target date bounds in Vietnam timezone (GMT+7)
    const startOfTarget = moment.tz(targetDateStr, 'Asia/Ho_Chi_Minh').startOf('day').toDate();
    const endOfTarget = moment.tz(targetDateStr, 'Asia/Ho_Chi_Minh').endOf('day').toDate();

    console.log(`Timezone bounds (local):`);
    console.log(`- Start: ${startOfTarget.toISOString()}`);
    console.log(`- End: ${endOfTarget.toISOString()}`);

    // File paths
    const templateDir = '/home/kata/Coding/rausachfinal/docs/yeucaucuaketoan';
    const deliveryTemplate = path.join(templateDir, 'Phieu giao hang.xls');
    const purchaseTemplate = path.join(templateDir, 'Mua hang nha cung cap.xls');

    // 1. Fetch Sales Orders (Donhang)
    console.log('\nFetching sales orders...');
    const orders = await prisma.donhang.findMany({
        where: {
            ngaygiao: { gte: startOfTarget, lte: endOfTarget },
            status: { in: ['danhan', 'hoanthanh'] }
        },
        include: {
            khachhang: true,
            kho: true,
            sanpham: {
                include: { sanpham: true }
            }
        },
        orderBy: { madonhang: 'asc' }
    });
    console.log(`Found ${orders.length} finalised sales orders.`);

    // 2. Fetch Purchases (Dathang)
    console.log('\nFetching purchases...');
    const purchases = await prisma.dathang.findMany({
        where: {
            ngaynhan: { gte: startOfTarget, lte: endOfTarget },
            status: { in: ['danhan', 'hoanthanh'] }
        },
        include: {
            nhacungcap: true,
            kho: true,
            sanpham: {
                include: { sanpham: true }
            }
        },
        orderBy: { madncc: 'asc' }
    });
    console.log(`Found ${purchases.length} finalised purchases.`);

    // --- PROCESS SALES (PHIEU GIAO HANG) ---
    console.log('\nProcessing sales order items...');
    const salesOrderGroups = [];
    let totalSalesRowsCount = 0;
    for (const order of orders) {
        const orderRows = [];
        const formattedDate = moment(order.ngaygiao).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY');
        const kh = order.khachhang || {};

        for (const item of order.sanpham) {
            const slnhan = parseFloat(item.slnhan || 0);
            if (slnhan <= 0) continue; // Skip 0 quantity items

            const giaban = parseFloat(item.giaban || 0);
            const thanhTien = slnhan * giaban;
            const vatRate = parseFloat(item.vat || 0);
            const tienVat = thanhTien * vatRate;

            const row = Array(61).fill(null);
            row[0] = "Chưa thu tiền";
            row[1] = "Có";
            row[2] = "";
            row[3] = "";
            row[4] = formattedDate;
            row[5] = formattedDate;
            row[6] = order.madonhang;
            row[7] = order.madonhang;
            row[8] = "";
            row[9] = "";
            row[10] = "";
            row[11] = "";
            row[12] = kh.makh || "";
            row[13] = kh.diachi || "";
            row[14] = kh.mst || "";
            row[15] = "";
            row[16] = "";
            row[17] = `Bán hàng ${kh.name || ''}`;
            row[18] = `Xuất kho bán hàng cho ${kh.name || ''}`;
            row[19] = "";
            row[20] = "";
            row[21] = "";
            row[22] = "";
            row[23] = "VND";
            row[24] = 1;
            row[25] = item.sanpham?.masp || "";
            row[26] = item.sanpham?.title || "";
            row[27] = "Không";
            row[28] = "Không";
            row[29] = "";
            row[30] = "131";
            row[31] = "5111";
            row[32] = item.sanpham?.dvt || "";
            row[33] = slnhan;
            row[34] = giaban;
            row[35] = thanhTien;
            row[36] = thanhTien;
            row[37] = "";
            row[38] = "";
            row[39] = "";
            row[40] = "";
            row[41] = vatRate * 100;
            row[42] = tienVat;
            row[43] = tienVat;
            row[44] = vatRate > 0 ? "33311" : "";
            row[45] = "";
            row[46] = "";
            row[47] = "";
            row[48] = "";
            row[49] = "";
            row[50] = "";
            row[51] = "";
            row[52] = "";
            row[53] = "Không";
            row[54] = "HH";
            row[55] = "";
            row[56] = "632";
            row[57] = "1561";
            row[58] = "";
            row[59] = "";
            row[60] = "";

            orderRows.push(row);
        }
        if (orderRows.length > 0) {
            salesOrderGroups.push(orderRows);
            totalSalesRowsCount += orderRows.length;
        }
    }
    console.log(`Generated ${totalSalesRowsCount} sales data rows across ${salesOrderGroups.length} orders.`);

    // --- PROCESS PURCHASES (MUA HANG NHA CUNG CAP) ---
    console.log('\nProcessing purchase items...');
    const purchaseOrderGroups = [];
    let totalPurchaseRowsCount = 0;
    for (const purchase of purchases) {
        const orderRows = [];
        const formattedDate = moment(purchase.ngaynhan).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY');
        const ncc = purchase.nhacungcap || {};
        const isShowVat = ncc.isshowvat !== false;

        for (const item of purchase.sanpham) {
            const slnhan = parseFloat(item.slnhan || 0);
            if (slnhan <= 0) continue; // Skip 0 quantity items

            const gianhap = parseFloat(item.gianhap) > 0 ? parseFloat(item.gianhap) : parseFloat(item.sanpham?.giagoc || 0);
            const thanhTien = slnhan * gianhap;

            const vatRate = isShowVat ? parseFloat(item.sanpham?.vat || 0) : 0;
            const tienVat = thanhTien * vatRate;

            const row = Array(63).fill(null);
            row[0] = "Mua hàng trong nước nhập kho";
            row[1] = "Chưa thanh toán";
            row[2] = "";
            row[3] = formattedDate;
            row[4] = formattedDate;
            row[5] = purchase.madncc;
            row[6] = "";
            row[7] = "";
            row[8] = "";
            row[9] = "";
            row[10] = "";
            row[11] = "";
            row[12] = "";
            row[13] = ncc.mancc || "";
            row[14] = ncc.name || "";
            row[15] = ncc.diachi || "";
            row[16] = ncc.mst || "";
            row[17] = "";
            row[18] = `Mua hàng ${ncc.name || ''}`;
            row[19] = "";
            row[20] = "";
            row[21] = "";
            row[22] = "";
            row[23] = "";
            row[24] = "";
            row[25] = "VND";
            row[26] = 1;
            row[27] = item.sanpham?.masp || "";
            row[28] = item.sanpham?.title || "";
            row[29] = "Không";
            row[30] = "HH";
            row[31] = "";
            row[32] = "";
            row[33] = "1561";
            row[34] = "331";
            row[35] = item.sanpham?.dvt || "";
            row[36] = slnhan;
            row[37] = gianhap;
            row[38] = thanhTien;
            row[39] = thanhTien;
            row[40] = "";
            row[41] = "";
            row[42] = "";
            row[43] = vatRate * 100;
            row[44] = "";
            row[45] = tienVat;
            row[46] = tienVat;
            row[47] = vatRate > 0 ? "1331" : "";
            row[48] = "";
            row[49] = "";
            row[50] = "";
            row[51] = "";
            row[52] = "";
            row[53] = "";
            row[54] = "";
            row[55] = "";
            row[56] = "";
            row[57] = "";
            row[58] = "";
            row[59] = "";
            row[60] = "";
            row[61] = "";
            row[62] = "Không";

            orderRows.push(row);
        }
        if (orderRows.length > 0) {
            purchaseOrderGroups.push(orderRows);
            totalPurchaseRowsCount += orderRows.length;
        }
    }
    console.log(`Generated ${totalPurchaseRowsCount} purchase data rows across ${purchaseOrderGroups.length} purchases.`);

    // --- WRITE TO TEMPLATES ---
    const dateFormattedForFilename = moment(targetDateStr).format('DD-MM-YYYY');

    // Export Sales Note
    writeChunks(deliveryTemplate, 'Phieu giao hang', salesOrderGroups, 'Ban hang trong nuoc', dateFormattedForFilename);

    // Export Purchase Note
    writeChunks(purchaseTemplate, 'Mua hang nha cung cap', purchaseOrderGroups, 'Mua hang trong nuoc ', dateFormattedForFilename);

    console.log('\n=== MISA EXPORT COMPLETED SUCCESSFULLY ===');
}

function writeChunks(templatePath, outputBaseName, orderGroups, sheetName, dateStr) {
    const CHUNK_SIZE = 500;

    // Group orderGroups into chunks without splitting any single order
    const chunks = [];
    let currentChunk = [];

    for (const group of orderGroups) {
        if (currentChunk.length > 0 && (currentChunk.length + group.length > CHUNK_SIZE)) {
            chunks.push(currentChunk);
            currentChunk = [];
        }
        currentChunk.push(...group);
    }
    if (currentChunk.length > 0) {
        chunks.push(currentChunk);
    }

    const totalRows = orderGroups.reduce((sum, g) => sum + g.length, 0);
    const numChunks = chunks.length;

    console.log(`\nWriting chunks for ${outputBaseName}:`);
    console.log(`- Template: ${templatePath}`);
    console.log(`- Total data rows: ${totalRows}`);
    console.log(`- Part files to generate: ${numChunks || 1}`);

    if (totalRows === 0) {
        const workbook = XLSX.readFile(templatePath);
        const sheet = workbook.Sheets[sheetName];
        clearDataRows(sheet);
        const outPath = path.join('/home/kata/Coding/rausachfinal/docs/yeucaucuaketoan', `${outputBaseName}_${dateStr}.xls`);
        XLSX.writeFile(workbook, outPath);
        console.log(`Saved empty export: ${outPath}`);
        return;
    }

    for (let part = 1; part <= numChunks; part++) {
        const chunkData = chunks[part - 1];

        // Read template
        const workbook = XLSX.readFile(templatePath);
        const sheet = workbook.Sheets[sheetName];

        // Clear data rows starting from index 8 (row 9)
        clearDataRows(sheet);

        // Populate chunk data
        chunkData.forEach((row, rIdx) => {
            const destRowIndex = 8 + rIdx; // starts at row 9
            row.forEach((val, cIdx) => {
                if (val !== null && val !== undefined && val !== '') {
                    const cellRef = XLSX.utils.encode_cell({ r: destRowIndex, c: cIdx });
                    sheet[cellRef] = typeof val === 'number' ? { t: 'n', v: val } : { t: 's', v: String(val) };
                }
            });
        });

        // Update range to reflect new number of rows
        const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1:A9');
        range.e.r = 8 + chunkData.length - 1;
        sheet['!ref'] = XLSX.utils.encode_range(range);

        // Filename and path
        const suffix = numChunks > 1 ? `_part${part}` : '';
        const filename = `${outputBaseName}_${dateStr}${suffix}.xls`;
        const outPath = path.join('/home/kata/Coding/rausachfinal/docs/yeucaucuaketoan', filename);
        XLSX.writeFile(workbook, outPath);
        console.log(`- Saved Part ${part} (${chunkData.length} rows): ${outPath}`);
    }
}

function clearDataRows(sheet) {
    for (let key in sheet) {
        if (key[0] === '!') continue;
        const cell = XLSX.utils.decode_cell(key);
        if (cell.r >= 8) { // Delete row 9 onwards
            delete sheet[key];
        }
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
