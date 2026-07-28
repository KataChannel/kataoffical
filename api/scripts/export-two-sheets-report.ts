import { PrismaClient } from '@prisma/client';
import XLSX from 'xlsx-js-style';
import moment from 'moment';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const Batdau = new Date('2026-01-01T00:00:00Z');
  const Ketthuc = new Date('2026-05-31T23:59:59Z');

  console.log('1. Querying orders from database for period 1/1/2026 to 31/5/2026...');
  const orders = await prisma.donhang.findMany({
    where: {
      ngaygiao: {
        gte: Batdau,
        lte: Ketthuc
      },
      status: {
        in: ['danhan', 'hoanthanh']
      }
    },
    orderBy: [
      { khachhang: { name: 'asc' } },
      { ngaygiao: 'asc' }
    ],
    select: {
      id: true,
      madonhang: true,
      ngaygiao: true,
      tongtien: true,
      tongvat: true,
      isshowvat: true,
      vat: true,
      sanpham: {
        select: {
          slnhan: true,
          ttnhan: true,
          giaban: true,
          vat: true,
          ghichu: true,
          sanpham: {
            select: {
              masp: true,
              title: true,
              dvt: true,
            }
          }
        }
      },
      khachhang: {
        select: {
          id: true,
          makh: true,
          name: true,
          diachi: true,
          email: true,
          nhomkhachhang: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });

  console.log(`Retrieved ${orders.length} orders. Processing...`);

  if (orders.length === 0) {
    console.log('No orders found to export!');
    return;
  }

  // Clone/cast to match calculations
  const rawData: any[] = JSON.parse(JSON.stringify(orders));

  const workbook = XLSX.utils.book_new();

  // --- STYLES ---
  const borderThin = {
    top: { style: 'thin', color: { rgb: '000000' } },
    bottom: { style: 'thin', color: { rgb: '000000' } },
    left: { style: 'thin', color: { rgb: '000000' } },
    right: { style: 'thin', color: { rgb: '000000' } }
  };

  const styleHeaderYellow = {
    fill: { fgColor: { rgb: 'FFFF00' } },
    font: { bold: true, name: 'Calibri' },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: borderThin
  };

  const styleHeaderGray = {
    fill: { fgColor: { rgb: 'D9D9D9' } },
    font: { bold: true, name: 'Calibri' },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: borderThin
  };

  const styleHeaderBlue = {
    fill: { fgColor: { rgb: '1F4E78' } },
    font: { bold: true, color: { rgb: 'FFFFFF' }, name: 'Calibri' },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: borderThin
  };

  const styleData = {
    font: { name: 'Calibri' },
    alignment: { vertical: 'center' },
    border: borderThin
  };

  const styleNumber = {
    ...styleData,
    alignment: { horizontal: 'right', vertical: 'center' },
    numFmt: '#,##0.00'
  };

  const styleTitle = {
    font: { bold: true, size: 16, name: 'Calibri' },
    alignment: { horizontal: 'center', vertical: 'center' }
  };

  const styleSubTitle = {
    font: { bold: true, italic: true, name: 'Calibri' },
    alignment: { horizontal: 'center', vertical: 'center' }
  };

  // ==========================================
  // SHEET 1: TỔNG HỢP (Summary)
  // ==========================================
  console.log('Generating Sheet 1 (Summary)...');
  const summaryRows: any[][] = [];
  
  // Row 1: Title
  summaryRows.push(['TỔNG HỢP CÔNG NỢ PHẢI THU KHÁCH HÀNG']);
  // Row 2: Subtitles
  summaryRows.push(['Tài khoản: 131', '', '', '', '', '', 'Từ ngày ' + moment(Batdau).format('DD/MM/YYYY') + ' Đến ngày ' + moment(Ketthuc).format('DD/MM/YYYY')]);
  // Row 3: Headers Line 1
  summaryRows.push(['NHÓM KHÁCH HÀNG', 'Tên khách hàng', 'TK công nợ', 'Số dư đầu kỳ', 'Phát sinh tăng\n(DOANH SỐ TỔNG-VAT)', 'Phát sinh giảm', 'Số dư cuối kỳ', 'Trong đó', '']);
  // Row 4: Headers Line 2
  summaryRows.push(['', '', '', '', '', '', '', 'Tháng ' + moment(Ketthuc).format('MM/YYYY'), '']);

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryRows);
  
  summarySheet['A1'].s = styleTitle;
  summarySheet['A2'].s = styleSubTitle;
  summarySheet['G2'].s = styleSubTitle;

  ['A3', 'B3', 'E3'].forEach(c => {
    if (summarySheet[c]) summarySheet[c].s = styleHeaderYellow;
  });
  ['C3', 'D3', 'F3', 'G3', 'H3', 'I3', 'H4', 'I4'].forEach(c => {
    if (summarySheet[c]) summarySheet[c].s = styleHeaderGray;
  });

  // Recalculate totals
  rawData.forEach(order => {
    const orderItems = (order.sanpham || []).filter((it: any) => Number(it.slnhan) > 0);
    const isShowVat = order.isshowvat === true;
    
    let orderTotalBeforeVat = 0;
    let orderTotalAfterVat = 0;
    let orderTotalVat = 0;
    
    orderItems.forEach((item: any) => {
      const vatRate = isShowVat ? (Number(item.vat) || 0) : 0;
      const ttPreVat = (Number(item.slnhan) || 0) * (Number(item.giaban) || 0);
      const ttAfterVat = ttPreVat * (1 + vatRate);
      
      orderTotalBeforeVat += ttPreVat;
      orderTotalAfterVat += ttAfterVat;
      orderTotalVat += (ttAfterVat - ttPreVat);
    });
    
    order.calculatedTotalBeforeVat = orderTotalBeforeVat;
    order.calculatedTotalAfterVat = orderTotalAfterVat;
    order.calculatedTotalVat = orderTotalVat;
  });

  // Group by Customer
  const customerGroupsMap = new Map();
  rawData.forEach(order => {
    const customerId = order.khachhang?.id || 'unknown';
    if (!customerGroupsMap.has(customerId)) {
      customerGroupsMap.set(customerId, {
        groupName: (order.khachhang?.nhomkhachhang && order.khachhang.nhomkhachhang.length > 0) 
          ? order.khachhang.nhomkhachhang[0].name 
          : 'Chưa phân nhóm',
        customerName: order.khachhang?.name || 'Chưa tên',
        makh: order.khachhang?.makh || '',
        increase: 0,
        decrease: 0,
      });
    }
    const group = customerGroupsMap.get(customerId);
    group.increase += order.calculatedTotalAfterVat;
  });

  let currentRowIdx = 4;
  const sortedCustomers = Array.from(customerGroupsMap.values()).sort((a, b) => a.groupName.localeCompare(b.groupName));
  
  const mergesSummary: any[] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 8 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } },
    { s: { r: 1, c: 6 }, e: { r: 1, c: 8 } },
    { s: { r: 2, c: 0 }, e: { r: 3, c: 0 } },
    { s: { r: 2, c: 1 }, e: { r: 3, c: 1 } },
    { s: { r: 2, c: 2 }, e: { r: 3, c: 2 } },
    { s: { r: 2, c: 3 }, e: { r: 3, c: 3 } },
    { s: { r: 2, c: 4 }, e: { r: 3, c: 4 } },
    { s: { r: 2, c: 5 }, e: { r: 3, c: 5 } },
    { s: { r: 2, c: 6 }, e: { r: 3, c: 6 } },
    { s: { r: 2, c: 7 }, e: { r: 2, c: 8 } },
  ];

  let lastGroupName = '';
  let groupStartRow = currentRowIdx;

  sortedCustomers.forEach((cust, idx) => {
    const row = [
      cust.groupName,
      cust.customerName,
      '131',
      0,
      cust.increase,
      0,
      cust.increase,
      cust.increase,
      ''
    ];
    XLSX.utils.sheet_add_aoa(summarySheet, [row], { origin: currentRowIdx });
    
    for (let c = 0; c <= 8; c++) {
      const cellRef = XLSX.utils.encode_cell({ r: currentRowIdx, c: c });
      summarySheet[cellRef].s = (c >= 3) ? styleNumber : styleData;
    }

    if (cust.groupName !== lastGroupName) {
      if (idx > 0 && currentRowIdx - groupStartRow > 1) {
        mergesSummary.push({ s: { r: groupStartRow, c: 0 }, e: { r: currentRowIdx - 1, c: 0 } });
      }
      lastGroupName = cust.groupName;
      groupStartRow = currentRowIdx;
    }

    currentRowIdx++;
  });

  if (currentRowIdx - groupStartRow > 1) {
    mergesSummary.push({ s: { r: groupStartRow, c: 0 }, e: { r: currentRowIdx - 1, c: 0 } });
  }

  summarySheet['!merges'] = mergesSummary;
  summarySheet['!cols'] = [
    { wch: 25 }, { wch: 35 }, { wch: 12 }, { wch: 15 }, { wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }
  ];

  applyBorders(summarySheet, borderThin);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Tổng Hợp');

  // ==========================================
  // SHEET 2: CHI TIẾT (Details)
  // ==========================================
  console.log('Generating Sheet 2 (Details)...');
  const detailHeaders = [
    'Ngày Giao', 'Mã Khách Hàng', 'Tên Khách Hàng', 'Mã Đơn Hàng', 'Mã Hàng', 'Tên Hàng', 'ĐVT', 
    'Số Lượng', 'Đơn Giá', 'Thành Tiền Trước VAT', 'Ghi Chú', 'VAT (%)', 'Đơn Giá VAT', 'Thành Tiền Sau VAT', 
    'Tổng Tiền Sau Thuế', 'Tổng Tiền Trước Thuế', 'Tổng Cộng Khách Hàng'
  ];

  const detailRows: any[][] = [detailHeaders];
  const detailSheet = XLSX.utils.aoa_to_sheet(detailRows);

  for (let c = 0; c < detailHeaders.length; c++) {
    const cellRef = XLSX.utils.encode_cell({ r: 0, c: c });
    detailSheet[cellRef].s = styleHeaderBlue;
  }

  let detailRowIdx = 1;
  const mergesDetail: any[] = [];
  
  const customerGrandTotals = new Map();
  rawData.forEach(order => {
    const custId = order.khachhang?.id;
    customerGrandTotals.set(custId, (customerGrandTotals.get(custId) || 0) + order.calculatedTotalAfterVat);
  });

  rawData.forEach(order => {
    const items = (order.sanpham || []).filter((it: any) => Number(it.slnhan) > 0);
    if (items.length === 0) return;

    const startRow = detailRowIdx;
    const custId = order.khachhang?.id;

    items.forEach((item: any, idx: number) => {
      const isShowVat = order.isshowvat === true;
      const vatRate = isShowVat ? (Number(item.vat) || 0) : 0;
      
      const giabanPreVat = Number(item.giaban) || 0;
      const ttPreVat = (Number(item.slnhan) || 0) * giabanPreVat;
      const ttAfterVat = ttPreVat * (1 + vatRate);

      const rowDataArr = [
        moment(order.ngaygiao).format('DD/MM/YYYY'),
        order.khachhang?.makh || '',
        order.khachhang?.name || '',
        order.madonhang || '',
        item.sanpham?.masp || '',
        item.sanpham?.title || '',
        item.sanpham?.dvt || '',
        Number(item.slnhan) || 0,
        giabanPreVat,
        ttPreVat,
        item.ghichu || '',
        (vatRate * 100) + '%',
        giabanPreVat * (1 + vatRate),
        ttAfterVat,
        idx === 0 ? order.calculatedTotalAfterVat : '',
        idx === 0 ? order.calculatedTotalBeforeVat : '',
        idx === 0 ? customerGrandTotals.get(custId) : ''
      ];

      XLSX.utils.sheet_add_aoa(detailSheet, [rowDataArr], { origin: detailRowIdx });

      for (let c = 0; c < rowDataArr.length; c++) {
        const cellRef = XLSX.utils.encode_cell({ r: detailRowIdx, c: c });
        const isNumber = [7, 8, 9, 12, 13, 14, 15, 16].includes(c);
        detailSheet[cellRef].s = isNumber ? styleNumber : styleData;
      }
      detailRowIdx++;
    });

    if (items.length > 0) {
      [0, 1, 2, 3, 14, 15, 16].forEach(c => {
        mergesDetail.push({ s: { r: startRow, c }, e: { r: detailRowIdx - 1, c } });
      });
    }
  });

  detailSheet['!merges'] = mergesDetail;
  detailSheet['!cols'] = detailHeaders.map(() => ({ wch: 18 }));

  applyBorders(detailSheet, borderThin);
  XLSX.utils.book_append_sheet(workbook, detailSheet, 'Chi Tiết');

  // --- SAVE WORKBOOK ---
  console.log('Writing file to disk...');
  const reportDir = '/home/kata/Coding/rausachfinal/docs/report';
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const finalFilePath = path.join(reportDir, 'Congno_01_01_2026_31_05_2026.xlsx');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  
  fs.writeFileSync(finalFilePath, excelBuffer);
  console.log(`SUCCESS: Exported report successfully to ${finalFilePath}`);
}

function applyBorders(ws: any, borderThin: any) {
  if (!ws || !ws['!ref']) return;
  const range = XLSX.utils.decode_range(ws['!ref']);
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell_address = { c: C, r: R };
      const cell_ref = XLSX.utils.encode_cell(cell_address);
      if (!ws[cell_ref]) ws[cell_ref] = { t: 'z', v: '' };
      if (!ws[cell_ref].s) ws[cell_ref].s = {};
      ws[cell_ref].s.border = borderThin;
    }
  }
}

main()
  .catch(err => {
    console.error('CRITICAL ERROR:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
