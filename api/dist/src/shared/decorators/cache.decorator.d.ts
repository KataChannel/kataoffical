export declare const CACHE_KEY = "cache_key";
export declare const CACHE_TTL = "cache_ttl";
export declare const CACHE_PREFIX = "cache_prefix";
export declare const Cacheable: (prefix: string, ttl?: number) => (target: any, propertyName: string, descriptor: PropertyDescriptor) => void;
