import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DataLoaderService } from './dataloader.service';
import { FieldSelectionService } from './field-selection.service';
import { RedisService } from '../redis/redis.service';
import { GraphQLResolveInfo } from 'graphql';

/**
 * Enhanced Universal Service with dynamic field selection, DataLoader optimization,
 * and intelligent query building for maximum performance
 */
@Injectable()
export class EnhancedUniversalService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dataLoader: DataLoaderService,
    private readonly fieldSelection: FieldSelectionService,
    private readonly redisService: RedisService,
  ) {}

  // ✅ Helper methods để thay thế TimezoneUtilService (vì frontend gửi UTC)
  private synchronizeDateField(fieldName: string, value: any): Date | null {
    if (!value) return null;
    
    // console.log(`🔄 GraphQL synchronizing ${fieldName}: ${value} (type: ${typeof value})`);
    
    try {
      // Frontend đã gửi UTC, chỉ cần parse trực tiếp
      return new Date(value);
    } catch (error) {
      // console.error(`❌ GraphQL error synchronizing ${fieldName}:`, error);
      return null;
    }
  }

  private toUTC(value: any): string | null {
    if (!value) return null;
    
    try {
      // Frontend đã gửi UTC, chỉ cần parse trực tiếp
      return new Date(value).toISOString();
    } catch (error) {
      console.error('GraphQL toUTC error:', error);
      return null;
    }
  }

  private validateAndConvertToUTC(value: any): string | null {
    return this.toUTC(value);
  }

  /**
   * Dynamic findMany with Redis caching and field selection optimization
   */
  async findMany(
    modelName: string,
    args: {
      where?: any;
      orderBy?: any;
      skip?: number;
      take?: number;
      include?: any;
      select?: any;
    },
    info?: GraphQLResolveInfo
  ) {
    try {
      // Generate cache key for this query
      const cacheKey = this.generateCacheKey('findMany', modelName, args);
      
      // Try to get from cache first for read operations
      if (!this.isWriteOperation(args)) {
        const cachedResult = await this.redisService.read(cacheKey);
        if (cachedResult) {
          console.log(`🔥 Cache hit for ${modelName} findMany`);
          return cachedResult;
        }
      }

      // Get the model
      const model = this.getModel(modelName);
      
      // Chuẩn hóa date filters trong where conditions
      const normalizedWhere = this.normalizeDateFilters(modelName, args.where);
      const normalizedArgs = { ...args, where: normalizedWhere };
      
      // Build optimized query with field selection
      const queryOptions = await this.buildOptimizedQuery(modelName, normalizedArgs, info);
      
      // Execute the query
      const startTime = Date.now();
      const results = await model.findMany(queryOptions);
      const queryTime = Date.now() - startTime;
      
      console.log(`✅ ${modelName} findMany completed:`, {
        resultCount: results.length,
        queryTime: `${queryTime}ms`,
        isOptimized: !!queryOptions.select || !!queryOptions.include,
        cached: false
      });

      // Post-process with DataLoader if needed
      const processedResults = await this.postProcessWithDataLoader(results, modelName, queryOptions, info);
      
      // Cache the result for read operations
      if (!this.isWriteOperation(args) && processedResults) {
        const ttl = this.getCacheTTL(modelName);
        await this.redisService.create(cacheKey, processedResults, ttl);
        console.log(`💾 Cached ${modelName} findMany for ${ttl}s`);
      }
      
      return processedResults;
      
    } catch (error) {
      console.error(`❌ Enhanced findMany error for ${modelName}:`, error);
      throw new Error(`Failed to query ${modelName}: ${error.message}`);
    }
  }

  /**
   * Dynamic findUnique with field selection optimization
   */
  async findUnique(
    modelName: string,
    args: {
      where: any;
      include?: any;
      select?: any;
    },
    info?: GraphQLResolveInfo
  ) {
    console.log(`🎯 Enhanced findUnique for ${modelName}:`, {
      whereFields: Object.keys(args.where || {}),
      hasCustomSelect: !!args.select,
      hasCustomInclude: !!args.include
    });

    try {
      // ⚡ Check Redis cache first
      const cacheKey = this.generateCacheKey('findUnique', modelName, args);
      const cachedResult = await this.redisService.read(cacheKey);
      
      if (cachedResult) {
        console.log(`🎯 GraphQL cache hit for findUnique ${modelName}`);
        return cachedResult;
      }

      const model = this.getModel(modelName);
      
      // Chuẩn hóa date filters trong where
      const normalizedWhere = this.normalizeDateFilters(modelName, args.where);
      const normalizedArgs = { ...args, where: normalizedWhere };
      
      const queryOptions = await this.buildOptimizedQuery(modelName, normalizedArgs, info);
      
      const startTime = Date.now();
      const result = await model.findUnique(queryOptions);
      const queryTime = Date.now() - startTime;

      // 💾 Cache successful results  
      if (result) {
        const ttl = this.getCacheTTL(modelName);
        await this.redisService.create(cacheKey, result, ttl);
        console.log(`💾 GraphQL cached findUnique ${modelName} for ${ttl}s`);
      }
      
      // console.log(`✅ ${modelName} findUnique completed:`, {
      //   found: !!result,
      //   queryTime: `${queryTime}ms`
      // });

      return result;
      
    } catch (error) {
      console.error(`❌ Enhanced findUnique error for ${modelName}:`, error);
      throw new Error(`Failed to find ${modelName}: ${error.message}`);
    }
  }

  /**
   * Dynamic create with optimized response
   */
  async create(
    modelName: string,
    args: {
      data: any;
      include?: any;
      select?: any;
    },
    info?: GraphQLResolveInfo
  ) {
    console.log(`➕ Enhanced create for ${modelName}:`, {
      hasData: !!args.data,
      dataFields: Object.keys(args.data || {}),
    });

    try {
      const model = this.getModel(modelName);
      
      // Chuẩn hóa date fields trong data
      const normalizedData = this.normalizeDateFieldsForModel(modelName, args.data);
      
      // Handle model-specific relation fields
      const finalData = this.normalizeRelationFieldsForModel(modelName, normalizedData);
      
      // Build query options for response
      const queryOptions = await this.buildOptimizedQuery(modelName, args, info);
      const createOptions = {
        data: finalData,
        ...queryOptions
      };
      
      const startTime = Date.now();
      console.log('createOptions', createOptions);
      
      const result = await model.create(createOptions);
      const queryTime = Date.now() - startTime;
      
      // Clear related caches
      this.dataLoader.clearLoaderCache(modelName);
      
      // console.log(`✅ ${modelName} create completed:`, {
      //   id: result.id,
      //   queryTime: `${queryTime}ms`
      // });

      return result;
      
    } catch (error) {
      console.error(`❌ Enhanced create error for ${modelName}:`, error);
      throw new Error(`Failed to create ${modelName}: ${error.message}`);
    }
  }

  /**
   * Dynamic update with optimized response
   */
  async update(
    modelName: string,
    args: {
      where: any;
      data: any;
      include?: any;
      select?: any;
    },
    info?: GraphQLResolveInfo
  ) {
    console.log(`✏️ Enhanced update for ${modelName}:`, {
      whereFields: Object.keys(args.where || {}),
      dataFields: Object.keys(args.data || {}),
    });

    try {
      const model = this.getModel(modelName);
      
      // Clean data to prevent complex relation errors
      let cleanedData = { ...args.data };
      
      // Define fields that should be excluded from updates because they are complex relations
      const excludeFromUpdates = [
        'roles', 'permissions', 'profile', 'userRoles', 'rolePermissions',
        'user', 'role', 'permission', 'khachhang', 'nhomkhachhang'
      ];
      
      // Remove complex relation fields that cause Prisma errors
      excludeFromUpdates.forEach(field => {
        if (cleanedData[field]) {
          // Check if it's an array of objects with nested relations
          if (Array.isArray(cleanedData[field])) {
            console.log(`🚫 Enhanced service removing complex relation array field '${field}' from update data`);
            delete cleanedData[field];
          }
          // Check if it's a nested object with complex structure
          else if (typeof cleanedData[field] === 'object' && cleanedData[field] !== null) {
            const nestedKeys = Object.keys(cleanedData[field]);
            const hasComplexNesting = nestedKeys.some(key => 
              typeof cleanedData[field][key] === 'object' && cleanedData[field][key] !== null
            );
            if (hasComplexNesting) {
              console.log(`🚫 Enhanced service removing complex nested relation field '${field}' from update data`);
              delete cleanedData[field];
            }
          }
        }
      });
      
      // Chuẩn hóa date fields trong data
      const normalizedData = this.normalizeDateFieldsForModel(modelName, cleanedData);
      // Chuẩn hóa date filters trong where
      const normalizedWhere = this.normalizeDateFilters(modelName, args.where);
      
      const queryOptions = await this.buildOptimizedQuery(modelName, args, info);
      const updateOptions = {
        where: normalizedWhere,
        data: normalizedData,
        ...queryOptions
      };
      
      const startTime = Date.now();
      const result = await model.update(updateOptions);
      const queryTime = Date.now() - startTime;
      
      // Clear related caches
      this.dataLoader.clearLoaderCache(modelName);
      
      // console.log(`✅ ${modelName} update completed:`, {
      //   id: result.id,
      //   queryTime: `${queryTime}ms`
      // });

      return result;
      
    } catch (error) {
      console.error(`❌ Enhanced update error for ${modelName}:`, error);
      throw new Error(`Failed to update ${modelName}: ${error.message}`);
    }
  }

  /**
   * Dynamic delete
   */
  async delete(
    modelName: string,
    args: {
      where: any;
    }
  ) {
    console.log(`🗑️ Enhanced delete for ${modelName}:`, {
      whereFields: Object.keys(args.where || {}),
    });

    try {
      const model = this.getModel(modelName);
      
      const startTime = Date.now();
      const result = await model.delete({
        where: args.where
      });
      const queryTime = Date.now() - startTime;
      
      // Clear related caches
      this.dataLoader.clearLoaderCache(modelName);
      
      // console.log(`✅ ${modelName} delete completed:`, {
      //   id: result.id,
      //   queryTime: `${queryTime}ms`
      // });

      return result;
      
    } catch (error) {
      // Handle the case where the record doesn't exist
      if (error.code === 'P2025' || error.message.includes('No record was found for a delete')) {
        console.log(`✅ Delete operation handled gracefully - Record not found in ${modelName}:`, {
          where: args.where,
          message: 'Record already deleted or not found, goal achieved'
        });
        // Return a success response since the desired state is achieved (record doesn't exist)
        return { id: args.where.id || null, deleted: true, message: 'Record not found, but deletion goal achieved' };
      }
      
      console.error(`❌ Enhanced delete error for ${modelName}:`, error);
      throw new Error(`Failed to delete ${modelName}: ${error.message}`);
    }
  }

  /**
   * Build optimized query with field selection
   */
  private async buildOptimizedQuery(
    modelName: string,
    args: any,
    info?: GraphQLResolveInfo
  ): Promise<any> {
    const queryOptions: any = {};

    // Add basic query parameters
    if (args.where) queryOptions.where = args.where;
    if (args.orderBy) queryOptions.orderBy = args.orderBy;
    if (args.skip) queryOptions.skip = args.skip;
    if (args.take) queryOptions.take = args.take;

    // Handle field selection
    let fieldSelection: any = null;
    
    // Priority: Custom select/include > GraphQL field selection > Default
    if (args.select || args.include) {
      if (args.select) queryOptions.select = args.select;
      if (args.include) queryOptions.include = args.include;
    } else if (info) {
      // Extract field selection from GraphQL info
      fieldSelection = this.fieldSelection.getFieldSelection(info);
      if (fieldSelection) {
        // Optimize for specific model
        fieldSelection = this.fieldSelection.optimizeForModel(modelName, fieldSelection);
        
        if (fieldSelection.select) queryOptions.select = fieldSelection.select;
        if (fieldSelection.include) queryOptions.include = fieldSelection.include;
      }
    }

    // Log the optimization
    if (fieldSelection || args.select || args.include) {
      this.fieldSelection.logFieldSelection(modelName, queryOptions);
    }

    return queryOptions;
  }

  /**
   * Post-process results with DataLoader for relations
   */
  private async postProcessWithDataLoader(
    results: any[],
    modelName: string,
    queryOptions: any,
    info?: GraphQLResolveInfo
  ): Promise<any[]> {
    // If we already have includes or specific selects, no need for DataLoader
    if (queryOptions.include || (queryOptions.select && this.hasRelationFields(queryOptions.select))) {
      return results;
    }

    // For now, return results as-is
    // In the future, we can add intelligent DataLoader batching here
    return results;
  }

  /**
   * Check if select object contains relation fields
   */
  private hasRelationFields(select: any): boolean {
    if (!select || typeof select !== 'object') return false;
    
    return Object.values(select).some(value => 
      typeof value === 'object' && value !== null
    );
  }

  /**
   * Model name mapping for case-sensitive Prisma client access
   */
  private readonly modelMapping: { [key: string]: string } = {
    // Lowercase -> Prisma Client Property
    'user': 'user',
    'role': 'role',
    'userrole': 'userRole',
    'permission': 'permission',
    'rolepermission': 'rolePermission',
    'menu': 'menu',
    'profile': 'profile',
    'banggia': 'banggia',
    'banggiaKhachhang': 'banggiaKhachhang',
    'banggiasanpham': 'banggiasanpham',
    'khachhang': 'khachhang',
    'khachhangNhom': 'khachhangNhom',
    'nhomkhachhang': 'nhomkhachhang',
    'sanpham': 'sanpham',
    'donhang': 'donhang',
    'donhangsanpham': 'donhangsanpham',
    'nhacungcap': 'nhacungcap',
    'nhomncc': 'nhomNcc',  // ✅ FIX: Add nhomncc mapping to correct Prisma property
    'dathang': 'dathang',
    'dathangsanpham': 'dathangsanpham',
    'congty': 'congty',
    'kho': 'kho',
    'sanphamkho': 'sanphamKho',
    'phieukho': 'phieuKho',
    'phieukhosanpham': 'phieuKhoSanpham',
    'tonkho': 'tonKho', // ✅ FIX: tonKho -> tonKho (correct Prisma client property)
    'chotkho': 'chotkho',
    'chotkhodetail': 'chotkhodetail', // ✅ FIX: Add chotkhodetail mapping
    'auditlog': 'auditLog',
    'filemanager': 'fileManager',
    'chataimessage': 'chatAIMessage',
    'chataihistory': 'chatAIHistory',
    'file': 'file',
    'errorlog': 'errorLog',
    'userguidblock': 'userguidBlock',
    'userguidstep': 'userguidStep',
    'importhistory': 'importHistory',
    'congnoncc': 'congnoncc',
  };

  /**
   * Get Prisma model delegate with proper case mapping
   */
  private getModel(modelName: string) {
    const normalizedName = modelName.toLowerCase();
    const prismaProperty = this.modelMapping[normalizedName];
    
    if (!prismaProperty) {
      // Log available models for debugging
      console.error(`❌ Model mapping not found for: ${modelName}`);
      console.log('Available mappings:', Object.keys(this.modelMapping));
      throw new Error(`Model ${modelName} not found in model mapping`);
    }
    
    const model = this.prisma[prismaProperty];
    
    if (!model) {
      console.error(`❌ Prisma model not found for property: ${prismaProperty}`);
      throw new Error(`Model ${modelName} (${prismaProperty}) not found in Prisma client`);
    }
    
    // console.log(`✅ Model resolved: ${modelName} -> ${prismaProperty}`);
    return model;
  }

  /**
   * Get model metadata for optimization
   */
  async getModelMetadata(modelName: string): Promise<any> {
    try {
      const normalizedName = modelName.toLowerCase();
      const prismaProperty = this.modelMapping[normalizedName];
      
      if (!prismaProperty) {
        return {
          name: modelName,
          available: false,
          supportsOptimization: false,
          error: 'Model not found in mapping'
        };
      }
      
      const isAvailable = !!this.prisma[prismaProperty];
      
      return {
        name: modelName,
        prismaProperty,
        available: isAvailable,
        supportsOptimization: isAvailable,
        normalizedName
      };
    } catch (error) {
      console.error(`❌ Failed to get metadata for ${modelName}:`, error);
      return {
        name: modelName,
        available: false,
        supportsOptimization: false,
        error: error.message
      };
    }
  }

  /**
   * Get all available models from mapping
   */
  getAvailableModels(): string[] {
    return Object.keys(this.modelMapping).filter(modelName => {
      const prismaProperty = this.modelMapping[modelName];
      return !!this.prisma[prismaProperty];
    });
  }

  /**
   * Batch operations for better performance
   */
  async batchOperation(
    modelName: string,
    operation: 'create' | 'update' | 'delete',
    items: any[]
  ): Promise<any> {
    console.log(`📦 Batch ${operation} for ${modelName}:`, items.length, 'items');

    try {
      const model = this.getModel(modelName);
      
      switch (operation) {
        case 'create':
          return await model.createMany({
            data: items,
            skipDuplicates: true
          });
          
        case 'update':
          // For updates, we need to process individually or use transaction
          const updatePromises = items.map(item => 
            model.update({
              where: { id: item.id },
              data: item.data
            })
          );
          return await Promise.all(updatePromises);
          
        case 'delete':
          const ids = items.map(item => item.id || item);
          return await model.deleteMany({
            where: {
              id: {
                in: ids
              }
            }
          });
          
        default:
          throw new Error(`Unsupported batch operation: ${operation}`);
      }
    } catch (error) {
      console.error(`❌ Batch ${operation} error for ${modelName}:`, error);
      throw error;
    } finally {
      // Clear caches after batch operations
      this.dataLoader.clearLoaderCache(modelName);
    }
  }

  /**
   * Chuẩn hóa date fields trong data trước khi lưu database
   * @param modelName Tên model
   * @param data Data cần chuẩn hóa
   * @returns Data với date fields đã được chuyển sang UTC
   */
  /**
   * Enhanced date field normalization for specific models with precise synchronization
   */
  private normalizeDateFieldsForModel(modelName: string, data: any): any {
    if (!data || typeof data !== 'object') return data;

    console.log(`🔄 Normalizing date fields for ${modelName}:`, Object.keys(data));

    // Define date fields cho từng model với ưu tiên cao cho ngaygiao, ngaynhan
    const dateFieldsMap: Record<string, string[]> = {
      donhang: ['ngaynhan', 'ngaygiao', 'createdAt', 'updatedAt'],
      dathang: ['ngaynhan', 'ngaygiao', 'createdAt', 'updatedAt'], 
      tonkho: ['ngaynhan', 'createdAt', 'updatedAt'],
      phieukho: ['ngaynhan', 'ngaygiao', 'createdAt', 'updatedAt'],
      phieugiaohang: ['ngaynhan', 'ngaygiao', 'createdAt', 'updatedAt'],
      auditlog: ['createdAt', 'updatedAt'],
      chotkho: ['ngay', 'createdAt', 'updatedAt'],
      // Thêm các model khác nếu cần
    };

    const dateFields = dateFieldsMap[modelName.toLowerCase()] || ['createdAt', 'updatedAt'];
    const normalizedData = { ...data };
    
    // Enhanced synchronization for each date field
    dateFields.forEach(field => {
      if (normalizedData[field] !== undefined && normalizedData[field] !== null) {
        try {
          // Use enhanced synchronization for critical fields
          if (['ngaygiao', 'ngaynhan'].includes(field)) {
            normalizedData[field] = this.synchronizeDateField(field, normalizedData[field]);
          } else {
            // Standard normalization for other fields
            const utcValue = this.toUTC(normalizedData[field]);
            normalizedData[field] = utcValue ? new Date(utcValue) : null;
          }
        } catch (error) {
          console.error(`❌ Error normalizing ${field} for ${modelName}:`, error);
          throw new Error(`Failed to normalize ${field}: ${error.message}`);
        }
      }
    });

    // console.log(`✅ Date normalization completed for ${modelName}`);
    return normalizedData;
  }

  /**
   * Xử lý where conditions có chứa date filters
   * @param modelName Tên model  
   * @param where Where conditions
   * @returns Where conditions với date fields đã được chuẩn hóa
   */
  private normalizeDateFilters(modelName: string, where: any): any {
    if (!where || typeof where !== 'object') return where;

    const normalizedWhere = { ...where };
    
    // Define date fields cho từng model
    const dateFieldsMap: Record<string, string[]> = {
      donhang: ['ngaynhan', 'ngaygiao', 'createdAt', 'updatedAt'],
      dathang: ['ngaynhan', 'ngaygiao', 'createdAt', 'updatedAt'],
      tonkho: ['ngaynhan', 'createdAt', 'updatedAt'],
      phieugiaohang: ['ngaynhan', 'ngaygiao', 'createdAt', 'updatedAt'],
      auditlog: ['createdAt', 'updatedAt'],
    };

    const dateFields = dateFieldsMap[modelName.toLowerCase()] || ['createdAt', 'updatedAt'];

    dateFields.forEach(field => {
      if (normalizedWhere[field]) {
        // Xử lý date range filters (gte, lte, gt, lt)
        if (typeof normalizedWhere[field] === 'object') {
          const dateFilter = normalizedWhere[field];
          
          if (dateFilter.gte) {
            dateFilter.gte = new Date(this.validateAndConvertToUTC(dateFilter.gte) || dateFilter.gte);
          }
          if (dateFilter.lte) {
            dateFilter.lte = new Date(this.validateAndConvertToUTC(dateFilter.lte) || dateFilter.lte);
          }
          if (dateFilter.gt) {
            dateFilter.gt = new Date(this.validateAndConvertToUTC(dateFilter.gt) || dateFilter.gt);
          }
          if (dateFilter.lt) {
            dateFilter.lt = new Date(this.validateAndConvertToUTC(dateFilter.lt) || dateFilter.lt);
          }
          if (dateFilter.equals) {
            dateFilter.equals = new Date(this.validateAndConvertToUTC(dateFilter.equals) || dateFilter.equals);
          }
        } else {
          // Xử lý exact date match
          const utcDate = this.validateAndConvertToUTC(normalizedWhere[field]);
          if (utcDate) {
            normalizedWhere[field] = new Date(utcDate);
          }
        }
      }
    });

    return normalizedWhere;
  }

  /**
   * Dynamic aggregate operations for statistical calculations
   */
  async aggregate(
    modelName: string,
    aggregations: any,
    where?: any
  ): Promise<any> {
    try {
      // Get the model
      const model = this.getModel(modelName);
      
      // Normalize date filters in where conditions
      const normalizedWhere = where ? this.normalizeDateFilters(modelName, where) : undefined;
      
      // Execute aggregate query
      const startTime = Date.now();
      const result = await model.aggregate({
        ...aggregations,
        ...(normalizedWhere && { where: normalizedWhere })
      });
      const queryTime = Date.now() - startTime;
      
      console.log(`🔢 ${modelName} aggregate completed:`, {
        operations: Object.keys(aggregations),
        queryTime: `${queryTime}ms`,
        hasWhere: !!normalizedWhere
      });

      return result;
      
    } catch (error) {
      console.error(`❌ Enhanced aggregate error for ${modelName}:`, error);
      throw new Error(`Aggregate operation failed: ${error.message}`);
    }
  }

  // ✅ Redis Cache Helper Methods
  private generateCacheKey(operation: string, modelName: string, args: any): string {
    const argsHash = JSON.stringify(args);
    return this.redisService.generateKey('graphql', operation, modelName, argsHash);
  }

  private isWriteOperation(args: any): boolean {
    // Skip caching for operations that may change data frequently
    return !!(args.where?.id || args.where?.createdAt || args.where?.updatedAt);
  }

  private getCacheTTL(modelName: string): number {
    // Different cache TTL based on model type
    const cacheConfig = {
      sanpham: 1800,      // 30 minutes
      khachhang: 1800,    // 30 minutes  
      donhang: 600,       // 10 minutes
      banggia: 3600,      // 1 hour
      menu: 3600,         // 1 hour
      user: 1200,         // 20 minutes
      role: 3600,         // 1 hour
      permission: 3600,   // 1 hour
    };
    
    return cacheConfig[modelName.toLowerCase()] || 600; // Default 10 minutes
  }

  async invalidateCache(modelName: string) {
    const pattern = this.redisService.generateKey('graphql', '*', modelName, '*');
    await this.redisService.deletePattern(pattern);
    console.log(`🗑️ Invalidated GraphQL cache for ${modelName}`);
  }

  /**
   * Handle model-specific relation fields normalization
   */
  private normalizeRelationFieldsForModel(modelName: string, data: any): any {
    if (!data || typeof data !== 'object') return data;

    const normalizedData = { ...data };

    // Handle specific model relation fields
    switch (modelName.toLowerCase()) {
      case 'chotkhodetail':
        // Convert direct IDs to nested relations if needed
        if (normalizedData.chotkhoId && !normalizedData.chotkho) {
          normalizedData.chotkho = {
            connect: { id: normalizedData.chotkhoId }
          };
          delete normalizedData.chotkhoId;
        }
        if (normalizedData.sanphamId && !normalizedData.sanpham) {
          normalizedData.sanpham = {
            connect: { id: normalizedData.sanphamId }
          };
          delete normalizedData.sanphamId;
        }
        if (normalizedData.userId && !normalizedData.user) {
          normalizedData.user = {
            connect: { id: normalizedData.userId }
          };
          delete normalizedData.userId;
        }
        break;
      
      // Add more cases for other models as needed
      default:
        // No special handling needed
        break;
    }

    return normalizedData;
  }
}
