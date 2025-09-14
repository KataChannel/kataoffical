import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['error', 'warn'],
    });
  }

  async onModuleInit() {
    await this.$connect();
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