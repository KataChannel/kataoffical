import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DataLoaderService } from './dataloader.service';
import { FieldSelectionService } from './field-selection.service';
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
    private readonly fieldSelection: FieldSelectionService
  ) {}

  /**
   * Dynamic findMany with field selection optimization
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
    console.log(`🚀 Enhanced findMany for ${modelName}:`, {
      hasWhere: !!args.where,
      hasOrderBy: !!args.orderBy,
      skip: args.skip,
      take: args.take,
      hasCustomSelect: !!args.select,
      hasCustomInclude: !!args.include,
      hasGraphQLInfo: !!info
    });

    try {
      // Get the model
      const model = this.getModel(modelName);
      
      // Build optimized query with field selection
      const queryOptions = await this.buildOptimizedQuery(modelName, args, info);
      
      // Execute the query
      const startTime = Date.now();
      const results = await model.findMany(queryOptions);
      const queryTime = Date.now() - startTime;
      
      console.log(`✅ ${modelName} findMany completed:`, {
        resultCount: results.length,
        queryTime: `${queryTime}ms`,
        isOptimized: !!queryOptions.select || !!queryOptions.include
      });

      // Post-process with DataLoader if needed
      return await this.postProcessWithDataLoader(results, modelName, queryOptions, info);
      
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
      const model = this.getModel(modelName);
      const queryOptions = await this.buildOptimizedQuery(modelName, args, info);
      
      const startTime = Date.now();
      const result = await model.findUnique(queryOptions);
      const queryTime = Date.now() - startTime;
      
      console.log(`✅ ${modelName} findUnique completed:`, {
        found: !!result,
        queryTime: `${queryTime}ms`
      });

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
      
      // Build query options for response
      const queryOptions = await this.buildOptimizedQuery(modelName, args, info);
      const createOptions = {
        data: args.data,
        ...queryOptions
      };
      
      const startTime = Date.now();
      const result = await model.create(createOptions);
      const queryTime = Date.now() - startTime;
      
      // Clear related caches
      this.dataLoader.clearLoaderCache(modelName);
      
      console.log(`✅ ${modelName} create completed:`, {
        id: result.id,
        queryTime: `${queryTime}ms`
      });

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
      
      const queryOptions = await this.buildOptimizedQuery(modelName, args, info);
      const updateOptions = {
        where: args.where,
        data: args.data,
        ...queryOptions
      };
      
      const startTime = Date.now();
      const result = await model.update(updateOptions);
      const queryTime = Date.now() - startTime;
      
      // Clear related caches
      this.dataLoader.clearLoaderCache(modelName);
      
      console.log(`✅ ${modelName} update completed:`, {
        id: result.id,
        queryTime: `${queryTime}ms`
      });

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
      
      console.log(`✅ ${modelName} delete completed:`, {
        id: result.id,
        queryTime: `${queryTime}ms`
      });

      return result;
      
    } catch (error) {
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
    'dathang': 'dathang',
    'dathangsanpham': 'dathangsanpham',
    'congty': 'congty',
    'kho': 'kho',
    'sanphamkho': 'sanphamKho',
    'phieukho': 'phieuKho',
    'phieukhosanpham': 'phieuKhoSanpham',
    'tonkho': 'tonKho', // ✅ FIX: tonKho -> tonKho (correct Prisma client property)
    'chotkho': 'chotkho',
    'auditlog': 'auditLog',
    'filemanager': 'fileManager',
    'chataimessage': 'chatAIMessage',
    'chataihistory': 'chatAIHistory',
    'file': 'file',
    'errorlog': 'errorLog',
    'userguidblock': 'userguidBlock',
    'userguidstep': 'userguidStep',
    'importhistory': 'importHistory'
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
    
    console.log(`✅ Model resolved: ${modelName} -> ${prismaProperty}`);
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
}
