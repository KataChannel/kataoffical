import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'kata-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;

  get buttonClasses(): string {
    const baseClasses = 'font-semibold rounded focus:outline-none focus:ring-2';
    const variantClasses = {
      primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300',
      secondary:
        'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300',
      danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300',
    };
    const sizeClasses = {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };
    return `${baseClasses} ${variantClasses[this.variant]} ${
      sizeClasses[this.size]
    } ${this.disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  }

  onClick() {
    if (!this.disabled) {
      // Emit event or handle click
    }
  }
}
