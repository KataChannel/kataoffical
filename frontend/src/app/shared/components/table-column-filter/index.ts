/**
 * Table Column Filter Module Exports
 * 
 * Centralized exports for table filtering functionality
 */

// Component
export { TableColumnFilterComponent } from './table-column-filter.component';

// Service
export { TableFilterService } from '../../services/table-filter.service';

// Types (if needed in future)
export interface ColumnFormatter {
  [column: string]: (value: any) => string;
}

export interface FilterAppliedEvent {
  column: string;
  selectedItems: any[];
}

export interface FilterState {
  [tableId: string]: {
    [column: string]: any[];
  };
}
