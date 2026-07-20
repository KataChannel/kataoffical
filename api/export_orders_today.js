const { PrismaClient } = require('@prisma/client');
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');

const prisma = new PrismaClient();

async function exportSieuThiExcel(targetDateStr, outputFilePath) {
    const targetDate = new Date(targetDateStr);
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    const GROUP_SIEU_THI_ID = '30128727-7c5c-43c0-bc4b-0da5c6db0141';

    console.log(`Fetching data for ${targetDateStr}...`);

    // 1. Fetch Orders
    const allOrders = await prisma.donhang.findMany({
        where: {
            ngaygiao: { gte: startOfDay, lte: endOfDay }
        },
        include: {
            khachhang: { include: { nhomkhachhang: true } },
            sanpham: { include: { sanpham: true } }
        },
        orderBy: { createdAt: 'desc' }
    });

    console.log(`Found ${allOrders.length} total orders (including cancelled).`);

    // 2. Fetch Demand / Supply Data
    const [sanphams, tonkhos, khos, chotkhos, sanphamKhos] = await Promise.all([
        prisma.sanpham.findMany({
            select: {
                id: true, title: true, masp: true, dvt: true, haohut: true,
                Nhacungcap: { select: { mancc: true, name: true }, take: 1 }
            }
        }),
        prisma.tonKho.findMany({
            select: { sanphamId: true, slton: true, sltontt: true, slchogiao: true, slchonhap: true, updatedAt: true }
        }),
        prisma.kho.findMany({ select: { id: true, name: true, makho: true } }),
        prisma.chotkhodetail.findMany({
            orderBy: { ngaychot: 'desc' },
            distinct: ['sanphamId'],
            select: { sanphamId: true, sltonhethong: true, sltonthucte: true }
        }),
        prisma.sanphamKho.findMany({ select: { sanphamId: true, khoId: true, soluong: true } })
    ]);

    // Active orders for general processing
    const activeOrders = allOrders.filter(order => order.status !== 'huy');

    const sieuThiOrders = activeOrders.filter(order => 
        order.khachhang?.nhomkhachhang?.some(
            nhom => nhom.id === GROUP_SIEU_THI_ID || nhom.name?.toLowerCase().includes('siêu thị')
        )
    );

    const khachLeOrders = activeOrders.filter(order => 
        order.khachhang?.loaikh?.toLowerCase().includes('lẻ')
    );

    const workbook = new ExcelJS.Workbook();
    
    // --- SHEET 1: TỔNG HỢP (Demand) ---
    const tongHopSheet = workbook.addWorksheet('Tổng hợp');
    const mapping = {
        ngay: 'NGÀY', ncc: 'NHÀ CUNG CẤP', masp: 'MÃ SP', title: 'TÊN SẢN PHẨM', dvt: 'ĐVT',
        khachdat: 'TỔNG ĐẶT', slton: 'TỒN HT', sltontt: 'TỒN THỨC TẾ', goiy: 'GỢI Ý ĐẶT',
        kho1: 'TG-LONG AN', kho2: 'BỔ SUNG', kho3: 'TG-ĐÀ LẠT', kho4: 'TG-HCM', kho5: 'SG1', kho6: 'SG2'
    };

    tongHopSheet.columns = Object.values(mapping).map(v => ({ header: v, key: v, width: 15 }));
    
    const tkMap = new Map(tonkhos.map(t => [t.sanphamId, t]));
    const skMap = new Map();
    sanphamKhos.forEach(sk => {
        if (!skMap.has(sk.sanphamId)) skMap.set(sk.sanphamId, {});
        skMap.get(sk.sanphamId)[sk.khoId] = Number(sk.soluong);
    });

    const orderStats = new Map();
    activeOrders.forEach(order => {
        order.sanpham.forEach(sp => {
            const current = orderStats.get(sp.idSP) || 0;
            orderStats.set(sp.idSP, current + Number(sp.sldat));
        });
    });

    sanphams.forEach(sp => {
        const tk = tkMap.get(sp.id);
        const khachdat = orderStats.get(sp.id) || 0;
        const slton = Number(tk?.slton || 0);
        const sltontt = Number(tk?.sltontt || 0);
        const goiy = Math.max(0, khachdat - sltontt);

        const row = {
            [mapping.ngay]: moment(targetDate).format('DD/MM/YYYY'),
            [mapping.ncc]: sp.Nhacungcap[0]?.name || '',
            [mapping.masp]: sp.masp,
            [mapping.title]: sp.title,
            [mapping.dvt]: sp.dvt,
            [mapping.khachdat]: khachdat,
            [mapping.slton]: slton,
            [mapping.sltontt]: sltontt,
            [mapping.goiy]: goiy
        };

        khos.forEach((k, idx) => {
            const colName = `kho${idx + 1}`;
            if (mapping[colName]) {
                row[mapping[colName]] = skMap.get(sp.id)?.[k.id] || 0;
            }
        });

        if (khachdat > 0 || sltontt > 0) {
            tongHopSheet.addRow(row);
        }
    });

    // --- SHEET 2: VẬN ĐƠN ---
    const vandonSheet = workbook.addWorksheet('Vận đơn');
    vandonSheet.columns = [
        { header: 'STT', key: 'stt', width: 5 },
        { header: 'Mã Đơn Hàng', key: 'madonhang', width: 15 },
        { header: 'Khách Hàng', key: 'khachhang', width: 25 },
        { header: 'Tên Sản Phẩm', key: 'title', width: 35 },
        { header: 'ĐVT', key: 'dvt', width: 8 },
        { header: 'SL Đặt', key: 'sldat', width: 10 },
        { header: 'SL Giao', key: 'slgiao', width: 10 },
        { header: 'Tổng Tiền Đơn', key: 'tongtien', width: 15 },
        { header: 'Trạng Thái', key: 'status', width: 12 }
    ];

    let rowIdx = 1;
    allOrders.forEach(order => {
        order.sanpham.forEach(sp => {
            vandonSheet.addRow({
                stt: rowIdx++,
                madonhang: order.madonhang,
                khachhang: order.khachhang?.name || '',
                title: sp.sanpham?.title || '',
                dvt: sp.sanpham?.dvt || '',
                sldat: Number(sp.sldat),
                slgiao: Number(sp.slgiao),
                tongtien: Number(order.tongtien),
                status: order.status
            });
        });
    });

    // --- SHEET 3: HÀNG ST ---
    const hangStSheet = workbook.addWorksheet('Hàng ST');
    hangStSheet.addRow(["BẢNG SẢN PHẨM HÀNG ĐÓNG GÓI SIÊU THỊ"]).font = { bold: true };
    hangStSheet.addRow(["tên khách hàng", "sản phẩm", "DVT", "KL", "Ngày Giao", "Trạng Thái"]).font = { bold: true };
    
    sieuThiOrders.forEach(order => {
        order.sanpham.forEach(sp => {
            if (!sp.isActive) return;
            hangStSheet.addRow([
                order.khachhang?.name || '',
                sp.sanpham?.title || '',
                sp.sanpham?.dvt || '',
                Number(sp.slgiao || sp.sldat),
                moment(order.ngaygiao).format('D/M/YYYY'),
                order.status
            ]);
        });
    });

    // --- SHEET 4: TH Hàng ST ---
    const thHangStSheet = workbook.addWorksheet('TH Hang ST');
    thHangStSheet.addRow(["TỔNG HỢP HÀNG SIÊU THỊ ĐÓNG GÓI"]).font = { bold: true };
    thHangStSheet.addRow(["sản phẩm", "DVT", "KL", "Ghi chú"]).font = { bold: true };
    
    const thMap = new Map();
    sieuThiOrders.forEach(order => {
        order.sanpham.forEach(sp => {
            if (!sp.isActive) return;
            const key = sp.sanpham?.title || 'Unknown';
            const existing = thMap.get(key) || { title: key, dvt: sp.sanpham?.dvt || '', qty: 0 };
            existing.qty += Number(sp.slgiao || sp.sldat);
            thMap.set(key, existing);
        });
    });

    Array.from(thMap.values())
        .sort((a, b) => a.title.localeCompare(b.title))
        .forEach(item => {
            thHangStSheet.addRow([item.title, item.dvt, item.qty, ""]);
        });

    // --- SHEET 5: Khách Lẻ ---
    const khachLeSheet = workbook.addWorksheet('Khách lẻ');
    khachLeSheet.addRow(["BẢNG SẢN PHẨM HÀNG KHÁCH LẺ"]).font = { bold: true };
    khachLeSheet.addRow(["tên khách hàng", "sản phẩm", "DVT", "KL", "Ngày Giao", "Trạng Thái"]).font = { bold: true };
    
    khachLeOrders.forEach(order => {
        order.sanpham.forEach(sp => {
            if (!sp.isActive) return;
            khachLeSheet.addRow([
                order.khachhang?.name || '',
                sp.sanpham?.title || '',
                sp.sanpham?.dvt || '',
                Number(sp.slgiao || sp.sldat),
                moment(order.ngaygiao).format('D/M/YYYY'),
                order.status
            ]);
        });
    });

    // --- SHEET 6: Phiếu Chuyển ---
    const phieuChuyenSheet = workbook.addWorksheet('Phiếu Chuyển');
    phieuChuyenSheet.columns = [
        { header: 'STT', key: 'stt', width: 5 },
        { header: 'Mã Đơn Hàng', key: 'madonhang', width: 12 },
        { header: 'Ngày Giao', key: 'ngaygiao', width: 20 },
        { header: 'Tên Khách Hàng', key: 'khachhang', width: 25 },
        { header: 'Số Lượng', key: 'qty', width: 10 },
        { header: 'Trọng Tải', key: 'load', width: 10 },
        { header: 'Địa Chỉ', key: 'diachi', width: 35 },
        { header: 'SĐT', key: 'sdt', width: 12 },
        { header: 'Shipper', key: 'shipper', width: 15 }
    ];

    allOrders.forEach((order, idx) => {
        const activeSPs = order.sanpham.filter(sp => sp.isActive);
        const qty = activeSPs.reduce((s, sp) => s + Number(sp.sldat), 0);
        const load = activeSPs.reduce((s, sp) => s + (Number(sp.sanpham?.loadpoint || 0) * Number(sp.sldat)), 0);

        phieuChuyenSheet.addRow({
            stt: idx + 1,
            madonhang: order.madonhang,
            ngaygiao: moment(order.ngaygiao).format('DD/MM/YYYY'),
            khachhang: order.khachhang?.name || '',
            qty,
            load: parseFloat(load.toFixed(3)),
            diachi: order.khachhang?.diachi || '',
            sdt: order.khachhang?.sdt || '',
            shipper: order.shipper || ''
        });
    });

    // Styling
    workbook.eachSheet(sheet => {
        sheet.getRow(1).font = { bold: true };
        sheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    });

    console.log(`Writing to ${outputFilePath}...`);
    await workbook.xlsx.writeFile(outputFilePath);
    console.log('Export completed successfully.');
}

async function main() {
    const targetDate = '2026-07-18';
    const outputDir = '/home/kata/Coding/rausachfinal/doisoat';
    const outputFile = path.join(outputDir, `VanDon_TongHop_18-07-2026.xlsx`);
    
    await exportSieuThiExcel(targetDate, outputFile);
}

main().catch(console.error).finally(() => prisma.$disconnect());
