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
const timezone_util_service_1 = require("../services/timezone-util.service");
let DateResponseInterceptor = class DateResponseInterceptor {
    constructor(timezoneUtil) {
        this.timezoneUtil = timezoneUtil;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)(data => this.transformDatesInResponse(data)));
    }
    transformDatesInResponse(data) {
        if (!data)
            return data;
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
        const commonDateFields = [
            'createdAt', 'updatedAt', 'ngaynhan', 'ngaygiao', 'ngaytao', 'ngaycapnhat',
            'batdau', 'ketthuc', 'startDate', 'endDate', 'date', 'datetime'
        ];
        Object.keys(transformed).forEach(key => {
            const value = transformed[key];
            if (this.isDateValue(value)) {
                transformed[key] = value;
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
    __metadata("design:paramtypes", [timezone_util_service_1.TimezoneUtilService])
], DateResponseInterceptor);
//# sourceMappingURL=date-response.interceptor.js.map