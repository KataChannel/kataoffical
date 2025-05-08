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
    ['ngay','makhold', 'makh', 'tenkh', 'mabangia', 'masp','tensp' ,'sldat', 'slgiao', 'slnhan'],
    ['Ngày', 'Mã Cũ','Mã Mới', 'Tên Khách Hàng', 'Bảng Giá', 'Mã Sản Phẩm','Tên Sản Phẩm', 'SL Đặt', 'SL Giao', 'SL Nhận'],
    [moment().format('DD/MM/YYYY'), 'C100755', '', '', '', 'I100001', '', '1', '', ''],
    ['', '', '', '', '', '', '', '', ''],
  ];

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);


  // Define cell styling constants for reuse
  const redFontStyle = { font: { color: { rgb: 'FF0000' } } };

  // Define formula cell configurations for clarity
  const formulaCells = [
    { cell: 'C3', formula: 'VLOOKUP(B3,KH!A:D,3,0)', type: 's' },
    { cell: 'D3', formula: 'VLOOKUP(B3,KH!A:D,2,0)', type: 's' },
    { cell: 'G3', formula: 'VLOOKUP(F3,SP!B:D,2,0)', type: 's' },
    { cell: 'I3', formula: 'H3', type: 'n' },
    { cell: 'J3', formula: 'H3', type: 'n' },
  ];
  
  formulaCells.forEach(({ cell, formula, type }) => {
    summarySheet[cell] = {
      f: formula,
      t: type,
      s: redFontStyle
    };
  });

  const summarySheetName = 'Donhang';
  workbook.SheetNames.push(summarySheetName);
  workbook.Sheets[summarySheetName] = summarySheet;

  // Ghi file excel
  const excelBuffer: any = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });
  saveAsExcelFile(excelBuffer, `${title}_${moment().format('DD_MM_YYYY')}`);
}




export function UploadDathang(
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
    ['ngay', 'mancc', 'name', 'mabangia', 'masp','tensp' ,'sldat', 'slgiao', 'slnhan'],
    ['Ngày', 'Mã NCC', 'Nhà Cung Cấp', 'Bảng Giá', 'Mã Sản Phẩm','Tên Sản Phẩm', 'SL Đặt', 'SL Giao', 'SL Nhận'],
    [moment().format('DD/MM/YYYY'), 'TG-NCC0001', '', '', 'I100001', '', '1', '', ''],
    ['', '', '', '', '', '', '', '', ''],
  ];

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);


  // Define cell styling constants for reuse
  const redFontStyle = { font: { color: { rgb: 'FF0000' } } };

  // Define formula cell configurations for clarity
  const formulaCells = [
    { cell: 'C3', formula: 'VLOOKUP(B3,NCC!A:D,2,0)', type: 's' },
    { cell: 'D3', formula: 'VLOOKUP(B3,NCC!A:D,3,0)', type: 's' },
    { cell: 'F3', formula: 'VLOOKUP(E3,SP!B:D,2,0)', type: 's' },
    { cell: 'H3', formula: 'G3', type: 'n' },
    { cell: 'I3', formula: 'G3', type: 'n' },

    { cell: 'A4', formula: 'A3', type: 's' },
    { cell: 'B4', formula: 'B3', type: 's' },
    { cell: 'C4', formula: 'VLOOKUP(B4,NCC!A:C,2,0)', type: 's' },
    { cell: 'D4', formula: 'VLOOKUP(B4,NCC!A:C,3,0)', type: 's' },
    { cell: 'F4', formula: 'VLOOKUP(E4,SP!B:D,2,0)', type: 's' },
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

  const summarySheetName = 'Dathang';
  workbook.SheetNames.push(summarySheetName);
  workbook.Sheets[summarySheetName] = summarySheet;
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

export function readExcelFile(event: any, sheetName?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    // Chuẩn Angular CLI: import worker qua URL
    const worker = new Worker(
      new URL('./excel.worker', import.meta.url),
      { type: 'module' }
    );
    worker.postMessage({ file: event, sheetName });
    worker.onmessage = (e: MessageEvent) => {
      if (e.data.result) {
        resolve(e.data.result);
      } else {
        reject(e.data.error);
      }
      worker.terminate();
    };
    worker.onerror = (err) => {
      reject(err);
      worker.terminate();
    };
  });
}
export function readExcelFileNoWorker(event: any, sheetName?: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const file = event.target?.files?.[0] || event;
    if (!file) {
      reject('No file provided');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        let result:any;
        if (sheetName && workbook.SheetNames.includes(sheetName)) {
          result = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });
        } else {
          result = {};
          workbook.SheetNames.forEach(name => {
            result[name] = XLSX.utils.sheet_to_json(workbook.Sheets[name], { defval: '' });
          });
        }
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
}
