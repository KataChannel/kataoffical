import { Component, effect, inject, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { ListChotkhoComponent } from '../listchotkho/listchotkho';
import { ChotkhoService } from '../chotkho.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductSelectionDialogComponent, ProductSelectionResult } from '../product-selection-dialog/product-selection-dialog.component';
import { SearchfilterComponent } from '../../../shared/common/searchfilter123/searchfilter.component';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
import { SanphamService } from '../../sanpham/sanpham.service';
import * as XLSX from 'xlsx';
  @Component({
    selector: 'app-detailchotkho',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatIconModule,
      MatButtonModule,
      MatSelectModule,
      MatDialogModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatTableModule,
      MatSortModule,
      MatMenuModule,
      CommonModule,
      MatSlideToggleModule
    ],
    templateUrl: './detailchotkho.html',
    styleUrl: './detailchotkho.scss'
  })
  export class DetailChotkhoComponent {
    _ListChotkhoComponent:ListChotkhoComponent = inject(ListChotkhoComponent)
    _ChotkhoService:ChotkhoService = inject(ChotkhoService)
    _SanphamService: SanphamService = inject(SanphamService);
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    _dialog:MatDialog = inject(MatDialog)
    
    @ViewChild(MatSort) sort!: MatSort;
    
    // Table configuration
    dataSource = signal(new MatTableDataSource<any>([]));
    displayedColumns: string[] = ['STT', 'title', 'masp', 'dvt', 'sltonhethong', 'sltonthucte', 'slhuy', 'chenhlech'];
    ColumnName: any = {
      STT: 'STT',
      title: 'Tên Sản Phẩm',
      masp: 'Mã SP',
      dvt: 'Đơn Vị',
      sltonhethong: 'SL Hệ Thống',
      sltonthucte: 'SL Thực Tế',
      slhuy: 'SL Hủy',
      chenhlech: 'Chênh Lệch'
    };
    
    // Initialize DetailChotkho with default structure
    DetailChotkho: any = signal({
      id: undefined,
      title: '',
      ngaychot: new Date(),
      ghichu: '',
      khoId: '',
      userId: '',
      isActive: true,
      details: []
    });
    
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._ChotkhoService.setChotkhoId(id);
      });
  
      effect(async () => {
        // Watch for changes in service DetailChotkho
        const serviceDetail = this._ChotkhoService.DetailChotkho();
        if (serviceDetail) {
          this.DetailChotkho.set(serviceDetail);
          
          // Update dataSource when DetailChotkho changes
          this.dataSource.update(ds => {
            ds.data = serviceDetail.details || [];
            return ds;
          });
          
          // Update ListFilter for product selection
          this.ListFilter = serviceDetail.details || [];
          
          // Only update available products if ListSanpham is loaded
          if (this.ListSanpham.length > 0) {
            this.updateAvailableProducts();
          }          
          // console.log('DetailChotkho updated from service:', serviceDetail);
        }
      });
    }
    isEdit = signal(false);
    isDelete = signal(false);  
    chotkhoId:any = this._ChotkhoService.chotkhoId
    
    // SearchFilter properties for product selection
    ListSanpham: any[] = [];
    filterSanpham: any[] = [];
    ListFilter: any[] = [];
    private searchTerm: string = '';

    // Get filtered products for display in dropdown
    getFilteredSanpham(): any[] {
      if (!this.searchTerm || this.searchTerm.length < 2) {
        return this.ListSanpham;
      }

      const normalizedValue = removeVietnameseAccents(this.searchTerm.toLowerCase());

      return this.ListSanpham.filter((product: any) => {
        const normalizedTitle = removeVietnameseAccents(
          product.title?.toLowerCase() || ''
        );
        const normalizedMasp = removeVietnameseAccents(
          product.masp?.toLowerCase() || ''
        );

        return (
          normalizedTitle.includes(normalizedValue) ||
          normalizedMasp.includes(normalizedValue) ||
          product.title?.toLowerCase().includes(this.searchTerm) ||
          product.masp?.toLowerCase().includes(this.searchTerm)
        );
      });
    }
    
    async ngOnInit() {    
        const id = this._ChotkhoService.chotkhoId();
        if (!id){
          this._router.navigate(['/admin/chotkho']);
          this._ListChotkhoComponent.drawer.close();
        }
        if(id === 'new'){
          this.loadNewSanphamList(); // Load products for new chotkho
          const newChotkhoData = { 
            title: 'Chốt Kho Ngày ' + new Date().toLocaleDateString(),
            ngaychot: new Date(),
            ghichu: '',
            khoId: '',
            userId: '',
            isActive: true,
            details: []
          };
          this.DetailChotkho.set(newChotkhoData);
          this._ChotkhoService.DetailChotkho.set(newChotkhoData);
          this._ListChotkhoComponent.drawer.open();
          this.isEdit.update(value => true);
          this._router.navigate(['/admin/chotkho', "new"]);
        }
        else if(id){
            // console.log('Loading chotkho by id:', id);
            await this._ChotkhoService.getChotkhoById(id);
            // The effect will handle updating this.DetailChotkho when service data changes
            await this.loadSanphamList();
            // Debug: Check if service data is loaded correctly
            setTimeout(() => {
             const serviceData = this._ChotkhoService.DetailChotkho();
            //  console.log('Service data after load:', serviceData);
            //  console.log('Component data after load:', this.DetailChotkho());
            //  console.log('DataSource data after load:', this.dataSource().data);
            }, 1000);         
            this._ListChotkhoComponent.drawer.open();
            this._router.navigate(['/admin/chotkho', id]);
        }   
        // Load sanpham list for product selection
    }

    async handleChotkhoAction() {
      if (this.chotkhoId() === 'new') {
        await this.createChotkho();
      }
      else {
        await this.updateChotkho();
      }
    }
    private async createChotkho() {
      try {
        const chotkhoData = this.DetailChotkho();   
        const result = await this._ChotkhoService.createChotkhoWithDetails(chotkhoData); 
        if(result && result.id){this._router.navigate(['/admin/chotkho', result.id])}
        this._snackBar.open('Tạo chốt kho thành công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => false);
      } catch (error) {
        console.error('Lỗi khi tạo chốt kho:', error);
        this._snackBar.open('Lỗi khi tạo chốt kho', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    }

    private async updateChotkho() {
      try {
        const chotkhoData = this.DetailChotkho();
        if (chotkhoData?.id) {
          // Use updateChotkhoWithDetails to save both master and details
          await this._ChotkhoService.updateChotkhoWithDetails(chotkhoData.id, chotkhoData);
          
          this._snackBar.open('Cập nhật thành công', '', {
            duration: 1000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
          this.isEdit.update(value => false);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 100);
        }
      } catch (error) {
        console.error('Lỗi khi cập nhật chốt kho:', error);
        this._snackBar.open('Lỗi khi cập nhật chốt kho', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    }
    
    async DeleteData() {
      try {
        const chotkhoData = this.DetailChotkho();
        if (chotkhoData?.id) {
          await this._ChotkhoService.deleteChotkho(chotkhoData.id);

          this._snackBar.open('Xóa thành công', '', {
            duration: 1000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });

          this._router.navigate(['/admin/chotkho']);
        }
      } catch (error: any) {
        console.error('Lỗi khi xóa chốt kho:', error);
        this._snackBar.open('Lỗi khi xóa chốt kho', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    }
    
    onQuantityChange() {
      // Tính chênh lệch tự động: chenhlech = sltonhethong - sltonthucte - slhuy
      const detail = this.DetailChotkho();
      if (detail) {
        const sltonhethong = Number(detail.sltonhethong) || 0;
        const sltonthucte = Number(detail.sltonthucte) || 0;
        const slhuy = Number(detail.slhuy) || 0;
        const chenhlech = sltonhethong - sltonthucte - slhuy;
        
        this.DetailChotkho.update((v: any) => ({
          ...v,
          chenhlech: chenhlech
        }));
      }
    }

    // Properties for detail table display
    detailDisplayedColumns: string[] = ['sanpham', 'sltonhethong', 'sltonthucte', 'slhuy', 'chenhlech', 'actions'];

    removeDetail(detail: any) {
      // Chỉ remove khỏi local array (cho unsaved details)
      const currentDetails = this.DetailChotkho().details || [];
      const updatedDetails = currentDetails.filter((d: any) => d !== detail);
      
      this.DetailChotkho.update((v: any) => ({
        ...v,
        details: updatedDetails
      }));
    }

    async deleteDetailFromDatabase(detail: any) {
      // Xóa detail đã lưu từ database
      try {
        if (detail.id && this.DetailChotkho().id) {
          const success = await this._ChotkhoService.deleteChotkhoDetail(
            detail.id, 
            this.DetailChotkho().id
          );
          
          if (success) {
            // Service đã refresh data, không cần update local state
            this._snackBar.open('Xóa chi tiết thành công', '', {
              duration: 1000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-success'],
            });
          }
        } else {
          // Nếu không có ID, chỉ remove khỏi local array
          this.removeDetail(detail);
        }
      } catch (error) {
        console.error('Lỗi khi xóa chi tiết:', error);
        this._snackBar.open('Lỗi khi xóa chi tiết', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    }

    updateChenhLech(detail: any) {
      // Calculate chenhlech for this detail item
      const sltonhethong = Number(detail.sltonhethong) || 0;
      const sltonthucte = Number(detail.sltonthucte) || 0;
      const slhuy = Number(detail.slhuy) || 0;
      detail.chenhlech = sltonhethong - sltonthucte - slhuy;
    }
    
    goBack(){
      this._router.navigate(['/admin/chotkho'])
      this._ListChotkhoComponent.drawer.close();
    }
    trackByFn(index: number, item: any): any {
      return item.id || index;
    }
    toggleEdit() {
      this.isEdit.update(value => !value);
    }
    
    toggleDelete() {
      this.isDelete.update(value => !value);
    }
    FillSlug(){
      this.DetailChotkho.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }

    // SearchFilter methods (similar to banggia pattern)
    async loadNewSanphamList() {
      try {
        // Load all products with tonkho information (no warehouse filter needed)
        const products = await this._ChotkhoService.getAllProducts();       
        const allProducts = products.map((product:any) => ({
          id: product.id,
          sanphamId: product.id,
          title: product.title,
          masp: product.masp,
          dvt: product.dvt,
          sltonhethong: product.tonkho?.slton || 0,
          sltonthucte: product.tonkho?.sltinhthucte || 0,
          slhuy: product.tonkho?.slhuy || 0,
          chenhlech: (product.tonkho?.slton || 0) - (product.tonkho?.sltinhthucte || 0) - (product.slhuy || 0),
          dongia: product.dongia
        }));
        
        // Set ListSanpham to all products
        this.ListSanpham = allProducts;
        this.filterSanpham = this.ListSanpham.filter((item: any) =>
          !this.ListFilter.find((selected: any) => selected.id === item.id)
        );
        // Update available products (excluding already selected ones)
        this.updateAvailableProducts();

        // console.log('Loaded products:', products);
        // console.log('Loaded ListSanpham:', this.ListSanpham.length);
        // console.log('Current ListFilter:', this.ListFilter.length);
        // console.log('Available products (filterSanpham):', this.filterSanpham.length);

      } catch (error) {
        console.error('Error loading sanpham list:', error);
        this._snackBar.open('Lỗi khi tải danh sách sản phẩm', 'Đóng', { 
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    }
    async loadSanphamList() {
      try {
        // Load all products with tonkho information (no warehouse filter needed)
        const products = await this._ChotkhoService.getAllProducts();
        const allProducts = products.map((product:any) => ({
          id: product.id,
          sanphamId: product.id,
          title: product.title,
          masp: product.masp,
          dvt: product.dvt,
          sltonhethong: product.sltonhethong || 0,
          sltonthucte: product.sltonthucte || 0,
          slhuy: product.slhuy || 0,
          chenhlech: (product.sltonhethong || 0) - (product.sltonthucte || 0) - (product.slhuy || 0),
          dongia: product.dongia
        }));
        
        // Set ListSanpham to all products
        this.ListSanpham = allProducts;
        this.filterSanpham = this.ListSanpham.filter((item: any) =>
          !this.ListFilter.find((selected: any) => selected.id === item.id)
        );
        // Update available products (excluding already selected ones)
        this.updateAvailableProducts();

        // console.log('Loaded products:', products);
        // console.log('Loaded ListSanpham:', this.ListSanpham.length);
        // console.log('Current ListFilter:', this.ListFilter.length);
        // console.log('Available products (filterSanpham):', this.filterSanpham.length);

      } catch (error) {
        console.error('Error loading sanpham list:', error);
        this._snackBar.open('Lỗi khi tải danh sách sản phẩm', 'Đóng', { 
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    }

    async DoOutFilter(event: any) {
      console.log('Cập nhật sản phẩm cho chốt kho:', event);
      try {
        this.DetailChotkho.update((v: any) => {
          return {
            ...v,
            details: event.map((sp: any) => ({
              sanphamId: sp.sanphamId || sp.id,
              sanpham: {
                id: sp.sanphamId || sp.id,
                masp: sp.masp,
                title: sp.title,
                dvt: sp.dvt,
                dongia: sp.dongia
              },
              sltonhethong: Number(sp.sltonhethong) || 0,
              sltonthucte: Number(sp.sltonthucte) || 0,
              slhuy: Number(sp.slhuy) || 0,
              chenhlech: Number(sp.chenhlech) || 0,
              ghichu: sp.ghichu || '',
              isActive: true,
              // Fields for table display
              title: sp.title,
              masp: sp.masp,
              dvt: sp.dvt
            }))
          };
        }); 
        
        this.filterSanpham = this.DetailChotkho().details;
        
        // Update dataSource for table display using signal update
        this.dataSource.update(ds => {
          ds.data = [...this.DetailChotkho().details];
          ds.sort = this.sort;
          return ds;
        });
        
        // Remove selected products from ListSanpham to avoid duplicates
        const selectedIds = event.map((sp: any) => sp.sanphamId || sp.id);
        this.ListSanpham = this.ListSanpham.filter(product => 
          !selectedIds.includes(product.id || product.sanphamId)
        );
        
        // console.log('Updated DetailChotkho:', this.DetailChotkho());
        // console.log('Updated ListSanpham (removed selected):', this.ListSanpham);

        this._snackBar.open('Cập nhật sản phẩm thành công', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
      } catch (error) {
        console.error('Lỗi cập nhật sản phẩm:', error);
        this._snackBar.open('Lỗi cập nhật sản phẩm', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    }

    EmptyCart() {
      // Store current details to add back to ListSanpham
      const currentDetails = this.DetailChotkho().details || [];
      
      this.DetailChotkho.update((v: any) => {
        return {
          ...v,
          details: []
        };
      });
      
      // Update dataSource
      this.dataSource.update(ds => {
        ds.data = [];
        return ds;
      });
      
      // Add all removed products back to ListSanpham
      currentDetails.forEach((detail: any) => {
        const productToAdd = {
          id: detail.sanphamId || detail.id,
          sanphamId: detail.sanphamId || detail.id,
          title: detail.title || detail.sanpham?.title,
          masp: detail.masp || detail.sanpham?.masp,
          dvt: detail.dvt || detail.sanpham?.dvt,
          sltonhethong: detail.sltonhethong || 0,
          sltonthucte: detail.sltonthucte || 0,
          slhuy: detail.slhuy || 0,
          chenhlech: detail.chenhlech || 0,
          dongia: detail.dongia || detail.sanpham?.dongia || 0
        };
        
        // Check if product is not already in ListSanpham before adding
        const existsInList = this.ListSanpham.some(p => 
          (p.id === productToAdd.id) || (p.sanphamId === productToAdd.id)
        );
        
        if (!existsInList) {
          this.ListSanpham.push(productToAdd);
        }
      });
      
      console.log('Restored products to ListSanpham:', this.ListSanpham);
      
      this._snackBar.open('Đã xóa tất cả sản phẩm', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    }

    // Methods similar to banggia pattern
    RemoveSanpham(row: any) {
      const currentDetails = this.DetailChotkho().details || [];
      const updatedDetails = currentDetails.filter((detail: any) => detail.id !== row.id && detail.sanphamId !== row.sanphamId);
      
      this.DetailChotkho.update((v: any) => {
        return {
          ...v,
          details: updatedDetails
        };
      });
      
      // Update dataSource
      this.dataSource.update(ds => {
        ds.data = [...updatedDetails];
        return ds;
      });
      
      // Add the removed product back to ListSanpham
      const removedProductId = row.sanphamId || row.id;
      const productToAdd = {
        id: removedProductId,
        sanphamId: removedProductId,
        title: row.title || row.sanpham?.title,
        masp: row.masp || row.sanpham?.masp,
        dvt: row.dvt || row.sanpham?.dvt,
        sltonhethong: row.sltonhethong || 0,
        sltonthucte: row.sltonthucte || 0,
        slhuy: row.slhuy || 0,
        chenhlech: row.chenhlech || 0,
        dongia: row.dongia || row.sanpham?.dongia || 0
      };
      
      // Check if product is not already in ListSanpham before adding
      const existsInList = this.ListSanpham.some(p => 
        (p.id === removedProductId) || (p.sanphamId === removedProductId)
      );
      
      if (!existsInList) {
        this.ListSanpham.push(productToAdd);
        console.log('Added product back to ListSanpham:', productToAdd);
      }
      
      this._snackBar.open('Đã xóa sản phẩm', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    }

    updateValue(event: any, index: number, row: any, field: string, type: string) {
      event.preventDefault();
      event.stopPropagation();
      
      let value = event.target.innerText.trim();
      
      if (type === 'number') {
        // Remove commas and convert to number
        const numericValue = value.replace(/,/g, '').replace(/[^0-9.-]/g, '');
        value = Number(numericValue) || 0;
      }
      
      // console.log(`Updating ${field} with value:`, value);
      
      // Update DetailChotkho using immutable pattern
      this.DetailChotkho.update((currentChotkho: any) => {
        const updatedDetails = (currentChotkho.details || []).map((detail: any, idx: number) => {
          if (idx === index || detail.sanphamId === row.sanphamId) {
            const updatedDetail = { ...detail };
            updatedDetail[field] = value;
            
            // Recalculate chenhlech when sltonthucte or slhuy changes
            if (field === 'sltonthucte' || field === 'slhuy') {
              const sltonhethong = Number(updatedDetail.sltonhethong) || 0;
              const sltonthucte = Number(updatedDetail.sltonthucte) || 0;
              const slhuy = Number(updatedDetail.slhuy) || 0;
              updatedDetail.chenhlech = sltonhethong - sltonthucte - slhuy;
            }
            
            return updatedDetail;
          }
          return detail;
        });
        
        return {
          ...currentChotkho,
          details: updatedDetails
        };
      });
      
      // Update dataSource for table display
      const currentDetails = this.DetailChotkho().details || [];
      this.dataSource.update(ds => {
        ds.data = [...currentDetails];
        return ds;
      });
      
      // console.log('Updated DetailChotkho:', this.DetailChotkho());
      
      // Show success message
      // this._snackBar.open(`Cập nhật ${field} thành công`, '', {
      //   duration: 1500,
      //   horizontalPosition: 'end',
      //   verticalPosition: 'top',
      //   panelClass: ['snackbar-success'],
      // });
    }
  
    // Product selection methods similar to detaildonhang
    async doFilterSanpham(event: any): Promise<void> {
      const value = event.target.value.trim().toLowerCase();
      this.searchTerm = value;

      if (event.key === 'Enter') {
        const filteredProducts = this.getFilteredSanpham();
        if (filteredProducts.length > 0) {
          // Find first unselected product
          const firstAvailable = filteredProducts.find(product => !this.CheckItem(product));
          if (firstAvailable) {
            this.ChosenItem(firstAvailable);
            // Reset search after adding product
            event.target.value = '';
            this.searchTerm = '';
          }
        }
      }
    }

    ChosenItem(item: any) {
      let CheckItem = this.filterSanpham.find((v: any) => v.id === item.id);
      let CheckItem1 = this.ListFilter.find((v: any) => v.id === item.id || v.sanphamId === item.id);
      // console.log('ChosenItem:', item, 'CheckItem:', CheckItem, 'CheckItem1:', CheckItem1);
      // console.log(this.filterSanpham);
      // console.log(this.ListFilter);
      
      if (CheckItem1) {
        // Product is already selected, remove it from ListFilter
        this.ListFilter = this.ListFilter.filter((v) => v.id !== item.id && v.sanphamId !== item.id);
        console.log(`Removed product: ${item.title}`);
      } else {
        // Product is not selected yet, add it to ListFilter
        if (CheckItem) {
          // Create a copy of the object to avoid read-only property error
          const itemCopy = { 
            ...CheckItem,
            sanphamId: CheckItem.id,
            sltonhethong: CheckItem.sltonhethong || 0,
            sltonthucte: CheckItem.sltonthucte || 0, 
            slhuy: CheckItem.slhuy || 0,
            chenhlech: CheckItem.chenhlech || 0,
            order: this.ListFilter.length + 1
          };
          
          const existingIndex = this.ListFilter.findIndex(existing => existing.id === item.id || existing.sanphamId === item.id);
          if (existingIndex === -1) {
            this.ListFilter.push(itemCopy);
            // console.log(`Added product: ${item.title}`);
          }
        }
      }
    }

    async ChosenAll(list: any) {
      // Prevent duplicates by only adding products that are not already in ListFilter
      const uniqueProducts = list.filter(
        (item: any) =>
          !this.ListFilter.find((existing: any) => existing.id === item.id || existing.sanphamId === item.id)
      );

      // Add all unique products with default quantities
      const newProducts = uniqueProducts.map((item: any, index: number) => {
        const itemCopy = { 
          ...item,
          sanphamId: item.id,
          sltonhethong: item.sltonhethong || 0,
          sltonthucte: item.sltonthucte || 0, 
          slhuy: item.slhuy || 0,
          chenhlech: item.chenhlech || 0,
          order: this.ListFilter.length + index + 1
        };
        return itemCopy;
      });

      // Add new products to existing ListFilter
      this.ListFilter = [...this.ListFilter, ...newProducts];

      console.log(
        `Added ${newProducts.length} unique products. Total: ${this.ListFilter.length} products`
      );
    }

    ResetFilter() {
      // Reset to only show available products (not already selected)
      this.filterSanpham = this.ListSanpham.filter((item: any) =>
          !this.ListFilter.find((selected: any) => selected.id === item.id)
      );
      console.log(
        `Reset filter. Showing ${this.filterSanpham.length} available products`
      );
    }

    EmptyFiter() {
      this.ListFilter = [];
      this.updateAvailableProducts();
      console.log('Cleared all selected products');
    }

    // New method to update available products (excluding already selected ones) - kept for compatibility
    updateAvailableProducts() {
      // No longer needed since we show all products with checkboxes
      // console.log('All products are now visible with checkbox states');
    }

    CheckItem(item: any) {
      return this.ListFilter.find((v) => v.id === item.id || v.sanphamId === item.id) ? true : false;
    }

    ApplyFilterColum(menu: any) {
      // Update DetailChotkho with selected products
      this.DetailChotkho.update((v: any) => {
        v.details = [...this.ListFilter]; // Create a copy to avoid reference issues
        return v;
      });

      // Update dataSource for display
      this.dataSource.update(ds => {
        ds.data = [...this.ListFilter];
        return ds;
      });

      menu.closeMenu();
      console.log('Applied filter. Selected products:', this.ListFilter.length);
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource().filter = filterValue.trim().toLowerCase();
    }
    async ImportExcel(event: any) {
      try {
        const file = event.target.files[0];
        if (!file) {
          this._snackBar.open('Vui lòng chọn file Excel', 'Đóng', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
          return;
        }

        // Validate file type
        const validTypes = [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
          'application/octet-stream'
        ];
        
        if (!validTypes.includes(file.type) && !file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
          this._snackBar.open('Vui lòng chọn file Excel (.xlsx hoặc .xls)', 'Đóng', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
          return;
        }

        this._snackBar.open('Đang xử lý file Excel...', '', {
          duration: 2000,
          panelClass: ['snackbar-info']
        });

        // Read Excel file
        const data = await this.readExcelFile(file);
        
        if (!data || data.length === 0) {
          this._snackBar.open('File Excel không có dữ liệu hoặc không hợp lệ', 'Đóng', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
          return;
        }

        // Load all products from server if not already loaded
        if (this.ListSanpham.length === 0) {
          await this.loadNewSanphamList();
        }

        // Process and validate Excel data
        const processedData = await this.processExcelData(data);
        
        if (processedData.length === 0) {
          this._snackBar.open('Không tìm thấy sản phẩm nào khớp với mã sản phẩm trong file Excel', 'Đóng', {
            duration: 4000,
            panelClass: ['snackbar-warning']
          });
          return;
        }

        // Update DetailChotkho with processed data
        this.DetailChotkho.update((v: any) => {
          // Combine existing details with imported data, avoiding duplicates
          const existingDetails = v.details || [];
          const combinedDetails = [...existingDetails];
          
          processedData.forEach((importedItem: any) => {
            const existingIndex = combinedDetails.findIndex(
              (existing: any) => existing.sanphamId === importedItem.sanphamId
            );
            
            if (existingIndex >= 0) {
              // Update existing item
              combinedDetails[existingIndex] = {
                ...combinedDetails[existingIndex],
                ...importedItem,
                // Recalculate chenhlech
                chenhlech: this.calculateChenhLech(
                  importedItem.sltonhethong || combinedDetails[existingIndex].sltonhethong || 0,
                  importedItem.sltonthucte || 0,
                  importedItem.slhuy || 0
                )
              };
            } else {
              // Add new item
              combinedDetails.push(importedItem);
            }
          });
          
          return {
            ...v,
            details: combinedDetails
          };
        });

        // Update dataSource for table display
        this.dataSource.update(ds => {
          ds.data = [...this.DetailChotkho().details];
          ds.sort = this.sort;
          return ds;
        });

        // Update ListFilter for consistency
        this.ListFilter = this.DetailChotkho().details || [];

        // Reset file input
        event.target.value = '';

        this._snackBar.open(
          `Import thành công ${processedData.length} sản phẩm từ Excel`,
          'Đóng',
          {
            duration: 4000,
            panelClass: ['snackbar-success']
          }
        );

        console.log('Excel import completed:', {
          importedItems: processedData.length,
          totalDetails: this.DetailChotkho().details?.length || 0
        });

      } catch (error) {
        console.error('Error importing Excel:', error);
        this._snackBar.open(
          `Lỗi khi import Excel: ${error instanceof Error ? error.message : 'Unknown error'}`,
          'Đóng',
          {
            duration: 5000,
            panelClass: ['snackbar-error']
          }
        );
      }
    }

    private async readExcelFile(file: File): Promise<any[]> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e: any) => {
          try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            
            // Get first sheet
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            
            // Convert to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
              header: 1,
              defval: '',
              raw: false
            });
            
            resolve(jsonData);
          } catch (error) {
            reject(new Error('Không thể đọc file Excel. Vui lòng kiểm tra định dạng file.'));
          }
        };
        
        reader.onerror = () => {
          reject(new Error('Lỗi khi đọc file'));
        };
        
        reader.readAsArrayBuffer(file);
      });
    }

    private async processExcelData(rawData: any[]): Promise<any[]> {
      try {
        if (!rawData || rawData.length < 2) {
          throw new Error('File Excel phải có ít nhất 2 dòng (header + data)');
        }

        // Get header row and find column indices
        const headers = rawData[0].map((h: any) => 
          removeVietnameseAccents(String(h).toLowerCase().trim())
        );
        
        const columnIndices = {
          masp: this.findColumnIndex(headers, ['masp', 'ma sp', 'ma san pham', 'product code']),
          sltonthucte: this.findColumnIndex(headers, ['sltonthucte', 'sl ton thuc te', 'so luong ton thuc te', 'actual stock']),
          slhuy: this.findColumnIndex(headers, ['slhuy', 'sl huy', 'so luong huy', 'damaged quantity'])
        };

        // Validate required columns
        if (columnIndices.masp === -1) {
          throw new Error('Không tìm thấy cột "masp" trong file Excel');
        }

        const processedData: any[] = [];
        const notFoundProducts: string[] = [];

        // Process data rows (skip header)
        for (let i = 1; i < rawData.length; i++) {
          const row = rawData[i];
          if (!row || row.length === 0) continue;

          const masp = String(row[columnIndices.masp] || '').trim();
          if (!masp) continue;

          // Find product in server data by masp
          const serverProduct = this.ListSanpham.find((p: any) => 
            p.masp?.toLowerCase().trim() === masp.toLowerCase().trim()
          );

          if (!serverProduct) {
            notFoundProducts.push(masp);
            continue;
          }

          // Extract quantities from Excel
          const sltonthucte = this.parseNumber(row[columnIndices.sltonthucte]);
          const slhuy = this.parseNumber(row[columnIndices.slhuy]);
          
          // Use server data for sltonhethong (system stock)
          const sltonhethong = serverProduct.sltonhethong || 0;

          // Calculate chenhlech
          const chenhlech = this.calculateChenhLech(sltonhethong, sltonthucte, slhuy);

          // Create detail item combining Excel data with server data
          const detailItem = {
            id: undefined, // New item
            sanphamId: serverProduct.id,
            sanpham: {
              id: serverProduct.id,
              masp: serverProduct.masp,
              title: serverProduct.title,
              dvt: serverProduct.dvt,
              dongia: serverProduct.dongia
            },
            sltonhethong: sltonhethong,
            sltonthucte: sltonthucte,
            slhuy: slhuy,
            chenhlech: chenhlech,
            ghichu: `Import từ Excel - ${new Date().toLocaleString()}`,
            isActive: true,
            // Fields for table display
            title: serverProduct.title,
            masp: serverProduct.masp,
            dvt: serverProduct.dvt
          };

          processedData.push(detailItem);
        }

        // Show warning for products not found
        if (notFoundProducts.length > 0) {
          console.warn('Products not found in system:', notFoundProducts);
          this._snackBar.open(
            `Cảnh báo: ${notFoundProducts.length} sản phẩm không tìm thấy trong hệ thống`,
            'Xem chi tiết',
            {
              duration: 5000,
              panelClass: ['snackbar-warning']
            }
          ).onAction().subscribe(() => {
            console.log('Not found products:', notFoundProducts.join(', '));
          });
        }

        return processedData;

      } catch (error) {
        console.error('Error processing Excel data:', error);
        throw error;
      }
    }

    private findColumnIndex(headers: string[], possibleNames: string[]): number {
      for (const name of possibleNames) {
        const normalizedName = removeVietnameseAccents(name.toLowerCase().trim());
        const index = headers.findIndex(header => header.includes(normalizedName));
        if (index !== -1) return index;
      }
      return -1;
    }

    private parseNumber(value: any): number {
      if (value === undefined || value === null || value === '') return 0;
      
      // Convert to string and remove commas, spaces
      const stringValue = String(value).replace(/,/g, '').replace(/\s/g, '');
      
      // Parse as float and return integer
      const parsed = parseFloat(stringValue);
      return isNaN(parsed) ? 0 : Math.floor(parsed);
    }

    private calculateChenhLech(sltonhethong: number, sltonthucte: number, slhuy: number): number {
      return (sltonhethong || 0) - (sltonthucte || 0) - (slhuy || 0);
    }
  }