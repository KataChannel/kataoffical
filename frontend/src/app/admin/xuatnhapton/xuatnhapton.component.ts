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
import { removeVietnameseAccents } from "../../shared/utils/texttransfer.utils";
import { TrangThaiDon } from "../../shared/utils/trangthai";
import { DathangService } from "../dathang/dathang.service";
import { DonhangService } from "../donhang/donhang.service";
import { KhoService } from "../kho/kho.service";
import { PhieukhoService } from "../phieukho/phieukho.service";
import { SanphamService } from "../sanpham/sanpham.service";
import { GraphqlService } from "../../shared/services/graphql.service";
import { ChotkhoService } from "../chotkho/chotkho.service";
import {
  readExcelFileNoWorkerArray,
  writeExcelFile,
  writeExcelMultiple,
  readExcelFileNoWorker
} from "../../shared/utils/exceldrive.utils";
import { StockWarningDialogComponent, StockWarningItem, StockWarningData } from "../dathang/nhucaudathang/stock-warning-dialog.component";
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
  private _ChotkhoService: ChotkhoService = inject(ChotkhoService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  Xuatnhapton:any = this._PhieukhoService.ListPhieukho;
  dataSource = new MatTableDataSource([]);
  _snackBar: MatSnackBar = inject(MatSnackBar);  CountItem: any = 0;
  isUpdatingStock = false;
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

  async Capnhattonkho() {
    this.isUpdatingStock = true;

    // Tạo input file element động
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx,.xls,.csv';
    fileInput.style.display = 'none';

    fileInput.onchange = async (event: any) => {
      try {
        const file = event.target.files[0];
        if (!file) {
          this._snackBar.open('Không có file được chọn', 'Đóng', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
          this.isUpdatingStock = false;
          return;
        }

        // Hiển thị loading
        this._snackBar.open('Đang xử lý file Excel...', '', {
          duration: 0,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-info'],
        });

        // Đọc file Excel (không sử dụng worker)
        const excelData = await readExcelFileNoWorkerArray(event);

        if (!excelData || excelData.length === 0) {
          this._snackBar.dismiss();
          this._snackBar.open('File Excel trống hoặc không hợp lệ', 'Đóng', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
          return;
        }

        // Validate và transform dữ liệu
        const validData: Array<{ masp: string; slton: number; slhuy: number }> = [];
        const errors: string[] = [];
        console.log(excelData);

        excelData.forEach((row: any, index: number) => {
          const masp = row.masp?.toString().trim() || row.ITEMCODE?.toString().trim();
          let slton = parseFloat(row.slton || row.QUANTITY || '0');
          let slhuy = parseFloat(row.slhuy || '0');

          // Validate required fields
          if (!masp) {
            errors.push(`Dòng ${index + 1}: Thiếu mã sản phẩm`);
            return;
          }

          // Xử lý slton: nếu NaN, null, undefined hoặc <= 0 thì set về 0
          if (isNaN(slton) || slton == null || slton <= 0) {
            slton = 0;
            console.log(
              `Dòng ${index + 1} - ${masp}: slton được set về 0 (giá trị gốc: ${row.slton
              })`
            );
          }
          
          if (isNaN(slhuy) || slhuy == null || slhuy < 0) {
            slhuy = 0;
          }

          validData.push({ masp, slton, slhuy });
        });

        if (errors.length > 0) {
          this._snackBar.dismiss();
          this._snackBar.open(
            `Có ${errors.length} lỗi trong file. Xem console để biết chi tiết.`,
            'Đóng',
            {
              duration: 5000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-error'],
            }
          );
          console.error('Validation errors:', errors);
          return;
        }

        // Get all existing TonKho and Sanpham data
        const [tonkhoResponse, sanphamResponse] = await Promise.all([
          this._GraphqlService.findAll('tonkho', {
            take: 999999,
            select: {
              id: true,
              sanphamId: true,
              slton: true,
              sltontt: true,
              slchogiao: true,
              slchonhap: true,
              sanpham: {
                select: {
                  id: true,
                  masp: true,
                  title: true,
                  Dathangsanpham: {
                    where: { dathang: { status: { in: ['dadat', 'dagiao'] } } },
                    orderBy: { dathang: { createdAt: 'asc' } },
                    take: 1,
                    select: {
                      dathang: {
                        select: { createdAt: true }
                      }
                    }
                  },
                  Donhangsanpham: {
                    where: { donhang: { status: { in: ['dadat', 'dagiao'] } } },
                    orderBy: { donhang: { createdAt: 'asc' } },
                    take: 1,
                    select: {
                      donhang: {
                        select: { createdAt: true }
                      }
                    }
                  }
                },
              },
            },
          }),
          this._GraphqlService.findAll('sanpham', {
            take: 999999,
            select: {
              id: true,
              masp: true,
              title: true,
            },
          }),
        ]);

        const allTonkho = tonkhoResponse.data || [];
        const allSanpham = sanphamResponse.data || [];

        // Create maps for quick lookup
        const tonkhoMap = new Map(
          allTonkho.map((tk: any) => [tk.sanpham?.masp, tk])
        );
        const sanphamMap = new Map(allSanpham.map((sp: any) => [sp.masp, sp]));

        const processErrors: string[] = [];
        const validDataMap = new Map(validData.map(item => [item.masp, { slton: item.slton, slhuy: item.slhuy }]));

        const phieuNhapDetails: any[] = [];
        const phieuXuatDetails: any[] = [];
        const allChangedDetails: any[] = [];
        let unchangedCount = 0;

        const danhSachCanhBao: StockWarningItem[] = [];

        for (const [masp, parsedData] of validDataMap.entries()) {
          const slton = parsedData.slton;
          const slhuy = parsedData.slhuy;
          
          const tonkho = tonkhoMap.get(masp);
          const sanpham = sanphamMap.get(masp);

          if (!sanpham) {
            processErrors.push(`Không tìm thấy sản phẩm với mã: ${masp}`);
            continue;
          }

          const currentSltontt = Number(tonkho ? (tonkho.sltontt || 0) : 0);

          if (slton > currentSltontt) {
            phieuNhapDetails.push({
              sanphamId: sanpham.id,
              soluong: slton - currentSltontt,
            });
          } else if (slton < currentSltontt) {
            phieuXuatDetails.push({
              sanphamId: sanpham.id,
              soluong: currentSltontt - slton,
            });
          } else {
            unchangedCount++;
          }

          if (slton !== currentSltontt || slhuy > 0) {
            allChangedDetails.push({
              sanphamId: sanpham.id,
              sltonhethong: currentSltontt,
              sltonthucte: slton,
              slhuy: slhuy,
              ghichu: slton > currentSltontt ? 'Điều chỉnh tăng từ Excel' : (slton < currentSltontt ? 'Điều chỉnh giảm từ Excel' : 'Cập nhật từ Excel'),
            });
          }

          if (slton !== currentSltontt) {
            const warning = this.detectStockAnomalies(
              masp,
              sanpham.title || masp,
              slton,
              currentSltontt
            );
            if (warning) {
              danhSachCanhBao.push(warning);
            }
          }

          // ✅ CẢNH BÁO HÀNG TRUNG CHUYỂN: Kiểm tra độc lập (ngay cả khi khách nhập số khớp với kho hiện tại)
          const slchonhap = Number(tonkho?.slchonhap || 0);
          const slchogiao = Number(tonkho?.slchogiao || 0);

          if (slchonhap > 0 || slchogiao > 0) {
            // Kiểm tra rủi ro "Đếm lặp hàng đang về vào hàng tồn kho"
            if (slchonhap > 0 && slton !== currentSltontt && slton >= (currentSltontt + slchonhap * 0.8)) {
              danhSachCanhBao.push({
                masp,
                title: sanpham.title || sanpham.masp,
                sltonCu: currentSltontt,
                sltonMoi: slton,
                chenhLech: slton - currentSltontt,
                loaiDieuChinh: 'tang',
                mucDoNghiemTrong: 'cao',
                lyDoCanhBao: `CẢNH BÁO ĐẾM LẶP: Đã chốt tăng ${slton - currentSltontt} kg trong khi có ${slchonhap} kg 'Hàng đang về' chưa xác nhận 'Đã nhận'. Rủi ro đếm lộn hàng trung chuyển!`,
                slchonhap: slchonhap,
                slchogiao: slchogiao
              });
            } else {
              // Cảnh báo thông thường về việc chốt kho lên lô hàng có phát sinh giao dịch bị treo
              let warningMess = `Sản phẩm này đang có `;
              if (slchonhap > 0) warningMess += `${slchonhap} kg 'Hàng đang về' `;
              if (slchonhap > 0 && slchogiao > 0) warningMess += `và `;
              if (slchogiao > 0) warningMess += `${slchogiao} kg 'Đơn đang đi' `;
              warningMess += `chưa hoàn tất. Vui lòng kiểm tra kỹ số thực tế.`;

              // 🚩 Tính toán độ trễ chứng từ (T+1)
              const dathangOldest = tonkho?.sanpham?.Dathangsanpham?.[0]?.dathang?.createdAt;
              const donhangOldest = tonkho?.sanpham?.Donhangsanpham?.[0]?.donhang?.createdAt;
              const oldestDate = dathangOldest || donhangOldest;
              const isLate = oldestDate ? (new Date().getTime() - new Date(oldestDate).getTime()) > (24 * 60 * 60 * 1000) : false;

              danhSachCanhBao.push({
                masp,
                title: sanpham.title || sanpham.masp,
                sltonCu: currentSltontt,
                sltonMoi: slton,
                chenhLech: Math.abs(slton - currentSltontt),
                loaiDieuChinh: 'khong_doi', 
                mucDoNghiemTrong: isLate ? 'cao' : 'trung_binh', 
                lyDoCanhBao: isLate ? `🚩 CẢNH BÁO TRỄ CHỨNG TỪ: ${warningMess} (Đơn cũ nhất từ ${new Date(oldestDate).toLocaleDateString('vi-VN')})` : warningMess,
                isLate: isLate,
                oldestPendingDate: oldestDate ? new Date(oldestDate) : null,
                slchonhap: slchonhap,
                slchogiao: slchogiao
              });
            }
          }
        }

        this._snackBar.dismiss();

        const spBinhThuong = (phieuNhapDetails.length + phieuXuatDetails.length) - danhSachCanhBao.length;

        const dialogData: StockWarningData = {
          title: '⚠️ Xác Nhận Cập Nhật Chốt Kho',
          tongSanPham: validDataMap.size,
          spBinhThuong: Math.max(0, spBinhThuong),
          spKhongThayDoi: unchangedCount,
          danhSachCanhBao,
          danhSachNhap: phieuNhapDetails,
          danhSachXuat: phieuXuatDetails,
        };

        const dialogRef = this._dialog.open(StockWarningDialogComponent, {
          width: '90vw',
          height: '90vh',
          maxWidth: '1600px',
          disableClose: true,
          data: dialogData
        });

        const confirmed = await dialogRef.afterClosed().toPromise();

        if (!confirmed) {
          this._snackBar.open('Đã hủy cập nhật chốt kho.', 'Đóng', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-info'],
          });
          this.isUpdatingStock = false;
          return;
        }

        this._snackBar.open('Đang lưu dữ liệu chốt kho...', '', {
          duration: 0,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-info'],
        });

        if (allChangedDetails.length > 0) {
          const defaultKhoId = '4cc01811-61f5-4bdc-83de-a493764e9258'; 

          const ckResult = await this._ChotkhoService.createChotkhoWithDetails({
            ngaychot: DateHelpers.now(),
            title: `ĐIỀU CHỈNH CHỐT KHO TỰ ĐỘNG [EXCEL]`,
            khoId: defaultKhoId,
            ghichu: `Chốt kho từ Excel (${phieuNhapDetails.length} tăng, ${phieuXuatDetails.length} giảm) lúc ${DateHelpers.format(DateHelpers.now(), 'HH:mm:ss DD/MM/YYYY')}`,
            details: allChangedDetails
          });

          if (!ckResult || ckResult === false) {
            throw new Error("Tạo chốt kho thất bại từ API. Vui lòng kiểm tra lại log hệ thống.");
          }
        }

        this._snackBar.dismiss();

        if (processErrors.length > 0) {
          console.error('Process errors:', processErrors);
          this._snackBar.open(
            `Hoàn thành với ${processErrors.length} lỗi. ${phieuNhapDetails.length} tăng, ${phieuXuatDetails.length} giảm, ${unchangedCount} giữ nguyên. Xem console.`,
            'Đóng',
            {
              duration: 5000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-warning'],
            }
          );
        } else {
          this._snackBar.open(
            `✅ Cập nhật TonKho thành công: ${phieuNhapDetails.length} tăng, ${phieuXuatDetails.length} giảm, ${unchangedCount} giữ nguyên.`,
            'Đóng',
            {
              duration: 4000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-success'],
            }
          );
        }

        this.ngOnInit();
      } catch (error: any) {
        this._snackBar.dismiss();
        this._snackBar.open(`Lỗi xử lý file: ${error.message}`, 'Đóng', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
        console.error('Error processing Excel file:', error);
      } finally {
        this.isUpdatingStock = false;
      }
    };

    fileInput.oncancel = () => {
      this.isUpdatingStock = false;
    };

    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  }

  async downloadTonkhoTemplate() {
    const mapping = {
      masp: 'masp',
      title: 'title',
      slton: 'slton',
      slhuy: 'slhuy',
    };
    const Sanphams = await this._GraphqlService.findAll('sanpham', {
      take: 999999,
      select: {
        id: true,
        masp: true,
        title: true,
        TonKho: {
          select: {
            slton: true,
            sltontt: true,
          },
        },
      },
    });
    const sampleData = Sanphams.data.map((sp: any) => ({
      masp: sp.masp || '',
      title: sp.title || '',
      slton: sp.TonKho?.sltontt || sp.TonKho?.slton || 0,
      slhuy: 0,
    }));
    writeExcelFile(
      sampleData,
      'MauCapNhatTonKho',
      Object.values(mapping),
      mapping
    );

    this._snackBar.open('Đã tải file Excel mẫu', 'Đóng', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-info'],
    });
  }

  private detectStockAnomalies(
    masp: string,
    title: string,
    sltonMoi: number,
    sltonCu: number
  ): StockWarningItem | null {
    const chenhLech = Math.abs(sltonMoi - sltonCu);
    const loaiDieuChinh: 'tang' | 'giam' = sltonMoi > sltonCu ? 'tang' : 'giam';

    if (sltonCu === 0 && sltonMoi >= 1000) {
      return {
        masp, title, sltonCu, sltonMoi, chenhLech, loaiDieuChinh,
        mucDoNghiemTrong: 'cao',
        lyDoCanhBao: `Tồn cũ = 0 nhưng nhập mới ${sltonMoi.toLocaleString()} → kiểm tra lại số liệu gốc`
      };
    }

    if (sltonMoi >= 5000) {
      return {
        masp, title, sltonCu, sltonMoi, chenhLech, loaiDieuChinh,
        mucDoNghiemTrong: 'cao',
        lyDoCanhBao: `Số lượng ${sltonMoi.toLocaleString()} rất lớn → có thể nhập nhầm đơn vị (cây vs thùng)`
      };
    }

    if (sltonCu > 0 && chenhLech / sltonCu > 5) {
      return {
        masp, title, sltonCu, sltonMoi, chenhLech, loaiDieuChinh,
        mucDoNghiemTrong: 'trung_binh',
        lyDoCanhBao: `Chênh lệch ${(chenhLech / sltonCu * 100).toFixed(0)}% so với tồn cũ → xác nhận lại`
      };
    }

    if (loaiDieuChinh === 'giam' && chenhLech >= 500) {
      return {
        masp, title, sltonCu, sltonMoi, chenhLech, loaiDieuChinh,
        mucDoNghiemTrong: 'trung_binh',
        lyDoCanhBao: `Giảm ${chenhLech.toLocaleString()} đơn vị → kiểm tra phiếu xuất kho`
      };
    }

    return null;
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