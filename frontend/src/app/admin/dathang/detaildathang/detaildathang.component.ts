import {
  Component,
  computed,
  effect,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
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
import { ListDathangComponent } from '../listdathang/listdathang.component';
import { DathangService } from '../dathang.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  ConvertDriveData,
  GenId,
  convertToSlug,
} from '../../../shared/utils/shared.utils';
import { MatMenuModule } from '@angular/material/menu';
import { NhacungcapService } from '../../nhacungcap/nhacungcap.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BanggiaService } from '../../banggia/banggia.service';
import moment from 'moment';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SanphamService } from '../../sanpham/sanpham.service';
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
import html2canvas from 'html2canvas';
import { Debounce } from '../../../shared/utils/decorators';
import { KhoService } from '../../kho/kho.service';
import { SharedInputService } from '../../../shared/services/shared-input.service';
import { UserService } from '../../user/user.service';
@Component({
  selector: 'app-detaildathang',
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
    MatMenuModule,
    MatDatepickerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  // providers: [provideNativeDateAdapter()],
  templateUrl: './detaildathang.component.html',
  styleUrl: './detaildathang.component.scss',
})
export class DetailDathangComponent {
  _ListdathangComponent: ListDathangComponent = inject(ListDathangComponent);
  _DathangService: DathangService = inject(DathangService);
  _NhacungcapService: NhacungcapService = inject(NhacungcapService);
  _BanggiaService: BanggiaService = inject(BanggiaService);
  _SanphamService: SanphamService = inject(SanphamService);
  _KhoService: KhoService = inject(KhoService);
  _SharedInputService: SharedInputService = inject(SharedInputService);
  _UserService: UserService = inject(UserService);
  _route: ActivatedRoute = inject(ActivatedRoute);
  _router: Router = inject(Router);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  constructor() {
    this._route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      this._DathangService.setDathangId(id);
      await this._NhacungcapService.getAllNhacungcap({pageSize:99999});
      this.filterNhacungcap = this.ListNhacungcap().filter(
        (v: any) => v.isActive
      );
      await this._KhoService.getAllKho();
      this.filterKho = this.ListKho()
      await this._BanggiaService.getAllBanggia();
      this.filterBanggia = this._BanggiaService.ListBanggia();
      await this._SanphamService.getAllSanpham({pageSize:99999});
      this.filterSanpham = this._SanphamService.ListSanpham();
      this.dataSource.data = this.DetailDathang().sanpham;
      // this.dataSource.paginator = this.paginator;
    });

    effect(async () => {
      const id = this._DathangService.dathangId();
      if (!id) {
        this._router.navigate(['/admin/dathang']);
        this._ListdathangComponent.drawer.close();
      }
      if (id === 'new') {
        this.DetailDathang.set({
          title: GenId(8, false),
          madncc: GenId(8, false),
          type: 'dathang',
          ngaynhan: moment().add(1, 'days').format('YYYY-MM-DD'),
        });
        this._ListdathangComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(['/admin/dathang', 'new']);
      } else {
        await this._DathangService.getDathangByid(id);
        this.ListFilter = this.DetailDathang().sanpham;
        this._ListdathangComponent.drawer.open();
        this._router.navigate(['/admin/dathang', id]);
      }
    });
  }
  DetailDathang: any = this._DathangService.DetailDathang;
  ListNhacungcap: any = this._NhacungcapService.ListNhacungcap;
  ListKho: any = this._KhoService.ListKho;
  isEdit = signal(false);
  isDelete = signal(false);
  filterNhacungcap: any = [];
  filterKho: any = [];
  filterBanggia: any[] = [];
  filterSanpham: any[] = [];
  dathangId: any = this._DathangService.dathangId;
  async ngOnInit() {}
  async handleDathangAction() {
    if (this.dathangId() === 'new') {
      await this.createDathang();
    } else {
      await this.updateDathang();
    }
  }
  private async createDathang() {
    try {
      this.DetailDathang.update((v: any) => {
        v.sanpham = this.dataSource.data;
        v.ngaynhan = moment(v.ngaygiao).format('YYYY-MM-DD');
        return v;
      });
      await this._DathangService.CreateDathang(this.DetailDathang());
      this._snackBar.open('Tạo Mới Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      this.isEdit.update((value) => !value);
    } catch (error) {
      console.error('Lỗi khi tạo dathang:', error);
    }
  }
  isPrint: any = signal<any>(false);
  PrintDathang() {
    const printContent = document.getElementById('chuphinh');
    if (!printContent) {
      console.error('Print content element not found');
      return;
    }
    // Ensure the document is focused before copying to clipboard
    window.focus();
    html2canvas(printContent as HTMLElement)
      .then((canvas) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const item = new ClipboardItem({ 'image/png': blob });
            navigator.clipboard
              .write([item])
              .then(() => {
                console.log('Image copied to clipboard successfully');
                this._snackBar.open('Đã Chụp Hình Xong', '', {
                  duration: 1000,
                  horizontalPosition: 'end',
                  verticalPosition: 'top',
                  panelClass: ['snackbar-success'],
                });
              })
              .catch((error) => {
                console.error('Error copying image to clipboard:', error);
              });
          } else {
            console.error('Failed to convert canvas to Blob');
          }
        }, 'image/png');
      })
      .catch((error) => console.error('Error generating image:', error));
  }

  printContent() {
    const printContent = document.getElementById('printContent');
    if (printContent) {
      const newWindow = window.open('', '_blank');
      const tailwindCSS = `
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: { extend: {} }
      };
    </script>
  `;
      if (newWindow) {
        newWindow.document.write(`
          <html>
          <head>
            <title>In Bảng</title>
             ${tailwindCSS}
            <style>
              body { font-size: 12px; font-family: Arial, sans-serif; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #000; padding: 4px; text-align: left; }
              @media print { 
              body { margin: 0; } 
              img {height:80px}
              }
            </style>
          </head>
          <body>
            ${printContent.outerHTML}
            <script>
              window.onload = function() { window.print(); window.close(); }
            </script>
          </body>
          </html>
        `);
        newWindow.document.close();
        this.DetailDathang.update((v: any) => {
          v.printCount = v.printCount + 1;
          return v;
        });
        console.log(this.DetailDathang());

        this._DathangService.updateDathang(this.DetailDathang());
      } else {
        console.error('Không thể mở cửa sổ in');
      }
    } else {
      console.error('Không tìm thấy phần tử printContent');
    }
  }

  private async updateDathang() {
    try {
      console.log(this.DetailDathang());
      this.DetailDathang.update((v: any) => {
        v.sanpham = this.dataSource.data.map((item: any) => {
          const { TonKho, ...rest } = item;
          return rest;
        });
        return v;
      });
      console.log(this.DetailDathang());
      
      await this._DathangService.updateDathang(this.DetailDathang());

      this._snackBar.open('Cập Nhật Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      this.isEdit.update((value) => !value);
    } catch (error) {
      console.error('Lỗi khi cập nhật dathang:', error);
    }
  }
  async DeleteData() {
    try {
      await this._DathangService.DeleteDathang(this.DetailDathang());

      this._snackBar.open('Xóa Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });

      this._router.navigate(['/admin/dathang']);
    } catch (error) {
      console.error('Lỗi khi xóa dathang:', error);
    }
  }
  goBack() {
    this._router.navigate(['/admin/dathang']);
    this._ListdathangComponent.drawer.close();
  }
  trackByFn(index: number, item: any): any {
    return item.id;
  }
  toggleEdit() {
    this.isEdit.update((value) => !value);
  }

  toggleDelete() {
    this.isDelete.update((value) => !value);
  }
  FillSlug() {
    // this.DetailDathang.update((v: any) => {
    //   v.slug = convertToSlug(v.title);
    //   return v;
    // });
  }
  async DoFindKho(event: any) {
    const value = event.target.value.trim().toLowerCase();
    if( !value) {
      this.filterKho = this.ListKho()
      return;
    }
    this.filterKho = this.ListKho().filter((v: any) => v.name.toLowerCase().includes(value));
  }
  SelectKho(event: any) {
    const selectedKho = this.ListKho().find(
      (v: any) => v.id === event.value
    );
    console.log(selectedKho);
    if (selectedKho) {
      this.DetailDathang.update((v: any) => {
        const kho = {
          name: selectedKho.name,
          diachi: selectedKho.diachi,
          sdt: selectedKho.sdt,
          ghichu: selectedKho.ghichu,
        };
        v.khoId = selectedKho.id;
        v.kho = kho;
        return v;
      });
    }
    console.log(this.DetailDathang());
  }


  @Debounce(100)
  async DoFindNhacungcap(event: any) {
    const value = event.target.value.trim();
    if( !value) {
      // await this._NhacungcapService.getNhacungcapBy({})
      this.filterNhacungcap = this.ListNhacungcap()
      return;
    }
    
    this.filterNhacungcap = this.ListNhacungcap().filter((v:any)=>{
        return removeVietnameseAccents(v.name).includes(removeVietnameseAccents(value))
    })
  }
  DoFindBanggia(event: any) {
    const query = event.target.value.toLowerCase();
    //  this.FilterBanggia = this.ListBanggia.filter(v => v.Title.toLowerCase().includes(query));
  }
  UpdateBangia() {
    // const Banggia = this.ListBanggia.find(v => v.id === this.Detail.idBanggia)
    // const valueMap = new Map(Banggia.ListSP.map(({ MaSP, giaban }:any) => [MaSP, giaban]));
    // this.Detail.Giohangs = this.Detail.Giohangs
    //     .filter(({ MaSP }:any) => valueMap.has(MaSP)) // Chỉ giữ lại phần tử có trong data2
    //     .map((item:any) => ({
    //         ...item,  // Giữ lại tất cả các thuộc tính từ data1
    //         gia: valueMap.get(item.MaSP)?? item.gia, // Cập nhật giá trị value từ data2
    //         Tongtien: valueMap.get(item.MaSP)?? item.gia // Cập nhật giá trị value từ data2
    //     }));
    //     this.UpdateListSanpham()
    // console.log(this.Detail.Giohangs);
  }
  SelectBanggia(event: any) {
    console.log(event.value);
    // this.Detail.idBanggia = event.value
    // this.UpdateBangia()
    // const Banggia = this.ListBanggia.find(v => v.id === event.value)
    // const valueMap = new Map(Banggia.ListSP.map(({ id, giaban }:any) => [id, giaban]));
    // this.Detail.Giohangs = this.Detail.Giohangs
    //     .filter(({ id }:any) => valueMap.has(id)) // Chỉ giữ lại phần tử có trong data2
    //     .map((item:any) => ({
    //         ...item,  // Giữ lại tất cả các thuộc tính từ data1
    //         gia: valueMap.get(item.id)?? item.gia, // Cập nhật giá trị value từ data2
    //         Tongtien: valueMap.get(item.id)?? item.gia // Cập nhật giá trị value từ data2
    //     }));
    // console.log(this.Detail.Giohangs);
  }
  Chonnhacungcap(item: any) {
    this.DetailDathang.update((v: any) => {
      v.nhacungcapId = item.id;
      return v;
    });
  }
  
  // ✅ Method để auto-select text khi focus vào input - Using shared service
  onInputFocus(event: FocusEvent) {
    this._SharedInputService.onInputFocus(event);
  }

  // ✅ Method để validate keyboard input for decimal handling
  validateKeyInput(event: KeyboardEvent, type: 'number' | 'string') {
    return this._SharedInputService.handleKeyboardEvent(event, type);
  }

  EnterUpdateValue(
    event: Event,
    order: number | null,
    element: any,
    field: keyof any,
    type: 'number' | 'string'
  ) {
    // Convert order to index for shared service
    const index = this.dataSource.data.findIndex((item: any) => item.order === order);
    
    this._SharedInputService.updateValue(
      event,
      'dathang',
      index,
      element,
      field as string,
      type,
      this.DetailDathang().sanpham || [],
      (updateFn: (v: any) => any) => this.DetailDathang.update(updateFn),
      this.dataSource.data.length
    );
  }

  UpdateBlurValue(
    event: Event,
    order: number | null,
    element: any,
    field: keyof any,
    type: 'number' | 'string'
  ) {
    // Convert order to index for shared service
    const index = this.dataSource.data.findIndex((item: any) => item.order === order);
    
    this._SharedInputService.updateBlurValue(
      event,
      'dathang',
      index,
      element,
      field as string,
      type,
      this.DetailDathang().sanpham || [],
      (updateFn: (v: any) => any) => this.DetailDathang.update(updateFn)
    );

    // Update dataSource to reflect changes  
    this.dataSource.data = [...this.DetailDathang().sanpham];
  }

  Tongcong: any = 0;
  Tong: any = 0;
  Tinhtongcong(value: any) {
    this.Tongcong = value.Tongcong;
    this.Tong = value.Tong;
  }
  TinhTong(items: any, fieldTong: any) {
    return (
      items?.reduce((sum: any, item: any) => sum + (item[fieldTong] || 0), 0) ||
      0
    );
  }
  SelectNhacungcap(event: any) {
    const selectedNhacungcap = this.ListNhacungcap().find(
      (v: any) => v.id === event.value
    );
    console.log(selectedNhacungcap);
    if (selectedNhacungcap) {
      this.DetailDathang.update((v: any) => {
        const nhacungcap = {
          name: selectedNhacungcap.name,
          mancc: selectedNhacungcap.mancc,
          diachi: selectedNhacungcap.diachi,
          sdt: selectedNhacungcap.sdt,
          ghichu: selectedNhacungcap.ghichu,
        };
        v.nhacungcapId = selectedNhacungcap.id;
        v.nhacungcap = nhacungcap;
        return v;
      });
    }
    console.log(this.DetailDathang());
  }

  displayedColumns: string[] = [
    'STT',
    'title',
    'masp',
    'dvt',
    'sldat',
    // 'slgiao',
    'slnhan',
    'gianhap',
    'ttnhan',
    'ghichu',
  ];
  ColumnName: any = {
    STT: 'STT',
    title: 'Tiêu Đề',
    masp: 'Mã SP',
    dvt: 'Đơn Vị Tính',
    sldat: 'SL Đặt',
    // slgiao: 'SL Giao',
    slnhan: 'SL Nhận',
    gianhap: 'Giá Nhập',
    ttnhan: 'Tổng Tiền',
    ghichu: 'Ghi Chú',
  };
  dataSource = new MatTableDataSource<any>([]);
  CountItem = this.dataSource.data.length;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  async LoadDrive() {
    const DriveInfo = {
      IdSheet: '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk',
      SheetName: 'DatHImport',
      ApiKey: 'AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao',
    };
    const result: any = await this._GoogleSheetService.getDrive(DriveInfo);
    const data = ConvertDriveData(result.values);
    console.log(data);
    this.DetailDathang.update((v: any) => {
      v.sanpham = data.map((v1: any) => {
        v1.sldat = Number(v1.sldat) || 0;
        v1.slgiao = Number(v1.slgiao) || 0;
        v1.slnhan = Number(v1.slnhan) || 0;
        v1.ttdat = Number(v1.ttdat) || 0;
        v1.ttgiao = Number(v1.ttgiao) || 0;
        v1.ttnhan = Number(v1.ttnhan) || 0;
        const item = this._SanphamService
          .ListSanpham()
          .find((v2) => v2.masp === v1.masp);
        console.log(item);
        if (item) {
          return { ...item, ...v1 };
        }
        return v1;
      });
      return v;
    });
    console.log(this.DetailDathang());

    //  this.DetailBanggia.update((v:any)=>{
    //   const listdata = data.map((item:any) => {
    //     item.masp = item.masp?.trim()||'';
    //     item.giaban = Number(item.giaban)||0;
    //     const item1 = this._SanphamService.ListSanpham().find((v1) => v1.masp === item.masp);
    //     if (item1) {
    //       return { ...item1, ...item };
    //     }
    //     return item;
    //   });
    //   v.sanpham = listdata
    //   return v;
    // })
    this.dataSource.data = this.DetailDathang().sanpham;
    this.reloadfilter();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  EmptyCart() {
    this.DetailDathang.update((v: any) => {
      v.sanpham = [];
      return v;
    });
    this.dataSource.data = this.DetailDathang().sanpham;
    this.reloadfilter();
  }
  getName(id: any) {
    return this.ListNhacungcap().find((v: any) => v.id === id);
  }

  reloadfilter() {
    this.filterSanpham = this._SanphamService
      .ListSanpham()
      .filter(
        (v: any) =>
          !this.DetailDathang().sanpham.some((v2: any) => v2.id === v.id)
      );
  }
  // RemoveSanpham(item:any){
  //   this.DetailBanggia.update((v:any)=>{
  //     v.sanpham = v.sanpham.filter((v1:any) => v1.id !== item.id);
  //     this.reloadfilter();
  //     return v;
  //   })
  //   this.dataSource().data = this.DetailBanggia().sanpham;
  //   this.dataSource().paginator = this.paginator;
  //   this.dataSource().sort = this.sort;
  // }
  DoFindSanpham(event: any) {
    const value = event.target.value;
    console.log(value);

    this.filterSanpham = this._SanphamService
      .ListSanpham()
      .filter((v) => v.title.toLowerCase().includes(value.toLowerCase()));
  }
  SelectSanpham(event: any) {
    const value = event.value;
    const item = this._SanphamService.ListSanpham().find((v) => v.id === value);
    this.DetailDathang.update((v: any) => {
      if (!v.sanpham) {
        v.sanpham = [];
        item.sldat = item.slgiao = 1;
        v.sanpham.push(item);
      } else {
        item.sldat = item.slgiao = 1;
        v.sanpham.push(item);
      }
      this.reloadfilter();
      return v;
    });
    this.dataSource.data = this.DetailDathang().sanpham;
  }
  RemoveSanpham(item: any) {
    this.DetailDathang.update((v: any) => {
      v.sanpham = v.sanpham.filter((v1: any) => v1.id !== item.id);
      this.reloadfilter();
      return v;
    });
    this.dataSource.data = this.DetailDathang().sanpham;
  }
  GetGoiy(item: any) {
    const result = parseFloat(
      ((item.soluongkho - item.soluong) * (1 + item.haohut / 100)).toString()
    ).toFixed(3);
    if (Number(result) < 0) {
      return 0;
    }
    return result;
  }
  doFilterSanpham(event: any): void {
    this.filterSanpham = this._SanphamService
      .ListSanpham()
      .filter(
        (v: any) =>
          removeVietnameseAccents(v.title).includes(
            event.target.value.toLowerCase()
          ) || v.title.toLowerCase().includes(event.target.value.toLowerCase())
      );
    const query = event.target.value.toLowerCase();
  }
  ListFilter: any[] = [];
  ChosenItem(item: any) {
    console.log(item);

    const CheckItem = this.filterSanpham.filter((v: any) => v.id === item.id);
    const CheckItem1 = this.ListFilter.filter((v: any) => v.id === item.id);
    if (CheckItem1.length > 0) {
      this.ListFilter = this.ListFilter.filter((v) => v.id !== item.id);
    } else {
      this.ListFilter = [...this.ListFilter, ...CheckItem];
    }
    this.ListFilter.forEach((v: any) => {
      v.idSP = v.id;
    });
  }
  ChosenAll(list: any) {
    this.ListFilter = list;
  }
  ResetFilter() {
    this.ListFilter = this.filterSanpham;
    this.dataSource.data = this.filterSanpham;
  }
  EmptyFiter() {
    this.ListFilter = [];
  }
  CheckItem(item: any) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }
  ApplyFilterColum(menu: any) {
    console.log(this.ListFilter);
    
    // Get existing products to preserve their values
    const existingProducts = this.DetailDathang().sanpham || [];
    const existingProductMap = new Map(existingProducts.map((item: any) => [item.id, item]));
    
    this.ListFilter.forEach((v: any) => {
      // Check if this product already exists in the current order
      const existingProduct = existingProductMap.get(v.id);
      
      if (existingProduct) {
        // Preserve existing values for products already in the order
        v.sldat = (existingProduct as any).sldat || 1;
        v.slgiao = (existingProduct as any).slgiao || 1; 
        v.slnhan = (existingProduct as any).slnhan || 1;
        v.gianhap = (existingProduct as any).gianhap || 0;
        v.ttnhan = (existingProduct as any).ttnhan || 0;
        v.ghichu = (existingProduct as any).ghichu || '';
        v.order = (existingProduct as any).order || v.order;
      } else {
        // Set default values only for new products
        v.sldat = v.slgiao = v.slnhan = 1;
        v.gianhap = 0;
        v.ttnhan = 0;
        v.ghichu = '';
      }
    });
    
    this.dataSource.data = this.ListFilter;
    this.DetailDathang.update((v: any) => {
      v.sanpham = this.ListFilter;
      return v;
    });
    this.dataSource.data.sort((a, b) => a.order - b.order);
    menu.closeMenu();
  }

  GiaoDonhang() {
    this.DetailDathang.update((v: any) => {
      v.status = 'dagiao';
      return v;
    });
    this._DathangService
      .updateDathang(this.DetailDathang())
      .then((res: any) => {
        this._snackBar.open('Giao Đơn Hàng Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
      });
  }
  Danhanhang() {
    this.DetailDathang.update((v: any) => {
      v.status = 'danhan';
      return v;
    });
    this._DathangService
      .updateDathang(this.DetailDathang())
      .then((res: any) => {
        this._snackBar.open('Đã Nhận Hàng Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update((value) => !value);
      });
  }
  Dathang() {
    this.DetailDathang.update((v: any) => {
      v.status = 'dadat';
      return v;
    });
    this._DathangService
      .updateDathang(this.DetailDathang())
      .then((res: any) => {
        this._snackBar.open('Về Đặt Hàng Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update((value) => !value);
      });
  }

  // ✅ Helper method to validate and parse decimal numbers (supports both . and ,)
  private parseDecimalValue(input: string): number {
    // Remove any non-numeric characters except decimal separators (. and ,)
    const cleanInput = input.replace(/[^\d.,]/g, '');
    
    // Convert comma to dot for consistent parsing (European format support)
    const normalizedInput = cleanInput.replace(/,/g, '.');
    
    // Handle multiple decimal points - keep only the first one
    const parts = normalizedInput.split('.');
    const cleanDecimal = parts.length > 1 
      ? `${parts[0]}.${parts.slice(1).join('')}` 
      : normalizedInput;
    
    const parsed = parseFloat(cleanDecimal);
    return isNaN(parsed) ? 0 : parsed;
  }

  // ✅ Method to format decimal display
  formatDecimalDisplay(value: number): string {
    return value % 1 === 0 ? value.toString() : value.toFixed(3);
  }

  // ✅ Method to normalize decimal input (convert comma to dot for consistency)
  normalizeDecimalInput(input: string): string {
    return input.replace(/,/g, '.');
  }

  // ✅ Method to validate decimal input (supports both . and ,)
  isValidDecimalInput(input: string): boolean {
    // Allow digits, one decimal separator (. or ,), and basic validation
    const normalizedInput = this.normalizeDecimalInput(input);
    const decimalPattern = /^\d*\.?\d*$/;
    return decimalPattern.test(normalizedInput);
  }

  // ✅ Helper method to focus next input in sequence
  private focusNextInput(currentFieldClass: string, currentIndex: number): void {
    setTimeout(() => {
      const inputs = document.querySelectorAll(
        `.${currentFieldClass}`
      ) as NodeListOf<HTMLElement>;
      
      if (currentIndex < inputs.length - 1) {
        const nextInput = inputs[currentIndex + 1] as HTMLElement;
        if (nextInput) {
          nextInput.focus();
          
          // Select all text in the input
          if (document.createRange && window.getSelection) {
            const range = document.createRange();
            range.selectNodeContents(nextInput);
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
          }
        }
      }
    }, 10);
  }

  // ✅ Helper method to get tabindex for field navigation
  getTabIndex(field: string, rowIndex: number): number {
    const fieldSequence = ['sldat', 'slgiao', 'slnhan', 'gianhap', 'ghichu'];
    const fieldIndex = fieldSequence.indexOf(field);
    return (rowIndex * fieldSequence.length) + fieldIndex + 1;
  }

  // ===================== Permission Methods =====================
  
  /**
   * Check if user has specific permission
   */
  hasPermission(permission: string): boolean {
    return this._UserService.hasPermission(permission);
  }

  /**
   * Check if user can edit sldat field
   */
  canEditSldat(): boolean {
    return this.hasPermission('dathang.sldat');
  }

  /**
   * Check if user can edit slgiao field
   */
  canEditSlgiao(): boolean {
    return this.hasPermission('dathang.slgiao');
  }

  /**
   * Check if user can edit slnhan field
   */
  canEditSlnhan(): boolean {
    return this.hasPermission('dathang.slnhan');
  }

  /**
   * Check if user can edit gianhap field
   */
  canEditGianhap(): boolean {
    return this.hasPermission('dathang.gianhap');
  }
}
