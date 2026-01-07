import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImportPreviewDialogComponent } from '../components/import-preview-dialog/import-preview-dialog.component';
import { ImportConfig, ImportResult } from '../models/import.models';
import { DataValidator, ValidationResult, ValidationRule } from '../utils/data-validation.utils';
import { readExcelFile, readExcelFileNoWorkerArray } from '../utils/exceldrive.utils';

@Injectable({
  providedIn: 'root'
})
export class ImportDataService {

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Mở dialog import với preview dữ liệu
   */
  async openImportDialog(config: ImportConfig): Promise<ImportResult | null> {
    try {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = config.allowedFileTypes?.join(',') || '.xlsx,.xls,.csv';
      
      return new Promise((resolve) => {
        fileInput.onchange = async (event: any) => {
          const file = event.target.files[0];
          if (!file) {
            resolve(null);
            return;
          }

          try {
            // Đọc file Excel - sử dụng NoWorker để tránh lỗi với Web Worker
            let rawData: any[] = [];
            try {
              rawData = await readExcelFileNoWorkerArray(event);
            } catch (workerError) {
              console.warn('readExcelFileNoWorkerArray failed, trying readExcelFile:', workerError);
              rawData = await readExcelFile(event);
            }
            
            if (!rawData || rawData.length === 0) {
              this.showError('File rỗng hoặc không đọc được');
              resolve(null);
              return;
            }

            // Validate dữ liệu
            const validationRules = config.validationRules || DataValidator.getValidationRules(config.entityType);
            const validationResult = DataValidator.validateData(rawData, validationRules);

            // Mở dialog preview với config responsive
            const dialogRef = this.dialog.open(ImportPreviewDialogComponent, {
              width: '100%',
              maxWidth: '1200px',
              height: '95vh',
              maxHeight: '95vh',
              panelClass: 'import-preview-dialog-panel',
              data: {
                rawData,
                validationResult,
                config,
                fileName: file.name
              },
              disableClose: true,
              autoFocus: false
            });

            const result = await dialogRef.afterClosed().toPromise();
            resolve(result || null);

          } catch (error) {
            console.error('Error processing import file:', error);
            this.showError('Lỗi khi xử lý file: ' + (error as Error).message);
            resolve(null);
          }
        };

        fileInput.click();
      });

    } catch (error) {
      console.error('Error opening import dialog:', error);
      this.showError('Lỗi khi mở dialog import');
      return null;
    }
  }

  /**
   * Import dữ liệu trực tiếp từ file event
   */
  async importFromFile(event: any, config: ImportConfig): Promise<ImportResult> {
    try {
      let rawData: any[] = [];
      try {
        rawData = await readExcelFileNoWorkerArray(event);
      } catch (workerError) {
        console.warn('readExcelFileNoWorkerArray failed, trying readExcelFile:', workerError);
        rawData = await readExcelFile(event);
      }
      
      if (!rawData || rawData.length === 0) {
        return {
          success: false,
          validData: [],
          invalidData: [],
          errors: [],
          message: 'File rỗng hoặc không đọc được'
        };
      }

      // Check max rows
      if (config.maxRows && rawData.length > config.maxRows) {
        return {
          success: false,
          validData: [],
          invalidData: rawData,
          errors: [{
            message: `Số dòng dữ liệu (${rawData.length}) vượt quá giới hạn cho phép (${config.maxRows})`
          }],
          message: `Số dòng dữ liệu vượt quá giới hạn`
        };
      }

      // Validate data
      const validationRules = config.validationRules || DataValidator.getValidationRules(config.entityType);
      const validationResult = DataValidator.validateData(rawData, validationRules);

      return {
        success: validationResult.isValid,
        validData: validationResult.validData,
        invalidData: validationResult.invalidData,
        errors: validationResult.errors,
        message: validationResult.isValid 
          ? `Import thành công ${validationResult.validData.length} dòng dữ liệu`
          : `Có ${validationResult.errors.length} lỗi trong dữ liệu`
      };

    } catch (error) {
      console.error('Error importing data:', error);
      return {
        success: false,
        validData: [],
        invalidData: [],
        errors: [{ message: (error as Error).message }],
        message: 'Lỗi khi import dữ liệu'
      };
    }
  }

  /**
   * Validate dữ liệu theo rules
   */
  validateImportData(data: any[], rules: ValidationRule[]): ValidationResult {
    return DataValidator.validateData(data, rules);
  }

  /**
   * Transform dữ liệu theo kiểu entity
   */
  transformDataForEntity(data: any[], entityType: string): any[] {
    switch (entityType) {
      case 'sanpham':
        return this.transformSanphamData(data);
      case 'khachhang':
        return this.transformKhachhangData(data);
      case 'donhang':
        return this.transformDonhangData(data);
      case 'nhanvien':
        return this.transformNhanvienData(data);
      default:
        return data;
    }
  }

  /**
   * Transform data for sanpham entity
   */
  private transformSanphamData(data: any[]): any[] {
    return data.map((item: any) => ({
      title: item.title?.trim() || '',
      masp: item.masp?.trim() || '',
      giagoc: Number(item.giagoc) || 0,
      dvt: item.dvt?.trim() || '',
      soluong: Number(item.soluong) || 0,
      soluongkho: Number(item.soluongkho) || 0,
      haohut: Number(item.haohut) || 0,
      ghichu: item.ghichu?.trim() || '',
      order: Number(item.order) || 0,
    }));
  }

