
import * as ExcelJS from 'exceljs';
import * as moment from 'moment-timezone';

async function generateSummaryReport() {
    console.log('Starting summary report generation...');
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Tổng Hợp Công Nợ');

    // Define columns based on the image
    const columns = [
        { key: 'nhomkhachhang', width: 20 },      // A: NHÓM KHÁCH HÀNG
        { key: 'tenkhachhang', width: 35 },       // B: Tên khách hàng
        { key: 'tkcongno', width: 12 },           // C: TK công nợ
        { key: 'sodudauky', width: 18 },          // D: Số dư đầu kỳ
        { key: 'phatsinhtang', width: 20 },       // E: Phát sinh tăng
        { key: 'phatsinhgiam', width: 18 },       // F: Phát sinh giảm
        { key: 'soducuoiky', width: 18 },         // G: Số dư cuối kỳ
        { key: 'thang1', width: 15 },             // H: Trong đó - Tháng...
        { key: 'thang2', width: 15 },             // I: Trong đó - Tháng...
        { key: 'thang3', width: 15 },             // J: Trong đó - Tháng...
    ];
    
    worksheet.columns = columns;

    // --- REPORT TITLE ---
    worksheet.mergeCells('A1:J1');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'TỔNG HỢP CÔNG NỢ PHẢI THU KHÁCH HÀNG';
    titleCell.font = { name: 'Arial', bold: true, size: 16 };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.getRow(1).height = 35;

    // --- SUBTITLES ---
    // Row 2: Account info & Date Range
    worksheet.mergeCells('A2:F2');
    const subTitle1 = worksheet.getCell('A2');
    subTitle1.value = 'Tài khoản: 131, Tháng/NĂM'; // Placeholder as per image
    subTitle1.font = { name: 'Arial', italic: true, bold: true, size: 11 };
    subTitle1.alignment = { horizontal: 'center', vertical: 'middle' };

    worksheet.mergeCells('G2:H2');
    const dateRangeCell = worksheet.getCell('G2');
    dateRangeCell.value = 'Ngày ... Đến....';
    dateRangeCell.font = { name: 'Arial', italic: true, bold: true, size: 11 };
    dateRangeCell.alignment = { horizontal: 'left', vertical: 'middle' };
    
    worksheet.getRow(2).height = 25;

    // --- HEADER ROW (Row 3) ---
    const headerRow = worksheet.getRow(3);
    headerRow.height = 40;

    // Set values
    worksheet.getCell('A3').value = 'NHÓM KHÁCH HÀNG';
    worksheet.getCell('B3').value = 'Tên khách hàng';
    worksheet.getCell('C3').value = 'TK công nợ';
    worksheet.getCell('D3').value = 'Số dư đầu kỳ';
    worksheet.getCell('E3').value = 'Phát sinh tăng\n(DOANH SỐ TỔNG-VAT)';
    worksheet.getCell('F3').value = 'Phát sinh giảm';
    worksheet.getCell('G3').value = 'Số dư cuối kỳ';
    worksheet.getCell('H3').value = 'Trong đó'; // Merged header base
    
    // Sub-headers for "Trong đó" row is actually tricky in single row if merged vertically.
    // The image looks like Row 3 allows "Trong đó" spanning H-J, and Row 4 would have "Tháng".
    // Let's assume Row 3 and Row 4 are headers.
    
    // Adjusting for 2-row header for "Trong đó" section
    worksheet.mergeCells('A3:A4'); // Nhóm KH
    worksheet.mergeCells('B3:B4'); // Tên KH
    worksheet.mergeCells('C3:C4'); // TK CN
    worksheet.mergeCells('D3:D4'); // SD ĐK
    worksheet.mergeCells('E3:E4'); // PS Tăng
    worksheet.mergeCells('F3:F4'); // PS Giảm
    worksheet.mergeCells('G3:G4'); // SD CK
    
    worksheet.mergeCells('H3:J3'); // Header "Trong đó"
    worksheet.getCell('H3').value = 'Trong đó';
    worksheet.getCell('H3').alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.getCell('H3').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9D9D9' } }; // Gray
    worksheet.getCell('H3').font = { bold: true };
    worksheet.getCell('H3').border = { top: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'}, bottom: {style:'thin'} };

    // Row 4 sub-headers
    worksheet.getCell('H4').value = 'Tháng';
    worksheet.getCell('I4').value = 'Tháng';
    worksheet.getCell('J4').value = 'Tháng';

    // Styling Main Headers (A3-G3/4)
    const yellowColor = 'FFFFFF00';
    const grayColor = 'FFD9D9D9';

    // Apply styles
    const setHeaderStyle = (cellStr: string, color: string) => {
        const cell = worksheet.getCell(cellStr);
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: color } };
        cell.font = { name: 'Arial', bold: true, size: 10 };
        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        cell.border = { top: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'}, bottom: {style:'thin'} };
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

    // --- DATA ROWS ---
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
            group: 'BÒ TƠ', // Intentionally empty in display to simulate group
            name: 'BT Q10',
            tk: '',
            sdk: '',
            pst: '',
            psg: '',
            sck: ''
        },
        {
            group: 'LONGWANG',
            name: '', // Group header row style
            tk: '',
            sdk: '',
            pst: '',
            psg: '',
            sck: ''
        }
    ];

    let currentRow = 5;
    
    // Logic to merge Groups like in the image (BÒ TƠ spans multiple rows)
    // First group: BÒ TƠ spans 4 rows (5,6,7,8)
    
    // Row 5
    const row5 = worksheet.getRow(5);
    row5.values = ['', 'BO TO BT', '', '', '', '', '', '', '', ''];
    // Row 6
    const row6 = worksheet.getRow(6);
    row6.values = ['', 'BO TO BT (NV)', '', '', '', '', '', '', '', ''];
    // Row 7
    const row7 = worksheet.getRow(7);
    row7.values = ['', 'BAR', '', '', '', '', '', '', '', ''];
    // Row 8
    const row8 = worksheet.getRow(8);
    row8.values = ['', 'BT Q10', '', '', '', '', '', '', '', ''];

    // Merge A5:A8 for "BÒ TƠ"
    worksheet.mergeCells('A5:A8');
    const groupCell1 = worksheet.getCell('A5');
    groupCell1.value = 'BÒ TƠ';
    groupCell1.alignment = { horizontal: 'center', vertical: 'middle' };
    groupCell1.font = { bold: true };
    groupCell1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: yellowColor } };

    // Row 9: LONGWANG (Seems like a group header row in the image, or just a new group start)
    // The image shows "LONGWANG" in column A, row yellow, indicating maybe it's a collapsed group or just header. 
    // Let's create proper borders for data rows
    for(let r=5; r<=9; r++) {
         worksheet.getRow(r).eachCell({ includeEmpty: true }, (cell, colNumber) => {
            if (colNumber <= 10) {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                // Gray background for data columns like in image (C, D, F, G, H, I, J)
                // C=3, D=4, F=6, G=7, H=8, I=9, J=10
                if ([3, 4, 6, 7, 8, 9, 10].includes(colNumber)) {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFEFEF' } }; // Light gray
                }
            }
        });
    }

    // LONGWANG Row (9)
    const row9 = worksheet.getRow(9);
    row9.getCell(1).value = 'LONGWANG';
    row9.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: yellowColor } };
    
    // Special styling for "Tên khách hàng" column B (Yellow bg in header, normal in data)
    // In image, data rows for Tên KH seem white/normal. Header is yellow.
    
    // Output
    const outputPath = '/mnt/chikiet/kata2025/rausachfinal/api/BaoCaoCongNo_Mau_TongHop.xlsx';
    await workbook.xlsx.writeFile(outputPath);
    console.log(`Summary Report generated at: ${outputPath}`);
}

generateSummaryReport().catch(err => {
    console.error('Error:', err);
});
