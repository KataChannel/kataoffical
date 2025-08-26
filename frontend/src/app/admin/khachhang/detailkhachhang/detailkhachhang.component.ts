import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
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
import { ListKhachhangComponent } from '../listkhachhang/listkhachhang.component';
import { KhachhangGraphqlService } from '../khachhang-graphql.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
import { BanggiaService } from '../../banggia/banggia.service';
import { SearchfilterComponent } from '../../../shared/common/searchfilter123/searchfilter.component';
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
import { Debounce } from '../../../shared/utils/decorators';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@Component({
  selector: 'app-detailkhachhang',
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
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    // SearchfilterComponent
  ],
  templateUrl: './detailkhachhang.component.html',
  styleUrls: ['./detailkhachhang.component.scss'],
})
export class DetailKhachhangComponent {
  _ListkhachhangComponent: ListKhachhangComponent = inject(
    ListKhachhangComponent
  );
  _KhachhangService: KhachhangGraphqlService = inject(KhachhangGraphqlService);
  _BanggiaService: BanggiaService = inject(BanggiaService);
  _route: ActivatedRoute = inject(ActivatedRoute);
  _router: Router = inject(Router);
  _snackBar: MatSnackBar = inject(MatSnackBar);

  // GraphQL reactive signals
  DetailKhachhang: any = this._KhachhangService.DetailKhachhang;
  loading = this._KhachhangService.loading;
  error = this._KhachhangService.error;

  ListFilter: any = [];
  filterItem: any = [];
  isEdit = signal(false);
  isDelete = signal(false);
  khachhangId: any = this._KhachhangService.khachhangId;
  
