"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimezoneUtilService = void 0;
const common_1 = require("@nestjs/common");
let TimezoneUtilService = class TimezoneUtilService {
    toUTC(date) {
        if (!date)
            return new Date().toISOString();
        const d = new Date(date);
        if (isNaN(d.getTime())) {
            throw new Error('Invalid date provided');
        }
        return d.toISOString();
    }
    fromUTC(utcDate, timezone = 'Asia/Ho_Chi_Minh') {
        const date = new Date(utcDate);
        return new Date(date.toLocaleString('en-US', { timeZone: timezone }));
    }
    nowUTC() {
        return new Date().toISOString();
    }
    normalizeDateFields(data, dateFields = ['createdAt', 'updatedAt', 'ngaygiao', 'ngaynhan', 'ngaytao']) {
        if (!data || typeof data !== 'object')
            return data;
        const normalized = { ...data };
        dateFields.forEach(field => {
            if (normalized[field]) {
                try {
                    normalized[field] = this.toUTC(normalized[field]);
                }
                catch (error) {
                    console.warn(`Warning: Could not normalize date field ${field}:`, error);
                }
            }
        });
        return normalized;
    }
    convertDateFilters(filters) {
        if (!filters || typeof filters !== 'object')
            return filters;
        const converted = { ...filters };
        Object.keys(converted).forEach(key => {
            const value = converted[key];
            if (value && typeof value === 'object') {
                if (value.gte) {
                    const startDate = new Date(value.gte);
                    startDate.setHours(0, 0, 0, 0);
                    value.gte = this.toUTC(startDate);
                }
                if (value.lte) {
                    const endDate = new Date(value.lte);
                    endDate.setHours(23, 59, 59, 999);
                    value.lte = this.toUTC(endDate);
                }
                if (value.gt)
                    value.gt = this.toUTC(value.gt);
                if (value.lt)
                    value.lt = this.toUTC(value.lt);
                if (value.equals)
                    value.equals = this.toUTC(value.equals);
            }
            else if (this.isDateField(key) && value) {
                converted[key] = this.toUTC(value);
            }
        });
        return converted;
    }
    formatDateForFilename() {
        const now = new Date();
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();
        return `${day}${month}${year}`;
    }
    formatDateUnderscored() {
        const now = new Date();
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();
        return `${day}_${month}_${year}`;
    }
    getStartOfDay(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return this.toUTC(d);
    }
    getEndOfDay(date) {
        const d = new Date(date);
        d.setHours(23, 59, 59, 999);
        return this.toUTC(d);
    }
    validateAndConvertToUTC(date) {
        if (!date)
            return null;
        try {
            return this.toUTC(date);
        }
        catch (error) {
            console.warn('Date validation error:', error);
            return null;
        }
    }
    isDateField(fieldName) {
        const dateFields = ['createdAt', 'updatedAt', 'ngaygiao', 'ngaynhan', 'ngaytao', 'date', 'time', 'datetime'];
        return dateFields.some(field => fieldName.toLowerCase().includes(field.toLowerCase()));
    }
};
exports.TimezoneUtilService = TimezoneUtilService;
exports.TimezoneUtilService = TimezoneUtilService = __decorate([
    (0, common_1.Injectable)()
], TimezoneUtilService);
//# sourceMappingURL=timezone-util.service.js.map