import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import DataLoader from 'dataloader';

/**
 * DataLoader service for optimizing database queries with batching and caching
 * Reduces N+1 query problems by batching multiple requests into single queries
 */
@Injectable()
export class DataLoaderService {
  private loaders = new Map<string, DataLoader<any, any>>();

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get or create a DataLoader for a specific model and relation
   */
  getLoader<T>(
    modelName: string,
    relationField: string,
    keyField = 'id'
  ): DataLoader<string, T[]> {
    const loaderKey = `${modelName}_${relationField}_${keyField}`;
    
    if (!this.loaders.has(loaderKey)) {
      const loader = new DataLoader<string, T[]>(
        async (keys: readonly string[]) => {
          console.log(`🔄 DataLoader batch loading for ${loaderKey}:`, keys.length, 'items');
          
          try {
            // Get the model delegate
            const model = this.prisma[modelName.toLowerCase()];
            if (!model) {
              throw new Error(`Model ${modelName} not found`);
            }

            // Batch query for all keys
            const results = await model.findMany({
              where: {
                [keyField]: {
                  in: Array.from(keys)
                }
              },
              include: {
                [relationField]: true
              }
            });

            // Group results by key
            const groupedResults = new Map<string, T[]>();
            
            // Initialize all keys with empty arrays
            keys.forEach(key => groupedResults.set(key, []));
            
            // Group results by the key field
            results.forEach((item: any) => {
              const key = item[keyField];
              const relationData = item[relationField];
              
              if (Array.isArray(relationData)) {
                groupedResults.set(key, relationData);
              } else if (relationData) {
                groupedResults.set(key, [relationData]);
              }
            });

            // Return results in the same order as keys
            return keys.map(key => groupedResults.get(key) || []);
            
          } catch (error) {
            console.error(`❌ DataLoader error for ${loaderKey}:`, error);
            throw error;
          }
        },
        {
          // Cache results for 5 minutes
          cacheKeyFn: (key) => String(key),
          maxBatchSize: 100,
        }
      );

      this.loaders.set(loaderKey, loader);
    }

    return this.loaders.get(loaderKey)!;
  }

  /**
   * Get a single item loader for 1:1 relations
   */
  getSingleLoader<T>(
    modelName: string,
    keyField = 'id'
  ): DataLoader<string, T | null> {
    const loaderKey = `${modelName}_single_${keyField}`;
    
    if (!this.loaders.has(loaderKey)) {
      const loader = new DataLoader<string, T | null>(
        async (keys: readonly string[]) => {
          console.log(`🔄 DataLoader single batch loading for ${loaderKey}:`, keys.length, 'items');
          
          try {
            const model = this.prisma[modelName.toLowerCase()];
            if (!model) {
              throw new Error(`Model ${modelName} not found`);
            }

            const results = await model.findMany({
              where: {
                [keyField]: {
                  in: Array.from(keys)
                }
              }
            });

            // Create a map for O(1) lookup
            const resultMap = new Map<string, T>();
            results.forEach((item: any) => {
              resultMap.set(item[keyField], item);
            });

            // Return results in the same order as keys
            return keys.map(key => resultMap.get(key) || null);
            
          } catch (error) {
            console.error(`❌ DataLoader single error for ${loaderKey}:`, error);
            throw error;
          }
        },
        {
          cacheKeyFn: (key) => String(key),
          maxBatchSize: 100,
        }
      );

      this.loaders.set(loaderKey, loader);
    }

    return this.loaders.get(loaderKey)!;
  }

  /**
   * Load related data using DataLoader for optimization
   */
  async loadRelatedData<T>(
    modelName: string,
    relationField: string,
    parentId: string,
    keyField = 'id'
  ): Promise<T[]> {
    const loader = this.getLoader<T>(modelName, relationField, keyField);
    return loader.load(parentId);
  }

  /**
   * Load single related item
   */
  async loadSingleRelatedData<T>(
    modelName: string,
    id: string,
    keyField = 'id'
  ): Promise<T | null> {
    const loader = this.getSingleLoader<T>(modelName, keyField);
    return loader.load(id);
  }

  /**
   * Clear all loaders cache - useful for mutations
   */
  clearCache(): void {
    console.log('🗑️ Clearing all DataLoader caches');
    this.loaders.forEach(loader => loader.clearAll());
  }

  /**
   * Clear cache for specific loader
   */
  clearLoaderCache(modelName: string, relationField?: string, keyField = 'id'): void {
    const loaderKey = relationField 
      ? `${modelName}_${relationField}_${keyField}`
      : `${modelName}_single_${keyField}`;
    
    const loader = this.loaders.get(loaderKey);
    if (loader) {
      console.log(`🗑️ Clearing cache for ${loaderKey}`);
      loader.clearAll();
    }
  }

  /**
   * Preload data for better performance
   */
  async preloadData<T>(
    modelName: string,
    ids: string[],
    relationField?: string,
    keyField = 'id'
  ): Promise<void> {
    if (ids.length === 0) return;

    const loader = relationField 
      ? this.getLoader<T>(modelName, relationField, keyField)
      : this.getSingleLoader<T>(modelName, keyField);

    // Prime the cache with batch loading
    await Promise.all(ids.map(id => loader.load(id)));
    
    console.log(`🚀 Preloaded ${ids.length} items for ${modelName}${relationField ? `.${relationField}` : ''}`);
  }
}
