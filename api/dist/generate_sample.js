"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExcelJS = require("exceljs");
async function generateSummaryReport() {
    console.log('Starting summary report generation...');
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Tổng Hợp Công Nợ');
    const columns = [
        { key: 'nhomkhachhang', width: 20 },
        { key: 'tenkhachhang', width: 35 },
        { key: 'tkcongno', width: 12 },
        { key: 'sodudauky', width: 18 },
        { key: 'phatsinhtang', width: 20 },
        { key: 'phatsinhgiam', width: 18 },
        { key: 'soducuoiky', width: 18 },
        { key: 'thang1', width: 15 },
        { key: 'thang2', width: 15 },
        { key: 'thang3', width: 15 },
    ];
    worksheet.columns = columns;
    worksheet.mergeCells('A1:J1');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'TỔNG HỢP CÔNG NỢ PHẢI THU KHÁCH HÀNG';
    titleCell.font = { name: 'Arial', bold: true, size: 16 };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.getRow(1).height = 35;
    worksheet.mergeCells('A2:F2');
    const subTitle1 = worksheet.getCell('A2');
    subTitle1.value = 'Tài khoản: 131, Tháng/NĂM';
    subTitle1.font = { name: 'Arial', italic: true, bold: true, size: 11 };
    subTitle1.alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.mergeCells('G2:H2');
    const dateRangeCell = worksheet.getCell('G2');
    dateRangeCell.value = 'Ngày ... Đến....';
    dateRangeCell.font = { name: 'Arial', italic: true, bold: true, size: 11 };
    dateRangeCell.alignment = { horizontal: 'left', vertical: 'middle' };
    worksheet.getRow(2).height = 25;
    const headerRow = worksheet.getRow(3);
    headerRow.height = 40;
    worksheet.getCell('A3').value = 'NHÓM KHÁCH HÀNG';
    worksheet.getCell('B3').value = 'Tên khách hàng';
    worksheet.getCell('C3').value = 'TK công nợ';
    worksheet.getCell('D3').value = 'Số dư đầu kỳ';
    worksheet.getCell('E3').value = 'Phát sinh tăng\n(DOANH SỐ TỔNG-VAT)';
    worksheet.getCell('F3').value = 'Phát sinh giảm';
    worksheet.getCell('G3').value = 'Số dư cuối kỳ';
    worksheet.getCell('H3').value = 'Trong đó';
    worksheet.mergeCells('A3:A4');
    worksheet.mergeCells('B3:B4');
    worksheet.mergeCells('C3:C4');
    worksheet.mergeCells('D3:D4');
    worksheet.mergeCells('E3:E4');
    worksheet.mergeCells('F3:F4');
    worksheet.mergeCells('G3:G4');
    worksheet.mergeCells('H3:J3');
    worksheet.getCell('H3').value = 'Trong đó';
    worksheet.getCell('H3').alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.getCell('H3').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9D9D9' } };
    worksheet.getCell('H3').font = { bold: true };
    worksheet.getCell('H3').border = { top: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' } };
    worksheet.getCell('H4').value = 'Tháng';
    worksheet.getCell('I4').value = 'Tháng';
    worksheet.getCell('J4').value = 'Tháng';
    const yellowColor = 'FFFFFF00';
    const grayColor = 'FFD9D9D9';
    const setHeaderStyle = (cellStr, color) => {
        const cell = worksheet.getCell(cellStr);
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: color } };
        cell.font = { name: 'Arial', bold: true, size: 10 };
        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' } };
    };
    setHeaderStyle('A3', yellowColor);
    setHeaderStyle('B3', yellowColor);
    setHeaderStyle('C3', grayColor);
    setHeaderStyle('D3', grayColor);
    setHeaderStyle('E3', yellowColor);
    setHeaderStyle('F3', grayColor);
    setHeaderStyle('G3', grayColor);
    setHeaderStyle('H4', grayColor);
    setHeaderStyle('I4', grayColor);
    setHeaderStyle('J4', grayColor);
    const mockData = [
        {
            group: 'BÒ TƠ',
            name: 'BO TO BT',
            tk: '',
            sdk: '',
            pst: '',
            psg: '',
            sck: ''
        },
        {
            group: 'BÒ TƠ',
            name: 'BO TO BT (NV)',
            tk: '',
            sdk: '',
            pst: '',
            psg: '',
            sck: ''
        },
        {
            group: 'BÒ TƠ',
            name: 'BAR',
            tk: '',
            sdk: '',
            pst: '',
            psg: '',
            sck: ''
        },
        {
            group: 'BÒ TƠ',
            name: 'BT Q10',
            tk: '',
            sdk: '',
            pst: '',
            psg: '',
            sck: ''
        },
        {
            group: 'LONGWANG',
            name: '',
            tk: '',
            sdk: '',
            pst: '',
            psg: '',
            sck: ''
        }
    ];
    let currentRow = 5;
    const row5 = worksheet.getRow(5);
    row5.values = ['', 'BO TO BT', '', '', '', '', '', '', '', ''];
    const row6 = worksheet.getRow(6);
    row6.values = ['', 'BO TO BT (NV)', '', '', '', '', '', '', '', ''];
    const row7 = worksheet.getRow(7);
    row7.values = ['', 'BAR', '', '', '', '', '', '', '', ''];
    const row8 = worksheet.getRow(8);
    row8.values = ['', 'BT Q10', '', '', '', '', '', '', '', ''];
    worksheet.mergeCells('A5:A8');
    const groupCell1 = worksheet.getCell('A5');
    groupCell1.value = 'BÒ TƠ';
    groupCell1.alignment = { horizontal: 'center', vertical: 'middle' };
    groupCell1.font = { bold: true };
    groupCell1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: yellowColor } };
    for (let r = 5; r <= 9; r++) {
        worksheet.getRow(r).eachCell({ includeEmpty: true }, (cell, colNumber) => {
            if (colNumber <= 10) {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                if ([3, 4, 6, 7, 8, 9, 10].includes(colNumber)) {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFEFEF' } };
                }
            }
        });
    }
    const row9 = worksheet.getRow(9);
    row9.getCell(1).value = 'LONGWANG';
    row9.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: yellowColor } };
    const outputPath = '/mnt/chikiet/kata2025/rausachfinal/api/BaoCaoCongNo_Mau_TongHop.xlsx';
    await workbook.xlsx.writeFile(outputPath);
    console.log(`Summary Report generated at: ${outputPath}`);
}
generateSummaryReport().catch(err => {
    console.error('Error:', err);
});
//# sourceMappingURL=generate_sample.js.map