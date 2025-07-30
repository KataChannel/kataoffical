import { AfterViewInit, Component, computed, effect, inject, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DathangService } from '../dathang.service';
import { MatMenuModule } from '@angular/material/menu';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { NhacungcapService } from '../../nhacungcap/nhacungcap.service';
import { SanphamService } from '../../sanpham/sanpham.service';
import { BanggiaService } from '../../banggia/banggia.service';
import { TrangThaiDon } from '../../../shared/utils/trangthai';
import moment from 'moment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Debounce, memoize } from '../../../shared/utils/decorators';
import { ChangeDetectionStrategy } from '@angular/core';
import { 
  readExcelFileNoWorker, 
  writeExcelFileSheets,
  writeExcelFileWithSheets 
} from '../../../shared/utils/exceldrive.utils';
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
import { KhachhangService } from '../../khachhang/khachhang.service';
import { GenId } from '../../../shared/utils/shared.utils';
@Component({
  selector: 'app-listdathang',
  templateUrl: './listdathang.component.html',
  styleUrls: ['./listdathang.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatDialogModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListDathangComponent {
  Detail: any = {};
  displayedColumns: string[] = [
    'STT',
   // 'title',
    'madncc',
    'nhacungcap',
    'sanpham',
    'ngaynhan',
    'status', 
    'ghichu',
    'createdAt',
    'updatedAt',
    // 'action'
  ];

  ColumnName: any = {
    STT: 'STT',
  //  title: 'Tiêu Đề',
    madncc: 'Mã Đơn Nhập',
    nhacungcap: 'Nhà Cung Cấp',
    sanpham: 'Sản Phẩm',
    ngaynhan: 'Ngày Nhận',
    status: 'Trạng Thái',
    ghichu: 'Ghi Chú',
    createdAt:'Ngày Tạo',
    updatedAt:'Ngày Cập Nhật',
    // action: 'Hành Động'
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('DathangColFilter') || '[]'
  );  Columns: any[] = [];
  isFilter: boolean = false;
  Trangthaidon:any = TrangThaiDon;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  @ViewChild('dialogImportExcel') dialogImportExcel!: TemplateRef<any>;
  @ViewChild('dialogImportExcelCu') dialogImportExcelCu!: TemplateRef<any>;
  
  filterValues: { [key: string]: string } = {};
  private _DathangService: DathangService = inject(DathangService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);  private _NhacungcapService: NhacungcapService = inject(NhacungcapService);
  private _SanphamService: SanphamService = inject(SanphamService);
  private _BanggiaService: BanggiaService = inject(BanggiaService);
  private _KhachhangService: KhachhangService = inject(KhachhangService);  private _router: Router = inject(Router);
  Listdathang:any = this._DathangService.ListDathang;
  page = this._DathangService.page;
  pageCount = this._DathangService.pageCount;
  total = this._DathangService.total;
  pageSize = this._DathangService.pageSize;
  dathangId = this._DathangService.dathangId;
  dataSource = new MatTableDataSource([]);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  CountItem: any = 0;
  searchParam:any={
    Batdau: moment().toDate(),
    Ketthuc: moment().toDate(),
    page: this.page(),
    pageSize: this.pageSize(),
  }
  totalItems: number = 0;
  constructor() {
    effect(async () => {
      this.dataSource.data = this.Listdathang();
      this.dataSource.sort = this.sort;
      if (this.paginator) {
        this.paginator.pageIndex = this.page() - 1;
        this.paginator.pageSize = this.pageSize();
        this.paginator.length = this.total();
      }  
    });
  }
  createFilter(): (data: any, filter: string) => boolean {
    return (data, filter) => {
      const filterObject = JSON.parse(filter);
      let isMatch = true;
      this.displayedColumns.forEach(column => {
        if (filterObject[column]) {
          const value = data[column] ? data[column].toString().toLowerCase() : '';
          isMatch = isMatch && value.includes(filterObject[column].toLowerCase());
        }
      });
      return isMatch;
    };
  }

  onPageSizeChange(size: number, menuHienthi: any) {
    if (size > this.total()) {
      this._snackBar.open(`Số lượng tối đa ${this.total()}`, '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      size = this.total();
    }
    this._DathangService.page.set(1);
    this._DathangService.getDathangBy(this.searchParam);
    menuHienthi.closeMenu();
  }
  onPreviousPage(){
    if (this.page() > 1) {
      this._DathangService.page.set(this.page() - 1);
      this.searchParam.page = this.page();
      this._DathangService.getDathangBy(this.searchParam);
    }
  }

  onNextPage(){
    if (this.page() < this.pageCount()) {
      this._DathangService.page.set(this.page() + 1);
      this.searchParam.page = this.page();
      this._DathangService.getDathangBy(this.searchParam);
    }
  }


  onDateChange(): void {
    this.ngOnInit();
  }
  async ngOnInit(): Promise<void> {
    await this._DathangService.getDathangBy(this.searchParam);
    this.displayedColumns = Object.keys(this.ColumnName);
    this.dataSource = new MatTableDataSource(this.Listdathang());
    this.dataSource.sort = this.sort;
    this.initializeColumns();
    this.setupDrawer();

  }
  private initializeColumns(): void {
    this.Columns = Object.entries(this.ColumnName).map(([key, value]) => ({ key, value, isShow: true }));
    this.FilterColumns = this.FilterColumns.length ? this.FilterColumns : this.Columns;
    localStorage.setItem('DathangColFilter', JSON.stringify(this.FilterColumns));
    this.displayedColumns = this.FilterColumns.filter(col => col.isShow).map(col => col.key);
    this.ColumnName = this.FilterColumns.reduce((acc, { key, value, isShow }) => 
      isShow ? { ...acc, [key]: value } : acc, {} as Record<string, string>);
  }
  @Debounce(500)
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (!filterValue) {
      this.searchParam = {
        page: this.page(),
        pageSize: this.pageSize(),
      };
      this._DathangService.getDathangBy(this.searchParam);
      return;
    }
    this.searchParam.subtitle = filterValue.trim().toLowerCase();
    this._DathangService.getDathangBy(this.searchParam);
  }

  private setupDrawer(): void {
    this._breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        if (result.matches) {
          this.drawer.mode = 'over';
        } else {
          this.drawer.mode = 'side';
        }
      });
  }

  toggleColumn(item: any): void {
    const column = this.FilterColumns.find((v) => v.key === item.key);
    if (column) {
      column.isShow = !column.isShow;
      this.updateDisplayedColumns();
    }
  }

  @memoize()
  FilterHederColumn(list: any, column: any) {
    const uniqueList = list.filter((obj: any, index: number, self: any) => 
      index === self.findIndex((t: any) => t[column] === obj[column])
    );
    return uniqueList;
  }

  @Debounce(300)
  doFilterHederColumn(event: any, column: any): void {
    this.dataSource.filteredData = this.Listdathang().filter((v: any) => 
      v[column].toLowerCase().includes(event.target.value.toLowerCase())
    );
  }
  private updateDisplayedColumns(): void {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map(
      (item) => item.key
    );
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
    localStorage.setItem('DathangColFilter',JSON.stringify(this.FilterColumns)
    );
  }
  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) =>
      v.value.toLowerCase().includes(query)
    );
  }
  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/dathang', 'new']);
  }
  goToDetail(item: any): void {
     this._DathangService.setDathangId(item.id);
    this.drawer.open();
    this._router.navigate(['admin/dathang', item.id]);
  }
  UpdateDathang(item:any){
    item.status = 'dagiao';
    this._DathangService.updateDathang(item).then(() => {
      this._snackBar.open('Cập Nhật Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      // window.location.reload();
    });
  }
 async ExportExcel(data: any = null, title: any = null) {
    // Use existing data if no specific data provided
    const exportData = data || this.Listdathang();
    const exportTitle = title || `Danh Sách Đặt Hàng ${moment().format('DD-MM-YYYY')}`;
    
    await this._NhacungcapService.getAllNhacungcap();
    await this._SanphamService.getAllSanpham();
    await this._BanggiaService.getAllBanggia();
    
    const NCC = this._NhacungcapService.ListNhacungcap().map((v: any) => ({
      mancc: v.mancc,
      name: v.name,
      diachi: v.diachi,
      email: v.email,
      sdt: v.sdt,
    }));
    const SP = this._SanphamService.ListSanpham().map((v: any) => ({
      subtitle: v.subtitle,
      masp: v.masp,
      title: v.title,
      dvt: v.dvt,
    }));
    const BG = this._BanggiaService.ListBanggia().map((v: any) => ({
      mabanggia: v.mabanggia,
      title: v.title,
    }));
    
    let index = 1;
    const dataExport = exportData.flatMap((item: any) =>
      item.sanpham.map((sanpham: any) => {
        return {
          'STT': index++,
          'Nhà Cung Cấp': item.nhacungcap?.name || '',
          'Tên Sản Phẩm': sanpham.sanpham?.title || '',
          'DVT': sanpham.sanpham?.dvt || '',
          'SL Đặt': Number(sanpham.sldat) || 0,
          'Ghi Chú': item.ghichu || '',
        };
      })
    );
    
    writeExcelFileWithSheets({ SP, NCC, BG, 'DonDatHang': dataExport }, exportTitle);
  }

EditList: any[] = [];
AddToEdit(item: any): void {
  const existingItem = this.EditList.find((v: any) => v.id === item.id);
  if (existingItem) {
    this.EditList = this.EditList.filter((v: any) => v.id !== item.id);
  } else {
    this.EditList.push(item);
  }
}
CheckItemInEdit(item: any): boolean {
  return this.EditList.some((v: any) => v.id === item.id);
}
DoDanhan(){
    Promise.all(this.EditList.map((item: any) => 
      {
        item.status = 'danhan';
        return this._DathangService.updateDathang(item);
      }))
    .then(() => {
      this.EditList = [];
      this._snackBar.open('Cập Nhật Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    });
}
dialog = inject(MatDialog);
dialogCreateRef: any;

openDeleteDialog(template: TemplateRef<any>, item?: any) {
     const dialogDeleteRef = this.dialog.open(template, {
       hasBackdrop: true,
       disableClose: true,
     });
     dialogDeleteRef.afterClosed().subscribe(async (result) => {
       if (result=="true") {
        if(item){
         await this._DathangService.DeleteDathang(item)
         return;
        }
         this.DeleteListItem();
       }
     });
 }

openDathangDialog(template: TemplateRef<any>) {
     const dialogDeleteRef = this.dialog.open(template, {
       hasBackdrop: true,
       disableClose: true,
     });
     dialogDeleteRef.afterClosed().subscribe(async (result) => {
       if (result=="true") {

       }
     });
 }


  async DeleteListItem(): Promise<void> {
    if (!this.EditList?.length) {
      this._snackBar.open('Không có mục nào được chọn để xóa', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'],
      });
      return;
    }

    try {
      const result: any = await this._DathangService.DeleteBulkDathang(this.EditList.map((v: any) => v.id));
      this._snackBar.open(`Xóa thành công ${result.success} đặt hàng ${result.fail} lỗi`, '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    } catch (error: any) {
      console.error('Lỗi khi xóa đặt hàng:', error);
      this._snackBar.open('Có lỗi xảy ra khi xóa đặt hàng', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.EditList = [];
      await this.ngOnInit();
    }
  }

  // Excel Import functionality for Dathang - similar to Donhang
  ListImportExcel: any[] = [];
  statusDetails: any[] = [];
  ListImportData: any[] = [];
  FilterNhacungcap: any = [];
  async ImporExcel(event: any) {
    const files = Array.from(event.target.files) as File[];
    let processedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    // Reset arrays
    this.ListImportData = [];
    this.statusDetails = [];

    // Process files sequentially
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Skip files with "~$" in the filename
      if (file.name.includes('~$')) {
        console.log(`Skipping temporary file: ${file.name}`);
        this._snackBar.open(`Bỏ qua file tạm: ${file.name}`, '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        });
        skippedCount++;
        this.statusDetails.push({
          fileName: file.name,
          tenkhongdau: removeVietnameseAccents(file.name.replace('.xlsx', '')),
          status: 'Skipped',
          message: 'File tạm thời, không xử lý',
        });
        continue;
      }
      try {
        this._snackBar.open(`Đang xử lý file: ${file.name}`, '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        });
        const TenNCC = removeVietnameseAccents(file.name.replace('.xlsx', ''));
        let data = await readExcelFileNoWorker(file, 'TEM');
        if (!data || !Array.isArray(data)) {
          data = await readExcelFileNoWorker(file, 'TEMPLATE');
        }
        const editdata = data
          .filter((item: any) => {
            const validItemCode =
              typeof item?.ItemCode === 'string' && item.ItemCode.trim() !== '';
            const validQuantity =
              item?.Quantity != null &&
              item.Quantity !== '' &&
              item.Quantity !== 0;
            return validItemCode && validQuantity;
          })
          .map((item: any) => ({
            ItemCode: item.ItemCode ?? '',
            Quantity: Number(item.Quantity) ?? 0,
          }));
        const itemEdit = {
          tenfile: file.name.replace('.xlsx', ''),
          tenncc: TenNCC,
          sanpham: editdata,
          ngaynhan: moment().format('YYYY-MM-DD'),
        };
        this.ListImportData.push(itemEdit);
        processedCount++;
        this._snackBar.open(`Xử lý thành công file: ${file.name}`, '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        });
        this.statusDetails.push({
          fileName: file.name,
          ngaynhan: moment().format('YYYY-MM-DD'),
          tenkhongdau: removeVietnameseAccents(file.name.replace('.xlsx', '')),
          status: 'Processed',
          message: 'Xử lý thành công',
        });
      } catch (error: any) {
        console.error(`Error processing file ${file.name}:`, error);
        this._snackBar.open(
          `Lỗi xử lý file ${file.name}: ${error.message}`,
          '',
          {
            duration: 1000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          }
        );
        errorCount++;
        this.statusDetails.push({
          fileName: file.name,
          tenkhongdau: removeVietnameseAccents(file.name.replace('.xlsx', '')),
          status: 'Error',
          message: error.message,
        });
        continue;
      }
      console.log(this.ListImportData);
    }
    
    this.statusDetails.push({
      fileName: `Overall Đang Xử Lý: ${processedCount}, Bỏ Qua: ${skippedCount}, Lỗi: ${errorCount}`,
      status: 'Success',
      message: ``,
    });
    // After all files have been processed, perform the import
    this.dialog.open(this.dialogImportExcelCu, {});
    this.statusDetails.forEach((v: any, k: any) => {
      this.FilterNhacungcap[k] = this._NhacungcapService.ListNhacungcap();
    });
    // Sort to put 'Processed' status items at the top
    this.statusDetails.sort((a, b) => {
      if (a.status === 'Processed' && b.status !== 'Processed') return -1;
      if (a.status !== 'Processed' && b.status === 'Processed') return 1;
      return 0;
    });
  }

  removeItemImport(item: any) {
    this.statusDetails = this.statusDetails.filter((v) => v.tenkhongdau !== item.tenkhongdau);
    this.ListImportData = this.ListImportData.filter((v) => v.tenncc !== item.tenkhongdau);
  }
  async DoImportNhacungcapCu() {
    try {
      console.log('ListImportData', this.ListImportData);
      const invalidItems = this.ListImportData.filter(
        (item) => !item.nhacungcapId || !item.ngaynhan
      );
      console.log('invalidItems', invalidItems);

      if (invalidItems.length > 0) {
        const invalidFiles = Array.from(
          new Set(invalidItems.map((item) => item.tenfile || 'Unknown'))
        );
        this._snackBar.open(
          `Các Nhà cung cấp sau không đủ dữ liệu : ${invalidFiles.join(', ')}`,
          '',
          {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          }
        );
        return;
      }
      console.log('ListImportData', this.ListImportData);

      const result = await this._DathangService.ImportDathangCu(
        this.ListImportData
      );
      this.dialog.closeAll();
      this._snackBar.open(
        `Nhập đặt hàng : Thành công ${result.success}, Thất bại ${result.fail}, Bỏ qua ${result.skip}. Reload Lại sau 3s`,
        '',
        {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        }
      );
    } catch (importError: any) {
      console.error('Lỗi khi nhập đặt hàng:', importError);
      this._snackBar.open(`Lỗi khi nhập đặt hàng: ${importError.message}`, '', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      this.statusDetails.push({
        fileName: 'Overall',
        status: 'Error',
        message: importError.message,
      });
      return;
    }
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
  async ImportDathang(items: any[]): Promise<void> {
    if (!items || !items.length) {
      this._snackBar.open('Không có dữ liệu để nhập', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      return;
    }

    try {
      // Validate required field in first item
      const firstItem = items[0];
      if (!firstItem.mancc) {
        throw new Error('Mã nhà cung cấp không được để trống');
      }

      // Find supplier
      const nhacungcap = await this._DathangService.getNhacungcapBy({
        mancc: firstItem.mancc,
        isOne: true,
      });
      if (!nhacungcap) {
        throw new Error(`Không tìm thấy nhà cung cấp với mã ${firstItem.mancc}`);
      }

      // Process products with error handling
      const sanpham = await Promise.all(
        items.map(async (item) => {
          if (!item.masp) {
            throw new Error('Mã sản phẩm không được để trống');
          }

          const sp = await this._SanphamService.getSanphamBy({
            masp: item.masp,
          });
          if (!sp) {
            throw new Error(`Không tìm thấy sản phẩm với mã ${item.masp}`);
          }

          return {
            ...sp,
            sldat: parseFloat(Number(item.sldat).toFixed(2)) || 0,
            slgiao: parseFloat(Number(item.sldat).toFixed(2)) || 0,
            slnhan: parseFloat(Number(item.sldat).toFixed(2)) || 0,
          };
        })
      );

      // Create order data
      const dathangData = {
        title: `Đặt hàng ${GenId(4, false)}`,
        type: 'dathang',
        ngaynhan: firstItem.ngay || moment().format('YYYY-MM-DD'),
        nhacungcapId: nhacungcap.id,
        nhacungcap: nhacungcap,
        sanpham: sanpham,
        status: 'new',
        createdAt: new Date(),
      };

      console.log(dathangData);
      await this._DathangService.CreateDathang(dathangData);

      this._snackBar.open('Nhập đặt hàng thành công', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });

      // Refresh data
      this.ngOnInit();
    } catch (error: any) {
      console.error('Error importing order:', error);
      this._snackBar.open(
        `Lỗi: ${error.message || 'Không thể nhập đặt hàng'}`,
        '',
        {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        }
      );
    }
  }
  @Debounce(300)
  async SelectNhacungcap(item: any, event: any) {
    const value = event.value;
    const checkItem = this.ListImportData.find(
      (v: any) => v.nhacungcapId === value
    );
    if (checkItem) {
      // Reset giá trị của select về null/undefined
      event.source.value = null;
      event.source._value = null;
      
      // Xóa nhacungcapId của item hiện tại
      this.ListImportData.filter((v) => v.tenncc === item.tenkhongdau).forEach(
        (v1: any) => {
          delete v1.nhacungcapId;
        }
      );      
      this._snackBar.open('Nhà cung cấp đã tồn tại', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      return;
    }
    this.ListImportData.filter((v) => v.tenncc === item.tenkhongdau).forEach(
      (v1: any) => {
        v1.nhacungcapId = value;
      }
    );
  }

  @Debounce(500)
  async DoFindNhacungcap(event: any, index: any) {
    const value = event.target.value;
    if (!value) {
      this.FilterNhacungcap[index] = this._NhacungcapService.ListNhacungcap();
      return;
    }
    this.FilterNhacungcap[index] = this._NhacungcapService
      .ListNhacungcap()
      .filter((v: any) => v.subtitle.includes(removeVietnameseAccents(value)));
  }

  DoChonNgaynhan(event: any, item: any) {
    const value = event.target.value;
    if (!value) {
      this.searchParam.ngaynhan = '';
      return;
    }
    if (item === 'All') {
      this.ListImportData.forEach((v: any) => {
        v.ngaynhan = value;
      });
      this.statusDetails.forEach((v: any) => {
        if (v.status === 'Processed') {
          v.ngaynhan = value;
        }
      });
      return;
    }
    this.ListImportData.filter((v) => v.tenncc === item.tenkhongdau).forEach(
      (v1: any) => {
        v1.ngaynhan = value;
      }
    );
  }

  ToggleAll(){
    if (this.EditList.length === this.Listdathang().data.length) {
      this.EditList = [];
    } else {
      this.EditList = [...this.Listdathang().data];
    }
  }
}