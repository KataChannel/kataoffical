// import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { GenId } from '../../utils/shared.utils';
// // import { v4 as uuidv4 } from 'uuid';

// // Define the structure for a single row of table data
// interface TableData {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
//   status: 'Active' | 'Inactive';
// }


// // Define sort order types
// type SortOrder = 'asc' | 'desc' | null;

// // Define the structure for sort configuration
// interface SortConfig {
//   key: string | null;
//   order: SortOrder;
// }

// // Define the structure for tracking which cell is being edited
// interface EditingCell {
//   rowId: number;
//   column: string;
// }

// // Define the structure for pagination information
// interface PaginationInfo {
//   currentPage: number;
//   itemsPerPage: number;
//   totalItems: number;
//   totalPages: number;
// }

// // Define the structure for a single filter criterion
// interface FilterCriterion {
//   id: string;
//   columnKey: string;
//   operator: string;
//   value: string;
// }

// // Define column structure
// interface Column {
//   key: string;
//   label: string;
//   width: number;
//   filterable: boolean;
//   dataType: 'string' | 'select' | 'number';
//   options?: string[];
// }
// @Component({
//   selector: 'kata-table',
//   imports: [
//     CommonModule, 
//     FormsModule,
//   ],
//   templateUrl: './katatable.component.html',
//   styleUrls: ['./katatable.component.scss'],
// })
// export class KataTableComponent {
//   @ViewChild('tableRef') tableRef!: ElementRef<HTMLTableElement>;
//   @Input() Title: string = 'Bảng Dữ Liệu';
//   @Input() Desc: string = 'Mô Tả bảng dữ liệu';
//   // Initial data
//   initialData: TableData[] = [
//     { id: 1, name: 'Nguyen Van An', email: 'an.nguyen@email.com', role: 'Developer', status: 'Active' },
//     { id: 2, name: 'Tran Thi Binh', email: 'binh.tran@email.com', role: 'Designer', status: 'Active' },
//     { id: 3, name: 'Le Hoang Cuong', email: 'cuong.le@email.com', role: 'Manager', status: 'Inactive' },
//     { id: 4, name: 'Pham Thi Dung', email: 'dung.pham@email.com', role: 'Tester', status: 'Active' },
//     { id: 5, name: 'Hoang Minh Lan', email: 'lan.hoang@email.com', role: 'Developer', status: 'Active' },
//     { id: 6, name: 'Vo Thi Em', email: 'em.vo@email.com', role: 'Designer', status: 'Inactive' },
//     { id: 7, name: 'Do Van Phuc', email: 'phuc.do@email.com', role: 'Manager', status: 'Active' },
//     { id: 8, name: 'Bui Thi Giang', email: 'giang.bui@email.com', role: 'Tester', status: 'Active' },
//     { id: 9, name: 'Ly Van Hai', email: 'hai.ly@email.com', role: 'Developer', status: 'Inactive' },
//     { id: 10, name: 'Phan Thi Inh', email: 'inh.phan@email.com', role: 'Designer', status: 'Active' },
//     { id: 11, name: 'Ngo Van Khang', email: 'khang.ngo@email.com', role: 'Manager', status: 'Active' },
//     { id: 12, name: 'Dinh Thi Lan', email: 'lan.dinh@email.com', role: 'Tester', status: 'Inactive' },
//     { id: 13, name: 'Vu Van Minh', email: 'minh.vu@email.com', role: 'Developer', status: 'Active' },
//     { id: 14, name: 'To Thi Nga', email: 'nga.to@email.com', role: 'Designer', status: 'Active' },
//     { id: 15, name: 'Luu Van Oanh', email: 'oanh.luu@email.com', role: 'Manager', status: 'Inactive' },
//   ];

//   // State properties
//   data: TableData[] = [...this.initialData];
//   searchTerm: string = '';
//   filterCriteria: FilterCriterion[] = [];
//   newFilterColumn: string = 'name';
//   newFilterOperator: string = 'contains';
//   newFilterValue: string = '';
//   sortConfig: SortConfig = { key: null, order: null };
//   editingCell: EditingCell | null = null;
//   editValue: string = '';
//   currentPage: number = 1;
//   itemsPerPage: number = 5;
//   selectedRows: Set<number> = new Set();
//   selectAll: boolean = false;
//   showBulkActions: boolean = false;

//   // Column widths
//   columnWidths: any = {
//     select: 50,
//     name: 200,
//     email: 250,
//     role: 150,
//     status: 120,
//   };

//   // Resize state
//   isResizing: string | null = null;
//   startX: number = 0;
//   startWidth: number = 0;

