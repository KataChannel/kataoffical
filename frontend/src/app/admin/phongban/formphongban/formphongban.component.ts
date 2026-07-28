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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhongbanService } from '../phongban.service';
import { Phongban, LoaiPhongban, LoaiPhongbanLabels } from '../../../models/phongban.model';

@Component({
  selector: 'app-formphongban',
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
    MatProgressSpinnerModule
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            <mat-icon>{{ mode === 'create' ? 'add' : 'edit' }}</mat-icon>
            {{ mode === 'create' ? 'Thêm Phòng Ban Mới' : 'Chỉnh Sửa Phòng Ban' }}
          </mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <div *ngIf="loading()" class="loading-container">
            <mat-spinner diameter="40"></mat-spinner>
            <p>Đang tải dữ liệu...</p>
          </div>

          <form [formGroup]="phongbanForm" *ngIf="!loading()">
            <div class="form-grid">
              <!-- Mã phòng ban -->
              <mat-form-field appearance="outline">
                <mat-label>Mã phòng ban</mat-label>
                <input matInput formControlName="ma" placeholder="VD: PB01">
                <mat-icon matPrefix>tag</mat-icon>
                <mat-error *ngIf="phongbanForm.get('ma')?.hasError('required')">
                  Mã phòng ban là bắt buộc
                </mat-error>
                <mat-error *ngIf="phongbanForm.get('ma')?.hasError('maxlength')">
                  Tối đa 20 ký tự
                </mat-error>
              </mat-form-field>

              <!-- Tên phòng ban -->
              <mat-form-field appearance="outline">
                <mat-label>Tên phòng ban</mat-label>
                <input matInput formControlName="ten" placeholder="VD: Phòng Kinh Doanh">
                <mat-icon matPrefix>business</mat-icon>
                <mat-error *ngIf="phongbanForm.get('ten')?.hasError('required')">
                  Tên phòng ban là bắt buộc
                </mat-error>
                <mat-error *ngIf="phongbanForm.get('ten')?.hasError('maxlength')">
                  Tối đa 200 ký tự
                </mat-error>
              </mat-form-field>

              <!-- Loại phòng ban -->
              <mat-form-field appearance="outline">
                <mat-label>Loại phòng ban</mat-label>
                <mat-select formControlName="loai">
                  <mat-option *ngFor="let loai of loaiOptions" [value]="loai.value">
                    {{ loai.label }}
                  </mat-option>
                </mat-select>
                <mat-icon matPrefix>category</mat-icon>
                <mat-error *ngIf="phongbanForm.get('loai')?.hasError('required')">
                  Loại phòng ban là bắt buộc
                </mat-error>
              </mat-form-field>

              <!-- Cấp -->
              <mat-form-field appearance="outline">
                <mat-label>Cấp</mat-label>
                <mat-select formControlName="level">
                  <mat-option [value]="1">Cấp 1</mat-option>
                  <mat-option [value]="2">Cấp 2</mat-option>
                  <mat-option [value]="3">Cấp 3</mat-option>
                </mat-select>
                <mat-icon matPrefix>layers</mat-icon>
                <mat-error *ngIf="phongbanForm.get('level')?.hasError('required')">
                  Cấp là bắt buộc
                </mat-error>
              </mat-form-field>

              <!-- Phòng ban cha -->
              <mat-form-field appearance="outline" *ngIf="phongbanForm.get('level')?.value > 1">
                <mat-label>Phòng ban cha</mat-label>
                <mat-select formControlName="parentId">
                  <mat-option [value]="null">-- Không có --</mat-option>
                  <mat-option *ngFor="let pb of parentPhongbans()" [value]="pb.id">
                    {{ pb.ma }} - {{ pb.ten }}
                  </mat-option>
                </mat-select>
                <mat-icon matPrefix>account_tree</mat-icon>
              </mat-form-field>

              <!-- Mô tả (full width) -->
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Mô tả</mat-label>
                <textarea 
                  matInput 
                  formControlName="moTa" 
                  rows="4"
                  placeholder="Nhập mô tả về phòng ban..."></textarea>
                <mat-icon matPrefix>description</mat-icon>
                <mat-error *ngIf="phongbanForm.get('moTa')?.hasError('maxlength')">
                  Tối đa 1000 ký tự
                </mat-error>
              </mat-form-field>
            </div>
          </form>
        </mat-card-content>

        <mat-card-actions>
          <button 
            mat-raised-button 
            (click)="goBack()"
            [disabled]="submitting()">
            <mat-icon>arrow_back</mat-icon>
            Hủy
          </button>
          <button 
            mat-raised-button 
            color="primary"
            (click)="onSubmit()"
            [disabled]="!phongbanForm.valid || submitting()">
            <mat-spinner diameter="20" *ngIf="submitting()" style="display: inline-block; margin-right: 8px;"></mat-spinner>
            <mat-icon *ngIf="!submitting()">save</mat-icon>
            {{ submitting() ? 'Đang lưu...' : 'Lưu' }}
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .loading-container {
      text-align: center;
      padding: 60px 20px;
    }
    
    .loading-container mat-spinner {
      margin: 0 auto 20px;
    }
    
    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      padding: 20px 0;
    }
    
    .form-grid mat-form-field {
      width: 100%;
    }
    
    .form-grid mat-form-field.full-width {
      grid-column: 1 / -1;
    }
    
    @media (max-width: 768px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
    }
    
    mat-card-actions {
      padding: 16px;
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }
  `]
})
export class FormPhongbanComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private phongbanService = inject(PhongbanService);
  private snackBar = inject(MatSnackBar);
  
  mode: 'create' | 'edit' = 'create';
  id: string | null = null;
  loading = signal<boolean>(false);
  submitting = signal<boolean>(false);
  parentPhongbans = signal<Phongban[]>([]);

  phongbanForm!: FormGroup;
  loaiOptions = Object.entries(LoaiPhongbanLabels).map(([value, label]) => ({
    value,
    label
  }));

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.mode = this.route.snapshot.data['mode'] || (this.id ? 'edit' : 'create');
    
    this.initForm();
    this.loadParentPhongbans();
    
    if (this.mode === 'edit' && this.id) {
      this.loadPhongban();
    }
  }

  initForm() {
    this.phongbanForm = this.fb.group({
      ma: ['', [Validators.required, Validators.maxLength(20)]],
      ten: ['', [Validators.required, Validators.maxLength(200)]],
      loai: [LoaiPhongban.KHAC, Validators.required],
      level: [1, Validators.required],
      parentId: [null],
      moTa: ['', Validators.maxLength(1000)]
    });

    // Watch level changes to clear parentId if level is 1
    this.phongbanForm.get('level')?.valueChanges.subscribe(level => {
      if (level === 1) {
        this.phongbanForm.get('parentId')?.setValue(null);
      }
    });
  }

  async loadParentPhongbans() {
    try {
      const allPhongbans = await this.phongbanService.getAllPhongban({
        includeChildren: false
      });
      
      // Filter to show only level 1 phongbans as potential parents
      this.parentPhongbans.set(
        allPhongbans.filter(pb => pb.level === 1 && pb.id !== this.id)
      );
    } catch (error) {
      console.error('Error loading parent phongbans:', error);
    }
  }

  async loadPhongban() {
    if (!this.id) return;
    
    try {
      this.loading.set(true);
      const phongban = await this.phongbanService.getPhongbanById(this.id);
      
      this.phongbanForm.patchValue({
        ma: phongban.ma,
        ten: phongban.ten,
        loai: phongban.loai,
        level: phongban.level,
        parentId: phongban.parentId,
        moTa: phongban.moTa
      });
    } catch (error) {
      this.snackBar.open('Không thể tải thông tin phòng ban', 'Đóng', { duration: 3000 });
      console.error('Error loading phongban:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async onSubmit() {
    if (!this.phongbanForm.valid) {
      this.snackBar.open('Vui lòng điền đầy đủ thông tin', 'Đóng', { duration: 3000 });
      return;
    }

    try {
      this.submitting.set(true);
      const formValue = this.phongbanForm.value;

      if (this.mode === 'create') {
        await this.phongbanService.createPhongban(formValue);
        this.snackBar.open('Tạo phòng ban thành công!', 'Đóng', { duration: 3000 });
      } else if (this.id) {
        await this.phongbanService.updatePhongban(this.id, formValue);
        this.snackBar.open('Cập nhật phòng ban thành công!', 'Đóng', { duration: 3000 });
      }

      this.router.navigate(['/admin/phongban/list']);
    } catch (error: any) {
      const message = error?.error?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
      this.snackBar.open(message, 'Đóng', { duration: 5000 });
      console.error('Error submitting form:', error);
    } finally {
      this.submitting.set(false);
    }
  }

  goBack() {
    this.router.navigate(['/admin/phongban/list']);
  }
}
