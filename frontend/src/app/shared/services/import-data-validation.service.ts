import { Injectable } from '@angular/core';
import { removeVietnameseAccents } from '../utils/texttransfer.utils';

@Injectable({
  providedIn: 'root'
})
export class ImportDataValidationService {
  
  /**
   * Check for duplicate items between new data and existing data
   * @param newData - Array of new items to import
   * @param existingData - Array of existing items
   * @param keyField - Field to use for comparison
   * @returns Array of duplicate items
   */
  static checkDuplicates(
    newData: any[],
    existingData: any[],
    keyField: string
  ): any[] {
    const existingKeys = new Set(existingData.map((item) => item[keyField]));
    return newData.filter((item) => existingKeys.has(item[keyField]));
  }

  /**
   * Prepare product data for import
   * @param data - Array of new products
   * @param existingData - Array of existing products
   * @param overwrite - Whether to overwrite existing data
   * @returns Filtered array of products to import
   */
  static prepareSanphamData(
    data: any[],
    existingData: any[],
    overwrite: boolean
  ): any[] {
    if (overwrite) {
      return data;
    } else {
      const existingCodes = new Set(existingData.map((item) => item.masp));
      return data.filter((item) => !existingCodes.has(item.masp));
    }
  }

  /**
   * Prepare customer data for import
   * @param data - Array of new customers
   * @param existingData - Array of existing customers
   * @param overwrite - Whether to overwrite existing data
   * @returns Filtered array of customers to import
   */
  static prepareKhachhangData(
    data: any[],
    existingData: any[],
    overwrite: boolean
  ): any[] {
    if (overwrite) {
      return data;
    } else {
      const existingCodes = new Set(existingData.map((item) => item.makh));
      return data.filter((item) => !existingCodes.has(item.makh));
    }
  }

  /**
   * Prepare supplier data for import
   * @param data - Array of new suppliers
   * @param existingData - Array of existing suppliers
   * @param overwrite - Whether to overwrite existing data
   * @returns Filtered array of suppliers to import
   */
  static prepareNhacungcapData(
    data: any[],
    existingData: any[],
    overwrite: boolean
  ): any[] {
    if (overwrite) {
      return data;
    } else {
      const existingCodes = new Set(existingData.map((item) => item.mancc));
      return data.filter((item) => !existingCodes.has(item.mancc));
    }
  }

  /**
   * Prepare price list data for import
   * @param data - Array of new price lists
   * @param existingData - Array of existing price lists
   * @param overwrite - Whether to overwrite existing data
   * @returns Filtered array of price lists to import
   */
  static prepareBanggiaData(
    data: any[],
    existingData: any[],
    overwrite: boolean
  ): any[] {
    if (overwrite) {
      return data;
    } else {
      const existingCodes = new Set(existingData.map((item) => item.mabanggia));
      return data.filter((item) => !existingCodes.has(item.mabanggia));
    }
  }

  /**
   * Prepare warehouse data for import
   * @param data - Array of new warehouses
   * @param existingData - Array of existing warehouses
   * @param overwrite - Whether to overwrite existing data
   * @returns Filtered array of warehouses to import
   */
  static prepareKhoData(
    data: any[],
    existingData: any[],
    overwrite: boolean
  ): any[] {
    if (overwrite) {
      return data;
    } else {
      const existingCodes = new Set(existingData.map((item) => item.makho));
      return data.filter((item) => !existingCodes.has(item.makho));
    }
  }

  /**
   * Generic method to prepare data for import
   * @param data - Array of new items
   * @param existingData - Array of existing items
   * @param keyField - Field to use for comparison
   * @param overwrite - Whether to overwrite existing data
   * @returns Filtered array of items to import
   */
  static prepareGenericData(
    data: any[],
    existingData: any[],
    keyField: string,
    overwrite: boolean
  ): any[] {
    if (overwrite) {
      return data;
    } else {
      const existingCodes = new Set(existingData.map((item) => item[keyField]));
      return data.filter((item) => !existingCodes.has(item[keyField]));
    }
  }

  /**
   * Validate required fields in data
   * @param data - Array of items to validate
   * @param requiredFields - Array of required field names
   * @returns Validation result with valid and invalid items
   */
  static validateRequiredFields(
    data: any[],
    requiredFields: string[]
  ): { valid: any[], invalid: any[] } {
    const valid: any[] = [];
    const invalid: any[] = [];

    data.forEach((item) => {
      const missingFields = requiredFields.filter(field => 
        item[field] === undefined || 
        item[field] === null || 
        item[field] === ''
      );

      if (missingFields.length === 0) {
        valid.push(item);
      } else {
        invalid.push({
          ...item,
          _validationErrors: missingFields.map(field => `Missing required field: ${field}`)
        });
      }
    });

    return { valid, invalid };
  }