//   // Operators
//   operators: { [key: string]: { label: string; value: string; apply: (itemVal: any, filterVal: string) => boolean }[] } = {
//     string: [
//       { label: 'Chứa', value: 'contains', apply: (itemVal: string, filterVal: string) => itemVal.toLowerCase().includes(filterVal.toLowerCase()) },
//       { label: 'Bằng', value: 'equals', apply: (itemVal: string, filterVal: string) => itemVal.toLowerCase() === filterVal.toLowerCase() },
//       { label: 'Bắt đầu bằng', value: 'startsWith', apply: (itemVal: string, filterVal: string) => itemVal.toLowerCase().startsWith(filterVal.toLowerCase()) },
//       { label: 'Kết thúc bằng', value: 'endsWith', apply: (itemVal: string, filterVal: string) => itemVal.toLowerCase().endsWith(filterVal.toLowerCase()) },
//     ],
//     select: [
//       { label: 'Bằng', value: 'equals', apply: (itemVal: string, filterVal: string) => itemVal.toLowerCase() === filterVal.toLowerCase() },
//     ],
//     number: [
//       { label: 'Bằng', value: 'equals', apply: (itemVal: number, filterVal: string) => itemVal === Number(filterVal) },
//       { label: 'Lớn hơn', value: 'greaterThan', apply: (itemVal: number, filterVal: string) => itemVal > Number(filterVal) },
//       { label: 'Nhỏ hơn', value: 'lessThan', apply: (itemVal: number, filterVal: string) => itemVal < Number(filterVal) },
//     ],
//   };

//   // Columns
//   get columns(): Column[] {
//     return [
//       { key: 'select', label: '', width: this.columnWidths.select, filterable: false, dataType: 'string' },
//       { key: 'name', label: 'Tên', width: this.columnWidths.name, filterable: true, dataType: 'string' },
//       { key: 'email', label: 'Email', width: this.columnWidths.email, filterable: true, dataType: 'string' },
//       { key: 'role', label: 'Vai trò', width: this.columnWidths.role, filterable: true, dataType: 'select', options: this.uniqueRoles },
//       { key: 'status', label: 'Trạng thái', width: this.columnWidths.status, filterable: true, dataType: 'select', options: ['Active', 'Inactive'] },
//     ];
//   }

//   // Unique roles
//   get uniqueRoles(): string[] {
//     return Array.from(new Set(this.initialData.map(item => item.role)));
//   }

//   // Available operators
//   get availableOperators() {
//     const selectedCol = this.columns.find(col => col.key === this.newFilterColumn);
//     return selectedCol ? this.operators[selectedCol.dataType] : [];
//   }

//   // Filtered and sorted data
//   get filteredAndSortedData(): TableData[] {
//     let filteredData = this.data.filter(item => {
//       const matchesSearch =
//         item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         item.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         item.role.toLowerCase().includes(this.searchTerm.toLowerCase());

//       const matchesFilterCriteria = this.filterCriteria.every(criterion => {
//         const columnDefinition = this.columns.find(col => col.key === criterion.columnKey);
//         if (!columnDefinition) return false;

//         const itemValue = (item as any)[criterion.columnKey];
//         const operatorDefinition = this.operators[columnDefinition.dataType].find(op => op.value === criterion.operator);

//         if (!operatorDefinition) return false;

//         return operatorDefinition.apply(itemValue, criterion.value);
//       });

//       return matchesSearch && matchesFilterCriteria;
//     });

//     if (this.sortConfig.key && this.sortConfig.order) {
//       filteredData.sort((a, b) => {
//         const aValue = a[this.sortConfig.key as keyof TableData];
//         const bValue = b[this.sortConfig.key as keyof TableData];

//         if (aValue < bValue) return this.sortConfig.order === 'asc' ? -1 : 1;
//         if (aValue > bValue) return this.sortConfig.order === 'asc' ? 1 : -1;

//         return 0;
//       });
//     }

//     return filteredData;
//   }




//   // Pagination data
//   get paginatedData(): TableData[] {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     return this.filteredAndSortedData.slice(startIndex, startIndex + this.itemsPerPage);
//   }

//   // Pagination info
//   get paginationInfo(): PaginationInfo {
//     return {
//       currentPage: this.currentPage,
//       itemsPerPage: this.itemsPerPage,
//       totalItems: this.filteredAndSortedData.length,
//       totalPages: Math.ceil(this.filteredAndSortedData.length / this.itemsPerPage),
//     };
//   }

