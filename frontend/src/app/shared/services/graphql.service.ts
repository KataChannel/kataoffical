import { Injectable, signal, computed } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../utils/storage.service';
import { ErrorLogService } from './errorlog.service';
import { DateHelpers } from '../utils/date-helpers';
import { firstValueFrom } from 'rxjs';

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
    path?: (string | number)[];
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

export interface OptimizedFindManyOptions extends FindManyOptions {
  useCache?: boolean;
  cacheTimeout?: number;
  cacheKey?: string;
  enableBatching?: boolean;
  batchSize?: number;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
  hasPrevious: boolean;
}

export interface CacheEntry {
  data: any;
  timestamp: number;
  timeout: number;
}

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  private apolloClient!: ApolloClient<any>;
  private queryCache = new Map<string, CacheEntry>();
  
  // Signals for reactive state management
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  
  // Cache statistics
  cacheHits = signal<number>(0);
  cacheMisses = signal<number>(0);
  
  // Computed properties
  cacheHitRate = computed(() => {
    const hits = this.cacheHits();
    const total = hits + this.cacheMisses();
    return total > 0 ? (hits / total) * 100 : 0;
  });

  constructor(
    private apollo: Apollo,
    private _StorageService: StorageService,
    private _ErrorLogService: ErrorLogService
  ) {
    DateHelpers.init();
    this.setupApolloClient();
  }

  /**
   * Setup Apollo Client with authentication and optimized caching
   */
  private setupApolloClient() {
    const httpLink = createHttpLink({
      uri: `${environment.APIURL}/graphql`
    });

    const authLink = setContext((_, { headers }) => {
      const token = this._StorageService.getItem('token');
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      };
    });

    this.apolloClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              findMany: {
                keyArgs: ['modelName', 'where', 'orderBy'],
                merge(existing, incoming) {
                  return incoming;
                }
              }
            }
          }
        }
      }),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-first',
          errorPolicy: 'all'
        },
        query: {
          fetchPolicy: 'cache-first',
          errorPolicy: 'all'
        }
      }
    });
  }

  /**
   * Cache management methods
   */
  private generateCacheKey(modelName: string, options: any): string {
    const sortedOptions = JSON.stringify(options, Object.keys(options || {}).sort());
    return `${modelName}:${btoa(sortedOptions)}`;
  }

  private getCachedData(cacheKey: string): any | null {
    const cached = this.queryCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < cached.timeout) {
      this.cacheHits.update(hits => hits + 1);
      return cached.data;
    }
    if (cached) {
      this.queryCache.delete(cacheKey);
    }
    this.cacheMisses.update(misses => misses + 1);
    return null;
  }

  private setCachedData(cacheKey: string, data: any, timeout: number = 300000): void {
    this.queryCache.set(cacheKey, {
      data,
      timestamp: Date.now(),
      timeout
    });
  }

  /**
   * Helper method to normalize model names
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
   * Execute a GraphQL query with enhanced error handling
   */
  async executeGraphQL<T = any>(query: GraphQLQuery): Promise<GraphQLResponse<T>> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const result = await firstValueFrom(
        this.apollo.query({
          query: gql`${query.query}`,
          variables: query.variables,
          fetchPolicy: 'cache-first',
          errorPolicy: 'all'
        })
      );

      if (result.errors && result.errors.length > 0) {
        const errorMessage = result.errors.map(err => err.message).join(', ');
        this.error.set(errorMessage);
        await this._ErrorLogService.logError('GraphQL Error', result.errors);
      }

      return {
        data: result.data as T,
        errors: result.errors ? result.errors.map(err => ({
          message: err.message,
          locations: err.locations ? err.locations.map(loc => ({ line: loc.line, column: loc.column })) : undefined,
          path: err.path ? [...err.path] : undefined
        })) : undefined
      };
    } catch (error: any) {
      const errorMessage = error?.message || 'Unknown GraphQL error';
      this.error.set(errorMessage);
      await this._ErrorLogService.logError('GraphQL Request Failed', error);
      throw error;
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Execute a GraphQL mutation
   */
  async executeMutation<T = any>(mutation: GraphQLQuery): Promise<GraphQLResponse<T>> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const result: any = await firstValueFrom(
        this.apollo.mutate({
          mutation: gql`${mutation.query}`,
          variables: mutation.variables,
          errorPolicy: 'all'
        })
      );

      if (result.errors && result.errors.length > 0) {
        const errorMessage = result.errors.map((err: any) => err.message).join(', ');
        this.error.set(errorMessage);
        await this._ErrorLogService.logError('GraphQL Error', result.errors);
      }

      // Invalidate cache after mutations
      this.clearCache();

      return {
        data: result.data as T,
        errors: result.errors
      };
    } catch (error: any) {
      const errorMessage = error?.message || 'Unknown GraphQL error';
      this.error.set(errorMessage);
      await this._ErrorLogService.logError('GraphQL Mutation Failed', error);
      throw error;
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * OPTIMIZED findMany - No longer relies on count query
   */
  async findMany<T = any>(
    modelName: string,
    options: OptimizedFindManyOptions = {}
  ): Promise<GraphQLResponse<PaginationResult<T>>> {
    const normalizedModelName = this.normalizeModelName(modelName);
    const { 
      useCache = true, 
      cacheTimeout = 300000, 
      cacheKey, 
      ...queryOptions 
    } = options;
    
    const processedOptions = {
      ...queryOptions,
      where: this.processFilters(queryOptions.where)
    };

    // Calculate pagination
    const skip = queryOptions.skip || 0;
    const take = queryOptions.take || 50;
    const page = Math.floor(skip / take) + 1;

    // Check cache first
    const finalCacheKey = cacheKey || this.generateCacheKey(normalizedModelName, processedOptions);
    if (useCache) {
      const cachedData = this.getCachedData(finalCacheKey);
      if (cachedData) {
        return { data: cachedData };
      }
    }

    // Simple findMany query without count (fixed variable types to match schema)
    const query = `
      query FindManyOptimized($modelName: String!, $where: JSON, $orderBy: JSON, $skip: Float, $take: Float, $include: JSON, $select: JSON) {
        findMany(
          modelName: $modelName
          where: $where
          orderBy: $orderBy
          skip: $skip
          take: $take
          include: $include
          select: $select
        )
      }
    `;

    try {
      const result = await this.executeGraphQL<any>({
        query,
        variables: {
          modelName: normalizedModelName,
          ...processedOptions
        }
      });

      if (result.errors) {
        console.error('GraphQL Errors:', result.errors);
        throw new Error(result.errors.map(e => e.message).join(', '));
      }

      const data = result.data?.findMany || [];
      
      // Estimate total and pagination without count query
      const hasMore = data.length === take;
      const estimatedTotal = hasMore ? (page * take) + 1 : skip + data.length;
      const totalPages = Math.ceil(estimatedTotal / take);

      const paginationResult: PaginationResult<T> = {
        data,
        total: estimatedTotal,
        page,
        pageSize: take,
        totalPages,
        hasMore,
        hasPrevious: page > 1
      };

      // Cache the result
      if (useCache) {
        this.setCachedData(finalCacheKey, paginationResult, cacheTimeout);
      }

      return {
        data: paginationResult,
        errors: result.errors
      };
    } catch (error) {
      console.error(`Error in findMany for model ${normalizedModelName}:`, error);
      throw error;
    }
  }

  /**
   * OPTIMIZED findAll - Uses batch fetching for large datasets
   */
  async findAll<T = any>(
    modelName: string,
    options: Omit<OptimizedFindManyOptions, 'skip' | 'take'> = {}
  ): Promise<GraphQLResponse<T[]>> {
    const normalizedModelName = this.normalizeModelName(modelName);
    const { 
      useCache = true, 
      cacheTimeout = 600000, 
      cacheKey, 
      enableBatching = true,
      batchSize = 500,
      ...queryOptions 
    } = options;
    
    // Check cache first
    const finalCacheKey = cacheKey || `${normalizedModelName}:findAll:${this.generateCacheKey(normalizedModelName, queryOptions)}`;
    if (useCache) {
      const cachedData = this.getCachedData(finalCacheKey);
      if (cachedData) {
        return { data: cachedData };
      }
    }

    // Try to get a reasonable batch first to estimate size
    const initialBatch = await this.findMany<T>(normalizedModelName, {
      ...queryOptions,
      take: 100,
      skip: 0,
      useCache: false
    });

    if (!initialBatch.data) {
      return { data: [], errors: initialBatch.errors };
    }

    // If we got less than requested, we have all data
    if (initialBatch.data.data.length < 100) {
      const allData = initialBatch.data.data;
      if (useCache) {
        this.setCachedData(finalCacheKey, allData, cacheTimeout);
      }
      return { data: allData };
    }

    // For larger datasets, use batch fetching if enabled
    if (enableBatching) {
      console.info(`FindAll: ${modelName} appears to have many records. Using batch fetching.`);
      return this.batchFindAll<T>(normalizedModelName, queryOptions, { 
        useCache, 
        cacheTimeout, 
        cacheKey: finalCacheKey,
        batchSize 
      });
    }

    // Fallback: try to get a large batch
    const query = `
      query FindAll($modelName: String!, $where: JSON, $orderBy: JSON, $include: JSON, $select: JSON) {
        findMany(
          modelName: $modelName
          where: $where
          orderBy: $orderBy
          include: $include
          select: $select
        )
      }
    `;

    const result = await this.executeGraphQL<any>({
      query,
      variables: { modelName: normalizedModelName, ...queryOptions }
    });

    const data = result.data?.findMany || [];

    if (useCache) {
      this.setCachedData(finalCacheKey, data, cacheTimeout);
    }

    return { data, errors: result.errors };
  }

  /**
   * Batch processing for large datasets - FIXED for new data structure
   */
  private async batchFindAll<T = any>(
    modelName: string,
    options: any,
    cacheOptions: any
  ): Promise<GraphQLResponse<T[]>> {
    const batchSize = cacheOptions.batchSize || 500;
    const allData: T[] = [];
    let skip = 0;
    let hasMore = true;
    let currentPage = 1;

    while (hasMore) {
      const batchResult = await this.findMany<T>(modelName, {
        ...options,
        skip,
        take: batchSize,
        useCache: false
      });
      if (batchResult.data?.data) {
        let dataArray: T[] = [];
        let shouldContinue = false;
        
        // Check if it's the new format with nested data and pagination object
        if (batchResult.data.data && typeof batchResult.data.data === 'object' && 'data' in batchResult.data.data) {
          // New format: { data: { data: [], pagination: {...} } }
          const nestedData = (batchResult.data.data as any).data;
          dataArray = Array.isArray(nestedData) ? nestedData : [];
          
          const pagination = (batchResult.data.data as any).pagination;
          shouldContinue = pagination?.hasNextPage || false;
          
          
        } else if (Array.isArray(batchResult.data.data)) {
          // Old format: { data: [...], hasMore: boolean }
          dataArray = batchResult.data.data;
          shouldContinue = batchResult.data.hasMore || false;
          
        }
        
        // Add data to collection
        if (dataArray.length > 0) {
          allData.push(...dataArray);
        }
        
        // Update pagination
        hasMore = shouldContinue && dataArray.length > 0;
        skip += batchSize;
        currentPage++;
        
        // Safety check to prevent infinite loops
        if (currentPage > 100) {
          console.warn('⚠️ Batch processing stopped: too many pages (safety limit)');
          break;
        }
        
        // If we got less data than the batch size and no explicit continuation, stop
        if (dataArray.length < batchSize && !shouldContinue) {
          hasMore = false;
        }
        
      } else {
        hasMore = false;
      }

      // Small delay to prevent server overload
      if (hasMore) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }

    // Cache the complete result
    if (cacheOptions.useCache && cacheOptions.cacheKey) {
      this.setCachedData(cacheOptions.cacheKey, allData, cacheOptions.cacheTimeout);
    }

    return { data: allData };
  }

  /**
   * Enhanced model-specific methods with optimized defaults
   */
  async getSanphams(options: OptimizedFindManyOptions = {}) {
    return this.findMany('sanpham', { 
      ...options, 
      cacheTimeout: 300000,
      take: options.take || 50,
      include: options.include || { nhacungcap: true, banggia: true }
    });
  }

  async getAllSanphams(options: Omit<OptimizedFindManyOptions, 'skip' | 'take'> = {}) {
    return this.findAll('sanpham', { 
      ...options, 
      cacheTimeout: 600000,
      enableBatching: true,
      batchSize: 500,
      include: options.include || { nhacungcap: true, banggia: true }
    });
  }

  async getKhachhangs(options: OptimizedFindManyOptions = {}) {
    return this.findMany('khachhang', { 
      ...options, 
      cacheTimeout: 300000,
      take: options.take || 50,
      include: options.include || { banggia: true, nhomkhachhang: true }
    });
  }

  async getAllKhachhangs(options: Omit<OptimizedFindManyOptions, 'skip' | 'take'> = {}) {
    return this.findAll('khachhang', { 
      ...options, 
      cacheTimeout: 600000,
      enableBatching: true,
      include: options.include || { banggia: true, nhomkhachhang: true }
    });
  }

  async getDonhangs(options: OptimizedFindManyOptions = {}) {
    return this.findMany('donhang', { 
      ...options, 
      cacheTimeout: 180000,
      take: options.take || 50,
      include: options.include || { 
        khachhang: true, 
        donhangsanpham: { include: { sanpham: true } }
      }
    });
  }

  async getAllDonhangs(options: Omit<OptimizedFindManyOptions, 'skip' | 'take'> = {}) {
    return this.findAll('donhang', { 
      ...options, 
      cacheTimeout: 600000,
      enableBatching: true,
      include: options.include || { 
        khachhang: true, 
        donhangsanpham: { include: { sanpham: true } }
      }
    });
  }

  async getDathangs(options: OptimizedFindManyOptions = {}) {
    return this.findMany('dathang', { 
      ...options, 
      cacheTimeout: 300000,
      take: options.take || 50
    });
  }

  async getAllDathangs(options: Omit<OptimizedFindManyOptions, 'skip' | 'take'> = {}) {
    return this.findAll('dathang', { 
      ...options, 
      cacheTimeout: 600000,
      enableBatching: true
    });
  }

  async getNhacungcaps(options: OptimizedFindManyOptions = {}) {
    return this.findMany('nhacungcap', { 
      ...options, 
      cacheTimeout: 600000,
      take: options.take || 50
    });
  }

  async getAllNhacungcaps(options: Omit<OptimizedFindManyOptions, 'skip' | 'take'> = {}) {
    return this.findAll('nhacungcap', { 
      ...options, 
      cacheTimeout: 1200000,
      enableBatching: true
    });
  }

  /**
   * Enhanced search with caching
   */
  async search<T = any>(
    modelName: string,
    searchTerm: string,
    searchFields: string[],
    options: OptimizedFindManyOptions = {}
  ): Promise<{ data: T[]; total: number; hasMore: boolean }> {
    const where = {
      OR: searchFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive'
        }
      })),
      ...options.where
    };

    const result = await this.findMany<T>(modelName, { 
      ...options, 
      where,
      cacheTimeout: 180000,
      cacheKey: `search:${modelName}:${searchTerm}:${this.generateCacheKey(modelName, options)}`
    });
    
    return {
      data: result.data?.data || [],
      total: result.data?.total || 0,
      hasMore: result.data?.hasMore || false
    };
  }

  /**
   * Cache management and monitoring
   */
  getCacheStats() {
    return {
      hits: this.cacheHits(),
      misses: this.cacheMisses(),
      hitRate: this.cacheHitRate(),
      size: this.queryCache.size,
      apolloCacheSize: this.apolloClient.cache.extract()
    };
  }

  clearCache(pattern?: string): void {
    if (pattern) {
      for (const key of this.queryCache.keys()) {
        if (key.includes(pattern)) {
          this.queryCache.delete(key);
        }
      }
    } else {
      this.queryCache.clear();
    }
    
    // Also clear Apollo cache
    this.apolloClient.cache.reset();
  }

  invalidateModelCache(modelName: string): void {
    this.clearCache(this.normalizeModelName(modelName));
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

  async refreshCache(): Promise<void> {
    await this.apolloClient.resetStore();
    this.queryCache.clear();
  }
}