  /**
   * Validate data format for specific data types
   * @param data - Array of items to validate
   * @param dataType - Type of data (sanpham, khachhang, etc.)
   * @returns Validation result
   */
  static validateDataFormat(
    data: any[],
    dataType: string
  ): { valid: any[], invalid: any[] } {
    switch (dataType) {
      case 'sanpham':
        return this.validateSanphamFormat(data);
      case 'khachhang':
        return this.validateKhachhangFormat(data);
      case 'nhacungcap':
        return this.validateNhacungcapFormat(data);
      case 'banggia':
        return this.validateBanggiaFormat(data);
      case 'kho':
        return this.validateKhoFormat(data);
      default:
        return { valid: data, invalid: [] };
    }
  }

  /**
   * Validate product data format
   */
  private static validateSanphamFormat(data: any[]): { valid: any[], invalid: any[] } {
    const valid: any[] = [];
    const invalid: any[] = [];

    data.forEach((item) => {
      const errors: string[] = [];

      if (!item.masp || typeof item.masp !== 'string') {
        errors.push('Invalid product code (masp)');
      }

      if (item.giaban && isNaN(Number(item.giaban))) {
        errors.push('Invalid selling price (giaban)');
      }

      if (item.giagoc && isNaN(Number(item.giagoc))) {
        errors.push('Invalid cost price (giagoc)');
      }

      if (errors.length === 0) {
        valid.push(item);
      } else {
        invalid.push({
          ...item,
          _validationErrors: errors
        });
      }
    });

    return { valid, invalid };
  }

  /**
   * Validate customer data format
   */
  private static validateKhachhangFormat(data: any[]): { valid: any[], invalid: any[] } {
    const valid: any[] = [];
    const invalid: any[] = [];

    data.forEach((item) => {
      const errors: string[] = [];

      if (!item.makh || typeof item.makh !== 'string') {
        errors.push('Invalid customer code (makh)');
      }

      if (!item.name || typeof item.name !== 'string') {
        errors.push('Invalid customer name');
      }

      if (item.email && !this.isValidEmail(item.email)) {
        errors.push('Invalid email format');
      }

      if (errors.length === 0) {
        valid.push(item);
      } else {
        invalid.push({
          ...item,
          _validationErrors: errors
        });
      }
    });

    return { valid, invalid };
  }

  /**
   * Validate supplier data format
   */
  private static validateNhacungcapFormat(data: any[]): { valid: any[], invalid: any[] } {
    const valid: any[] = [];
    const invalid: any[] = [];

    data.forEach((item) => {
      const errors: string[] = [];

      if (!item.mancc || typeof item.mancc !== 'string') {
        errors.push('Invalid supplier code (mancc)');
      }

      if (!item.name || typeof item.name !== 'string') {
        errors.push('Invalid supplier name');
      }

      if (errors.length === 0) {
        valid.push(item);
      } else {
        invalid.push({
          ...item,
          _validationErrors: errors
        });
      }
    });

    return { valid, invalid };
  }

  /**
   * Validate price list data format
   */
  private static validateBanggiaFormat(data: any[]): { valid: any[], invalid: any[] } {
    const valid: any[] = [];
    const invalid: any[] = [];

    data.forEach((item) => {
      const errors: string[] = [];

      if (!item.mabanggia || typeof item.mabanggia !== 'string') {
        errors.push('Invalid price list code (mabanggia)');
      }

      if (errors.length === 0) {
        valid.push(item);
      } else {
        invalid.push({
          ...item,
          _validationErrors: errors
        });
      }
    });

    return { valid, invalid };
  }

  /**
   * Validate warehouse data format
   */
  private static validateKhoFormat(data: any[]): { valid: any[], invalid: any[] } {
    const valid: any[] = [];
    const invalid: any[] = [];

    data.forEach((item) => {
      const errors: string[] = [];

      if (!item.makho || typeof item.makho !== 'string') {
        errors.push('Invalid warehouse code (makho)');
      }

      if (!item.tenkho || typeof item.tenkho !== 'string') {
        errors.push('Invalid warehouse name (tenkho)');
      }

      if (errors.length === 0) {
        valid.push(item);
      } else {
        invalid.push({
          ...item,
          _validationErrors: errors
        });
      }
    });

    return { valid, invalid };
  }

  /**
   * Validate email format
   */
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Get summary of validation results
   */
  static getValidationSummary(
    totalItems: number,
    validItems: number,
    invalidItems: number,
    duplicateItems: number
  ): string {
    return `
      Tổng số dòng: ${totalItems}
      Dữ liệu hợp lệ: ${validItems}
      Dữ liệu không hợp lệ: ${invalidItems}
      Dữ liệu trùng lặp: ${duplicateItems}
    `;
  }

  /**
   * Transform data before import
   * @param data - Array of items to transform
   * @param dataType - Type of data (sanpham, khachhang, etc.)
   * @returns Transformed data
   */
  static transformDataForImport(data: any[], dataType: string): any[] {
    switch (dataType) {
      case 'sanpham':
        return this.transformSanphamData(data);
      case 'khachhang':
        return this.transformKhachhangData(data);
      case 'nhacungcap':
        return this.transformNhacungcapData(data);
      case 'banggia':
        return this.transformBanggiaData(data);
      case 'kho':
        return this.transformKhoData(data);
      default:
        return data;
    }
  }

