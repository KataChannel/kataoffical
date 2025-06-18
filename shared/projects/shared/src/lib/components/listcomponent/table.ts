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
import { SearchfilterComponent } from '../searchfilter/searchfilter';
import { memoize } from '../../utils/decorators';

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
  @Input() columnsToShowLength: string[] = [];
  @Input() columnsToShowNestedObject: Record<string, string> = {};
  @Input() columnsToLoopArrayObject: { column: string, key: string }[] = [];
  @Output() toggleColumnEvent = new EventEmitter<any>();
  @Output() filterColumnsEvent = new EventEmitter<any>();
  @Output() updateDisplayedColumnsEvent = new EventEmitter<void>();
  @Output() outFilterEvent = new EventEmitter<any>();
  @Output() addToEditEvent = new EventEmitter<any>();
  @Output() goToDetailEvent = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @memoize()
  FilterHeaderColumn(list: any, column: any) {
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

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null && !this.isArray(value);
  }

  shouldShowLength(column: string): boolean {
    return this.columnsToShowLength.includes(column);
  }

  shouldShowNestedObject(column: string): boolean {
    return column in this.columnsToShowNestedObject;
  }

  getNestedObjectKey(column: string): string {
    return this.columnsToShowNestedObject[column] || 'name';
  }

  shouldLoopArrayObject(column: string): boolean {
    return this.columnsToLoopArrayObject.some(c => c.column === column);
  }

  getLoopArrayObjectKey(column: string): string {
    const config = this.columnsToLoopArrayObject.find(c => c.column === column);
    return config ? config.key : 'name';
  }

  displayNestedObject(item: any, key: string): string {
    if (!this.isObject(item)) return '';
    return this.getNestedProperty(item, key);
  }

  displayArrayObject(item: any, key: string): string {
    if (this.isArray(item)) {
      return item.map((subItem: any) => this.displayItem(subItem, key)).join('; ');
    }
    return this.displayItem(item, key);
  }

  displayItem(item: any, key: string = 'name'): string {
    if (this.isArray(item)) {
      return item.map((subItem: any) => this.displayItem(subItem, key)).join('; ');
    } else if (this.isObject(item)) {
      return this.getNestedProperty(item, key) ||
             item.name || item.title || item.label || item.id ||
             Object.entries(item)
                   .filter(([k]) => !['id'].includes(k))
                   .map(([k, v]) => `${k}: ${v}`)
                   .join('; ') || JSON.stringify(item);
    }
    return String(item);
  }

  getNestedProperty(obj: any, key: string): string {
    if (!obj || !key) return '';
    const keys = key.split('.');
    let value = obj;
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return '';
      }
    }
    return String(value || '');
  }
}