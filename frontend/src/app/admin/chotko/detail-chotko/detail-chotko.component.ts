import { Component, inject, signal, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChotKhoService, ChotKho } from '../chotko.service';
import { UserService } from '../../user/user.service';
import moment from 'moment';

@Component({
  selector: 'app-detail-chotko',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './detail-chotko.component.html',
  styleUrl: './detail-chotko.component.scss'
})
export class DetailChotKhoComponent implements OnInit {
  @Input() chotKho: ChotKho | null = null;
  @Input() isEdit: boolean = true;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  private _chotKhoService = inject(ChotKhoService);
  private _userService = inject(UserService);
  private _snackBar = inject(MatSnackBar);

  // Form data
  formData = signal<any>({
    maChotKho: '',
    tenChotKho: '',
    tuNgay: '',
    denNgay: '',
    userId: '',
    ghichu: ''
  });

  // UI states
  isLoading = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);

  // Reference data
  users: any[] = [];

  constructor() {}

  async ngOnInit() {
    await this.loadInitialData();
    this.initializeForm();
  }

  async loadInitialData() {
    try {
      // Load users for selection
      await this._userService.getAllUser();
      this.users = this._userService.ListUser().filter((user: any) => user.isActive);
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  }

  initializeForm() {
    if (this.chotKho) {
      // Edit mode - populate with existing data
      this.formData.set({
        maChotKho: this.chotKho.maChotKho,
        tenChotKho: this.chotKho.tenChotKho,
        tuNgay: moment(this.chotKho.tuNgay).format('YYYY-MM-DD'),
        denNgay: moment(this.chotKho.denNgay).format('YYYY-MM-DD'),
        userId: this.chotKho.userId || '',
        ghichu: this.chotKho.ghichu || ''
      });
    } else {
      // Create mode - generate new code and set defaults
      const now = new Date();
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      
      this.formData.set({
        maChotKho: this._chotKhoService.generateMaChotKho(),
        tenChotKho: `Chốt kho tháng ${now.getMonth() + 1}/${now.getFullYear()}`,
        tuNgay: moment(now).startOf('month').format('YYYY-MM-DD'),
        denNgay: moment(nextMonth).format('YYYY-MM-DD'),
        userId: '',
        ghichu: ''
      });
    }
  }

  async saveData() {
    if (!this.validateForm()) {
      return;
    }

    try {
      this.isSubmitting.set(true);
      const data = this.formData();

      if (this.isEdit && !this.chotKho) {
        // Create new
        await this._chotKhoService.createChotKho(data);
        this._snackBar.open('Tạo chốt kho thành công', 'Đóng', { duration: 3000 });
      } else {
        // Edit existing (if supported by API)
        this._snackBar.open('Cập nhật chốt kho không được hỗ trợ', 'Đóng', { duration: 3000 });
        return;
      }

      this.saved.emit();
    } catch (error: any) {
      console.error('Error saving chot kho:', error);
      this._snackBar.open(error.message || 'Lỗi lưu dữ liệu', 'Đóng', { duration: 3000 });
    } finally {
      this.isSubmitting.set(false);
    }
  }

  validateForm(): boolean {
    const data = this.formData();
    
    if (!data.maChotKho?.trim()) {
      this._snackBar.open('Vui lòng nhập mã chốt kho', 'Đóng', { duration: 3000 });
      return false;
    }

    if (!data.tenChotKho?.trim()) {
      this._snackBar.open('Vui lòng nhập tên chốt kho', 'Đóng', { duration: 3000 });
      return false;
    }

    if (!data.tuNgay) {
      this._snackBar.open('Vui lòng chọn từ ngày', 'Đóng', { duration: 3000 });
      return false;
    }

    if (!data.denNgay) {
      this._snackBar.open('Vui lòng chọn đến ngày', 'Đóng', { duration: 3000 });
      return false;
    }

    if (new Date(data.tuNgay) >= new Date(data.denNgay)) {
      this._snackBar.open('Từ ngày phải nhỏ hơn đến ngày', 'Đóng', { duration: 3000 });
      return false;
    }

    return true;
  }

  cancel() {
    this.cancelled.emit();
  }

  // Utility methods
  getUserName(userId: string): string {
    const user = this.users.find(u => u.id === userId);
    return user ? (user.profile?.name || user.email) : 'Người dùng';
  }

  formatDate(date: Date | string): string {
    return this._chotKhoService.formatDate(date);
  }

  generateNewCode() {
    const newCode = this._chotKhoService.generateMaChotKho();
    this.formData.update(current => ({ ...current, maChotKho: newCode }));
  }

  setDefaultDateRange() {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    this.formData.update(current => ({
      ...current,
      tuNgay: moment(now).startOf('month').format('YYYY-MM-DD'),
      denNgay: moment(nextMonth).format('YYYY-MM-DD')
    }));
  }

  // Form field update handlers
  onFieldChange(field: string, value: any) {
    this.formData.update(current => ({ ...current, [field]: value }));
  }

  // Computed properties
  get isCreateMode(): boolean {
    return this.isEdit && !this.chotKho;
  }

  get isViewMode(): boolean {
    return !this.isEdit;
  }

  get canEdit(): boolean {
    return this.isEdit && (!this.chotKho || this.chotKho.trangThai === 'DANG_MO');
  }

  get pageTitle(): string {
    if (this.isCreateMode) return 'Tạo chốt kho mới';
    if (this.isViewMode) return 'Chi tiết chốt kho';
    return 'Chỉnh sửa chốt kho';
  }

  get pageIcon(): string {
    if (this.isCreateMode) return 'add';
    if (this.isViewMode) return 'visibility';
    return 'edit';
  }
}
