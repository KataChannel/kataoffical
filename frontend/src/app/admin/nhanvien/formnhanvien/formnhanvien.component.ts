import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NhanvienService } from '../nhanvien.service';
import { PhongbanService } from '../../phongban/phongban.service';
import { 
  Nhanvien, 
  GioiTinh, 
  GioiTinhLabels,
  TrangThaiNhanvien, 
  TrangThaiNhanvienLabels 
} from '../../../models/nhanvien.model';
import { Phongban } from '../../../models/phongban.model';

@Component({
  selector: 'app-formnhanvien',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCheckboxModule
  ],
  templateUrl: './formnhanvien.component.html',
  styleUrls: ['./formnhanvien.component.scss']
})
export class FormNhanvienComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private nhanvienService = inject(NhanvienService);
  private phongbanService = inject(PhongbanService);
  private snackBar = inject(MatSnackBar);
  
  mode: 'create' | 'edit' = 'create';
  id: string | null = null;
  loading = signal<boolean>(false);
  submitting = signal<boolean>(false);
  phongbans = signal<Phongban[]>([]);

  nhanvienForm!: FormGroup;
  
  gioiTinhOptions = Object.entries(GioiTinhLabels).map(([value, label]) => ({
    value,
    label
  }));

  trangThaiOptions = Object.entries(TrangThaiNhanvienLabels).map(([value, label]) => ({
    value,
    label
  }));

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.mode = this.route.snapshot.data['mode'] || (this.id ? 'edit' : 'create');
    
    this.initForm();
    this.loadPhongbans();
    
    if (this.mode === 'edit' && this.id) {
      this.loadNhanvien();
    }
  }

  initForm() {
    this.nhanvienForm = this.fb.group({
      // Thông tin cơ bản
      maNV: ['', [Validators.required, Validators.maxLength(20)]],
      hoTen: ['', [Validators.required, Validators.maxLength(200)]],
      gioiTinh: [GioiTinh.KHAC],
      ngaySinh: [null],
      cmnd: ['', Validators.maxLength(20)],
      queQuan: ['', Validators.maxLength(500)],
      diaChiHienTai: ['', Validators.maxLength(500)],
      soDienThoai: ['', [Validators.maxLength(20), Validators.pattern(/^[0-9+\-\s()]*$/)]],
      email: ['', [Validators.email, Validators.maxLength(100)]],
      
      // Thông tin công việc
      phongbanId: [null],
      chucVu: ['', Validators.maxLength(100)],
      viTri: ['', Validators.maxLength(100)],
      ngayVaoLam: [null],
      trangThai: [TrangThaiNhanvien.THUVIEC, Validators.required],
      
      // Thông tin lương
      luongCoBan: [0, [Validators.min(0)]],
      phuCap: [0, [Validators.min(0)]],
      heSoLuong: [1, [Validators.min(0)]],
      
      // Thông tin ngân hàng
      soTaiKhoan: ['', Validators.maxLength(50)],
      nganHang: ['', Validators.maxLength(100)],
      chiNhanh: ['', Validators.maxLength(200)],
      
      // Ghi chú
      ghiChu: ['', Validators.maxLength(1000)],
      isActive: [true]
    });
  }

  async loadPhongbans() {
    try {
      const phongbans = await this.phongbanService.getAllPhongban({
        includeChildren: false
      });
      this.phongbans.set(phongbans);
    } catch (error) {
      console.error('Error loading phongbans:', error);
    }
  }

  async loadNhanvien() {
    if (!this.id) return;
    
    try {
      this.loading.set(true);
      const nhanvien = await this.nhanvienService.getNhanvienById(this.id);
      
      this.nhanvienForm.patchValue({
        maNV: nhanvien.maNV,
        hoTen: nhanvien.hoTen,
        gioiTinh: nhanvien.gioiTinh,
        ngaySinh: nhanvien.ngaySinh ? new Date(nhanvien.ngaySinh) : null,
        cmnd: nhanvien.cmnd,
        queQuan: nhanvien.queQuan,
        diaChiHienTai: nhanvien.diaChiHienTai,
        soDienThoai: nhanvien.soDienThoai,
        email: nhanvien.email,
        phongbanId: nhanvien.phongbanId,
        chucVu: nhanvien.chucVu,
        viTri: nhanvien.viTri,
        ngayVaoLam: nhanvien.ngayVaoLam ? new Date(nhanvien.ngayVaoLam) : null,
        trangThai: nhanvien.trangThai,
        luongCoBan: nhanvien.luongCoBan,
        phuCap: nhanvien.phuCap,
        heSoLuong: nhanvien.heSoLuong,
        soTaiKhoan: nhanvien.soTaiKhoan,
        nganHang: nhanvien.nganHang,
        chiNhanh: nhanvien.chiNhanh,
        ghiChu: nhanvien.ghiChu,
        isActive: nhanvien.isActive
      });
    } catch (error) {
      this.snackBar.open('Không thể tải thông tin nhân viên', 'Đóng', { duration: 3000 });
      console.error('Error loading nhanvien:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async onSubmit() {
    if (!this.nhanvienForm.valid) {
      this.snackBar.open('Vui lòng điền đầy đủ thông tin bắt buộc', 'Đóng', { duration: 3000 });
      Object.keys(this.nhanvienForm.controls).forEach(key => {
        const control = this.nhanvienForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    try {
      this.submitting.set(true);
      const formValue = this.nhanvienForm.value;

      // Format dates
      if (formValue.ngaySinh) {
        formValue.ngaySinh = new Date(formValue.ngaySinh).toISOString();
      }
      if (formValue.ngayVaoLam) {
        formValue.ngayVaoLam = new Date(formValue.ngayVaoLam).toISOString();
      }

      if (this.mode === 'create') {
        await this.nhanvienService.createNhanvien(formValue);
        this.snackBar.open('Tạo nhân viên thành công!', 'Đóng', { duration: 3000 });
      } else if (this.id) {
        await this.nhanvienService.updateNhanvien(this.id, formValue);
        this.snackBar.open('Cập nhật nhân viên thành công!', 'Đóng', { duration: 3000 });
      }

      this.router.navigate(['/admin/nhanvien/list']);
    } catch (error: any) {
      const message = error?.error?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
      this.snackBar.open(message, 'Đóng', { duration: 5000 });
      console.error('Error submitting form:', error);
    } finally {
      this.submitting.set(false);
    }
  }

  goBack() {
    this.router.navigate(['/admin/nhanvien/list']);
  }
}
