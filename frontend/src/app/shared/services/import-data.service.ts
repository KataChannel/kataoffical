import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { readExcelFile } from '../utils/exceldrive.utils';
import { DataValidator, ValidationRule, ValidationResult } from '../utils/data-validation.utils';
import { ImportPreviewDialogComponent } from '../components/import-preview-dialog/import-preview-dialog.component';

export interface ImportConfig {
  entityType: string;
  validationRules?: ValidationRule[];
  requiredFields?: string[];
  maxRows?: number;
  allowedFileTypes?: string[];
}

export interface ImportResult {
  success: boolean;
  validData: any[];
  invalidData: any[];
  errors: any[];
  message: string;
}

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
            // Đọc file Excel
            const rawData = await readExcelFile(event);
            
            if (!rawData || rawData.length === 0) {
              this.showError('File rỗng hoặc không đọc được');
              resolve(null);
              return;
            }

            // Validate dữ liệu
            const validationRules = config.validationRules || DataValidator.getValidationRules(config.entityType);
            const validationResult = DataValidator.validateData(rawData, validationRules);

            // Mở dialog preview
            const dialogRef = this.dialog.open(ImportPreviewDialogComponent, {
              width: '95vw',
              maxWidth: '1200px',
              height: '90vh',
              data: {
                rawData,
                validationResult,
                config,
                fileName: file.name
              },
              disableClose: true
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
      const rawData = await readExcelFile(event);
      
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
      }
    };

    return configs[entityType] || {
      entityType,
      maxRows: 1000,
      allowedFileTypes: ['.xlsx', '.xls']
    };
  }
}