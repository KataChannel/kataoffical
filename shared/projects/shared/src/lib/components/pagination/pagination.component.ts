import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'kata-pagination',
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
    totalItems = 0;
    pageSize = 10;
    currentPage = 1;
    totalPages = 1;

    onPageSizeChange(newPageSize: number, menuTrigger: any) {
        this.pageSize = newPageSize;
        this.currentPage = 1;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        menuTrigger.closeMenu();
    }

    onPreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    onNextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    }
}