  /**
   * Transform product data for import
   */
  private static transformSanphamData(data: any[]): any[] {
    return data.map((item: any) => ({
      ...item,
      masp: item.masp?.toString().trim() || '',
      subtitle: removeVietnameseAccents((item.title || '') + (item.title2 || '')),
      title: item.title?.toString().trim() || '',
      title2: item.title2?.toString().trim() || '',
      giaban: Number(item.giaban) || Number(item.giagoc) || 0,
      giagoc: Number(item.giagoc) || 0,
      vat: Number(item.vat) || 0,
      dvt: item.dvt?.toString().trim() || '',
      haohut: Number(item.haohut) || 0,
      loadpoint: Number(item.loadpoint) || '',
      ghichu: item.ghichu?.toString().trim() || '',
    }));
  }

  /**
   * Transform customer data for import
   */
  private static transformKhachhangData(data: any[]): any[] {
    return data.map((item: any) => ({
      ...item,
      makh: item.makh?.toString().trim() || '',
      name: item.name?.toString().trim() || '',
      tenfile: removeVietnameseAccents(item.tenfile?.toString() || item.name?.toString() || ''),
      subtitle: removeVietnameseAccents((item.name?.toString() || '') + (item.namenn?.toString() || '')),
      namenn: item.namenn?.toString().trim() || '',
      diachi: item.diachi?.toString().trim() || '',
      quan: item.quan?.toString().trim() || '',
      email: item.email?.toString().trim() || '',
      sdt: item.sdt?.toString().trim() || '',
      mst: item.mst?.toString().trim() || '',
      gionhanhang: item.gionhanhang?.toString().trim() || '',
      loaikh: item.loaikh?.toString().trim() || 'khachsi',
      hiengia: item.hiengia !== undefined ? Boolean(item.hiengia) : true,
      ghichu: item.ghichu?.toString().trim() || '',
      mabanggia: item.mabanggia?.toString().trim() || '',
    }));
  }

  /**
   * Transform supplier data for import
   */
  private static transformNhacungcapData(data: any[]): any[] {
    return data.map((item: any) => ({
      ...item,
      mancc: item.mancc?.toString().trim() || '',
      name: item.name?.toString().trim() || '',
      tenfile: removeVietnameseAccents(item.tenfile?.toString() || item.name?.toString() || ''),
      diachi: item.diachi?.toString().trim() || '',
      email: item.email?.toString().trim() || '',
      sdt: item.sdt?.toString().trim() || '',
      ghichu: item.ghichu?.toString().trim() || '',
    }));
  }

  /**
   * Transform price list data for import
   */
  private static transformBanggiaData(data: any[]): any[] {
    return data.map((item: any) => ({
      ...item,
      mabanggia: item.mabanggia?.toString().trim() || '',
      title: item.title?.toString().trim() || '',
      type: item.type?.toString().trim() || '',
      ghichu: item.ghichu?.toString().trim() || '',
      status: item.status?.toString().trim() || 'active',
    }));
  }

  /**
   * Transform warehouse data for import
   */
  private static transformKhoData(data: any[]): any[] {
    return data.map((item: any) => ({
      ...item,
      makho: item.makho?.toString().trim() || '',
      tenkho: item.tenkho?.toString().trim() || '',
      diachi: item.diachi?.toString().trim() || '',
      ghichu: item.ghichu?.toString().trim() || '',
      status: item.status?.toString().trim() || 'active',
    }));
  }

  /**
   * Filter out invalid data before processing
   * @param data - Array of items to filter
   * @param requiredFields - Array of required field names
   * @returns Filtered data with only valid items
   */
  static filterValidData(data: any[], requiredFields: string[]): any[] {
    return data.filter((item) => {
      return requiredFields.every(field => 
        item[field] !== undefined && 
        item[field] !== null && 
        item[field] !== ''
      );
    });
  }

  /**
   * Get entity-specific required fields
   * @param dataType - Type of data (sanpham, khachhang, etc.)
   * @returns Array of required field names
   */
  static getRequiredFields(dataType: string): string[] {
    switch (dataType) {
      case 'sanpham':
        return ['masp', 'title'];
      case 'khachhang':
        return ['makh', 'name'];
      case 'nhacungcap':
        return ['mancc', 'name'];
      case 'banggia':
        return ['mabanggia', 'title'];
      case 'kho':
        return ['makho', 'tenkho'];
      default:
        return [];
    }
  }

  /**
   * Get unique identifier field for entity type
   * @param dataType - Type of data (sanpham, khachhang, etc.)
   * @returns Field name used as unique identifier
   */
  static getUniqueField(dataType: string): string {
    switch (dataType) {
      case 'sanpham':
        return 'masp';
      case 'khachhang':
        return 'makh';
      case 'nhacungcap':
        return 'mancc';
      case 'banggia':
        return 'mabanggia';
      case 'kho':
        return 'makho';
      default:
        return 'id';
    }
  }
}
