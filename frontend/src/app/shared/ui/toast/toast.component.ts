import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

export interface ToastData {
  id?: string;
  title?: string;
  description: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  duration?: number;
}

@Component({
  selector: 'ui-toast',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('toastAnimation', [
      state('void', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      state('*', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('void => *', animate('200ms ease-out')),
      transition('* => void', animate('150ms ease-in'))
    ])
  ],
  template: `
    <div 
      *ngIf="show()"
      @toastAnimation
      [class]="toastClasses"
      role="alert"
    >
      <div class="flex gap-3">
        <div class="flex-shrink-0 text-xl">
          {{ getIcon() }}
        </div>
        <div class="flex-1 min-w-0">
          <h5 *ngIf="data.title" class="font-semibold text-sm mb-1">
            {{ data.title }}
          </h5>
          <p class="text-sm opacity-90">
            {{ data.description }}
          </p>
        </div>
        <button 
          (click)="close()"
          class="flex-shrink-0 text-current opacity-70 hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ToastComponent {
  @Input() data!: ToastData;
  @Output() closed = new EventEmitter<void>();
  
  show = signal(true);
  private timeout?: number;

  get toastClasses(): string {
    const baseClasses = 'rounded-lg shadow-lg p-4 mb-3 max-w-sm w-full';
    const variantClasses = {
      'default': 'bg-slate-900 text-white',
      'destructive': 'bg-destructive text-white',
      'success': 'bg-success text-white',
      'warning': 'bg-warning text-slate-900'
    };
    
    return `${baseClasses} ${variantClasses[this.data.variant || 'default']}`;
  }

  ngOnInit(): void {
    const duration = this.data.duration || 3000;
    if (duration > 0) {
      this.timeout = window.setTimeout(() => {
        this.close();
      }, duration);
    }
  }

  ngOnDestroy(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  getIcon(): string {
    const icons = {
      'default': 'ℹ️',
      'destructive': '❌',
      'success': '✅',
      'warning': '⚠️'
    };
    return icons[this.data.variant || 'default'];
  }

  close(): void {
    this.show.set(false);
    setTimeout(() => {
      this.closed.emit();
    }, 200);
  }
}

@Component({
  selector: 'ui-toast-container',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  template: `
    <div class="fixed bottom-0 right-0 z-50 p-4 sm:p-6 max-w-full pointer-events-none">
      <div class="pointer-events-auto">
        <ui-toast
          *ngFor="let toast of toasts(); trackBy: trackByFn"
          [data]="toast"
          (closed)="removeToast(toast.id!)"
        ></ui-toast>
      </div>
    </div>
  `
})
export class ToastContainerComponent {
  toasts = signal<ToastData[]>([]);
  private idCounter = 0;

  show(data: Omit<ToastData, 'id'>): void {
    const id = `toast-${this.idCounter++}`;
    const toast: ToastData = { ...data, id };
    this.toasts.update(toasts => [...toasts, toast]);
  }

  removeToast(id: string): void {
    this.toasts.update(toasts => toasts.filter(t => t.id !== id));
  }

  trackByFn(index: number, item: ToastData): string {
    return item.id || index.toString();
  }
}
