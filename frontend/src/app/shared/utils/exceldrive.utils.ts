import moment from 'moment';
import * as XLSX from 'xlsx';
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

export function readExcelFile(event: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      try {
        const data = new Uint8Array((e.target as any).result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        resolve(jsonData);
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
