
import { PrismaClient } from '@prisma/client';
import * as ExcelJS from 'exceljs';
import * as moment from 'moment-timezone';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function downloadcongnokhachhang(params: any) {
    const { Batdau, Ketthuc, query, ids, Status } = params;
    
    // Date Range Setup
    const dateRange = {
        gte: Batdau ? new Date(Batdau) : undefined,
        lte: Ketthuc ? new Date(Ketthuc) : undefined,
    };

    const where: any = {
      ngaygiao: dateRange,
      status: Array.isArray(Status) ? { in: Status } : Status,
    };

    if(ids?.length > 0){
      where.id = { in: ids };
    }

    if (query) {
      where.OR = [
        { madonhang: { contains: query, mode: 'insensitive' } },
        { khachhang: { name: { contains: query, mode: 'insensitive' } } },
      ];
    }
    
    console.log('Fetching data with params:', JSON.stringify(params, null, 2));

    // Fetch orders with relations + Groups
    const donhangs = await prisma.donhang.findMany({
      where,
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: { 
            include: { 
                nhomkhachhang: true // Fetch Group info
            } 
        },
      },
      orderBy: { ngaygiao: 'asc' },
    });
    
    console.log(`Found ${donhangs.length} orders.`);

    // Process Data for Summary Report
    const groupedData = new Map<string, Map<string, any>>();
    const allMonths = new Set<string>();

    for (const dh of donhangs) {
        if (!dh.khachhang) continue;

        // Determine Customer Group
        const groupName = dh.khachhang.nhomkhachhang && dh.khachhang.nhomkhachhang.length > 0 
            ? dh.khachhang.nhomkhachhang[0].name 
            : 'Khác';
        
        const customerId = dh.khachhang.id;
        const customerName = dh.khachhang.name || 'Khách lẻ';

        // Init Group Map
        if (!groupedData.has(groupName)) {
            groupedData.set(groupName, new Map());
        }
        const groupCustomers = groupedData.get(groupName)!;

        // Init Customer Data
        if (!groupCustomers.has(customerId)) {
            groupCustomers.set(customerId, {
                groupName: groupName,
                customerName: customerName,
                customerId: customerId,
                tkCongNo: '131',
                soDuDauKy: 0,
                phatSinhTang: 0,
                phatSinhGiam: 0,
                soDuCuoiKy: 0,
                monthlyData: new Map<string, number>()
            });
        }
        const customerData = groupCustomers.get(customerId)!;

        // Calculate Order Total (Sau VAT)
        let orderTotal = 0;
        for (const sp of dh.sanpham) {
            const slnhan = Number(sp.slnhan) || 0;
            if (slnhan > 0) {
                 const giaban = Number(sp.giaban) || 0;
                 const vat = dh.isshowvat ? (Number(sp.sanpham?.vat) || 0) : 0;
                 orderTotal += (slnhan * giaban) * (1 + vat);
            }
        }

        // Aggregate
        customerData.phatSinhTang += orderTotal;
        customerData.soDuCuoiKy += orderTotal; 

        // Month Breakdown
        if (dh.ngaygiao) {
            const monthKey = moment(dh.ngaygiao).tz('Asia/Ho_Chi_Minh').format('MM/YYYY');
            allMonths.add(monthKey);
            const currentMonthVal = customerData.monthlyData.get(monthKey) || 0;
            customerData.monthlyData.set(monthKey, currentMonthVal + orderTotal);
        }
    }

    // Sort months
    const sortedMonths = Array.from(allMonths).sort((a, b) => {
        return moment(a, 'MM/YYYY').toDate().getTime() - moment(b, 'MM/YYYY').toDate().getTime();
    });

    console.log('Months found:', sortedMonths);

    return createSummaryExcelFile(groupedData, sortedMonths, params);
  }

  /**
   * Helper to create Summary Excel Report
   */
  async function createSummaryExcelFile(groupedData: Map<string, Map<string, any>>, sortedMonths: string[], params: any) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Tổng Hợp Công Nợ');

    const columns: any[] = [
        { key: 'nhomkhachhang', width: 25 },     
        { key: 'tenkhachhang', width: 40 },       
        { key: 'tkcongno', width: 12 },           
        { key: 'sodudauky', width: 18 },          
        { key: 'phatsinhtang', width: 22 },       
        { key: 'phatsinhgiam', width: 18 },       
        { key: 'soducuoiky', width: 22 },         
    ];

    sortedMonths.forEach((month, index) => {
        columns.push({ key: `month_${index}`, width: 18 });
    });

    worksheet.columns = columns;
    const totalColsChar = getColumnLetter(columns.length); // Dynamic column letter

    // Header Info
    worksheet.mergeCells(`A1:${totalColsChar}1`);
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'TỔNG HỢP CÔNG NỢ PHẢI THU KHÁCH HÀNG';
    titleCell.font = { name: 'Arial', bold: true, size: 16 };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.getRow(1).height = 35;

    worksheet.mergeCells(`A2:F2`);
    worksheet.getCell('A2').value = `Tài khoản: 131`; 
    worksheet.getCell('A2').font = { name: 'Arial', italic: true, bold: true, size: 11 };
    worksheet.getCell('A2').alignment = { horizontal: 'center', vertical: 'middle' };

    worksheet.mergeCells(`G2:${totalColsChar}2`);
    const startDate = params.Batdau ? moment(params.Batdau).format('DD/MM/YYYY') : '...';
    const endDate = params.Ketthuc ? moment(params.Ketthuc).format('DD/MM/YYYY') : '...';
    worksheet.getCell('G2').value = `Từ ngày ${startDate} Đến ngày ${endDate}`;
    worksheet.getCell('G2').font = { name: 'Arial', italic: true, bold: true, size: 11 };
    worksheet.getCell('G2').alignment = { horizontal: 'left', vertical: 'middle' };
    worksheet.getRow(2).height = 25;

    // Headers
    const setHeader = (ref: string, val: string, color = 'FFFFFF00') => {
        const c = worksheet.getCell(ref);
        c.value = val;
        c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: color } };
        c.font = { name: 'Arial', bold: true, size: 10 };
        c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        c.border = { top: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'}, bottom: {style:'thin'} };
    };

    ['A', 'B', 'C', 'D', 'E', 'F', 'G'].forEach(col => worksheet.mergeCells(`${col}3:${col}4`));
    worksheet.getRow(3).height = 40;

    setHeader('A3', 'NHÓM KHÁCH HÀNG');
    setHeader('B3', 'Tên khách hàng');
    setHeader('C3', 'TK công nợ', 'FFD9D9D9');
    setHeader('D3', 'Số dư đầu kỳ', 'FFD9D9D9');
    setHeader('E3', 'Phát sinh tăng\n(DOANH SỐ TỔNG-VAT)');
    setHeader('F3', 'Phát sinh giảm', 'FFD9D9D9');
    setHeader('G3', 'Số dư cuối kỳ', 'FFD9D9D9');

    if (sortedMonths.length > 0) {
        const startMonthColIndex = 7; 
        const endMonthColIndex = startMonthColIndex + sortedMonths.length - 1;
        const startColChar = getColumnLetter(startMonthColIndex + 1);
        const endColChar = getColumnLetter(endMonthColIndex + 1);
        
        worksheet.mergeCells(`${startColChar}3:${endColChar}3`);
        const tdHeader = worksheet.getCell(`${startColChar}3`);
        tdHeader.value = 'Trong đó';
        tdHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9D9D9' } };
        tdHeader.font = { name: 'Arial', bold: true, size: 10 };
        tdHeader.alignment = { horizontal: 'center', vertical: 'middle' };
        tdHeader.border = { top: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'}, bottom: {style:'thin'} };

        sortedMonths.forEach((month, idx) => {
            const colChar = getColumnLetter(startMonthColIndex + 1 + idx);
            setHeader(`${colChar}4`, `Tháng ${month}`, 'FFD9D9D9');
        });
    }

    // Data
    let currentRowIndex = 5;
    const sortedGroups = Array.from(groupedData.keys()).sort();

    for (const groupName of sortedGroups) {
        const customers = groupedData.get(groupName)!;
        const sortedCustomerIds = Array.from(customers.keys());
        if (sortedCustomerIds.length === 0) continue;

        const groupStartRow = currentRowIndex;

        for (const custId of sortedCustomerIds) {
            const custData = customers.get(custId)!;
            const row = worksheet.getRow(currentRowIndex);
            
            row.getCell(1).value = groupName; 
            row.getCell(2).value = custData.customerName;
            row.getCell(3).value = custData.tkCongNo;
            row.getCell(4).value = custData.soDuDauKy || '';
            row.getCell(5).value = custData.phatSinhTang;
            row.getCell(6).value = custData.phatSinhGiam || '';
            row.getCell(7).value = custData.soDuCuoiKy;

            sortedMonths.forEach((month, idx) => {
                row.getCell(8 + idx).value = custData.monthlyData.get(month) || '';
                row.getCell(8 + idx).numFmt = '#,##0.00';
            });

            [4, 5, 6, 7].forEach(c => {
                 row.getCell(c).numFmt = '#,##0.00';
                 row.getCell(c).alignment = { horizontal: 'right' };
            });

            currentRowIndex++;
        }
        
        // Merge Group Name
        if (currentRowIndex - 1 >= groupStartRow) {
            worksheet.mergeCells(`A${groupStartRow}:A${currentRowIndex - 1}`);
            const gCell = worksheet.getCell(`A${groupStartRow}`);
            gCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
            gCell.font = { bold: true };
            gCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF00' } };
        }
    }

    // Borders
    for (let r = 5; r < currentRowIndex; r++) {
         const row = worksheet.getRow(r);
         for (let c = 1; c <= columns.length; c++) {
             row.getCell(c).border = { top: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'}, bottom: {style:'thin'} };
         }
    }

    const outputFilename = 'Real_Data_TongHopCongNo.xlsx';
    const outputPath = path.join(__dirname, outputFilename);
    await workbook.xlsx.writeFile(outputPath);
    console.log(`Report generated successfully at: ${outputPath}`);
  }

function getColumnLetter(colIndex: number): string {
    let letter = '';
    while (colIndex > 0) {
        let temp = (colIndex - 1) % 26;
        letter = String.fromCharCode(temp + 65) + letter;
        colIndex = (colIndex - temp - 1) / 26;
    }
    return letter;
}

// Run the function
async function main() {
    try {
        // Query last 12 months data
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        
        // Or check wider range if DB is sparse
        const params = {
            Batdau: '2025-01-01', // Example date
            Ketthuc: '2026-12-31',
            Status: ['dadat', 'dagiao', 'hoanthanh'] // Assuming these are valid statuses
        };
        
        await downloadcongnokhachhang(params);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
