// import { Component, Inject, OnInit, signal, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatSelectModule } from '@angular/material/select';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatTabsModule } from '@angular/material/tabs';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { GraphqlService } from '../../../shared/services/graphql.service';
// import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
// import { Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';

// export interface SearchCriteria {
//   keyword?: string;
//   model?: string;
//   searchFields?: string[];
//   dateRange?: {
//     from?: Date;
//     to?: Date;
//     field?: string;
//   };
//   filters?: { [key: string]: any };
//   limit?: number;
// }

// export interface SearchResult {
//   model: string;
//   data: any[];
//   total: number;
//   searchTime: number;
// }

// @Component({
//   selector: 'app-advanced-search-dialog',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatDialogModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatIconModule,
//     MatSelectModule,
//     MatDatepickerModule,
//     MatNativeDateModule,
//     MatTabsModule,
//     MatChipsModule,
//     MatAutocompleteModule,
//     MatCheckboxModule
//   ],
//   templateUrl: './advanced-search-dialog.component.html',
//   styleUrls: ['./advanced-search-dialog.component.scss']
// })
// export class AdvancedSearchDialogComponent implements OnInit {
//   private graphqlService = inject(GraphqlService);
//   private router = inject(Router);
//   private snackBar = inject(MatSnackBar);

//   // Search state
//   searchCriteria: SearchCriteria = {
//     keyword: '',
//     limit: 20
//   };
  
//   searchResults = signal<SearchResult[]>([]);
//   isSearching = signal<boolean>(false);
//   searchHistory = signal<string[]>([]);
  
//   // Available models for search
//   availableModels = [
//     { value: 'sanpham', label: 'Sản Phẩm', icon: 'inventory_2', fields: ['ten', 'ma', 'mota'] },
//     { value: 'khachhang', label: 'Khách Hàng', icon: 'people', fields: ['ten', 'ma', 'email', 'dienthoai'] },
//     { value: 'donhang', label: 'Đơn Hàng', icon: 'receipt_long', fields: ['ma', 'ghichu'] },
//     { value: 'phieukho', label: 'Phiếu Kho', icon: 'warehouse', fields: ['ma', 'ghichu'] },
//     { value: 'nhomkhachhang', label: 'Nhóm KH', icon: 'group', fields: ['ten', 'mota'] },
//     { value: 'user', label: 'Người Dùng', icon: 'person', fields: ['username', 'email'] },
//     { value: 'chotkho', label: 'Chốt Kho', icon: 'assignment', fields: ['title', 'codeId', 'ghichu'] },
//   ];

//   selectedModels = signal<string[]>([]);
//   quickSearchSuggestions = signal<string[]>([]);

//   constructor(
//     public dialogRef: MatDialogRef<AdvancedSearchDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: { initialKeyword?: string }
//   ) {
//     if (data?.initialKeyword) {
//       this.searchCriteria.keyword = data.initialKeyword;
//     }
//   }

//   ngOnInit() {
//     this.loadSearchHistory();
//     this.generateQuickSuggestions();
    
//     // Auto-search if initial keyword provided
//     if (this.searchCriteria.keyword) {
//       this.performSearch();
//     }
//   }

//   private loadSearchHistory() {
//     const history = localStorage.getItem('admin_search_history');
//     if (history) {
//       this.searchHistory.set(JSON.parse(history));
//     }
//   }

//   private saveSearchHistory() {
//     if (this.searchCriteria.keyword && this.searchCriteria.keyword.trim()) {
//       const current = this.searchHistory();
//       const updated = [this.searchCriteria.keyword, ...current.filter(h => h !== this.searchCriteria.keyword)].slice(0, 10);
//       this.searchHistory.set(updated);
//       localStorage.setItem('admin_search_history', JSON.stringify(updated));
//     }
//   }

//   private generateQuickSuggestions() {
//     const suggestions = [
//       'Sản phẩm mới', 'Khách hàng VIP', 'Đơn hàng hôm nay',
//       'Hết hàng', 'Chưa thanh toán', 'Đang giao hàng'
//     ];
//     this.quickSearchSuggestions.set(suggestions);
//   }

//   onModelSelectionChange(model: string, checked: boolean) {
//     const current = this.selectedModels();
//     if (checked) {
//       this.selectedModels.set([...current, model]);
//     } else {
//       this.selectedModels.set(current.filter(m => m !== model));
//     }
//   }

//   useQuickSearch(suggestion: string) {
//     this.searchCriteria.keyword = suggestion;
//     this.performSearch();
//   }

//   useHistorySearch(keyword: string) {
//     this.searchCriteria.keyword = keyword;
//     this.performSearch();
//   }

//   async performSearch() {
//     if (!this.searchCriteria.keyword?.trim()) {
//       this.snackBar.open('Vui lòng nhập từ khóa tìm kiếm', 'Đóng', { duration: 2000 });
//       return;
//     }

//     this.isSearching.set(true);
//     this.saveSearchHistory();
    
//     try {
//       const results: SearchResult[] = [];
//       const modelsToSearch = this.selectedModels().length > 0 ? this.selectedModels() : this.availableModels.map(m => m.value);
      
