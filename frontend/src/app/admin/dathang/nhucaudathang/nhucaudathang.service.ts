import { Injectable, signal } from '@angular/core';

export interface NhucaudathangData {
  summary: {
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    totalCustomers: number;
    totalSuppliers: number;
    totalInventoryValue: number;
  };
  periodComparison: {
    currentPeriod: {
      orders: number;
      revenue: number;
      customers: number;
      startDate: string;
      endDate: string;
    };
    previousPeriod: {
      orders: number;
      revenue: number;
      customers: number;
      startDate: string;
      endDate: string;
    };
    percentageChange: {
      orders: number;
      revenue: number;
      customers: number;
    };
  };
  recentOrders: Array<{
    id: string;
    madonhang: string;
    tongtien: number;
    trangthai: string;
    createdAt: string;
    ngaygiao: string;
    khachhang: {
      id: string;
      hovaten: string;
      email: string;
      sdt: string;
    };
  }>;
  topProducts: Array<{
    id: string;
    title: string;
    masp: string;
    totalSold: number;
    revenue: number;
    profit: number;
    category: string;
  }>;
  topCustomers: Array<{
    id: string;
    hovaten: string;
    email: string;
    totalOrders: number;
    totalSpent: number;
    lastOrderDate: string;
  }>;
  chartData: {
    dailyRevenue: Array<{
      date: string;
      revenue: number;
      orders: number;
      profit: number;
    }>;
    monthlyComparison: Array<{
      month: string;
      revenue: number;
      orders: number;
      profit: number;
    }>;
    categoryBreakdown: Array<{
      category: string;
      revenue: number;
      orders: number;
      percentage: number;
    }>;
  };
  alerts: {
    lowStockProducts: Array<{
      id: string;
      title: string;
      currentStock: number;
      minStock: number;
    }>;
    overdueOrders: Array<{
      id: string;
      madonhang: string;
      ngaygiao: string;
      daysPastDue: number;
    }>;
  };
}

export interface InventoryData {
  summary: {
    totalProducts: number;
    totalStock: number;
    totalValue: number;
    lowStockItems: number;
    outOfStockItems: number;
    categories: number;
  };
  stockByCategory: Array<{
    category: string;
    productCount: number;
    totalStock: number;
    totalValue: number;
  }>;
  lowStockItems: Array<{
    id: string;
    sanpham: {
      id: string;
      title: string;
      masp: string;
      category: string;
    };
    kho: {
      id: string;
      tenkho: string;
    };
    soluong: number;
    minStock: number;
    maxStock: number;
    reorderLevel: number;
  }>;
  recentMovements: Array<{
    id: string;
    type: string;
    soluong: number;
    createdAt: string;
    reason: string;
    sanpham: {
      id: string;
      title: string;
      masp: string;
    };
    kho: {
      id: string;
      tenkho: string;
    };
    user: {
      id: string;
      hovaten: string;
    };
  }>;
  stockAlerts: {
    criticalStock: Array<{
      productId: string;
      productName: string;
      currentStock: number;
      minStock: number;
      daysUntilStockout: number;
    }>;
    excessStock: Array<{
      productId: string;
      productName: string;
      currentStock: number;
      maxStock: number;
      daysOfSupply: number;
    }>;
  };
}

@Injectable({
  providedIn: 'root'
})
export class NhucaudathangService {
  // Reactive state
  nhucaudathangData = signal<NhucaudathangData | null>(null);
  inventoryData = signal<InventoryData | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private graphqlService: GraphqlService) {}

  /**
   * Get nhucaudathang statistics with proper date handling
   */
  async getNhucaudathangStats(filters?: {
    startDate?: Date | string | moment.Moment;
    endDate?: Date | string | moment.Moment;
    [key: string]: any;
  }): Promise<NhucaudathangData | null> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      // Use default date range if not provided
      const dateRange = this.getDefaultDateRange(filters);
      
      const response = await this.graphqlService.getNhucaudathangStats(dateRange);
      
      if (response.errors) {
        throw new Error(response.errors.map(e => e.message).join(', '));
      }

      if (response.data?.nhucaudathangStats) {
        this.nhucaudathangData.set(response.data.nhucaudathangStats);
        return response.data.nhucaudathangStats;
      }

      return null;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load nhucaudathang data';
      this.error.set(errorMessage);
      console.error('Nhucaudathang service error:', error);
      return null;
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Get inventory summary with proper date handling
   */
  async getInventorySummary(filters?: {
    khoId?: string;
    categoryId?: string;
    lowStockOnly?: boolean;
    startDate?: Date | string | moment.Moment;
    endDate?: Date | string | moment.Moment;
  }): Promise<InventoryData | null> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const response = await this.graphqlService.getInventorySummary(filters);
      
      if (response.errors) {
        throw new Error(response.errors.map(e => e.message).join(', '));
      }

      if (response.data?.inventorySummary) {
        this.inventoryData.set(response.data.inventorySummary);
        return response.data.inventorySummary;
      }

      return null;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load inventory data';
      this.error.set(errorMessage);
      console.error('Inventory service error:', error);
      return null;
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Get orders with filters
   */
  async getOrdersWithFilters(filters?: {
    startDate?: Date | string | moment.Moment;
    endDate?: Date | string | moment.Moment;
    status?: string;
    customerId?: string;
    minAmount?: number;
    maxAmount?: number;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const response = await this.graphqlService.getOrdersWithFilters(filters);
      
      if (response.errors) {
        throw new Error(response.errors.map(e => e.message).join(', '));
      }

      return response.data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load orders';
      this.error.set(errorMessage);
      console.error('Orders service error:', error);
      return null;
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Get sales analytics
   */
  async getSalesAnalytics(filters?: {
    startDate?: Date | string | moment.Moment;
    endDate?: Date | string | moment.Moment;
    groupBy?: 'day' | 'week' | 'month' | 'year';
    categoryId?: string;
    productId?: string;
  }) {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const response = await this.graphqlService.getSalesAnalytics(filters);
      
      if (response.errors) {
        throw new Error(response.errors.map(e => e.message).join(', '));
      }

      return response.data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load sales analytics';
      this.error.set(errorMessage);
      console.error('Sales analytics service error:', error);
      return null;
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Get default date range for nhucaudathang (last 30 days)
   */
  private getDefaultDateRange(filters?: any): any {
    if (filters?.startDate && filters?.endDate) {
      return filters;
    }

    const presets = DateHelpers.getDateRangePresets();
    return {
      ...filters,
      startDate: presets['last30days'].start,
      endDate: presets['last30days'].end
    };
  }

  /**
   * Get date range presets
   */
  getDateRangePresets() {
    return DateHelpers.getDateRangePresets();
  }

  /**
   * Format date for display
   */
  formatDate(date: Date | string | moment.Moment | null | undefined, format?: string): string {
    return DateHelpers.formatDate(date, format);
  }

  /**
   * Clear all data and state
   */
  clearData(): void {
    this.nhucaudathangData.set(null);
    this.inventoryData.set(null);
    this.error.set(null);
  }

  /**
   * Clear error state
   */
  clearError(): void {
    this.error.set(null);
  }

  /**
   * Get current state
   */
  getState() {
    return {
      nhucaudathangData: this.nhucaudathangData(),
      inventoryData: this.inventoryData(),
      isLoading: this.isLoading(),
      error: this.error()
    };
  }
}
