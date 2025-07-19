import { Component, Inject, OnInit, ViewChild, signal, computed, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidationResult, ValidationError } from '../../utils/data-validation.utils';
import { ImportConfig } from '../../services/import-data.service';
import { writeExcelFile } from '../../utils/exceldrive.utils';

interface ImportPreviewData {
  rawData: any[];
  validationResult: ValidationResult;
  config: ImportConfig;
  fileName: string;
}

@Component({
  selector: 'app-import-preview-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatExpansionModule,
    MatCardModule
  ],
  templateUrl: './import-preview-dialog.component.html',
  styleUrl: './import-preview-dialog.component.scss'
})
export class ImportPreviewDialogComponent implements OnInit, AfterViewInit {
  
  @ViewChild('validPaginator') validPaginator!: MatPaginator;
  @ViewChild('invalidPaginator') invalidPaginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  validDataSource = new MatTableDataSource<any>([]);
  invalidDataSource = new MatTableDataSource<any>([]);
  
  validColumns: string[] = [];
  invalidColumns: string[] = [];
  
  // Computed properties
  totalRows = computed(() => this.data.rawData.length);
  validRows = computed(() => this.data.validationResult.validData.length);
  invalidRows = computed(() => this.data.validationResult.invalidData.length);
  totalErrors = computed(() => this.data.validationResult.errors.length);

  constructor(
    public dialogRef: MatDialogRef<ImportPreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImportPreviewData,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.setupDataSources();
  }

  ngAfterViewInit(): void {
    this.setupPaginators();
  }

  private setupDataSources(): void {
    // Setup valid data source
    this.validDataSource.data = this.data.validationResult.validData;
    if (this.data.validationResult.validData.length > 0) {
      this.validColumns = Object.keys(this.data.validationResult.validData[0]).filter(key => key !== 'originalRowIndex');
    }

    // Setup invalid data source
    const invalidWithRowIndex = this.data.validationResult.invalidData.map((item, index) => ({
      ...item,
      originalRowIndex: this.data.rawData.findIndex(row => row === item)
    }));
    this.invalidDataSource.data = invalidWithRowIndex;
    
    if (this.data.validationResult.invalidData.length > 0) {
      this.invalidColumns = Object.keys(this.data.validationResult.invalidData[0]).filter(key => key !== 'originalRowIndex');
    }
  }

  private setupPaginators(): void {
    if (this.validPaginator) {
      this.validDataSource.paginator = this.validPaginator;
    }
    if (this.invalidPaginator) {
      this.invalidDataSource.paginator = this.invalidPaginator;
    }
    if (this.sort) {
      this.validDataSource.sort = this.sort;
      this.invalidDataSource.sort = this.sort;
    }
  }

  getValidColumns(): string[] {
    return this.validColumns;
  }

  getInvalidColumns(): string[] {
    return this.invalidColumns;
  }

  getValidDisplayedColumns(): string[] {
    return ['rowNumber', ...this.validColumns];
  }

  getInvalidDisplayedColumns(): string[] {
    return ['rowNumber', 'errors', ...this.invalidColumns];
  }

  getColumnDisplayName(column: string): string {
    const displayNames: { [key: string]: string } = {
      masp: 'Mã SP',
      title: 'Tên sản phẩm',
      sldat: 'SL Đặt',
      slgiao: 'SL Giao',
      slnhan: 'SL Nhận',
      giaban: 'Giá bán',
      dvt: 'ĐVT',
      ngaygiao: 'Ngày giao',
      ghichu: 'Ghi chú'
    };
    return displayNames[column] || column;
  }

  formatCellValue(value: any, column: string): string {
    if (value === null || value === undefined) return '';
    
    switch (column) {
      case 'ngaygiao':
        return new Date(value).toLocaleDateString('vi-VN');
      case 'sldat':
      case 'slgiao':
      case 'slnhan':
      case 'giaban':
        return typeof value === 'number' ? value.toLocaleString('vi-VN') : value;
      default:
        return value.toString();
    }
  }

  getCellClass(element: any, column: string, isInvalid: boolean = false): string {
    const baseClass = 'p-2';
    
    if (isInvalid) {
      const hasError = this.getRowErrors(element.originalRowIndex || 0)
        .some(error => error.field === column);
      return hasError ? baseClass + ' bg-red-100 text-red-800' : baseClass;
    }
    
    return baseClass;
  }

  getRowErrors(rowIndex: number): ValidationError[] {
    return this.data.validationResult.errors.filter(error => error.row === rowIndex);
  }

  getErrorSummary(): any[] {
    const errorMap = new Map<string, Map<string, number>>();
    
    this.data.validationResult.errors.forEach(error => {
      if (!errorMap.has(error.field)) {
        errorMap.set(error.field, new Map());
      }
      const fieldErrors = errorMap.get(error.field)!;
      fieldErrors.set(error.error, (fieldErrors.get(error.error) || 0) + 1);
    });

    const summary: any[] = [];
    errorMap.forEach((errorTypes, field) => {
      errorTypes.forEach((count, errorType) => {
        summary.push({ field, errorType, count });
      });
    });

    return summary.sort((a, b) => b.count - a.count);
  }

  getValidationRules() {
    return this.data.config.validationRules || [];
  }

  applyValidFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.validDataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.validDataSource.paginator) {
      this.validDataSource.paginator.firstPage();
    }
  }

  applyInvalidFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.invalidDataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.invalidDataSource.paginator) {
      this.invalidDataSource.paginator.firstPage();
    }
  }

  exportValidData(): void {
    if (this.data.validationResult.validData.length === 0) {
      this.snackBar.open('Không có dữ liệu hợp lệ để export', 'Đóng', { duration: 3000 });
      return;
    }
    
    writeExcelFile(this.data.validationResult.validData, `Valid_Data_${this.data.fileName}`);
  }

  exportInvalidData(): void {
    if (this.data.validationResult.invalidData.length === 0) {
      this.snackBar.open('Không có dữ liệu lỗi để export', 'Đóng', { duration: 3000 });
      return;
    }
    
    const invalidWithErrors = this.data.validationResult.invalidData.map((item, index) => {
      const rowIndex = this.data.rawData.findIndex(row => row === item);
      const errors = this.getRowErrors(rowIndex);
      return {
        ...item,
        errors: errors.map(e => `${e.field}: ${e.error}`).join('; ')
      };
    });
    
    writeExcelFile(invalidWithErrors, `Invalid_Data_${this.data.fileName}`);
  }

  onConfirm(): void {
    if (this.validRows() === 0) {
      this.snackBar.open('Không có dữ liệu hợp lệ để import', 'Đóng', {
        duration: 3000,
        panelClass: ['snackbar-warning']
      });
      return;
    }

    const result = {
      success: true,
      validData: this.data.validationResult.validData,
      invalidData: this.data.validationResult.invalidData,
      errors: this.data.validationResult.errors,
      message: `Import thành công ${this.validRows()} dòng dữ liệu`
    };

    this.dialogRef.close(result);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}