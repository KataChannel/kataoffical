import { PerformanceLogger } from '../performance-logger';

/**
 * Decorator để tự động log performance cho các method async
 */
export function LogPerformance(operationName?: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const name = operationName || `${target.constructor.name}.${propertyKey}`;

    if (originalMethod.constructor.name === 'AsyncFunction') {
      // Async method
      descriptor.value = async function (...args: any[]) {
        return PerformanceLogger.logAsync(name, async () => {
          return originalMethod.apply(this, args);
        }, { args: args.length > 0 ? args[0] : undefined });
      };
    } else {
      // Sync method
      descriptor.value = function (...args: any[]) {
        return PerformanceLogger.logSync(name, () => {
          return originalMethod.apply(this, args);
        }, { args: args.length > 0 ? args[0] : undefined });
      };
    }

    return descriptor;
  };
}

/**
 * Decorator để log performance cho cả class (tất cả method async)
 */
export function LogClassPerformance(prefix?: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    const methods = Object.getOwnPropertyNames(constructor.prototype);
    
    methods.forEach(methodName => {
      if (methodName !== 'constructor') {
        const originalMethod = constructor.prototype[methodName];
        
        if (typeof originalMethod === 'function' && originalMethod.constructor.name === 'AsyncFunction') {
          const name = prefix ? `${prefix}_${methodName}` : `${constructor.name}.${methodName}`;
          
          constructor.prototype[methodName] = async function (...args: any[]) {
            return PerformanceLogger.logAsync(name, async () => {
              return originalMethod.apply(this, args);
            }, { 
              className: constructor.name,
              methodName,
              argsCount: args.length 
            });
          };
        }
      }
    });

    return constructor;
  };
}
