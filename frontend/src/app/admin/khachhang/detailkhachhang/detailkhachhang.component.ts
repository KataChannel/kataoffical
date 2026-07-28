import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
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
import { GraphqlService } from '../../../shared/services/graphql.service';
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
  @ViewChild('createNhomkhachhangDialog') createNhomkhachhangDialogRef!: TemplateRef<any>;
  
  _ListkhachhangComponent: ListKhachhangComponent = inject(
    ListKhachhangComponent
  );
  _KhachhangService: KhachhangGraphqlService = inject(KhachhangGraphqlService);
  _BanggiaService: BanggiaService = inject(BanggiaService);
  _GraphqlService: GraphqlService = inject(GraphqlService);
  _route: ActivatedRoute = inject(ActivatedRoute);
  _router: Router = inject(Router);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  _dialog: MatDialog = inject(MatDialog);

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
  
  // Nhomkhachhang properties
  ListNhomkhachhang = signal<any[]>([]);
  filteredNhomkhachhang = signal<any[]>([]);
  selectedNhomkhachhangIds = signal<string[]>([]);
  isShowCreateNhomkhachhang = signal(false);
  isCreatingNhomkhachhang = signal(false);
  isNhomDropdownOpen = signal(false);
  nhomSearchQuery = signal('');
  newNhomkhachhang = { name: '', description: '' };
  private dialogRef: any = null;
  
  // Loại Khách Hàng properties
  isLoaikhDropdownOpen = signal(false);
  loaikhOptions = [
    { value: 'khachsi', title: 'Khách Sỉ', description: 'Khách hàng mua số lượng lớn' },
    { value: 'khachle', title: 'Khách Lẻ', description: 'Khách hàng mua lẻ' }
  ];
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
        this.selectedNhomkhachhangIds.set([]);
        this._ListkhachhangComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(['/admin/khachhang', 'new']);
      } else {
        console.log('KhachhangId:', id);
        if (id) {
          await this._KhachhangService.getKhachhangById(id);
          this.ListFilter = this._KhachhangService.DetailKhachhang().banggia;
          // Load nhomkhachhang IDs from detail
          const nhomIds = this.DetailKhachhang()?.nhomkhachhang?.map((n: any) => n.id) || [];
          this.selectedNhomkhachhangIds.set(nhomIds);
        }
        this._ListkhachhangComponent.drawer.open();
        this._router.navigate(['/admin/khachhang', id]);
      }
    });
  }
  async ngOnInit() {
    //  await this._KhachhangService.getKhachhangBy({id: this._KhachhangService.khachhangId(),isOne: true});
    await this._BanggiaService.getAllBanggia();
    await this.loadNhomkhachhang();
    this.filterItem = this._BanggiaService.ListBanggia();
    this.filteredBanggia.set(this._BanggiaService.ListBanggia());
    
    // Set selected banggia if exists
    if (this.DetailKhachhang()?.banggiaId) {
      const selected = this._BanggiaService.ListBanggia().find((item: any) => item.id === this.DetailKhachhang().banggiaId);
      this.selectedBanggia.set(selected);
    }
    
    console.log('DetailKhachhang:', this.DetailKhachhang());
  }
  
  // Load all Nhomkhachhang
  async loadNhomkhachhang() {
    try {
      const result = await this._GraphqlService.findMany('nhomkhachhang', {
        select: {
          id: true,
          name: true,
          description: true
        },
        orderBy: { name: 'asc' }
      });
      this.ListNhomkhachhang.set(result || []);
      this.filteredNhomkhachhang.set(result || []);
    } catch (error) {
      console.error('Error loading nhomkhachhang:', error);
    }
  }
  
  // =============== NHOM DROPDOWN METHODS (shadcn style) ===============
  
  // Toggle dropdown open/close
  toggleNhomkhachhangDropdown() {
    if (!this.isEdit()) return;
    this.isNhomDropdownOpen.update(v => !v);
    if (this.isNhomDropdownOpen()) {
      this.nhomSearchQuery.set('');
      this.filteredNhomkhachhang.set(this.ListNhomkhachhang());
    }
  }
  
  // Close dropdown
  closeNhomkhachhangDropdown() {
    this.isNhomDropdownOpen.set(false);
    this.nhomSearchQuery.set('');
  }
  
  // Handle search input
  @Debounce(150)
  onNhomSearchInput(event: any) {
    const query = event.target.value?.toLowerCase().trim() || '';
    this.nhomSearchQuery.set(query);
    
    if (!query) {
      this.filteredNhomkhachhang.set(this.ListNhomkhachhang());
      return;
    }
    
    const filtered = this.ListNhomkhachhang().filter(nhom => 
      nhom.name?.toLowerCase().includes(query) ||
      nhom.description?.toLowerCase().includes(query)
    );
    this.filteredNhomkhachhang.set(filtered);
  }
  
  // Clear search
  clearNhomSearch() {
    this.nhomSearchQuery.set('');
    this.filteredNhomkhachhang.set(this.ListNhomkhachhang());
  }
  
  // Check if nhom is selected
  isNhomSelected(nhomId: string): boolean {
    return this.selectedNhomkhachhangIds().includes(nhomId);
  }
  
  // Toggle nhom selection
  toggleNhomSelection(nhomId: string) {
    const currentIds = this.selectedNhomkhachhangIds();
    let newIds: string[];
    
    if (currentIds.includes(nhomId)) {
      newIds = currentIds.filter(id => id !== nhomId);
    } else {
      newIds = [...currentIds, nhomId];
    }
    
    this.selectedNhomkhachhangIds.set(newIds);
    this.DetailKhachhang.update((v: any) => ({
      ...v,
      nhomkhachhangIds: newIds
    }));
  }
  
  // Create nhom from search query
  createNhomFromSearch() {
    this.newNhomkhachhang = { 
      name: this.nhomSearchQuery(), 
      description: '' 
    };
    this.closeNhomkhachhangDropdown();
    this.openCreateNhomkhachhangDialog();
  }
  
  // Track by functions for ngFor
  trackByNhom(index: number, nhom: any): string {
    return nhom.id;
  }
  
  trackByNhomId(index: number, nhomId: string): string {
    return nhomId;
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
    console.log('banggia selected:', banggia);
    
    if (banggia) {
      this.selectedBanggia.set(banggia);
      this.DetailKhachhang.update((v: any) => ({
        ...v,
        banggiaId: banggia.id
      }));
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

  // =============== LOẠI KHÁCH HÀNG DROPDOWN METHODS ===============
  
  // Toggle dropdown
  toggleLoaikhDropdown() {
    if (!this.isEdit()) return;
    this.isLoaikhDropdownOpen.update(v => !v);
  }
  
  // Close dropdown
  closeLoaikhDropdown() {
    this.isLoaikhDropdownOpen.set(false);
  }
  
  // Select loaikh option
  selectLoaikh(value: string) {
    this.DetailKhachhang.update((v: any) => ({
      ...v,
      loaikh: value
    }));
    this.closeLoaikhDropdown();
  }
  
  // Get loaikh title
  getLoaikhTitle(): string {
    const loaikh = this.DetailKhachhang()?.loaikh;
    const option = this.loaikhOptions.find(o => o.value === loaikh);
    return option?.title || '';
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

  updateMachuyen(event: any) {
    this.DetailKhachhang.update((v: any) => ({
      ...v,
      machuyen: event.target.value
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

  // =============== NHOMKHACHHANG METHODS ===============
  
  // Remove a nhomkhachhang from selection
  removeNhomkhachhang(nhomId: string) {
    const currentIds = this.selectedNhomkhachhangIds();
    const newIds = currentIds.filter(id => id !== nhomId);
    this.selectedNhomkhachhangIds.set(newIds);
    
    this.DetailKhachhang.update((v: any) => ({
      ...v,
      nhomkhachhangIds: newIds
    }));
  }
  
  // Get nhomkhachhang name by ID
  getNhomkhachhangName(nhomId: string): string {
    const nhom = this.ListNhomkhachhang().find(n => n.id === nhomId);
    return nhom?.name || 'Unknown';
  }
  
  // Open create dialog using template
  openCreateNhomkhachhangDialog() {
    this.newNhomkhachhang = { name: '', description: '' };
    this.isShowCreateNhomkhachhang.set(true);
    
    // Detect mobile viewport
    const isMobile = window.innerWidth < 768;
    
    // Use dialog service for mobile-friendly overlay
    this.dialogRef = this._dialog.open(this.createNhomkhachhangDialogRef, {
      panelClass: ['nhomkh-create-dialog'],
      width: isMobile ? '100vw' : '450px',
      maxWidth: isMobile ? '100vw' : '450px',
      position: isMobile ? { bottom: '0' } : undefined,
      hasBackdrop: true,
      autoFocus: true,
      disableClose: false
    });
  }
  
  // Close create dialog
  closeCreateNhomkhachhangDialog() {
    this.isShowCreateNhomkhachhang.set(false);
    this.newNhomkhachhang = { name: '', description: '' };
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }
  
  // Create new nhomkhachhang
  async createNewNhomkhachhang() {
    if (!this.newNhomkhachhang.name?.trim()) {
      this._snackBar.open('Vui lòng nhập tên nhóm', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      return;
    }
    
    this.isCreatingNhomkhachhang.set(true);
    
    try {
      const newNhom = await this._GraphqlService.createOne('nhomkhachhang', {
        name: this.newNhomkhachhang.name.trim(),
        description: this.newNhomkhachhang.description?.trim() || ''
      });
      
      // Add to list
      this.ListNhomkhachhang.update(list => [...list, newNhom]);
      
      // Auto-select the new nhomkhachhang
      const currentIds = this.selectedNhomkhachhangIds();
      this.selectedNhomkhachhangIds.set([...currentIds, newNhom.id]);
      
      this.DetailKhachhang.update((v: any) => ({
        ...v,
        nhomkhachhangIds: [...currentIds, newNhom.id]
      }));
      
      this._snackBar.open('Tạo nhóm khách hàng thành công!', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      
      this.closeCreateNhomkhachhangDialog();
    } catch (error: any) {
      console.error('Error creating nhomkhachhang:', error);
      
      const errorMessage = error?.message?.includes('Unique constraint') 
        ? 'Tên nhóm đã tồn tại!' 
        : 'Lỗi khi tạo nhóm khách hàng';
        
      this._snackBar.open(errorMessage, '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isCreatingNhomkhachhang.set(false);
    }
  }
}
