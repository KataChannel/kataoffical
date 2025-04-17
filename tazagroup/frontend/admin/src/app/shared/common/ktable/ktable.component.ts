import { ChangeDetectionStrategy, Component, inject, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu'
import { SearchfilterComponent } from '../searchfilter/searchfilter.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-ktable',
  templateUrl: './ktable.component.html',
  styleUrl: './ktable.component.scss',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    MatTooltipModule,
    SearchfilterComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KtableComponent {
  @Input() ListItem:any = [];
  @Input() displayedColumns:any = [];
  @Input() ColumnName:any = {};
  @Input() totalItems:any = 0;
  @Input() pageSize:any = 10;
  @Input() currentPage:any = 1
  @Input() totalPages:any = 1;
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('NhacungcapColFilter') || '[]'
  );
  isFilter: boolean = false;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  filterValues: { [key: string]: string } = {};
  dataSource:any = new MatTableDataSource([]);
  private _snackBar:MatSnackBar = inject(MatSnackBar);
  ngOnChanges(changes: SimpleChanges) {
    if (changes['ListItem'] && changes['ListItem'].currentValue) {
    }
    if (changes['displayedColumns'] && changes['displayedColumns'].currentValue) {
      this.displayedColumns = [...this.displayedColumns];
    }
    if (changes['ColumnName'] && changes['ColumnName'].currentValue) {
      this.ColumnName = { ...this.ColumnName };
    }
    this.totalItems = this.ListItem.length;
    this.pageSize = this.pageSize || 10; // Default page size
    this.currentPage = 1; // Reset to first page when data changes
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    console.log(this.pageSize);
    this.calculateTotalPages();
    this.updateDataSource();   
  }
  
  updateDataSource() {
    this.dataSource = new MatTableDataSource([...this.ListItem]); // Clone mảng để trigger change detection
     this.dataSource.sort = this.sort;
  }
  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }
  onOutFilter(event:any)
  {    
    this.dataSource = new MatTableDataSource([...event]); // Clone dữ liệu để trigger change detection
    this.dataSource.sort = this.sort;
  }
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }
  onPageSizeChange(size: number,menuHienthi:any) {
    if(size>this.ListItem.length){
      this.pageSize = this.ListItem.length;
      this._snackBar.open(`Số lượng tối đa ${this.ListItem.length}`, '', {
        duration: 1000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-success'],
      });
    }
    else {
      this.pageSize = size;
    }
    this.currentPage = 1; // Reset to first page when changing page size
    this.calculateTotalPages();
    this.updateDisplayData();
    menuHienthi.closeMenu();
  }
  
  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayData();
    }
  }
  
  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayData();
    }
  }
  updateDisplayData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const pageData = this.ListItem.slice(startIndex, endIndex);
    this.dataSource.data = pageData;
    }

  FilterHederColumn(list:any,column:any)
  {
    const uniqueList = list.filter((obj: any, index: number, self: any) => 
      index === self.findIndex((t: any) => t[column] === obj[column])
    );
    return uniqueList
  }
  ListFilter:any[] = []
}