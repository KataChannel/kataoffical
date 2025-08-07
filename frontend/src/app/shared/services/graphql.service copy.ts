import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../utils/storage.service';
import { ErrorLogService } from './errorlog.service';
import { DateHelpers } from '../utils/date-helpers';

export interface GraphQLQuery {
  query: string;
  variables?: any;
  operationName?: string;
}

export interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}

export interface PaginationInput {
  page?: number;
  pageSize?: number;
}

export interface SortInput {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FindManyOptions {
  where?: any;
  orderBy?: any;
  skip?: number;
  take?: number;
  include?: any;
  select?: any;
}

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  private readonly GRAPHQL_ENDPOINT = `${environment.APIURL}/graphql`;
  
  // Signals for reactive state management
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(
    private _StorageService: StorageService,
    private _ErrorLogService: ErrorLogService
  ) {
    // Initialize DateHelpers to suppress moment warnings
    DateHelpers.init();
  }
  /**
   * Helper method to normalize model names (convert PascalCase to camelCase)
   */
  private normalizeModelName(modelName: string): string {
    return modelName.charAt(0).toLowerCase() + modelName.slice(1);
  }

  /**
   * Helper method to safely format dates for GraphQL queries
   */
  private formatDateForGraphQL(date: Date | string | moment.Moment | null | undefined): string | null {
    if (!date) return null;
    
    try {
      return DateHelpers.formatDateForAPI(date);
    } catch (error) {
      console.warn('Error formatting date for GraphQL:', error);
      return null;
    }
  }

  /**
   * Helper method to format datetime for GraphQL queries
   */
  private formatDateTimeForGraphQL(date: Date | string | moment.Moment | null | undefined): string | null {
    if (!date) return null;
    
    try {
      return DateHelpers.formatDateTimeForAPI(date);
    } catch (error) {
      console.warn('Error formatting datetime for GraphQL:', error);
      return null;
    }
  }

  /**
   * Process filters to ensure dates are properly formatted
   */
  private processFilters(filters: any): any {
    if (!filters) return filters;

    const processedFilters = { ...filters };

    // Common date fields that need formatting
    const dateFields = [
      'startDate', 'endDate', 'fromDate', 'toDate', 'createdAt', 'updatedAt',
      'ngaytao', 'ngaycapnhat', 'ngaygiao', 'ngaydat', 'ngayxuat', 'ngaynhap',
      'batdau', 'ketthuc', 'tungay', 'denngay'
    ];

    for (const field of dateFields) {
      if (processedFilters[field]) {
        processedFilters[field] = this.formatDateForGraphQL(processedFilters[field]);
      }
    }

    // Handle date ranges
    if (processedFilters.dateRange) {
      if (processedFilters.dateRange.start) {
        processedFilters.dateRange.start = this.formatDateForGraphQL(processedFilters.dateRange.start);
      }
      if (processedFilters.dateRange.end) {
        processedFilters.dateRange.end = this.formatDateForGraphQL(processedFilters.dateRange.end);
      }
    }

    return processedFilters;
  }

