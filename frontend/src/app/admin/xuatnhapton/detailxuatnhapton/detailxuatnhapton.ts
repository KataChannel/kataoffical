import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
import { ChotkhoService } from '../../chotkho/chotkho.service';
import { XuatnhaptonComponent } from '../xuatnhapton.component';
import { TimezoneService } from '../../../shared/services/timezone.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-detailxuatnhapton',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    CommonModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  templateUrl: './detailxuatnhapton.html',
  styleUrl: './detailxuatnhapton.scss'
})
export class DetailXuatnhaptonComponent {
  _XuatnhaptonComponent: XuatnhaptonComponent = inject(XuatnhaptonComponent)
  _ChotkhoService: ChotkhoService = inject(ChotkhoService)
  _timezoneService: TimezoneService = inject(TimezoneService)
  _route: ActivatedRoute = inject(ActivatedRoute)
  _router: Router = inject(Router)
  _snackBar: MatSnackBar = inject(MatSnackBar)

  // Excel upload related properties
  isUploading = signal(false);
  uploadResult = signal<any>(null);
  // Add loading state for save operation
  isSaving = signal(false);
  ListChotkho: any = this._ChotkhoService.ListChotkho;
  Title:any ='Chốt Kho Ngày ' + this._timezoneService.nowLocal('DD/MM/YYYY');
  isEdit = signal(false);
  isDelete = signal(false);
  xuatnhaptonId: any = this._ChotkhoService.chotkhoId


