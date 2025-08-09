import {
  Component,
  effect,
  inject,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import {
  readExcelFile,
  writeExcelFile,
} from '../../../shared/utils/exceldrive.utils';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SanphamService } from '../../sanpham/sanpham.service';
import { TablenhucaudathanhComponent } from './tablenhucaudathanh/tablenhucaudathanh.component';
import moment from 'moment';
import { GraphqlService } from '../../../shared/services/graphql.service';
import { GenId } from '../../../shared/utils/shared.utils';

@Component({
  selector: 'app-nhucaudathang',
  templateUrl: './nhucaudathang.component.html',
  styleUrls: ['./nhucaudathang.component.scss', './nhucaudathang.component.css'],
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
    MatDialogModule,
  ],
})
export class NhucaudathangComponent {
  displayedColumns: string[] = [
    'makho',
    'namekho',
    'title',
    'masp',
    'slton',
    'slchogiao',
    'slchonhap',
    'SLDat',
    'SLGiao',
    'goiy',
  ];
  ColumnName: any = {
    makho: 'Mã Kho',
    namekho: 'Tên Kho',
    title: 'Tên Sản Phẩm',
    masp: 'Mã Sản Phẩm',
    slton: 'Tồn Kho',
    slchogiao: 'Chờ Giao',
    slchonhap: 'Chờ Nhập',
    SLDat: 'SL Đặt (Nhà CC)',
    SLGiao: 'SL Giao (Khách)',
    goiy: 'Gợi Ý',
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('NhucauColFilter') || '[]'
  );
  Columns: any[] = [];
  
  // Pagination
  totalItems = 0;
  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  
  private _SanphamService = inject(SanphamService);
  private _breakpointObserver = inject(BreakpointObserver);
  private _GraphqlService = inject(GraphqlService);
  private _router = inject(Router);
  private _dialog = inject(MatDialog);
  _snackBar = inject(MatSnackBar);
  
  Listsanpham: any = this._SanphamService.ListSanpham;
  TonghopsFinal: any[] = [];
  EditList: any = [];
  dataSource = new MatTableDataSource<any>();
  ListFilter: any[] = [];
  ListDathang: any[] = [];
  isSubmit = false;
  quickFilter: string = 'all';
  globalFilterValue: string = '';

  constructor() {
    effect(() => {
      const currentData = this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
      this.dataSource.data = currentData;
      this.totalItems = currentData.length;
      this.calculateTotalPages();
    });
  }

  async ngOnInit(): Promise<void> {
    this.updateDisplayData();
    this.loadDonhangWithRelations();
    this._SanphamService.listenSanphamUpdates();
    await this._SanphamService.getNhucau();
    this.dataSource = new MatTableDataSource(this.Listsanpham());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    // Custom sorting for specific columns
    this.dataSource.sortingDataAccessor = (item: any, property: string) => {
      switch (property) {
        case 'slton':
        case 'slchogiao':
        case 'slchonhap':
        case 'SLDat':
        case 'SLGiao':
          return Number(item[property]) || 0;
        case 'goiy':
          return parseFloat(this.GetGoiy(item));
        case 'title':
        case 'masp':
          return item[property]?.toLowerCase() || '';
        default:
          return item[property] || '';
      }
    };
    
    this.initializeColumns();
    this.setupDrawer();
  }

  GetGoiy(item: any) {
    const currentStock = item.slton || 0;
    const pendingDelivery = item.slchogiao || 0;
    const pendingInput = item.slchonhap || 0;
    const deliveredQuantity = item.SLGiao || 0;
    
    const suggestion = Math.max(0, deliveredQuantity + pendingDelivery - currentStock - pendingInput);
    return suggestion.toFixed(0);
  }

  async loadDonhangWithRelations() {
    try {
      const [Donhangs, Dathangs, Tonkhos] = await Promise.all([
        this._GraphqlService.findAll('donhang', {
          enableParallelFetch: true,
          batchSize: 1000,
          aggressiveCache: true,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            madonhang: true,
            ngaygiao: true,
            sanpham: {
              select: {
                giaban: true,
                sldat: true,
                slgiao: true,
                slnhan: true,
                sanpham: { select: { masp: true } },
              },
            },
          },
        }),
        
        this._GraphqlService.findAll('dathang', {
          enableParallelFetch: true,
          batchSize: 1000,
          aggressiveCache: true,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            madncc: true,
            ngaynhan: true,
            nhacungcap:{
              select: {
                name: true,
                mancc: true
              }
            },
            sanpham: {
              select: {
                sldat: true,
                slgiao: true,
                slnhan: true,
                sanpham: { select: { masp: true } },
              },
            },
            kho:{
              select: {
                id: true,
                name: true,
                makho:true
              }
            }
          },
        }),
        
        this._GraphqlService.findAllTonKho({
          enableParallelFetch: true,
          aggressiveCache: true,
          select: {
            id: true,
            sanphamId: true,
            slton: true,
            slchogiao: true,
            slchonhap: true,
            sanpham: {
              select: {
                title: true,
                masp: true,
              },
            },
          },
        })
      ]);

