/**
 * GraphQL Service Usage Examples
 * 
 * This file contains practical examples of how to use the GraphQL service
 * in your Angular components and services.
 */

import { Component, inject, signal, OnInit } from '@angular/core';
import { GraphqlService } from './graphql.service';

@Component({
  selector: 'app-example-component',
  template: `
    <!-- Loading state -->
    <div *ngIf="graphqlService.isLoading()">Loading...</div>
    
    <!-- Error state -->
    <div *ngIf="graphqlService.error()" class="error">
      Error: {{ graphqlService.error() }}
    </div>
    
    <!-- Data display -->
    <div *ngFor="let item of data()">
      {{ item.title }}
    </div>
  `
})
export class ExampleComponent implements OnInit {
  private graphqlService = inject(GraphqlService);
  
  // Reactive signals for data
  data = signal<any[]>([]);
  selectedItem = signal<any>(null);

  async ngOnInit() {
    await this.loadInitialData();
  }

  // Example 1: Basic data fetching with pagination
  async loadSanphams() {
    try {
      const result = await this.graphqlService.getSanphams({
        take: 10,
        skip: 0,
        orderBy: { createdAt: 'desc' },
        include: {
          banggia: true,
          nhacungcap: true
        }
      });

      if (result.data) {
        this.data.set(result.data.data);
      }
    } catch (error) {
      console.error('Error loading sanphams:', error);
    }
  }

  // Example 2: Search functionality
  async searchSanphams(searchTerm: string) {
    try {
      const result = await this.graphqlService.search(
        'Sanpham',
        searchTerm,
        ['title', 'masp', 'description'],
        {
          take: 20,
          orderBy: { title: 'asc' }
        }
      );

      if (result.data) {
        this.data.set(result.data.data);
      }
    } catch (error) {
      console.error('Error searching sanphams:', error);
    }
  }

  // Example 3: Create new record
  async createSanpham() {
    try {
      const newSanpham = {
        title: 'New Product',
        masp: 'SP001',
        giaban: 50000,
        giagoc: 45000,
        dvt: 'cái',
        isActive: true
      };

      const result = await this.graphqlService.createSanpham(newSanpham);
      
      if (result.data) {
        console.log('Created sanpham:', result.data);
        // Refresh the list
        await this.loadSanphams();
      }
    } catch (error) {
      console.error('Error creating sanpham:', error);
    }
  }

  // Example 4: Update existing record
  async updateSanpham(id: string, updates: any) {
    try {
      const result = await this.graphqlService.updateSanpham(id, updates);
      
      if (result.data) {
        console.log('Updated sanpham:', result.data);
        // Refresh the list
        await this.loadSanphams();
      }
    } catch (error) {
      console.error('Error updating sanpham:', error);
    }
  }

  // Example 5: Delete record
  async deleteSanpham(id: string) {
    try {
      const result = await this.graphqlService.deleteSanpham(id);
      
      if (result.data) {
        console.log('Deleted sanpham');
        // Refresh the list
        await this.loadSanphams();
      }
    } catch (error) {
      console.error('Error deleting sanpham:', error);
    }
  }