//       const startTime = Date.now();

//       for (const modelName of modelsToSearch) {
//         const modelConfig = this.availableModels.find(m => m.value === modelName);
//         if (!modelConfig) continue;

//         try {
//           const searchData = await this.searchInModel(modelName, modelConfig.fields);
//           if (searchData.length > 0) {
//             results.push({
//               model: modelName,
//               data: searchData,
//               total: searchData.length,
//               searchTime: Date.now() - startTime
//             });
//           }
//         } catch (error) {
//           console.error(`Error searching in ${modelName}:`, error);
//         }
//       }

//       this.searchResults.set(results);
      
//       if (results.length === 0) {
//         this.snackBar.open('Không tìm thấy kết quả nào', 'Đóng', { duration: 3000 });
//       } else {
//         const totalResults = results.reduce((sum, r) => sum + r.total, 0);
//         this.snackBar.open(`Tìm thấy ${totalResults} kết quả`, 'Đóng', { duration: 2000 });
//       }
      
//     } catch (error) {
//       console.error('Search error:', error);
//       this.snackBar.open('Lỗi khi tìm kiếm', 'Đóng', { duration: 3000 });
//     } finally {
//       this.isSearching.set(false);
//     }
//   }

//   private async searchInModel(modelName: string, searchFields: string[]): Promise<any[]> {
//     const keyword = this.searchCriteria.keyword?.trim().toLowerCase();
//     if (!keyword) return [];

//     // Build dynamic where clause for text search
//     const orConditions = searchFields.map(field => ({
//       [field]: { contains: keyword, mode: 'insensitive' }
//     }));

//     const searchOptions: any = {
//       where: { OR: orConditions },
//       take: this.searchCriteria.limit || 20,
//       orderBy: [{ createdAt: 'desc' }]
//     };

//     // Add select fields based on model
//     const selectFields = this.getSelectFieldsForModel(modelName);
//     if (selectFields) {
//       searchOptions.select = selectFields;
//     }

//     return await this.graphqlService.findMany(modelName, searchOptions);
//   }

//   private getSelectFieldsForModel(modelName: string): any {
//     const commonFields = { id: true, createdAt: true, updatedAt: true };
    
//     switch (modelName) {
//       case 'sanpham':
//         return { ...commonFields, ten: true, ma: true, dongia: true, donvitinh: true, trangthai: true };
//       case 'khachhang':
//         return { ...commonFields, ten: true, ma: true, email: true, dienthoai: true, diachi: true };
//       case 'donhang':
//         return { ...commonFields, ma: true, tongtien: true, trangthai: true, ngaytao: true };
//       case 'phieukho':
//         return { ...commonFields, ma: true, loai: true, trangthai: true, ngayxuat: true };
//       case 'nhomkhachhang':
//         return { ...commonFields, ten: true, mota: true, trangthai: true };
//       case 'user':
//         return { ...commonFields, username: true, email: true, isActive: true };
//       case 'chotkho':
//         return { ...commonFields, title: true, codeId: true, ngaychot: true };
//       default:
//         return commonFields;
//     }
//   }

//   navigateToResult(modelName: string, item: any) {
//     const routes: { [key: string]: string } = {
//       'sanpham': `/admin/sanpham/detail/${item.id}`,
//       'khachhang': `/admin/khachhang/detail/${item.id}`,
//       'donhang': `/admin/donhang/detail/${item.id}`,
//       'phieukho': `/admin/phieukho/detail/${item.id}`,
//       'nhomkhachhang': `/admin/nhomkhachhang/detail/${item.id}`,
//       'user': `/admin/user/detail/${item.id}`,
//       'chotkho': `/admin/chotkho/detail/${item.id}`,
//     };

//     const route = routes[modelName] || `/admin/${modelName}`;
//     this.router.navigate([route]);
//     this.dialogRef.close();
//   }

//   getModelConfig(modelName: string) {
//     return this.availableModels.find(m => m.value === modelName);
//   }

//   getDisplayValue(item: any, modelName: string): string {
//     switch (modelName) {
//       case 'sanpham':
//         return `${item.ten || 'N/A'} (${item.ma || 'N/A'})`;
//       case 'khachhang':
//         return `${item.ten || 'N/A'} - ${item.dienthoai || item.email || 'N/A'}`;
//       case 'donhang':
//         return `${item.ma || 'N/A'} - ${item.tongtien?.toLocaleString('vi-VN') || 0} VNĐ`;
//       case 'phieukho':
//         return `${item.ma || 'N/A'} - ${item.loai || 'N/A'}`;
//       case 'chotkho':
//         return `${item.title || 'N/A'} (${item.codeId || 'N/A'})`;
//       case 'user':
//         return `${item.username || 'N/A'} - ${item.email || 'N/A'}`;
//       default:
//         return item.ten || item.title || item.ma || item.id || 'N/A';
//     }
//   }

//   clearSearch() {
//     this.searchCriteria.keyword = '';
//     this.searchResults.set([]);
//     this.selectedModels.set([]);
//   }

//   closeDialog() {
//     this.dialogRef.close();
//   }
// }
