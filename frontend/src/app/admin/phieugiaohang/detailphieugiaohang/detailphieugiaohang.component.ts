import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
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
import { ListPhieugiaohangComponent } from '../listphieugiaohang/listphieugiaohang.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  ConvertDriveData,
  GenId,
  convertToSlug,
} from '../../../shared/utils/shared.utils';
import { MatMenuModule } from '@angular/material/menu';
import { KhachhangService } from '../../khachhang/khachhang.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BanggiaService } from '../../banggia/banggia.service';
import moment from 'moment';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DonhangService } from '../../donhang/donhang.service';
import { SanphamService } from '../../sanpham/sanpham.service';
import { UserService } from '../../user/user.service';
import { SharedInputService } from '../../../shared/services/shared-input.service';
@Component({
  selector: 'app-detailphieugiaohang',
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
  templateUrl: './detailphieugiaohang.component.html',
  styleUrl: './detailphieugiaohang.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPhieugiaohangComponent implements OnInit, AfterViewInit {
  _ListphieugiaohangComponent: ListPhieugiaohangComponent = inject(ListPhieugiaohangComponent);
  _PhieugiaohangService: DonhangService = inject(DonhangService);
  _SanphamService: SanphamService = inject(SanphamService);
  _UserService: UserService = inject(UserService);
  _SharedInputService: SharedInputService = inject(SharedInputService);
  _route: ActivatedRoute = inject(ActivatedRoute);
  _router: Router = inject(Router);
  _snackBar: MatSnackBar = inject(MatSnackBar);
    displayedColumns: string[] = [
    'STT',
    'title',
    'masp',
    'dvt',
    'sldat',
    'slgiao',
    'giaban',
    'ttgiao',
    'slnhan',
    'ghichu'
  ];
  
  ColumnName: any = {
    STT: 'STT',
    title: 'Tiêu Đề',
    masp: 'Mã SP',
    dvt: 'Đơn Vị Tính',
    sldat: 'SL Đặt',
    slgiao: 'SL Giao',
    giaban: 'Giá Bán',
    ttgiao: 'TT Giao',
    slnhan: 'Thực Nhận',
    ghichu: 'Ghi Chú'
  };

  dataSource:any = new MatTableDataSource([]);
  CountItem = computed(() => this.dataSource.data.length);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  DetailPhieugiaohang: any = this._PhieugiaohangService.DetailDonhang;
  profile: any = this._UserService.profile;
  // ListKhachhang: any = this._KhachhangService.ListKhachhang;
  isEdit = signal(true);
  isDelete = signal(false);
  filterKhachhang: any = [];
  filterBanggia: any[] = [];
  filterSanpham: any[] = [];
  phieugiaohangId: any = this._PhieugiaohangService.donhangId;
  ListSanpham: any = this._SanphamService.ListSanpham;
  Trangthai: any = [
    { value: 'dadat', title: 'Đã Đặt' },
    { value: 'dagiao', title: 'Đã Giao' },
    { value: 'danhan', title: 'Đã Nhận' },
    { value: 'huy', title: 'Hủy' },
  ];
  constructor(
    private sharedInputService: SharedInputService
  ) {
    this._route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      this._PhieugiaohangService.setDonhangId(id);
      await this._SanphamService.getAllSanpham({pageSize:99999});
      this.filterSanpham = this._SanphamService.ListSanpham();
    });

    effect(async () => {
      await this._UserService.getProfile();
      const id = this._PhieugiaohangService.donhangId();
      if (!id || id === '0') {
        this._router.navigate(['/admin/phieugiaohang']);
        this._ListphieugiaohangComponent.drawer.close();
      }
      else {
        await this._PhieugiaohangService.Phieugiaohang({id:id});
        const phieuGiaoHang = this.DetailPhieugiaohang();

        // Update edit mode based on status
        this.isEdit.set(phieuGiaoHang.status !== 'danhan');
        
        // Process sanpham data with proper typing
        const processedSanpham = phieuGiaoHang?.sanpham?.map((item: any) => ({
          ...item,
          ttgiao: (Number(item.slgiao) || 0) * (Number(item.giaban) || 0)
        })) || [];
        
        // Sort by title A-Z
        processedSanpham.sort((a: any, b: any) => {
          const titleA = a.sanpham?.title || a.title || '';
          const titleB = b.sanpham?.title || b.title || '';
          return titleA.localeCompare(titleB, 'vi', { sensitivity: 'base' });
        });
        
        // Update the signal with processed data
        this.DetailPhieugiaohang.update((data: any) => ({
          ...data,
          sanpham: processedSanpham
        }));
          // Initialize datasource with processed data
        this.dataSource.data = processedSanpham;
        setTimeout(() => {
          this.dataSource.sort = this.sort;
        }, 300);
        // Set up paginator and sort after view init
        this.setupDataSource();
        this._ListphieugiaohangComponent.drawer.open();
        this._router.navigate(['/admin/phieugiaohang', id]);
      }
    });
  }
  getTitle(item: any) {
    return this.Trangthai.find((v:any) => v.value === item)?.title;
  } 
 async ngOnInit() {
   await this._UserService.getProfile();
  console.log(this.profile());
  
    const phieugiaohangId = this.phieugiaohangId();
    if (!phieugiaohangId) return;

    try {
      await this._PhieugiaohangService.Phieugiaohang({ id: phieugiaohangId });
      
      const phieuGiaoHang = this.DetailPhieugiaohang();
      
      // Set edit mode based on status
      this.isEdit.set(phieuGiaoHang.status !== 'danhan');

      // Process sanpham data
      if (phieuGiaoHang?.sanpham?.length) {
      const processedSanpham = phieuGiaoHang.sanpham.map((item: any) => ({
        ...item,
        ttgiao: (Number(item.slgiao) || 0) * (Number(item.giaban) || 0)
      }));

      // Sort by title A-Z
      processedSanpham.sort((a: any, b: any) => {
        const titleA = a.sanpham?.title || a.title || '';
        const titleB = b.sanpham?.title || b.title || '';
        return titleA.localeCompare(titleB, 'vi', { sensitivity: 'base' });
      });

      // Update signal with processed data
      this.DetailPhieugiaohang.update((data: any) => ({
        ...data,
        sanpham: processedSanpham
      }));
      }
    } catch (error) {
      console.error('Error loading phieu giao hang:', error);
      this._snackBar.open('Lỗi khi tải phiếu giao hàng', '', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
      });
    }
    this.dataSource = new MatTableDataSource(this.DetailPhieugiaohang().sanpham);

   // Sort by title A-Z
    this.dataSource.sortingDataAccessor = (item: any, property: string) => {
      console.log(item, property);
      
      switch (property) {
      case 'title':
      return (item.sanpham?.title || item.title || '');
      default:
      return item[property] || '';
      }
    };

    // Custom sort for Vietnamese
    this.dataSource.sortData = (data: any[], sort: MatSort) => {
      const active = sort.active;
      const direction = sort.direction;
      
      if (!active || direction === '') {
      return data;
      }

      return data.sort((a, b) => {
      let valueA = this.dataSource.sortingDataAccessor(a, active);
      let valueB = this.dataSource.sortingDataAccessor(b, active);

      // Use Vietnamese locale comparison for strings
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        const comparison = valueA.localeCompare(valueB, 'vi', { 
        sensitivity: 'base',
        numeric: true,
        ignorePunctuation: true
        });
        return direction === 'asc' ? comparison : -comparison;
      }

      // Numeric comparison
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return direction === 'asc' ? valueA - valueB : valueB - valueA;
      }

      // Default comparison
      const comparison = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      return direction === 'asc' ? comparison : -comparison;
      });
    };

    setTimeout(() => {
      this.dataSource.sort = this.sort;
    }, 300);

    // this.setupDataSource();
  }

  ngAfterViewInit() {
    // Setup paginator và sort sau khi view được khởi tạo
    this.setupDataSource();
  }

  onChangeVat() {
    this.DetailPhieugiaohang.update((v: any) => {
      v.isshowvat = !v.isshowvat;
      return v;
    });
    console.log('VAT changed:', this.DetailPhieugiaohang().isshowvat);
    
  }
  private setupDataSource(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
  SortByVi(ListItem:any[], field:string) {
      return ListItem.sort((a:any,b:any) => {
        const nameA = (a.sanpham?.[field] || a[field] || '').toLowerCase();
        const nameB = (b.sanpham?.[field] || b[field] || '').toLowerCase();
        return nameA.localeCompare(nameB, 'vi', { sensitivity: 'base' });
      });
  }
  GetDVT(item:any) {
    if(item?.sanpham?.length > 0) {
      return item?.sanpham[0]?.dvt || '';
    }
    return '';
  }
  // Thêm method để setup datasource

  async handlePhieugiaohangAction() {
    if (this.phieugiaohangId() === '0') {
      // await this.createPhieugiaohang();
    } else {
      await this.updatePhieugiaohang();
    }
  }

  private async updatePhieugiaohang() {
    try {
      console.log(this.DetailPhieugiaohang());
      
      this.DetailPhieugiaohang().sanpham = this.DetailPhieugiaohang().sanpham.map((v:any)=>{
        v.ttgiao = Number(v.slgiao)*Number(v.giaban)||0;
        return v
      })
      await this._PhieugiaohangService.updatePhieugiao(this.DetailPhieugiaohang());
      this._snackBar.open('Cập Nhật Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      this.isEdit.update((value) => !value);
    } catch (error) {
      console.error('Lỗi khi cập nhật phieugiaohang:', error);
    }
  }

  async DeleteData() {

  }
  goBack() {
    this._router.navigate(['/admin/phieugiaohang']);
    this._ListphieugiaohangComponent.drawer.close();
  }  trackByFn(index: number, item: any): any {
    return item.id;
  }
  
  // Method để auto-select text khi focus vào input - Using shared service
  onInputFocus(event: FocusEvent) {
    this.sharedInputService.onInputFocus(event);
  }

  // Method để validate keyboard input for decimal handling
  validateKeyInput(event: KeyboardEvent, type: 'number' | 'string') {
    return this.sharedInputService.handleKeyboardEvent(event, type);
  }

  // Method để xử lý input từ numpad và format số
  private handleNumericInput(event: KeyboardEvent, target: HTMLElement): void {
    // Handle numpad decimal point
    if (event.code === 'NumpadDecimal' || event.key === '.' || event.key === ',') {
      const currentText = target.innerText;
      // Prevent multiple decimal points
      if (currentText.includes('.') || currentText.includes(',')) {
        event.preventDefault();
        return;
      }
    }
    
    // Handle numpad numbers - let them through normally
    if (event.code && event.code.startsWith('Numpad') && /Numpad[0-9]/.test(event.code)) {
      // These will be handled normally by the browser
      return;
    }
  }

  // Method để format số hiển thị
  private formatNumberDisplay(value: number): string {
    if (isNaN(value) || value === 0) return '0';
    return value.toLocaleString('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }

  toggleEdit() {
    this.isEdit.update((value) => !value);
  }

  toggleDelete() {
    this.isDelete.update((value) => !value);
  }
  FillSlug() {
    this.DetailPhieugiaohang.update((v: any) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
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
  Chonkhachhang(item: any) {
    this.DetailPhieugiaohang.update((v: any) => {
      v.khachhangId = item.id;
      return v;
    });
  }

  
  updateValue(
    event: Event,
    index: number | null,
    element: any,
    field: keyof any,
    type: 'number' | 'string'
  ) {
    this.sharedInputService.updateValue(
      event,
      'phieugiaohang',
      index,
      element,
      field as string,
      type,
      this.DetailPhieugiaohang().sanpham,
      (updateFn: (v: any) => any) => {
        // Apply the update function from shared service
        this.DetailPhieugiaohang.update(updateFn);
        
        // Update dataSource after changes
        this.dataSource.data = [...this.DetailPhieugiaohang().sanpham];
      },
      this.dataSource.filteredData.length
    );
  }
  updateBlurValue(
    event: FocusEvent,
    index: number | null,
    element: any,
    field: keyof any,
    type: 'number' | 'string'
  ) {
    this.sharedInputService.updateBlurValue(
      event,
      'phieugiaohang',
      index,
      element,
      field as string,
      type,
      this.DetailPhieugiaohang().sanpham,
      (updateFn: (v: any) => any) => {
        // Apply the update function from shared service
        this.DetailPhieugiaohang.update(updateFn);
        
        // Update dataSource after changes
        this.dataSource.data = [...this.DetailPhieugiaohang().sanpham];
      }
    );
  }


  async GiaoDonhang() {
    try {
      this.DetailPhieugiaohang.update((v: any) => {
        v.status = 'dagiao';
        return v;
      });
      await this._PhieugiaohangService.DagiaoDonhang(this.DetailPhieugiaohang());
      this._snackBar.open('Giao đơn hàng thành công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });
    } catch (error) {
      console.error('Lỗi khi giao đơn hàng:', error);
      this._snackBar.open('Giao đơn hàng thất bại', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
    }
  }
  async Danhanhang() {
    try {
      this.DetailPhieugiaohang.update((v: any) => {
        v.status = 'danhan';
        return v;
      });
      await this._PhieugiaohangService.updateDonhang(this.DetailPhieugiaohang());
      this._snackBar.open('Đã Nhận đơn hàng thành công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });
      this.isEdit.update((value) => !value);
    } catch (error) {
      console.error('Lỗi khi nhận đơn hàng:', error);
      this._snackBar.open('Nhận đơn hàng thất bại', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
    }
  }
  async Dagiaohang() {
    try {
      this.DetailPhieugiaohang.update((v: any) => {
        v.status = 'dagiao';
        return v;
      });
      await this._PhieugiaohangService.updateDonhang(this.DetailPhieugiaohang());
      this._snackBar.open('Đã Nhận đơn hàng thành công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });
      this.isEdit.update((value) => !value);
    } catch (error) {
      console.error('Lỗi khi nhận đơn hàng:', error);
      this._snackBar.open('Nhận đơn hàng thất bại', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
    }
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  EmptyCart()
  {
    this.DetailPhieugiaohang.update((v:any)=>{
      v.sanpham = []
      return v;
    })
    
    // Update dataSource to reflect changes in the table
    this.dataSource.data = [...this.DetailPhieugiaohang().sanpham];
  }

  RemoveSanpham(item:any){
    console.log(item);
    
    this.DetailPhieugiaohang.update((v:any)=>{
      v.sanpham = v.sanpham.filter((v1:any) => v1.id !== item.id);
      this.reloadfilter();
      return v;
    })
    
    // Update dataSource to reflect changes in the table
    this.dataSource.data = [...this.DetailPhieugiaohang().sanpham];
  }
  reloadfilter(){
    this.filterSanpham = this.ListSanpham().filter((v:any) => !this.DetailPhieugiaohang().sanpham.some((v2:any) => v2.id === v.id));
  }


  CoppyDon()
  {

  }
  CheckVatDonhang(){
    console.log(this.DetailPhieugiaohang());
    if(this.DetailPhieugiaohang().isshowvat){

    const tong = this.DetailPhieugiaohang().sanpham?.reduce((sum:any, item:any) => sum + (Number(item.slgiao) * Number(item.giaban)||0), 0) || 0;
    const tongtien = tong*(1+Number(this.DetailPhieugiaohang().vat));
    const tongvat = tong*this.DetailPhieugiaohang().vat;
        console.log('VAT changed:', 1+this.DetailPhieugiaohang().vat);
        
        console.log('tong',tong);
        console.log('tongtien',tongtien);
        console.log('tongvat',tongvat);
        console.log('this.DetailPhieugiaohang().tongtien',this.DetailPhieugiaohang().tongtien);
        console.log('this.DetailPhieugiaohang().tongvat',this.DetailPhieugiaohang().tongvat);


    if(Number(tongtien) !== Number(this.DetailPhieugiaohang().tongtien)){
      return false;
    }
    if(Number(tongvat) !== Number(this.DetailPhieugiaohang().tongvat)){
      return false;
    } else {
      return true;
    }
    }
    else {
      return true;
    }
    
  }

  printContent()
  {
   const isCheck = this.CheckVatDonhang();
   if(!isCheck){
    this._snackBar.open('Vui lòng kiểm tra lại VAT trước khi in phiếu giao hàng', '', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });
    return;
   }
    const printContent = document.getElementById('printContent');
    if (printContent) {
      const newWindow = window.open('', '_blank');
    const tailwindCSS =  `
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: { extend: {} }
      };
    </script>
  `
      if (newWindow) {
        newWindow.document.write(`
          <html>
          <head>
            <title>${this.DetailPhieugiaohang()?.madonhang}</title>
             ${tailwindCSS}
            <style>
              body { font-size: 12px; 'Times New Roman', Times, serif !important; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #000; padding: 4px; text-align: left; }
              .font-times {font-family: 'Times New Roman', Times, serif !important;}
              @media print { 
              body { margin: 0; font-family: 'Times New Roman', Times, serif !important;} 
              img {height:80px}
             .font-times {font-family: 'Times New Roman', Times, serif !important;}
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
        if(this.DetailPhieugiaohang().status === 'dadat') {
         this.Dagiaohang();
        }
      } else {
        console.error('Không thể mở cửa sổ in');
      }
    } else {
      console.error('Không tìm thấy phần tử printContent');
    }



    // html2canvas(element, { scale: 2 }).then(canvas => {
    //   const imageData = canvas.toDataURL('image/png');

    //   // Mở cửa sổ mới và in ảnh
    //   const printWindow = window.open('', '_blank');
    //   if (!printWindow) return;

    //   printWindow.document.write(`
    //     <html>
    //       <head>
    //         <title>${this.DetailPhieugiaohang()?.title}</title>
    //       </head>
    //       <body style="text-align: center;">
    //         <img src="${imageData}" style="max-width: 100%;"/>
    //         <script>
    //           window.onload = function() {
    //             window.print();
    //             window.onafterprint = function() { window.close(); };
    //           };
    //         </script>
    //       </body>
    //     </html>
    //   `);

    //   printWindow.document.close();
    // });
  }
}