  // Example 6: Complex query with relations
  async loadKhachhangWithOrders(khachhangId: string) {
    try {
      const result = await this.graphqlService.getKhachhangById(khachhangId, {
        donhangs: {
          include: {
            donhangsanphams: {
              include: {
                sanpham: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        nhomkhachhang: true
      });

      if (result.data) {
        this.selectedItem.set(result.data);
      }
    } catch (error) {
      console.error('Error loading khachhang:', error);
    }
  }

  // Example 7: Dashboard statistics
  async loadDashboardStats() {
    try {
      const result = await this.graphqlService.getDashboardStats({
        dateRange: {
          from: new Date('2025-01-01'),
          to: new Date()
        }
      });

      if (result.data) {
        console.log('Dashboard stats:', result.data);
      }
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    }
  }

  // Example 8: Inventory management
  async loadInventorySummary(khoId?: string) {
    try {
      const result = await this.graphqlService.getInventorySummary(khoId);

      if (result.data) {
        console.log('Inventory summary:', result.data);
      }
    } catch (error) {
      console.error('Error loading inventory:', error);
    }
  }

  // Example 9: Bulk operations
  async bulkDeleteSanphams(ids: string[]) {
    try {
      const result = await this.graphqlService.bulkDelete('Sanpham', ids);
      
      if (result.data) {
        console.log(`Deleted ${result.data} sanphams`);
        await this.loadSanphams();
      }
    } catch (error) {
      console.error('Error bulk deleting:', error);
    }
  }

  // Example 10: Custom query
  async customOrderAnalysis() {
    const customQuery = `
      query OrderAnalysis($startDate: String!, $endDate: String!) {
        orderAnalysis: findMany(
          modelName: "Donhang"
          where: {
            createdAt: {
              gte: $startDate
              lte: $endDate
            }
          }
          include: {
            khachhang: true
            donhangsanphams: {
              include: {
                sanpham: true
              }
            }
          }
        )
      }
    `;

    try {
      const result = await this.graphqlService.executeCustomQuery(customQuery, {
        startDate: '2025-01-01',
        endDate: '2025-12-31'
      });

      if (result.data) {
        console.log('Custom order analysis:', result.data);
      }
    } catch (error) {
      console.error('Error in custom query:', error);
    }
  }

  // Example 11: Pagination helper
  async loadDataWithPagination(page: number, pageSize: number = 10) {
    try {
      const skip = (page - 1) * pageSize;
      
      const result = await this.graphqlService.getSanphams({
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' }
      });

      if (result.data) {
        return {
          data: result.data.data,
          total: result.data.total,
          currentPage: page,
          totalPages: Math.ceil(result.data.total / pageSize),
          hasNextPage: skip + pageSize < result.data.total,
          hasPreviousPage: page > 1
        };
      }
    } catch (error) {
      console.error('Error loading paginated data:', error);
      return null;
    }
  }

  // Example 12: Advanced filtering
  async loadFilteredData(filters: any) {
    try {
      const whereClause: any = {};

      // Text search
      if (filters.search) {
        whereClause.OR = [
          { title: { contains: filters.search, mode: 'insensitive' } },
          { masp: { contains: filters.search, mode: 'insensitive' } }
        ];
      }

      // Price range
      if (filters.minPrice || filters.maxPrice) {
        whereClause.giaban = {};
        if (filters.minPrice) whereClause.giaban.gte = filters.minPrice;
        if (filters.maxPrice) whereClause.giaban.lte = filters.maxPrice;
      }

      // Status filter
      if (filters.isActive !== undefined) {
        whereClause.isActive = filters.isActive;
      }

      // Date range
      if (filters.startDate || filters.endDate) {
        whereClause.createdAt = {};
        if (filters.startDate) whereClause.createdAt.gte = filters.startDate;
        if (filters.endDate) whereClause.createdAt.lte = filters.endDate;
      }

      const result = await this.graphqlService.getSanphams({
        where: whereClause,
        orderBy: { [filters.sortBy || 'createdAt']: filters.sortOrder || 'desc' },
        take: filters.limit || 10,
        skip: filters.offset || 0
      });

      if (result.data) {
        this.data.set(result.data.data);
      }
    } catch (error) {
      console.error('Error loading filtered data:', error);
    }
  }

  // Example 13: Batch create
  async batchCreateSanphams(products: any[]) {
    try {
      const result = await this.graphqlService.batchCreate('Sanpham', products);
      
      if (result.data) {
        console.log(`Created ${result.data.length} products`);
        await this.loadSanphams();
      }
    } catch (error) {
      console.error('Error batch creating:', error);
    }
  }

  // Example 14: Count records
  async countActiveProducts() {
    try {
      const result = await this.graphqlService.count('Sanpham', {
        isActive: true
      });

      if (result.data !== undefined) {
        console.log(`Active products count: ${result.data}`);
      }
    } catch (error) {
      console.error('Error counting products:', error);
    }
  }

  // Utility method to load initial data
  private async loadInitialData() {
    await Promise.all([
      this.loadSanphams(),
      this.loadDashboardStats(),
      this.countActiveProducts()
    ]);
  }
}

// Service usage in other services
export class MyBusinessService {
  private graphqlService = inject(GraphqlService);

  async getProductsForExport() {
    try {
      const result = await this.graphqlService.findMany('Sanpham', {
        where: { isActive: true },
        select: {
          id: true,
          title: true,
          masp: true,
          giaban: true,
          giagoc: true,
          dvt: true,
          createdAt: true
        },
        orderBy: { title: 'asc' }
      });

      return result.data?.data || [];
    } catch (error) {
      console.error('Error getting products for export:', error);
      return [];
    }
  }

  async syncInventory(khoId: string) {
    try {
      // Get current inventory
      const inventoryResult = await this.graphqlService.findMany('TonKho', {
        where: { khoId },
        include: {
          sanpham: true,
          kho: true
        }
      });

      // Process inventory data
      if (inventoryResult.data) {
        console.log('Current inventory:', inventoryResult.data.data);
        // Implement sync logic here
      }
    } catch (error) {
      console.error('Error syncing inventory:', error);
    }
  }
}
