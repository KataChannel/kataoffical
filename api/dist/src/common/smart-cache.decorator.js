"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartCache = void 0;
const common_1 = require("@nestjs/common");
const SmartCache = (options) => {
    return (target, propertyName, descriptor) => {
        if (options.get) {
            (0, common_1.SetMetadata)('cache', options.get)(target, propertyName, descriptor);
        }
        if (options.invalidate) {
            (0, common_1.SetMetadata)('cacheInvalidate', options.invalidate)(target, propertyName, descriptor);
        }
        (0, common_1.SetMetadata)('smartCacheUpdate', options.updateCache || false)(target, propertyName, descriptor);
    };
};
exports.SmartCache = SmartCache;
//# sourceMappingURL=smart-cache.decorator.js.map