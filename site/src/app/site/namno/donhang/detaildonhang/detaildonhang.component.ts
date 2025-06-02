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
import { ListDonhangComponent } from '../listdonhang/listdonhang.component';
import { DonhangService } from '../donhang.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { convertToSlug } from '../../../../shared/utils/shared.utils';
import { KhachhangService } from '../../khachhang/khachhang.service';
import { SanphamService } from '../../sanpham/sanpham.service';
import { MatMenuModule } from '@angular/material/menu';
import { SearchfilterComponent } from '../../../../shared/common/searchfilter/searchfilter.component';
import { KtableComponent } from '../../../../shared/common/ktable/ktable.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
@Component({
  selector: 'app-detaildonhang',
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
    SearchfilterComponent,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './detaildonhang.component.html',
  styleUrl: './detaildonhang.component.scss',
})
export class DetailDonhangComponent {
  _ListDonhangComponent: ListDonhangComponent = inject(ListDonhangComponent);
  _DonhangService: DonhangService = inject(DonhangService);
  _KhachhangService: KhachhangService = inject(KhachhangService);
  _SanphamService: SanphamService = inject(SanphamService);
  _route: ActivatedRoute = inject(ActivatedRoute);
  _router: Router = inject(Router);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  DetailDonhang: any = this._DonhangService.DetailDonhang;
  isEdit = signal(false);
  isDelete = signal(false);
  donhangId: any = this._DonhangService.donhangId;
  ListKhachhang = this._KhachhangService.ListKhachhang;
  ListSanpham = this._SanphamService.ListSanpham;
  FilterKhachhang: any = [];
  constructor() {
    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this._DonhangService.setDonhangId(id);
    });
    effect(async () => {
      const id = this._DonhangService.donhangId();
      await this._KhachhangService.getAllKhachhang();
      await this._SanphamService.getAllSanpham();
      if (!id) {
        this._router.navigate(['/donhang']);
        this._ListDonhangComponent.drawer.close();
      }
      if (id === 'new') {
        this.DetailDonhang.set({});
        this._ListDonhangComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(['/donhang', 'new']);
      } else {
        await this._DonhangService.getDonhangBy({ id: id, isOne: true });
        this._ListDonhangComponent.drawer.open();
        this._router.navigate(['/donhang', id]);
      }
    });
  }
  displayedColumns: string[] = [];
  ColumnName: any = {
    stt: '#',
    sanpham: 'Sản phẩm',
    sldat: 'Số lượng đặt',
    slgiao: 'Số lượng giao',
    slnhan: 'Số lượng nhận',
    slhuy: 'Số lượng hủy',
    giaban: 'Giá bán',
  };
  updateBlurValue(
    event: Event,
    index: number | null,
    element: any,
    field: keyof any,
    type: 'number' | 'string'
  ) {
    const target = event.target as HTMLElement;
    const newValue =
      type === 'number' ? Number(target.innerText.trim()) || 0 : target.innerText.trim();

    this.DetailDonhang.update((v: any) => {
      if (index !== null) {
        if (field === 'sldat') {
          v.sanpham[index]['sldat'] = newValue;
          v.sanpham[index]['slgiao'] = newValue;
          // v.sanpham[index]['slnhan'] = newValue;
        } else if (field === 'slgiao') {
          if (newValue < v.sanpham[index]['sldat']) {
            v.sanpham[index]['slgiao'] = v.sanpham[index]['sldat'];
            this._snackBar.open('Số lượng giao phải lớn hơn số lượng đặt', '', {
              duration: 1000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-error'],
            });
          } else {
            v.sanpham[index]['slgiao'] = newValue;
            // v.sanpham[index]['slnhan'] = newValue;
          }
        } else {
          v.sanpham[index][field] = newValue;
        }
      } else {
        v[field] = newValue;
      }
      return v;
    });
  }

  RemoveSanpham(item:any){
    // this.DetailDonhang.update((v:any)=>{
    //   v.sanpham = v.sanpham.filter((v1:any) => v1.id !== item.id);
    //   this.reloadfilter();
    //   return v;
    // })
    // this.dataSource().data = this.DetailDonhang().sanpham;

  }
  
  async ngOnInit() {
    await this._KhachhangService.getAllKhachhang();
    await this._SanphamService.getAllSanpham();
    this.FilterKhachhang = this.ListKhachhang();
    this.displayedColumns = Object.keys(this.ColumnName);
  }

  onOutFilter(event: any) {
    console.log('OutFilter event:', event);
    this.DetailDonhang.update((v: any) => {
      const updatedDonhang = { ...v };
      console.log(event);
      
      updatedDonhang.donhangsanpham = event.map((item: any) => {
        return {
          sanphamId: item.id,
          sanpham: item,
          sldat: 1,
          slgiao: 0,
          slnhan: 0,
          slhuy: 0,
          giaban: item.giagoc,
        };
      });
      updatedDonhang.total = event.reduce((sum: number, item: any) => {
        sum = sum || 0;
        if (!item.giagoc || !item.sldat) {
          return sum;
        }
        return sum + item.giagoc * item.sldat;
      }, 0);
      console.log('Updated Donhang:', updatedDonhang);
      
      return updatedDonhang;
    });
  }

  DoFindKhachhang(event: any) {
    const query = event.target.value.toLowerCase();
    if (!query || query.trim() === '') {
      this.FilterKhachhang = this.ListKhachhang();
      return;
    }
    this.FilterKhachhang = this.ListKhachhang().filter((v) =>
      v.title.toLowerCase().includes(query)
    );
  }

  async handleDonhangAction() {
    if (this.donhangId() === 'new') {
      await this.createDonhang();
    } else {
      await this.updateDonhang();
    }
  }
  private async createDonhang() {
    try {
      await this._DonhangService.CreateDonhang(this.DetailDonhang());
      this._snackBar.open('Tạo Mới Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      this.isEdit.update((value) => !value);
    } catch (error) {
      console.error('Lỗi khi tạo donhang:', error);
    }
  }

  private async updateDonhang() {
    try {
      await this._DonhangService.updateDonhang(this.DetailDonhang());
      this._snackBar.open('Cập Nhật Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      this.isEdit.update((value) => !value);
    } catch (error) {
      console.error('Lỗi khi cập nhật donhang:', error);
    }
  }
  async DeleteData() {
    try {
      await this._DonhangService.DeleteDonhang(this.DetailDonhang());

      this._snackBar.open('Xóa Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });

      this._router.navigate(['donhang']);
    } catch (error) {
      console.error('Lỗi khi xóa donhang:', error);
    }
  }
  goBack() {
    this._router.navigate(['donhang']);
    this._ListDonhangComponent.drawer.close();
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
    this.DetailDonhang.update((v: any) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
}