      const DonhangsTranfer = Donhangs.data.flatMap((order: any) =>
        order.sanpham.map((sp: any) => ({
          type: 'donhang',
          madonhang: order.madonhang,
          ngaygiao: order.ngaygiao,
          masp: sp.sanpham.masp,
          giaban: Number(sp.giaban) || 0,
          sldat: Number(sp.sldat) || 0,
          slgiao: Number(sp.slgiao) || 0,
          slnhan: Number(sp.slnhan) || 0
        }))
      );      
      const DathangsTranfer = Dathangs.data.flatMap((order: any) =>
        order.sanpham.map((sp: any) => ({
          type: 'dathang',
          makho: order.kho.makho,
          namekho: order.kho.name,
          madncc: order.madncc,
          mancc: order.nhacungcap.mancc,
          name: order.nhacungcap.name,
          ngaynhan: order.ngaynhan,
          masp: sp.sanpham.masp,
          sldat: Number(sp.sldat) || 0,
          slgiao: Number(sp.slgiao) || 0,
          slnhan: Number(sp.slnhan) || 0
        }))
      );
      console.log(Dathangs);
      console.log(DathangsTranfer);
      const TonkhosTranfer = Tonkhos.data.map((sp: any) => ({
        type: 'tonkho',
        masp: sp.sanpham.masp,
        title: sp.sanpham.title,
        slton: Number(sp.slton) || 0,
        slchogiao: Number(sp.slchogiao) || 0,
        slchonhap: Number(sp.slchonhap) || 0
      }));

      const tonghopMap = new Map<string, any>();

      TonkhosTranfer.forEach((tonkho: any) => {
        tonghopMap.set(tonkho.masp, {
          id: GenId(8, false),
          ngaynhan: tonkho.ngaynhan,
          makho: tonkho.makho,
          namekho: tonkho.namekho,
          mancc: tonkho.mancc,
          name: tonkho.name,
          masp: tonkho.masp,
          title: tonkho.title,
          slton: tonkho.slton,
          slchogiao: tonkho.slchogiao,
          slchonhap: tonkho.slchonhap,
          SLDat: 0,
          SLGiao: 0
        });
      });

      DathangsTranfer.forEach((dathang: any) => {
        console.log(dathang);
        if (tonghopMap.has(dathang.masp)) {
          const item = tonghopMap.get(dathang.masp);
          item.SLDat += dathang.slnhan;
          item.ngaynhan = dathang.ngaynhan;
          item.mancc = dathang.mancc;
          item.name = dathang.name;
          item.makho = dathang.makho;
          item.namekho = dathang.namekho;
        }
      });

      DonhangsTranfer.forEach((donhang: any) => {
        if (tonghopMap.has(donhang.masp)) {
          const item = tonghopMap.get(donhang.masp);
          item.SLGiao += donhang.slnhan;
        }
      });

      const TonghopsFinal = Array.from(tonghopMap.values());
      console.log(TonghopsFinal);

