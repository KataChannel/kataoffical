import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div class="text-6xl mb-4">{{ icon }}</div>
      <h3 class="text-lg font-semibold text-slate-900 mb-2">{{ title }}</h3>
      <p class="text-sm text-muted-foreground max-w-sm mb-6">
        {{ description }}
      </p>
      <ng-content></ng-content>
    </div>
  `
})
export class EmptyStateComponent {
  @Input() icon: string = '📭';
  @Input() title: string = 'Không có dữ liệu';
  @Input() description: string = 'Chưa có dữ liệu để hiển thị';
}
