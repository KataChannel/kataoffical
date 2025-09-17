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
import { CommonModule } from '@angular/common';
import { ListChotkhoComponent } from '../listchotkho/listchotkho';
import { ChotkhoService } from '../chotkho.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductSelectionDialogComponent, ProductSelectionResult } from '../product-selection-dialog/product-selection-dialog.component';
import { SearchfilterComponent } from '../../../shared/common/searchfilter123/searchfilter.component';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
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
      CommonModule,
      MatSlideToggleModule,
    ],
    templateUrl: './detailchotkho.html',
    styleUrl: './detailchotkho.scss'
  })
  export class DetailChotkhoComponent {
    _ListChotkhoComponent:ListChotkhoComponent = inject(ListChotkhoComponent)
    _ChotkhoService:ChotkhoService = inject(ChotkhoService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    _dialog:MatDialog = inject(MatDialog)
    
    @ViewChild(MatSort) sort!: MatSort;
    
    // Table configuration
    dataSource = signal(new MatTableDataSource<any>([]));
    displayedColumns: string[] = ['STT', 'tensanpham', 'masanpham', 'donvitinh', 'sltonhethong', 'sltonthucte', 'slhuy', 'chenhlech'];
    ColumnName: any = {
      STT: 'STT',
      tensanpham: 'Tên Sản Phẩm',
      masanpham: 'Mã SP',
      donvitinh: 'Đơn Vị',
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
          
          // Update filterSanpham for SearchFilter
          this.filterSanpham = serviceDetail.details || [];
          
          console.log('DetailChotkho updated from service:', serviceDetail);
        }
      });
    }
    isEdit = signal(false);
    isDelete = signal(false);  
    chotkhoId:any = this._ChotkhoService.chotkhoId
    
    // SearchFilter properties for product selection
    ListSanpham: any[] = [];
    filterSanpham: any[] = [];
    
    async ngOnInit() {    
        const id = this._ChotkhoService.chotkhoId();
        if (!id){
          this._router.navigate(['/admin/chotkho']);
          this._ListChotkhoComponent.drawer.close();
        }
        if(id === 'new'){
          const newChotkhoData = { 
            id: undefined,
            title: '',
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
            console.log('Loading chotkho by id:', id);
            await this._ChotkhoService.getChotkhoById(id);
            // The effect will handle updating this.DetailChotkho when service data changes
            
            // Debug: Check if service data is loaded correctly
            setTimeout(() => {
              const serviceData = this._ChotkhoService.DetailChotkho();
              console.log('Service data after load:', serviceData);
              console.log('Component data after load:', this.DetailChotkho());
              console.log('DataSource data after load:', this.dataSource().data);
            }, 1000);
            
            this._ListChotkhoComponent.drawer.open();
            this._router.navigate(['/admin/chotkho', id]);
        }   
        
        // Load sanpham list for SearchFilter
        await this.loadSanphamList();
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
        await this._ChotkhoService.createChotkhoWithDetails(chotkhoData);
        
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

    // Methods for detail management
    // Legacy addDetail method - replaced by SearchFilter
    /*
    async addDetail() {
      try {
        // Get current warehouse ID from the detail record
        const currentChotkho = this.DetailChotkho();
        const selectedWarehouseId = currentChotkho?.khoId;

        // Open product selection dialog
        const dialogRef = this._dialog.open(ProductSelectionDialogComponent, {
          width: '900px',
          maxWidth: '95vw',
          data: {
            selectedWarehouseId: selectedWarehouseId
          },
          disableClose: false
        });

        // Handle dialog result
        const result: ProductSelectionResult = await dialogRef.afterClosed().toPromise();
        
        if (result && result.selectedProducts.length > 0) {
          // Convert selected products to chotkho details
          const newDetails = result.selectedProducts.map(product => ({
            id: GenId(10, false),
            sanphamId: product.id,
            sanpham: {
              id: product.id,
              masanpham: product.masanpham,
              tensanpham: product.tensanpham,
              donvitinh: product.donvitinh,
              dongia: product.dongia
            },
            sltonhethong: product.tonkho?.slton || 0,
            sltonthucte: product.tonkho?.sltinhthucte || 0,
            slhuy: product.tonkho?.slhuy || 0,
            chenhlech: (product.tonkho?.sltinhthucte || 0) - (product.tonkho?.slton || 0),
            ghichu: '',
            isActive: true
          }));

          // Add new details to current details
          const currentDetails = this.DetailChotkho().details || [];
          const updatedDetails = [...currentDetails, ...newDetails];

          // Update the DetailChotkho signal
          this.DetailChotkho.set({
            ...this.DetailChotkho(),
            details: updatedDetails,
            khoId: selectedWarehouseId // Ensure warehouse is set
          });

          // Show success message
          this._snackBar.open(
            `Đã thêm ${result.selectedProducts.length} sản phẩm vào danh sách kiểm kho`, 
            'Đóng', 
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-success'],
            }
          );
        }
      } catch (error) {
        console.error('Error adding products:', error);
        this._snackBar.open('Có lỗi xảy ra khi thêm sản phẩm', 'Đóng', { 
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    }
    */

    removeDetail(detail: any) {
      const currentDetails = this.DetailChotkho().details || [];
      const updatedDetails = currentDetails.filter((d: any) => d !== detail);
      
      this.DetailChotkho.update((v: any) => ({
        ...v,
        details: updatedDetails
      }));
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
      return item.id;
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
    async loadSanphamList() {
      try {
        // Load all products with tonkho information (no warehouse filter needed)
        const products = await this._ChotkhoService.getAllProducts();
        this.ListSanpham = products.map(product => ({
          id: product.id,
          sanphamId: product.id,
          tensanpham: product.tensanpham,
          masanpham: product.masanpham,
          donvitinh: product.donvitinh,
          sltonhethong: product.tonkho?.slton || 0,
          sltonthucte: product.tonkho?.sltinhthucte || 0,
          slhuy: product.tonkho?.slhuy || 0,
          chenhlech: (product.tonkho?.slton || 0) - (product.tonkho?.sltinhthucte || 0) - (product.tonkho?.slhuy || 0),
          dongia: product.dongia
        }));
        
        this.filterSanpham = [...this.ListSanpham];
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
                masanpham: sp.masanpham,
                tensanpham: sp.tensanpham,
                donvitinh: sp.donvitinh,
                dongia: sp.dongia
              },
              sltonhethong: Number(sp.sltonhethong) || 0,
              sltonthucte: Number(sp.sltonthucte) || 0,
              slhuy: Number(sp.slhuy) || 0,
              chenhlech: Number(sp.chenhlech) || 0,
              ghichu: sp.ghichu || '',
              isActive: true,
              // Fields for table display
              tensanpham: sp.tensanpham,
              masanpham: sp.masanpham,
              donvitinh: sp.donvitinh
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
        
        console.log('Updated DetailChotkho:', this.DetailChotkho());

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
      
      console.log(`Updating ${field} with value:`, value);
      
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
      
      console.log('Updated DetailChotkho:', this.DetailChotkho());
      
      // Show success message
      // this._snackBar.open(`Cập nhật ${field} thành công`, '', {
      //   duration: 1500,
      //   horizontalPosition: 'end',
      //   verticalPosition: 'top',
      //   panelClass: ['snackbar-success'],
      // });
    }

    // Method to save changes to server
    async saveChangesToServer() {
      try {
        const chotkhoData = this.DetailChotkho();
        if (chotkhoData?.id && chotkhoData.id !== 'new') {
          // Use updateChotkhoWithDetails to save both master and details
          await this._ChotkhoService.updateChotkhoWithDetails(chotkhoData.id, chotkhoData);
          
          this._snackBar.open('Đã lưu thay đổi lên server', '', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
        }
      } catch (error) {
        console.error('Error saving to server:', error);
        this._snackBar.open('Lỗi khi lưu lên server', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    }
  }