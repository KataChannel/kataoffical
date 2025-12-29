import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { SupportService } from '../support.service';

@Component({
  selector: 'app-support-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="min-h-screen bg-slate-50">
      <!-- Sticky Header -->
      <header class="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div class="px-4 py-3 flex items-center gap-3">
          <button 
            (click)="goBack()"
            class="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
            <mat-icon>arrow_back</mat-icon>
          </button>
          <h1 class="text-lg font-semibold text-slate-900">Tạo vấn đề mới</h1>
        </div>
      </header>

      <!-- Content -->
      <main class="px-4 py-4 sm:px-6 sm:py-6 max-w-2xl mx-auto">
        <form (submit)="onSubmit($event)" class="space-y-4">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">
              Tiêu đề <span class="text-red-500">*</span>
            </label>
            <input 
              type="text"
              [(ngModel)]="title" 
              name="title" 
              required
              placeholder="Mô tả ngắn gọn vấn đề..."
              class="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl
                     text-sm text-slate-900 placeholder-slate-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                     transition-colors" />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">
              Mô tả chi tiết <span class="text-red-500">*</span>
            </label>
            <textarea 
              [(ngModel)]="description" 
              name="description" 
              required
              rows="5"
              placeholder="Mô tả chi tiết vấn đề, các bước tái hiện lỗi..."
              class="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl
                     text-sm text-slate-900 placeholder-slate-400 resize-none
                     focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                     transition-colors"></textarea>
          </div>

          <!-- Priority -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Mức độ ưu tiên</label>
            <div class="grid grid-cols-4 gap-2">
              @for (p of priorities; track p.value) {
                <button 
                  type="button"
                  (click)="priority = p.value"
                  [class]="priority === p.value 
                    ? p.activeClass + ' ring-2 ring-offset-1' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
                  class="px-3 py-2 rounded-lg text-sm font-medium transition-all text-center">
                  {{p.label}}
                </button>
              }
            </div>
          </div>

          <!-- File Upload -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">
              Đính kèm (hình ảnh/video)
            </label>
            <div 
              (click)="fileInput.click()"
              (dragover)="$event.preventDefault()"
              (drop)="onFileDrop($event)"
              class="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center 
                     cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors">
              <input type="file" #fileInput (change)="onFileSelected($event)" multiple
                     accept="image/*,video/*" class="hidden" />
              <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                <mat-icon class="text-slate-400">cloud_upload</mat-icon>
              </div>
              <p class="text-sm text-slate-600 font-medium">Nhấn hoặc kéo thả file</p>
              <p class="text-xs text-slate-400 mt-1">Hỗ trợ hình ảnh và video, tối đa 50MB/file</p>
            </div>

            @if (selectedFiles().length > 0) {
              <div class="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
                @for (file of selectedFiles(); track $index) {
                  <div class="relative aspect-square rounded-lg overflow-hidden bg-slate-100">
                    @if (file.type.startsWith('image/')) {
                      <img [src]="getFilePreview(file)" class="w-full h-full object-cover" />
                    } @else {
                      <div class="w-full h-full flex items-center justify-center">
                        <mat-icon class="text-4xl text-slate-400">videocam</mat-icon>
                      </div>
                    }
                    <button (click)="removeFile($index)" type="button"
                            class="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white 
                                   flex items-center justify-center shadow-sm hover:bg-red-600">
                      <mat-icon class="text-[14px]">close</mat-icon>
                    </button>
                    <div class="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-2 py-1 truncate">
                      {{formatFileSize(file.size)}}
                    </div>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Submit Buttons -->
          <div class="flex gap-3 pt-4">
            <button 
              type="submit" 
              [disabled]="loading() || !title || !description"
              class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3
                     bg-blue-500 text-white rounded-xl font-medium
                     hover:bg-blue-600 active:scale-[0.98] transition-all shadow-sm
                     disabled:opacity-50 disabled:cursor-not-allowed">
              @if (loading()) {
                <mat-spinner diameter="20" class="text-white"></mat-spinner>
              } @else {
                <mat-icon>send</mat-icon>
              }
              <span>Gửi vấn đề</span>
            </button>
            <button 
              type="button" 
              (click)="goBack()"
              [disabled]="loading()"
              class="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium
                     hover:bg-slate-200 transition-colors">
              Hủy
            </button>
          </div>
        </form>
      </main>
    </div>
  `,
})
export class SupportCreateComponent {
  title = '';
  description = '';
  priority = 'medium';
  selectedFiles = signal<File[]>([]);
  loading = signal(false);

  priorities = [
    { value: 'low', label: 'Thấp', activeClass: 'bg-slate-200 text-slate-700 ring-slate-400' },
    { value: 'medium', label: 'TB', activeClass: 'bg-blue-100 text-blue-700 ring-blue-400' },
    { value: 'high', label: 'Cao', activeClass: 'bg-orange-100 text-orange-700 ring-orange-400' },
    { value: 'urgent', label: 'Gấp', activeClass: 'bg-red-100 text-red-700 ring-red-400' },
  ];

  constructor(
    private supportService: SupportService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  goBack() {
    this.router.navigate(['/admin/support']);
  }

  onFileSelected(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.selectedFiles.set([...this.selectedFiles(), ...files]);
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    const files = Array.from(event.dataTransfer?.files || []) as File[];
    const validFiles = files.filter(f => f.type.startsWith('image/') || f.type.startsWith('video/'));
    this.selectedFiles.set([...this.selectedFiles(), ...validFiles]);
  }

  removeFile(index: number) {
    const files = this.selectedFiles();
    files.splice(index, 1);
    this.selectedFiles.set([...files]);
  }

  getFilePreview(file: File): string {
    return URL.createObjectURL(file);
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

      this.snackBar.open('Đã tạo vấn đề thành công!', 'Đóng', { 
        duration: 3000,
        panelClass: ['snackbar-success']
      });
      this.router.navigate(['/admin/support']);
    } catch (error) {
      console.error('Error creating ticket:', error);
      this.snackBar.open('Lỗi tạo vấn đề', 'Đóng', { 
        duration: 3000,
        panelClass: ['snackbar-error']
      });
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
