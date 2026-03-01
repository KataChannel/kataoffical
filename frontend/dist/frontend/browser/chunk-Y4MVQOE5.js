import {
  Apollo,
  gql
} from "./chunk-IABB4NTX.js";
import {
  computed,
  firstValueFrom,
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-RBDY2J7V.js";
import {
  __async,
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/shared/services/graphql.service.ts
var FIND_MANY_QUERY = gql`
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
var FIND_UNIQUE_QUERY = gql`
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
var FIND_FIRST_QUERY = gql`
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
var CREATE_ONE_MUTATION = gql`
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
var UPDATE_ONE_MUTATION = gql`
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
var DELETE_ONE_MUTATION = gql`
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
var BATCH_CREATE_MUTATION = gql`
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
var BATCH_UPDATE_MUTATION = gql`
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
var BATCH_DELETE_MUTATION = gql`
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
var HEALTH_CHECK_QUERY = gql`
  query HealthCheck {
    health
  }
`;
var GET_AVAILABLE_MODELS_QUERY = gql`
  query GetAvailableModels {
    getAvailableModels
  }
`;
var MODEL_METADATA_QUERY = gql`
  query ModelMetadata($modelName: String!) {
    modelMetadata(modelName: $modelName)
  }
`;
var AGGREGATE_QUERY = gql`
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
var GraphqlService = class _GraphqlService {
  apollo;
  // ========================= PROPERTIES =========================
  cache = /* @__PURE__ */ new Map();
  DEFAULT_TTL = 5 * 60 * 1e3;
  // 5 minutes
  AGGRESSIVE_TTL = 30 * 60 * 1e3;
  // 30 minutes for findAll
  MAX_CACHE_SIZE = 999999;
  CLEANUP_INTERVAL = 60 * 1e3;
  // 1 minute
  REQUEST_TIMEOUT = 3e4;
  // 30 seconds
  MAX_RETRIES = 3;
  DEFAULT_BATCH_SIZE = 999999;
  MAX_PARALLEL_REQUESTS = 5;
  // Performance monitoring
  performanceMetrics = signal([]);
  cacheHitRate = computed(() => {
    const metrics = this.performanceMetrics();
    if (metrics.length === 0)
      return 0;
    const hits = metrics.filter((m) => m.cacheHit).length;
    return hits / metrics.length * 100;
  });
  // Error tracking
  errors = signal([]);
  isHealthy = signal(true);
  // Loading states
  loadingStates = /* @__PURE__ */ new Map();
  constructor(apollo) {
    this.apollo = apollo;
    this.initializeCacheCleanup();
    this.performHealthCheck();
  }
  // ========================= CACHE MANAGEMENT =========================
  initializeCacheCleanup() {
    setInterval(() => {
      this.cleanupExpiredCache();
    }, this.CLEANUP_INTERVAL);
  }
  cleanupExpiredCache() {
    const now = /* @__PURE__ */ new Date();
    const expiredKeys = [];
    this.cache.forEach((entry, key) => {
      if (now.getTime() - entry.timestamp.getTime() > entry.ttl) {
        expiredKeys.push(key);
      }
    });
    expiredKeys.forEach((key) => this.cache.delete(key));
    if (this.cache.size > this.MAX_CACHE_SIZE) {
      const sortedEntries = Array.from(this.cache.entries()).sort((a, b) => a[1].timestamp.getTime() - b[1].timestamp.getTime());
      const toRemove = this.cache.size - this.MAX_CACHE_SIZE;
      for (let i = 0; i < toRemove; i++) {
        this.cache.delete(sortedEntries[i][0]);
      }
    }
  }
  generateCacheKey(operation, variables) {
    return `${operation}_${JSON.stringify(variables)}`;
  }
  getFromCache(key) {
    const entry = this.cache.get(key);
    if (!entry)
      return null;
    const now = /* @__PURE__ */ new Date();
    if (now.getTime() - entry.timestamp.getTime() > entry.ttl) {
      this.cache.delete(key);
      return null;
    }
    return entry.data;
  }
  setCache(key, data, ttl = this.DEFAULT_TTL) {
    this.cache.set(key, {
      data,
      timestamp: /* @__PURE__ */ new Date(),
      ttl,
      key
    });
  }
  invalidateCache(pattern) {
    if (!pattern) {
      this.cache.clear();
      return;
    }
    const keysToDelete = [];
    this.cache.forEach((_, key) => {
      if (key.includes(pattern)) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach((key) => this.cache.delete(key));
  }
  // ========================= PERFORMANCE MONITORING =========================
  trackPerformance(queryType, startTime, cacheHit, resultCount, modelName) {
    const metrics = {
      queryTime: Date.now() - startTime,
      cacheHit,
      resultCount,
      timestamp: /* @__PURE__ */ new Date(),
      queryType,
      modelName
    };
    const currentMetrics = this.performanceMetrics();
    this.performanceMetrics.set([...currentMetrics.slice(-99), metrics]);
  }
  trackError(error, operation) {
    const graphqlError = {
      message: error.message || "Unknown error",
      code: error.code || error.extensions?.code,
      path: error.path,
      timestamp: /* @__PURE__ */ new Date()
    };
    const currentErrors = this.errors();
    this.errors.set([...currentErrors.slice(-49), graphqlError]);
  }
  // ========================= LOADING STATE MANAGEMENT =========================
  setLoading(key, loading) {
    this.loadingStates.set(key, loading);
  }
  // ========================= HEALTH CHECK =========================
  performHealthCheck() {
    return __async(this, null, function* () {
    });
  }
  // ========================= CORE QUERY METHODS =========================
  findMany(_0) {
    return __async(this, arguments, function* (modelName, options = {}) {
      const startTime = Date.now();
      const cacheKey = this.generateCacheKey("findMany", __spreadValues({ modelName }, options));
      const loadingKey = `findMany_${modelName}`;
      const cachedData = this.getFromCache(cacheKey);
      if (cachedData) {
        this.trackPerformance("findMany", startTime, true, cachedData.length, modelName);
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
        const result = yield firstValueFrom(this.apollo.query({
          query: FIND_MANY_QUERY,
          variables,
          fetchPolicy: "cache-first"
        }));
        const data = result.data.findMany;
        this.setCache(cacheKey, data);
        this.trackPerformance("findMany", startTime, false, data.length, modelName);
        return data;
      } catch (error) {
        this.trackError(error, "findMany");
        throw error;
      } finally {
        this.setLoading(loadingKey, false);
      }
    });
  }
  findUnique(_0, _1) {
    return __async(this, arguments, function* (modelName, where, options = {}) {
      const startTime = Date.now();
      const cacheKey = this.generateCacheKey("findUnique", __spreadValues({ modelName, where }, options));
      const loadingKey = `findUnique_${modelName}`;
      const cachedData = this.getFromCache(cacheKey);
      if (cachedData) {
        this.trackPerformance("findUnique", startTime, true, 1, modelName);
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
        const result = yield firstValueFrom(this.apollo.query({
          query: FIND_UNIQUE_QUERY,
          variables,
          fetchPolicy: "cache-first"
        }));
        const data = result.data.findUnique;
        this.setCache(cacheKey, data);
        this.trackPerformance("findUnique", startTime, false, data ? 1 : 0, modelName);
        return data;
      } catch (error) {
        this.trackError(error, "findUnique");
        throw error;
      } finally {
        this.setLoading(loadingKey, false);
      }
    });
  }
  findFirst(_0) {
    return __async(this, arguments, function* (modelName, options = {}) {
      const startTime = Date.now();
      const cacheKey = this.generateCacheKey("findFirst", __spreadValues({ modelName }, options));
      const loadingKey = `findFirst_${modelName}`;
      const cachedData = this.getFromCache(cacheKey);
      if (cachedData) {
        this.trackPerformance("findFirst", startTime, true, 1, modelName);
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
        const result = yield firstValueFrom(this.apollo.query({
          query: FIND_FIRST_QUERY,
          variables,
          fetchPolicy: "cache-first"
        }));
        const data = result.data.findFirst;
        this.setCache(cacheKey, data);
        this.trackPerformance("findFirst", startTime, false, data ? 1 : 0, modelName);
        return data;
      } catch (error) {
        this.trackError(error, "findFirst");
        throw error;
      } finally {
        this.setLoading(loadingKey, false);
      }
    });
  }
  // ========================= MUTATION METHODS =========================
  createOne(_0, _1) {
    return __async(this, arguments, function* (modelName, data, options = {}) {
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
        const result = yield firstValueFrom(this.apollo.mutate({
          mutation: CREATE_ONE_MUTATION,
          variables
        }));
        const createdData = result.data.createOne;
        this.invalidateCache(modelName);
        this.trackPerformance("createOne", startTime, false, 1, modelName);
        return createdData;
      } catch (error) {
        this.trackError(error, "createOne");
        throw error;
      } finally {
        this.setLoading(loadingKey, false);
      }
    });
  }
  updateOne(_0, _1, _2) {
    return __async(this, arguments, function* (modelName, where, data, options = {}) {
      const startTime = Date.now();
      const loadingKey = `updateOne_${modelName}`;
      this.setLoading(loadingKey, true);
      const variables = {
        modelName,
        where,
        data,
        include: options.include,
        select: options.select
      };
      try {
        const result = yield firstValueFrom(this.apollo.mutate({
          mutation: UPDATE_ONE_MUTATION,
          variables
        }));
        const updatedData = result.data.updateRecord;
        this.invalidateCache(modelName);
        this.trackPerformance("updateOne", startTime, false, 1, modelName);
        return updatedData;
      } catch (error) {
        this.trackError(error, "updateOne");
        throw error;
      } finally {
        this.setLoading(loadingKey, false);
      }
    });
  }
  deleteOne(modelName, where) {
    return __async(this, null, function* () {
      const startTime = Date.now();
      const loadingKey = `deleteOne_${modelName}`;
      this.setLoading(loadingKey, true);
      const variables = {
        modelName,
        where
      };
      try {
        const result = yield firstValueFrom(this.apollo.mutate({
          mutation: DELETE_ONE_MUTATION,
          variables
        }));
        const deletedData = result.data.deleteOne;
        this.invalidateCache(modelName);
        this.trackPerformance("deleteOne", startTime, false, 1, modelName);
        return deletedData;
      } catch (error) {
        this.trackError(error, "deleteOne");
        throw error;
      } finally {
        this.setLoading(loadingKey, false);
      }
    });
  }
  // ========================= BATCH OPERATIONS =========================
  batchCreate(modelName, data) {
    return __async(this, null, function* () {
      const startTime = Date.now();
      const loadingKey = `batchCreate_${modelName}`;
      this.setLoading(loadingKey, true);
      const variables = {
        modelName,
        data
      };
      try {
        const result = yield firstValueFrom(this.apollo.mutate({
          mutation: BATCH_CREATE_MUTATION,
          variables
        }));
        const createdData = result.data.batchCreate;
        this.invalidateCache(modelName);
        this.trackPerformance("batchCreate", startTime, false, createdData.length, modelName);
        return createdData;
      } catch (error) {
        this.trackError(error, "batchCreate");
        throw error;
      } finally {
        this.setLoading(loadingKey, false);
      }
    });
  }
  batchUpdate(modelName, operations) {
    return __async(this, null, function* () {
      const startTime = Date.now();
      const loadingKey = `batchUpdate_${modelName}`;
      this.setLoading(loadingKey, true);
      const variables = {
        modelName,
        operations
      };
      try {
        const result = yield firstValueFrom(this.apollo.mutate({
          mutation: BATCH_UPDATE_MUTATION,
          variables
        }));
        const updatedData = result.data.batchUpdate;
        this.invalidateCache(modelName);
        this.trackPerformance("batchUpdate", startTime, false, updatedData.length, modelName);
        return updatedData;
      } catch (error) {
        this.trackError(error, "batchUpdate");
        throw error;
      } finally {
        this.setLoading(loadingKey, false);
      }
    });
  }
  batchDelete(modelName, ids) {
    return __async(this, null, function* () {
      const startTime = Date.now();
      const loadingKey = `batchDelete_${modelName}`;
      this.setLoading(loadingKey, true);
      const variables = {
        modelName,
        ids
      };
      try {
        const result = yield firstValueFrom(this.apollo.mutate({
          mutation: BATCH_DELETE_MUTATION,
          variables
        }));
        const deletedData = result.data.batchDelete;
        this.invalidateCache(modelName);
        this.trackPerformance("batchDelete", startTime, false, deletedData.length, modelName);
        return deletedData;
      } catch (error) {
        this.trackError(error, "batchDelete");
        throw error;
      } finally {
        this.setLoading(loadingKey, false);
      }
    });
  }
  // ========================= AGGREGATE OPERATIONS =========================
  aggregate(modelName, aggregations, where) {
    return __async(this, null, function* () {
      const startTime = Date.now();
      const loadingKey = `aggregate_${modelName}`;
      const cacheKey = this.generateCacheKey("aggregate", { modelName, aggregations, where });
      const cachedData = this.getFromCache(cacheKey);
      if (cachedData) {
        this.trackPerformance("aggregate", startTime, true, 1, modelName);
        return cachedData;
      }
      this.setLoading(loadingKey, true);
      const variables = {
        modelName,
        aggregations,
        where
      };
      try {
        const result = yield firstValueFrom(this.apollo.query({
          query: AGGREGATE_QUERY,
          variables,
          fetchPolicy: "cache-first"
        }));
        const aggregateResult = result.data.aggregate;
        this.setCache(cacheKey, aggregateResult, this.DEFAULT_TTL);
        this.trackPerformance("aggregate", startTime, false, 1, modelName);
        return aggregateResult;
      } catch (error) {
        this.trackError(error, "aggregate");
        throw error;
      } finally {
        this.setLoading(loadingKey, false);
      }
    });
  }
  // ========================= UTILITY METHODS =========================
  getAvailableModels() {
    return __async(this, null, function* () {
      const startTime = Date.now();
      const cacheKey = "getAvailableModels";
      const cachedData = this.getFromCache(cacheKey);
      if (cachedData) {
        this.trackPerformance("getAvailableModels", startTime, true, cachedData.length);
        return cachedData;
      }
      try {
        const result = yield firstValueFrom(this.apollo.query({
          query: GET_AVAILABLE_MODELS_QUERY,
          fetchPolicy: "cache-first"
        }));
        const data = result.data.getAvailableModels;
        this.setCache(cacheKey, data, this.DEFAULT_TTL * 12);
        this.trackPerformance("getAvailableModels", startTime, false, data.length);
        return data;
      } catch (error) {
        this.trackError(error, "getAvailableModels");
        throw error;
      }
    });
  }
  getModelMetadata(modelName) {
    return __async(this, null, function* () {
      const startTime = Date.now();
      const cacheKey = this.generateCacheKey("modelMetadata", { modelName });
      const cachedData = this.getFromCache(cacheKey);
      if (cachedData) {
        this.trackPerformance("modelMetadata", startTime, true, 1, modelName);
        return cachedData;
      }
      try {
        const result = yield firstValueFrom(this.apollo.query({
          query: MODEL_METADATA_QUERY,
          variables: { modelName },
          fetchPolicy: "cache-first"
        }));
        const data = result.data.modelMetadata;
        this.setCache(cacheKey, data, this.DEFAULT_TTL * 6);
        this.trackPerformance("modelMetadata", startTime, false, 1, modelName);
        return data;
      } catch (error) {
        this.trackError(error, "modelMetadata");
        throw error;
      }
    });
  }
  // ========================= PAGINATION HELPER =========================
  findManyWithPagination(_0) {
    return __async(this, arguments, function* (modelName, options = {}) {
      const pageSize = options.pageSize || 10;
      const page = Math.max(1, options.page || 1);
      const skip = (page - 1) * pageSize;
      const queryOptions = __spreadProps(__spreadValues({}, options), {
        skip,
        take: pageSize
      });
      const countOptions = __spreadProps(__spreadValues({}, options), { select: { id: true } });
      delete countOptions.skip;
      delete countOptions.take;
      try {
        const countResult = yield this.findMany(modelName, countOptions);
        const totalCount = countResult.length;
        const data = yield this.findMany(modelName, queryOptions);
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
    });
  }
  // ========================= STATE GETTERS =========================
  getPerformanceMetrics() {
    return this.performanceMetrics();
  }
  getCacheHitRate() {
    return this.cacheHitRate();
  }
  getErrors() {
    return this.errors();
  }
  getHealthStatus() {
    return this.isHealthy();
  }
  isLoading(operation, modelName) {
    const key = modelName ? `${operation}_${modelName}` : operation;
    return this.loadingStates.get(key) || false;
  }
  getCacheSize() {
    return this.cache.size;
  }
  // ========================= OPTIMIZED FINDALL METHODS =========================
  /**
   * Ultra-optimized findAll method with aggressive caching, parallel fetching, and streaming
   * Best performance for loading complete datasets
   */
  findAll(_0) {
    return __async(this, arguments, function* (modelName, options = {}) {
      const startTime = Date.now();
      const _a = options, { enableParallelFetch = true, enableStreaming = true, batchSize = this.DEFAULT_BATCH_SIZE, maxConcurrency = this.MAX_PARALLEL_REQUESTS, aggressiveCache = true } = _a, queryOptions = __objRest(_a, ["enableParallelFetch", "enableStreaming", "batchSize", "maxConcurrency", "aggressiveCache"]);
      const cacheKey = this.generateCacheKey("findAll", __spreadValues({ modelName }, queryOptions));
      const ttl = aggressiveCache ? this.AGGRESSIVE_TTL : this.DEFAULT_TTL;
      const cachedData = this.getFromCache(cacheKey);
      if (cachedData && aggressiveCache) {
        return __spreadProps(__spreadValues({}, cachedData), {
          fetchTime: Date.now() - startTime,
          cacheHit: true
        });
      }
      this.setLoading(`findAll_${modelName}`, true);
      try {
        let result;
        if (enableParallelFetch) {
          result = yield this.parallelFindAll(modelName, queryOptions, batchSize, maxConcurrency);
        } else if (enableStreaming) {
          result = yield this.streamingFindAll(modelName, queryOptions, batchSize);
        } else {
          result = yield this.standardFindAll(modelName, queryOptions);
        }
        const finalResult = __spreadProps(__spreadValues({}, result), {
          fetchTime: Date.now() - startTime,
          cacheHit: false,
          parallel: enableParallelFetch
        });
        this.setCache(cacheKey, finalResult, ttl);
        this.trackPerformance("findAll", startTime, false, result.totalCount, modelName);
        return finalResult;
      } catch (error) {
        this.trackError(error, "findAll");
        throw error;
      } finally {
        this.setLoading(`findAll_${modelName}`, false);
      }
    });
  }
  /**
   * Parallel batch fetching for maximum speed
   */
  parallelFindAll(modelName, options, batchSize, maxConcurrency) {
    return __async(this, null, function* () {
      const countResult = yield this.findMany(modelName, __spreadProps(__spreadValues({}, options), {
        select: { id: true }
      }));
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
      const processBatch = (skip, take) => __async(this, null, function* () {
        return yield this.findMany(modelName, __spreadProps(__spreadValues({}, options), {
          skip,
          take
        }));
      });
      const executeInParallel = () => __async(this, null, function* () {
        const allResults = [];
        const executing = [];
        for (let i = 0; i < batches; i++) {
          const skip = i * batchSize;
          const take = Math.min(batchSize, totalCount - skip);
          const batchPromise = processBatch(skip, take).then((batchResult) => {
            allResults.push(...batchResult);
          });
          executing.push(batchPromise);
          if (executing.length >= maxConcurrency) {
            yield Promise.race(executing);
            const stillRunning = executing.filter((p) => {
              return p && typeof p.isPending !== "boolean";
            });
            executing.length = 0;
            executing.push(...stillRunning);
          }
        }
        yield Promise.all(executing);
        return allResults;
      });
      const finalResults = yield executeInParallel();
      return {
        data: finalResults,
        totalCount,
        fetchTime: 0,
        cacheHit: false,
        parallel: true,
        batches
      };
    });
  }
  /**
   * Streaming approach for memory-efficient large datasets
   */
  streamingFindAll(modelName, options, batchSize) {
    return __async(this, null, function* () {
      const results = [];
      let skip = 0;
      let totalFetched = 0;
      let hasMore = true;
      let batches = 0;
      while (hasMore) {
        const batchResult = yield this.findMany(modelName, __spreadProps(__spreadValues({}, options), {
          skip,
          take: batchSize
        }));
        if (batchResult.length === 0) {
          hasMore = false;
          break;
        }
        results.push(...batchResult);
        totalFetched += batchResult.length;
        skip += batchSize;
        batches++;
        if (batchResult.length < batchSize) {
          hasMore = false;
        }
        if (batches % 5 === 0) {
          yield new Promise((resolve) => setTimeout(resolve, 0));
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
    });
  }
  /**
   * Standard single-request approach
   */
  standardFindAll(modelName, options) {
    return __async(this, null, function* () {
      const data = yield this.findMany(modelName, options);
      return {
        data,
        totalCount: data.length,
        fetchTime: 0,
        cacheHit: false,
        parallel: false
      };
    });
  }
  /**
   * Multi-model parallel findAll - fetch multiple models simultaneously
   */
  findAllMultiple(_0) {
    return __async(this, arguments, function* (models, globalOptions = {}) {
      const startTime = Date.now();
      const results = {};
      const promises = models.map((_02) => __async(this, [_02], function* ({ name, options = {} }) {
        const mergedOptions = __spreadValues(__spreadValues({}, globalOptions), options);
        const result = yield this.findAll(name, mergedOptions);
        return { name, result };
      }));
      try {
        const resolvedResults = yield Promise.all(promises);
        resolvedResults.forEach(({ name, result }) => {
          results[name] = result;
        });
        const totalRecords = Object.values(results).reduce((sum, result) => sum + result.totalCount, 0);
        this.trackPerformance("findAllMultiple", startTime, false, totalRecords, "multiple");
        return results;
      } catch (error) {
        this.trackError(error, "findAllMultiple");
        throw error;
      }
    });
  }
  /**
   * Smart findAll with automatic optimization selection
   */
  smartFindAll(_0) {
    return __async(this, arguments, function* (modelName, options = {}) {
      const metadata = yield this.getModelMetadata(modelName);
      const estimatedSize = metadata?.estimatedRecordCount || 1e3;
      const hasComplexRelations = metadata?.hasComplexRelations || false;
      const optimizedOptions = __spreadProps(__spreadValues({}, options), {
        enableParallelFetch: estimatedSize > 5e3,
        enableStreaming: estimatedSize > 1e4,
        batchSize: hasComplexRelations ? 500 : 2e3,
        maxConcurrency: hasComplexRelations ? 3 : 5,
        aggressiveCache: estimatedSize < 5e4
        // Only cache smaller datasets aggressively
      });
      return yield this.findAll(modelName, optimizedOptions);
    });
  }
  // ========================= CACHE CONTROL =========================
  clearCache(pattern) {
    this.invalidateCache(pattern);
  }
  refreshHealthCheck() {
    return __async(this, null, function* () {
      yield this.performHealthCheck();
    });
  }
  // ========================= PERFORMANCE TESTING =========================
  /**
   * Performance benchmark for findAll methods
   */
  benchmarkFindAll(_0) {
    return __async(this, arguments, function* (modelName, testCases = []) {
      const defaultTestCases = [
        { enableParallelFetch: false, enableStreaming: false },
        // Standard
        { enableParallelFetch: true, enableStreaming: false, batchSize: 500 },
        // Parallel small
        { enableParallelFetch: true, enableStreaming: false, batchSize: 2e3 },
        // Parallel large
        { enableParallelFetch: false, enableStreaming: true, batchSize: 1e3 },
        // Streaming
        { enableParallelFetch: true, enableStreaming: false, aggressiveCache: true }
        // Smart cached
      ];
      const testConfigs = testCases.length > 0 ? testCases : defaultTestCases;
      const results = [];
      this.clearCache(modelName);
      for (const config of testConfigs) {
        console.log(`\u{1F9EA} Testing configuration:`, config);
        const startTime = Date.now();
        const result = yield this.findAll(modelName, config);
        const totalTime = Date.now() - startTime;
        const performance = {
          totalTime,
          recordsPerSecond: Math.round(result.totalCount / (totalTime / 1e3)),
          cacheEfficiency: result.cacheHit ? 100 : 0
        };
        results.push({
          config,
          result,
          performance
        });
        console.log(`\u2705 Completed: ${totalTime}ms, ${performance.recordsPerSecond} records/sec`);
        yield new Promise((resolve) => setTimeout(resolve, 100));
      }
      const bestResult = results.reduce((best, current) => current.performance.recordsPerSecond > best.performance.recordsPerSecond ? current : best);
      return {
        results,
        recommendation: bestResult.config
      };
    });
  }
  // ========================= MODEL-SPECIFIC OPTIMIZED METHODS =========================
  // ========================= ULTRA-FAST FINDALL METHODS =========================
  /**
   * Ultra-fast tonKho findAll with inventory-specific optimizations
   */
  findAllTonKho() {
    return __async(this, arguments, function* (options = {}) {
      return yield this.findAll("tonkho", __spreadValues({
        batchSize: 2e3,
        // Large batches for simple inventory data
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
        }
      }, options));
    });
  }
  /**
   * Ultra-fast sanpham findAll with product-specific optimizations
   */
  findAllSanpham() {
    return __async(this, arguments, function* (options = {}) {
      return yield this.smartFindAll("sanpham", __spreadValues({
        select: {
          id: true,
          ten: true,
          gia: true,
          mota: true,
          active: true,
          createdAt: true
        },
        orderBy: { ten: "asc" },
        aggressiveCache: true
      }, options));
    });
  }
  /**
   * Ultra-fast khachhang findAll with customer-specific optimizations
   */
  findAllKhachhang() {
    return __async(this, arguments, function* (options = {}) {
      return yield this.smartFindAll("khachhang", __spreadValues({
        select: {
          id: true,
          ten: true,
          email: true,
          sdt: true,
          diachi: true,
          active: true
        },
        orderBy: { ten: "asc" },
        batchSize: 1e3,
        enableParallelFetch: true
      }, options));
    });
  }
  /**
   * Ultra-fast donhang findAll with optimized relations
   */
  findAllDonhang() {
    return __async(this, arguments, function* (options = {}) {
      return yield this.findAll("donhang", __spreadValues({
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
        orderBy: { createdAt: "desc" },
        batchSize: 500,
        // Smaller batches due to complex relations
        maxConcurrency: 3
      }, options));
    });
  }
  /**
   * Comprehensive dashboard data loader - loads all essential data in parallel
   */
  loadDashboardData() {
    return __async(this, arguments, function* (options = {}) {
      const startTime = Date.now();
      const [sanpham, khachhang, tonkho, donhang] = yield Promise.all([
        this.findAllSanpham(__spreadValues({
          take: 9999,
          // Limit for dashboard
          aggressiveCache: true
        }, options)),
        this.findAllKhachhang(__spreadValues({
          take: 9999,
          aggressiveCache: true
        }, options)),
        this.findAllTonKho(__spreadValues({
          take: 9999,
          aggressiveCache: true
        }, options)),
        this.findAllDonhang(__spreadValues({
          take: 9999,
          aggressiveCache: true
        }, options))
      ]);
      return {
        sanpham,
        khachhang,
        tonkho,
        donhang,
        totalLoadTime: Date.now() - startTime
      };
    });
  }
  // ========================= LEGACY OPTIMIZED METHODS (ENHANCED) =========================
  // Sanpham methods
  getSanphamList() {
    return __async(this, arguments, function* (options = {}) {
      return yield this.findMany("sanpham", __spreadValues({
        orderBy: { ten: "asc" }
      }, options));
    });
  }
  getSanphamById(id) {
    return __async(this, null, function* () {
      return yield this.findUnique("sanpham", { id });
    });
  }
  getFirstSanpham() {
    return __async(this, arguments, function* (options = {}) {
      return yield this.findFirst("sanpham", __spreadValues({
        orderBy: { createdAt: "desc" }
      }, options));
    });
  }
  // Khachhang methods
  getKhachhangList() {
    return __async(this, arguments, function* (options = {}) {
      return yield this.findMany("khachhang", __spreadValues({
        orderBy: { ten: "asc" }
      }, options));
    });
  }
  getKhachhangById(id) {
    return __async(this, null, function* () {
      return yield this.findUnique("khachhang", { id });
    });
  }
  getFirstKhachhang() {
    return __async(this, arguments, function* (options = {}) {
      return yield this.findFirst("khachhang", __spreadValues({
        orderBy: { createdAt: "desc" }
      }, options));
    });
  }
  // Donhang methods
  getDonhangList() {
    return __async(this, arguments, function* (options = {}) {
      return yield this.findMany("donhang", __spreadValues({
        orderBy: { createdAt: "desc" }
      }, options));
    });
  }
  getDonhangById(id) {
    return __async(this, null, function* () {
      return yield this.findUnique("donhang", { id });
    });
  }
  getFirstDonhang() {
    return __async(this, arguments, function* (options = {}) {
      return yield this.findFirst("donhang", __spreadValues({
        orderBy: { createdAt: "desc" }
      }, options));
    });
  }
  // Nhomkhachhang methods
  getNhomkhachhangList() {
    return __async(this, arguments, function* (options = {}) {
      return yield this.findMany("nhomkhachhang", __spreadValues({
        orderBy: { ten: "asc" }
      }, options));
    });
  }
  getNhomkhachhangById(id) {
    return __async(this, null, function* () {
      return yield this.findUnique("nhomkhachhang", { id });
    });
  }
  getFirstNhomkhachhang() {
    return __async(this, arguments, function* (options = {}) {
      return yield this.findFirst("nhomkhachhang", __spreadValues({
        orderBy: { createdAt: "desc" }
      }, options));
    });
  }
  // Dathang methods
  getDathangList() {
    return __async(this, arguments, function* (options = {}) {
      return yield this.findMany("dathang", __spreadValues({
        orderBy: { createdAt: "desc" },
        include: {
          nhacungcap: true,
          dathangsanpham: {
            include: {
              sanpham: true
            }
          }
        }
      }, options));
    });
  }
  // User methods
  getUserList() {
    return __async(this, arguments, function* (options = {}) {
      return yield this.findMany("user", __spreadValues({
        orderBy: { ten: "asc" },
        select: {
          id: true,
          ten: true,
          email: true,
          sdt: true,
          createdAt: true,
          updatedAt: true
        }
      }, options));
    });
  }
  getUserById(id) {
    return __async(this, null, function* () {
      return yield this.findUnique("user", { id }, {
        include: {
          profile: true,
          userRole: {
            include: {
              role: true
            }
          }
        }
      });
    });
  }
  static \u0275fac = function GraphqlService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GraphqlService)(\u0275\u0275inject(Apollo));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GraphqlService, factory: _GraphqlService.\u0275fac, providedIn: "root" });
};

export {
  GraphqlService
};
//# sourceMappingURL=chunk-Y4MVQOE5.js.map
