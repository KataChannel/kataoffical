import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NhanvienService } from '../nhanvien.service';
import { 
  Nhanvien, 
  GioiTinhLabels, 
  TrangThaiNhanvienLabels 
} from '../../../models/nhanvien.model';

@Component({
  selector: 'app-detailnhanvien',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './detailnhanvien.component.html',
  styleUrls: ['./detailnhanvien.component.scss']
})
export class DetailNhanvienComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private nhanvienService = inject(NhanvienService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  
  id: string | null = null;
  nhanvien = signal<Nhanvien | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loadNhanvien();
    }
  }

  async loadNhanvien() {
    if (!this.id) return;
    
    try {
      this.loading.set(true);
      this.error.set(null);
      const nhanvien = await this.nhanvienService.getNhanvienById(this.id);
      this.nhanvien.set(nhanvien);
    } catch (error: any) {
      console.error('Error loading nhanvien:', error);
      this.error.set('Không thể tải thông tin nhân viên');
      this.snackBar.open('Không thể tải thông tin nhân viên', 'Đóng', { duration: 3000 });
    } finally {
      this.loading.set(false);
    }
  }

  getTrangThaiLabel(trangThai: string): string {
    return TrangThaiNhanvienLabels[trangThai as keyof typeof TrangThaiNhanvienLabels] || trangThai;
  }

  getTrangThaiColor(trangThai: string): string {
    const colorMap: Record<string, string> = {
      'DANGLAMVIEC': '#4caf50',
      'THUVIEC': '#ff9800',
      'NGHIPHEP': '#2196f3',
      'DANGHIVIEC': '#f44336',
      'TAMNGHI': '#9e9e9e',
      'KHAC': '#607d8b'
    };
    return colorMap[trangThai] || '#607d8b';
  }

  getGioiTinhLabel(gioiTinh: string | null | undefined): string {
    if (!gioiTinh) return 'N/A';
    return GioiTinhLabels[gioiTinh as keyof typeof GioiTinhLabels] || gioiTinh;
  }

  calculateAge(ngaySinh: string | Date | null | undefined): number | null {
    if (!ngaySinh) return null;
    const today = new Date();
    const birthDate = new Date(ngaySinh);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  calculateWorkDuration(ngayVaoLam: string | Date | null | undefined): string {
    if (!ngayVaoLam) return 'N/A';
    const today = new Date();
    const startDate = new Date(ngayVaoLam);
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    if (years > 0) {
      return `${years} năm ${months} tháng`;
    }
    return `${months} tháng`;
  }

  getTotalSalary(nhanvien: Nhanvien): number {
    const luongCoBan = nhanvien.luongCoBan || 0;
    const phuCap = nhanvien.phuCap || 0;
    const heSo = nhanvien.heSoLuong || 1;
    return (luongCoBan + phuCap) * heSo;
  }

  editNhanvien() {
    if (this.id) {
      this.router.navigate(['/admin/nhanvien/edit', this.id]);
    }
  }

  async confirmDelete() {
    if (!this.id) return;

    const confirmed = confirm('Bạn có chắc chắn muốn xóa nhân viên này?');
    if (!confirmed) return;

    try {
      await this.nhanvienService.deleteNhanvien(this.id);
      this.snackBar.open('Xóa nhân viên thành công!', 'Đóng', { duration: 3000 });
      this.router.navigate(['/admin/nhanvien/list']);
    } catch (error: any) {
      const message = error?.error?.message || 'Có lỗi xảy ra khi xóa nhân viên';
      this.snackBar.open(message, 'Đóng', { duration: 5000 });
      console.error('Error deleting nhanvien:', error);
    }
  }

  async linkUser() {
    // Placeholder for linking user functionality
    this.snackBar.open('Chức năng liên kết tài khoản đang được phát triển', 'Đóng', { duration: 3000 });
  }

  async unlinkUser() {
    if (!this.id) return;

    const confirmed = confirm('Bạn có chắc chắn muốn hủy liên kết tài khoản?');
    if (!confirmed) return;

    try {
      await this.nhanvienService.unlinkFromUser(this.id);
      this.snackBar.open('Hủy liên kết tài khoản thành công!', 'Đóng', { duration: 3000 });
      await this.loadNhanvien();
    } catch (error: any) {
      const message = error?.error?.message || 'Có lỗi xảy ra khi hủy liên kết';
      this.snackBar.open(message, 'Đóng', { duration: 5000 });
      console.error('Error unlinking user:', error);
    }
  }

  goBack() {
    this.router.navigate(['/admin/nhanvien/list']);
  }

  formatDate(date: string | Date | null | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('vi-VN');
  }

  formatCurrency(amount: number | null | undefined): string {
    if (!amount) return '0';
    return amount.toLocaleString('vi-VN');
  }
}
