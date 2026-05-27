import {
  require_moment
} from "./chunk-LIKOVN7R.js";
import {
  require_xlsx_min
} from "./chunk-6ECEDFXD.js";
import {
  __toESM
} from "./chunk-SXK72SKC.js";

// src/app/shared/utils/exceldrive.utils.ts
var import_moment = __toESM(require_moment());
var XLSX = __toESM(require_xlsx_min());
function writeExcelFileSheets(sheetsData, title) {
  const workbook = { Sheets: {}, SheetNames: [] };
  Object.keys(sheetsData).forEach((sheetName) => {
    let { data, headers = [], mapping = {} } = sheetsData[sheetName];
    const finalData = headers.length > 0 && Object.keys(mapping).length > 0 ? data.map((item) => {
      let newItem = {};
      headers.forEach((headerKey) => {
        const dataKey = Object.keys(mapping).find((key) => mapping[key] === headerKey);
        const value = dataKey ? item[dataKey] : null;
        newItem[headerKey] = value === 0 ? 0 : value || null;
      });
      return newItem;
    }) : data;
    const worksheet = finalData.length > 0 && Array.isArray(finalData[0]) ? XLSX.utils.aoa_to_sheet(finalData) : XLSX.utils.json_to_sheet(finalData);
    workbook.SheetNames.push(sheetName);
    workbook.Sheets[sheetName] = worksheet;
    applyBorders(worksheet);
  });
  if (workbook.SheetNames.length === 0) {
    workbook.SheetNames.push("EmptySheet");
    workbook.Sheets["EmptySheet"] = XLSX.utils.aoa_to_sheet([[]]);
  }
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
    cellStyles: true
  });
  saveAsExcelFile(excelBuffer, `${title}_${(0, import_moment.default)().format("DD_MM_YYYY")}`);
}
function writeExcelFile(data, title, headers = [], mapping = {}) {
  const transfer = data.map((item) => {
    let newItem = {};
    headers.forEach((headerKey) => {
      const dataKey = Object.keys(mapping).find((key) => mapping[key] === headerKey);
      newItem[headerKey] = dataKey ? item[dataKey] || null : null;
    });
    return newItem;
  });
  const transformedData = headers.length > 0 && Object.keys(mapping).length > 0 ? transfer : data;
  const worksheet = XLSX.utils.json_to_sheet(transformedData);
  const workbook = {
    Sheets: { Sheet1: worksheet },
    SheetNames: ["Sheet1"]
  };
  applyBorders(worksheet);
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
    cellStyles: true
  });
  saveAsExcelFile(excelBuffer, `${title}_${(0, import_moment.default)().format("DD_MM_YYYY")}`);
}
function writeExcelMultiple(sheetsData, title = "Excel_Export") {
  const workbook = { Sheets: {}, SheetNames: [] };
  Object.keys(sheetsData).forEach((sheetName) => {
    const worksheet = XLSX.utils.json_to_sheet(sheetsData[sheetName]);
    workbook.SheetNames.push(sheetName);
    workbook.Sheets[sheetName] = worksheet;
    applyBorders(worksheet);
  });
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
    cellStyles: true
  });
  saveAsExcelFile(excelBuffer, `${title}_${(0, import_moment.default)().format("DD_MM_YYYY")}`);
}
function writeExcelFileWithSheets(sheetsData, title = "Excel_Export") {
  const workbook = { Sheets: {}, SheetNames: [] };
  Object.keys(sheetsData).forEach((sheetName) => {
    const worksheet = XLSX.utils.json_to_sheet(sheetsData[sheetName]);
    workbook.SheetNames.push(sheetName);
    workbook.Sheets[sheetName] = worksheet;
  });
  const summaryData = [
    ["ngay", "makhold", "makh", "tenkh", "mabangia", "masp", "tensp", "sldat", "slgiao", "slnhan"],
    ["Ng\xE0y", "M\xE3 C\u0169", "M\xE3 M\u1EDBi", "T\xEAn Kh\xE1ch H\xE0ng", "B\u1EA3ng Gi\xE1", "M\xE3 S\u1EA3n Ph\u1EA9m", "T\xEAn S\u1EA3n Ph\u1EA9m", "SL \u0110\u1EB7t", "SL Giao", "SL Nh\u1EADn"],
    [(0, import_moment.default)().format("DD/MM/YYYY"), "C100755", "", "", "", "I100001", "", "1", "", ""],
    ["", "", "", "", "", "", "", "", ""]
  ];
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  const redFontStyle = { font: { color: { rgb: "FF0000" } } };
  const formulaCells = [
    { cell: "C3", formula: "VLOOKUP(B3,KH!A:D,3,0)", type: "s" },
    { cell: "D3", formula: "VLOOKUP(B3,KH!A:D,2,0)", type: "s" },
    { cell: "G3", formula: "VLOOKUP(F3,SP!B:D,2,0)", type: "s" },
    { cell: "I3", formula: "H3", type: "n" },
    { cell: "J3", formula: "H3", type: "n" }
  ];
  formulaCells.forEach(({ cell, formula, type }) => {
    summarySheet[cell] = {
      f: formula,
      t: type,
      s: redFontStyle
    };
  });
  const summarySheetName = "Donhang";
  workbook.SheetNames.push(summarySheetName);
  workbook.Sheets[summarySheetName] = summarySheet;
  applyBorders(summarySheet);
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
    cellStyles: true
  });
  saveAsExcelFile(excelBuffer, `${title}_${(0, import_moment.default)().format("DD_MM_YYYY")}`);
}
function UploadDathang(sheetsData, title = "Excel_Export") {
  const workbook = { Sheets: {}, SheetNames: [] };
  Object.keys(sheetsData).forEach((sheetName) => {
    const worksheet = XLSX.utils.json_to_sheet(sheetsData[sheetName]);
    workbook.SheetNames.push(sheetName);
    workbook.Sheets[sheetName] = worksheet;
  });
  const summaryData = [
    ["ngay", "manccold", "mancc", "name", "mabangia", "masp", "tensp", "sldat", "slgiao", "slnhan"],
    ["Ng\xE0y", "M\xE3 C\u0169", "M\xE3 M\u1EDBi", "T\xEAn Nh\xE0 Cung C\u1EA5p", "B\u1EA3ng Gi\xE1", "M\xE3 S\u1EA3n Ph\u1EA9m", "T\xEAn S\u1EA3n Ph\u1EA9m", "SL \u0110\u1EB7t", "SL Giao", "SL Nh\u1EADn"],
    [(0, import_moment.default)().format("DD/MM/YYYY"), "V100049", "", "", "", "I100001", "", "1", "", ""],
    ["", "", "", "", "", "", "", "", ""]
  ];
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  const redFontStyle = { font: { color: { rgb: "FF0000" } } };
  const formulaCells = [
    { cell: "C3", formula: "VLOOKUP(B3,NCC!A:D,3,0)", type: "s" },
    { cell: "D3", formula: "VLOOKUP(B3,NCC!A:D,2,0)", type: "s" },
    { cell: "G3", formula: "VLOOKUP(F3,SP!B:D,2,0)", type: "s" },
    { cell: "I3", formula: "H3", type: "n" },
    { cell: "J3", formula: "H3", type: "n" }
  ];
  formulaCells.forEach(({ cell, formula, type }) => {
    summarySheet[cell] = {
      f: formula,
      t: type,
      s: redFontStyle
    };
  });
  const summarySheetName = "Dathang";
  workbook.SheetNames.push(summarySheetName);
  workbook.Sheets[summarySheetName] = summarySheet;
  applyBorders(summarySheet);
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
    cellStyles: true
  });
  saveAsExcelFile(excelBuffer, `${title}_${(0, import_moment.default)().format("DD_MM_YYYY")}`);
}
function applyBorders(ws) {
  if (!ws["!ref"])
    return;
  const range = XLSX.utils.decode_range(ws["!ref"]);
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell_address = { c: C, r: R };
      const cell_ref = XLSX.utils.encode_cell(cell_address);
      if (!ws[cell_ref])
        ws[cell_ref] = { t: "z", v: "" };
      if (!ws[cell_ref].s)
        ws[cell_ref].s = {};
      ws[cell_ref].s.border = {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } }
      };
    }
  }
}
function saveAsExcelFile(buffer, fileName) {
  const data = new Blob([buffer], { type: "application/octet-stream" });
  const url = window.URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName}.xlsx`;
  link.click();
  window.URL.revokeObjectURL(url);
  link.remove();
}
function readExcelFile(event, sheetName) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("worker-FO4ZGCE3.js", import.meta.url), { type: "module" });
    const file = event.target?.files?.[0] || event;
    worker.postMessage({ file, sheetName });
    worker.onmessage = (e) => {
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
function readExcelFileNoWorkerArray(event, sheetName) {
  return new Promise((resolve, reject) => {
    const file = event.target?.files?.[0] || event;
    if (!file) {
      reject("No file provided");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        let result;
        if (sheetName && workbook.SheetNames.includes(sheetName)) {
          result = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: "" });
        } else {
          const firstSheetName = workbook.SheetNames[0];
          result = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], { defval: "" });
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
function readExcelFileNoWorker(event, sheetName) {
  return new Promise((resolve, reject) => {
    const file = event.target?.files?.[0] || event;
    if (!file) {
      reject("No file provided");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        let result;
        if (sheetName && workbook.SheetNames.includes(sheetName)) {
          result = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: "" });
        } else {
          result = {};
          workbook.SheetNames.forEach((name) => {
            result[name] = XLSX.utils.sheet_to_json(workbook.Sheets[name], { defval: "" });
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
function excelSerialDateToJSDate(serial) {
  const excelEpochOffset = 25569;
  const millisecondsPerDay = 24 * 60 * 60 * 1e3;
  const daysSinceUnixEpoch = serial - excelEpochOffset;
  const utcMilliseconds = daysSinceUnixEpoch * millisecondsPerDay;
  return new Date(utcMilliseconds);
}

export {
  writeExcelFileSheets,
  writeExcelFile,
  writeExcelMultiple,
  writeExcelFileWithSheets,
  UploadDathang,
  readExcelFile,
  readExcelFileNoWorkerArray,
  readExcelFileNoWorker,
  excelSerialDateToJSDate
};
//# sourceMappingURL=chunk-CVAZHUNB.js.map