  /**
   * Transform data for khachhang entity
   */
  private transformKhachhangData(data: any[]): any[] {
    return data.map((item: any) => ({
      name: item.name?.trim() || '',
      mancc: item.mancc?.trim() || '',
      sdt: item.sdt?.trim() || '',
      diachi: item.diachi?.trim() || '',
      ghichu: item.ghichu?.trim() || '',
    }));
  }

  /**
   * Transform data for donhang entity
   */
  private transformDonhangData(data: any[]): any[] {
    return data.map((item: any) => ({
      masp: item.masp?.trim() || '',
      sldat: Number(item.sldat) || 0,
      slgiao: Number(item.slgiao) || 0,
      slnhan: Number(item.slnhan) || 0,
      giaban: Number(item.giaban) || 0,
      ttdat: Number(item.ttdat) || 0,
      ttgiao: Number(item.ttgiao) || 0,
      ttnhan: Number(item.ttnhan) || 0,
      ghichu: item.ghichu?.trim() || '',
    }));
  }

  /**
   * Transform data for nhanvien entity
   */
  private transformNhanvienData(data: any[]): any[] {
    return data.map((item: any) => ({
      maNV: String(item['Mã NV'] || item.maNV || '').trim(),
      maLamViec: String(item['Mã Làm Việc'] || item.maLamViec || '').trim() || null,
      hoTen: String(item['Họ và Tên'] || item.hoTen || '').trim(),
      gioiTinh: item['Giới Tính'] || item.gioiTinh || null,
      ngaySinh: item['Ngày Sinh'] || item.ngaySinh || null,
      cmnd: String(item['CMND/CCCD'] || item.cmnd || '').trim() || null,
      soDienThoai: String(item['Số Điện Thoại'] || item.soDienThoai || '').trim() || null,
      email: String(item['Email'] || item.email || '').trim() || null,
      diaChiHienTai: String(item['Địa Chỉ Hiện Tại'] || item.diaChiHienTai || '').trim() || null,
      chucVu: String(item['Chức Vụ'] || item.chucVu || '').trim() || null,
      viTri: String(item['Vị Trí'] || item.viTri || '').trim() || null,
      ngayVaoLam: item['Ngày Vào Làm'] || item.ngayVaoLam || null,
      trangThai: item['Trạng Thái'] || item.trangThai || 'THUVIEC',
      luongCoBan: Number(item['Lương Cơ Bản'] || item.luongCoBan) || 0,
      hieuSuatCongViec: Number(item['Hiệu Suất Công Việc'] || item.hieuSuatCongViec) || 0,
      phuCapXang: Number(item['Phụ Cấp Xăng'] || item.phuCapXang) || 0,
      phuCapDienThoai: Number(item['Phụ Cấp ĐT'] || item.phuCapDienThoai) || 0,
      hoTroChuyenCan: Number(item['Hỗ Trợ Chuyên Cần'] || item.hoTroChuyenCan) || 0,
      tienAnGiuaCa: Number(item['Tiền Ăn Giữa Ca'] || item.tienAnGiuaCa) || 0,
      thuongKinhDoanh: Number(item['Thưởng Kinh Doanh'] || item.thuongKinhDoanh) || 0,
      phuCapKhac: Number(item['Phụ Cấp Khác'] || item.phuCapKhac) || 0,
      soTaiKhoan: String(item['Số Tài Khoản'] || item.soTaiKhoan || '').trim() || null,
      nganHang: String(item['Ngân Hàng'] || item.nganHang || '').trim() || null,
      chiNhanh: String(item['Chi Nhánh'] || item.chiNhanh || '').trim() || null,
      ghiChu: String(item['Ghi Chú'] || item.ghiChu || '').trim() || null,
    }));
  }

  /**
   * Show error message
   */
  private showError(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });
  }

  /**
   * Show success message
   */
  showSuccess(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success']
    });
  }

  /**
   * Get default import config for entity
   */
  getDefaultConfig(entityType: string): ImportConfig {
    const configs: { [key: string]: ImportConfig } = {
      sanpham: {
        entityType: 'sanpham',
        maxRows: 1000,
        allowedFileTypes: ['.xlsx', '.xls'],
        requiredFields: ['title', 'masp']
      },
      khachhang: {
        entityType: 'khachhang',
        maxRows: 500,
        allowedFileTypes: ['.xlsx', '.xls'],
        requiredFields: ['name', 'mancc']
      },
      donhang: {
        entityType: 'donhang',
        maxRows: 2000,
        allowedFileTypes: ['.xlsx', '.xls'],
        requiredFields: ['masp', 'sldat']
      },
      nhanvien: {
        entityType: 'nhanvien',
        maxRows: 500,
        allowedFileTypes: ['.xlsx', '.xls'],
        requiredFields: ['Mã NV', 'Họ và Tên']
      }
    };

    return configs[entityType] || {
      entityType,
      maxRows: 1000,
      allowedFileTypes: ['.xlsx', '.xls']
    };
  }
}