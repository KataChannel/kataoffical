import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kata-pagination',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './pagination.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  @Input() page: number = 1;
  @Input() totalPages: number = 1;
  @Input() total: number = 0;
  @Input() pageSize: number = 10;
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() previousPage = new EventEmitter<void>();
  @Output() nextPage = new EventEmitter<void>();

  private _snackBar: MatSnackBar = inject(MatSnackBar);

  onPageSizeChange(size: number, menuHienthi: any) {
    if (size > this.total) {
      this._snackBar.open(`Số lượng tối đa ${this.total}`, '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      size = this.total;
    }
    this.pageSizeChange.emit(size);
    menuHienthi.closeMenu();
  }

  onPreviousPage() {
    if (this.page > 1) {
      this.previousPage.emit();
    }
  }

  onNextPage() {
    if (this.page < this.totalPages) {
      this.nextPage.emit();
    }
  }
}