//   // Start and end index for display
//   get startIndex(): number {
//     return (this.currentPage - 1) * this.itemsPerPage;
//   }

//   get endIndex(): number {
//     return Math.min(this.startIndex + this.itemsPerPage, this.paginationInfo.totalItems);
//   }

//   // ngOnInit(): void {
//   //   // Initialize component
//   // }

//   // ngOnDestroy(): void {
//   //   // Clean up event listeners
//   //   document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
//   //   document.removeEventListener('mouseup', this.handleMouseUp.bind(this));
//   // }

//   // Resize handlers
//   handleMouseDown(event: MouseEvent, column: string): void {
//     event.preventDefault();
//     this.isResizing = column;
//     this.startX = event.clientX;
//     this.startWidth = this.columnWidths[column];
//     document.addEventListener('mousemove', this.handleMouseMove.bind(this));
//     document.addEventListener('mouseup', this.handleMouseUp.bind(this));
//     document.body.style.cursor = 'col-resize';
//     document.body.style.userSelect = 'none';
//   }

//   handleMouseMove(event: MouseEvent): void {
//     if (!this.isResizing) return;
//     const diff = event.clientX - this.startX;
//     const newWidth = Math.max(80, this.startWidth + diff);
//     this.columnWidths = { ...this.columnWidths, [this.isResizing]: newWidth };
//   }

//   handleMouseUp(): void {
//     this.isResizing = null;
//     document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
//     document.removeEventListener('mouseup', this.handleMouseUp.bind(this));
//     document.body.style.cursor = '';
//     document.body.style.userSelect = '';
//   }

//   // Sort handler
//   handleSort(key: string): void {
//     let order: SortOrder = 'asc';
//     if (this.sortConfig.key === key && this.sortConfig.order === 'asc') {
//       order = 'desc';
//     } else if (this.sortConfig.key === key && this.sortConfig.order === 'desc') {
//       order = null;
//     }
//     this.sortConfig = { key: order ? key : null, order };
//   }

//   // Cell editing handlers
//   handleCellClick(rowId: number, column: string, value: string): boolean {
//     if (column === 'status' || column === 'select') return false;
//     this.editingCell = { rowId, column };
//     this.editValue = value;
//     return true;
//   }

//   handleEditSubmit(): void {
//     if (this.editingCell) {
//       this.data = this.data.map(row => {
//         if (row.id === this.editingCell!.rowId) {
//           return { ...row, [this.editingCell!.column]: this.editValue };
//         }
//         return row;
//       });
//       this.editingCell = null;
//       this.editValue = '';
//     }
//   }

//   handleEditCancel(): void {
//     this.editingCell = null;
//     this.editValue = '';
//   }

//   handleKeyDown(event: any): void {
//     if (event.key === 'Enter') {
//       this.handleEditSubmit();
//     } else if (event.key === 'Escape') {
//       this.handleEditCancel();
//     }
//   }

//   // Status change handler
// handleStatusChange(rowId: number, newStatus: string): void {
//   this.data = this.data.map(row => {
//     if (row.id === rowId) {
//       return { ...row, status: newStatus as 'Active' | 'Inactive' };
//     } else {
//       return row;
//     }
//   });
// }

// // Selection handlers
// handleSelectRow(rowId: number): void {
//   const newSelectedRows = new Set(this.selectedRows);
//   if (newSelectedRows.has(rowId)) {
//     newSelectedRows.delete(rowId);
//   } else {
//     newSelectedRows.add(rowId);
//   }
//   this.selectedRows = newSelectedRows;
//   this.selectAll = false;
//   this.showBulkActions = this.selectedRows.size > 0;
// }

// handleSelectAll(): void {
//   if (this.selectAll) {
//     this.selectedRows = new Set();
//     this.selectAll = false;
//     this.showBulkActions = false;
//   } else {
//     const currentPageIds = this.paginatedData.map(row => row.id);
//     this.selectedRows = new Set(currentPageIds);
//     this.selectAll = true;
//     this.showBulkActions = true;
//   }
// }

// // Bulk actions
// handleBulkDelete(): void {
//   if (confirm(`Bạn có chắc muốn xóa ${this.selectedRows.size} mục đã chọn?`)) {
//     this.data = this.data.filter(row => !this.selectedRows.has(row.id));
//     this.selectedRows.clear();
//     this.selectAll = false;
//     this.showBulkActions = false;
//     const newTotalPages = Math.ceil(this.data.length / this.itemsPerPage);
//     if (this.currentPage > newTotalPages && newTotalPages > 0) {
//       this.currentPage = 1;
//     }
//   }
// }

