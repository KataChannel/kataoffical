"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let DateResponseInterceptor = class DateResponseInterceptor {
    constructor() { }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)(data => this.transformDatesInResponse(data, context)));
    }
    transformDatesInResponse(data, context) {
        if (!data)
            return data;
        if (context) {
            const request = context.switchToHttp?.()?.getRequest?.();
            const endpoint = request?.url || 'unknown';
            if (endpoint.includes('dathang') || endpoint.includes('donhang')) {
                console.log(`📤 Enhanced date response transform for ${endpoint}`);
            }
        }
        if (Array.isArray(data)) {
            return data.map(item => this.transformDatesInObject(item));
        }
        if (typeof data === 'object') {
            return this.transformDatesInObject(data);
        }
        return data;
    }
    transformDatesInObject(obj) {
        if (!obj || typeof obj !== 'object')
            return obj;
        const transformed = { ...obj };
        const criticalDateFields = ['ngaygiao', 'ngaynhan'];
        const commonDateFields = [
            'createdAt', 'updatedAt', 'ngaytao', 'ngaycapnhat',
            'batdau', 'ketthuc', 'startDate', 'endDate', 'date', 'datetime', 'ngay'
        ];
        Object.keys(transformed).forEach(key => {
            const value = transformed[key];
            if (criticalDateFields.includes(key) && this.isDateValue(value)) {
                try {
                    const utcDate = value instanceof Date ? value.toISOString() : new Date(value).toISOString();
                    transformed[key] = new Date(utcDate).toISOString();
                    console.log(`📤 Response transform ${key}: ${value} → ${transformed[key]}`);
                }
                catch (error) {
                    console.error(`❌ Error transforming ${key}:`, error);
                    transformed[key] = value;
                }
            }
            else if (commonDateFields.includes(key) && this.isDateValue(value)) {
                transformed[key] = value instanceof Date ? value.toISOString() : value;
            }
            else if (value && typeof value === 'object') {
                transformed[key] = this.transformDatesInResponse(value);
            }
        });
        return transformed;
    }
    isDateValue(value) {
        if (!value)
            return false;
        if (value instanceof Date)
            return true;
        if (typeof value === 'string') {
            const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|[+-]\d{2}:\d{2})$/;
            return isoRegex.test(value);
        }
        return false;
    }
};
exports.DateResponseInterceptor = DateResponseInterceptor;
exports.DateResponseInterceptor = DateResponseInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DateResponseInterceptor);
//# sourceMappingURL=date-response.interceptor.js.map