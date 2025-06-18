import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchfilterComponent } from '../../../shared/common/searchfilter/searchfilter.component';
import { memoize } from '../../../shared/utils/decorators';

@Component({
  selector: 'kata-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    SearchfilterComponent
  ],
  templateUrl: './table.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @Input() displayedColumns: string[] = [];
  @Input() ColumnName: Record<string, string> = {};
  @Input() FilterColumns: any[] = [];
  @Input() Columns: any[] = [];
  @Input() ListFilter: any[] = [];
  @Input() EditList: any[] = [];
  @Output() toggleColumnEvent = new EventEmitter<any>();
  @Output() filterColumnsEvent = new EventEmitter<any>();
  @Output() updateDisplayedColumnsEvent = new EventEmitter<void>();
  @Output() outFilterEvent = new EventEmitter<any>();
  @Output() addToEditEvent = new EventEmitter<any>();
  @Output() goToDetailEvent = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @memoize()
  FilterHederColumn(list: any, column: any) {
    const uniqueList = list.filter((obj: any, index: number, self: any) =>
      index === self.findIndex((t: any) => t[column] === obj[column])
    );
    return uniqueList;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  toggleColumn(item: any) {
    this.toggleColumnEvent.emit(item);
  }

  doFilterColumns(event: any) {
    this.filterColumnsEvent.emit(event);
  }

  updateDisplayedColumns() {
    this.updateDisplayedColumnsEvent.emit();
  }

  onOutFilter(event: any) {
    this.outFilterEvent.emit(event);
  }

  addToEdit(item: any) {
    this.addToEditEvent.emit(item);
  }

  goToDetail(item: any) {
    this.goToDetailEvent.emit(item);
  }

  checkSelect(item: any): boolean {
    return this.EditList.some((v: any) => v.id === item.id);
  }

  checkItemInEdit(item: any): boolean {
    return this.EditList.some((v: any) => v.id === item.id);
  }

  trackByFn(index: number, item: any): any {
    return item.id;
  }
}