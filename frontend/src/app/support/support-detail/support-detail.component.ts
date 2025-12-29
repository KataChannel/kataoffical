import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GetImage } from '../../shared/utils/shared.utils';
import { StorageService } from '../../shared/utils/storage.service';
import { SupportService } from '../support.service';

@Component({
  selector: 'app-support-detail',
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
    <div class="flex flex-col h-screen bg-slate-50">
      <!-- Sticky Header -->
      <header class="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div class="px-4 py-3 flex items-center gap-3">
          <button 
            (click)="goBack()"
            class="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
            <mat-icon>arrow_back</mat-icon>
          </button>
          @if (ticket()) {
            <div class="flex-1 min-w-0">
              <h1 class="text-base font-semibold text-slate-900 truncate">{{ticket().title}}</h1>
              <div class="flex items-center gap-2 mt-0.5">
                <span [class]="getStatusBadgeClass(ticket().status)"
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium">
                  {{getStatusLabel(ticket().status)}}
                </span>
                <span class="text-xs text-slate-500">•</span>
                <span class="text-xs text-slate-500">{{ticket().createdAt | date:'dd/MM/yyyy'}}</span>
              </div>
            </div>
          }
        </div>
      </header>

      @if (loading()) {
        <div class="flex-1 flex items-center justify-center">
          <div class="text-center">
            <mat-spinner diameter="40"></mat-spinner>
            <span class="text-sm text-slate-500 mt-3 block">Đang tải...</span>
          </div>
        </div>
      } @else if (ticket()) {
        <!-- Chat Messages Area -->
        <main #chatContainer class="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          <!-- Original Ticket - User Message -->
          <div class="flex flex-col max-w-[85%]">
            <div class="bg-white rounded-2xl rounded-tl-md p-4 shadow-sm border border-slate-100">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span class="text-sm font-medium text-blue-700">
                    {{ticket().user?.name?.charAt(0) || 'U'}}
                  </span>
                </div>
                <div>
                  <span class="text-sm font-medium text-slate-900">{{ticket().user?.name}}</span>
                  <span class="text-xs text-slate-400 ml-2">
                    {{ticket().createdAt | date:'HH:mm dd/MM'}}
                  </span>
                </div>
              </div>
              <p class="text-sm text-slate-700 whitespace-pre-wrap">{{ticket().description}}</p>
              
              @if (ticket().attachments?.length) {
                <div class="mt-3 grid grid-cols-2 gap-2">
                  @for (att of ticket().attachments; track att.id) {
                    <div class="relative rounded-lg overflow-hidden bg-slate-100 aspect-video">
                      @if (att.fileType?.startsWith('image/')) {
                        <img [src]="getFileUrl(att.fileUrl)" [alt]="att.fileName" 
                             class="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                             (click)="openFile(att.fileUrl)" />
                      } @else if (att.fileType?.startsWith('video/')) {
                        <video [src]="getFileUrl(att.fileUrl)" 
                               class="w-full h-full object-cover" controls></video>
                      }
                    </div>
                  }
                </div>
              }
            </div>
          </div>

          <!-- Responses -->
          @for (response of ticket().responses; track response.id) {
            <div [class]="isCurrentUser(response.createdBy) ? 'ml-auto' : 'mr-auto'"
                 class="flex flex-col max-w-[85%]">
              <div [class]="isCurrentUser(response.createdBy) 
                            ? 'bg-blue-500 text-white rounded-2xl rounded-tr-md' 
                            : 'bg-white rounded-2xl rounded-tl-md border border-slate-100'"
                   class="p-4 shadow-sm">
                @if (!isCurrentUser(response.createdBy)) {
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                      <mat-icon class="text-[16px] text-emerald-600">support_agent</mat-icon>
                    </div>
                    <span class="text-sm font-medium text-slate-900">{{response.user?.name}}</span>
                    <span class="text-xs text-slate-400">
                      {{response.createdAt | date:'HH:mm'}}
                    </span>
                  </div>
                }
                <p [class]="isCurrentUser(response.createdBy) ? 'text-white' : 'text-slate-700'"
                   class="text-sm whitespace-pre-wrap">{{response.content}}</p>
                
                @if (response.attachments?.length) {
                  <div class="mt-3 grid grid-cols-2 gap-2">
                    @for (att of response.attachments; track att.id) {
                      <div class="relative rounded-lg overflow-hidden bg-black/10 aspect-video">
                        @if (att.fileType?.startsWith('image/')) {
                          <img [src]="getFileUrl(att.fileUrl)" [alt]="att.fileName" 
                               class="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                               (click)="openFile(att.fileUrl)" />
                        } @else if (att.fileType?.startsWith('video/')) {
                          <video [src]="getFileUrl(att.fileUrl)" 
                                 class="w-full h-full object-cover" controls></video>
                        }
                      </div>
                    }
                  </div>
                }

                @if (isCurrentUser(response.createdBy)) {
                  <div class="text-right mt-1">
                    <span class="text-xs text-blue-100">
                      {{response.createdAt | date:'HH:mm'}}
                    </span>
                  </div>
                }
              </div>
            </div>
          }
        </main>

        <!-- Input Area -->
        <footer class="sticky bottom-0 bg-white border-t border-slate-200 p-4">
          <!-- File Preview -->
          @if (responseFiles().length > 0) {
            <div class="flex gap-2 mb-3 overflow-x-auto pb-2">
              @for (file of responseFiles(); track $index) {
                <div class="relative shrink-0">
                  <div class="w-16 h-16 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden">
                    @if (file.type.startsWith('image/')) {
                      <img [src]="getFilePreview(file)" class="w-full h-full object-cover" />
                    } @else {
                      <mat-icon class="text-slate-400">videocam</mat-icon>
                    }
                  </div>
                  <button (click)="removeFile($index)" 
                          class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white 
                                 flex items-center justify-center shadow">
                    <mat-icon class="text-[12px]">close</mat-icon>
                  </button>
                </div>
              }
            </div>
          }

          <form (submit)="onSubmitResponse($event)" class="flex items-end gap-2">
            <!-- Attach Button -->
            <input type="file" #fileInput (change)="onFileSelected($event)" multiple
                   accept="image/*,video/*" class="hidden" />
            <button type="button" (click)="fileInput.click()"
                    class="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center 
                           text-slate-500 transition-colors shrink-0">
              <mat-icon>attach_file</mat-icon>
            </button>

            <!-- Text Input -->
            <div class="flex-1 relative">
              <textarea 
                [(ngModel)]="responseContent" 
                name="content"
                placeholder="Nhập tin nhắn..."
                rows="1"
                class="w-full px-4 py-2.5 bg-slate-100 rounded-2xl border-0 resize-none
                       text-sm text-slate-900 placeholder-slate-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500/20
                       max-h-32 overflow-y-auto"
                (input)="autoResize($event)"
                (keydown.enter)="handleEnter($event)"></textarea>
            </div>

            <!-- Send Button -->
            <button type="submit" 
                    [disabled]="responding() || (!responseContent && responseFiles().length === 0)"
                    class="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center 
                           shadow-sm hover:bg-blue-600 active:scale-95 transition-all shrink-0
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500">
              @if (responding()) {
                <mat-spinner diameter="20" class="text-white"></mat-spinner>
              } @else {
                <mat-icon>send</mat-icon>
              }
            </button>
          </form>
        </footer>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
    textarea {
      field-sizing: content;
    }
  `],
})
export class SupportDetailComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  
  ticket = signal<any>(null);
  loading = signal(true);
  responding = signal(false);
  responseContent = '';
  responseFiles = signal<File[]>([]);
  ticketId: string = '';
  currentUserId: string = '';
  private shouldScrollToBottom = false;

  constructor(
    private supportService: SupportService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private storageService: StorageService,
  ) {}

  ngOnInit() {
    // Get current user ID from storage
    const user = this.storageService.getItem('user');
    if (user) {
      try {
        const parsed = typeof user === 'string' ? JSON.parse(user) : user;
        this.currentUserId = parsed.id || '';
      } catch {}
    }

    this.route.params.subscribe((params) => {
      this.ticketId = params['id'];
      this.loadTicket();
    });
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  scrollToBottom() {
    try {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    } catch {}
  }

  goBack() {
    this.router.navigate(['/admin/support']);
  }

  loadTicket() {
    this.loading.set(true);
    this.supportService.ticket(this.ticketId).subscribe({
      next: (res: any) => {
        this.ticket.set(res.data.ticket);
        this.loading.set(false);
        this.shouldScrollToBottom = true;
      },
      error: () => {
        this.loading.set(false);
        this.snackBar.open('Không tìm thấy vấn đề', 'Đóng', { duration: 3000,
        panelClass: ['snackbar-error'] });
        this.router.navigate(['/admin/support']);
      },
    });
  }

  isCurrentUser(userId: string): boolean {
    return this.currentUserId === userId;
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

  getFilePreview(file: File): string {
    return URL.createObjectURL(file);
  }

  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 128) + 'px';
  }

  handleEnter(event: Event) {
    const keyEvent = event as KeyboardEvent;
    if (!keyEvent.shiftKey) {
      event.preventDefault();
      if (this.responseContent || this.responseFiles().length > 0) {
        this.onSubmitResponse(event);
      }
    }
  }

  async onSubmitResponse(e: Event) {
    e.preventDefault();
    if (!this.responseContent && this.responseFiles().length === 0) return;
    
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

      this.responseContent = '';
      this.responseFiles.set([]);
      this.loadTicket();
    } catch (error) {
      console.error('Error adding response:', error);
      this.snackBar.open('Lỗi khi gửi phản hồi. Vui lòng thử lại.', 'Đóng', { duration: 3000,
        panelClass: ['snackbar-error'] });
    } finally {
      this.responding.set(false);
    }
  }

  getFileUrl(url: string): string {
    return GetImage(url);
  }

  openFile(url: string) {
    window.open(this.getFileUrl(url), '_blank');
  }

  getFileIcon(type: string): string {
    if (type.startsWith('image/')) return 'image';
    if (type.startsWith('video/')) return 'videocam';
    return 'attach_file';
  }

  getStatusBadgeClass(status: string): string {
    const classes: any = {
      open: 'bg-blue-50 text-blue-700',
      inProgress: 'bg-amber-50 text-amber-700',
      resolved: 'bg-emerald-50 text-emerald-700',
      closed: 'bg-slate-100 text-slate-600',
    };
    return classes[status] || 'bg-slate-100 text-slate-600';
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
