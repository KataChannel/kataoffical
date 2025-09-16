import { Injectable, WritableSignal, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { StorageService } from '../../shared/utils/storage.service';
import { GraphqlService } from '../../shared/services/graphql.service';
import { UserService } from '../user/user.service';
import { environment } from '../../../environments/environment.development';
import { genMaDonhang } from '../../shared/utils/shared.utils';

// Type interfaces for master-detail structure
export interface ChotkhoData {
  id?: string;
  ngaychot?: Date;
  title?: string;
  ghichu?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  codeId?: string;
  order?: number;
  khoId?: string;
  userId?: string;
  kho?: any;
  user?: any;
  details?: ChotkhodetailData[];
}

export interface KhoInterface {
  id: string;
  name: string;
  diachi?: string;
  ghichu?: string;
  status?: boolean;
}

export interface SanphamInterface {
  id: string;
  masanpham: string;
  tensanpham: string;
  donvitinh?: string;
  dongia?: number;
  status?: boolean;
  ghichu?: string;
  tonkho?: {
    slton: number;
    slhuy: number;
    sltinhthucte: number;
    ngaycapnhat?: Date;
  };
}

export interface ChotkhodetailData {
  id?: string;
  sltonhethong?: number;
  sltonthucte?: number;
  slhuy?: number;
  chenhlech?: number;
  sanphamId?: string;
  chotkhoId?: string;
  sanpham?: any;
  isActive?: boolean;
}

export interface ChotkhoSearchParams {
  startDate?: string;
  endDate?: string;
  khoId?: string;
  userId?: string;
  searchText?: string;
  keyword?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}

export interface ChotkhoCreateData {
  ngaychot?: Date;
  title?: string;
  ghichu?: string;
  khoId?: string;
  userId?: string;
  isActive?: boolean;
  details?: ChotkhodetailCreateData[];
}

export interface ChotkhodetailCreateData {
  sanphamId?: string;
  sltonhethong?: number;
  sltonthucte?: number;
  slhuy?: number;
  chenhlech?: number;
  ghichu?: string;
  userId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChotkhoService {
  private graphqlService = inject(GraphqlService);
  private storageService = inject(StorageService);
  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);
  private http = inject(HttpClient);
  private apollo = inject(Apollo);

  private apiUrl = environment.APIURL;
  private readonly modelName = 'chotkho';
  private readonly detailModelName = 'chotkhodetail';

  chotkhos: WritableSignal<ChotkhoData[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);
  selectedChotkho: WritableSignal<ChotkhoData | null> = signal(null);
  
  ListChotkho: WritableSignal<ChotkhoData[]> = signal([]);
  DetailChotkho: WritableSignal<ChotkhoData | null> = signal(null);
  page: WritableSignal<number> = signal(1);
  totalPages: WritableSignal<number> = signal(1);
  total: WritableSignal<number> = signal(0);
  pageSize: WritableSignal<number> = signal(50);
  chotkhoId: WritableSignal<string | null> = signal(null);
  isRefreshing: WritableSignal<boolean> = signal(false);
  lastUpdated: WritableSignal<Date | null> = signal(null);

  async createChotkhoWithDetails(data: ChotkhoCreateData): Promise<boolean> {
    try {
      this.isLoading.set(true);

      const masterData = {
        ngaychot: data.ngaychot,
        title: data.title,
        ghichu: data.ghichu,
        userId: data.userId || await this.getCurrentUserId(),
        codeId: new Date().getTime().toString()
      };

      const masterResult = await this.graphqlService.createOne(
        this.modelName,
        masterData,
        {
          select: {
            id: true,
            ngaychot: true,
            title: true,
            ghichu: true,
            userId: true,
            codeId: true
          }
        }
      );

      if (!masterResult || !masterResult.id) {
        this.showErrorMessage('Lỗi khi tạo chốt kho');
        return false;
      }

      if (data.details && data.details.length > 0) {
        for (const detail of data.details) {
          const detailData = {
            ...detail,
            chotkhoId: masterResult.id,
            userId: data.userId || await this.getCurrentUserId(),
            chenhlech: this.calculateChenhLech(
              detail.sltonhethong || 0,
              detail.sltonthucte || 0,
              detail.slhuy || 0
            )
          };

          await this.graphqlService.createOne(
            this.detailModelName,
            detailData,
            {
              select: {
                id: true,
                sanphamId: true,
                sltonhethong: true,
                sltonthucte: true,
                slhuy: true,
                chenhlech: true,
                ghichu: true,
                chotkhoId: true
              }
            }
          );
        }
      }

      this.showSuccessMessage('Tạo chốt kho thành công');
      await this.getAllChotkho();
      return true;

    } catch (error) {
      console.error('Error creating chotkho with details:', error);
      this.showErrorMessage('Lỗi khi tạo chốt kho');
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  async getAllChotkho(searchParam?: ChotkhoSearchParams): Promise<void> {
    try {
      this.isLoading.set(true);
      
      let whereClause = 'isActive: true';
      
      if (searchParam) {
        const conditions = [];
        
        if (searchParam.khoId) {
          conditions.push(`khoId: "${searchParam.khoId}"`);
        }
        
        if (searchParam.userId) {
          conditions.push(`userId: "${searchParam.userId}"`);
        }
        
        if (searchParam.startDate && searchParam.endDate) {
          conditions.push(`ngaychot: { gte: "${searchParam.startDate}", lte: "${searchParam.endDate}" }`);
        }
        
        if (searchParam.searchText) {
          conditions.push(`OR: [
            { title: { contains: "${searchParam.searchText}" } },
            { ghichu: { contains: "${searchParam.searchText}" } },
            { codeId: { contains: "${searchParam.searchText}" } }
          ]`);
        }
        
        if (conditions.length > 0) {
          whereClause = `AND: [{ isActive: true }, { ${conditions.join(', ')} }]`;
        }
      }

      const result = await this.graphqlService.findMany(
        this.modelName,
        {
          where: whereClause,
          orderBy: { ngaychot: 'desc' },
          skip: ((searchParam?.page || 1) - 1) * (searchParam?.limit || 50),
          take: searchParam?.limit || 50,
          include: {
            kho: {
              select: { id: true, name: true }
            },
            user: {
              select: { 
                id: true, 
                email: true,
                profile: {
                  select: { name: true }
                }
              }
            },
            details: {
              include: {
                sanpham: {
                  select: { id: true, title: true }
                }
              }
            }
          }
        }
      );

      if (result) {
        this.ListChotkho.set(result || []);
        this.chotkhos.set(result || []);
        this.total.set(result.length || 0);
        this.totalPages.set(Math.ceil((result.length || 0) / (searchParam?.limit || 50)));
        this.page.set(searchParam?.page || 1);
      }

    } catch (error) {
      console.error('Error getting chotkho data:', error);
      this.showErrorMessage('Lỗi khi tải dữ liệu chốt kho');
    } finally {
      this.isLoading.set(false);
    }
  }

  async getChotkhoById(id: string): Promise<ChotkhoData | null> {
    try {
      this.isLoading.set(true);

      const result = await this.graphqlService.findUnique(
        this.modelName,
        { id },
        {
          include: {
            user: {
              select: { 
                id: true, 
                email: true,
                profile: {
                  select: { name: true }
                }
              }
            },
            details: {
              include: {
                sanpham: {
                  select: { id: true, title: true}
                }
              }
            }
          }
        }
      );      
      if (result) {
        this.selectedChotkho.set(result);
        this.DetailChotkho.set(result);
        return result;
      }

      return null;

    } catch (error) {
      console.error('Error getting chotkho by id:', error);
      this.showErrorMessage('Lỗi khi lấy thông tin chốt kho');
      return null;
    } finally {
      this.isLoading.set(false);
    }
  }

  async updateChotkho(id: string, data: Partial<ChotkhoData>): Promise<boolean> {
    try {
      this.isLoading.set(true);

      const updateData = {
        ngaychot: data.ngaychot,
        title: data.title,
        ghichu: data.ghichu,
        khoId: data.khoId,
        isActive: data.isActive
      };

      const result = await this.graphqlService.updateOne(
        this.modelName,
        { id },
        updateData,
        {
          select: {
            id: true,
            ngaychot: true,
            title: true,
            ghichu: true,
            khoId: true
          }
        }
      );

      if (result) {
        this.showSuccessMessage('Cập nhật chốt kho thành công');
        await this.getAllChotkho();
        return true;
      }

      return false;

    } catch (error) {
      console.error('Error updating chotkho:', error);
      this.showErrorMessage('Lỗi khi cập nhật chốt kho');
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  async deleteChotkho(id: string): Promise<boolean> {
    try {
      this.isLoading.set(true);

      const result = await this.graphqlService.updateOne(
        this.modelName,
        { id },
        { isActive: false },
        {
          select: {
            id: true,
            isActive: true
          }
        }
      );

      if (result) {
        this.showSuccessMessage('Xóa chốt kho thành công');
        await this.getAllChotkho();
        return true;
      }

      return false;

    } catch (error) {
      console.error('Error deleting chotkho:', error);
      this.showErrorMessage('Lỗi khi xóa chốt kho');
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  async addChotkhoDetail(chotkhoId: string, detailData: ChotkhodetailCreateData): Promise<boolean> {
    try {
      const data = {
        ...detailData,
        chotkhoId: chotkhoId,
        userId: await this.getCurrentUserId(),
        chenhlech: this.calculateChenhLech(
          detailData.sltonhethong || 0,
          detailData.sltonthucte || 0,
          detailData.slhuy || 0
        )
      };

      const result = await this.graphqlService.createOne(
        this.detailModelName,
        data,
        {
          select: {
            id: true,
            sanphamId: true,
            sltonhethong: true,
            sltonthucte: true,
            slhuy: true,
            chenhlech: true,
            ghichu: true,
            chotkhoId: true
          }
        }
      );

      if (result) {
        this.showSuccessMessage('Thêm chi tiết thành công');
        await this.getChotkhoById(chotkhoId);
        return true;
      }

      return false;

    } catch (error) {
      console.error('Error adding chotkho detail:', error);
      this.showErrorMessage('Lỗi khi thêm chi tiết chốt kho');
      return false;
    }
  }

  calculateChenhLech(sltonhethong: number, sltonthucte: number, slhuy: number): number {
    return sltonhethong - sltonthucte - slhuy;
  }

  generateChotkhoCode(): string {
    const now = new Date();
    const dateStr = now.getFullYear().toString().substr(-2) + 
                   (now.getMonth() + 1).toString().padStart(2, '0') + 
                   now.getDate().toString().padStart(2, '0');
    const timeStr = now.getHours().toString().padStart(2, '0') + 
                   now.getMinutes().toString().padStart(2, '0');
    return `CK${dateStr}${timeStr}`;
  }

  setChotkhoId(id: string | null): void {
    this.chotkhoId.set(id);
  }

  private async getCurrentUserId(): Promise<string | null> {
    try {
      const profile = await this.userService.getProfile();
      return profile?.id || null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-success']
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });
  }

  // Additional methods used by listchotkho component (placeholder implementations)
  
  async getUpdatedCodeIds(): Promise<void> {
    // Placeholder - implement code ID updates if needed
    console.log('getUpdatedCodeIds - implement if needed');
  }

  async DeleteChotkho(item: any): Promise<void> {
    // Delegate to deleteChotkho method
    if (item?.id) {
      await this.deleteChotkho(item.id);
    }
  }

  async getStatistics(): Promise<any> {
    // Placeholder - implement statistics if needed
    return {
      total: this.ListChotkho().length,
      active: this.ListChotkho().filter(item => item.isActive).length
    };
  }

  async generateReport(options: any): Promise<any> {
    // Placeholder - implement report generation if needed
    console.log('generateReport - implement if needed', options);
    return { success: true, message: 'Report placeholder' };
  }

  async bulkUpdateStatus(ids: string[], status: any): Promise<boolean> {
    // Placeholder - implement bulk updates if needed
    console.log('bulkUpdateStatus - implement if needed', ids, status);
    return true;
  }

  async importFromExcel(file: File, options: any): Promise<any> {
    // Placeholder - implement Excel import if needed
    console.log('importFromExcel - implement if needed', file, options);
    return { success: true, message: 'Import placeholder' };
  }

  async backupData(type: string): Promise<boolean> {
    // Placeholder - implement backup if needed
    console.log('backupData - implement if needed', type);
    return true;
  }

  async optimizePerformance(): Promise<any> {
    // Placeholder - implement performance optimization if needed
    console.log('optimizePerformance - implement if needed');
    return { success: true };
  }

  async getSystemHealth(): Promise<any> {
    // Placeholder - implement system health check if needed
    console.log('getSystemHealth - implement if needed');
    return { status: 'healthy' };
  }

  async generateImportTemplate(type: string): Promise<boolean> {
    // Placeholder - implement template generation if needed
    console.log('generateImportTemplate - implement if needed', type);
    return true;
  }

  async exportData(format: string, options: any): Promise<boolean> {
    // Placeholder - implement data export if needed
    console.log('exportData - implement if needed', format, options);
    return true;
  }

  async smartCheckChenhLech(id: string): Promise<any> {
    // Placeholder - implement smart check if needed
    console.log('smartCheckChenhLech - implement if needed', id);
    return { success: true };
  }

  async restoreFromBackup(file: File): Promise<boolean> {
    // Placeholder - implement backup restore if needed
    console.log('restoreFromBackup - implement if needed', file);
    return true;
  }

  // Get all warehouses for selection
  async getAllWarehouses(): Promise<KhoInterface[]> {
    const query = gql`
      query chotkhoGetAllWarehouses {
        chotkhoGetAllWarehouses
      }
    `;

    try {
      const response = await firstValueFrom(this.apollo.query<{ chotkhoGetAllWarehouses: any }>({
        query,
        fetchPolicy: 'cache-first'
      }));
      return response.data.chotkhoGetAllWarehouses || [];
    } catch (error) {
      console.error('Error getting warehouses:', error);
      throw error;
    }
  }

  // Get all products in a specific warehouse
  async getProductsByWarehouse(khoId: string): Promise<SanphamInterface[]> {
    const query = gql`
      query chotkhoGetProductsByWarehouse($khoId: String!) {
        chotkhoGetProductsByWarehouse(khoId: $khoId)
      }
    `;

    try {
      const response = await firstValueFrom(this.apollo.query<{ chotkhoGetProductsByWarehouse: any }>({
        query,
        variables: { khoId },
        fetchPolicy: 'cache-first'
      }));
      return response.data.chotkhoGetProductsByWarehouse || [];
    } catch (error) {
      console.error('Error getting products by warehouse:', error);
      throw error;
    }
  }

  // Get all products with tonkho information (no warehouse filter)
  async getAllProducts(): Promise<SanphamInterface[]> {
    const query = gql`
      query chotkhoGetAllProducts {
        chotkhoGetAllProducts
      }
    `;

    try {
      const response = await firstValueFrom(this.apollo.query<{ chotkhoGetAllProducts: any }>({
        query,
        fetchPolicy: 'cache-first'
      }));
      return response.data.chotkhoGetAllProducts || [];
    } catch (error) {
      console.error('Error getting all products:', error);
      throw error;
    }
  }
}