  // Autocomplete properties
  filteredBanggia = signal<any[]>([]);
  selectedBanggia = signal<any>(null);
  constructor() {
    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this._KhachhangService.setKhachhangId(id);
    });
    effect(async () => {
      const id = this._KhachhangService.khachhangId();
      if (!id) {
        this._router.navigate(['/admin/khachhang']);
        this._ListkhachhangComponent.drawer.close();
      }
      if (id === 'new') {
        this.DetailKhachhang.set({ loaikh: 'khachsi' });
        this._ListkhachhangComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(['/admin/khachhang', 'new']);
      } else {
        console.log('KhachhangId:', id);
        if (id) {
          await this._KhachhangService.getKhachhangById(id);
          this.ListFilter = this._KhachhangService.DetailKhachhang().banggia;
        }
        this._ListkhachhangComponent.drawer.open();
        this._router.navigate(['/admin/khachhang', id]);
      }
    });
  }
  async ngOnInit() {
    //  await this._KhachhangService.getKhachhangBy({id: this._KhachhangService.khachhangId(),isOne: true});
    await this._BanggiaService.getAllBanggia();
    this.filterItem = this._BanggiaService.ListBanggia();
    this.filteredBanggia.set(this._BanggiaService.ListBanggia());
    
    // Set selected banggia if exists
    if (this.DetailKhachhang()?.banggiaId) {
      const selected = this._BanggiaService.ListBanggia().find((item: any) => item.id === this.DetailKhachhang().banggiaId);
      this.selectedBanggia.set(selected);
    }
    
    console.log('DetailKhachhang:', this.DetailKhachhang());
  }
  async handleKhachhangAction() {
    if (this.khachhangId() === 'new') {
      await this.createKhachhang();
    } else {
      await this.updateKhachhang();
    }
    // window.location.reload();
  }
  @Debounce(300)
  autoSubtitle() {
    this.DetailKhachhang.update((v: any) => ({
      ...v,
      subtitle: removeVietnameseAccents(v.name || '')
    }));
  }
  private async createKhachhang() {
    try {
      await this._KhachhangService.createKhachhang(this.DetailKhachhang());
      this._snackBar.open('Tạo Mới Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      this.isEdit.update((value) => !value);
    } catch (error) {
      console.error('Lỗi khi tạo khachhang:', error);
    }
  }

  private async updateKhachhang() {
    try {
      const khachhangData = this.DetailKhachhang();
      const khachhangId = this.khachhangId();
      if (khachhangId && khachhangId !== 'new') {
        await this._KhachhangService.updateKhachhang(
          khachhangId,
          khachhangData
        );
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update((value) => !value);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật khachhang:', error);
    }
  }
  async DeleteData() {
    try {
      const khachhangData = this.DetailKhachhang();
      if (khachhangData?.id) {
        await this._KhachhangService.deleteKhachhang(khachhangData.id);

        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });

        this._router.navigate(['/admin/khachhang']);
      }
    } catch (error) {
      console.error('Lỗi khi xóa khachhang:', error);
    }
  }
  goBack() {
    this._router.navigate(['/admin/khachhang']);
    this._ListkhachhangComponent.drawer.close();
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
    this.DetailKhachhang.update((v: any) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
  DoOutFilter(event: any) {
    this.DetailKhachhang.update((v: any) => {
      v.banggia = event;
      return v;
    });
  }

  // Autocomplete methods for Banggia
  onBanggiaInput(event: any) {
    const value = event.target.value.toLowerCase();
    const filtered = this._BanggiaService.ListBanggia().filter((item: any) => 
      item.title.toLowerCase().includes(value) || 
      item.mabanggia?.toLowerCase().includes(value)
    );
    this.filteredBanggia.set(filtered);
  }

  onBanggiaSelected(banggia: any) {
    if (banggia) {
      this.selectedBanggia.set(banggia);
      this.DetailKhachhang.update((v: any) => {
        v.banggiaId = banggia.id;
        return v;
      });
    }
  }

  getSelectedBanggiaTitle(): string {
    const selected = this.selectedBanggia();
    if (selected) {
      return `${selected.title} - ${selected.mabanggia}`;
    }
    
    // Fallback: find by ID from DetailKhachhang
    if (this.DetailKhachhang()?.banggiaId) {
      const banggia = this._BanggiaService.ListBanggia().find((item: any) => 
        item.id === this.DetailKhachhang().banggiaId
      );
      if (banggia) {
        this.selectedBanggia.set(banggia);
        return `${banggia.title} - ${banggia.mabanggia}`;
      }
    }
    
    return '';
  }

  displayBanggia(banggia: any): string {
    return banggia ? `${banggia.title} - ${banggia.mabanggia}` : '';
  }

  // Methods để xử lý slide toggle changes
  updateHiengia(event: any) {
    this.DetailKhachhang.update((v: any) => ({
      ...v,
      hiengia: event.checked
    }));
  }

  updateIstitle2(event: any) {
    this.DetailKhachhang.update((v: any) => ({
      ...v,
      istitle2: event.checked
    }));
  }

  updateIsshowvat(event: any) {
    this.DetailKhachhang.update((v: any) => ({
      ...v,
      isshowvat: event.checked
    }));
  }

  updateIsActive(event: any) {
    this.DetailKhachhang.update((v: any) => ({
      ...v,
      isActive: event.checked
    }));
  }

  // Methods để xử lý input changes
  updateName(event: any) {
    this.DetailKhachhang.update((v: any) => ({
      ...v,
      name: event.target.value
    }));
  }
  updateMakh(event: any) {
    this.DetailKhachhang.update((v: any) => ({
      ...v,
      makh: event.target.value
    }));
  }

  updateSubtitle(event: any) {
    this.DetailKhachhang.update((v: any) => ({
      ...v,
      subtitle: event.target.value
    }));
  }

  updateTenfile(event: any) {
    this.DetailKhachhang.update((v: any) => ({
      ...v,
      tenfile: event.target.value
    }));
  }

  updateLoaikh(event: any) {
    this.DetailKhachhang.update((v: any) => ({
      ...v,
      loaikh: event.value
    }));
  }

  updateEmail(event: any) {
    this.DetailKhachhang.update((v: any) => ({
      ...v,
      email: event.target.value
    }));
  }

  updateSdt(event: any) {
    this.DetailKhachhang.update((v: any) => ({
      ...v,
      sdt: event.target.value
    }));
  }

  updateMst(event: any) {
    this.DetailKhachhang.update((v: any) => ({
      ...v,
      mst: event.target.value
    }));
  }

  updateGionhanhang(event: any) {
    this.DetailKhachhang.update((v: any) => ({
      ...v,
      gionhanhang: event.target.value
    }));
  }

  updateDiachi(event: any) {
    this.DetailKhachhang.update((v: any) => ({
      ...v,
      diachi: event.target.value
    }));
  }

  updateQuan(event: any) {
    this.DetailKhachhang.update((v: any) => ({
      ...v,
      quan: event.target.value
    }));
  }

  updateGhichu(event: any) {
    this.DetailKhachhang.update((v: any) => ({
      ...v,
      ghichu: event.target.value
    }));
  }
}