  constructor() {
    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this._ChotkhoService.chotkhoId.set(id);
    });
    effect(async () => {
      const id = this._ChotkhoService.chotkhoId();      
      if (!id) {
        this._router.navigate(['/admin/xuatnhapton']);
        this._XuatnhaptonComponent.drawer.close();
      }
      if (id === 'new') {
        console.log("Creating new chotkho");
        this._XuatnhaptonComponent.drawer.open();
        this.isEdit.update(value => !value);
           // this._router.navigate(['/admin/xuatnhapton', "new"]);
      }
      else {
        await this._ChotkhoService.getChotkhoBy({ ngay: id });
        this._XuatnhaptonComponent.drawer.open();
        this._router.navigate(['/admin/xuatnhapton', id]);
      }
    });
  }

  async ngOnInit() {
    //  const id = this._ChotkhoService.chotkhoId();
    //   if (!id) {
    //     this._router.navigate(['/admin/xuatnhapton']);
    //     this._XuatnhaptonComponent.drawer.close();
    //   }
    //   if (id === 'new') {
    //     this.DetailXuatnhapton.set({ title: "Chốt Kho Ngày " + new Date().toLocaleDateString() });
    //     this._XuatnhaptonComponent.drawer.open();
    //     this.isEdit.update(value => !value);
    //     this._router.navigate(['/admin/xuatnhapton', "new"]);
    //   }
    //   else {
    //     await this._ChotkhoService.getChotkhoBy({ ngay: id });
    //     this._XuatnhaptonComponent.drawer.open();
    //     this._router.navigate(['/admin/xuatnhapton', id]);
    //   }
  }

  async handleXuatnhaptonAction() {
    if (this.xuatnhaptonId() === 'new') {
      await this.createXuatnhapton();
    }
    else {
      await this.updateXuatnhapton();
    }
  }

  private async createXuatnhapton() {
    try {
      this.isSaving.set(true);
      
      // Validate data before creating
      const validationResult = this.validateChotkhoData();
      if (!validationResult.isValid) {
        this._snackBar.open(`Dữ liệu không hợp lệ: ${validationResult.errors.join(', ')}`, '', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
        return;
      }

      // Prepare data with enhanced metadata for new master-detail structure
      const chotkhoData = this.prepareChotkhoData();
      if (!chotkhoData) {
        this._snackBar.open('❌ Không có dữ liệu để tạo chốt kho', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
        return;
      }
      
      console.log('chotkhoData',chotkhoData);
      
      // Show progress notification
      this._snackBar.open('Đang xử lý chốt kho...', '', {
        duration: 0,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'],
      });

      const result = await this._ChotkhoService.CreateChotkho(chotkhoData);
      
      // Dismiss progress notification
      this._snackBar.dismiss();
      
      // Enhanced result handling for new master-detail structure
      if (result && result.id) {
        // Single chotkho creation success
        const detailsCount = result.details ? result.details.length : 0;
        
        let message = '✅ Chốt Kho Thành Công';
        if (detailsCount > 0) {
          message += ` - ${detailsCount} chi tiết`;
        }
        
        this._snackBar.open(message, '', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        
        // Auto-refresh and update UI state
        await this.refreshChotkhoData();
        this.isEdit.update(value => !value);
        
      } else if (result && result.status === 'success') {
        // Legacy response format handling
        const { created, updated, failed, summary } = result;
        
        let message = '✅ Chốt Kho Thành Công';
        const details = [];
        
        if (summary?.totalProcessed) {
          details.push(`Xử lý: ${summary.totalProcessed} bản ghi`);
        }
        if (created > 0) details.push(`Tạo mới: ${created}`);
        if (updated > 0) details.push(`Cập nhật: ${updated}`);
        if (summary?.phieukhoCreated) details.push(`Phiếu kho: ${summary.phieukhoCreated}`);
        if (summary?.tonkhoUpdated) details.push(`Cập nhật tồn: ${summary.tonkhoUpdated}`);
        if (failed > 0) details.push(`❌ Lỗi: ${failed}`);
        
        if (details.length > 0) {
          message += ` | ${details.join(', ')}`;
        }
        
        this._snackBar.open(message, '', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        
        // Auto-refresh and update UI state
        await this.refreshChotkhoData();
        this.isEdit.update(value => !value);
        
      } else if (result && result.status === 'partial') {
        // Enhanced partial success handling
        const { created, updated, failed, errors } = result;
        let message = `⚠️ Hoàn thành một phần: Tạo mới ${created || 0}, Cập nhật ${updated || 0}`;
        if (failed > 0) message += `, Lỗi ${failed}`;
        
        // Show detailed errors if available
        if (errors && errors.length > 0) {
          console.warn('Chi tiết lỗi chốt kho:', errors);
          const errorSummary = errors.slice(0, 3).map((e: any) => e.error || e.message).join('; ');
          message += `. Chi tiết: ${errorSummary}`;
        }
        
        this._snackBar.open(message, '', {
          duration: 6000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        });
        
        await this.refreshChotkhoData();
        this.isEdit.update(value => !value);
        
      } else if (result && result.status === 'failed') {
        // Enhanced failure handling
        const errorMessage = result.errors && result.errors.length > 0 
          ? result.errors[0].error || 'Lỗi không xác định'
          : 'Không thể tạo chốt kho';
          
        this._snackBar.open(`❌ Tạo chốt kho thất bại: ${errorMessage}`, '', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      } else {
        // Fallback for unexpected response format
        this._snackBar.open('✅ Tạo Chốt Kho Thành Công', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        
        this.isEdit.update(value => !value);
      }
    } catch (error) {
      console.error('Lỗi tạo chốt kho:', error);
      
      // Dismiss any existing notifications
      this._snackBar.dismiss();
      
      // Enhanced error message
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Lỗi hệ thống khi tạo chốt kho';
        
      this._snackBar.open(`❌ ${errorMessage}`, '', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isSaving.set(false);
    }
  }

  private async updateXuatnhapton() {
    try {
      this.isSaving.set(true);
      
      // Validate data before updating
      const validationResult = this.validateChotkhoData();
      if (!validationResult.isValid) {
        this._snackBar.open(`Dữ liệu không hợp lệ: ${validationResult.errors.join(', ')}`, '', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
        return;
      }

      // Prepare updated data
      const chotkhoData = this.prepareChotkhoData();
      const currentId = this._ChotkhoService.chotkhoId();
      
      if (!currentId || currentId === 'new') {
        this._snackBar.open('❌ Không thể cập nhật: Không tìm thấy ID chốt kho', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
        return;
      }
      
      // Show progress notification
      this._snackBar.open('Đang cập nhật chốt kho...', '', {
        duration: 0,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-info'],
      });

      const result = await this._ChotkhoService.updateChotkho(currentId, chotkhoData);
      
      // Dismiss progress notification
      this._snackBar.dismiss();
      
      if (result) {
        this._snackBar.open('✅ Cập Nhật Chốt Kho Thành Công', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        
        // Auto-refresh and update UI state
        await this.refreshChotkhoData();
        this.isEdit.update(value => !value);
      } else {
        this._snackBar.open('❌ Không thể cập nhật chốt kho', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    } catch (error) {
      console.error('Lỗi cập nhật chốt kho:', error);
      
      // Dismiss any existing notifications
      this._snackBar.dismiss();
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Lỗi hệ thống khi cập nhật chốt kho';
        
      this._snackBar.open(`❌ ${errorMessage}`, '', {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isSaving.set(false);
    }
  }

  async DeleteData() {
    try {
      this.isSaving.set(true);
      
      const chotkhoData = this.ListChotkho();
      if (!chotkhoData || (Array.isArray(chotkhoData) && chotkhoData.length === 0)) {
        this._snackBar.open('❌ Không có dữ liệu để xóa', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        });
        return;
      }
      
      // Show confirmation for dangerous operation
      const confirmDelete = confirm('⚠️ Bạn có chắc chắn muốn xóa chốt kho này? Thao tác này sẽ hoàn tác các thay đổi tồn kho và không thể khôi phục.');
      if (!confirmDelete) {
        return;
      }
      
      // Show progress notification
      this._snackBar.open('Đang xóa chốt kho...', '', {
        duration: 0,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-info'],
      });
      
      const currentId = this._ChotkhoService.chotkhoId();
      
      // 🎯 Enhanced delete with bulk operation if multiple records
      let result;
      if (Array.isArray(chotkhoData) && chotkhoData.length > 1) {
        // Bulk delete for multiple records
        const ids = chotkhoData.map((item: any) => item.id).filter(Boolean);
        if (ids.length > 0) {
          result = await this._ChotkhoService.bulkDeleteChotkho(ids);
        } else {
          // Fallback to delete by date
          result = await this._ChotkhoService.DeleteChotkho(currentId);
        }
      } else {
        // Single delete
        result = await this._ChotkhoService.DeleteChotkho(currentId);
      }
      
      // Dismiss progress notification
      this._snackBar.dismiss();

      if (result) {
        let message = '✅ Xóa Chốt Kho Thành Công';
        
        // Enhanced success message based on result type
        if (result.deleted !== undefined) {
          message += ` - Đã xóa ${result.deleted} bản ghi`;
          if (result.failed > 0) {
            message += `, ${result.failed} lỗi`;
          }
          if (result.restoredInventory || result.deletedPhieukho) {
            message += ' | Đã hoàn tác thay đổi tồn kho';
          }
        }

        this._snackBar.open(message, '', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });

        // Navigate back to list and refresh
        this._router.navigate(['/admin/xuatnhapton']);
        this._XuatnhaptonComponent.drawer.close();
        
        // Refresh the main list
        await this.refreshChotkhoData();
        
      } else {
        this._snackBar.open('❌ Không thể xóa chốt kho', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    } catch (error) {
      console.error('Lỗi xóa chốt kho:', error);
      
      // Dismiss any existing notifications
      this._snackBar.dismiss();
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Lỗi hệ thống khi xóa chốt kho';
        
      this._snackBar.open(`❌ ${errorMessage}`, '', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isSaving.set(false);
    }
  }

  goBack() {
    this._router.navigate(['/admin/xuatnhapton'])
    this._XuatnhaptonComponent.drawer.close();
  }

  trackByFn(index: number, item: any): any {
    return item.id;
  }

  toggleEdit() {
    this.isEdit.update(value => !value);
  }

  toggleDelete() {
    this.isDelete.update(value => !value);
  }

  // Excel Upload Methods
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadExcelFile(file);
    }
  }

  private roundToDecimal(num: number, decimals: number = 2): number {
    return Math.round((num + Number.EPSILON) * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }

  // Enhanced file validation method
  private validateExcelFile(file: File): { isValid: boolean; error?: string } {
    // Validate file type
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
      'application/vnd.ms-excel',
      'application/wps-office.xlsx'
    ];
    
    if (!validTypes.includes(file.type)) {
      return { isValid: false, error: 'Chỉ hỗ trợ file Excel (.xlsx, .xls)' };
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return { isValid: false, error: 'File quá lớn. Vui lòng chọn file nhỏ hơn 10MB' };
    }

    // Validate file name
    if (!file.name || file.name.trim() === '') {
      return { isValid: false, error: 'Tên file không hợp lệ' };
    }

    return { isValid: true };
  }

  // Enhanced number parsing with validation
  private parseAndValidateNumber(value: any, fieldName: string): number {
    const parsed = parseFloat(value?.toString() || '0');
    if (isNaN(parsed)) {
      console.warn(`${fieldName} không hợp lệ:`, value);
      return 0;
    }
    return this.roundToDecimal(parsed, 3);
  }

  async uploadExcelFile(file: File) {    
    try {
      this.isUploading.set(true);
      this.uploadResult.set(null);

      // Enhanced file validation
      const validationResult = this.validateExcelFile(file);
      if (!validationResult.isValid) {
        throw new Error(validationResult.error!);
      }

      // Show loading notification
      this._snackBar.open('🔄 Đang xử lý file Excel...', '', {
        duration: 0,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-info'],
      });

      const data = await this.readExcelFile(file);
      const processedData = this.processExcelData(data).filter(item => item.masp && item.slton >= 0);
      
      // Enhanced validation
      if (processedData.length === 0) {
        throw new Error('File Excel không có dữ liệu hợp lệ. Vui lòng kiểm tra định dạng file.');
      }

      // Get inventory data
      const Listmasp = processedData.map((item: any) => item.masp);
      const ListSanpham = await this._ChotkhoService.getListSanphamByMasp(Listmasp);
      const ListIds = ListSanpham.map((sp: any) => sp.id)
      const Listtonkho = await this._ChotkhoService.getListSanphamTonKho(ListIds);
      console.log('📊 Dữ liệu sản phẩm đã tải:', ListSanpham);
        console.log('📊 Dữ liệu tồn kho đã tải:', Listtonkho);
      console.log('📋 Dữ liệu Excel đã xử lý:', processedData);
      
      // Enhanced data mapping
      const Chotkho = processedData.map((item: any) => {
        const sanpham = Listtonkho.find((sp: any) => sp.sanpham?.masp === item.masp);
        
        // Enhanced number handling with validation
        const slthucte = this.parseAndValidateNumber(item.slton, 'Số lượng thực tế');
        const slhethong = sanpham ? this.parseAndValidateNumber(sanpham.slton, 'Số lượng hệ thống') : 0;
        const chenhlech = this.roundToDecimal(slthucte - slhethong, 3);
        
        return {
          khoId: sanpham ? sanpham.khoId : null,
          sanphamId: sanpham ? sanpham.sanphamId : null,
          masp: item.masp,
          tonkhoId: sanpham ? sanpham.id : null,
          phieukhoId: null,
          ngay: this._timezoneService.nowUTC(),
          slthucte: slthucte,
          slhethong: slhethong,
          chenhlech: chenhlech,
          // 🎯 NEW LOGIC: Reset slchogiao và slchonhap về 0 (đã hoàn tất giao/nhập hàng)
          slchogiao: 0,
          slchonhap: 0,
          ghichu: item.ghichu || `Import từ Excel - ${this._timezoneService.nowLocal('DD/MM/YYYY HH:mm')} | Đã hoàn tất giao/nhập hàng`,
          title: this.Title || `Chốt kho ngày ${this._timezoneService.nowLocal('DD/MM/YYYY')}`,
          dvt: item.dvt || '',
          
          // Enhanced product details for display
          sanpham: sanpham ? {
            id: sanpham.sanphamId,
            masp: sanpham.sanpham?.masp,
            title: sanpham.sanpham?.title,
            dvt: sanpham.sanpham?.dvt
          } : {
            id: null,
            masp: item.masp,
            title: item.title || 'Sản phẩm không tồn tại',
            dvt: item.dvt || ''
          },
          
          // Status indicators  
          hasInventoryData: !!sanpham,
          importedFromExcel: true,
          // Add completion status indicators
          isDeliveryCompleted: true,
          isReceiptCompleted: true,
          completedAt: this._timezoneService.nowUTC()
        };
      });

      // Update the list
      this.ListChotkho.update((v: any) => {
        return Chotkho;
      });

      // Enhanced statistics
      const stats = {
        total: Chotkho.length,
        withInventoryData: Chotkho.filter(item => item.hasInventoryData).length,
        withoutInventoryData: Chotkho.filter(item => !item.hasInventoryData).length,
        hasDiscrepancy: Chotkho.filter(item => Math.abs(item.chenhlech) > 0).length
      };

      console.log('📈 Thống kê chốt kho:', stats);
      console.log('✅ Dữ liệu chốt kho cuối cùng:', this.ListChotkho());
      
      this.uploadResult.set({
        success: true,
        message: 'Upload Excel thành công',
        importedCount: processedData.length,
        statistics: stats,
        data: processedData
      });

      // Dismiss loading notification
      this._snackBar.dismiss();

      // Enhanced success message
      const successMessage = `✅ Upload Excel thành công - ${stats.total} bản ghi` +
        (stats.withoutInventoryData > 0 ? ` (${stats.withoutInventoryData} sản phẩm chưa có trong kho)` : '') +
        (stats.hasDiscrepancy > 0 ? ` | ${stats.hasDiscrepancy} có chênh lệch` : '');

      this._snackBar.open(successMessage, '', {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });

    } catch (error: any) {
      console.error('❌ Lỗi upload Excel:', error);
      
      // Dismiss loading notification
      this._snackBar.dismiss();
      
      this.uploadResult.set({
        success: false,
        message: error.message || 'Có lỗi xảy ra khi upload file',
        errors: [error.message]
      });

      this._snackBar.open(`❌ Lỗi upload Excel: ${error.message}`, '', {
        duration: 6000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isUploading.set(false);
    }
  }

  private readExcelFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const workbook = XLSX.read(e.target.result, { type: 'binary' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          resolve(data);
        } catch (error) {
          reject(new Error('Không thể đọc file Excel'));
        }
      };
      reader.onerror = () => reject(new Error('Lỗi khi đọc file'));
      reader.readAsBinaryString(file);
    });
  }

  private processExcelData(rawData: any[]): any[] {
    if (rawData.length < 2) {
      throw new Error('File Excel phải có ít nhất 1 dòng header và 1 dòng dữ liệu');
    }

    const headers = rawData[0];
    const dataRows = rawData.slice(1);

    // Expected headers (customize based on your needs)
    const expectedHeaders = ['masp', 'title', 'dvt', 'slton'];

    // Validate headers
    const missingHeaders = expectedHeaders.filter(header => !headers.includes(header));
    if (missingHeaders.length > 0) {
      throw new Error(`Thiếu cột: ${missingHeaders.join(', ')}`);
    }

    const processedData = [];
    const errors = [];

    for (let i = 0; i < dataRows.length; i++) {
      const row = dataRows[i];
      const rowNumber = i + 2; // +2 because of header and 0-based index

      try {
        // Parse and round the slton value to prevent floating point issues
        const rawSlton = row[headers.indexOf('slton')] || 0;
        const parsedSlton = parseFloat(rawSlton.toString());
        
        const item: any = {
          masp: (row[headers.indexOf('masp')] || '').toString().trim(),
          title: (row[headers.indexOf('title')] || '').toString().trim(),
          dvt: (row[headers.indexOf('dvt')] || '').toString().trim(),
          slton: isNaN(parsedSlton) ? 0 : this.roundToDecimal(parsedSlton, 2)
        };

        // Validate required fields
        if (!item.masp) {
          errors.push(`Dòng ${rowNumber}: Thiếu mã sản phẩm`);
          continue;
        }

        if (isNaN(item.slton) || item.slton < 0) {
          errors.push(`Dòng ${rowNumber}: Số lượng phải là số hợp lệ và >= 0`);
          continue;
        }

        processedData.push(item);

      } catch (error:any) {
        errors.push(`Dòng ${rowNumber}: Lỗi xử lý dữ liệu - ${error.message}`);
      }
    }

    if (errors.length > 0) {
      throw new Error(`Có ${errors.length} lỗi trong file Excel: ${errors.slice(0, 5).join('; ')}${errors.length > 5 ? '...' : ''}`);
    }

    return processedData;
  }

  downloadTemplate() {
    try {
      // Create sample data for template
      const templateData = [
        ['masp', 'title', 'dvt', 'slton'],
        ['I100151', 'Mướp hương', 'Kg', 4.50],
        ['I100170', 'Ớt sừng đỏ', 'Kg', 6.25],
        ['I100180', 'Cà chua', 'Kg', 10.00]
      ];

      // Create workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet(templateData);

      // Set column widths and number format
      worksheet['!cols'] = [
        { wch: 15 }, // masp
        { wch: 30 }, // title
        { wch: 10 }, // dvt
        { wch: 15 }  // slton
      ];

      // Format the slton column as numbers with 2 decimal places
      const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:D4');
      for (let row = 1; row <= range.e.r; row++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: 3 }); // Column D (slton)
        if (worksheet[cellAddress]) {
          worksheet[cellAddress].z = '#,##0.00'; // Number format
        }
      }

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Mẫu chốt kho');

      // Generate filename
      const fileName = `Mau_chotkho_${new Date().toISOString().split('T')[0]}.xlsx`;

      // Download file
      XLSX.writeFile(workbook, fileName);

      this._snackBar.open('Đã tải xuống file mẫu', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });

    } catch (error) {
      console.error('Error downloading template:', error);
      this._snackBar.open('Lỗi khi tải file mẫu', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  getChenhLechClass(chenhLech: number): string {
    const rounded = this.roundToDecimal(chenhLech, 2);
    if (rounded > 0) {
      return 'text-green-600 font-medium'; // Thừa
    } else if (rounded < 0) {
      return 'text-red-600 font-medium'; // Thiếu
    } else {
      return 'text-gray-600'; // Đúng
    }
  }

  // Add a utility method for displaying numbers consistently
  formatNumber(value: number): string {
    return this.roundToDecimal(value, 2).toFixed(3);
  }

  // Enhanced method for batch operations
  async batchCreateChotkho() {
    try {
      this.isSaving.set(true);
      
      const data = this.ListChotkho();
      if (!data || data.length === 0) {
        this._snackBar.open('❌ Không có dữ liệu để xử lý', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        });
        return;
      }

      // Show progress
      this._snackBar.open(`🔄 Đang xử lý ${data.length} bản ghi chốt kho...`, '', {
        duration: 0,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-info'],
      });

      const result = await this._ChotkhoService.bulkCreateChotkho(data);
      
      this._snackBar.dismiss();
      
      if (result) {
        this._snackBar.open(`✅ Xử lý hàng loạt thành công - ${result.data?.length || 0} bản ghi`, '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        
        await this.refreshChotkhoData();
      } else {
        this._snackBar.open('❌ Không thể xử lý hàng loạt', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    } catch (error) {
      console.error('Lỗi xử lý hàng loạt:', error);
      this._snackBar.dismiss();
      
      const errorMessage = error instanceof Error ? error.message : 'Lỗi hệ thống';
      this._snackBar.open(`❌ ${errorMessage}`, '', {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isSaving.set(false);
    }
  }

  // 🎯 NEW METHOD: Specialized method for completing delivery and receipt
  completeDeliveryAndReceipt() {
    this.ListChotkho.update((items: any[]) => {
      return items.map(item => ({
        ...item,
        // Reset pending quantities to 0 (completed)
        slchogiao: 0,
        slchonhap: 0,
        // Update status flags
        isDeliveryCompleted: true,
        isReceiptCompleted: true,
        completedAt: this._timezoneService.nowUTC(),
        // Update notes
        ghichu: (item.ghichu || '') + ` | Hoàn tất giao/nhập hàng lúc ${this._timezoneService.nowLocal('DD/MM/YYYY HH:mm')}`
      }));
    });
    
    this._snackBar.open('✅ Đã đánh dấu hoàn tất giao hàng và nhập hàng cho tất cả sản phẩm', '', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  }

  // 🎯 NEW METHOD: Reset pending quantities for specific items
  resetPendingQuantities(indices?: number[]) {
    this.ListChotkho.update((items: any[]) => {
      return items.map((item, index) => {
        // If indices specified, only update those items, otherwise update all
        if (indices && !indices.includes(index)) {
          return item;
        }
        
        return {
          ...item,
          slchogiao: 0,
          slchonhap: 0,
          isDeliveryCompleted: true,
          isReceiptCompleted: true,
          completedAt: this._timezoneService.nowUTC()
        };
      });
    });
    
    const message = indices 
      ? `✅ Đã reset ${indices.length} sản phẩm về trạng thái hoàn tất`
      : '✅ Đã reset tất cả sản phẩm về trạng thái hoàn tất';
      
    this._snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-info'],
    });
  }

  // Enhanced validation and calculation method  
  recalculateAllDiscrepancies() {
    this.ListChotkho.update((items: any[]) => {
      return items.map(item => ({
        ...item,
        chenhlech: this.roundToDecimal(
          Number(item.slthucte || 0) - Number(item.slhethong || 0), 
          3
        )
      }));
    });
    
    this._snackBar.open('✅ Đã tính lại tất cả chênh lệch', '', {
      duration: 1500,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-info'],
    });
  }

  // Get statistics for current chotkho data
  getChotkhoStatistics() {
    const data = this.ListChotkho();
    if (!data || data.length === 0) {
      return {
        total: 0,
        withDiscrepancy: 0,
        positiveDiscrepancy: 0,
        negativeDiscrepancy: 0,
        zeroDiscrepancy: 0,
        totalValue: 0,
        // 🎯 NEW STATS: Completion status
        deliveryCompleted: 0,
        receiptCompleted: 0,
        fullyCompleted: 0,
        pendingDelivery: 0,
        pendingReceipt: 0
      };
    }

    const stats = {
      total: data.length,
      withDiscrepancy: data.filter((item: any) => Math.abs(item.chenhlech || 0) > 0).length,
      positiveDiscrepancy: data.filter((item: any) => (item.chenhlech || 0) > 0).length,
      negativeDiscrepancy: data.filter((item: any) => (item.chenhlech || 0) < 0).length,
      zeroDiscrepancy: data.filter((item: any) => (item.chenhlech || 0) === 0).length,
      totalValue: data.reduce((sum: number, item: any) => sum + (item.slthucte || 0), 0),
      // 🎯 NEW STATS: Completion status tracking
      deliveryCompleted: data.filter((item: any) => (item.slchogiao || 0) === 0).length,
      receiptCompleted: data.filter((item: any) => (item.slchonhap || 0) === 0).length,
      fullyCompleted: data.filter((item: any) => (item.slchogiao || 0) === 0 && (item.slchonhap || 0) === 0).length,
      pendingDelivery: data.filter((item: any) => (item.slchogiao || 0) > 0).length,
      pendingReceipt: data.filter((item: any) => (item.slchonhap || 0) > 0).length
    };

    return stats;
  }

  // Display current statistics
  showStatistics() {
    const stats = this.getChotkhoStatistics();
    
    const message = `📊 Thống kê chốt kho:
    • Tổng: ${stats.total} bản ghi
    • Có chênh lệch: ${stats.withDiscrepancy}
    • Thừa: ${stats.positiveDiscrepancy}
    • Thiếu: ${stats.negativeDiscrepancy}
    • Khớp: ${stats.zeroDiscrepancy}
    • Tổng giá trị: ${this.formatNumber(stats.totalValue)}`;

    this._snackBar.open(message, 'Đóng', {
      duration: 8000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-info'],
    });
  }

  // Enhanced validation method for chotkho data
  private validateChotkhoData(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    const data = this.ListChotkho();
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      errors.push('Không có dữ liệu chốt kho để xử lý');
      return { isValid: false, errors };
    }

    // Validate each chotkho record
    data.forEach((item: any, index: number) => {
      const rowNum = index + 1;
      
      if (!item.masp || item.masp.trim() === '') {
        errors.push(`Dòng ${rowNum}: Thiếu mã sản phẩm`);
      }
      
      if (item.slthucte === undefined || item.slthucte === null) {
        errors.push(`Dòng ${rowNum}: Thiếu số lượng thực tế`);
      } else if (item.slthucte < 0) {
        errors.push(`Dòng ${rowNum}: Số lượng thực tế không được âm`);
      }
      
      if (item.slhethong === undefined || item.slhethong === null) {
        errors.push(`Dòng ${rowNum}: Thiếu số lượng hệ thống`);
      }
      
      // Business rule: Check for extreme differences
      if (item.chenhlech && Math.abs(item.chenhlech) > 5000) {
        errors.push(`Dòng ${rowNum}: Chênh lệch quá lớn (${item.chenhlech}), vui lòng kiểm tra lại`);
      }
    });

    // Limit displayed errors for better UX
    const displayErrors = errors.length > 5 ? 
      [...errors.slice(0, 5), `...và ${errors.length - 5} lỗi khác`] : 
      errors;

    return {
      isValid: errors.length === 0,
      errors: displayErrors
    };
  }

  // Enhanced data preparation method for new master-detail schema
  private prepareChotkhoData(): any {
    const data = this.ListChotkho();
    const currentDate = this._timezoneService.nowUTC();
    
    if (!data || data.length === 0) {
      return null;
    }

    // Prepare the master Chotkho record
    const masterChotkho = {
      khoId: data[0]?.khoId || null,
      ngay: currentDate,
      title: this.Title || `Chốt kho ngày ${this._timezoneService.nowLocal('DD/MM/YYYY')}`,
      ghichu: `Chốt kho tự động - ${this._timezoneService.nowLocal('DD/MM/YYYY HH:mm')} | Đã hoàn tất giao/nhập hàng`,
      isActive: true,
      userId: data[0]?.userId || null,
      // Prepare the detail records
      details: data.map((item: any) => ({
        sanphamId: item.sanphamId || null,
        tonkhoId: item.tonkhoId || null,
        slthucte: this.roundToDecimal(Number(item.slthucte || 0), 3),
        slhethong: this.roundToDecimal(Number(item.slhethong || 0), 3),
        chenhlech: this.roundToDecimal(
          Number(item.slthucte || 0) - Number(item.slhethong || 0), 
          3
        ),
        ghichu: item.ghichu || `Chi tiết chốt kho - ${item.masp || 'N/A'}`,
        isActive: item.isActive !== undefined ? item.isActive : true
      }))
    };

    return masterChotkho;
  }

  // Enhanced refresh method
  private async refreshChotkhoData(): Promise<void> {
    try {
      // Refresh the current chotkho data if we have an ID
      const currentId = this.xuatnhaptonId();
      if (currentId && currentId !== 'new') {
        await this._ChotkhoService.getChotkhoBy({ ngay: currentId });
      }
      
      // Optionally refresh the main list
      await this._ChotkhoService.getAllChotkho();
      
    } catch (error) {
      console.warn('Warning: Could not refresh chotkho data:', error);
      // Don't throw here to avoid interrupting the main flow
    }
  }

  // 🎯 NEW: Check completion status for specific item
  isItemFullyCompleted(item: any): boolean {
    return (item.slchogiao || 0) === 0 && (item.slchonhap || 0) === 0;
  }

  // 🎯 NEW: Check if there are pending changes to save
  hasDataChanges(): boolean {
    const data = this.ListChotkho();
    if (!data || data.length === 0) return false;

    // Check for any items with discrepancies that need to be addressed
    const hasDiscrepancy = data.some((item: any) => Math.abs(item.chenhlech || 0) > 0);
    
    // Check for pending deliveries or receipts that need completion
    const hasPendingOperations = data.some((item: any) => 
      (item.slchogiao || 0) > 0 || (item.slchonhap || 0) > 0
    );

    // Check for edited items that haven't been saved
    const hasEditedItems = data.some((item: any) => item.isEdited === true);

    return hasDiscrepancy || hasPendingOperations || hasEditedItems;
  }

  // 🎯 NEW: Get completion rate percentage
  getCompletionRate(): number {
    const data = this.ListChotkho();
    if (!data || data.length === 0) return 100;

    const completed = data.filter((item: any) => this.isItemFullyCompleted(item)).length;
    return Math.round((completed / data.length) * 100);
  }

  // 🎯 NEW: Get summary of completion status
  getCompletionSummary(): string {
    const stats = this.getChotkhoStatistics();
    const rate = this.getCompletionRate();
    
    return `Hoàn tất: ${stats.fullyCompleted}/${stats.total} sản phẩm (${rate}%) | Chờ giao: ${stats.pendingDelivery} | Chờ nhập: ${stats.pendingReceipt}`;
  }
}