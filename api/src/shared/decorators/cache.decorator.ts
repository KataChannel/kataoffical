import { SetMetadata } from '@nestjs/common';

export const CACHE_KEY = 'cache_key';
export const CACHE_TTL = 'cache_ttl';
export const CACHE_PREFIX = 'cache_prefix';

export const Cacheable = (prefix: string, ttl?: number) => {
  return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    SetMetadata(CACHE_PREFIX, prefix)(target, propertyName, descriptor);
    if (ttl) {
      SetMetadata(CACHE_TTL, ttl)(target, propertyName, descriptor);
    }
  };
};