"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cacheable = exports.CACHE_PREFIX = exports.CACHE_TTL = exports.CACHE_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.CACHE_KEY = 'cache_key';
exports.CACHE_TTL = 'cache_ttl';
exports.CACHE_PREFIX = 'cache_prefix';
const Cacheable = (prefix, ttl) => {
    return (target, propertyName, descriptor) => {
        (0, common_1.SetMetadata)(exports.CACHE_PREFIX, prefix)(target, propertyName, descriptor);
        if (ttl) {
            (0, common_1.SetMetadata)(exports.CACHE_TTL, ttl)(target, propertyName, descriptor);
        }
    };
};
exports.Cacheable = Cacheable;
//# sourceMappingURL=cache.decorator.js.map