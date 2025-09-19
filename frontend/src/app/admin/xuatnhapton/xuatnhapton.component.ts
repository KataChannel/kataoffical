import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component, ViewChild, inject, TemplateRef, EventEmitter, Output, OnDestroy } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule, MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule, MatPaginator } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule, MatDrawer } from "@angular/material/sidenav";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterOutlet } from "@angular/router";
import { DateHelpers } from "../../shared/utils/date-helpers";
import { memoize, Debounce } from "../../shared/utils/decorators";
import { writeExcelMultiple, readExcelFileNoWorker } from "../../shared/utils/exceldrive.utils";
import { removeVietnameseAccents } from "../../shared/utils/texttransfer.utils";
import { TrangThaiDon } from "../../shared/utils/trangthai";
import { DathangService } from "../dathang/dathang.service";
import { DonhangService } from "../donhang/donhang.service";
import { KhoService } from "../kho/kho.service";
import { PhieukhoService } from "../phieukho/phieukho.service";
import { SanphamService } from "../sanpham/sanpham.service";
import { GraphqlService } from "../../shared/services/graphql.service";
@Component({
  selector: 'app-xuatnhapton',
  templateUrl: './xuatnhapton.component.html',
  styleUrls: ['./xuatnhapton.component.scss'],
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
  // providers:[provideNativeDateAdapter()]
})
export class XuatnhaptonComponent implements OnDestroy {
  @Output() DexuatEmit = new EventEmitter<any>();
  Detail: any = {};
  displayedColumns: string[] = [
    'title',
    'masp',
    'dvt',
    'slton',
    'sltontt',
  ];

