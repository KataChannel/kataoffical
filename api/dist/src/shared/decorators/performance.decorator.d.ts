export declare function LogPerformance(operationName?: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare function LogClassPerformance(prefix?: string): <T extends {
    new (...args: any[]): {};
}>(constructor: T) => T;
