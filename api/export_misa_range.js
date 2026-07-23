const { PrismaClient } = require('@prisma/client');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
const moment = require('moment-timezone');

const prisma = new PrismaClient();

const startDateStr = process.argv[2] || '2026-01-01';
const endDateStr = process.argv[3] || '2026-07-19';

async function main() {
    console.log(`=== STARTING RANGE MISA EXPORT FROM ${startDateStr} TO ${endDateStr} ===`);

    const templateDir = '/home/kata/Coding/rausachfinal/docs/yeucaucuaketoan';
    const deliveryTemplatePath = path.join(templateDir, 'Phieu giao hang.xls');
    const purchaseTemplatePath = path.join(templateDir, 'Mua hang nha cung cap.xls');
    const baseOutputDir = path.join(templateDir, 'dulieuxuat');

    if (!fs.existsSync(baseOutputDir)) {
        fs.mkdirSync(baseOutputDir, { recursive: true });
    }

    // Load template buffers into memory for high performance
    const deliveryBuffer = fs.readFileSync(deliveryTemplatePath);
    const purchaseBuffer = fs.readFileSync(purchaseTemplatePath);

    let currentDate = moment.tz(startDateStr, 'Asia/Ho_Chi_Minh').startOf('day');
    const lastDate = moment.tz(endDateStr, 'Asia/Ho_Chi_Minh').startOf('day');

    let totalDaysProcessed = 0;
    let totalSalesFilesGenerated = 0;
    let totalPurchaseFilesGenerated = 0;

    while (currentDate.isSameOrBefore(lastDate)) {
        const dateFormattedISO = currentDate.format('YYYY-MM-DD');
        const dateFormattedFilename = currentDate.format('DD-MM-YYYY');

        const startOfDay = currentDate.clone().startOf('day').toDate();
        const endOfDay = currentDate.clone().endOf('day').toDate();

        // 1. Fetch Sales Orders
        const orders = await prisma.donhang.findMany({
            where: {
                ngaygiao: { gte: startOfDay, lte: endOfDay },
                status: 'danhan'
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

        // 2. Fetch Purchases
        const purchases = await prisma.dathang.findMany({
            where: {
                ngaynhan: { gte: startOfDay, lte: endOfDay },
                status: 'danhan'
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

        // Build Sales Rows
        const salesRows = [];
        for (const order of orders) {
            const formattedDateStr = moment(order.ngaygiao).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY');
            const kh = order.khachhang || {};

            for (const item of order.sanpham) {
                const slnhan = parseFloat(item.slnhan || 0);
                if (slnhan <= 0) continue;

                const giaban = parseFloat(item.giaban || 0);
                const thanhTien = slnhan * giaban;
                const vatRate = parseFloat(item.vat || 0);
                const tienVat = thanhTien * vatRate;

                const row = Array(61).fill(null);
                row[0] = "Chưa thu tiền";
                row[1] = "Có";
                row[2] = "";
                row[3] = "";
                row[4] = formattedDateStr;
                row[5] = formattedDateStr;
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

                salesRows.push(row);
            }
        }

        // Build Purchase Rows
        const purchaseRows = [];
        for (const purchase of purchases) {
            const formattedDateStr = moment(purchase.ngaynhan).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY');
            const ncc = purchase.nhacungcap || {};
            const isShowVat = ncc.isshowvat !== false;

            for (const item of purchase.sanpham) {
                const slnhan = parseFloat(item.slnhan || 0);
                if (slnhan <= 0) continue;

                const gianhap = parseFloat(item.gianhap) > 0 ? parseFloat(item.gianhap) : parseFloat(item.sanpham?.giagoc || 0);
                const thanhTien = slnhan * gianhap;
                const vatRate = isShowVat ? parseFloat(item.sanpham?.vat || 0) : 0;
                const tienVat = thanhTien * vatRate;

                const row = Array(63).fill(null);
                row[0] = "Mua hàng trong nước nhập kho";
                row[1] = "Chưa thanh toán";
                row[2] = ""; // Cột "Nhận kèm hóa đơn" để trống theo yêu cầu kế toán
                row[3] = formattedDateStr;
                row[4] = formattedDateStr;
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

                purchaseRows.push(row);
            }
        }

        // Only create directory if there is data for sales or purchases
        if (salesRows.length > 0 || purchaseRows.length > 0) {
            const dayOutputDir = path.join(baseOutputDir, dateFormattedISO);
            if (!fs.existsSync(dayOutputDir)) {
                fs.mkdirSync(dayOutputDir, { recursive: true });
            }

            // Export Sales files
            if (salesRows.length > 0) {
                const generated = writeChunksFromBuffer(
                    deliveryBuffer,
                    'Phieu giao hang',
                    salesRows,
                    'Ban hang trong nuoc',
                    dateFormattedFilename,
                    dayOutputDir
                );
                totalSalesFilesGenerated += generated;
            }

            // Export Purchase files
            if (purchaseRows.length > 0) {
                const generated = writeChunksFromBuffer(
                    purchaseBuffer,
                    'Mua hang nha cung cap',
                    purchaseRows,
                    'Mua hang trong nuoc ',
                    dateFormattedFilename,
                    dayOutputDir
                );
                totalPurchaseFilesGenerated += generated;
            }

            totalDaysProcessed++;
            console.log(`[${dateFormattedISO}] Sales rows: ${salesRows.length}, Purchase rows: ${purchaseRows.length} -> Exported to dulieuxuat/${dateFormattedISO}/`);
        }

        currentDate.add(1, 'day');
    }

    console.log(`\n=== RANGE EXPORT COMPLETED ===`);
    console.log(`Days processed: ${totalDaysProcessed}`);
    console.log(`Total Sales files generated: ${totalSalesFilesGenerated}`);
    console.log(`Total Purchase files generated: ${totalPurchaseFilesGenerated}`);
}

function writeChunksFromBuffer(templateBuffer, outputBaseName, dataRows, sheetName, dateStr, outputFolder) {
    const CHUNK_SIZE = 500;
    const totalRows = dataRows.length;
    const numChunks = Math.ceil(totalRows / CHUNK_SIZE);

    for (let part = 1; part <= numChunks; part++) {
        const startIdx = (part - 1) * CHUNK_SIZE;
        const endIdx = Math.min(startIdx + CHUNK_SIZE, totalRows);
        const chunkData = dataRows.slice(startIdx, endIdx);

        // Read template from buffer
        const workbook = XLSX.read(templateBuffer, { type: 'buffer' });
        const sheet = workbook.Sheets[sheetName];

        // Clear data rows starting from row 9 (index 8)
        clearDataRows(sheet);

        // Populate chunk data
        chunkData.forEach((row, rIdx) => {
            const destRowIndex = 8 + rIdx;
            row.forEach((val, cIdx) => {
                if (val !== null && val !== undefined && val !== '') {
                    const cellRef = XLSX.utils.encode_cell({ r: destRowIndex, c: cIdx });
                    sheet[cellRef] = typeof val === 'number' ? { t: 'n', v: val } : { t: 's', v: String(val) };
                }
            });
        });

        // Update range
        const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1:A9');
        range.e.r = 8 + chunkData.length - 1;
        sheet['!ref'] = XLSX.utils.encode_range(range);

        // Filename and save
        const suffix = numChunks > 1 ? `_part${part}` : '';
        const filename = `${outputBaseName}_${dateStr}${suffix}.xls`;
        const outPath = path.join(outputFolder, filename);
        XLSX.writeFile(workbook, outPath);
    }

    return numChunks;
}

function clearDataRows(sheet) {
    for (let key in sheet) {
        if (key[0] === '!') continue;
        const cell = XLSX.utils.decode_cell(key);
        if (cell.r >= 8) {
            delete sheet[key];
        }
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
