import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, signal, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sharepagination',
  imports: [
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './sharepagination.component.html',
  styleUrl: './sharepagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharepaginationComponent {
  @Input() pageSize:number = 10;
  @Input() page:number = 1;
  @Input() total:number = 1;
  @Input() pageCount:number = 1;
  @Output() emitChange = new EventEmitter<any>();

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
    this.emitChange.emit({page:1, pageSize: size });
    menuHienthi.closeMenu();
  }
  onPreviousPage(){
    if (this.page > 1) {
        this.emitChange.emit({page: this.page - 1, pageSize: this.pageSize});
    }
  }

  onNextPage(){
    if (this.page < this.pageCount) {
      this.emitChange.emit({page: this.page + 1, pageSize: this.pageSize});
    }
  }
}
