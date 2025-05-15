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
})
export class DetailPhieugiaohangComponent {
  _ListphieugiaohangComponent: ListPhieugiaohangComponent = inject(ListPhieugiaohangComponent);
  _PhieugiaohangService: DonhangService = inject(DonhangService);
  _route: ActivatedRoute = inject(ActivatedRoute);
  _router: Router = inject(Router);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  constructor() {
    this._route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      this._PhieugiaohangService.setDonhangId(id);
    });

    effect(async () => {
      const id = this._PhieugiaohangService.donhangId();
      if (!id || id === '0') {
        this._router.navigate(['/admin/phieugiaohang']);
        this._ListphieugiaohangComponent.drawer.close();
      }
      else {
        await this._PhieugiaohangService.Phieugiaohang({id:id});
        this.DetailPhieugiaohang().status ==="danhan"? this.isEdit.set(false):this.isEdit.set(true);
        this.DetailPhieugiaohang().sanpham = this.DetailPhieugiaohang()?.sanpham.map((v:any)=>{
          v.ttgiao = Number(v.slgiao)*Number(v.giaban)||0;
          return v;
        })
        this.dataSource().data = this.DetailPhieugiaohang().sanpham;
        this.dataSource().paginator = this.paginator;
        this.dataSource().sort = this.sort;
        this._ListphieugiaohangComponent.drawer.open();
        this._router.navigate(['/admin/phieugiaohang', id]);
      }
    });
  }
  DetailPhieugiaohang: any = this._PhieugiaohangService.DetailDonhang;
  // ListKhachhang: any = this._KhachhangService.ListKhachhang;
  isEdit = signal(true);
  isDelete = signal(false);
  filterKhachhang: any = [];
  filterBanggia: any[] = [];
  filterSanpham: any[] = [];
  phieugiaohangId: any = this._PhieugiaohangService.donhangId;
  Trangthai: any = [
    { value: 'dadat', title: 'Đã Đặt' },
    { value: 'dagiao', title: 'Đã Giao' },
    { value: 'danhan', title: 'Đã Nhận' },
    { value: 'huy', title: 'Hủy' },
  ];
  getTitle(item: any) {
    return this.Trangthai.find((v:any) => v.value === item)?.title;

  }
  async ngOnInit() {}
  async handlePhieugiaohangAction() {
    if (this.phieugiaohangId() === '0') {
      await this.createPhieugiaohang();
    } else {
      await this.updatePhieugiaohang();
    }
  }
  private async createPhieugiaohang() {

  }

  private async updatePhieugiaohang() {
    try {
      this.DetailPhieugiaohang().sanpham = this.DetailPhieugiaohang().sanpham.map((v:any)=>{
        v.ttgiao = Number(v.slgiao)*Number(v.giaban)||0;
        return {id:v.id,ttgiao:v.ttgiao,slgiao:v.slgiao,slnhan:v.slnhan,ghichu:v.ghichu};
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
    const newValue =
      type === 'number'
        ? Number((event.target as HTMLElement).innerText.trim()) || 0
        : (event.target as HTMLElement).innerText.trim();
        const keyboardEvent = event as KeyboardEvent;
        if (keyboardEvent.key === "Enter" && !keyboardEvent.shiftKey) {
          event.preventDefault();
        }
        if (type === "number") {
          const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
          
          // Chặn nếu không phải số và không thuộc danh sách phím cho phép
          if (!/^\d$/.test(keyboardEvent.key) && !allowedKeys.includes(keyboardEvent.key)) {
            event.preventDefault();
          }
        } 

        this.DetailPhieugiaohang.update((v: any) => {
      if (index !== null) {
        if (field === 'sldat') {
          v.sanpham[index]['sldat'] = v.sanpham[index]['slgiao'] = v.sanpham[index]['slnhan'] = newValue;
        }   
        else if (field === 'ghichu') {
          console.log(index,field,newValue);
          
          v.sanpham[index]['ghichu'] = newValue;
          const inputs = document.querySelectorAll('.ghichu-input')as NodeListOf<HTMLInputElement>;
              if (index < this.dataSource().filteredData.length - 1) {
                const nextInput = inputs[index + 1]as HTMLInputElement
                if (nextInput) {
                  if (nextInput instanceof HTMLInputElement) {
                    nextInput.focus();
                    nextInput.select();
                  }
                  // Then select text using a different method that works on more element types
                  setTimeout(() => {
                    if (document.createRange && window.getSelection) {
                      const range = document.createRange();
                      range.selectNodeContents(nextInput);
                      const selection = window.getSelection();
                      selection?.removeAllRanges();
                      selection?.addRange(range);
                    }
                  }, 10);
                }
           }
        } 
        
        else if (field === 'slgiao') {
          const newGiao = newValue
          // if (newGiao < v.sanpham[index]['sldat']) {
          //   // CẬP NHẬT GIÁ TRỊ TRƯỚC KHI HIỂN THỊ SNACKBAR
          //   v.sanpham[index]['slgiao'] = v.sanpham[index]['sldat'];
          //   this._snackBar.open('Số lượng giao phải lớn hơn số lượng đặt', '', {
          //     duration: 1000,
          //     horizontalPosition: "end",
          //     verticalPosition: "top",
          //     panelClass: ['snackbar-error'],
          //   });
          // } else {
            v.sanpham[index]['slgiao'] = v.sanpham[index]['slnhan'] = newGiao;
            v.sanpham[index]['ttgiao']=v.sanpham[index]['slgiao']*v.sanpham[index]['giaban']
            const inputs = document.querySelectorAll('.slgiao-input')as NodeListOf<HTMLInputElement>;
            if (index < this.dataSource().filteredData.length - 1) {
              const nextInput = inputs[index + 1]as HTMLInputElement
              if (nextInput) {
                if (nextInput instanceof HTMLInputElement) {
                  nextInput.focus();
                  nextInput.select();
                }
                // Then select text using a different method that works on more element types
                setTimeout(() => {
                  if (document.createRange && window.getSelection) {
                    const range = document.createRange();
                    range.selectNodeContents(nextInput);
                    const selection = window.getSelection();
                    selection?.removeAllRanges();
                    selection?.addRange(range);
                  }
                }, 10);
              }
            }
          // }
        } else {
          v.sanpham[index][field] = newValue;
        }
      } else {
        v[field] = newValue;
      }      
      return v;
    });    
  }

  updateBlurValue(
    event: FocusEvent,
    index: number | null,
    element: any,
    field: keyof any,
    type: 'number' | 'string'
  ) {
    const target = event.target as HTMLElement;
    const newValue =
      type === 'number'
        ? Number(target.innerText.trim()) || 0
        : target.innerText.trim();

    // Cập nhật giá trị sau khi input mất focus (blur)
    this.DetailPhieugiaohang.update((v: any) => {
      if (index !== null) {
        if (field === 'sldat') {
          v.sanpham[index]['sldat'] = v.sanpham[index]['slgiao'] = v.sanpham[index]['slnhan'] = newValue;
        } else if (field === 'ghichu') {
          v.sanpham[index]['ghichu'] = newValue;
        } else if (field === 'slgiao') {
          v.sanpham[index]['slgiao'] = v.sanpham[index]['slnhan'] = newValue;
          v.sanpham[index]['ttgiao'] = v.sanpham[index]['slgiao'] * v.sanpham[index]['giaban'];
        } else {
          v.sanpham[index][field] = newValue;
        }
      } else {
        v[field] = newValue;
      }
      return v;
    });
  }


  async GiaoDonhang() {
    try {
      this.DetailPhieugiaohang.update((v: any) => {
        v.status = 'dagiao';
        return v;
      });
      await this._PhieugiaohangService.updateDonhang(this.DetailPhieugiaohang());
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

  dataSource = signal(new MatTableDataSource<any>([]));
  CountItem = computed(() => this.dataSource().data.length);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource().filter = filterValue.trim().toLowerCase();
  }
  EmptyCart()
  {
    this.DetailPhieugiaohang.update((v:any)=>{
      v.sanpham = []
      return v;
    })
    this.dataSource().data = this.DetailPhieugiaohang().sanpham;
    this.dataSource().paginator = this.paginator;
    this.dataSource().sort = this.sort;
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
  CoppyDon()
  {

  }

  printContent()
  {
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