// handleBulkStatusUpdate(newStatus: string): boolean {
//   this.data = this.data.map(row => {
//     if (this.selectedRows.has(row.id)) {
//       return { ...row, status: newStatus as 'Active' | 'Inactive' };
//     } else {
//       return row;
//     }
//   });
//   this.selectedRows.clear();
//   this.selectAll = false;
//   this.showBulkActions = false;
//   return true;
// }

//   // Filter handlers
//   handleAddFilter(): void {
//     if (this.newFilterColumn && this.newFilterOperator && this.newFilterValue) {
//       this.filterCriteria.push({
//         id: GenId(4,false),
//         columnKey: this.newFilterColumn,
//         operator: this.newFilterOperator,
//         value: this.newFilterValue
//       });
//       this.newFilterValue = '';
//       this.currentPage = 1;
//     }
//   }

//   handleRemoveFilter(id: string): void {
//     this.filterCriteria = this.filterCriteria.filter(criterion => criterion.id !== id);
//     this.currentPage = 1;
//   }

//   updateOperator(): void {
//     const selectedCol = this.columns.find(col => col.key === this.newFilterColumn);
//     if (selectedCol && selectedCol.dataType) {
//       switch (selectedCol.dataType) {
//         case 'string':
//           this.newFilterOperator = 'contains';
//           break;
//         case 'select':
//           this.newFilterOperator = 'equals';
//           break;
//         case 'number':
//           this.newFilterOperator = 'equals';
//           break;
//       }
//     }
//   }

//   // Pagination handlers
//   handlePageChange(page: any): void {
//     this.currentPage = page;
//     this.selectedRows.clear();
//     this.selectAll = false;
//     this.showBulkActions = false;
//   }

//   handleItemsPerPageChange(newItemsPerPage: number): void {
//     this.itemsPerPage = newItemsPerPage;
//     this.currentPage = 1;
//     this.selectedRows.clear();
//     this.selectAll = false;
//     this.showBulkActions = false;
//   }

//   resetPagination(): void {
//     this.currentPage = 1;
//   }

//   clearAllFilters(): void {
//     this.searchTerm = '';
//     this.filterCriteria = [];
//     this.currentPage = 1;
//   }

//   // Helper methods
//   getSortIconType(columnKey: string): string {
//     if (this.sortConfig.key !== columnKey) {
//       return 'unsorted';
//     }
//     return this.sortConfig.order === 'asc' ? 'asc' : 'desc';
//   }

//   getColumnLabel(columnKey: string): string {
//     return this.columns.find(col => col.key === columnKey)?.label || columnKey;
//   }

//   getOperatorLabel(operator: string): string {
//     const selectedCol = this.columns.find(col => col.key === this.newFilterColumn);
//     return selectedCol ? this.operators[selectedCol.dataType].find(op => op.value === operator)?.label || operator : operator;
//   }

//   getPaginationNumbers(): (number | string)[] {
//     const delta = 2;
//     const range: number[] = [];
//     const rangeWithDots: (number | string)[] = [];

//     for (let i = Math.max(2, this.currentPage - delta); i <= Math.min(this.paginationInfo.totalPages - 1, this.currentPage + delta); i++) {
//       range.push(i);
//     }

//     if (this.currentPage - delta > 2) {
//       rangeWithDots.push(1, '...');
//     } else {
//       rangeWithDots.push(1);
//     }

//     rangeWithDots.push(...range);

//     if (this.currentPage + delta < this.paginationInfo.totalPages - 1) {
//       rangeWithDots.push('...', this.paginationInfo.totalPages);
//     } else if (this.paginationInfo.totalPages > 1) {
//       rangeWithDots.push(this.paginationInfo.totalPages);
//     }

//     return rangeWithDots;
//   }  
//   FilterPipe(items: any[], filter: { [key: string]: any }): any[] {
//     if (!items || !filter) {
//       return items;
//     }

//     return items.filter(item => {
//       return Object.keys(filter).every((key) => {
//         return item[key] === filter[key];
//       });
//     });
//   }


// }
// // Custom pipe for filtering columns
// import { Pipe, PipeTransform } from '@angular/core';
// import { forwardRef } from "@angular/core";

// @Pipe({
//   name: 'filter',
//   standalone: true
// })
// export class FilterPipe implements PipeTransform {
//   transform(items: any[], filter: { [key: string]: any }): any[] {
//     if (!items || !filter) {
//       return items;
//     }

//     return items.filter(item => {
//       return Object.keys(filter).every((key) => {
//         return item[key] === filter[key];
//       });
//     });
//   }
// }