  /**
   * Execute a GraphQL query or mutation
   */
  async executeGraphQL<T = any>(query: GraphQLQuery): Promise<GraphQLResponse<T>> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const token = this._StorageService.getItem('token');
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      // Add JWT token if available
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(this.GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers,
        body: JSON.stringify(query),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: GraphQLResponse<T> = await response.json();

      if (result.errors && result.errors.length > 0) {
        const errorMessage = result.errors.map(err => err.message).join(', ');
        this.error.set(errorMessage);
        await this._ErrorLogService.logError('GraphQL Error', result.errors);
      }

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown GraphQL error';
      this.error.set(errorMessage);
      await this._ErrorLogService.logError('GraphQL Request Failed', error);
      throw error;
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Enhanced method to find many records with better date handling
   */
  async findMany<T = any>(
    modelName: string,
    options: FindManyOptions = {}
  ): Promise<GraphQLResponse<{ data: T[]; total: number; page: number; pageSize: number }>> {
    // Normalize model name to ensure lowercase
    const normalizedModelName = this.normalizeModelName(modelName);
    
    // Process date filters
    const processedOptions = {
      ...options,
      where: this.processFilters(options.where)
    };    
    const query = `
      query FindMany($modelName: String!, $where: JSON, $orderBy: JSON, $skip: Float, $take: Float, $include: JSON) {
        findMany(
          modelName: $modelName
          where: $where
          orderBy: $orderBy
          skip: $skip
          take: $take
          include: $include
        )
      }
    `;

    const result = await this.executeGraphQL<any>({
      query,
      variables: {
        modelName: normalizedModelName,
        where: processedOptions.where,
        orderBy: processedOptions.orderBy,
        skip: processedOptions.skip,
        take: processedOptions.take,
        include: processedOptions.include
      }
    });
 
    // The findMany returns JSON, so we need to extract the data from the JSON response
    if (result.data?.findMany) {
      return {
        data: result.data.findMany,
        errors: result.errors
      };
    }

    return result;
  }

  /**
   * Generic method to find a unique record
   */
  async findUnique<T = any>(
    modelName: string,
    where: any,
    include?: any,
    select?: any
  ): Promise<GraphQLResponse<T>> {
    const normalizedModelName = this.normalizeModelName(modelName);
    
    // Use specific model query since there's no universal findUnique
    const query = `
      query FindUnique($id: String!) {
        ${normalizedModelName}(id: $id) {
          id
        }
      }
    `;

    const result = await this.executeGraphQL<any>({
      query,
      variables: {
        id: where.id
      }
    });

    // Return the specific model data
    if (result.data?.[normalizedModelName]) {
      return {
        data: result.data[normalizedModelName],
        errors: result.errors
      };
    }

    return result;
  }

  /**
   * Search across multiple fields using universal search
   */
  async search<T = any>(
    modelName: string,
    searchTerm: string,
    searchFields: string[],
    options: FindManyOptions = {}
  ): Promise<GraphQLResponse<{ data: T[]; total: number }>> {
    const query = `
      query Search($model: String!, $searchTerm: String!, $searchFields: [String!]!, $pagination: PaginationInput) {
        universalSearch(
          model: $model
          searchTerm: $searchTerm
          searchFields: $searchFields
          pagination: $pagination
        )
      }
    `;

    const result = await this.executeGraphQL<any>({
      query,
      variables: {
        model: modelName,
        searchTerm,
        searchFields,
        pagination: {
          page: Math.floor((options.skip || 0) / (options.take || 10)) + 1,
          pageSize: options.take || 10
        }
      }
    });

    // Parse the JSON response
    if (result.data?.universalSearch) {
      const searchResult = JSON.parse(result.data.universalSearch);
      return {
        data: searchResult,
        errors: result.errors
      };
    }

    return result;
  }

  /**
   * Generic method for bulk operations
   */
  async bulkDelete(
    modelName: string,
    ids: string[]
  ): Promise<GraphQLResponse<number>> {
    const query = `
      mutation BulkDelete($model: String!, $ids: [String!]!) {
        bulkDelete(
          model: $model
          ids: $ids
        )
      }
    `;

    return this.executeGraphQL<number>({
      query,
      variables: {
        model: modelName,
        ids
      }
    });
  }

  /**
   * Get available models
   */
  async getAvailableModels(): Promise<GraphQLResponse<string[]>> {
    const query = `
      query GetAvailableModels {
        getAvailableModels
      }
    `;

    return this.executeGraphQL({
      query
    });
  }

  /**
   * Debug method to test GraphQL connection and get model info
   */
  async debugGraphQL() {
    try {
      console.log('🔍 Testing GraphQL connection...');
      
      // Test 1: Get available models
      const modelsResult = await this.getAvailableModels();
      console.log('📋 Available models:', modelsResult.data);
      
      // Test 2: Test simple khachhang query
      const testResult = await this.findMany('khachhang', { take: 1 });
      console.log('✅ Khachhang test result:', testResult);
      
      return {
        success: true,
        availableModels: modelsResult.data,
        testQuery: testResult
      };
    } catch (error) {
      console.error('❌ GraphQL debug failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Specific model methods with type safety

  /**
   * User-specific methods
   */
  async getUsers(options: FindManyOptions = {}) {
    return this.findMany('user', options);
  }

  async getUserById(id: string) {
    const query = `
      query GetUser($id: String!) {
        user(id: $id) {
          id
          email
          SDT
          isActive
          createdAt
          updatedAt
        }
      }
    `;

    return this.executeGraphQL({
      query,
      variables: { id }
    });
  }

  async createUser(input: any) {
    const query = `
      mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
          id
          email
          SDT
          isActive
          createdAt
          updatedAt
        }
      }
    `;

    return this.executeGraphQL({
      query,
      variables: { input }
    });
  }

  async updateUser(input: any) {
    const query = `
      mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
          id
          email
          SDT
          isActive
          createdAt
          updatedAt
        }
      }
    `;

    return this.executeGraphQL({
      query,
      variables: { input }
    });
  }

  async deleteUser(id: string) {
    const query = `
      mutation DeleteUser($id: String!) {
        deleteUser(id: $id) {
          id
          email
        }
      }
    `;

    return this.executeGraphQL({
      query,
      variables: { id }
    });
  }

  /**
   * Sanpham-specific methods
   */
  async getSanphams(options: FindManyOptions = {}) {
    return this.findMany('sanpham', options);
  }

  async getSanphamById(id: string) {
    const query = `
      query GetSanpham($id: String!) {
        sanpham(id: $id) {
          id
          title
          masp
          hinhanh
          gia
          giabanbuon
          giabanle
          giavon
          isActive
          createdAt
          updatedAt
        }
      }
    `;

    return this.executeGraphQL({
      query,
      variables: { id }
    });
  }

  async createSanpham(input: any) {
    const query = `
      mutation CreateSanpham($input: CreateSanphamInput!) {
        createSanpham(input: $input) {
          id
          title
          masp
          hinhanh
          gia
          giabanbuon
          giabanle
          giavon
          isActive
          createdAt
          updatedAt
        }
      }
    `;

    return this.executeGraphQL({
      query,
      variables: { input }
    });
  }

  async updateSanpham(input: any) {
    const query = `
      mutation UpdateSanpham($input: UpdateSanphamInput!) {
        updateSanpham(input: $input) {
          id
          title
          masp
          hinhanh
          gia
          giabanbuon
          giabanle
          giavon
          isActive
          createdAt
          updatedAt
        }
      }
    `;

    return this.executeGraphQL({
      query,
      variables: { input }
    });
  }

  async deleteSanpham(id: string) {
    const query = `
      mutation DeleteSanpham($id: String!) {
        deleteSanpham(id: $id) {
          id
          title
        }
      }
    `;

    return this.executeGraphQL({
      query,
      variables: { id }
    });
  }

  /**
   * Khachhang-specific methods
   */
  async getKhachhangs(options: FindManyOptions = {}) {
    return this.findMany('khachhang', options);
  }

  async getKhachhangById(id: string, include?: any) {
    return this.findUnique('khachhang', { id }, include);
  }

  async createKhachhang(data: any) {
    const mutation = `
      mutation CreateKhachhang($input: CreateKhachhangInput!) {
        createKhachhang(input: $input) {
          id
          makh
          name
          tenkh
          email
          phone
          sdt
          address
          diachi
          quan
          mst
          loaikh
          isActive
          hiengia
          isshowvat
          istitle2
          gionhanhang
          subtitle
          ghichu
          tenfile
          makhold
          namenn
          createdAt
          updatedAt
        }
      }
    `;

    const result = await this.executeGraphQL<any>({
      query: mutation,
      variables: { input: data },
    });

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    return result.data?.createKhachhang;
  }

  async updateKhachhang(id: string, data: any) {
    const mutation = `
      mutation UpdateKhachhang($input: UpdateKhachhangInput!) {
        updateKhachhang(input: $input) {
          id
          makh
          name
          tenkh
          email
          phone
          sdt
          address
          diachi
          quan
          mst
          loaikh
          isActive
          hiengia
          isshowvat
          istitle2
          gionhanhang
          subtitle
          ghichu
          tenfile
          makhold
          namenn
          createdAt
          updatedAt
        }
      }
    `;

    const result = await this.executeGraphQL<any>({
      query: mutation,
      variables: { input: { id, ...data } },
    });

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    return result.data?.updateKhachhang;
  }

  async deleteKhachhang(id: string) {
    const mutation = `
      mutation DeleteKhachhang($id: String!) {
        deleteKhachhang(id: $id)
      }
    `;

    const result = await this.executeGraphQL<any>({
      query: mutation,
      variables: { id },
    });

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    return result.data?.deleteKhachhang;
  }

  /**
   * Donhang-specific methods
   */
  async getDonhangs(options: FindManyOptions = {}) {
    return this.findMany('donhang', options);
  }

  async getDonhangById(id: string, include?: any) {
    return this.findUnique('donhang', { id }, include);
  }

  async createDonhang(data: any) {
    const mutation = `
      mutation CreateDonhang($input: CreateDonhangInput!) {
        createDonhang(input: $input) {
          id
          madonhang
          title
          type
          ngaygiao
          tongtien
          status
          trangthai
          ghichu
          isActive
          order
          createdAt
          updatedAt
          khachhang {
            id
            name
            tenkh
          }
        }
      }
    `;

    const result = await this.executeGraphQL<any>({
      query: mutation,
      variables: { input: data },
    });

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    return result.data?.createDonhang;
  }

  async updateDonhang(id: string, data: any) {
    const mutation = `
      mutation UpdateDonhang($input: UpdateDonhangInput!) {
        updateDonhang(input: $input) {
          id
          madonhang
          title
          type
          ngaygiao
          tongtien
          status
          trangthai
          ghichu
          isActive
          order
          createdAt
          updatedAt
          khachhang {
            id
            name
            tenkh
          }
        }
      }
    `;

    const result = await this.executeGraphQL<any>({
      query: mutation,
      variables: { input: { id, ...data } },
    });

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    return result.data?.updateDonhang;
  }

  async deleteDonhang(id: string) {
    const mutation = `
      mutation DeleteDonhang($id: String!) {
        deleteDonhang(id: $id)
      }
    `;

    const result = await this.executeGraphQL<any>({
      query: mutation,
      variables: { id },
    });

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    return result.data?.deleteDonhang;
  }

  /**
   * Kho-specific methods
   */
  async getKhos(options: FindManyOptions = {}) {
    return this.findMany('kho', options);
  }

  async getKhoById(id: string, include?: any) {
    return this.findUnique('kho', { id }, include);
  }

  async createKho(data: any) {
    const mutation = `
      mutation CreateKho($input: CreateKhoInput!) {
        createKho(input: $input) {
          id
          makho
          name
          diachi
          sdt
          ghichu
          isActive
          createdAt
          updatedAt
        }
      }
    `;

    const result = await this.executeGraphQL<any>({
      query: mutation,
      variables: { input: data },
    });

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    return result.data?.createKho;
  }

  async updateKho(id: string, data: any) {
    const mutation = `
      mutation UpdateKho($input: UpdateKhoInput!) {
        updateKho(input: $input) {
          id
          makho
          name
          diachi
          sdt
          ghichu
          isActive
          createdAt
          updatedAt
        }
      }
    `;

    const result = await this.executeGraphQL<any>({
      query: mutation,
      variables: { input: { id, ...data } },
    });

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    return result.data?.updateKho;
  }

  async deleteKho(id: string) {
    const mutation = `
      mutation DeleteKho($id: String!) {
        deleteKho(id: $id)
      }
    `;

    const result = await this.executeGraphQL<any>({
      query: mutation,
      variables: { id },
    });

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    return result.data?.deleteKho;
  }

  /**
   * PhieuKho-specific methods
   */
  async getPhieuKhos(options: FindManyOptions = {}) {
    return this.findMany('PhieuKho', options);
  }

  async getPhieuKhoById(id: string, include?: any) {
    return this.findUnique('PhieuKho', { id }, include);
  }

  async createPhieuKho(data: any) {
    const mutation = `
      mutation CreatePhieuKho($input: CreatePhieuKhoInput!) {
        createPhieuKho(input: $input) {
          id
          title
          maphieu
          madonhang
          madncc
          madathang
          ngay
          type
          isChotkho
          khoId
          ghichu
          isActive
          createdAt
          updatedAt
        }
      }
    `;

    const result = await this.executeGraphQL<any>({
      query: mutation,
      variables: { input: data },
    });

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    return result.data?.createPhieuKho;
  }

  async updatePhieuKho(id: string, data: any) {
    const mutation = `
      mutation UpdatePhieuKho($input: UpdatePhieuKhoInput!) {
        updatePhieuKho(input: $input) {
          id
          title
          maphieu
          madonhang
          madncc
          madathang
          ngay
          type
          isChotkho
          khoId
          ghichu
          isActive
          createdAt
          updatedAt
        }
      }
    `;

    const result = await this.executeGraphQL<any>({
      query: mutation,
      variables: { input: { id, ...data } },
    });

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    return result.data?.updatePhieuKho;
  }

  async deletePhieuKho(id: string) {
    const mutation = `
      mutation DeletePhieuKho($id: String!) {
        deletePhieuKho(id: $id)
      }
    `;

    const result = await this.executeGraphQL<any>({
      query: mutation,
      variables: { id },
    });

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    return result.data?.deletePhieuKho;
  }

  /**
   * Nhacungcap-specific methods
   */
  async getNhacungcaps(options: FindManyOptions = {}) {
    return this.findMany('Nhacungcap', options);
  }

  async getNhacungcapById(id: string, include?: any) {
    return this.findUnique('Nhacungcap', { id }, include);
  }

  async createNhacungcap(data: any) {
    // Using universal createRecord since specific Nhacungcap mutations don't exist yet
    const mutation = `
      mutation CreateRecord($modelName: String!, $data: JSON!) {
        createRecord(modelName: $modelName, data: $data)
      }
    `;

    const result = await this.executeGraphQL<any>({
      query: mutation,
      variables: { 
        modelName: 'nhacungcap',
        data: data 
      },
    });

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    return result.data?.createRecord;
  }

  async updateNhacungcap(id: string, data: any) {
    // Using universal updateRecord since specific Nhacungcap mutations don't exist yet
    const mutation = `
      mutation UpdateRecord($modelName: String!, $where: JSON!, $data: JSON!) {
        updateRecord(modelName: $modelName, where: $where, data: $data)
      }
    `;

    const result = await this.executeGraphQL<any>({
      query: mutation,
      variables: { 
        modelName: 'nhacungcap',
        where: { id },
        data: data 
      },
    });

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    return result.data?.updateRecord;
  }

  async deleteNhacungcap(id: string) {
    // Using universal deleteRecord since specific Nhacungcap mutations don't exist yet
    const mutation = `
      mutation DeleteRecord($modelName: String!, $where: JSON!) {
        deleteRecord(modelName: $modelName, where: $where)
      }
    `;

    const result = await this.executeGraphQL<any>({
      query: mutation,
      variables: { 
        modelName: 'nhacungcap',
        where: { id } 
      },
    });

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    return result.data?.deleteRecord;
  }

  /**
   * TonKho-specific methods
   */
  async getTonKhos(options: FindManyOptions = {}) {
    return this.findMany('TonKho', options);
  }

  async getTonKhoById(id: string, include?: any) {
    return this.findUnique('TonKho', { id }, include);
  }

  /**
   * Dashboard and analytics methods
   */
  async getDashboardStats(filters?: {
    startDate?: Date | string | moment.Moment;
    endDate?: Date | string | moment.Moment;
    [key: string]: any;
  }) {
    const processedFilters = this.processFilters(filters);

    const query = `
      query GetDashboardStats($filters: JSON) {
        dashboardStats(filters: $filters) {
          summary {
            totalUsers
            totalProducts
            totalOrders
            totalRevenue
            totalCustomers
            totalSuppliers
            totalInventoryValue
          }
          periodComparison {
            currentPeriod {
              orders
              revenue
              customers
              startDate
              endDate
            }
            previousPeriod {
              orders
              revenue
              customers
              startDate
              endDate
            }
            percentageChange {
              orders
              revenue
              customers
            }
          }
          recentOrders {
            id
            madonhang
            tongtien
            trangthai
            createdAt
            ngaygiao
            khachhang {
              id
              hovaten
              email
              sdt
            }
          }
          topProducts {
            id
            title
            masp
            totalSold
            revenue
            profit
            category
          }
          topCustomers {
            id
            hovaten
            email
            totalOrders
            totalSpent
            lastOrderDate
          }
          chartData {
            dailyRevenue {
              date
              revenue
              orders
              profit
            }
            monthlyComparison {
              month
              revenue
              orders
              profit
            }
            categoryBreakdown {
              category
              revenue
              orders
              percentage
            }
          }
          alerts {
            lowStockProducts {
              id
              title
              currentStock
              minStock
            }
            overdueOrders {
              id
              madonhang
              ngaygiao
              daysPastDue
            }
          }
        }
      }
    `;

    return this.executeGraphQL({
      query,
      variables: { filters: processedFilters }
    });
  }

  /**
   * Enhanced inventory summary with better filtering
   */
  async getInventorySummary(filters?: {
    khoId?: string;
    categoryId?: string;
    lowStockOnly?: boolean;
    startDate?: Date | string | moment.Moment;
    endDate?: Date | string | moment.Moment;
  }) {
    const processedFilters = this.processFilters(filters);

    const query = `
      query GetInventorySummary($filters: JSON) {
        inventorySummary(filters: $filters) {
          summary {
            totalProducts
            totalStock
            totalValue
            lowStockItems
            outOfStockItems
            categories
          }
          stockByCategory {
            category
            productCount
            totalStock
            totalValue
          }
          lowStockItems {
            id
            sanpham {
              id
              title
              masp
              category
            }
            kho {
              id
              tenkho
            }
            soluong
            minStock
            maxStock
            reorderLevel
          }
          recentMovements {
            id
            type
            soluong
            createdAt
            reason
            sanpham {
              id
              title
              masp
            }
            kho {
              id
              tenkho
            }
            user {
              id
              hovaten
            }
          }
          stockAlerts {
            criticalStock {
              productId
              productName
              currentStock
              minStock
              daysUntilStockout
            }
            excessStock {
              productId
              productName
              currentStock
              maxStock
              daysOfSupply
            }
          }
        }
      }
    `;

    return this.executeGraphQL({
      query,
      variables: { filters: processedFilters }
    });
  }

  /**
   * Get orders with enhanced filtering and date handling
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
    const processedFilters = this.processFilters(filters);

    const query = `
      query GetOrdersWithFilters($filters: JSON) {
        getOrdersWithFilters(filters: $filters) {
          data {
            id
            madonhang
            tongtien
            trangthai
            createdAt
            updatedAt
            ngaygiao
            ghichu
            khachhang {
              id
              hovaten
              email
              sdt
              diachi
            }
            chitietdonhangs {
              id
              soluong
              dongia
              thanhtien
              sanpham {
                id
                title
                masp
                hinhanh
              }
            }
          }
          total
          page
          pageSize
          totalPages
          summary {
            totalAmount
            averageOrderValue
            ordersByStatus
          }
        }
      }
    `;

    return this.executeGraphQL({
      query,
      variables: { filters: processedFilters }
    });
  }

  /**
   * Get sales analytics with date range
   */
  async getSalesAnalytics(filters?: {
    startDate?: Date | string | moment.Moment;
    endDate?: Date | string | moment.Moment;
    groupBy?: 'day' | 'week' | 'month' | 'year';
    categoryId?: string;
    productId?: string;
  }) {
    const processedFilters = this.processFilters(filters);

    const query = `
      query GetSalesAnalytics($filters: JSON) {
        salesAnalytics(filters: $filters) {
          timeSeries {
            period
            revenue
            orders
            profit
            averageOrderValue
          }
          topProducts {
            id
            title
            masp
            revenue
            orders
            profit
            growth
          }
          topCategories {
            category
            revenue
            orders
            profit
            growth
          }
          customerInsights {
            newCustomers
            returningCustomers
            customerRetentionRate
            averageCustomerValue
          }
          trends {
            revenueGrowth
            orderGrowth
            profitMargin
            conversionRate
          }
        }
      }
    `;

    return this.executeGraphQL({
      query,
      variables: { filters: processedFilters }
    });
  }

  /**
   * Utility method to get date range presets
   */
  getDateRangePresets() {
    return DateHelpers.getDateRangePresets();
  }

  /**
   * Utility method to format date for display
   */
  formatDateForDisplay(date: Date | string | moment.Moment | null | undefined, format?: string): string {
    return DateHelpers.formatDate(date, format);
  }

  /**
   * Utility methods
   */
  clearError(): void {
    this.error.set(null);
  }

  isLoadingState(): boolean {
    return this.isLoading();
  }

  getCurrentError(): string | null {
    return this.error();
  }
}