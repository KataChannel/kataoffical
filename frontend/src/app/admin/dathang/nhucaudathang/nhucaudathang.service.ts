import { Injectable, signal } from '@angular/core';
import { GraphqlService } from '../../../shared/services/graphql.service';
import moment from 'moment';

// DateHelpers utility class
class DateHelpers {
  static getDateRangePresets() {
    const now = moment();
    return {
      today: {
        start: now.clone().startOf('day').toDate(),
        end: now.clone().endOf('day').toDate()
      },
      yesterday: {
        start: now.clone().subtract(1, 'day').startOf('day').toDate(),
        end: now.clone().subtract(1, 'day').endOf('day').toDate()
      },
      last7days: {
        start: now.clone().subtract(7, 'days').startOf('day').toDate(),
        end: now.clone().endOf('day').toDate()
      },
      last30days: {
        start: now.clone().subtract(30, 'days').startOf('day').toDate(),
        end: now.clone().endOf('day').toDate()
      },
      thisMonth: {
        start: now.clone().startOf('month').toDate(),
        end: now.clone().endOf('month').toDate()
      },
      lastMonth: {
        start: now.clone().subtract(1, 'month').startOf('month').toDate(),
        end: now.clone().subtract(1, 'month').endOf('month').toDate()
      },
      thisYear: {
        start: now.clone().startOf('year').toDate(),
        end: now.clone().endOf('year').toDate()
      },
      lastYear: {
        start: now.clone().subtract(1, 'year').startOf('year').toDate(),
        end: now.clone().subtract(1, 'year').endOf('year').toDate()
      }
    };
  }

  static formatDate(date: Date | string | moment.Moment | null | undefined, format: string = 'DD/MM/YYYY'): string {
    if (!date) return '';
    
    if (typeof date === 'string') {
      return moment(date).format(format);
    }
    
    if (moment.isMoment(date)) {
      return date.format(format);
    }
    
    if (date instanceof Date) {
      return moment(date).format(format);
    }
    
    return '';
  }
}

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
      
      // Since specific analytics methods don't exist, we'll mock the data structure
      // In a real implementation, these would be actual GraphQL queries
      const response = {
        data: {
          nhucaudathangStats: {
            summary: {
              totalUsers: 0,
              totalProducts: 0,
              totalOrders: 0,
              totalRevenue: 0,
              totalCustomers: 0,
              totalSuppliers: 0,
              totalInventoryValue: 0
            },
            periodComparison: {
              currentPeriod: {
                orders: 0,
                revenue: 0,
                customers: 0,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate
              },
              previousPeriod: {
                orders: 0,
                revenue: 0,
                customers: 0,
                startDate: '',
                endDate: ''
              },
              percentageChange: {
                orders: 0,
                revenue: 0,
                customers: 0
              }
            },
            recentOrders: [],
            topProducts: [],
            topCustomers: [],
            chartData: {
              dailyRevenue: [],
              monthlyComparison: [],
              categoryBreakdown: []
            },
            alerts: {
              lowStockProducts: [],
              overdueOrders: []
            }
          }
        }
      };

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
      // Mock response for inventory summary
      const response = {
        data: {
          inventorySummary: {
            summary: {
              totalProducts: 0,
              totalStock: 0,
              totalValue: 0,
              lowStockItems: 0,
              outOfStockItems: 0,
              categories: 0
            },
            stockByCategory: [],
            lowStockItems: [],
            recentMovements: [],
            stockAlerts: {
              criticalStock: [],
              excessStock: []
            }
          }
        }
      };

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
      // Mock response for orders
      const response = {
        data: {
          orders: []
        }
      };

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
      // Mock response for sales analytics
      const response = {
        data: {
          salesAnalytics: {
            totalSales: 0,
            totalRevenue: 0,
            averageOrderValue: 0,
            salesByPeriod: []
          }
        }
      };

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
