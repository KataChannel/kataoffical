import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { PhongbanService } from '../phongban.service';
import { Phongban } from '../../../models/phongban.model';

@Component({
  selector: 'app-detailphongban',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  template: `
    <div class="container">
      <!-- Loading State -->
      <mat-card *ngIf="loading()">
        <mat-card-content class="loading-container">
          <mat-spinner diameter="40"></mat-spinner>
          <p>Đang tải dữ liệu...</p>
        </mat-card-content>
      </mat-card>

      <!-- Main Content -->
      <mat-card *ngIf="!loading() && phongban()">
        <mat-card-header>
          <div class="header-content">
            <div class="title-section">
              <mat-icon class="header-icon">business</mat-icon>
              <div>
                <mat-card-title>{{ phongban()?.ten }}</mat-card-title>
                <mat-card-subtitle>{{ phongban()?.ma }}</mat-card-subtitle>
              </div>
            </div>
            <mat-chip [style.background-color]="getLoaiColor(phongban()?.loai || '')">
              {{ getLoaiLabel(phongban()?.loai || '') }}
            </mat-chip>
          </div>
        </mat-card-header>

        <mat-card-content>
          <!-- Statistics Cards -->
          <div class="stats-grid">
            <div class="stat-card">
              <mat-icon>layers</mat-icon>
              <div class="stat-content">
                <span class="stat-label">Cấp</span>
                <span class="stat-value">{{ phongban()?.level }}</span>
              </div>
            </div>
            <div class="stat-card">
              <mat-icon>people</mat-icon>
              <div class="stat-content">
                <span class="stat-label">Nhân viên</span>
                <span class="stat-value">{{ phongban()?.nhanviens?.length || 0 }}</span>
              </div>
            </div>
            <div class="stat-card" *ngIf="phongban()?.parentId">
              <mat-icon>account_tree</mat-icon>
              <div class="stat-content">
                <span class="stat-label">Thuộc</span>
                <span class="stat-value">{{ phongban()?.parent?.ten || 'N/A' }}</span>
              </div>
            </div>
          </div>

          <!-- Detail Information -->
          <div class="detail-section">
            <h3>
              <mat-icon>info</mat-icon>
              Thông tin chi tiết
            </h3>
            <div class="detail-grid">
              <div class="detail-item">
                <label>Mã phòng ban:</label>
                <span>{{ phongban()?.ma }}</span>
              </div>
              <div class="detail-item">
                <label>Tên phòng ban:</label>
                <span>{{ phongban()?.ten }}</span>
              </div>
              <div class="detail-item">
                <label>Loại:</label>
                <span>{{ getLoaiLabel(phongban()?.loai || '') }}</span>
              </div>
              <div class="detail-item">
                <label>Cấp:</label>
                <span>Cấp {{ phongban()?.level }}</span>
              </div>
              <div class="detail-item" *ngIf="phongban()?.parent">
                <label>Phòng ban cha:</label>
                <span>{{ phongban()?.parent?.ma }} - {{ phongban()?.parent?.ten }}</span>
              </div>
              <div class="detail-item">
                <label>Số nhân viên:</label>
                <span>{{ phongban()?.nhanviens?.length || 0 }} người</span>
              </div>
              <div class="detail-item full-width" *ngIf="phongban()?.moTa">
                <label>Mô tả:</label>
                <span>{{ phongban()?.moTa }}</span>
              </div>
            </div>
          </div>

          <!-- Employees List -->
          <div class="detail-section" *ngIf="phongban()?.nhanviens && (phongban()?.nhanviens?.length || 0) > 0">
            <h3>
              <mat-icon>people</mat-icon>
              Danh sách nhân viên ({{ phongban()?.nhanviens?.length || 0 }})
            </h3>
            <div class="employees-list">
              <div class="employee-item" *ngFor="let nv of phongban()?.nhanviens">
                <mat-icon>person</mat-icon>
                <div class="employee-info">
                  <span class="employee-name">{{ nv['ten'] || nv['hoTen'] || 'N/A' }}</span>
                  <span class="employee-details">{{ nv['email'] || 'Chưa có email' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Metadata -->
          <div class="metadata">
            <div class="metadata-item" *ngIf="phongban()?.createdAt">
              <mat-icon>schedule</mat-icon>
              <span>Tạo lúc: {{ phongban()?.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
            </div>
            <div class="metadata-item" *ngIf="phongban()?.updatedAt">
              <mat-icon>update</mat-icon>
              <span>Cập nhật: {{ phongban()?.updatedAt | date:'dd/MM/yyyy HH:mm' }}</span>
            </div>
          </div>
        </mat-card-content>

        <mat-card-actions>
          <button mat-raised-button (click)="goBack()">
            <mat-icon>arrow_back</mat-icon>
            Quay lại
          </button>
          <button mat-raised-button color="accent" (click)="edit()">
            <mat-icon>edit</mat-icon>
            Chỉnh sửa
          </button>
          <button mat-raised-button color="warn" (click)="confirmDelete()">
            <mat-icon>delete</mat-icon>
            Xóa
          </button>
        </mat-card-actions>
      </mat-card>

      <!-- Error State -->
      <mat-card *ngIf="!loading() && !phongban()">
        <mat-card-content class="error-container">
          <mat-icon>error</mat-icon>
          <h2>Không tìm thấy phòng ban</h2>
          <p>ID: {{ id }}</p>
          <button mat-raised-button color="primary" (click)="goBack()">
            <mat-icon>arrow_back</mat-icon>
            Quay lại danh sách
          </button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .loading-container, .error-container {
      text-align: center;
      padding: 60px 20px;
    }
    
    .loading-container mat-spinner {
      margin: 0 auto 20px;
    }
    
    .error-container mat-icon {
      font-size: 72px;
      width: 72px;
      height: 72px;
      color: #999;
      margin-bottom: 20px;
    }
    
    .error-container h2 {
      margin: 20px 0 10px;
      color: #333;
    }
    
    .error-container button {
      margin-top: 20px;
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 16px 0;
    }
    
    .title-section {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .header-icon {
      font-size: 40px;
      width: 40px;
      height: 40px;
      color: #1976d2;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin: 20px 0;
    }
    
    .stat-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
      border-left: 4px solid #1976d2;
    }
    
    .stat-card mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #1976d2;
    }
    
    .stat-content {
      display: flex;
      flex-direction: column;
    }
    
    .stat-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      font-weight: 500;
    }
    
    .stat-value {
      font-size: 24px;
      font-weight: 600;
      color: #333;
    }
    
    .detail-section {
      margin: 30px 0;
    }
    
    .detail-section h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
      color: #333;
      font-size: 18px;
      font-weight: 500;
      border-bottom: 2px solid #e0e0e0;
      padding-bottom: 10px;
    }
    
    .detail-section h3 mat-icon {
      color: #1976d2;
    }
    
    .detail-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
    
    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .detail-item.full-width {
      grid-column: 1 / -1;
    }
    
    .detail-item label {
      font-weight: 500;
      color: #666;
      font-size: 14px;
    }
    
    .detail-item span {
      font-size: 16px;
      color: #333;
    }
    
    .employees-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 12px;
    }
    
    .employee-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: #fafafa;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      transition: all 0.2s;
    }
    
    .employee-item:hover {
      background: #f5f5f5;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .employee-item mat-icon {
      color: #1976d2;
    }
    
    .employee-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }
    
    .employee-name {
      font-weight: 500;
      color: #333;
    }
    
    .employee-details {
      font-size: 12px;
      color: #666;
    }
    
    .metadata {
      display: flex;
      gap: 20px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }
    
    .metadata-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
      font-size: 14px;
    }
    
    .metadata-item mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }
    
    mat-card-actions {
      padding: 16px;
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }
    
    @media (max-width: 768px) {
      .detail-grid {
        grid-template-columns: 1fr;
      }
      
      .header-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }
      
      .metadata {
        flex-direction: column;
        gap: 12px;
      }
    }
  `]
})
export class DetailPhongbanComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private phongbanService = inject(PhongbanService);
  
  id: string = '';
  phongban = signal<Phongban | null>(null);
  loading = signal<boolean>(false);

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.loadPhongban();
    }
  }

  async loadPhongban() {
    try {
      this.loading.set(true);
      const data = await this.phongbanService.getPhongbanById(this.id);
      this.phongban.set(data);
    } catch (error) {
      console.error('Error loading phongban:', error);
    } finally {
      this.loading.set(false);
    }
  }

  getLoaiLabel(loai: string): string {
    const labels: Record<string, string> = {
      'KINH_DOANH': 'Kinh Doanh',
      'QUAN_LY': 'Quản Lý',
      'HANH_CHINH': 'Hành Chính',
      'KY_THUAT': 'Kỹ Thuật',
      'TAI_CHINH': 'Tài Chính',
      'NHAN_SU': 'Nhân Sự',
      'MARKETING': 'Marketing',
      'KHAC': 'Khác'
    };
    return labels[loai] || loai;
  }

  getLoaiColor(loai: string): string {
    const colors: Record<string, string> = {
      'KINH_DOANH': '#4CAF50',
      'QUAN_LY': '#2196F3',
      'HANH_CHINH': '#FF9800',
      'KY_THUAT': '#9C27B0',
      'TAI_CHINH': '#F44336',
      'NHAN_SU': '#00BCD4',
      'MARKETING': '#E91E63',
      'KHAC': '#757575'
    };
    return colors[loai] || '#757575';
  }

  goBack() {
    this.router.navigate(['/admin/phongban/list']);
  }

  edit() {
    this.router.navigate(['/admin/phongban/edit', this.id]);
  }

  async confirmDelete() {
    if (!this.id) return;
    
    const confirmed = confirm(
      `Bạn có chắc chắn muốn xóa phòng ban "${this.phongban()?.ten}"?\n\nHành động này không thể hoàn tác!`
    );
    
    if (confirmed) {
      try {
        await this.phongbanService.deletePhongban(this.id);
        this.router.navigate(['/admin/phongban/list']);
      } catch (error) {
        console.error('Error deleting phongban:', error);
      }
    }
  }
}
