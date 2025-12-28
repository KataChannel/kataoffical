import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';

@Component({
  selector: 'ui-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="badgeClasses">
      <ng-content></ng-content>
    </div>
  `,
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'default';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  get badgeClasses(): string {
    const baseClasses = 'inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2';
    
    const variantClasses: Record<BadgeVariant, string> = {
      default: 'border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80',
      secondary: 'border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80',
      destructive: 'border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80',
      outline: 'text-slate-950 border-slate-200',
      success: 'border-transparent bg-green-500 text-white hover:bg-green-500/80',
      warning: 'border-transparent bg-yellow-500 text-white hover:bg-yellow-500/80'
    };

    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-xs',
      lg: 'px-3 py-1 text-sm'
    };

    return `${baseClasses} ${variantClasses[this.variant]} ${sizeClasses[this.size]}`.trim();
  }
}
