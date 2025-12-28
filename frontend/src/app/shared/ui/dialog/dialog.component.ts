import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="isOpen" 
      class="fixed inset-0 z-50 flex items-center justify-center"
      [@dialogAnimation]
    >
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-black/50 backdrop-blur-sm"
        (click)="handleBackdropClick()"
      ></div>
      
      <!-- Dialog Content -->
      <div 
        [class]="dialogClasses"
        role="dialog"
        aria-modal="true"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations: [
    trigger('dialogAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class DialogComponent {
  @Input() isOpen = false;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';
  @Input() closeOnBackdrop = true;
  @Output() closed = new EventEmitter<void>();

  get dialogClasses(): string {
    const baseClasses = 'relative z-50 bg-white rounded-lg shadow-lg max-h-[90vh] overflow-auto';
    
    const sizeClasses = {
      sm: 'w-full max-w-sm p-6',
      md: 'w-full max-w-md p-6',
      lg: 'w-full max-w-lg p-6',
      xl: 'w-full max-w-2xl p-8',
      full: 'w-full h-full max-w-full max-h-full rounded-none p-6'
    };

    return `${baseClasses} ${sizeClasses[this.size]}`.trim();
  }

  handleBackdropClick(): void {
    if (this.closeOnBackdrop) {
      this.close();
    }
  }

  close(): void {
    this.isOpen = false;
    this.closed.emit();
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.isOpen) {
      this.close();
    }
  }
}

@Component({
  selector: 'ui-dialog-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
      <ng-content></ng-content>
    </div>
  `,
})
export class DialogHeaderComponent {}

@Component({
  selector: 'ui-dialog-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 class="text-lg font-semibold leading-none tracking-tight">
      <ng-content></ng-content>
    </h2>
  `,
})
export class DialogTitleComponent {}

@Component({
  selector: 'ui-dialog-description',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p class="text-sm text-slate-500">
      <ng-content></ng-content>
    </p>
  `,
})
export class DialogDescriptionComponent {}

@Component({
  selector: 'ui-dialog-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6 gap-2">
      <ng-content></ng-content>
    </div>
  `,
})
export class DialogFooterComponent {}
