export declare const SmartCache: (options: {
    get?: {
        ttl?: number;
        keyPrefix?: string;
    };
    invalidate?: string[];
    updateCache?: boolean;
}) => (target: any, propertyName: string, descriptor: PropertyDescriptor) => void;
