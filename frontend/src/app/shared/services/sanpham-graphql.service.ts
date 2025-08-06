import { Injectable, signal } from '@angular/core';
import { GraphqlService } from '../shared/services/graphql.service';
import { StorageService } from '../shared/utils/storage.service';
import { ErrorLogService } from '../shared/services/errorlog.service';

/**
 * Enhanced Sanpham Service using GraphQL
 * This service demonstrates how to integrate the GraphQL service
 * with existing service patterns while maintaining compatibility
 */
@Injectable({
  providedIn: 'root'
})
export class SanphamGraphQLService {
  // Reactive signals for state management
  ListSanpham = signal<any[]>([]);
  DetailSanpham = signal<any>({});
  sanphamId = signal<string | null>(null);
  page = signal<number>(1);
  totalPages = signal<number>(1);
  total = signal<number>(0);
  pageSize = signal<number>(50);

  // GraphQL loading and error states
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(
    private graphqlService: GraphqlService,
    private _StorageService: StorageService,
    private _ErrorLogService: ErrorLogService
  ) {}

  /**
   * Set current sanpham ID
   */
  setSanphamId(id: string | null): void {
    this.sanphamId.set(id);
  }

  /**
   * Get all sanphams with pagination and filtering
   */
  async getAllSanpham(options: {
    page?: number;
    pageSize?: number;
    search?: string;
    filters?: any;
    orderBy?: any;
  } = {}): Promise<void> {
    try {
      this.isLoading.set(true);
      this.error.set(null);

      const {
        page = this.page(),
        pageSize = this.pageSize(),
        search,
        filters = {},
        orderBy = { createdAt: 'desc' }
      } = options;

      const skip = (page - 1) * pageSize;

      // Build where clause
      let whereClause = { ...filters };

      // Add search functionality
      if (search) {
        whereClause.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { masp: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ];
      }

      const result = await this.graphqlService.getSanphams({
        where: whereClause,
        orderBy,
        skip,
        take: pageSize,
        include: {
          banggia: true,
          nhacungcap: true,
          tonkhos: {
            include: {
              kho: true
            }
          }
        }
      });

      if (result.data) {
        this.ListSanpham.set(result.data.data);
        this.total.set(result.data.total);
        this.page.set(page);
        this.pageSize.set(pageSize);
        this.totalPages.set(Math.ceil(result.data.total / pageSize));
      }

      if (result.errors) {
        this.error.set(result.errors.map(e => e.message).join(', '));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.error.set(errorMessage);
      await this._ErrorLogService.logError('Failed to get all sanpham', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Get sanpham by ID
   */
  async getSanphamById(id: string): Promise<void> {
    try {
      this.isLoading.set(true);
      this.error.set(null);

      const result = await this.graphqlService.getSanphamById(id, {
        banggia: true,
        nhacungcap: true,
        tonkhos: {
          include: {
            kho: true
          }
        },
        donhangsanphams: {
          include: {
            donhang: {
              include: {
                khachhang: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      });

      if (result.data) {
        this.DetailSanpham.set(result.data);
        this.sanphamId.set(id);
      }

      if (result.errors) {
        this.error.set(result.errors.map(e => e.message).join(', '));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.error.set(errorMessage);
      await this._ErrorLogService.logError('Failed to get sanpham by id', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Create new sanpham
   */
  async createSanpham(data: any): Promise<boolean> {
    try {
      this.isLoading.set(true);
      this.error.set(null);

      const result = await this.graphqlService.createSanpham(data);

      if (result.data) {
        // Refresh the list
        await this.getAllSanpham();
        this.setSanphamId(result.data.id);
        return true;
      }

      if (result.errors) {
        this.error.set(result.errors.map(e => e.message).join(', '));
      }

      return false;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.error.set(errorMessage);
      await this._ErrorLogService.logError('Failed to create sanpham', error);
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Update sanpham
   */
  async updateSanpham(id: string, data: any): Promise<boolean> {
    try {
      this.isLoading.set(true);
      this.error.set(null);

      const result = await this.graphqlService.updateSanpham(id, data);

      if (result.data) {
        // Update the detail if it's the current item
        if (this.sanphamId() === id) {
          this.DetailSanpham.set(result.data);
        }
        
        // Refresh the list
        await this.getAllSanpham();
        return true;
      }

      if (result.errors) {
        this.error.set(result.errors.map(e => e.message).join(', '));
      }

      return false;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.error.set(errorMessage);
      await this._ErrorLogService.logError('Failed to update sanpham', error);
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Delete sanpham
   */
  async deleteSanpham(id: string): Promise<boolean> {
    try {
      this.isLoading.set(true);
      this.error.set(null);

      const result = await this.graphqlService.deleteSanpham(id);

      if (result.data) {
        // Clear detail if it's the deleted item
        if (this.sanphamId() === id) {
          this.DetailSanpham.set({});
          this.setSanphamId(null);
        }
        
        // Refresh the list
        await this.getAllSanpham();
        return true;
      }

      if (result.errors) {
        this.error.set(result.errors.map(e => e.message).join(', '));
      }

      return false;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.error.set(errorMessage);
      await this._ErrorLogService.logError('Failed to delete sanpham', error);
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Bulk delete sanphams
   */
  async bulkDeleteSanphams(ids: string[]): Promise<boolean> {
    try {
      this.isLoading.set(true);
      this.error.set(null);

      const result = await this.graphqlService.bulkDelete('Sanpham', ids);

      if (result.data) {
        // Clear detail if it's one of the deleted items
        if (this.sanphamId() && ids.includes(this.sanphamId()!)) {
          this.DetailSanpham.set({});
          this.setSanphamId(null);
        }
        
        // Refresh the list
        await this.getAllSanpham();
        return true;
      }

      if (result.errors) {
        this.error.set(result.errors.map(e => e.message).join(', '));
      }

      return false;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.error.set(errorMessage);
      await this._ErrorLogService.logError('Failed to bulk delete sanphams', error);
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Search sanphams
   */
  async searchSanpham(searchTerm: string): Promise<void> {
    try {
      this.isLoading.set(true);
      this.error.set(null);

      const result = await this.graphqlService.search(
        'Sanpham',
        searchTerm,
        ['title', 'masp', 'description'],
        {
          take: this.pageSize(),
          orderBy: { title: 'asc' },
          include: {
            banggia: true,
            nhacungcap: true
          }
        }
      );

      if (result.data) {
        this.ListSanpham.set(result.data.data);
        this.total.set(result.data.total);
        this.page.set(1);
        this.totalPages.set(Math.ceil(result.data.total / this.pageSize()));
      }

      if (result.errors) {
        this.error.set(result.errors.map(e => e.message).join(', '));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.error.set(errorMessage);
      await this._ErrorLogService.logError('Failed to search sanpham', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Import sanphams (batch create)
   */
  async importSanphams(sanphams: any[]): Promise<boolean> {
    try {
      this.isLoading.set(true);
      this.error.set(null);

      const result = await this.graphqlService.batchCreate('Sanpham', sanphams);

      if (result.data) {
        // Refresh the list
        await this.getAllSanpham();
        return true;
      }

      if (result.errors) {
        this.error.set(result.errors.map(e => e.message).join(', '));
      }

      return false;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.error.set(errorMessage);
      await this._ErrorLogService.logError('Failed to import sanphams', error);
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Get sanphams with low stock
   */
  async getLowStockSanphams(minStock: number = 10): Promise<void> {
    try {
      this.isLoading.set(true);
      this.error.set(null);

      const result = await this.graphqlService.findMany('Sanpham', {
        where: {
          tonkhos: {
            some: {
              soluong: { lte: minStock }
            }
          }
        },
        include: {
          tonkhos: {
            where: { soluong: { lte: minStock } },
            include: { kho: true }
          },
          nhacungcap: true
        },
        orderBy: { title: 'asc' }
      });

      if (result.data) {
        this.ListSanpham.set(result.data.data);
        this.total.set(result.data.total);
      }

      if (result.errors) {
        this.error.set(result.errors.map(e => e.message).join(', '));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.error.set(errorMessage);
      await this._ErrorLogService.logError('Failed to get low stock sanphams', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Get sanphams by supplier
   */
  async getSanphamsBySupplier(nhacungcapId: string): Promise<void> {
    try {
      this.isLoading.set(true);
      this.error.set(null);

      const result = await this.graphqlService.getSanphams({
        where: { nhacungcapId },
        include: {
          banggia: true,
          nhacungcap: true,
          tonkhos: {
            include: { kho: true }
          }
        },
        orderBy: { title: 'asc' }
      });

      if (result.data) {
        this.ListSanpham.set(result.data.data);
        this.total.set(result.data.total);
      }

      if (result.errors) {
        this.error.set(result.errors.map(e => e.message).join(', '));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.error.set(errorMessage);
      await this._ErrorLogService.logError('Failed to get sanphams by supplier', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Get pagination info
   */
  getPaginationInfo() {
    return {
      currentPage: this.page(),
      totalPages: this.totalPages(),
      pageSize: this.pageSize(),
      total: this.total(),
      hasNextPage: this.page() < this.totalPages(),
      hasPreviousPage: this.page() > 1
    };
  }

  /**
   * Go to next page
   */
  async nextPage(): Promise<void> {
    if (this.page() < this.totalPages()) {
      await this.getAllSanpham({ page: this.page() + 1 });
    }
  }

  /**
   * Go to previous page
   */
  async previousPage(): Promise<void> {
    if (this.page() > 1) {
      await this.getAllSanpham({ page: this.page() - 1 });
    }
  }

  /**
   * Go to specific page
   */
  async goToPage(page: number): Promise<void> {
    if (page >= 1 && page <= this.totalPages()) {
      await this.getAllSanpham({ page });
    }
  }

  /**
   * Clear error
   */
  clearError(): void {
    this.error.set(null);
  }

  /**
   * Reset state
   */
  reset(): void {
    this.ListSanpham.set([]);
    this.DetailSanpham.set({});
    this.sanphamId.set(null);
    this.page.set(1);
    this.totalPages.set(1);
    this.total.set(0);
    this.clearError();
  }
}
