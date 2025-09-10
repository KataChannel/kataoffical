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
  import { MatSlideToggleModule } from '@angular/material/slide-toggle';
  import {
    ConvertDriveData,
    GenId,
    convertToSlug,
  } from '../../../shared/utils/shared.utils';
  import { MatMenuModule } from '@angular/material/menu';
  import { NhacungcapService } from '../../nhacungcap/nhacungcap.service'; // Thay đổi từ KhachhangService
  import { MatDatepickerModule } from '@angular/material/datepicker';
  import { provideNativeDateAdapter } from '@angular/material/core';
  import { BanggiaService } from '../../banggia/banggia.service';
  import moment from 'moment';
  import { MatTableDataSource, MatTableModule } from '@angular/material/table';
  import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
  import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
  import { MatSort, MatSortModule } from '@angular/material/sort';
  import { SanphamService } from '../../sanpham/sanpham.service';
import { DathangService } from '../../dathang/dathang.service'; // Thay đổi từ DonhangService
import { ListcongnonccComponent } from '../listcongnoncc/listcongnoncc.component'; // Thay đổi từ ListcongnokhachhangComponent

  @Component({
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
    selector: 'app-detailcongnoncc',
    templateUrl: './detailcongnoncc.component.html',
    styleUrl: './detailcongnoncc.component.scss'
  })
  export class DetailCongnonccComponent {
    _ListcongnonccComponent: ListcongnonccComponent = inject(ListcongnonccComponent);
    _DathangService: DathangService = inject(DathangService); // Thay đổi từ DonhangService
    _NhacungcapService: NhacungcapService = inject(NhacungcapService); // Thay đổi từ KhachhangService
    _BanggiaService: BanggiaService = inject(BanggiaService);
    _SanphamService: SanphamService = inject(SanphamService);
    _route: ActivatedRoute = inject(ActivatedRoute);
    _router: Router = inject(Router);
    _snackBar: MatSnackBar = inject(MatSnackBar);
    
    constructor() {
      this._route.paramMap.subscribe(async (params) => {
        const id = params.get('id');
        this._DathangService.setDathangId(id); // Thay đổi từ setDonhangId
        await this._NhacungcapService.getAllNhacungcap(); // Thay đổi từ getAllKhachhang
        this.filterNhacungcap = this.ListNhacungcap().filter((v:any) => v.isActive);
        await this._BanggiaService.getAllBanggia();
        this.filterBanggia = this._BanggiaService.ListBanggia();
        await this._SanphamService.getAllSanpham();
        this.filterSanpham = this._SanphamService.ListSanpham();
        this.dataSource().data = this.DetailDathang().sanpham; // Thay đổi từ DetailDonhang
        this.dataSource().paginator = this.paginator;
        this.dataSource().sort = this.sort;
      });
  
      effect(async () => {
        const id = this._DathangService.dathangId(); // Thay đổi từ donhangId
        if (!id) {
          this._router.navigate(['/admin/congnoncc']);
          this._ListcongnonccComponent.drawer.close();
        }
        if (id === '0') {
          this.DetailDathang.set({ // Thay đổi từ DetailDonhang
            title: GenId(8, false),
            madathang: GenId(8, false), // Thay đổi từ madonhang
            ngaygiao: moment().add(1, 'days').format('YYYY-MM-DD'),
          });
          this._ListcongnonccComponent.drawer.open();
          this.isEdit.update((value) => !value);
          this._router.navigate(['/admin/congnoncc', '0']);
        } else {
          await this._DathangService.getDathangByid(id); // Thay đổi từ getDonhangByid
          this.DetailDathang.set(this._DathangService.DetailDathang()); // Thay đổi từ DetailDonhang
          this.dataSource().data = this.DetailDathang().sanpham;
          this.SelectedSanpham = [];
          this.isEdit.set(false);
          this._ListcongnonccComponent.drawer.open();
        }
      });
    }
    
    isEdit = signal<boolean>(false);
    DetailDathang: any = this._DathangService.DetailDathang; // Thay đổi từ DetailDonhang
    ListNhacungcap: any = this._NhacungcapService.ListNhacungcap; // Thay đổi từ ListKhachhang
    ListBanggia: any = this._BanggiaService.ListBanggia;
    ListSanpham: any = this._SanphamService.ListSanpham;
    filterNhacungcap: any[] = []; // Thay đổi từ filterKhachhang
    filterBanggia: any[] = [];
    filterSanpham: any[] = [];
    
    displayedColumns: string[] = ['title', 'masp', 'dvt', 'giaban', 'soluong', 'tongtien'];
    
    get displayColumnsWithActions() {
      return this.isEdit() 
        ? [...this.displayedColumns, 'actions']
        : this.displayedColumns;
    }
    ColumnName: any = {
      title: 'Tên Sản Phẩm',
      masp: 'Mã SP',
      dvt: 'ĐVT',
      giaban: 'Giá Bán',
      soluong: 'Số Lượng',
      tongtien: 'Tổng Tiền',
    };
    
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    dataSource = signal(new MatTableDataSource([]));
    SelectedSanpham: any[] = [];
    
    CountItem = computed(() => this.DetailDathang().sanpham?.length || 0);
    
    async saveDathang() { // Thay đổi từ saveDonhang
      try {
        const data = {
          ...this.DetailDathang(),
          sanpham: this.dataSource().data
        };
        
        if (this._DathangService.dathangId() === '0') {
          await this._DathangService.CreateDathang(data); // Thay đổi từ CreateDonhang
        } else {
          await this._DathangService.updateDathang(data); // Sửa tên method
        }
        
        this._snackBar.open('Lưu thành công', 'Đóng', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        
        this._router.navigate(['/admin/congnoncc']);
      } catch (error) {
        console.error('Error saving dathang:', error);
        this._snackBar.open('Lỗi khi lưu', 'Đóng', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    }
    
    cancel() {
      this._router.navigate(['/admin/congnoncc']);
    }
    
    toggleEdit() {
      this.isEdit.update(value => !value);
    }
    
    // Add more methods as needed based on the original component
    addSanpham() {
      // Logic to add product
    }
    
    removeSanpham(index: number) {
      const currentData = this.dataSource().data;
      currentData.splice(index, 1);
      this.dataSource().data = [...currentData];
    }
    
    calculateTotal() {
      return this.dataSource().data.reduce((total: number, item: any) => {
        return total + ((item.giaban || 0) * (item.soluong || 0));
      }, 0);
    }
    
    updateSanphamData() {
      // Update product data logic
      this.dataSource().data = [...this.dataSource().data];
    }
  }
