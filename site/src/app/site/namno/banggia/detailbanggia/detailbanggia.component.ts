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
import { ListBanggiaComponent } from '../listbanggia/listbanggia.component';
import { BanggiaService } from '../banggia.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../../shared/utils/shared.utils';
import { SearchfilterComponent } from '../../../../shared/common/searchfilter/searchfilter.component';
import { KhachhangService } from '../../khachhang/khachhang.service';
import { SanphamService } from '../../sanpham/sanpham.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
@Component({
  selector: 'app-detailbanggia',
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
    SearchfilterComponent,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './detailbanggia.component.html',
  styleUrl: './detailbanggia.component.scss',
})
export class DetailBanggiaComponent {
  _ListBanggiaComponent: ListBanggiaComponent = inject(ListBanggiaComponent);
  _BanggiaService: BanggiaService = inject(BanggiaService);
  _KhachhangService: KhachhangService = inject(KhachhangService);
  _SanphamService: SanphamService = inject(SanphamService);
  _route: ActivatedRoute = inject(ActivatedRoute);
  _router: Router = inject(Router);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  constructor() {
    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this._BanggiaService.setBanggiaId(id);
    });

    effect(async () => {
      const id = this._BanggiaService.banggiaId();
      await this._KhachhangService.getAllKhachhang();
      await this._SanphamService.getAllSanpham();
      if (!id) {
        this._router.navigate(['banggia']);
        this._ListBanggiaComponent.drawer.close();
      }
      if (id === 'new') {
        this.DetailBanggia.set({});
        this._ListBanggiaComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(['banggia', 'new']);
      } else {
        await this._BanggiaService.getBanggiaBy({ id: id, isOne: true });
        this._ListBanggiaComponent.drawer.open();
        this._router.navigate(['banggia', id]);
      }
    });
  }
  DetailBanggia: any = this._BanggiaService.DetailBanggia;
  isEdit = signal(false);
  isDelete = signal(false);
  banggiaId: any = this._BanggiaService.banggiaId;
  ListKhachhang = this._KhachhangService.ListKhachhang;
  ListSanpham = this._SanphamService.ListSanpham;


 displayedColumns: string[] = [];
  ColumnName: any = {
    stt: '#',
    sanpham: 'Sản phẩm',
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

    // this.DetailBanggia.update((v: any) => {
    //   if (index !== null) {
    //     if (field === 'sldat') {
    //       v.sanpham[index]['sldat'] = newValue;
    //       v.sanpham[index]['slgiao'] = newValue;
    //       // v.sanpham[index]['slnhan'] = newValue;
    //     } else if (field === 'slgiao') {
    //       if (newValue < v.sanpham[index]['sldat']) {
    //         v.sanpham[index]['slgiao'] = v.sanpham[index]['sldat'];
    //         this._snackBar.open('Số lượng giao phải lớn hơn số lượng đặt', '', {
    //           duration: 1000,
    //           horizontalPosition: 'end',
    //           verticalPosition: 'top',
    //           panelClass: ['snackbar-error'],
    //         });
    //       } else {
    //         v.sanpham[index]['slgiao'] = newValue;
    //         // v.sanpham[index]['slnhan'] = newValue;
    //       }
    //     } else {
    //       v.sanpham[index][field] = newValue;
    //     }
    //   } else {
    //     v[field] = newValue;
    //   }
    //   return v;
    // });
  }

RemoveSanpham(item: any) {
    


}
  async ngOnInit() {
    await this._KhachhangService.getAllKhachhang();
    await this._SanphamService.getAllSanpham();
    this.displayedColumns = Object.keys(this.ColumnName);
  }
  async handleBanggiaAction() {
    if (this.banggiaId() === 'new') {
      await this.createBanggia();
    } else {
      await this.updateBanggia();
    }
  }
  private async createBanggia() {
    try {
      await this._BanggiaService.CreateBanggia(this.DetailBanggia());
      this._snackBar.open('Tạo Mới Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      this.isEdit.update((value) => !value);
    } catch (error) {
      console.error('Lỗi khi tạo banggia:', error);
    }
  }

  private async updateBanggia() {
    try {
      await this._BanggiaService.updateBanggia(this.DetailBanggia());
      this._snackBar.open('Cập Nhật Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      this.isEdit.update((value) => !value);
    } catch (error) {
      console.error('Lỗi khi cập nhật banggia:', error);
    }
  }
  async DeleteData() {
    try {
      await this._BanggiaService.DeleteBanggia(this.DetailBanggia());

      this._snackBar.open('Xóa Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });

      this._router.navigate(['banggia']);
    } catch (error) {
      console.error('Lỗi khi xóa banggia:', error);
    }
  }
  goBack() {
    this._router.navigate(['banggia']);
    this._ListBanggiaComponent.drawer.close();
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
    this.DetailBanggia.update((v: any) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
  onOutFilterSanpham(event: any) {
    console.log('OutFilter event:', event);
    this.DetailBanggia.update((v: any) => {
      const updatedBanggia = { ...v };
      console.log(event);
      updatedBanggia.sanphamIds = event.map((item: any) => item.id);
      updatedBanggia.sanpham = event.map((item: any) => {
        return {
          sanphamId: item.id,
          title: item.title,
          giaban: item.giaban,
        };
      });
      console.log('Updated Banggia:', updatedBanggia);

      return updatedBanggia;
    });
  }
  onOutFilterKhachhang(event: any) {
    console.log('OutFilter event:', event);
    this.DetailBanggia.update((v: any) => {
      const updatedBanggia = { ...v };
      console.log(event);
      updatedBanggia.khachhangIds = event.map((item: any) => item.id);
      updatedBanggia.khachhang = event.map((item: any) => {
        return {
          khachhangId: item.id,
          title: item.title,
          email: item.email,
        };
      });   
      console.log('Updated Banggia:', updatedBanggia);

      return updatedBanggia;
    });
  }
}
