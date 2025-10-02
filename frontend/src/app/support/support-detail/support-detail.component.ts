import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SupportService } from '../support.service';

@Component({
  selector: 'app-support-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="container mx-auto p-4 max-w-4xl">
      @if (loading()) {
        <div class="flex justify-center p-12">
          <mat-spinner></mat-spinner>
        </div>
      } @else if (ticket()) {
        <div class="flex items-center gap-4 mb-6">
          <button mat-icon-button [routerLink]="['/admin/support']">
            <mat-icon>arrow_back</mat-icon>
          </button>
          <div class="flex-1">
            <div class="flex items-center gap-3">
              <h1 class="text-2xl font-bold">{{ticket().title}}</h1>
              <mat-chip [class]="getStatusClass(ticket().status)">
                {{getStatusLabel(ticket().status)}}
              </mat-chip>
              <mat-chip [class]="getPriorityClass(ticket().priority)">
                {{getPriorityLabel(ticket().priority)}}
              </mat-chip>
            </div>
            <div class="text-sm text-gray-500 mt-1">
              Tạo bởi {{ticket().user.name}} • {{ticket().createdAt | date:'dd/MM/yyyy HH:mm'}}
            </div>
          </div>
        </div>

        <!-- Ticket Content -->
        <mat-card class="mb-4">
          <mat-card-content>
            <p class="whitespace-pre-wrap">{{ticket().description}}</p>
            
            @if (ticket().attachments?.length) {
              <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                @for (att of ticket().attachments; track att.id) {
                  <div class="border rounded-lg overflow-hidden">
                    @if (att.fileType.startsWith('image/')) {
                      <img [src]="getFileUrl(att.fileUrl)" [alt]="att.fileName" 
                           class="w-full h-32 object-cover cursor-pointer"
                           (click)="openFile(att.fileUrl)" />
                    } @else if (att.fileType.startsWith('video/')) {
                      <video [src]="getFileUrl(att.fileUrl)" class="w-full h-32 object-cover"
                             controls></video>
                    }
                  </div>
                }
              </div>
            }
          </mat-card-content>
        </mat-card>

        <!-- Responses -->
        <div class="space-y-4 mb-6">
          <h2 class="text-xl font-bold">Phản hồi ({{ticket().responses?.length || 0}})</h2>
          
          @for (response of ticket().responses; track response.id) {
            <mat-card>
              <mat-card-header>
                <mat-card-subtitle>
                  <div class="flex items-center justify-between">
                    <span>{{response.user.name}}</span>
                    <span class="text-xs">{{response.createdAt | date:'dd/MM/yyyy HH:mm'}}</span>
                  </div>
                </mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p class="whitespace-pre-wrap">{{response.content}}</p>
                
                @if (response.attachments?.length) {
                  <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                    @for (att of response.attachments; track att.id) {
                      <div class="border rounded-lg overflow-hidden">
                        @if (att.fileType.startsWith('image/')) {
                          <img [src]="getFileUrl(att.fileUrl)" [alt]="att.fileName" 
                               class="w-full h-32 object-cover cursor-pointer"
                               (click)="openFile(att.fileUrl)" />
                        } @else if (att.fileType.startsWith('video/')) {
                          <video [src]="getFileUrl(att.fileUrl)" class="w-full h-32 object-cover"
                                 controls></video>
                        }
                      </div>
                    }
                  </div>
                }
              </mat-card-content>
            </mat-card>
          }
        </div>

        <!-- Add Response Form -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>Thêm phản hồi</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <form (submit)="onSubmitResponse($event)" class="space-y-4">
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Nội dung phản hồi</mat-label>
                <textarea matInput [(ngModel)]="responseContent" name="content" required rows="4"
                  placeholder="Nhập nội dung phản hồi..."></textarea>
              </mat-form-field>

              <div>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input type="file" #fileInput (change)="onFileSelected($event)" multiple
                    accept="image/*,video/*" class="hidden" />
                  <button mat-stroked-button type="button" (click)="fileInput.click()">
                    <mat-icon>attach_file</mat-icon>
                    Đính kèm file
                  </button>
                </div>

                @if (responseFiles().length > 0) {
                  <div class="mt-2 space-y-2">
                    @for (file of responseFiles(); track $index) {
                      <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div class="flex items-center gap-2">
                          <mat-icon class="text-sm">{{getFileIcon(file.type)}}</mat-icon>
                          <span class="text-sm">{{file.name}}</span>
                        </div>
                        <button mat-icon-button (click)="removeFile($index)" type="button">
                          <mat-icon>close</mat-icon>
                        </button>
                      </div>
                    }
                  </div>
                }
              </div>

              <button mat-raised-button color="primary" type="submit" 
                      [disabled]="responding() || !responseContent">
                @if (responding()) {
                  <mat-spinner diameter="20"></mat-spinner>
                } @else {
                  <mat-icon>send</mat-icon>
                }
                Gửi phản hồi
              </button>
            </form>
          </mat-card-content>
        </mat-card>
      }
    </div>
  `,
})
export class SupportDetailComponent implements OnInit {
  ticket = signal<any>(null);
  loading = signal(true);
  responding = signal(false);
  responseContent = '';
  responseFiles = signal<File[]>([]);
  ticketId: string = '';

  constructor(
    private supportService: SupportService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.ticketId = params['id'];
      this.loadTicket();
    });
  }

  loadTicket() {
    this.loading.set(true);
    this.supportService.ticket(this.ticketId).subscribe({
      next: (res: any) => {
        this.ticket.set(res.data.ticket);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.snackBar.open('Không tìm thấy vấn đề', 'Đóng', { duration: 3000 });
        this.router.navigate(['/admin/support']);
      },
    });
  }

  onFileSelected(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.responseFiles.set([...this.responseFiles(), ...files]);
  }

  removeFile(index: number) {
    const files = this.responseFiles();
    files.splice(index, 1);
    this.responseFiles.set([...files]);
  }

  async onSubmitResponse(e: Event) {
    e.preventDefault();
    this.responding.set(true);

    try {
      let attachmentUrls: string[] = [];

      // Upload files first if any
      if (this.responseFiles().length > 0) {
        const uploadResult = await this.supportService.uploadFiles(this.responseFiles()).toPromise();
        attachmentUrls = uploadResult?.map((r: any) => r.fileUrl) || [];
      }

      // Add response with attachment URLs
      await this.supportService.addResponse(this.ticketId, {
        content: this.responseContent,
        attachmentUrls,
      }).toPromise();

      this.snackBar.open('Đã gửi phản hồi thành công!', 'Đóng', { duration: 3000 });
      this.responseContent = '';
      this.responseFiles.set([]);
      this.loadTicket();
    } catch (error) {
      console.error('Error adding response:', error);
      this.snackBar.open('Lỗi khi gửi phản hồi. Vui lòng thử lại.', 'Đóng', { duration: 3000 });
    } finally {
      this.responding.set(false);
    }
  }

  getFileUrl(url: string): string {
    if (url.startsWith('http')) return url;
    return `http://localhost:3331${url}`;
  }

  openFile(url: string) {
    window.open(this.getFileUrl(url), '_blank');
  }

  getFileIcon(type: string): string {
    if (type.startsWith('image/')) return 'image';
    if (type.startsWith('video/')) return 'videocam';
    return 'attach_file';
  }

  getStatusClass(status: string): string {
    const classes: any = {
      open: 'bg-blue-100 text-blue-800',
      inProgress: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    };
    return classes[status] || 'bg-gray-100';
  }

  getStatusLabel(status: string): string {
    const labels: any = {
      open: 'Mới',
      inProgress: 'Đang xử lý',
      resolved: 'Đã giải quyết',
      closed: 'Đã đóng',
    };
    return labels[status] || status;
  }

  getPriorityClass(priority: string): string {
    const classes: any = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800',
    };
    return classes[priority] || 'bg-gray-100';
  }

  getPriorityLabel(priority: string): string {
    const labels: any = {
      low: 'Thấp',
      medium: 'Trung bình',
      high: 'Cao',
      urgent: 'Khẩn cấp',
    };
    return labels[priority] || priority;
  }
}