  ColumnName: any = {
    title: 'Tên sản phẩm',
    masp: 'Mã sản phẩm',
    dvt: 'Đơn vị tính',
    slton: 'SL tồn',
    sltontt: 'Tồn thực tế Cuối Ngày',
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('TonkhoColFilter') || '[]'
  );
  Columns: any[] = [];
  isFilter: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  filterValues: { [key: string]: string } = {};
  private _PhieukhoService: PhieukhoService = inject(PhieukhoService);
  private _SanphamService: SanphamService = inject(SanphamService);
  private _DathangService: DathangService = inject(DathangService);
  private _DonhangService: DonhangService = inject(DonhangService);
  private _GraphqlService: GraphqlService = inject(GraphqlService);
  private _KhoService: KhoService = inject(KhoService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  Xuatnhapton:any = this._PhieukhoService.ListPhieukho;
  dataSource = new MatTableDataSource([]);
  _snackBar: MatSnackBar = inject(MatSnackBar);  CountItem: any = 0;
  SearchParams: any = {
    Batdau: DateHelpers.format(DateHelpers.now(), 'YYYY-MM-DD'),
    Ketthuc: DateHelpers.format(DateHelpers.add(DateHelpers.now(), 1, 'day'), 'YYYY-MM-DD'),
    Type: 'donsi'
  };
  ListDate: any[] = [
    { id: 1, Title: '1 Ngày', value: 'day' },
    { id: 2, Title: '1 Tuần', value: 'week' },
    { id: 3, Title: '1 Tháng', value: 'month' },
    { id: 4, Title: '1 Năm', value: 'year' },
  ];
  Chonthoigian: any = 'day';
  isSearch: boolean = false;
  ListKho: any = [];
  constructor() {
    this.displayedColumns.forEach(column => {
      this.filterValues[column] = '';
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource?.paginator?.firstPage();
    }
  }

  async LoadDondathang()
  {
    const ListSLChogiao = await this._DonhangService.getSLChogiao(this.SearchParams);
    const ListSLChonhap = await this._DathangService.getSLChonhap(this.SearchParams);
    this.dataSource.data.forEach((v: any) => {
      const SLChogiao = ListSLChogiao.find((v1: any) => v1.idSP === v.sanphamId);
      if (SLChogiao) {
        v.slchogiaott = SLChogiao.slchogiaott;
      } else {
        v.slchogiaott = 0;
      }
      const SLChonhap = ListSLChonhap.find((v1: any) => v1.idSP === v.sanphamId);
      if (SLChonhap) {
        v.slchonhaptt = SLChonhap.slchonhaptt;
      } else {
        v.slchonhaptt = 0;
      }
    });
    this.dataSource.data = this.dataSource.data.filter((v: any) => v.slchogiaott > 0 || v.slchonhaptt > 0);
    this.dataSource.sort = this.sort;
  }
  


  async ngOnInit(): Promise<void> {    
    // await this._SanphamService.getAllSanpham() 
    this.LoadXuatnhapton();
    this._KhoService.getTonKho('1', '99999').then((res) => {
    this.Xuatnhapton.set(res.data);
    this.dataSource.data = this.Xuatnhapton();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.initializeColumns();
    this.setupDrawer();
    this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
    this.paginator._intl.nextPageLabel = 'Tiếp Theo';
    this.paginator._intl.previousPageLabel = 'Về Trước';
    this.paginator._intl.firstPageLabel = 'Trang Đầu';
    this.paginator._intl.lastPageLabel = 'Trang Cuối';
    });
    this._GraphqlService
    this.CountItem = this.Xuatnhapton().length;
  }

  async LoadXuatnhapton(){
    const ListXuatnhapton = await this._GraphqlService.findAll('tonkho',{
      aggressiveCache:true,
      enableParallelFetch:true,
      take:99999
    })
    console.log(ListXuatnhapton);
    this.Xuatnhapton.set(ListXuatnhapton.data);
  }


  private initializeColumns(): void {
    this.Columns = Object.keys(this.ColumnName).map((key) => ({
      key,
      value: this.ColumnName[key],
      isShow: true,
    }));
    if (this.FilterColumns.length === 0) {
      this.FilterColumns = this.Columns;
    } else {
      localStorage.setItem('TonkhoColFilter',JSON.stringify(this.FilterColumns)
      );
    }
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map(
      (item) => item.key
    );
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
  }

  private setupDrawer(): void {
    this._breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        if (result.matches) {
          this.drawer.mode = 'over';
          this.paginator.hidePageSize = true;
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
  private updateDisplayedColumns(): void {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map(
      (item) => item.key
    );
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
    localStorage.setItem('TonkhoColFilter',JSON.stringify(this.FilterColumns)
    );
  }
  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) =>
      v.value.toLowerCase().includes(query)
    );
  }
  @memoize()
  FilterHederColumn(list:any,column:any)
  {
    const uniqueList = list.filter((obj: any, index: number, self: any) => 
      index === self.findIndex((t: any) => t[column] === obj[column])
    );
    return uniqueList
  }
  @Debounce(300)
  doFilterHederColumn(event: any, column: any): void {
    const query = event.target.value.toLowerCase();  
    console.log(query);
    console.log(column);

    this.dataSource.filteredData = this.Xuatnhapton().filter((v: any) => 
      
      removeVietnameseAccents(v[column]).includes(query) || v[column].toLowerCase().includes(query)
  );

  }
  trackByFn(index: number, item: any): any {
    return item.id; // Use a unique identifier
  }
  ListFilter:any[] =[]
  ChosenItem(item:any,column:any)
  {
    const CheckItem = this.dataSource.filteredData.filter((v:any)=>v[column]===item[column]);
    const CheckItem1 = this.ListFilter.filter((v:any)=>v[column]===item[column]);
    if(CheckItem1.length>0)
    {
      this.ListFilter = this.ListFilter.filter((v) => v[column] !== item[column]);
    }
    else{
      this.ListFilter = [...this.ListFilter,...CheckItem];
    }
  }
  ChosenAll(list:any)
  {
    list.forEach((v:any) => {
      const CheckItem = this.ListFilter.find((v1)=>v1.id===v.id)?true:false;
      if(CheckItem)
        {
          this.ListFilter = this.ListFilter.filter((v) => v.id !== v.id);
        }
        else{
          this.ListFilter.push(v);
        }
    });
  }
  ResetFilter()
  {
    this.ListFilter = this.Xuatnhapton();
    this.dataSource.data = this.Xuatnhapton();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  EmptyFiter()
  {
    this.ListFilter = [];
  }
  CheckItem(item:any)
  {
    return this.ListFilter.find((v)=>v.id===item.id)?true:false;
  }
  ApplyFilterColum(menu:any)
  {    
    this.dataSource.data = this.Xuatnhapton().filter((v: any) => this.ListFilter.some((v1) => v1.id === v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
    menu.closeMenu();
  }

  async ExportExcel(data: any, title: any) {
   await this._SanphamService.getAllSanpham() 
    const SP = this._SanphamService.ListSanpham().map((v: any) => ({
      subtitle: v.subtitle,
      masp: v.masp,
      title: v.title,
      dvt: v.dvt,
    }));
    const XNT = this.Xuatnhapton().map((v: any) => ({
      masp: v.masp,
      title: v.title,
      dvt: v.dvt,
      slton: v.slton,
    }))
    writeExcelMultiple({SP, XNT}, title);
  }

  async ImporExcel(event: any) {
    const files = Array.from(event.target.files) as File[];
    const data = await readExcelFileNoWorker(files[0], 'XNT');

    const phieuNhapDetails: any[] = [];
    const phieuXuatDetails: any[] = [];

    data.forEach((v: any) => {
      const exitItem = this.Xuatnhapton().find((item: any) => item.masp === v.masp);
      if (exitItem) {
        if (v.slton > exitItem.slton) {
          // Tính chênh lệch cho phiếu nhập
          phieuNhapDetails.push({
          sanphamId:this._SanphamService.ListSanpham().find((item:any)=>item.masp===v.masp).id, 
          soluong: v.slton - exitItem.slton,
          // thêm các trường cần thiết
          });
        } else if (v.slton < exitItem.slton) {
          // Tính chênh lệch cho phiếu xuất
          phieuXuatDetails.push({
          sanphamId:this._SanphamService.ListSanpham().find((item:any)=>item.masp===v.masp).id,
          soluong: exitItem.slton - v.slton,
          // thêm các trường cần thiết
          });
        }
      }
    });    if (phieuNhapDetails.length > 0) {
      // Tạo phiếu nhập một lần với danh sách chi tiết
      this._PhieukhoService.CreatePhieukho(
        {
        title:`Điều Chỉnh Kho Ngày ${DateHelpers.format(DateHelpers.now(), 'DD/MM/YYYY ')}`, 
        type:'nhap',
        sanpham: phieuNhapDetails, 
        ghichu: `Cập nhật tồn kho lúc ${DateHelpers.format(DateHelpers.now(), 'HH:mm:ss DD/MM/YYYY ')}`,
        ngay: DateHelpers.now()
      });
    }
    if (phieuXuatDetails.length > 0) {
      // Tạo phiếu xuất một lần với danh sách chi tiết
      this._PhieukhoService.CreatePhieukho(
        {
        title:`Điều Chỉnh Kho Ngày ${DateHelpers.format(DateHelpers.now(), 'DD/MM/YYYY ')}`, 
        type:'xuat',
        sanpham: phieuXuatDetails, 
        ghichu: `Cập nhật tồn kho lúc ${DateHelpers.format(DateHelpers.now(), 'HH:mm:ss DD/MM/YYYY ')}`,
        ngay: DateHelpers.now()
      });
    }
    if (phieuNhapDetails.length > 0) {
      this._snackBar.open(`Điều chỉnh nhập kho với ${phieuNhapDetails.length} sản phẩm`, '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-success'],
          });
    }
    if (phieuXuatDetails.length > 0) {
      this._snackBar.open(`Điều chỉnh xuất kho với ${phieuXuatDetails.length} sản phẩm`, '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-success'],
        });
    }
    if (phieuNhapDetails.length === 0 && phieuXuatDetails.length === 0) {
            this._snackBar.open('Kho không thay đổi', '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-success'],
        });
    }
  }

  private _dialog: MatDialog = inject(MatDialog);
  Trangthaidon:any = TrangThaiDon
  ListDathang:any[] = [];
  ListDonhang:any[] = [];
  
  // Enhanced filtering and sorting properties
  FilteredDathang: any[] = [];
  FilteredDonhang: any[] = [];
  
  // Sort properties for Dathang
  dathangSortField: string = '';
  dathangSortDirection: 'asc' | 'desc' = 'asc';
  selectedDathangStatus: string = '';
  
  // Sort properties for Donhang
  donhangSortField: string = '';
  donhangSortDirection: 'asc' | 'desc' = 'asc';
  selectedDonhangStatus: string = '';
  
  // Date filtering properties
  dathangStartDate: string = '';
  dathangEndDate: string = '';
  donhangStartDate: string = '';
  donhangEndDate: string = '';
  
  // Debounce timers for optimized search
  private dathangSearchTimeout: any;
  private donhangSearchTimeout: any;
  
  Object = Object; // For template access
  async XemDathang(row: any, template: TemplateRef<any>) {
   this.ListDathang =  await this._DathangService.findbysanpham(row.sanphamId);
   console.log(this.ListDathang);
   
   // Initialize filtered array and reset filters
   this.FilteredDathang = [...this.ListDathang];
   this.selectedDathangStatus = '';
   this.dathangSortField = '';
   this.dathangSortDirection = 'asc';
   this.dathangStartDate = '';
   this.dathangEndDate = '';

    const dialogDeleteRef = this._dialog.open(template, {
      hasBackdrop: true,
      disableClose: true,
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result === "true") {
      
      }
    });
  }

  async XemDonhang(row: any, template: TemplateRef<any>) {
    this.ListDonhang =  await this._DonhangService.findbysanpham(row.sanphamId);
    console.log(this.ListDonhang);
    
    // Initialize filtered array and reset filters
    this.FilteredDonhang = [...this.ListDonhang];
    this.selectedDonhangStatus = '';
    this.donhangSortField = '';
    this.donhangSortDirection = 'asc';
    this.donhangStartDate = '';
    this.donhangEndDate = '';
    const dialogDeleteRef = this._dialog.open(template, {
      hasBackdrop: true,
      disableClose: true,
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result === "true") {
      
      }
    });
  }
  TinhTong(items: any, fieldTong: any) {
    return (
      items?.reduce((sum: any, item: any) => sum + (Number(item?.sanpham[fieldTong]) || 0), 0) || 0
    );
  }
  gotoDexuat(){
    this.DexuatEmit.emit(false);
  }

  ngOnDestroy() {
    // Clean up debounce timers
    if (this.dathangSearchTimeout) {
      clearTimeout(this.dathangSearchTimeout);
    }
    if (this.donhangSearchTimeout) {
      clearTimeout(this.donhangSearchTimeout);
    }
  }

  // ================== DATHANG FILTERING AND SORTING METHODS ==================
  
  filterDathangList(event: any) {
    // Clear previous timeout
    if (this.dathangSearchTimeout) {
      clearTimeout(this.dathangSearchTimeout);
    }
    
    // Debounce search for better performance
    this.dathangSearchTimeout = setTimeout(() => {
      const searchTerm = event.target.value?.toLowerCase() || '';
      this.applyDathangFilters(searchTerm);
    }, 300);
  }

  filterDathangByStatus(status: string) {
    this.selectedDathangStatus = status;
    const searchInput = document.querySelector('#dathangSearch') as HTMLInputElement;
    const searchTerm = searchInput?.value?.toLowerCase() || '';
    this.applyDathangFilters(searchTerm);
  }

  clearDathangFilter() {
    this.selectedDathangStatus = '';
    this.dathangStartDate = '';
    this.dathangEndDate = '';
    this.dathangSortField = '';
    this.dathangSortDirection = 'asc';
    this.applyDathangFilters('');
  }

  private applyDathangFilters(searchTerm: string) {
    let filtered = [...this.ListDathang];

    // Apply status filter
    if (this.selectedDathangStatus) {
      filtered = filtered.filter(item => item.status === this.selectedDathangStatus);
    }

    // Apply date range filter - Optimized
    if (this.dathangStartDate || this.dathangEndDate) {
      filtered = this.applyDateRangeFilter(filtered, this.dathangStartDate, this.dathangEndDate);
    }

    // Apply search filter - Optimized
    if (searchTerm) {
      filtered = this.applySearchFilter(filtered, searchTerm, 'dathang');
    }

    this.FilteredDathang = filtered;
    this.applydathangCurrentSort();
  }

  // Optimized date range filter method
  private applyDateRangeFilter(items: any[], startDate: string, endDate: string): any[] {
    if (!startDate && !endDate) return items;
    
    const start = startDate ? new Date(startDate + 'T00:00:00') : null;
    const end = endDate ? new Date(endDate + 'T23:59:59') : null;
    
    return items.filter(item => {
      const itemDate = new Date(item.createdAt);
      if (start && itemDate < start) return false;
      if (end && itemDate > end) return false;
      return true;
    });
  }

  // Optimized search filter method
  private applySearchFilter(items: any[], searchTerm: string, type: 'dathang' | 'donhang'): any[] {
    const lowerSearchTerm = searchTerm.toLowerCase();
    
    return items.filter(item => {
      const searchableFields = type === 'dathang' 
        ? [
            item.title,
            item.madathang || item.madncc,
            item.khachhang?.name || item.nhacungcap?.name,
            item.sanpham?.sanpham?.title,
            this.Trangthaidon[item.status]
          ]
        : [
            item.title,
            item.madonhang,
            item.khachhang?.name,
            item.sanpham?.sanpham?.title,
            this.Trangthaidon[item.status]
          ];
      
      return searchableFields.some(field => 
        field?.toString().toLowerCase().includes(lowerSearchTerm)
      );
    });
  }

  sortDathangData(field: string) {
    if (this.dathangSortField === field) {
      this.dathangSortDirection = this.dathangSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.dathangSortField = field;
      this.dathangSortDirection = 'asc';
    }
    this.applydathangCurrentSort();
  }

  private applydathangCurrentSort() {
    if (!this.dathangSortField) return;

    this.FilteredDathang.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      // Handle nested properties
      if (this.dathangSortField.includes('.')) {
        const keys = this.dathangSortField.split('.');
        aValue = keys.reduce((obj, key) => obj && obj[key], a);
        bValue = keys.reduce((obj, key) => obj && obj[key], b);
      } else {
        aValue = a[this.dathangSortField];
        bValue = b[this.dathangSortField];
      }

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      // Convert to string for comparison
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();

      const comparison = aValue.localeCompare(bValue, 'vi', { numeric: true });
      return this.dathangSortDirection === 'asc' ? comparison : -comparison;
    });
  }

  getDathangSortIcon(field: string): string {
    if (this.dathangSortField !== field) {
      return 'unfold_more';
    }
    return this.dathangSortDirection === 'asc' ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
  }

  exportDathangData() {
    if (this.FilteredDathang.length === 0) {
      alert('Không có dữ liệu để xuất');
      return;
    }

    const dataToExport = this.FilteredDathang.map(item => ({
      'Tiêu đề': item.title || '',
      'Mã Đặt Hàng': item.madathang || '',
      'Trạng thái': this.Trangthaidon[item.status] || '',
      'Khách Hàng': item.khachhang?.name || '',
      'Tên Sản Phẩm': item.sanpham?.sanpham?.title || '',
      'Số Lượng Đặt': item.sanpham?.sldat || 0,
      'Số Lượng Nhận': item.sanpham?.slnhan || 0,
      'Ngày': this.formatDate(item.createdAt)
    }));

    this.exportToExcel(dataToExport, 'dathang-data');
  }

  // ================== DONHANG FILTERING AND SORTING METHODS ==================

  filterDonhangList(event: any) {
    // Clear previous timeout
    if (this.donhangSearchTimeout) {
      clearTimeout(this.donhangSearchTimeout);
    }
    
    // Debounce search for better performance
    this.donhangSearchTimeout = setTimeout(() => {
      const searchTerm = event.target.value?.toLowerCase() || '';
      this.applyDonhangFilters(searchTerm);
    }, 300);
  }

  filterDonhangByStatus(status: string) {
    this.selectedDonhangStatus = status;
    const searchInput = document.querySelector('#donhangSearch') as HTMLInputElement;
    const searchTerm = searchInput?.value?.toLowerCase() || '';
    this.applyDonhangFilters(searchTerm);
  }

  clearDonhangFilter() {
    this.selectedDonhangStatus = '';
    this.donhangStartDate = '';
    this.donhangEndDate = '';
    this.donhangSortField = '';
    this.donhangSortDirection = 'asc';
    this.applyDonhangFilters('');
  }

  private applyDonhangFilters(searchTerm: string) {
    let filtered = [...this.ListDonhang];

    // Apply status filter
    if (this.selectedDonhangStatus) {
      filtered = filtered.filter(item => item.status === this.selectedDonhangStatus);
    }

    // Apply date range filter - Optimized
    if (this.donhangStartDate || this.donhangEndDate) {
      filtered = this.applyDateRangeFilter(filtered, this.donhangStartDate, this.donhangEndDate);
    }

    // Apply search filter - Optimized
    if (searchTerm) {
      filtered = this.applySearchFilter(filtered, searchTerm, 'donhang');
    }

    this.FilteredDonhang = filtered;
    this.applyDonhangCurrentSort();
  }

  sortDonhangData(field: string) {
    if (this.donhangSortField === field) {
      this.donhangSortDirection = this.donhangSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.donhangSortField = field;
      this.donhangSortDirection = 'asc';
    }
    this.applyDonhangCurrentSort();
  }

  private applyDonhangCurrentSort() {
    if (!this.donhangSortField) return;

    this.FilteredDonhang.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      // Handle nested properties
      if (this.donhangSortField.includes('.')) {
        const keys = this.donhangSortField.split('.');
        aValue = keys.reduce((obj, key) => obj && obj[key], a);
        bValue = keys.reduce((obj, key) => obj && obj[key], b);
      } else {
        aValue = a[this.donhangSortField];
        bValue = b[this.donhangSortField];
      }

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      // Convert to string for comparison
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();

      const comparison = aValue.localeCompare(bValue, 'vi', { numeric: true });
      return this.donhangSortDirection === 'asc' ? comparison : -comparison;
    });
  }

  getDonhangSortIcon(field: string): string {
    if (this.donhangSortField !== field) {
      return 'unfold_more';
    }
    return this.donhangSortDirection === 'asc' ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
  }

  exportDonhangData() {
    if (this.FilteredDonhang.length === 0) {
      alert('Không có dữ liệu để xuất');
      return;
    }

    const dataToExport = this.FilteredDonhang.map(item => ({
      'Tiêu đề': item.title || '',
      'Mã Đơn Hàng': item.madonhang || '',
      'Trạng thái': this.Trangthaidon[item.status] || '',
      'Khách Hàng': item.khachhang?.name || '',
      'Tên Sản Phẩm': item.sanpham?.sanpham?.title || '',
      'Số Lượng Đặt': item.sanpham?.sldat || 0,
      'Số Lượng Nhận': item.sanpham?.slnhan || 0,
      'Ngày': this.formatDate(item.createdAt)
    }));

    this.exportToExcel(dataToExport, 'donhang-data');
  }

  // ================== DATE FILTERING METHODS ==================

  filterDathangByDateRange() {
    const searchInput = document.querySelector('#dathangSearch') as HTMLInputElement;
    const searchTerm = searchInput?.value?.toLowerCase() || '';
    this.applyDathangFilters(searchTerm);
  }

  filterDonhangByDateRange() {
    const searchInput = document.querySelector('#donhangSearch') as HTMLInputElement;
    const searchTerm = searchInput?.value?.toLowerCase() || '';
    this.applyDonhangFilters(searchTerm);
  }

  clearDathangDateFilter() {
    this.dathangStartDate = '';
    this.dathangEndDate = '';
    this.filterDathangByDateRange();
  }

  clearDonhangDateFilter() {
    this.donhangStartDate = '';
    this.donhangEndDate = '';
    this.filterDonhangByDateRange();
  }

  // Quick date filters for Dathang - Optimized
  setDathangDateFilter(days: number) {
    const today = DateHelpers.format(DateHelpers.now(), 'YYYY-MM-DD');
    const startDate = DateHelpers.format(
      DateHelpers.subtract(DateHelpers.now(), days, 'day'), 
      'YYYY-MM-DD'
    );
    
    this.dathangStartDate = startDate;
    this.dathangEndDate = today;
    this.filterDathangByDateRange();
  }

  // Quick date filters for Donhang - Optimized
  setDonhangDateFilter(days: number) {
    const today = DateHelpers.format(DateHelpers.now(), 'YYYY-MM-DD');
    const startDate = DateHelpers.format(
      DateHelpers.subtract(DateHelpers.now(), days, 'day'), 
      'YYYY-MM-DD'
    );
    
    this.donhangStartDate = startDate;
    this.donhangEndDate = today;
    this.filterDonhangByDateRange();
  }

  // ================== UTILITY METHODS ==================

  formatDate(date: any): string {
    if (!date) return '';
    try {
      return DateHelpers.format(date, 'DD/MM/YYYY HH:mm');
    } catch (error) {
      return '';
    }
  }

  private exportToExcel(data: any[], filename: string) {
    // Simple CSV export implementation
    const csvContent = this.convertToCSV(data);
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private convertToCSV(data: any[]): string {
    if (data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    
    const csvRows = data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes in CSV
        return typeof value === 'string' && (value.includes(',') || value.includes('"')) 
          ? `"${value.replace(/"/g, '""')}"` 
          : value;
      }).join(',')
    );

    return [csvHeaders, ...csvRows].join('\n');
  }

}