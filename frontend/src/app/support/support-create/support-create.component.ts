import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SupportService } from '../support.service';

@Component({
  selector: 'app-support-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="container mx-auto p-4 max-w-3xl">
      <div class="flex items-center gap-4 mb-6">
        <button mat-icon-button [routerLink]="['/support']">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h1 class="text-2xl font-bold">Tạo vấn đề mới</h1>
      </div>

      <mat-card>
        <mat-card-content>
          <form (submit)="onSubmit($event)" class="space-y-4">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Tiêu đề</mat-label>
              <input matInput [(ngModel)]="title" name="title" required placeholder="Mô tả ngắn gọn vấn đề của bạn" />
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Mô tả chi tiết</mat-label>
              <textarea matInput [(ngModel)]="description" name="description" required rows="6"
                placeholder="Mô tả chi tiết vấn đề, các bước tái hiện lỗi..."></textarea>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Mức độ ưu tiên</mat-label>
              <mat-select [(ngModel)]="priority" name="priority">
                <mat-option value="low">Thấp</mat-option>
                <mat-option value="medium">Trung bình</mat-option>
                <mat-option value="high">Cao</mat-option>
                <mat-option value="urgent">Khẩn cấp</mat-option>
              </mat-select>
            </mat-form-field>

            <div>
              <label class="block text-sm font-medium mb-2">Đính kèm file (hình ảnh/video)</label>
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input type="file" #fileInput (change)="onFileSelected($event)" multiple
                  accept="image/*,video/*" class="hidden" />
                <button mat-raised-button type="button" (click)="fileInput.click()">
                  <mat-icon>attach_file</mat-icon>
                  Chọn file
                </button>
                <p class="text-sm text-gray-500 mt-2">Hỗ trợ hình ảnh và video, tối đa 50MB/file</p>
              </div>

              @if (selectedFiles().length > 0) {
                <div class="mt-4 space-y-2">
                  @for (file of selectedFiles(); track $index) {
                    <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div class="flex items-center gap-2">
                        <mat-icon>{{getFileIcon(file.type)}}</mat-icon>
                        <span class="text-sm">{{file.name}}</span>
                        <span class="text-xs text-gray-500">({{formatFileSize(file.size)}})</span>
                      </div>
                      <button mat-icon-button (click)="removeFile($index)" type="button">
                        <mat-icon>close</mat-icon>
                      </button>
                    </div>
                  }
                </div>
              }
            </div>

            <div class="flex gap-4">
              <button mat-raised-button color="primary" type="submit" [disabled]="loading() || !title || !description">
                @if (loading()) {
                  <mat-spinner diameter="20"></mat-spinner>
                } @else {
                  <mat-icon>send</mat-icon>
                }
                Gửi vấn đề
              </button>
              <button mat-stroked-button type="button" [routerLink]="['/support']" [disabled]="loading()">
                Hủy
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class SupportCreateComponent {
  title = '';
  description = '';
  priority = 'medium';
  selectedFiles = signal<File[]>([]);
  loading = signal(false);

  constructor(
    private supportService: SupportService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  onFileSelected(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.selectedFiles.set([...this.selectedFiles(), ...files]);
  }

  removeFile(index: number) {
    const files = this.selectedFiles();
    files.splice(index, 1);
    this.selectedFiles.set([...files]);
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    this.loading.set(true);

    try {
      let attachmentUrls: string[] = [];

      // Upload files first if any
      if (this.selectedFiles().length > 0) {
        const uploadResult = await this.supportService.uploadFiles(this.selectedFiles()).toPromise();
        attachmentUrls = uploadResult?.map((r: any) => r.fileUrl) || [];
      }

      // Create ticket with attachment URLs
      await this.supportService.createTicket({
        title: this.title,
        description: this.description,
        priority: this.priority,
        attachmentUrls,
      }).toPromise();

      this.snackBar.open('Đã tạo vấn đề thành công!', 'Đóng', { duration: 3000 });
      this.router.navigate(['/support']);
    } catch (error) {
      console.error('Error creating ticket:', error);
      this.snackBar.open('Lỗi khi tạo vấn đề. Vui lòng thử lại.', 'Đóng', { duration: 3000 });
    } finally {
      this.loading.set(false);
    }
  }

  getFileIcon(type: string): string {
    if (type.startsWith('image/')) return 'image';
    if (type.startsWith('video/')) return 'videocam';
    return 'attach_file';
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
}
