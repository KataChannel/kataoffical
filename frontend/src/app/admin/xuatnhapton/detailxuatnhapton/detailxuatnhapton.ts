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
  _route: ActivatedRoute = inject(ActivatedRoute)
  _router: Router = inject(Router)
  _snackBar: MatSnackBar = inject(MatSnackBar)

  // Excel upload related properties
  isUploading = signal(false);
  uploadResult = signal<any>(null);
  // Add loading state for save operation
  isSaving = signal(false);

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
        this.DetailXuatnhapton.set({ title: "Chốt Kho Ngày " + new Date().toLocaleDateString() });
        this._XuatnhaptonComponent.drawer.open();
        this.isEdit.update(value => !value);
        this._router.navigate(['/admin/xuatnhapton', "new"]);
      }
      else {
        await this._ChotkhoService.getChotkhoBy({ ngay: id });
        this._XuatnhaptonComponent.drawer.open();
        this._router.navigate(['/admin/xuatnhapton', id]);
      }
    });
  }

  DetailXuatnhapton: any = this._ChotkhoService.ListChotkho;
  isEdit = signal(false);
  isDelete = signal(false);
  xuatnhaptonId: any = this._ChotkhoService.chotkhoId

  async ngOnInit() {
          const id = this._ChotkhoService.chotkhoId();
      if (!id) {
        this._router.navigate(['/admin/xuatnhapton']);
        this._XuatnhaptonComponent.drawer.close();
      }
      if (id === 'new') {
        this.DetailXuatnhapton.set({ title: "Chốt Kho Ngày " + new Date().toLocaleDateString() });
        this._XuatnhaptonComponent.drawer.open();
        this.isEdit.update(value => !value);
        this._router.navigate(['/admin/xuatnhapton', "new"]);
      }
      else {
        await this._ChotkhoService.getChotkhoBy({ ngay: id });
        this._XuatnhaptonComponent.drawer.open();
        this._router.navigate(['/admin/xuatnhapton', id]);
      }
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
      const result = await this._ChotkhoService.CreateChotkho(this.DetailXuatnhapton());
      
      // Check if result has the expected structure
      if (result && result.status === 'success') {
        const { created, updated, failed, summary } = result;
        
        let message = 'Tạo Mới Thành Công';
        if (summary) {
          message += ` - Đã xử lý: ${summary.totalProcessed || 0} bản ghi`;
          if (created > 0) message += `, Tạo mới: ${created}`;
          if (updated > 0) message += `, Cập nhật: ${updated}`;
          if (failed > 0) message += `, Lỗi: ${failed}`;
        } else if (created || updated) {
          message += ` - Tạo mới: ${created || 0}, Cập nhật: ${updated || 0}`;
          if (failed > 0) message += `, Lỗi: ${failed}`;
        }
        
        this._snackBar.open(message, '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        
        this.isEdit.update(value => !value);
      } else if (result && result.status === 'partial') {
        // Handle partial success
        const { created, updated, failed, errors } = result;
        let message = `Hoàn thành một phần - Tạo mới: ${created || 0}, Cập nhật: ${updated || 0}`;
        if (failed > 0) message += `, Lỗi: ${failed}`;
        
        this._snackBar.open(message, '', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        });
        
        this.isEdit.update(value => !value);
      } else {
        // Handle unexpected response format
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        
        this.isEdit.update(value => !value);
      }
    } catch (error) {
      console.error('Lỗi khi tạo xuatnhapton:', error);
      this._snackBar.open('Lỗi khi tạo chốt kho', '', {
        duration: 3000,
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
      await this._ChotkhoService.updateChotkho(this.DetailXuatnhapton());
      this._snackBar.open('Cập Nhật Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      this.isEdit.update(value => !value);
    } catch (error) {
      console.error('Lỗi khi cập nhật xuatnhapton:', error);
      this._snackBar.open('Lỗi khi cập nhật chốt kho', '', {
        duration: 3000,
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
      await this._ChotkhoService.DeleteChotkho(this.DetailXuatnhapton());

      this._snackBar.open('Xóa Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });

      this._router.navigate(['/admin/xuatnhapton']);
    } catch (error) {
      console.error('Lỗi khi xóa xuatnhapton:', error);
      this._snackBar.open('Lỗi khi xóa chốt kho', '', {
        duration: 3000,
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

  FillSlug() {
    this.DetailXuatnhapton.update((v: any) => {
      v.slug = convertToSlug(v.title);
      return v;
    })
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

  async uploadExcelFile(file: File) {    
    try {
      this.isUploading.set(true);
      this.uploadResult.set(null);

      // Show loading notification
      this._snackBar.open('Đang xử lý file Excel...', '', {
        duration: 0, // Keep open until manually dismissed
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-info'],
      });

      // Validate file type
      const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel','application/wps-office.xlsx'];
      if (!validTypes.includes(file.type)) {
        throw new Error('Chỉ hỗ trợ file Excel (.xlsx, .xls)');
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File quá lớn. Vui lòng chọn file nhỏ hơn 10MB');
      }

      const data = await this.readExcelFile(file);
      const processedData = this.processExcelData(data).filter(item => item.masp && item.slton >= 0);
      
      // Validate processed data
      if (processedData.length === 0) {
        throw new Error('File Excel không có dữ liệu hợp lệ');
      }

      // Upload to backend
      const result: any = processedData;
      const Listmasp = processedData.map((item: any) => item.masp);
      const Listtonkho = await this._ChotkhoService.getListSanphamTonKho(Listmasp);
      
      console.log('List sản phẩm tồn kho:', Listtonkho);
      console.log('Processed Data:', result);
      
      const Chotkho = result.map((item: any) => {
        const sanpham = Listtonkho.find((sp: any) => sp.sanpham?.masp === item.masp);
        console.log('sanpham:', sanpham);
        
        // Use proper number handling to avoid floating point issues
        const slthucte = this.roundToDecimal(Number(item.slton), 2);
        const slhethong = sanpham ? this.roundToDecimal(Number(sanpham.slton), 2) : 0;
        const chenhlech = this.roundToDecimal(slthucte - slhethong, 2);
        
        return {
          khoId: sanpham ? sanpham.khoId : null,
          sanphamId: sanpham ? sanpham.sanphamId : null, // Fixed: should be sanphamId not id
          masp: item.masp,
          tonkhoId: sanpham ? sanpham.id : null, // This should be the tonkho record ID
          phieukhoId: null,
          ngay: new Date(),
          slthucte: slthucte,
          slhethong: slhethong,
          chenhlech: chenhlech,
          ghichu: item.ghichu || '',
          title: this.DetailXuatnhapton().title || '',
          dvt: item.dvt || '',
          // Add product details for display
        sanpham: sanpham ? {
        id: sanpham.sanphamId,
        masp: sanpham.sanpham?.masp,
        title: sanpham.sanpham?.title,
        dvt: sanpham.sanpham?.dvt
          } : null
        };
      }).filter((item:any) => item.slthucte !== 0);

      // Fix the update method - should update the array properly
      this.DetailXuatnhapton.update((v: any) => {
        v = Chotkho
        return v
      });
      
      console.log('Chốt kho data:', this.DetailXuatnhapton());
      
      this.uploadResult.set({
        success: true,
        message: 'Upload thành công',
        importedCount: processedData.length,
        data: result
      });

      // Dismiss loading notification
      this._snackBar.dismiss();

      this._snackBar.open(`Upload Excel thành công - ${processedData.length} bản ghi`, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });

    } catch (error: any) {
      console.error('Error uploading Excel:', error);
      
      // Dismiss loading notification
      this._snackBar.dismiss();
      
      this.uploadResult.set({
        success: false,
        message: error.message || 'Có lỗi xảy ra khi upload file',
        errors: Array.isArray(error.details) ? error.details : []
      });

      this._snackBar.open('Lỗi upload Excel: ' + error.message, '', {
        duration: 5000,
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
    return this.roundToDecimal(value, 2).toFixed(2);
  }
}