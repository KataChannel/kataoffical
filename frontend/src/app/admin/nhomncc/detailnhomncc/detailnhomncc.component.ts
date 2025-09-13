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
import { ListNhomnccComponent } from '../listnhomncc/listnhomncc.component';
import { NhomnccService } from '../nhomncc.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
import { MatMenuModule } from '@angular/material/menu';
// import { NccService } from '../../ncc/ncc.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GraphqlService } from '../../../shared/services/graphql.service';
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
  @Component({
    selector: 'app-detailnhomncc',
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
    templateUrl: './detailnhomncc.component.html',
    styleUrls: ['./detailnhomncc.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class DetailNhomnccComponent implements OnInit, OnDestroy {
    _ListnhomnccComponent:ListNhomnccComponent = inject(ListNhomnccComponent)
    _NhomnccService:NhomnccService = inject(NhomnccService)
    // _NccService:NccService = inject(NccService)
    _GraphqlService:GraphqlService = inject(GraphqlService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)

    // Signals for state management
    DetailNhomncc: any = this._NhomnccService.DetailNhomncc;
    isEdit = signal(false);
    isDelete = signal(false);
    isLoading = signal(false);
    nhomnccId:any = this._NhomnccService.nhomnccId;

    // Data properties
    ListNcc: any[] = [];
    FilterNcc: any[] = [];
    CheckListNcc: any[] = [];

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
     // console.log('DetailNhomnccComponent initialized');
      this.GetListNcc();
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
        this._NhomnccService.setNhomnccId(id);
      });
    }

    /**
     * Tối ưu hóa effect với error handling và loading states
     */
    private initializeEffect(): void {
      this.effectRef = effect(async () => {
        const id = this._NhomnccService.nhomnccId();
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
      this._router.navigate(['/admin/nhomncc']);
      this._ListnhomnccComponent.drawer.close();
    }

    /**
     * Xử lý khi tạo mới (ID = '0')
     */
    private handleNewRecord(): void {
      this.DetailNhomncc.update(() => ({
        name: '',
        description: '',
        isActive: true
      }));
      this._ListnhomnccComponent.drawer.open();
      this.isEdit.set(true);
      this._router.navigate(['/admin/nhomncc', 'new']);
    }

    /**
     * Xử lý khi chỉnh sửa record có sẵn
     */
    async GetListNcc(){
      const Nccs = await this._GraphqlService.findAll('Nhacungcap',{
        select: {
          id: true,
          name: true,
          mancc:true
        },
        take: 99999,
        aggressiveCache: true,
        enableParallelFetch: true,
      });
      this.ListNcc = this.FilterNcc = Nccs.data;
      console.log(this.ListNcc);
    }
    private async handleExistingRecord(id: string): Promise<void> {
      // Sử dụng Promise.all để load parallel
      await this.getNhomnccByid();
      this.CheckListNcc = this.DetailNhomncc()?.nhacungcap || [];
      this._ListnhomnccComponent.drawer.open();
      this._router.navigate(['/admin/nhomncc', id]);
    }
    async getNhomnccByid(){
      const Detail = await this._GraphqlService.findUnique('nhomncc', { id: this.nhomnccId() }, {
        select: { 
          id: true,
          name: true,
          description: true,
          nhacungcap: {select:{ id: true, name: true, mancc:true }}, 
        },
      });
      console.log(Detail);
      
      this.DetailNhomncc.update(() => Detail);
    }
    async handleNhomnccAction() {
      if (this.nhomnccId() === 'new') {
        await this.createNhomncc();
      }
      else {
        await this.updateNhomncc();
      }
    }
    private async createNhomncc() {
      console.log('Creating new nhomncc...');
      
      this.isLoading.set(true);
      try {
        // ✅ Validate basic data trước khi tạo
        const nhomnccData: any = {
          name: this.DetailNhomncc().name?.trim(),
          description: this.DetailNhomncc().description?.trim() || ''
        };

        // ✅ Validate required fields
        if (!nhomnccData.name) {
          throw new Error('Tên nhóm khách hàng không được để trống');
        }

        // ✅ Build ncc connection data for create operation
        const nccConnectionData = this.buildNccConnectionForCreate();
        if (nccConnectionData) {
          nhomnccData.nhacungcap = nccConnectionData;
          console.log('Adding ncc connections to create data:', nccConnectionData);
        }

        console.log('Creating nhomncc with data:', nhomnccData);

        // ✅ Tạo nhóm khách hàng với relations trong một lần gọi
        const result = await this._GraphqlService.createOne(
          'nhomncc',
          nhomnccData,
          { include: { nhacungcap: true } }
        );
        console.log('Created nhomncc result:', result);
        
        if (result && result?.id) {
          this._snackBar.open('Tạo Mới Thành Công', '', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });

          // ✅ Navigate to the new record và refresh data
          this._router.navigate(['/admin/nhomncc', result.id]);
          this.isEdit.set(false);
          
          // ✅ Refresh để load data mới với relations
          await this._NhomnccService.getNhomnccByid(result.id);
          this.CheckListNcc = this.DetailNhomncc()?.nhacungcap || [];
        }
      } catch (error: any) {
        console.error('Lỗi khi tạo nhomncc:', error);
        
        // ✅ Enhanced error handling for specific database constraint errors
        let errorMessage = 'Có lỗi xảy ra khi tạo nhóm khách hàng';
        
        if (error.message) {
          const errorMsg = error.message.toLowerCase();
          
          // Handle unique constraint violation
          if (errorMsg.includes('unique constraint failed') && errorMsg.includes('name')) {
            errorMessage = `Tên nhóm khách hàng "${this.DetailNhomncc().name}" đã tồn tại. Vui lòng chọn tên khác.`;
          }
          // Handle other specific errors
          else if (errorMsg.includes('foreign key constraint')) {
            errorMessage = 'Có lỗi liên kết dữ liệu. Vui lòng kiểm tra lại thông tin khách hàng.';
          }
          else if (errorMsg.includes('not null constraint')) {
            errorMessage = 'Thiếu thông tin bắt buộc. Vui lòng điền đầy đủ các trường.';
          }
          else {
            // Use original error message if not a specific database error
            errorMessage = error.message;
          }
        }
        
        this._snackBar.open(
          errorMessage, 
          '', 
          {
            duration: 5000, // Increased duration for error messages
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
     * ✅ Build ncc connection data for create operation
     */
    private buildNccConnectionForCreate(): any {
      try {
        // ✅ Validate và filter IDs từ CheckListNcc
        const nccIds = this.CheckListNcc
          .map((v: any) => v.id)
          .filter((id: any) => id && typeof id === 'string' && id.trim() !== '' && id.length >= 36);

        console.log('Building ncc connection for create with IDs:', nccIds);

        if (nccIds.length === 0) {
          console.log('No valid ncc IDs found for connection');
          return null;
        }

        // ✅ Build connection structure for create operation
        const connectionData = {
          connect: nccIds.map((id: string) => ({ id: id.trim() }))
        };

        console.log('Built ncc connection data:', connectionData);
        return connectionData;

      } catch (error) {
        console.error('Lỗi khi build ncc connection for create:', error);
        return null;
      }
    }

    /**
     * ✅ Build ncc relation update data for updateOne operation
     */
    private buildNccRelationUpdate(): any {
      try {
        // ✅ Validate và filter IDs
        const currentNccIds = this.DetailNhomncc()?.nhacungcap
          ?.map((v: any) => v.id)
          .filter((id: any) => id && typeof id === 'string') || [];
          
        const newNccIds = this.CheckListNcc
          .map((v: any) => v.id)
          .filter((id: any) => id && typeof id === 'string');

        console.log('=== DEBUGGING NCC RELATION UPDATE ===');
        console.log('Current ncc IDs:', currentNccIds);
        console.log('New ncc IDs (from CheckListNcc):', newNccIds);

        // ✅ So sánh để xác định có thay đổi không
        const currentSorted = [...currentNccIds].sort();
        const newSorted = [...newNccIds].sort();
        console.log('Current IDs sorted:', currentSorted);
        console.log('New IDs sorted:', newSorted);
        console.log('Are arrays equal?', JSON.stringify(currentSorted) === JSON.stringify(newSorted));

        // ✅ Chỉ build relation data nếu có sự thay đổi
        if (JSON.stringify(currentSorted) === JSON.stringify(newSorted)) {
          console.log('No relation changes detected for update');
          return null;
        }

        const toConnect = newNccIds.filter((id: string) => !currentNccIds.includes(id));
        const toDisconnect = currentNccIds.filter((id: string) => !newNccIds.includes(id));
        
        console.log('To connect:', toConnect);
        console.log('To disconnect:', toDisconnect);
        
        // ✅ Build relation update structure
        const relationData: any = {};

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
            relationData.disconnect = validToDisconnect.map((id: string) => ({ 
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
            relationData.connect = validToConnect.map((id: string) => ({ 
              id: id.trim() 
            }));
          }
        }

        console.log('Final relation update data:', relationData);
        console.log('=== END DEBUGGING ===');
        
        // ✅ Return null if no valid operations
        return Object.keys(relationData).length > 0 ? relationData : null;
        
      } catch (error) {
        console.error('Lỗi khi build ncc relation update:', error);
        return null;
      }
    }

    private async updateNhomncc() {
      this.isLoading.set(true);
      
      try {
        // ✅ Validate và clean basic data
        const nhomnccData: any = {
          name: this.DetailNhomncc().name?.trim(),
          description: this.DetailNhomncc().description?.trim() || ''
        };

        // ✅ Validate required fields
        if (!nhomnccData.name) {
          throw new Error('Tên nhóm khách hàng không được để trống');
        }

        // ✅ Build relation update data for ncc connections
        const relationUpdateData = this.buildNccRelationUpdate();
        if (relationUpdateData) {
          nhomnccData.nhacungcap = relationUpdateData;
          console.log('Adding relation updates to update data:', relationUpdateData);
        } else {
          console.log('No relation changes detected - basic update only');
        }

        console.log('Updating nhomncc with data:', nhomnccData);
        
        // ✅ Update nhóm khách hàng với relations trong một lần gọi
        const result = await this._GraphqlService.updateOne(
          'nhomncc', 
          { id: this.nhomnccId() }, 
          nhomnccData, 
          { include: { nhacungcap: true } }
        );

        console.log('Update result:', result);

        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });

        this.isEdit.set(false);
        
        
        // ✅ Refresh data để đảm bảo UI sync
        //await this._NhomnccService.getNhomnccByid(this.nhomnccId());
        //this.CheckListNcc = this.DetailNhomncc()?.nhacungcap || [];

      } catch (error: any) {
        console.error('Lỗi khi cập nhật nhomncc:', error);
        
        // ✅ Enhanced error handling for specific database constraint errors
        let errorMessage = 'Có lỗi xảy ra khi cập nhật nhóm khách hàng';
        
        if (error.message) {
          const errorMsg = error.message.toLowerCase();
          
          // Handle unique constraint violation
          if (errorMsg.includes('unique constraint failed') && errorMsg.includes('name')) {
            errorMessage = `Tên nhóm khách hàng "${this.DetailNhomncc().name}" đã tồn tại. Vui lòng chọn tên khác.`;
          }
          // Handle other specific errors
          else if (errorMsg.includes('foreign key constraint')) {
            errorMessage = 'Có lỗi liên kết dữ liệu. Vui lòng kiểm tra lại thông tin khách hàng.';
          }
          else if (errorMsg.includes('not null constraint')) {
            errorMessage = 'Thiếu thông tin bắt buộc. Vui lòng điền đầy đủ các trường.';
          }
          else if (errorMsg.includes('record not found')) {
            errorMessage = 'Không tìm thấy nhóm khách hàng để cập nhật.';
          }
          else {
            // Use original error message if not a specific database error
            errorMessage = error.message;
          }
        }
        
        this._snackBar.open(
          errorMessage, 
          '', 
          {
            duration: 5000, // Increased duration for error messages
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
        const currentNccIds = this.DetailNhomncc()?.nhacungcap
          ?.map((v: any) => v.id)
          .filter((id: any) => id && typeof id === 'string') || [];
          
        const newNccIds = this.CheckListNcc
          .map((v: any) => v.id)
          .filter((id: any) => id && typeof id === 'string');

        console.log('=== DEBUGGING NESTED RELATION DATA ===');
        console.log('Current nhomncc data:', this.DetailNhomncc());
        console.log('Current ncc from DetailNhomncc:', this.DetailNhomncc()?.nhacungcap);
        console.log('CheckListNcc:', this.CheckListNcc);
        console.log('Current ncc IDs:', currentNccIds);
        console.log('New ncc IDs (from CheckListNcc):', newNccIds);

        // ✅ So sánh chi tiết
        const currentSorted = [...currentNccIds].sort();
        const newSorted = [...newNccIds].sort();
        console.log('Current IDs sorted:', currentSorted);
        console.log('New IDs sorted:', newSorted);
        console.log('Are arrays equal?', JSON.stringify(currentSorted) === JSON.stringify(newSorted));

        // ✅ Chỉ build relation data nếu có sự thay đổi
        if (JSON.stringify(currentSorted) === JSON.stringify(newSorted)) {
          console.log('No relation changes detected for nested update');
          return null;
        }

        const toConnect = newNccIds.filter((id: string) => !currentNccIds.includes(id));
        const toDisconnect = currentNccIds.filter((id: string) => !newNccIds.includes(id));
        
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
     * ✅ Method riêng để xử lý relations (kept for ApplyNcc method)
     */
    private async updateNccRelations(): Promise<void> {
      try {
        // ✅ Validate và filter IDs
        const currentNccIds = this.DetailNhomncc()?.nhacungcap
          ?.map((v: any) => v.id)
          .filter((id: any) => id && typeof id === 'string') || [];
          
        const newNccIds = this.CheckListNcc
          .map((v: any) => v.id)
          .filter((id: any) => id && typeof id === 'string');

        console.log('Current ncc IDs:', currentNccIds);
        console.log('New ncc IDs:', newNccIds);

        // ✅ Chỉ update relation nếu có sự thay đổi
        if (JSON.stringify(currentNccIds.sort()) !== JSON.stringify(newNccIds.sort())) {
          const toConnect = newNccIds.filter((id: string) => !currentNccIds.includes(id));
          const toDisconnect = currentNccIds.filter((id: string) => !newNccIds.includes(id));
          
          console.log('To connect:', toConnect);
          console.log('To disconnect:', toDisconnect);
          
          const relationUpdateData = this.buildRelationUpdateData(toConnect, toDisconnect);
          
          if (relationUpdateData) {
            console.log('Updating relations with data:', relationUpdateData);
            
            const relationResult = await this._GraphqlService.updateOne(
              'nhomncc',
              { id: this.nhomnccId() },
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
        await this._NhomnccService.DeleteNhomncc(this.DetailNhomncc());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/nhomncc']);
      } catch (error) {
        console.error('Lỗi khi xóa nhomncc:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/nhomncc'])
      this._ListnhomnccComponent.drawer.close();
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
      this.DetailNhomncc.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }

    /**
     * Tối ưu hóa filter khách hàng với debounce
     */
    doFilterNcc(event:any){
      const value = event.target.value;
      if (value.length < 2) 
        {
          this.FilterNcc = this.ListNcc;
          return; // Chỉ filter khi >= 2 ký tự
        }
      const normalizedFilter = removeVietnameseAccents(value.trim().toLowerCase());
      this.FilterNcc = this.ListNcc.filter((v) => 
        removeVietnameseAccents(v.name.toLowerCase()).includes(normalizedFilter)
      );
    }

    ChosenNcc(item:any){
      const checkitem = this.CheckListNcc.find((v) => v.id === item.id);  
         console.log(this.CheckListNcc);
        console.log(item);          
        console.log(checkitem);          
      if(!checkitem){
        this.CheckListNcc = [...this.CheckListNcc, item];        
      }
      else{
        this.CheckListNcc = this.CheckListNcc.filter((v) => v.id !== item.id);
      }
    }
    /**
     * Tối ưu hóa việc áp dụng khách hàng với GraphQL
     */
    async ApplyNcc(menu:any){
      // this.isLoading.set(true);
      menu.closeMenu();
      // try {
      //   // Validate và filter data
      //   const currentNccIds = this.DetailNhomncc()?.nhacungcap?.map((v:any) => v.id).filter((id: any) => id) || [];
      //   const newNccIds = this.CheckListNcc.map((v:any) => v.id).filter((id: any) => id);
        
      //   // Validate nhomnccId
      //   const nhomnccId = this.nhomnccId();
      //   if (!nhomnccId) {
      //     throw new Error('Không tìm thấy ID nhóm khách hàng');
      //   }
      //   console.log(this.DetailNhomncc());
      //   console.log(currentNccIds);
        
      //   // Tối ưu: chỉ thực hiện operations khi có thay đổi
      //   if (JSON.stringify(currentNccIds.sort()) === JSON.stringify(newNccIds.sort())) {
      //     menu.closeMenu();
      //     this.isLoading.set(false);
      //     return;
      //   }

      //   // Tính toán các khách hàng cần thêm và xóa
      //   const toConnect = newNccIds.filter((id: string) => !currentNccIds.includes(id));
      //   const toDisconnect = currentNccIds.filter((id: string) => !newNccIds.includes(id));
        
      //   // Cập nhật quan hệ với GraphQL chỉ khi có thay đổi
      //   const updateData = this.buildRelationUpdateData(toConnect, toDisconnect);
        
      //   if (updateData) {
      //     await this._GraphqlService.updateOne(
      //       'nhomncc',
      //       { id: nhomnccId },
      //       updateData
      //     );
      //   }

      //   this._snackBar.open('Cập nhật khách hàng thành công', '', {
      //     duration: 2000,
      //     horizontalPosition: 'end',
      //     verticalPosition: 'top',
      //     panelClass: ['snackbar-success'],
      //   });
        
      //   // Refresh data để cập nhật UI
      //   await this._NhomnccService.getNhomnccByid(this.nhomnccId());
      //   menu.closeMenu();
        
      // } catch (error) {
      //   console.error('Lỗi khi cập nhật khách hàng:', error);
      //   this._snackBar.open('Có lỗi xảy ra khi cập nhật khách hàng', '', {
      //     duration: 3000,
      //     horizontalPosition: 'end',
      //     verticalPosition: 'top',
      //     panelClass: ['snackbar-error'],
      //   });
      // } finally {
      //   this.isLoading.set(false);
      // }
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
        ncc: {}
      };

      if (validToDisconnect.length > 0) {
        updateData.ncc.disconnect = validToDisconnect.map((id: string) => ({ 
          id: id.trim() 
        }));
      }

      if (validToConnect.length > 0) {
        updateData.ncc.connect = validToConnect.map((id: string) => ({ 
          id: id.trim() 
        }));
      }

      console.log('Built relation update data:', updateData);
      return updateData;
    }

    /**
     * ✅ Enhanced error message handler for database constraint errors
     */
    private getErrorMessage(error: any, operation: 'create' | 'update' | 'delete' = 'create'): string {
      if (!error?.message) {
        return `Có lỗi xảy ra khi ${operation === 'create' ? 'tạo' : operation === 'update' ? 'cập nhật' : 'xóa'} nhóm khách hàng`;
      }

      const errorMsg = error.message.toLowerCase();
      const currentName = this.DetailNhomncc()?.name || 'nhóm khách hàng';
      
      // Handle unique constraint violation
      if (errorMsg.includes('unique constraint failed') && errorMsg.includes('name')) {
        return `Tên nhóm khách hàng "${currentName}" đã tồn tại. Vui lòng chọn tên khác.`;
      }
      
      // Handle foreign key constraint
      if (errorMsg.includes('foreign key constraint')) {
        return 'Có lỗi liên kết dữ liệu. Vui lòng kiểm tra lại thông tin khách hàng.';
      }
      
      // Handle not null constraint
      if (errorMsg.includes('not null constraint')) {
        return 'Thiếu thông tin bắt buộc. Vui lòng điền đầy đủ các trường.';
      }
      
      // Handle record not found
      if (errorMsg.includes('record not found')) {
        return operation === 'update' ? 'Không tìm thấy nhóm khách hàng để cập nhật.' : 'Không tìm thấy dữ liệu.';
      }
      
      // Handle permission errors
      if (errorMsg.includes('permission') || errorMsg.includes('access')) {
        return 'Bạn không có quyền thực hiện thao tác này.';
      }
      
      // Handle network/connection errors
      if (errorMsg.includes('network') || errorMsg.includes('connection') || errorMsg.includes('timeout')) {
        return 'Lỗi kết nối. Vui lòng kiểm tra internet và thử lại.';
      }
      
      // Return original error message for unknown errors
      return error.message;
    }
    
    CheckNcc(item:any) {
      return this.CheckListNcc.find((v:any) => v.id === item.id) ? true : false;
    }

    /**
     * 🔍 Debug method để test relation updates
     */
    debugRelationUpdate() {
      console.log('=== MANUAL DEBUG TEST ===');
      const relationData = this.buildNestedRelationData();
      console.log('Manual test result:', relationData);
      
      // Test với fake data
      console.log('Current DetailNhomncc:', this.DetailNhomncc());
      console.log('Current CheckListNcc:', this.CheckListNcc);
      
      if (this.CheckListNcc.length > 0) {
        console.log('CheckListNcc has items, should create relation updates');
      } else {
        console.log('CheckListNcc is empty, should disconnect all');
      }
      
      console.log('=== END MANUAL DEBUG ===');
    }
    
    /**
     * Xóa khách hàng khỏi danh sách nhóm khách hàng
     */
    RemoveNcc(item: any) {
      if (!item || !item.id) {
        console.warn('Invalid item to remove:', item);
        return;
      }

      // Tạo array mới thay vì mutate array cũ
      this.CheckListNcc = this.CheckListNcc.filter((v: any) => v.id !== item.id);
      console.log(`Đã xóa khách hàng ${item.name} khỏi danh sách`);
    }
}