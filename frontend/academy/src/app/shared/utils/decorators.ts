export function memoize() {
    return function (
        _target: any,
        _propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;
        const cache = new Map();

        descriptor.value = function (...args: any[]) {
            const key = JSON.stringify(args);
            if (cache.has(key)) {
                return cache.get(key);
            }
            const result = originalMethod.apply(this, args);
            cache.set(key, result);
            return result;
        };

        return descriptor;
    };
}

export function Debounce(delay: number = 300) {
    return function (
        _target: any,
        _propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;
        let timeoutId: any;

        descriptor.value = function (...args: any[]) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                originalMethod.apply(this, args);
            }, delay);
        };

        return descriptor;
    };
}