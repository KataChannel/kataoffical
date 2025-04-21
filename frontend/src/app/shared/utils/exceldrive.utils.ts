import moment from 'moment';
// import * as XLSX from 'xlsx';
import * as XLSX from 'xlsx-js-style';   
export function writeExcelFile(
  data: any,
  title: string,
  headers: string[] = [],
  mapping: { [key: string]: string } = {}
): void {
  const transfer = data.map((item: any) => {
    let newItem: { [key: string]: any } = {};
    headers.forEach((headerKey: string) => {
      // Tìm key tương ứng trong mapping
      const dataKey = Object.keys(mapping).find(key => mapping[key] === headerKey);
      newItem[headerKey] = dataKey ? item[dataKey] || null : null;
    });
    return newItem;
  });
  const transformedData = headers.length > 0 && Object.keys(mapping).length > 0 ? transfer: data;
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(transformedData);
  const workbook: XLSX.WorkBook = {
    Sheets: { Sheet1: worksheet },
    SheetNames: ['Sheet1'],
  };

  const excelBuffer: any = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  saveAsExcelFile(excelBuffer, `${title}_${moment().format('DD_MM_YYYY')}`);
}

export function writeExcelFileWithSheets(
  sheetsData: { [sheetName: string]: any[] },
  title: string = 'Excel_Export'
): void {
  const workbook: XLSX.WorkBook = { Sheets: {}, SheetNames: [] };

  // Thêm các sheet dữ liệu gốc
  Object.keys(sheetsData).forEach(sheetName => {
    const worksheet = XLSX.utils.json_to_sheet(sheetsData[sheetName]);
    workbook.SheetNames.push(sheetName);
    workbook.Sheets[sheetName] = worksheet;
  });

  // ✅ Tạo dữ liệu cho sheet summary đúng như ảnh
  const summaryData: any[][] = [
    ['ngay', 'makh', 'tenkh', 'mabangia', 'masp','tensp' ,'sldat', 'slgiao', 'slnhan'],
    ['Ngày', 'Khách hàng', 'Tên Khách Hàng', 'Bảng Giá', 'Mã Sản Phẩm','Tên Sản Phẩm', 'SL Đặt', 'SL Giao', 'SL Nhận'],
    [moment().format('DD/MM/YYYY'), 'TG-KS00001', '', '', 'I100001', '', '1', '', ''],
    ['', '', '', '', '', '', '', '', ''],
  ];

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);


  // Define cell styling constants for reuse
  const redFontStyle = { font: { color: { rgb: 'FF0000' } } };

  // Define formula cell configurations for clarity
  const formulaCells = [
    { cell: 'C3', formula: 'VLOOKUP(B3,Sheet1!A:C,2,0)', type: 's' },
    { cell: 'D3', formula: 'VLOOKUP(B3,Sheet1!A:C,3,0)', type: 's' },
    { cell: 'F3', formula: 'VLOOKUP(E3,Sheet2!A:B,2,0)', type: 's' },
    { cell: 'H3', formula: 'G3', type: 'n' },
    { cell: 'I3', formula: 'G3', type: 'n' },

    { cell: 'A4', formula: 'A3', type: 's' },
    { cell: 'B4', formula: 'B3', type: 's' },
    { cell: 'C4', formula: 'VLOOKUP(B4,Sheet1!A:C,2,0)', type: 's' },
    { cell: 'D4', formula: 'VLOOKUP(B4,Sheet1!A:C,3,0)', type: 's' },
    { cell: 'F4', formula: 'VLOOKUP(E4,Sheet2!A:B,2,0)', type: 's' },
    { cell: 'H4', formula: 'G4', type: 'n' },
    { cell: 'I4', formula: 'G4', type: 'n' }
  ];
  
  formulaCells.forEach(({ cell, formula, type }) => {
    summarySheet[cell] = {
      f: formula,
      t: type,
      s: redFontStyle
    };
  });

  const summarySheetName = 'Donhang';
  // const redStyle = {
  //   font: { color: { rgb: 'FF0000' } }, // Màu đỏ
  // };

  // for (let row = 0; row < 3; row++) {
  //   for (let col = 0; col < 8; col++) {
  //     const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
  //     if (summarySheet[cellRef]) {
  //       summarySheet[cellRef].s = redStyle;
  //     }
  //   }
  // }
  workbook.SheetNames.push(summarySheetName);
  workbook.Sheets[summarySheetName] = summarySheet;

  // Ghi file excel
  const excelBuffer: any = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  saveAsExcelFile(excelBuffer, `${title}_${moment().format('DD_MM_YYYY')}`);
}

function saveAsExcelFile(buffer: any, fileName: string) {
  const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
  const url: string = window.URL.createObjectURL(data);
  const link: HTMLAnchorElement = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.xlsx`;
  link.click();
  window.URL.revokeObjectURL(url);
  link.remove();
}

export function readExcelFile(event: any,sheetName?:any): Promise<any> {
  return new Promise((resolve, reject) => {
    const file = event;
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      try {
        const data = new Uint8Array((e.target as any).result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sn:any = sheetName || workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sn];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        const result = jsonData.map((item: any) => {
          if (item.ngay === undefined || item.makh === undefined || item.masp === undefined || item.sldat === undefined) {
            return null; // Hoặc xử lý theo cách bạn muốn
          }
          return {
            ngay: moment(item.ngay, "DD/MM/YYYY").toDate(),
            makh: item.makh,
            tenkh: item.tenkh,  
            mabangia: item.mabangia,
            masp: item.masp,
            tensp: item.tensp,
            sldat: item.sldat,
            slgiao: item.sldat,
            slnhan: item.sldat,
          }
        }).filter(item => item !== null);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
    fileReader.readAsArrayBuffer(file);
  });
}
