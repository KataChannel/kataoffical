
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ui-skeleton',
  standalone: true,
  imports: [],
  template: `
    <div class="skeleton" [class]="additionalClasses"></div>
  `,
  styles: [`
    .skeleton {
      @apply animate-pulse bg-slate-200 rounded;
    }
    .skeleton-text {
      @apply h-4;
    }
    .skeleton-title {
      @apply h-6;
    }
    .skeleton-avatar {
      @apply h-12 w-12 rounded-full;
    }
    .skeleton-button {
      @apply h-10 w-24 rounded-md;
    }
    .skeleton-card {
      @apply h-32 rounded-lg;
    }
  `]
})
export class SkeletonComponent {
  @Input() variant: 'text' | 'title' | 'avatar' | 'button' | 'card' | 'custom' = 'text';
  @Input() width?: string;
  @Input() height?: string;
  @Input() className?: string;

  @HostBinding('class')
  get hostClasses(): string {
    return 'block';
  }

  @HostBinding('style.width')
  get widthStyle(): string | undefined {
    return this.width;
  }

  @HostBinding('style.height')
  get heightStyle(): string | undefined {
    return this.height;
  }

  get additionalClasses(): string {
    const baseClass = this.variant !== 'custom' ? `skeleton-${this.variant}` : '';
    return `${baseClass} ${this.className || ''}`.trim();
  }
}
