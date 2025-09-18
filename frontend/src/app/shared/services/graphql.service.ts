import { Injectable, signal, computed } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';
import { firstValueFrom } from 'rxjs';

// ========================= INTERFACES =========================

export interface OptimizedFindManyOptions<T = any> {
  where?: any;
  orderBy?: any;
  skip?: number;
  take?: number;
  include?: any;
  select?: any;
  cursor?: any;
}

export interface PaginationResult<T> {
  data: T[];
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentPage: number;
  totalPages: number;
}

export interface PerformanceMetrics {
  queryTime: number;
  cacheHit: boolean;
  resultCount: number;
  timestamp: Date;
  queryType: string;
  modelName?: string;
}

export interface CacheEntry<T = any> {
  data: T;
  timestamp: Date;
  ttl: number;
  key: string;
}

export interface BatchOperation {
  operation: 'create' | 'update' | 'delete';
  modelName: string;
  data: any;
  where?: any;
}

export interface GraphQLError {
  message: string;
  code?: string;
  path?: string[];
  timestamp: Date;
}

export interface FindAllOptions<T = any> {
  where?: any;
  orderBy?: any;
  include?: any;
  select?: any;
  take?: number;
  enableParallelFetch?: boolean;
  enableStreaming?: boolean;
  batchSize?: number;
  maxConcurrency?: number;
  aggressiveCache?: boolean;
}

export interface FindAllResult<T = any> {
  data: T[];
  totalCount: number;
  fetchTime: number;
  cacheHit: boolean;
  parallel: boolean;
  batches?: number;
}

// ========================= GRAPHQL QUERIES =========================

const FIND_MANY_QUERY = gql`
  query FindMany(
    $modelName: String!
    $where: JSON
    $orderBy: JSON
    $skip: Float
    $take: Float
    $include: JSON
    $select: JSON
  ) {
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

const FIND_UNIQUE_QUERY = gql`
  query FindUnique(
    $modelName: String!
    $where: JSON!
    $include: JSON
    $select: JSON
  ) {
    findUnique(
      modelName: $modelName
      where: $where
      include: $include
      select: $select
    )
  }
`;

const FIND_FIRST_QUERY = gql`
  query FindFirst(
    $modelName: String!
    $where: JSON
    $orderBy: JSON
    $include: JSON
    $select: JSON
  ) {
    findFirst(
      modelName: $modelName
      where: $where
      orderBy: $orderBy
      include: $include
      select: $select
    )
  }
`;

const CREATE_ONE_MUTATION = gql`
  mutation CreateOne(
    $modelName: String!
    $data: JSON!
    $include: JSON
    $select: JSON
  ) {
    createOne(
      modelName: $modelName
      data: $data
      include: $include
      select: $select
    )
  }
`;

const UPDATE_ONE_MUTATION = gql`
  mutation UpdateRecord(
    $modelName: String!
    $where: JSON!
    $data: JSON!
    $include: JSON
    $select: JSON
  ) {
    updateRecord(
      modelName: $modelName
      where: $where
      data: $data
      include: $include
      select: $select
    )
  }
`;

const DELETE_ONE_MUTATION = gql`
  mutation DeleteOne(
    $modelName: String!
    $where: JSON!
  ) {
    deleteOne(
      modelName: $modelName
      where: $where
    )
  }
`;

const BATCH_CREATE_MUTATION = gql`
  mutation BatchCreate(
    $modelName: String!
    $data: [JSON!]!
  ) {
    batchCreate(
      modelName: $modelName
      data: $data
    )
  }
`;

const BATCH_UPDATE_MUTATION = gql`
  mutation BatchUpdate(
    $modelName: String!
    $operations: [JSON!]!
  ) {
    batchUpdate(
      modelName: $modelName
      operations: $operations
    )
  }
`;

const BATCH_DELETE_MUTATION = gql`
  mutation BatchDelete(
    $modelName: String!
    $ids: [String!]!
  ) {
    batchDelete(
      modelName: $modelName
      ids: $ids
    )
  }
`;

const HEALTH_CHECK_QUERY = gql`
  query HealthCheck {
    health
  }
`;

const GET_AVAILABLE_MODELS_QUERY = gql`
  query GetAvailableModels {
    getAvailableModels
  }
`;

const MODEL_METADATA_QUERY = gql`
  query ModelMetadata($modelName: String!) {
    modelMetadata(modelName: $modelName)
  }
`;

const AGGREGATE_QUERY = gql`
  query Aggregate(
    $modelName: String!
    $aggregations: JSON!
    $where: JSON
  ) {
    aggregate(
      modelName: $modelName
      aggregations: $aggregations
      where: $where
    )
  }
