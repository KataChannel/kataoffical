import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RedisService } from '../src/redis/redis.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor(private readonly redisService: RedisService) {
    super({
      log: ['error', 'warn'],
    });
  }

  async onModuleInit() {
    await this.$connect();

    // ✅ Dynamic Global Cache Invalidation
    // Instead of deprecated $use, we proxy the model delegates directly.
    // This catches ALL write operations from ANY service in the project.
    const writeActions = [
      'create', 'update', 'delete', 
      'updateMany', 'deleteMany', 'createMany', 
      'upsert'
    ];

    // Get all model names from the Prisma client
    // In NestJS, when extending PrismaClient, model properties are usually enumerable
    const propertyNames = Object.getOwnPropertyNames(this);
    const modelNames = propertyNames.filter(prop => 
      !prop.startsWith('$') && 
      !prop.startsWith('_') && 
      typeof this[prop] === 'object' && 
      this[prop] !== null &&
      // Check if it looks like a Prisma model delegate
      typeof (this[prop] as any).findMany === 'function'
    );

    this.logger.log(`🚀 [GlobalCache] Initializing auto-invalidation for ${modelNames.length} models`);

    for (const modelName of modelNames) {
      const originalModel = this[modelName];
      
      this[modelName] = new Proxy(originalModel, {
        get: (target, prop) => {
          const value = target[prop];
          
          if (typeof value === 'function' && writeActions.includes(prop as string)) {
            return async (...args: any[]) => {
              // Execute the original database operation
              const result = await value.apply(target, args);
              
              // After success, invalidate the cache
              this.logger.debug(`[GlobalCache] Action '${prop.toString()}' detected on ${modelName}, invalidating cache...`);
              this.redisService.invalidateModelCache(modelName).catch(err => 
                this.logger.error(`[GlobalCache] Invalidation fail for ${modelName}: ${err.message}`)
              );
              
              return result;
            };
          }
          
          return value;
        }
      });
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Transaction retry helper with exponential backoff
  async executeWithRetry<T>(
    operation: (prisma: PrismaService) => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: any;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation(this);
      } catch (error: any) {
        lastError = error;
        
        // Only retry on connection pool or timeout errors
        if (error.code === 'P2024' || error.code === 'P2034' || error.message?.includes('timed out')) {
          const delay = baseDelay * Math.pow(2, attempt - 1);
          console.warn(`Transaction attempt ${attempt} failed, retrying in ${delay}ms...`);
          
          if (attempt < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
        }
        
        // Don't retry other errors
        throw error;
      }
    }
    
    throw lastError;
  }

  // Optimized transaction wrapper with timeout and retry logic
  async safeTransaction<T>(
    fn: (prisma: PrismaService) => Promise<T>,
    options?: {
      timeout?: number;
      maxWait?: number;
      retries?: number;
    }
  ): Promise<T> {
    const { timeout = 30000, maxWait = 5000, retries = 2 } = options || {};
    
    return this.executeWithRetry(async (prisma) => {
      return prisma.$transaction(fn as any, {
        timeout,
        maxWait,
      });
    }, retries);
  }
}