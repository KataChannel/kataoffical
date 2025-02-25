// import { CommonModule } from '@angular/common';
// import { Component, computed, ViewChild } from '@angular/core';
// import { MatIconModule } from '@angular/material/icon';
// import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
// import { MatSortModule, MatSort } from '@angular/material/sort';
// import { MatTableModule, MatTableDataSource } from '@angular/material/table';

// @Component({
//   selector: 'app-dynamictable',
//   imports: [
//     CommonModule,
//     MatTableModule,
//     MatPaginatorModule,
//     MatSortModule,
//     MatIconModule
//   ],
//   templateUrl: './dynamictable.component.html',
//   styleUrl: './dynamictable.component.scss'
// })
// export class DynamictableComponent {
//   displayedColumns: string[] = [
//     'STT',
//     'title',
//     'masp',
//     'parent',
//     'order',
//     'isActive',
//     'createdAt',
//     'updatedAt',
//   ];
//   ColumnName: any = {
//     STT: 'STT',
//     title: 'Tiêu Đề',
//     masp: 'Mã SP',
//     slug: 'Đường Dẫn',
//     order: 'Thứ Tự',
//     isActive: 'Trạng Thái',
//     createdAt:'Ngày Tạo',
//     updatedAt:'Ngày Cập Nhật'
//   };
//   FilterColumns: any[] = JSON.parse(
//     localStorage.getItem('BanggiaColFilter') || '[]'
//   );
//   Columns: any[] = [];
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;
//   dataSource = computed(() => {
//       const ds = new MatTableDataSource(this.Listbanggia());
//       ds.filterPredicate = this.createFilter();
//       ds.paginator = this.paginator;
//       ds.sort = this.sort;
//       return ds;
//     });
// constructor() {
//       this.displayedColumns.forEach(column => {
//         this.filterValues[column] = '';
//       });
//     }   
//     createFilter(): (data: any, filter: string) => boolean {
//       return (data, filter) => {
//         const filterObject = JSON.parse(filter);
//         let isMatch = true;
//         this.displayedColumns.forEach(column => {
//           if (filterObject[column]) {
//             const value = data[column] ? data[column].toString().toLowerCase() : '';
//             isMatch = isMatch && value.includes(filterObject[column].toLowerCase());
//           }
//         });
//         return isMatch;
//       };
//     }
//     applyFilter() {
//       this.dataSource().filter = JSON.stringify(this.filterValues);
//     }
//     async ngOnInit(): Promise<void> {    
//       await this._BanggiaService.getAllBanggia();
//       this.CountItem = this.Listbanggia().length;
//       this.initializeColumns();
//       this.setupDrawer();
//       this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
//       this.paginator._intl.nextPageLabel = 'Tiếp Theo';
//       this.paginator._intl.previousPageLabel = 'Về Trước';
//       this.paginator._intl.firstPageLabel = 'Trang Đầu';
//       this.paginator._intl.lastPageLabel = 'Trang Cuối';
//     }
//     private initializeColumns(): void {
//       this.Columns = Object.keys(this.ColumnName).map((key) => ({
//         key,
//         value: this.ColumnName[key],
//         isShow: true,
//       }));
//       if (this.FilterColumns.length === 0) {
//         this.FilterColumns = this.Columns;
//       } else {
//         localStorage.setItem('BanggiaColFilter',JSON.stringify(this.FilterColumns)
//         );
//       }
//       this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map(
//         (item) => item.key
//       );
//       this.ColumnName = this.FilterColumns.reduce((obj, item) => {
//         if (item.isShow) obj[item.key] = item.value;
//         return obj;
//       }, {} as Record<string, string>);
//     }
//     toggleColumn(item: any): void {
//       const column = this.FilterColumns.find((v) => v.key === item.key);
//       if (column) {
//         column.isShow = !column.isShow;
//         this.updateDisplayedColumns();
//       }
//     }
//     private updateDisplayedColumns(): void {
//       this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map(
//         (item) => item.key
//       );
//       this.ColumnName = this.FilterColumns.reduce((obj, item) => {
//         if (item.isShow) obj[item.key] = item.value;
//         return obj;
//       }, {} as Record<string, string>);
//       localStorage.setItem('BanggiaColFilter',JSON.stringify(this.FilterColumns)
//       );
//     }
//     doFilterColumns(event: any): void {
//       const query = event.target.value.toLowerCase();
//       this.FilterColumns = this.Columns.filter((v) =>
//         v.value.toLowerCase().includes(query)
//       );
//     }
// }
