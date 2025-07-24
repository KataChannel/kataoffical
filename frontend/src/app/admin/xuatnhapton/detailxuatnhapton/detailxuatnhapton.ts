import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component, ViewChild, inject, TemplateRef, EventEmitter, Output } from "@angular/core";
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
import moment from "moment";
import { memoize, Debounce } from "../../../shared/utils/decorators";
import { writeExcelMultiple, readExcelFileNoWorker } from "../../../shared/utils/exceldrive.utils";
import { removeVietnameseAccents } from "../../../shared/utils/texttransfer.utils";
import { TrangThaiDon } from "../../../shared/utils/trangthai";
import { DathangService } from "../../dathang/dathang.service";
import { DonhangService } from "../../donhang/donhang.service";
import { KhoService } from "../../kho/kho.service";
import { PhieukhoService } from "../../phieukho/phieukho.service";
import { SanphamService } from "../../sanpham/sanpham.service";

@Component({
  selector: 'app-detailxuatnhapton',
  templateUrl: './detailxuatnhapton.html',
  styleUrls: ['./detailxuatnhapton.scss'],
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
export class DetailxuatnhaptonComponent {
  @Output() DexuatEmit = new EventEmitter<any>();
  Detail: any = {};
  displayedColumns: string[] = [
    'title',
    'masp',
    'dvt',
    'slton',
    'slchogiao',
    'slchonhap',
    'haohut',
    'goiy'
  ];

  ColumnName: any = {
    title: 'Tên sản phẩm',
    masp: 'Mã sản phẩm',
    dvt: 'Đơn vị tính',
    slton: 'SL tồn',
    slchogiao: 'SL chờ giao',
    slchonhap: 'SL chờ nhập',
    haohut: 'Hao hụt',
    goiy: 'Gợi ý'
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
  private _KhoService: KhoService = inject(KhoService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  Xuatnhapton:any = this._PhieukhoService.ListPhieukho;
  dataSource = new MatTableDataSource([]);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  CountItem: any = 0;
  SearchParams: any = {
    Batdau: moment().format('YYYY-MM-DD'),
    Ketthuc: moment().add(1,'day').format('YYYY-MM-DD'),
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
    await this._SanphamService.getAllSanpham() 
    this._KhoService.getTonKho('1', '1000').then((res) => {
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
    this.CountItem = this.Xuatnhapton().length;
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
    });

    if (phieuNhapDetails.length > 0) {
      // Tạo phiếu nhập một lần với danh sách chi tiết
      this._PhieukhoService.CreatePhieukho(
        {
        title:`Điều Chỉnh Kho Ngày ${moment().format('DD/MM/YYYY ')}`, 
        type:'nhap',
        sanpham: phieuNhapDetails, 
        ghichu: `Cập nhật tồn kho lúc ${moment().format('HH:mm:ss DD/MM/YYYY ')}`,
        ngay: moment()
      });
    }
    if (phieuXuatDetails.length > 0) {
      // Tạo phiếu xuất một lần với danh sách chi tiết
      this._PhieukhoService.CreatePhieukho(
        {
        title:`Điều Chỉnh Kho Ngày ${moment().format('DD/MM/YYYY ')}`, 
        type:'xuat',
        sanpham: phieuXuatDetails, 
        ghichu: `Cập nhật tồn kho lúc ${moment().format('HH:mm:ss DD/MM/YYYY ')}`,
        ngay: moment()
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
  async XemDathang(row: any, template: TemplateRef<any>) {
   this.ListDathang =  await this._DathangService.findbysanpham(row.sanphamId);
   console.log(this.ListDathang);

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

}