`;

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  // ========================= PROPERTIES =========================
  
  private cache = new Map<string, CacheEntry>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes
  private readonly AGGRESSIVE_TTL = 30 * 60 * 1000; // 30 minutes for findAll
  private readonly MAX_CACHE_SIZE = 999999;
  private readonly CLEANUP_INTERVAL = 60 * 1000; // 1 minute
  private readonly REQUEST_TIMEOUT = 30000; // 30 seconds
  private readonly MAX_RETRIES = 3;
  private readonly DEFAULT_BATCH_SIZE = 999999;
  private readonly MAX_PARALLEL_REQUESTS = 5;

  // Performance monitoring
  private performanceMetrics = signal<PerformanceMetrics[]>([]);
  private cacheHitRate = computed(() => {
    const metrics = this.performanceMetrics();
    if (metrics.length === 0) return 0;
    const hits = metrics.filter(m => m.cacheHit).length;
    return (hits / metrics.length) * 100;
  });

  // Error tracking
  private errors = signal<GraphQLError[]>([]);
  private isHealthy = signal(true);
  
  // Loading states
  private loadingStates = new Map<string, boolean>();
  
  constructor(private apollo: Apollo) {
    this.initializeCacheCleanup();
    this.performHealthCheck();
  }

  // ========================= CACHE MANAGEMENT =========================

  private initializeCacheCleanup(): void {
    setInterval(() => {
      this.cleanupExpiredCache();
    }, this.CLEANUP_INTERVAL);
  }

  private cleanupExpiredCache(): void {
    const now = new Date();
    const expiredKeys: string[] = [];

    this.cache.forEach((entry, key) => {
      if (now.getTime() - entry.timestamp.getTime() > entry.ttl) {
        expiredKeys.push(key);
      }
    });

    expiredKeys.forEach(key => this.cache.delete(key));

    // Enforce max cache size
    if (this.cache.size > this.MAX_CACHE_SIZE) {
      const sortedEntries = Array.from(this.cache.entries())
        .sort((a, b) => a[1].timestamp.getTime() - b[1].timestamp.getTime());
      
      const toRemove = this.cache.size - this.MAX_CACHE_SIZE;
      for (let i = 0; i < toRemove; i++) {
        this.cache.delete(sortedEntries[i][0]);
      }
    }
  }

  private generateCacheKey(operation: string, variables: any): string {
    return `${operation}_${JSON.stringify(variables)}`;
  }

  private getFromCache<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = new Date();
    if (now.getTime() - entry.timestamp.getTime() > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  private setCache<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: new Date(),
      ttl,
      key
    });
  }

  private invalidateCache(pattern?: string): void {
    if (!pattern) {
      this.cache.clear();
      return;
    }

    const keysToDelete: string[] = [];
    this.cache.forEach((_, key) => {
      if (key.includes(pattern)) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.cache.delete(key));
  }

  // ========================= PERFORMANCE MONITORING =========================

  private trackPerformance(
    queryType: string,
    startTime: number,
    cacheHit: boolean,
    resultCount: number,
    modelName?: string
  ): void {
    const metrics: PerformanceMetrics = {
      queryTime: Date.now() - startTime,
      cacheHit,
      resultCount,
      timestamp: new Date(),
      queryType,
      modelName
    };

    const currentMetrics = this.performanceMetrics();
    this.performanceMetrics.set([...currentMetrics.slice(-99), metrics]); // Keep last 100 metrics
  }

  private trackError(error: any, operation: string): void {
    const graphqlError: GraphQLError = {
      message: error.message || 'Unknown error',
      code: error.code || error.extensions?.code,
      path: error.path,
      timestamp: new Date()
    };

    const currentErrors = this.errors();
    this.errors.set([...currentErrors.slice(-49), graphqlError]); // Keep last 50 errors
  }

  // ========================= LOADING STATE MANAGEMENT =========================

  private setLoading(key: string, loading: boolean): void {
    this.loadingStates.set(key, loading);
  }

  // ========================= HEALTH CHECK =========================

  private async performHealthCheck(): Promise<void> {
    // const startTime = Date.now();
    
    // try {
    //   const result = await firstValueFrom(
    //     this.apollo.query({
    //       query: HEALTH_CHECK_QUERY,
    //       fetchPolicy: 'no-cache'
    //     })
    //   );
      
    //   this.isHealthy.set(true);
    //   this.trackPerformance('health_check', startTime, false, 1);
    // } catch (error) {
    //   this.isHealthy.set(false);
    //   this.trackError(error, 'health_check');
    // }
  }

  // ========================= CORE QUERY METHODS =========================

  async findMany<T = any>(
    modelName: string,
    options: OptimizedFindManyOptions<T> = {}
  ): Promise<T[]> {
    const startTime = Date.now();
    const cacheKey = this.generateCacheKey('findMany', { modelName, ...options });
    const loadingKey = `findMany_${modelName}`;

    // Check cache first
    const cachedData = this.getFromCache<T[]>(cacheKey);
    if (cachedData) {
      this.trackPerformance('findMany', startTime, true, cachedData.length, modelName);
      return cachedData;
    }

    this.setLoading(loadingKey, true);

    const variables = {
      modelName,
      where: options.where,
      orderBy: options.orderBy,
      skip: options.skip,
      take: options.take,
      include: options.include,
      select: options.select
    };

    try {
      const result = await firstValueFrom(
        this.apollo.query<{ findMany: T[] }>({
          query: FIND_MANY_QUERY,
          variables,
          fetchPolicy: 'cache-first'
        })
      );

      const data = result.data.findMany;
      this.setCache(cacheKey, data);
      this.trackPerformance('findMany', startTime, false, data.length, modelName);
      return data;
    } catch (error) {
      this.trackError(error, 'findMany');
      throw error;
    } finally {
      this.setLoading(loadingKey, false);
    }
  }

  async findUnique<T = any>(
    modelName: string,
    where: any,
    options: { include?: any; select?: any } = {}
  ): Promise<T | null> {
    const startTime = Date.now();
    const cacheKey = this.generateCacheKey('findUnique', { modelName, where, ...options });
    const loadingKey = `findUnique_${modelName}`;

    // Check cache first
    const cachedData = this.getFromCache<T>(cacheKey);
    if (cachedData) {
      this.trackPerformance('findUnique', startTime, true, 1, modelName);
      return cachedData;
    }

    this.setLoading(loadingKey, true);

    const variables = {
      modelName,
      where,
      include: options.include,
      select: options.select
    };

    try {
      const result = await firstValueFrom(
        this.apollo.query<{ findUnique: T }>({
          query: FIND_UNIQUE_QUERY,
          variables,
          fetchPolicy: 'cache-first'
        })
      );

      const data = result.data.findUnique;
      this.setCache(cacheKey, data);
      this.trackPerformance('findUnique', startTime, false, data ? 1 : 0, modelName);
      return data;
    } catch (error) {
      this.trackError(error, 'findUnique');
      throw error;
    } finally {
      this.setLoading(loadingKey, false);
    }
  }

  async findFirst<T = any>(
    modelName: string,
    options: { 
      where?: any; 
      orderBy?: any;
      include?: any; 
      select?: any;
    } = {}
  ): Promise<T | null> {
    const startTime = Date.now();
    const cacheKey = this.generateCacheKey('findFirst', { modelName, ...options });
    const loadingKey = `findFirst_${modelName}`;

    // Check cache first
    const cachedData = this.getFromCache<T>(cacheKey);
    if (cachedData) {
      this.trackPerformance('findFirst', startTime, true, 1, modelName);
      return cachedData;
    }

    this.setLoading(loadingKey, true);

    const variables = {
      modelName,
      where: options.where,
      orderBy: options.orderBy,
      include: options.include,
      select: options.select
    };

    try {
      const result = await firstValueFrom(
        this.apollo.query<{ findFirst: T }>({
          query: FIND_FIRST_QUERY,
          variables,
          fetchPolicy: 'cache-first'
        })
      );

      const data = result.data.findFirst;
      this.setCache(cacheKey, data);
      this.trackPerformance('findFirst', startTime, false, data ? 1 : 0, modelName);
      return data;
    } catch (error) {
      this.trackError(error, 'findFirst');
      throw error;
    } finally {
      this.setLoading(loadingKey, false);
    }
  }

  // ========================= MUTATION METHODS =========================

  async createOne<T = any>(
    modelName: string,
    data: any,
    options: { include?: any; select?: any } = {}
  ): Promise<T> {
    const startTime = Date.now();
    const loadingKey = `createOne_${modelName}`;

    this.setLoading(loadingKey, true);

    const variables = {
      modelName,
      data,
      include: options.include,
      select: options.select
    };

    try {
      const result = await firstValueFrom(
        this.apollo.mutate<{ createOne: T }>({
          mutation: CREATE_ONE_MUTATION,
          variables
        })
      );

      const createdData = result.data!.createOne;
      // Invalidate related cache entries
      this.invalidateCache(modelName);
      this.trackPerformance('createOne', startTime, false, 1, modelName);
      return createdData;
    } catch (error) {
      this.trackError(error, 'createOne');
      throw error;
    } finally {
      this.setLoading(loadingKey, false);
    }
  }

  async updateOne<T = any>(
    modelName: string,
    where: any,
    data: any,
    options: { include?: any; select?: any } = {}
  ): Promise<T> {
    const startTime = Date.now();
    const loadingKey = `updateOne_${modelName}`;
    // console.log(where, data);
    
    this.setLoading(loadingKey, true);

    const variables = {
      modelName,
      where,
      data,
      include: options.include,
      select: options.select
    };

    try {
      const result = await firstValueFrom(
        this.apollo.mutate<{ updateRecord: T }>({
          mutation: UPDATE_ONE_MUTATION,
          variables
        })
      );

      const updatedData = result.data!.updateRecord;
      // Invalidate related cache entries
      this.invalidateCache(modelName);
      this.trackPerformance('updateOne', startTime, false, 1, modelName);
      // console.log('updatedData', updatedData);
      
      return updatedData;
    } catch (error) {
      this.trackError(error, 'updateOne');
      throw error;
    } finally {
      this.setLoading(loadingKey, false);
    }
  }

  async deleteOne<T = any>(
    modelName: string,
    where: any
  ): Promise<T> {
    const startTime = Date.now();
    const loadingKey = `deleteOne_${modelName}`;

    this.setLoading(loadingKey, true);

    const variables = {
      modelName,
      where
    };

    try {
      const result = await firstValueFrom(
        this.apollo.mutate<{ deleteOne: T }>({
          mutation: DELETE_ONE_MUTATION,
          variables
        })
      );

      const deletedData = result.data!.deleteOne;
      // Invalidate related cache entries
      this.invalidateCache(modelName);
      this.trackPerformance('deleteOne', startTime, false, 1, modelName);
      return deletedData;
    } catch (error) {
      this.trackError(error, 'deleteOne');
      throw error;
    } finally {
      this.setLoading(loadingKey, false);
    }
  }

  // ========================= BATCH OPERATIONS =========================

  async batchCreate<T = any>(
    modelName: string,
    data: any[]
  ): Promise<T[]> {
    const startTime = Date.now();
    const loadingKey = `batchCreate_${modelName}`;

    this.setLoading(loadingKey, true);

    const variables = {
      modelName,
      data
    };

    try {
      const result = await firstValueFrom(
        this.apollo.mutate<{ batchCreate: T[] }>({
          mutation: BATCH_CREATE_MUTATION,
          variables
        })
      );

      const createdData = result.data!.batchCreate;
      // Invalidate related cache entries
      this.invalidateCache(modelName);
      this.trackPerformance('batchCreate', startTime, false, createdData.length, modelName);
      return createdData;
    } catch (error) {
      this.trackError(error, 'batchCreate');
      throw error;
    } finally {
      this.setLoading(loadingKey, false);
    }
  }

  async batchUpdate<T = any>(
    modelName: string,
    operations: Array<{ where: any; data: any }>
  ): Promise<T[]> {
    const startTime = Date.now();
    const loadingKey = `batchUpdate_${modelName}`;

    this.setLoading(loadingKey, true);

    const variables = {
      modelName,
      operations
    };

    try {
      const result = await firstValueFrom(
        this.apollo.mutate<{ batchUpdate: T[] }>({
          mutation: BATCH_UPDATE_MUTATION,
          variables
        })
      );

      const updatedData = result.data!.batchUpdate;
      // Invalidate related cache entries
      this.invalidateCache(modelName);
      this.trackPerformance('batchUpdate', startTime, false, updatedData.length, modelName);
      return updatedData;
    } catch (error) {
      this.trackError(error, 'batchUpdate');
      throw error;
    } finally {
      this.setLoading(loadingKey, false);
    }
  }

  async batchDelete<T = any>(
    modelName: string,
    ids: string[]
  ): Promise<T[]> {
    const startTime = Date.now();
    const loadingKey = `batchDelete_${modelName}`;

    this.setLoading(loadingKey, true);

    const variables = {
      modelName,
      ids
    };

    try {
      const result = await firstValueFrom(
        this.apollo.mutate<{ batchDelete: T[] }>({
          mutation: BATCH_DELETE_MUTATION,
          variables
        })
      );

      const deletedData = result.data!.batchDelete;
      // Invalidate related cache entries
      this.invalidateCache(modelName);
      this.trackPerformance('batchDelete', startTime, false, deletedData.length, modelName);
      return deletedData;
    } catch (error) {
      this.trackError(error, 'batchDelete');
      throw error;
    } finally {
      this.setLoading(loadingKey, false);
    }
  }

  // ========================= AGGREGATE OPERATIONS =========================

  async aggregate<T = any>(
    modelName: string,
    aggregations: any,
    where?: any
  ): Promise<T> {
    const startTime = Date.now();
    const loadingKey = `aggregate_${modelName}`;
    const cacheKey = this.generateCacheKey('aggregate', { modelName, aggregations, where });

    // Check cache first
    const cachedData = this.getFromCache<T>(cacheKey);
    if (cachedData) {
      this.trackPerformance('aggregate', startTime, true, 1, modelName);
      return cachedData;
    }

    this.setLoading(loadingKey, true);

    const variables = {
      modelName,
      aggregations,
      where
    };

    try {
      const result = await firstValueFrom(
        this.apollo.query<{ aggregate: T }>({
          query: AGGREGATE_QUERY,
          variables,
          fetchPolicy: 'cache-first'
        })
      );

      const aggregateResult = result.data.aggregate;
      this.setCache(cacheKey, aggregateResult, this.DEFAULT_TTL);
      this.trackPerformance('aggregate', startTime, false, 1, modelName);
      return aggregateResult;
    } catch (error) {
      this.trackError(error, 'aggregate');
      throw error;
    } finally {
      this.setLoading(loadingKey, false);
    }
  }

  // ========================= UTILITY METHODS =========================

  async getAvailableModels(): Promise<string[]> {
    const startTime = Date.now();
    const cacheKey = 'getAvailableModels';

    // Check cache first
    const cachedData = this.getFromCache<string[]>(cacheKey);
    if (cachedData) {
      this.trackPerformance('getAvailableModels', startTime, true, cachedData.length);
      return cachedData;
    }

    try {
      const result = await firstValueFrom(
        this.apollo.query<{ getAvailableModels: string[] }>({
          query: GET_AVAILABLE_MODELS_QUERY,
          fetchPolicy: 'cache-first'
        })
      );

      const data = result.data.getAvailableModels;
      this.setCache(cacheKey, data, this.DEFAULT_TTL * 12); // Cache for 1 hour
      this.trackPerformance('getAvailableModels', startTime, false, data.length);
      return data;
    } catch (error) {
      this.trackError(error, 'getAvailableModels');
      throw error;
    }
  }

  async getModelMetadata(modelName: string): Promise<any> {
    const startTime = Date.now();
    const cacheKey = this.generateCacheKey('modelMetadata', { modelName });

    // Check cache first
    const cachedData = this.getFromCache(cacheKey);
    if (cachedData) {
      this.trackPerformance('modelMetadata', startTime, true, 1, modelName);
      return cachedData;
    }

    try {
      const result = await firstValueFrom(
        this.apollo.query({
          query: MODEL_METADATA_QUERY,
          variables: { modelName },
          fetchPolicy: 'cache-first'
        })
      );

      const data = (result as any).data.modelMetadata;
      this.setCache(cacheKey, data, this.DEFAULT_TTL * 6); // Cache for 30 minutes
      this.trackPerformance('modelMetadata', startTime, false, 1, modelName);
      return data;
    } catch (error) {
      this.trackError(error, 'modelMetadata');
      throw error;
    }
  }

  // ========================= PAGINATION HELPER =========================

  async findManyWithPagination<T = any>(
    modelName: string,
    options: OptimizedFindManyOptions<T> & { pageSize?: number; page?: number } = {}
  ): Promise<PaginationResult<T>> {
    const pageSize = options.pageSize || 10;
    const page = Math.max(1, options.page || 1);
    const skip = (page - 1) * pageSize;

    const queryOptions: OptimizedFindManyOptions<T> = {
      ...options,
      skip,
      take: pageSize
    };

    // Get total count first
    const countOptions = { ...options, select: { id: true } };
    delete countOptions.skip;
    delete countOptions.take;

    try {
      const countResult = await this.findMany<{ id: any }>(modelName, countOptions);
      const totalCount = countResult.length;

      const data = await this.findMany<T>(modelName, queryOptions);

      return {
        data,
        totalCount,
        hasNextPage: skip + pageSize < totalCount,
        hasPreviousPage: page > 1,
        currentPage: page,
        totalPages: Math.ceil(totalCount / pageSize)
      };
    } catch (error) {
      throw error;
    }
  }

  // ========================= STATE GETTERS =========================

  getPerformanceMetrics(): PerformanceMetrics[] {
    return this.performanceMetrics();
  }

  getCacheHitRate(): number {
    return this.cacheHitRate();
  }

  getErrors(): GraphQLError[] {
    return this.errors();
  }

  getHealthStatus(): boolean {
    return this.isHealthy();
  }

  isLoading(operation: string, modelName?: string): boolean {
    const key = modelName ? `${operation}_${modelName}` : operation;
    return this.loadingStates.get(key) || false;
  }

  getCacheSize(): number {
    return this.cache.size;
  }

  // ========================= OPTIMIZED FINDALL METHODS =========================

  /**
   * Ultra-optimized findAll method with aggressive caching, parallel fetching, and streaming
   * Best performance for loading complete datasets
   */
  async findAll<T = any>(
    modelName: string,
    options: FindAllOptions<T> = {}
  ): Promise<FindAllResult<T>> {
    const startTime = Date.now();
    const {
      enableParallelFetch = true,
      enableStreaming = true,
      batchSize = this.DEFAULT_BATCH_SIZE,
      maxConcurrency = this.MAX_PARALLEL_REQUESTS,
      aggressiveCache = true,
      ...queryOptions
    } = options;

    const cacheKey = this.generateCacheKey('findAll', { modelName, ...queryOptions });
    const ttl = aggressiveCache ? this.AGGRESSIVE_TTL : this.DEFAULT_TTL;

    // Check aggressive cache first
    const cachedData = this.getFromCache<FindAllResult<T>>(cacheKey);
    if (cachedData && aggressiveCache) {
      return {
        ...cachedData,
        fetchTime: Date.now() - startTime,
        cacheHit: true
      };
    }

    this.setLoading(`findAll_${modelName}`, true);

    try {
      let result: FindAllResult<T>;

      if (enableParallelFetch) {
        result = await this.parallelFindAll(modelName, queryOptions, batchSize, maxConcurrency);
      } else if (enableStreaming) {
        result = await this.streamingFindAll(modelName, queryOptions, batchSize);
      } else {
        result = await this.standardFindAll(modelName, queryOptions);
      }

      const finalResult: FindAllResult<T> = {
        ...result,
        fetchTime: Date.now() - startTime,
        cacheHit: false,
        parallel: enableParallelFetch
      };

      // Aggressive caching for findAll
      this.setCache(cacheKey, finalResult, ttl);
      this.trackPerformance('findAll', startTime, false, result.totalCount, modelName);

      return finalResult;
    } catch (error) {
      this.trackError(error, 'findAll');
      throw error;
    } finally {
      this.setLoading(`findAll_${modelName}`, false);
    }
  }

  /**
   * Parallel batch fetching for maximum speed
   */
  private async parallelFindAll<T>(
    modelName: string,
    options: any,
    batchSize: number,
    maxConcurrency: number
  ): Promise<FindAllResult<T>> {
    // First, get total count
    const countResult = await this.findMany<{ id: any }>(modelName, {
      ...options,
      select: { id: true }
    });
    const totalCount = countResult.length;

    if (totalCount === 0) {
      return {
        data: [],
        totalCount: 0,
        fetchTime: 0,
        cacheHit: false,
        parallel: true,
        batches: 0
      };
    }

    const batches = Math.ceil(totalCount / batchSize);

    // Create batch promises with concurrency control
    const processBatch = async (skip: number, take: number): Promise<T[]> => {
      return await this.findMany<T>(modelName, {
        ...options,
        skip,
        take
      });
    };

    // Process batches with controlled concurrency
    const executeInParallel = async (): Promise<T[]> => {
      const allResults: T[] = [];
      const executing: Promise<void>[] = [];

      for (let i = 0; i < batches; i++) {
        const skip = i * batchSize;
        const take = Math.min(batchSize, totalCount - skip);

        const batchPromise = processBatch(skip, take).then(batchResult => {
          allResults.push(...batchResult);
        });

        executing.push(batchPromise);

        // Control concurrency
        if (executing.length >= maxConcurrency) {
          await Promise.race(executing);
          // Remove completed promises
          const stillRunning = executing.filter(p => {
            // Check if promise is still pending
            return p && typeof (p as any).isPending !== 'boolean';
          });
          executing.length = 0;
          executing.push(...stillRunning);
        }
      }

      // Wait for all remaining promises
      await Promise.all(executing);
      return allResults;
    };

    const finalResults = await executeInParallel();

    return {
      data: finalResults,
      totalCount,
      fetchTime: 0,
      cacheHit: false,
      parallel: true,
      batches
    };
  }

  /**
   * Streaming approach for memory-efficient large datasets
   */
  private async streamingFindAll<T>(
    modelName: string,
    options: any,
    batchSize: number
  ): Promise<FindAllResult<T>> {
    const results: T[] = [];
    let skip = 0;
    let totalFetched = 0;
    let hasMore = true;
    let batches = 0;

    while (hasMore) {
      const batchResult = await this.findMany<T>(modelName, {
        ...options,
        skip,
        take: batchSize
      });

      if (batchResult.length === 0) {
        hasMore = false;
        break;
      }

      results.push(...batchResult);
      totalFetched += batchResult.length;
      skip += batchSize;
      batches++;

      // If we got less than batchSize, we've reached the end
      if (batchResult.length < batchSize) {
        hasMore = false;
      }

      // Memory optimization: yield control to prevent blocking
      if (batches % 5 === 0) {
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }

    return {
      data: results,
      totalCount: totalFetched,
      fetchTime: 0,
      cacheHit: false,
      parallel: false,
      batches
    };
  }

  /**
   * Standard single-request approach
   */
  private async standardFindAll<T>(
    modelName: string,
    options: any
  ): Promise<FindAllResult<T>> {
    const data = await this.findMany<T>(modelName, options);
    
    return {
      data,
      totalCount: data.length,
      fetchTime: 0,
      cacheHit: false,
      parallel: false
    };
  }

  /**
   * Multi-model parallel findAll - fetch multiple models simultaneously
   */
  async findAllMultiple<T = any>(
    models: Array<{
      name: string;
      options?: FindAllOptions<T>;
    }>,
    globalOptions: FindAllOptions<T> = {}
  ): Promise<Record<string, FindAllResult<T>>> {
    const startTime = Date.now();
    const results: Record<string, FindAllResult<T>> = {};

    // Execute all model queries in parallel
    const promises = models.map(async ({ name, options = {} }) => {
      const mergedOptions = { ...globalOptions, ...options };
      const result = await this.findAll<T>(name, mergedOptions);
      return { name, result };
    });

    try {
      const resolvedResults = await Promise.all(promises);
      
      resolvedResults.forEach(({ name, result }) => {
        results[name] = result;
      });

      // Track combined performance
      const totalRecords = Object.values(results).reduce(
        (sum, result) => sum + result.totalCount, 0
      );
      this.trackPerformance('findAllMultiple', startTime, false, totalRecords, 'multiple');

      return results;
    } catch (error) {
      this.trackError(error, 'findAllMultiple');
      throw error;
    }
  }

  /**
   * Smart findAll with automatic optimization selection
   */
  async smartFindAll<T = any>(
    modelName: string,
    options: FindAllOptions<T> = {}
  ): Promise<FindAllResult<T>> {
    // Get model metadata to make smart decisions
    const metadata = await this.getModelMetadata(modelName);
    
    // Auto-optimize based on estimated dataset size and complexity
    const estimatedSize = metadata?.estimatedRecordCount || 1000;
    const hasComplexRelations = metadata?.hasComplexRelations || false;

    const optimizedOptions: FindAllOptions<T> = {
      ...options,
      enableParallelFetch: estimatedSize > 5000,
      enableStreaming: estimatedSize > 10000,
      batchSize: hasComplexRelations ? 500 : 2000,
      maxConcurrency: hasComplexRelations ? 3 : 5,
      aggressiveCache: estimatedSize < 50000 // Only cache smaller datasets aggressively
    };

    return await this.findAll(modelName, optimizedOptions);
  }

  // ========================= CACHE CONTROL =========================

  clearCache(pattern?: string): void {
    this.invalidateCache(pattern);
  }

  async refreshHealthCheck(): Promise<void> {
    await this.performHealthCheck();
  }

  // ========================= PERFORMANCE TESTING =========================

  /**
   * Performance benchmark for findAll methods
   */
  async benchmarkFindAll(modelName: string, testCases: FindAllOptions[] = []): Promise<{
    results: Array<{
      config: FindAllOptions;
      result: FindAllResult<any>;
      performance: {
        totalTime: number;
        recordsPerSecond: number;
        cacheEfficiency: number;
      };
    }>;
    recommendation: FindAllOptions;
  }> {
    const defaultTestCases: FindAllOptions[] = [
      { enableParallelFetch: false, enableStreaming: false }, // Standard
      { enableParallelFetch: true, enableStreaming: false, batchSize: 500 }, // Parallel small
      { enableParallelFetch: true, enableStreaming: false, batchSize: 2000 }, // Parallel large
      { enableParallelFetch: false, enableStreaming: true, batchSize: 1000 }, // Streaming
      { enableParallelFetch: true, enableStreaming: false, aggressiveCache: true }, // Smart cached
    ];

    const testConfigs = testCases.length > 0 ? testCases : defaultTestCases;
    const results = [];

    // Clear cache for fair testing
    this.clearCache(modelName);

    for (const config of testConfigs) {
      console.log(`🧪 Testing configuration:`, config);
      
      const startTime = Date.now();
      const result = await this.findAll(modelName, config);
      const totalTime = Date.now() - startTime;

      const performance = {
        totalTime,
        recordsPerSecond: Math.round(result.totalCount / (totalTime / 1000)),
        cacheEfficiency: result.cacheHit ? 100 : 0
      };

      results.push({
        config,
        result,
        performance
      });

      console.log(`✅ Completed: ${totalTime}ms, ${performance.recordsPerSecond} records/sec`);
      
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Find best performing configuration
    const bestResult = results.reduce((best, current) => 
      current.performance.recordsPerSecond > best.performance.recordsPerSecond ? current : best
    );

    return {
      results,
      recommendation: bestResult.config
    };
  }

  // ========================= MODEL-SPECIFIC OPTIMIZED METHODS =========================

  // ========================= ULTRA-FAST FINDALL METHODS =========================

  /**
   * Ultra-fast tonKho findAll with inventory-specific optimizations
   */
  async findAllTonKho(options: FindAllOptions = {}): Promise<FindAllResult<any>> {
    return await this.findAll('tonkho', {
      batchSize: 2000, // Large batches for simple inventory data
      enableParallelFetch: true,
      aggressiveCache: true,
      select: {
        id: true,
        sanphamId: true,
        slton: true,
        slchogiao: true,
        slchonhap: true,
        sanpham: {
          select: {
            id: true,
            ten: true,
            gia: true
          }
        }
      },
      ...options
    });
  }

  /**
   * Ultra-fast sanpham findAll with product-specific optimizations
   */
  async findAllSanpham(options: FindAllOptions = {}): Promise<FindAllResult<any>> {
    return await this.smartFindAll('sanpham', {
      select: {
        id: true,
        ten: true,
        gia: true,
        mota: true,
        active: true,
        createdAt: true
      },
      orderBy: { ten: 'asc' },
      aggressiveCache: true,
      ...options
    });
  }

  /**
   * Ultra-fast khachhang findAll with customer-specific optimizations
   */
  async findAllKhachhang(options: FindAllOptions = {}): Promise<FindAllResult<any>> {
    return await this.smartFindAll('khachhang', {
      select: {
        id: true,
        ten: true,
        email: true,
        sdt: true,
        diachi: true,
        active: true
      },
      orderBy: { ten: 'asc' },
      batchSize: 1000,
      enableParallelFetch: true,
      ...options
    });
  }

  /**
   * Ultra-fast donhang findAll with optimized relations
   */
  async findAllDonhang(options: FindAllOptions = {}): Promise<FindAllResult<any>> {
    return await this.findAll('donhang', {
      include: {
        khachhang: {
          select: {
            id: true,
            ten: true,
            sdt: true
          }
        },
        donhangsanpham: {
          select: {
            id: true,
            soluong: true,
            gia: true,
            sanpham: {
              select: {
                id: true,
                ten: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      batchSize: 500, // Smaller batches due to complex relations
      maxConcurrency: 3,
      ...options
    });
  }

  /**
   * Comprehensive dashboard data loader - loads all essential data in parallel
   */
  async loadDashboardData(options: FindAllOptions = {}): Promise<{
    sanpham: FindAllResult<any>;
    khachhang: FindAllResult<any>;
    tonkho: FindAllResult<any>;
    donhang: FindAllResult<any>;
    totalLoadTime: number;
  }> {
    const startTime = Date.now();

    const [sanpham, khachhang, tonkho, donhang] = await Promise.all([
      this.findAllSanpham({ 
        take: 9999, // Limit for dashboard
        aggressiveCache: true,
        ...options 
      }),
      this.findAllKhachhang({ 
        take: 9999,
        aggressiveCache: true,
        ...options 
      }),
      this.findAllTonKho({ 
        take: 9999,
        aggressiveCache: true,
        ...options 
      }),
      this.findAllDonhang({ 
        take: 9999,
        aggressiveCache: true,
        ...options 
      })
    ]);

    return {
      sanpham,
      khachhang,
      tonkho,
      donhang,
      totalLoadTime: Date.now() - startTime
    };
  }

  // ========================= LEGACY OPTIMIZED METHODS (ENHANCED) =========================

  // Sanpham methods
  async getSanphamList(options: OptimizedFindManyOptions = {}): Promise<any[]> {
    return await this.findMany('sanpham', {
      orderBy: { ten: 'asc' },
      ...options
    });
  }

  async getSanphamById(id: string | number): Promise<any> {
    return await this.findUnique('sanpham', { id });
  }

  async getFirstSanpham(options: { where?: any; orderBy?: any; include?: any; select?: any } = {}): Promise<any> {
    return await this.findFirst('sanpham', {
      orderBy: { createdAt: 'desc' },
      ...options
    });
  }

  // Khachhang methods
  async getKhachhangList(options: OptimizedFindManyOptions = {}): Promise<any[]> {
    return await this.findMany('khachhang', {
      orderBy: { ten: 'asc' },
      ...options
    });
  }

  async getKhachhangById(id: string | number): Promise<any> {
    return await this.findUnique('khachhang', { id });
  }

  async getFirstKhachhang(options: { where?: any; orderBy?: any; include?: any; select?: any } = {}): Promise<any> {
    return await this.findFirst('khachhang', {
      orderBy: { createdAt: 'desc' },
      ...options
    });
  }

  // Donhang methods
  async getDonhangList(options: OptimizedFindManyOptions = {}): Promise<any[]> {
    return await this.findMany('donhang', {
      orderBy: { createdAt: 'desc' },
      ...options
    });
  }

  async getDonhangById(id: string | number): Promise<any> {
    return await this.findUnique('donhang', { id });
  }

  async getFirstDonhang(options: { where?: any; orderBy?: any; include?: any; select?: any } = {}): Promise<any> {
    return await this.findFirst('donhang', {
      orderBy: { createdAt: 'desc' },
      ...options
    });
  }

  // Nhomkhachhang methods
  async getNhomkhachhangList(options: OptimizedFindManyOptions = {}): Promise<any[]> {
    return await this.findMany('nhomkhachhang', {
      orderBy: { ten: 'asc' },
      ...options
    });
  }

  async getNhomkhachhangById(id: string | number): Promise<any> {
    return await this.findUnique('nhomkhachhang', { id });
  }

  async getFirstNhomkhachhang(options: { where?: any; orderBy?: any; include?: any; select?: any } = {}): Promise<any> {
    return await this.findFirst('nhomkhachhang', {
      orderBy: { createdAt: 'desc' },
      ...options
    });
  }

  // Dathang methods
  async getDathangList(options: OptimizedFindManyOptions = {}): Promise<any[]> {
    return await this.findMany('dathang', {
      orderBy: { createdAt: 'desc' },
      include: {
        nhacungcap: true,
        dathangsanpham: {
          include: {
            sanpham: true
          }
        }
      },
      ...options
    });
  }

  // User methods
  async getUserList(options: OptimizedFindManyOptions = {}): Promise<any[]> {
    return await this.findMany('user', {
      orderBy: { ten: 'asc' },
      select: {
        id: true,
        ten: true,
        email: true,
        sdt: true,
        createdAt: true,
        updatedAt: true
      },
      ...options
    });
  }

  async getUserById(id: string | number): Promise<any> {
    return await this.findUnique('user', { id }, {
      include: {
        profile: true,
        userRole: {
          include: {
            role: true
          }
        }
      }
    });
  }
}
