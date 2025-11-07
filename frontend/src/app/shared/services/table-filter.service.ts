import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

/**
 * Service for managing table column filters
 * 
 * Features:
 * - Centralized filter logic
 * - Multi-column filtering
 * - Filter state management
 * - Reusable across components
 */
@Injectable({
  providedIn: 'root'
})
export class TableFilterService {
  // Store active filters per table
  private activeFilters = new Map<string, Map<string, Set<any>>>();
  
  /**
   * Get unique values for a column with memoization
   */
  getUniqueColumnValues(data: any[], column: string): any[] {
    if (!data || !data.length) return [];
    
    const uniqueMap = new Map<any, any>();
    
    data.forEach(item => {
      const value = item[column];
      
      // Skip null/undefined but keep falsy values like 0, false
      if (value !== null && value !== undefined) {
        const key = this.getValueKey(value);
        if (!uniqueMap.has(key)) {
          uniqueMap.set(key, item);
        }
      }
    });
    
    return Array.from(uniqueMap.values());
  }
  
  /**
   * Get a consistent key for a value (handles objects, dates, etc)
   */
  private getValueKey(value: any): string {
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  }
  
  /**
   * Apply filters to a data source
   */
  applyFilters(
    dataSource: MatTableDataSource<any>,
    tableId: string,
    column: string,
    selectedItems: any[]
  ): void {
    // Get or create filter map for this table
    if (!this.activeFilters.has(tableId)) {
      this.activeFilters.set(tableId, new Map());
    }
    
    const tableFilters = this.activeFilters.get(tableId)!;
    
    // Update filter for this column
    if (selectedItems.length > 0) {
      tableFilters.set(column, new Set(selectedItems));
    } else {
      tableFilters.delete(column);
    }
    
    // Apply combined filter predicate
    dataSource.filterPredicate = this.createFilterPredicate(tableFilters);
    
    // Trigger filter update
    dataSource.filter = String(Date.now());
  }
  
  /**
   * Create a filter predicate that handles multiple column filters
   */
  private createFilterPredicate(
    filters: Map<string, Set<any>>
  ): (data: any, filter: string) => boolean {
    return (data: any) => {
      // If no filters, show all
      if (filters.size === 0) return true;
      
      // Check all active filters
      for (const [column, allowedValues] of filters.entries()) {
        const cellValue = data[column];
        
        // Check if current value matches any allowed value
        let matched = false;
        for (const allowedValue of allowedValues) {
          if (this.valuesMatch(cellValue, allowedValue[column])) {
            matched = true;
            break;
          }
        }
        
        // If any filter doesn't match, exclude this row
        if (!matched) return false;
      }
      
      // All filters matched
      return true;
    };
  }
  
  /**
   * Check if two values match (handles different types)
   */
  private valuesMatch(value1: any, value2: any): boolean {
    // Exact match
    if (value1 === value2) return true;
    
    // Date comparison
    if (value1 instanceof Date && value2 instanceof Date) {
      return value1.getTime() === value2.getTime();
    }
    
    // String comparison (case-insensitive)
    if (typeof value1 === 'string' && typeof value2 === 'string') {
      return value1.toLowerCase() === value2.toLowerCase();
    }
    
    // Object comparison (deep)
    if (typeof value1 === 'object' && typeof value2 === 'object') {
      return JSON.stringify(value1) === JSON.stringify(value2);
    }
    
    return false;
  }
  
  /**
   * Clear all filters for a table
   */
  clearAllFilters(tableId: string, dataSource: MatTableDataSource<any>): void {
    this.activeFilters.delete(tableId);
    dataSource.filterPredicate = () => true;
    dataSource.filter = '';
  }
  
  /**
   * Clear filter for a specific column
   */
  clearColumnFilter(
    tableId: string,
    column: string,
    dataSource: MatTableDataSource<any>
  ): void {
    const tableFilters = this.activeFilters.get(tableId);
    if (!tableFilters) return;
    
    tableFilters.delete(column);
    
    if (tableFilters.size === 0) {
      this.clearAllFilters(tableId, dataSource);
    } else {
      dataSource.filterPredicate = this.createFilterPredicate(tableFilters);
      dataSource.filter = String(Date.now());
    }
  }
  
  /**
   * Get active filters for a table
   */
  getActiveFilters(tableId: string): Map<string, Set<any>> {
    return this.activeFilters.get(tableId) || new Map();
  }
  
  /**
   * Get selected items for a specific column
   */
  getColumnFilter(tableId: string, column: string): any[] {
    const tableFilters = this.activeFilters.get(tableId);
    if (!tableFilters) return [];
    
    const columnFilter = tableFilters.get(column);
    return columnFilter ? Array.from(columnFilter) : [];
  }
  
  /**
   * Check if any filters are active for a table
   */
  hasActiveFilters(tableId: string): boolean {
    const filters = this.activeFilters.get(tableId);
    return filters ? filters.size > 0 : false;
  }
  
  /**
   * Get count of active filters for a table
   */
  getActiveFilterCount(tableId: string): number {
    const filters = this.activeFilters.get(tableId);
    return filters ? filters.size : 0;
  }
  
  /**
   * Export filters state (for persistence)
   */
  exportFilters(tableId: string): any {
    const tableFilters = this.activeFilters.get(tableId);
    if (!tableFilters) return null;
    
    const exported: any = {};
    tableFilters.forEach((values, column) => {
      exported[column] = Array.from(values);
    });
    
    return exported;
  }
  
  /**
   * Import filters state (from persistence)
   */
  importFilters(
    tableId: string,
    filters: any,
    dataSource: MatTableDataSource<any>
  ): void {
    if (!filters) return;
    
    const tableFilters = new Map<string, Set<any>>();
    
    Object.entries(filters).forEach(([column, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        tableFilters.set(column, new Set(values));
      }
    });
    
    this.activeFilters.set(tableId, tableFilters);
    
    if (tableFilters.size > 0) {
      dataSource.filterPredicate = this.createFilterPredicate(tableFilters);
      dataSource.filter = String(Date.now());
    }
  }
}
