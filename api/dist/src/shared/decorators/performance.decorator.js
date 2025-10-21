"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogPerformance = LogPerformance;
exports.LogClassPerformance = LogClassPerformance;
const performance_logger_1 = require("../performance-logger");
function LogPerformance(operationName) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        const name = operationName || `${target.constructor.name}.${propertyKey}`;
        if (originalMethod.constructor.name === 'AsyncFunction') {
            descriptor.value = async function (...args) {
                return performance_logger_1.PerformanceLogger.logAsync(name, async () => {
                    return originalMethod.apply(this, args);
                }, { args: args.length > 0 ? args[0] : undefined });
            };
        }
        else {
            descriptor.value = function (...args) {
                return performance_logger_1.PerformanceLogger.logSync(name, () => {
                    return originalMethod.apply(this, args);
                }, { args: args.length > 0 ? args[0] : undefined });
            };
        }
        return descriptor;
    };
}
function LogClassPerformance(prefix) {
    return function (constructor) {
        const methods = Object.getOwnPropertyNames(constructor.prototype);
        methods.forEach(methodName => {
            if (methodName !== 'constructor') {
                const originalMethod = constructor.prototype[methodName];
                if (typeof originalMethod === 'function' && originalMethod.constructor.name === 'AsyncFunction') {
                    const name = prefix ? `${prefix}_${methodName}` : `${constructor.name}.${methodName}`;
                    constructor.prototype[methodName] = async function (...args) {
                        return performance_logger_1.PerformanceLogger.logAsync(name, async () => {
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
//# sourceMappingURL=performance.decorator.js.map