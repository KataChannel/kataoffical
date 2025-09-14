import { SetMetadata } from '@nestjs/common';

// Smart cache decorator that includes both caching and invalidation
export const SmartCache = (options: {
  get?: { ttl?: number; keyPrefix?: string };
  invalidate?: string[];
  updateCache?: boolean; // Auto update cache with new data
}) => {
  return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    // Apply cache metadata for GET operations
    if (options.get) {
      SetMetadata('cache', options.get)(target, propertyName, descriptor);
    }
    
    // Apply cache invalidation patterns
    if (options.invalidate) {
      SetMetadata('cacheInvalidate', options.invalidate)(target, propertyName, descriptor);
    }
    
    // Apply smart update flag
    SetMetadata('smartCacheUpdate', options.updateCache || false)(target, propertyName, descriptor);
  };
};