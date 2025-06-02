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
import { ListDathangComponent } from '../listdathang/listdathang.component';
import { DathangService } from '../dathang.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { convertToSlug } from '../../../../shared/utils/shared.utils';
import { NhacungcapService } from '../../nhacungcap/nhacungcap.service';
import { SanphamService } from '../../sanpham/sanpham.service';
import { MatMenuModule } from '@angular/material/menu';
import { SearchfilterComponent } from '../../../../shared/common/searchfilter/searchfilter.component';
import { KtableComponent } from '../../../../shared/common/ktable/ktable.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
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
    SearchfilterComponent,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './detaildathang.component.html',
  styleUrl: './detaildathang.component.scss',
})
export class DetailDathangComponent {
  _ListDathangComponent: ListDathangComponent = inject(ListDathangComponent);
  _DathangService: DathangService = inject(DathangService);
  _NhacungcapService: NhacungcapService = inject(NhacungcapService);
  _SanphamService: SanphamService = inject(SanphamService);
  _route: ActivatedRoute = inject(ActivatedRoute);
  _router: Router = inject(Router);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  DetailDathang: any = this._DathangService.DetailDathang;
  isEdit = signal(false);
  isDelete = signal(false);
  dathangId: any = this._DathangService.dathangId;
  ListNhacungcap = this._NhacungcapService.ListNhacungcap;
  ListSanpham = this._SanphamService.ListSanpham;
  FilterNhacungcap: any = [];
  constructor() {
    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this._DathangService.setDathangId(id);
    });
    effect(async () => {
      const id = this._DathangService.dathangId();
      await this._NhacungcapService.getAllNhacungcap();
      await this._SanphamService.getAllSanpham();
      if (!id) {
        this._router.navigate(['/dathang']);
        this._ListDathangComponent.drawer.close();
      }
      if (id === 'new') {
        this.DetailDathang.set({});
        this._ListDathangComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(['/dathang', 'new']);
      } else {
        await this._DathangService.getDathangBy({ id: id, isOne: true });
        this._ListDathangComponent.drawer.open();
        this._router.navigate(['/dathang', id]);
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

    this.DetailDathang.update((v: any) => {
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
    // this.DetailDathang.update((v:any)=>{
    //   v.sanpham = v.sanpham.filter((v1:any) => v1.id !== item.id);
    //   this.reloadfilter();
    //   return v;
    // })
    // this.dataSource().data = this.DetailDathang().sanpham;

  }
  
  async ngOnInit() {
    await this._NhacungcapService.getAllNhacungcap();
    await this._SanphamService.getAllSanpham();
    this.FilterNhacungcap = this.ListNhacungcap();
    this.displayedColumns = Object.keys(this.ColumnName);
  }

  onOutFilter(event: any) {
    console.log('OutFilter event:', event);
    this.DetailDathang.update((v: any) => {
      const updatedDathang = { ...v };
      console.log(event);
      
      updatedDathang.dathangsanpham = event.map((item: any) => {
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
      updatedDathang.total = event.reduce((sum: number, item: any) => {
        sum = sum || 0;
        if (!item.giagoc || !item.sldat) {
          return sum;
        }
        return sum + item.giagoc * item.sldat;
      }, 0);
      console.log('Updated Dathang:', updatedDathang);
      
      return updatedDathang;
    });
  }

  DoFindNhacungcap(event: any) {
    const query = event.target.value.toLowerCase();
    if (!query || query.trim() === '') {
      this.FilterNhacungcap = this.ListNhacungcap();
      return;
    }
    this.FilterNhacungcap = this.ListNhacungcap().filter((v) =>
      v.title.toLowerCase().includes(query)
    );
  }

  async handleDathangAction() {
    if (this.dathangId() === 'new') {
      await this.createDathang();
    } else {
      await this.updateDathang();
    }
  }
  private async createDathang() {
    try {
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

  private async updateDathang() {
    try {
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

      this._router.navigate(['dathang']);
    } catch (error) {
      console.error('Lỗi khi xóa dathang:', error);
    }
  }
  goBack() {
    this._router.navigate(['dathang']);
    this._ListDathangComponent.drawer.close();
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
    this.DetailDathang.update((v: any) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
}
