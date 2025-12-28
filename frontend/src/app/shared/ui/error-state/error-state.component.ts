import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'ui-error-state',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div class="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <span class="text-3xl">⚠️</span>
      </div>
      <h3 class="text-lg font-semibold text-slate-900 mb-2">{{ title }}</h3>
      <p class="text-sm text-muted-foreground max-w-sm mb-6">
        {{ description }}
      </p>
      <ui-button *ngIf="showRetry" (click)="onRetry()" variant="outline">
        🔄 Thử lại
      </ui-button>
      <ng-content></ng-content>
    </div>
  `
})
export class ErrorStateComponent implements OnInit {
  @Input() title: string = 'Đã xảy ra lỗi';
  @Input() description: string = 'Không thể tải dữ liệu. Vui lòng thử lại sau.';
  @Input() message?: string; // Allow message as alias for description
  @Input() showRetry: boolean = true;
  @Input() onRetry: () => void = () => {};
  @Input() retry?: () => void; // Allow retry as alias for onRetry

  ngOnInit() {
    // Use message if provided, otherwise use description
    if (this.message) {
      this.description = this.message;
    }
    // Use retry if provided, otherwise use onRetry
    if (this.retry) {
      this.onRetry = this.retry;
    }
  }
}
