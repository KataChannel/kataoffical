import { ChangeDetectionStrategy, Component, effect, inject, signal, OnInit, OnDestroy, EffectRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ListNhomkhachhangComponent } from '../listnhomkhachhang/listnhomkhachhang.component';
import { NhomkhachhangService } from '../nhomkhachhang.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
import { MatMenuModule } from '@angular/material/menu';
import { KhachhangService } from '../../khachhang/khachhang.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GraphqlService } from '../../../shared/services/graphql.service';
  @Component({
    selector: 'app-detailnhomkhachhang',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatIconModule,
      MatButtonModule,
      MatSelectModule,
      MatDialogModule,
      CommonModule,
      MatSlideToggleModule,
      MatMenuModule,
      MatProgressSpinnerModule
    ],
    templateUrl: './detailnhomkhachhang.component.html',
    styleUrl: './detailnhomkhachhang.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class DetailNhomkhachhangComponent implements OnInit, OnDestroy {
    _ListnhomkhachhangComponent:ListNhomkhachhangComponent = inject(ListNhomkhachhangComponent)
    _NhomkhachhangService:NhomkhachhangService = inject(NhomkhachhangService)
    _KhachhangService:KhachhangService = inject(KhachhangService)
    _GraphqlService:GraphqlService = inject(GraphqlService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)

    // Signals for state management
    DetailNhomkhachhang: any = this._NhomkhachhangService.DetailNhomkhachhang;
    isEdit = signal(false);
    isDelete = signal(false);
    isLoading = signal(false);
    nhomkhachhangId:any = this._NhomkhachhangService.nhomkhachhangId;

    // Data properties
    ListKhachhang: any[] = [];
    FilterKhachhang: any[] = [];
    CheckListKhachhang: any[] = [];

    // Cleanup function for effect
    private effectRef?: EffectRef;

    constructor(){
      // Tối ưu hóa route parameter subscription
      this.initializeRouteSubscription();
      // Tối ưu hóa effect
      this.initializeEffect();
    }
    async ngOnInit() {
      // NgOnInit đã được tối ưu - logic chính được chuyển vào effect và constructor
     // console.log('DetailNhomkhachhangComponent initialized');
      this.GetListKhachhang();
    }

    ngOnDestroy() {
      // Cleanup effect nếu cần
      if (this.effectRef) {
        this.effectRef.destroy();
      }
    }

    /**
     * Tối ưu hóa route subscription
     */
    private initializeRouteSubscription(): void {
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._NhomkhachhangService.setNhomkhachhangId(id);
      });
    }

    /**
     * Tối ưu hóa effect với error handling và loading states
     */
    private initializeEffect(): void {
      this.effectRef = effect(async () => {
        const id = this._NhomkhachhangService.nhomkhachhangId();
        
        this.isLoading.set(true);
        
        try {
          if (!id) {
            this.handleEmptyId();
            return;
          }

          if (id === 'new') {
            this.handleNewRecord();
          } else {
            await this.handleExistingRecord(id);
          }
        } catch (error) {
          console.error('Error in effect:', error);
          this._snackBar.open('Có lỗi xảy ra khi tải dữ liệu', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
        } finally {
          this.isLoading.set(false);
        }
      });
    }

    /**
     * Xử lý khi không có ID
     */
    private handleEmptyId(): void {
      this._router.navigate(['/admin/nhomkhachhang']);
      this._ListnhomkhachhangComponent.drawer.close();
    }

    /**
     * Xử lý khi tạo mới (ID = '0')
     */
    private handleNewRecord(): void {
      this.DetailNhomkhachhang.update(() => ({
        name: '',
        description: '',
        isActive: true
      }));
      this._ListnhomkhachhangComponent.drawer.open();
      this.isEdit.set(true);
      this._router.navigate(['/admin/nhomkhachhang', 'new']);
    }

    /**
     * Xử lý khi chỉnh sửa record có sẵn
     */
    async GetListKhachhang(){
      const Khachhangs = await this._GraphqlService.findAll('khachhang',{
        select: {
          id: true,
          name: true,
        },
        take: 99999,
        aggressiveCache: true,
        enableParallelFetch: true,
      });
      this.ListKhachhang = Khachhangs.data;
      // console.log(this.ListKhachhang);
    }
    private async handleExistingRecord(id: string): Promise<void> {
      // Sử dụng Promise.all để load parallel
      await this._NhomkhachhangService.getNhomkhachhangByid(id);
      this.CheckListKhachhang = this.DetailNhomkhachhang()?.khachhang || [];
      this._ListnhomkhachhangComponent.drawer.open();
      this._router.navigate(['/admin/nhomkhachhang', id]);
    }
    async handleNhomkhachhangAction() {
      if (this.nhomkhachhangId() === 'new') {
        await this.createNhomkhachhang();
      }
      else {
        await this.updateNhomkhachhang();
      }
    }
    private async createNhomkhachhang() {
      this.isLoading.set(true);
      try {
        // ✅ Validate basic data trước khi tạo
        const nhomkhachhangData = {
          name: this.DetailNhomkhachhang().name?.trim(),
          description: this.DetailNhomkhachhang().description?.trim() || ''
        };

        // ✅ Validate required fields
        if (!nhomkhachhangData.name) {
          throw new Error('Tên nhóm khách hàng không được để trống');
        }

        console.log('Creating nhomkhachhang with data:', nhomkhachhangData);

        // ✅ Tạo nhóm khách hàng trước
        const result = await this._GraphqlService.createOne(
          'nhomkhachhang',
          nhomkhachhangData,
          { include: { khachhang: true } }
        );
        
        console.log('Created nhomkhachhang result:', result);
        
        if (result && result.id) {
          // ✅ Sau đó liên kết khách hàng nếu có
          if (this.CheckListKhachhang.length > 0) {
            console.log('Connecting khachhang to nhomkhachhang...');
            
            // ✅ Validate khách hàng IDs
            const validKhachhangIds = this.CheckListKhachhang
              .map((v: any) => v.id)
              .filter((id: any) => id && typeof id === 'string' && id.trim() !== '');

            if (validKhachhangIds.length > 0) {
              // ✅ Sử dụng buildRelationUpdateData để đảm bảo consistency
              const relationUpdateData = {
                khachhang: {
                  connect: validKhachhangIds.map((id: string) => ({ id: id.trim() }))
                }
              };

              console.log('Relation update data:', relationUpdateData);

              const updateResult = await this._GraphqlService.updateOne(
                'nhomkhachhang',
                { id: result.id },
                relationUpdateData
              );
              
              console.log('Relation update result:', updateResult);
            }
          }

          this._snackBar.open('Tạo Mới Thành Công', '', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });

          // ✅ Navigate to the new record và refresh data
          this._router.navigate(['/admin/nhomkhachhang', result.id]);
          this.isEdit.set(false);
          
          // ✅ Refresh để load data mới với relations
          await this._NhomkhachhangService.getNhomkhachhangByid(result.id);
          this.CheckListKhachhang = this.DetailNhomkhachhang()?.khachhang || [];
        }
      } catch (error: any) {
        console.error('Lỗi khi tạo nhomkhachhang:', error);
        this._snackBar.open(
          error.message || 'Có lỗi xảy ra khi tạo nhóm khách hàng', 
          '', 
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          }
        );
      } finally {
        this.isLoading.set(false);
      }
    }

    private async updateNhomkhachhang() {
      this.isLoading.set(true);
      
      try {
        // ✅ Validate và clean basic data
        const nhomkhachhangData: any = {
          name: this.DetailNhomkhachhang().name?.trim(),
          description: this.DetailNhomkhachhang().description?.trim() || ''
        };

        // ✅ Validate required fields
        if (!nhomkhachhangData.name) {
          throw new Error('Tên nhóm khách hàng không được để trống');
        }

        // ✅ Build nested relation data như trong createNhomkhachhang
        const initialRelationData = this.buildNestedRelationData();
        if (initialRelationData) {
          nhomkhachhangData.khachhang = initialRelationData;
          console.log('Adding relation updates to data:', initialRelationData);
        } else {
          console.log('No relation changes detected - basic update only');
        }

        // ✅ Alternative approach: Update basic data first, then relationships separately
        console.log('Updating basic nhomkhachhang data first...');
        
        // ✅ Update basic data first
        const basicResult = await this._GraphqlService.updateOne(
          'nhomkhachhang', 
          { id: this.nhomkhachhangId() }, 
          nhomkhachhangData, 
          { include: { khachhang: true } }
        );

        console.log('Basic update result:', basicResult);

        // ✅ Then update relationships separately if needed
        const separateRelationData = this.buildNestedRelationData();
        if (separateRelationData) {
          console.log('Updating relationships separately...');
          
          const relationResult = await this._GraphqlService.updateOne(
            'nhomkhachhang', 
            { id: this.nhomkhachhangId() }, 
            { khachhang: separateRelationData }, 
            { include: { khachhang: true } }
          );
          
          console.log('Relation update result:', relationResult);
        }

        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });

        this.isEdit.set(false);
        
        // ✅ Refresh data để đảm bảo UI sync
        await this._NhomkhachhangService.getNhomkhachhangByid(this.nhomkhachhangId());
        this.CheckListKhachhang = this.DetailNhomkhachhang()?.khachhang || [];

      } catch (error: any) {
        console.error('Lỗi khi cập nhật nhomkhachhang:', error);
        this._snackBar.open(
          error.message || 'Có lỗi xảy ra khi cập nhật nhóm khách hàng', 
          '', 
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          }
        );
      } finally {
        this.isLoading.set(false);
      }
    }

    /**
     * ✅ Method để build nested relation data cho update operations
     */
    private buildNestedRelationData(): any {
      try {
        // ✅ Validate và filter IDs
        const currentKhachhangIds = this.DetailNhomkhachhang()?.khachhang
          ?.map((v: any) => v.id)
          .filter((id: any) => id && typeof id === 'string') || [];
          
        const newKhachhangIds = this.CheckListKhachhang
          .map((v: any) => v.id)
          .filter((id: any) => id && typeof id === 'string');

        console.log('=== DEBUGGING NESTED RELATION DATA ===');
        console.log('Current nhomkhachhang data:', this.DetailNhomkhachhang());
        console.log('Current khachhang from DetailNhomkhachhang:', this.DetailNhomkhachhang()?.khachhang);
        console.log('CheckListKhachhang:', this.CheckListKhachhang);
        console.log('Current khachhang IDs:', currentKhachhangIds);
        console.log('New khachhang IDs (from CheckListKhachhang):', newKhachhangIds);

        // ✅ So sánh chi tiết
        const currentSorted = [...currentKhachhangIds].sort();
        const newSorted = [...newKhachhangIds].sort();
        console.log('Current IDs sorted:', currentSorted);
        console.log('New IDs sorted:', newSorted);
        console.log('Are arrays equal?', JSON.stringify(currentSorted) === JSON.stringify(newSorted));

        // ✅ Chỉ build relation data nếu có sự thay đổi
        if (JSON.stringify(currentSorted) === JSON.stringify(newSorted)) {
          console.log('No relation changes detected for nested update');
          return null;
        }

        const toConnect = newKhachhangIds.filter((id: string) => !currentKhachhangIds.includes(id));
        const toDisconnect = currentKhachhangIds.filter((id: string) => !newKhachhangIds.includes(id));
        
        console.log('To connect (nested):', toConnect);
        console.log('To disconnect (nested):', toDisconnect);
        
        // ✅ Build nested relation structure
        const nestedRelationData: any = {};

        if (toDisconnect.length > 0) {
          // ✅ Validate disconnect IDs
          const validToDisconnect = toDisconnect.filter((id: any) => 
            id && 
            typeof id === 'string' && 
            id.trim() !== '' && 
            id.length >= 36
          );
          
          console.log('Valid to disconnect:', validToDisconnect);
          
          if (validToDisconnect.length > 0) {
            nestedRelationData.disconnect = validToDisconnect.map((id: string) => ({ 
              id: id.trim() 
            }));
          }
        }

        if (toConnect.length > 0) {
          // ✅ Validate connect IDs
          const validToConnect = toConnect.filter((id: any) => 
            id && 
            typeof id === 'string' && 
            id.trim() !== '' && 
            id.length >= 36
          );
          
          console.log('Valid to connect:', validToConnect);
          
          if (validToConnect.length > 0) {
            nestedRelationData.connect = validToConnect.map((id: string) => ({ 
              id: id.trim() 
            }));
          }
        }

        console.log('Final nested relation data:', nestedRelationData);
        console.log('=== END DEBUGGING ===');
        
        // ✅ Return null if no valid operations
        return Object.keys(nestedRelationData).length > 0 ? nestedRelationData : null;
        
      } catch (error) {
        console.error('Lỗi khi build nested relation data:', error);
        return null;
      }
    }

    /**
     * ✅ Method riêng để xử lý relations (kept for ApplyKhachhang method)
     */
    private async updateKhachhangRelations(): Promise<void> {
      try {
        // ✅ Validate và filter IDs
        const currentKhachhangIds = this.DetailNhomkhachhang()?.khachhang
          ?.map((v: any) => v.id)
          .filter((id: any) => id && typeof id === 'string') || [];
          
        const newKhachhangIds = this.CheckListKhachhang
          .map((v: any) => v.id)
          .filter((id: any) => id && typeof id === 'string');

        console.log('Current khachhang IDs:', currentKhachhangIds);
        console.log('New khachhang IDs:', newKhachhangIds);

        // ✅ Chỉ update relation nếu có sự thay đổi
        if (JSON.stringify(currentKhachhangIds.sort()) !== JSON.stringify(newKhachhangIds.sort())) {
          const toConnect = newKhachhangIds.filter((id: string) => !currentKhachhangIds.includes(id));
          const toDisconnect = currentKhachhangIds.filter((id: string) => !newKhachhangIds.includes(id));
          
          console.log('To connect:', toConnect);
          console.log('To disconnect:', toDisconnect);
          
          const relationUpdateData = this.buildRelationUpdateData(toConnect, toDisconnect);
          
          if (relationUpdateData) {
            console.log('Updating relations with data:', relationUpdateData);
            
            const relationResult = await this._GraphqlService.updateOne(
              'nhomkhachhang',
              { id: this.nhomkhachhangId() },
              relationUpdateData
            );
            
            console.log('Relation update result:', relationResult);
          }
        } else {
          console.log('No relation changes detected');
        }
      } catch (error) {
        console.error('Lỗi khi cập nhật relations:', error);
        throw error; // Re-throw để parent method xử lý
      }
    }
    async DeleteData()
    {
      try {
        await this._NhomkhachhangService.DeleteNhomkhachhang(this.DetailNhomkhachhang());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/nhomkhachhang']);
      } catch (error) {
        console.error('Lỗi khi xóa nhomkhachhang:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/nhomkhachhang'])
      this._ListnhomkhachhangComponent.drawer.close();
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
      this.DetailNhomkhachhang.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }

    /**
     * Tối ưu hóa filter khách hàng với debounce
     */
    doFilterKhachhang(event:any){
      const value = event.target.value.toLowerCase();
      if (value.length < 2 && value.length > 0) return; // Chỉ filter khi >= 2 ký tự
      
      this.ListKhachhang = this._KhachhangService.ListKhachhang().filter((v) => 
        v.name.toLowerCase().includes(value)
      );
    }

    ChosenKhachhang(item:any){
      const checkitem = this.CheckListKhachhang.find((v) => v.id === item.id);            
      if(!checkitem){
        this.CheckListKhachhang.push(item);
      }
      else{
        this.CheckListKhachhang = this.CheckListKhachhang.filter((v) => v.id !== item.id);
      }
    }
    /**
     * Tối ưu hóa việc áp dụng khách hàng với GraphQL
     */
    async ApplyKhachhang(menu:any){
      this.isLoading.set(true);
      
      try {
        // Validate và filter data
        const currentKhachhangIds = this.DetailNhomkhachhang()?.khachhang?.map((v:any) => v.id).filter((id: any) => id) || [];
        const newKhachhangIds = this.CheckListKhachhang.map((v:any) => v.id).filter((id: any) => id);
        
        // Validate nhomkhachhangId
        const nhomkhachhangId = this.nhomkhachhangId();
        if (!nhomkhachhangId) {
          throw new Error('Không tìm thấy ID nhóm khách hàng');
        }
        console.log(this.DetailNhomkhachhang());
        console.log(currentKhachhangIds);
        
        // Tối ưu: chỉ thực hiện operations khi có thay đổi
        if (JSON.stringify(currentKhachhangIds.sort()) === JSON.stringify(newKhachhangIds.sort())) {
          menu.closeMenu();
          this.isLoading.set(false);
          return;
        }

        // Tính toán các khách hàng cần thêm và xóa
        const toConnect = newKhachhangIds.filter((id: string) => !currentKhachhangIds.includes(id));
        const toDisconnect = currentKhachhangIds.filter((id: string) => !newKhachhangIds.includes(id));
        
        // Cập nhật quan hệ với GraphQL chỉ khi có thay đổi
        const updateData = this.buildRelationUpdateData(toConnect, toDisconnect);
        
        if (updateData) {
          await this._GraphqlService.updateOne(
            'nhomkhachhang',
            { id: nhomkhachhangId },
            updateData
          );
        }

        this._snackBar.open('Cập nhật khách hàng thành công', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        
        // Refresh data để cập nhật UI
        await this._NhomkhachhangService.getNhomkhachhangByid(this.nhomkhachhangId());
        menu.closeMenu();
        
      } catch (error) {
        console.error('Lỗi khi cập nhật khách hàng:', error);
        this._snackBar.open('Có lỗi xảy ra khi cập nhật khách hàng', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      } finally {
        this.isLoading.set(false);
      }
    }
    
    /**
     * ✅ Enhanced helper method để validate và build relation update data
     */
    private buildRelationUpdateData(toConnect: string[], toDisconnect: string[]) {
      // ✅ Comprehensive validation
      const validToConnect = toConnect.filter(id => 
        id && 
        typeof id === 'string' && 
        id.trim() !== '' && 
        id.length >= 36 // Basic UUID length check
      );
      
      const validToDisconnect = toDisconnect.filter(id => 
        id && 
        typeof id === 'string' && 
        id.trim() !== '' && 
        id.length >= 36
      );
      
      console.log('Validated to connect:', validToConnect);
      console.log('Validated to disconnect:', validToDisconnect);
      
      if (validToConnect.length === 0 && validToDisconnect.length === 0) {
        console.log('No valid relation changes found');
        return null; // Không có thay đổi hợp lệ
      }

      // ✅ Build proper Prisma relation update structure
      const updateData: any = {
        khachhang: {}
      };

      if (validToDisconnect.length > 0) {
        updateData.khachhang.disconnect = validToDisconnect.map((id: string) => ({ 
          id: id.trim() 
        }));
      }

      if (validToConnect.length > 0) {
        updateData.khachhang.connect = validToConnect.map((id: string) => ({ 
          id: id.trim() 
        }));
      }

      console.log('Built relation update data:', updateData);
      return updateData;
    }
    
    CheckKhachhang(item:any) {
      return this.CheckListKhachhang.find((v:any) => v.id === item.id) ? true : false;
    }

    /**
     * 🔍 Debug method để test relation updates
     */
    debugRelationUpdate() {
      console.log('=== MANUAL DEBUG TEST ===');
      const relationData = this.buildNestedRelationData();
      console.log('Manual test result:', relationData);
      
      // Test với fake data
      console.log('Current DetailNhomkhachhang:', this.DetailNhomkhachhang());
      console.log('Current CheckListKhachhang:', this.CheckListKhachhang);
      
      if (this.CheckListKhachhang.length > 0) {
        console.log('CheckListKhachhang has items, should create relation updates');
      } else {
        console.log('CheckListKhachhang is empty, should disconnect all');
      }
      
      console.log('=== END MANUAL DEBUG ===');
    }
}