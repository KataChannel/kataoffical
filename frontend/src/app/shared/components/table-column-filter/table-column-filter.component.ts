import { Component, Input, Output, EventEmitter, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';

/**
 * Reusable Table Column Filter Component
 * 
 * Features:
 * - Search within filter values
 * - Select all / Deselect all
 * - Multi-select with checkboxes
 * - Custom column formatters
 * - Memoized filter values for performance
 * 
 * Usage:
 * <app-table-column-filter
 *   [column]="'status'"
 *   [columnName]="'Trạng Thái'"
 *   [dataSource]="dataSource"
 *   [selectedItems]="selectedFilters"
 *   [customFormatters]="formatters"
 *   (filterApplied)="onFilterApplied($event)"
 *   (filterCleared)="onFilterCleared()"
 * ></app-table-column-filter>
 */
@Component({
  selector: 'app-table-column-filter',
  templateUrl: './table-column-filter.component.html',
  styleUrls: ['./table-column-filter.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    DatePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableColumnFilterComponent {
  // Required inputs
  @Input({ required: true }) column!: string;
  @Input({ required: true }) columnName!: string;
  @Input({ required: true }) dataSource!: MatTableDataSource<any>;
  
  // Optional inputs
  @Input() selectedItems: any[] = [];
  @Input() customFormatters: Record<string, (value: any) => string> = {};
  
  // Outputs
  @Output() filterApplied = new EventEmitter<{
    column: string;
    selectedItems: any[];
  }>();
  @Output() filterCleared = new EventEmitter<void>();
  @Output() filterReset = new EventEmitter<void>();
  
  // Internal state
  searchQuery = signal<string>('');
  tempSelectedItems = signal<Set<any>>(new Set());
  
  // Computed values
  uniqueValues = computed(() => {
    return this.getUniqueColumnValues(
      this.dataSource?.filteredData || [],
      this.column
    );
  });
  
  filteredValues = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.uniqueValues();
    
    return this.uniqueValues().filter(item => {
      const value = this.formatValue(item[this.column]);
      return value.toLowerCase().includes(query);
    });
  });
  
  selectedCount = computed(() => this.tempSelectedItems().size);
  
  isAllSelected = computed(() => {
    const filtered = this.filteredValues();
    return filtered.length > 0 && 
           filtered.every(item => this.tempSelectedItems().has(item));
  });
  
  /**
   * Get unique values for a column
   * Memoized for performance
   */
  private getUniqueColumnValues(data: any[], column: string): any[] {
    const uniqueMap = new Map<any, any>();
    
    data.forEach(item => {
      const value = item[column];
      if (value !== null && value !== undefined && !uniqueMap.has(value)) {
        uniqueMap.set(value, item);
      }
    });
    
    return Array.from(uniqueMap.values());
  }
  
  /**
   * Format value for display using custom formatters or defaults
   */
  formatValue(value: any): string {
    if (value === null || value === undefined) return 'Trống';
    
    // Use custom formatter if exists
    if (this.customFormatters[this.column]) {
      return this.customFormatters[this.column](value);
    }
    
    // Default formatters
    if (value instanceof Date || this.isDateString(value)) {
      return new Date(value).toLocaleDateString('vi-VN');
    }
    
    return String(value);
  }
  
  /**
   * Check if string is a date
   */
  private isDateString(value: any): boolean {
    if (typeof value !== 'string') return false;
    const date = new Date(value);
    return !isNaN(date.getTime());
  }
  
  /**
   * Handle search input
   */
  onSearch(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }
  
  /**
   * Toggle item selection
   */
  toggleItem(item: any): void {
    const currentSet = new Set(this.tempSelectedItems());
    
    if (currentSet.has(item)) {
      currentSet.delete(item);
    } else {
      currentSet.add(item);
    }
    
    this.tempSelectedItems.set(currentSet);
  }
  
  /**
   * Check if item is selected
   */
  isItemSelected(item: any): boolean {
    return this.tempSelectedItems().has(item);
  }
  
  /**
   * Select all filtered items
   */
  selectAll(): void {
    const currentSet = new Set(this.tempSelectedItems());
    this.filteredValues().forEach(item => currentSet.add(item));
    this.tempSelectedItems.set(currentSet);
  }
  
  /**
   * Clear all selected items
   */
  clearSelection(): void {
    this.tempSelectedItems.set(new Set());
    this.searchQuery.set('');
  }
  
  /**
   * Reset to initial state
   */
  resetFilter(): void {
    this.clearSelection();
    this.filterReset.emit();
  }
  
  /**
   * Apply filter and close menu
   */
  applyFilter(menuTrigger: MatMenuTrigger): void {
    const selectedArray = Array.from(this.tempSelectedItems());
    
    this.filterApplied.emit({
      column: this.column,
      selectedItems: selectedArray
    });
    
    menuTrigger.closeMenu();
  }
  
  /**
   * Initialize temp selection when menu opens
   */
  onMenuOpened(): void {
    this.tempSelectedItems.set(new Set(this.selectedItems));
    this.searchQuery.set('');
  }
  
  /**
   * Track by function for ngFor
   */
  trackByFn(index: number, item: any): any {
    return item.id || item[this.column] || index;
  }
}