      this.TonghopsFinal = TonghopsFinal;
      this.dataSource.data = TonghopsFinal;
      this.totalItems = TonghopsFinal.length;
      this.calculateTotalPages();
      this.updateDisplayData();

    } catch (error) {
      console.error('Error loading data:', error);
      this._snackBar.open('Lỗi khi tải dữ liệu', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  async refresh() {
    await this._SanphamService.getAllSanpham();
    await this.loadDonhangWithRelations();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
      localStorage.setItem(
        'NhucauColFilter',
        JSON.stringify(this.FilterColumns)
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

  @Debounce(300)
  doFilterHederColumn(event: any, column: any): void {
    const currentData = this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    this.dataSource.filteredData = currentData.filter((v: any) =>
      v[column]?.toString().toLowerCase().includes(event.target.value.toLowerCase())
    );
  }

  @Debounce(300)
  applyAdvancedColumnFilter(event: any, column: any): void {
    const filterValue = event.target.value.toLowerCase();
    if (!filterValue) {
      this.getCurrentFilteredData(column);
      return;
    }
    
    const currentData = this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    const filteredItems = currentData.filter((item: any) =>
      item[column]?.toString().toLowerCase().includes(filterValue)
    );
    
    // Update temporary filter for this column
    this.dataSource.filteredData = filteredItems;
  }

  ChosenItem(item: any, column: any) {
    const CheckItem = this.dataSource.filteredData.filter(
      (v: any) => v[column] === item[column]
    );
    const CheckItem1 = this.ListFilter.filter(
      (v: any) => v[column] === item[column]
    );
    if (CheckItem1.length > 0) {
      this.ListFilter = this.ListFilter.filter(
        (v) => v[column] !== item[column]
      );
    } else {
      this.ListFilter = [...this.ListFilter, ...CheckItem];
    }
  }

  ChosenAll(list: any) {
    list.forEach((v: any) => {
      const CheckItem = this.ListFilter.find((v1) => v1.id === v.id);
      if (CheckItem) {
        this.ListFilter = this.ListFilter.filter((v1) => v1.id !== v.id);
      } else {
        this.ListFilter.push(v);
      }
    });
  }

  ResetFilter() {
    const currentData = this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    this.ListFilter = currentData;
    this.dataSource.data = currentData;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  EmptyFiter() {
    this.ListFilter = [];
  }

  CheckItem(item: any) {
    return this.ListFilter.find((v) => v.masp === item.masp || v.id === item.id) ? true : false;
  }

  ApplyFilterColum(menu: any) {
    const currentData = this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    this.dataSource.data = currentData.filter((v: any) =>
      this.ListFilter.some((v1) => v1.masp === v.masp)
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }

  private updateDisplayedColumns(): void {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map(
      (item) => item.key
    );
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
    localStorage.setItem('NhucauColFilter', JSON.stringify(this.FilterColumns));
  }

  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) =>
      v.value.toLowerCase().includes(query)
    );
  }

  AddToEdit(item: any): void {
    const existingItem = this.EditList.find((v: any) => v.masp === item.masp || v.id === item.id);
    if (existingItem) {
      this.EditList = this.EditList.filter((v: any) => v.masp !== item.masp && v.id !== item.id);
    } else {
      this.EditList.push(item);
    }
  }

  ChoseAllEdit(): void {
    const currentData = this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    this.EditList = currentData;
  }

  CheckItemInEdit(item: any): boolean {
    return this.EditList.some((v: any) => v.masp === item.masp || v.id === item.id);
  }

  onListDathangChange(event: any) {
    this.isSubmit = event.isSubmit;
    this.ListDathang = event.ListDathang;
  }

  async ImporExcel(event: any) {
    const data = await readExcelFile(event);
    const transformedData = data.map((v: any) => ({
      title: v.title?.trim() || '',
      masp: v.masp?.trim() || '',
      giagoc: Number(v.giagoc) || 0,
      dvt: v.dvt?.trim() || '',
      soluong: Number(v.soluong) || 0,
      soluongkho: Number(v.soluongkho) || 0,
      haohut: Number(v.haohut) || 0,
      ghichu: v.ghichu?.trim() || '',
    }));

    const uniqueData = Array.from(
      new Map(transformedData.map((item: any) => [item.masp, item])).values()
    );
    
    const existingSanpham = this._SanphamService.ListSanpham();
    
    await Promise.all(
      uniqueData.map(async (v: any) => {
        const existingItem = existingSanpham.find(
          (v1: any) => v1.masp === v.masp
        );
        if (existingItem) {
          const updatedItem = { ...existingItem, ...v };
          await this._SanphamService.updateSanpham(updatedItem);
        } else {
          await this._SanphamService.CreateSanpham(v);
        }
      })
    );

    await Promise.all(
      existingSanpham
        .filter((sp) => !uniqueData.some((item: any) => item.masp === sp.masp))
        .map((sp) =>
          this._SanphamService.updateSanpham({ ...sp, isActive: false })
        )
    );

    this._snackBar.open('Cập Nhật Thành Công', '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  }

  async ExportExcel(data: any, title: any) {
    const dulieu = data.map((v: any) => ({
      ngaynhan: moment().format('YYYY-MM-DD'),
      masp: v.masp,
      title: v.title,
      dvt: v.dvt,
      slchogiao: v.slchogiao,
      goiy: this.GetGoiy(v),
      slchonhap: v.slchonhap,
      slton: v.slton,
      haohut: v.haohut,
      ghichu: v.ghichu,
    }));

    const mapping: any = {
      ngaynhan: 'Ngày Nhận',
      masp: 'Mã Sản Phẩm',
      title: 'Tên Sản Phẩm',
      dvt: 'Đơn Vị Tính',
      slchogiao: 'Chờ Giao',
      goiy: 'Gợi Ý',
      slchonhap: 'Chờ Nhập',
      slton: 'Tồn Kho',
      haohut: 'Hao Hụt',
      ghichu: 'Ghi Chú',
    };

    writeExcelFile(dulieu, title, Object.values(mapping), mapping);
  }

  trackByFn(index: number, item: any): any {
    return item.masp || item.id;
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }

  onPageSizeChange(size: number, menuHienthi: any) {
    const currentData = this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    if (size > currentData.length) {
      this.pageSize = currentData.length;
      this._snackBar.open(`Số lượng tối đa ${currentData.length}`, '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    } else {
      this.pageSize = size;
    }
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updateDisplayData();
    menuHienthi.closeMenu();
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayData();
    }
  }

  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayData();
    }
  }

  updateDisplayData() {
    const currentData = this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const pageData = currentData.slice(startIndex, endIndex);
    this.dataSource.data = pageData;
  }

  getCurrentFilteredData(column: string): any[] {
    const currentData = this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    
    // Get unique values for the column
    const uniqueValues = new Map();
    currentData.forEach((item: any) => {
      const key = item[column];
      if (!uniqueValues.has(key)) {
        uniqueValues.set(key, item);
      }
    });
    
    return Array.from(uniqueValues.values());
  }

  parseFloat(value: string): number {
    return parseFloat(value) || 0;
  }

  applyQuickFilter(filterType: string) {
    this.quickFilter = filterType;
    let filteredData = this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    
    switch (filterType) {
      case 'lowStock':
        filteredData = filteredData.filter((item: any) => (item.slton || 0) <= 10);
        break;
      case 'needOrder':
        filteredData = filteredData.filter((item: any) => {
          const suggestion = parseFloat(this.GetGoiy(item));
          return suggestion > 0;
        });
        break;
      case 'pendingDelivery':
        filteredData = filteredData.filter((item: any) => (item.slchogiao || 0) > 0);
        break;
      case 'all':
      default:
        // No additional filtering for 'all'
        break;
    }
    
    // Apply global filter if exists
    if (this.globalFilterValue) {
      filteredData = this.applyGlobalFilterToData(filteredData, this.globalFilterValue);
    }
    
    this.dataSource.data = filteredData;
    this.totalItems = filteredData.length;
    this.calculateTotalPages();
    this.currentPage = 1;
    this.updateDisplayData();
  }

  applyGlobalFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.globalFilterValue = filterValue;
    
    let filteredData = this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    
    // Apply quick filter first
    if (this.quickFilter !== 'all') {
      this.applyQuickFilter(this.quickFilter);
      return; // applyQuickFilter will handle global filter too
    }
    
    // Apply global filter
    if (filterValue) {
      filteredData = this.applyGlobalFilterToData(filteredData, filterValue);
    }
    
    this.dataSource.data = filteredData;
    this.totalItems = filteredData.length;
    this.calculateTotalPages();
    this.currentPage = 1;
    this.updateDisplayData();
  }

  private applyGlobalFilterToData(data: any[], filterValue: string): any[] {
    const searchTerm = filterValue.trim().toLowerCase();
    return data.filter((item: any) => 
      (item.title?.toLowerCase().includes(searchTerm)) ||
      (item.masp?.toLowerCase().includes(searchTerm)) ||
      (item.name?.toLowerCase().includes(searchTerm)) ||
      (item.mancc?.toLowerCase().includes(searchTerm))
    );
  }

  // Enhanced sorting methods
  sortData(sort: any) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
        case 'masp':
          return this.compareStrings(a[sort.active], b[sort.active], isAsc);
        case 'slton':
        case 'slchogiao':
        case 'slchonhap':
        case 'SLDat':
        case 'SLGiao':
          return this.compareNumbers(Number(a[sort.active]) || 0, Number(b[sort.active]) || 0, isAsc);
        case 'goiy':
          return this.compareNumbers(
            parseFloat(this.GetGoiy(a)),
            parseFloat(this.GetGoiy(b)),
            isAsc
          );
        default:
          return this.compareStrings(a[sort.active], b[sort.active], isAsc);
      }
    });
  }

  private compareStrings(a: string, b: string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private compareNumbers(a: number, b: number, isAsc: boolean): number {
    return (a - b) * (isAsc ? 1 : -1);
  }

  // Clear all filters
  clearAllFilters() {
    this.quickFilter = 'all';
    this.globalFilterValue = '';
    this.ListFilter = [];
    const currentData = this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    this.dataSource.data = currentData;
    this.totalItems = currentData.length;
    this.calculateTotalPages();
    this.currentPage = 1;
    this.updateDisplayData();
    
    // Clear search inputs
    const searchInputs = document.querySelectorAll('input[type="text"]');
    searchInputs.forEach((input: any) => {
      if (input.placeholder.includes('Tìm kiếm')) {
        input.value = '';
      }
    });
  }
}

function Debounce(delay: number = 300) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    let timeoutId: any;

    descriptor.value = function (...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        originalMethod.apply(this, args);
      }, delay);
    };

    return descriptor;
  };
}
