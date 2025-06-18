/// <reference lib="webworker" />
import * as XLSX from 'xlsx-js-style';
import moment from 'moment';

addEventListener('message', ({ data }) => {
  try {
    const { file, sheetName } = data;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const buffer = new Uint8Array(e.target.result);
      const workbook = XLSX.read(buffer, { type: 'array' });
      const sn: any = sheetName || workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sn];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      const result = jsonData.map((item: any) => {
        if (
          item.ngay === undefined ||
          item.makh === undefined ||
          item.masp === undefined ||
          item.sldat === undefined
        ) {
          return null;
        }
        return {
          ngay: moment(excelSerialDateToJSDate(item.ngay)).toDate(),
          makh: item.makh,
          tenkh: item.tenkh,
          mabangia: item.mabangia,
          masp: item.masp,
          tensp: item.tensp,
          sldat: item.sldat,
          slgiao: item.sldat,
          slnhan: item.sldat,
        };
      }).filter((item: any) => item !== null);
      postMessage({ result });
    };
    reader.onerror = (error) => {
      postMessage({ error });
    };
    reader.readAsArrayBuffer(file);
  } catch (error) {
    postMessage({ error });
  }
});

function excelSerialDateToJSDate(serial: any) {
  const excelEpochOffset = 25569;
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const daysSinceUnixEpoch = serial - excelEpochOffset;
  const utcMilliseconds = daysSinceUnixEpoch * millisecondsPerDay;
  return new Date(utcMilliseconds);
}