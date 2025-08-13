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
        let d;
        if (typeof date === 'string') {
            if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
                d = new Date(date + 'T00:00:00');
            }
            else {
                d = new Date(date);
            }
        }
        else {
            d = new Date(date);
        }
        if (isNaN(d.getTime())) {
            throw new Error(`Invalid date provided: ${date}`);
        }
        return d.toISOString();
    }
    fromUTC(utcDate, timezone = 'Asia/Ho_Chi_Minh') {
        if (!utcDate) {
            throw new Error('UTC date is required');
        }
        const date = new Date(utcDate);
        if (isNaN(date.getTime())) {
            throw new Error(`Invalid UTC date: ${utcDate}`);
        }
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
            if (normalized[field] !== undefined && normalized[field] !== null) {
                try {
                    if (['ngaygiao', 'ngaynhan'].includes(field)) {
                        console.log(`🔄 Converting ${field}: ${normalized[field]} to UTC`);
                    }
                    const utcDate = this.toUTC(normalized[field]);
                    normalized[field] = new Date(utcDate);
                    if (['ngaygiao', 'ngaynhan'].includes(field)) {
                        console.log(`✅ Converted ${field}: ${normalized[field]} (UTC)`);
                    }
                }
                catch (error) {
                    console.error(`❌ Error normalizing date field ${field}:`, error);
                    throw new Error(`Failed to normalize date field ${field}: ${error.message}`);
                }
            }
        });
        return normalized;
    }
    synchronizeDateField(fieldName, value) {
        if (!value)
            return null;
        console.log(`🔄 Synchronizing ${fieldName}: ${value}`);
        try {
            if (['ngaygiao', 'ngaynhan'].includes(fieldName)) {
                let utcDate;
                if (typeof value === 'string') {
                    if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
                        utcDate = this.toUTC(value + 'T00:00:00');
                    }
                    else if (value.includes('T') || value.includes('Z')) {
                        utcDate = this.toUTC(value);
                    }
                    else {
                        utcDate = this.toUTC(value);
                    }
                }
                else {
                    utcDate = this.toUTC(value);
                }
                const result = new Date(utcDate);
                console.log(`✅ Synchronized ${fieldName}: ${result.toISOString()}`);
                return result;
            }
            return new Date(this.toUTC(value));
        }
        catch (error) {
            console.error(`❌ Error synchronizing ${fieldName}:`, error);
            throw new Error(`Failed to synchronize date field ${fieldName}: ${error.message}`);
        }
    }
    convertDateFilters(filters) {
        if (!filters || typeof filters !== 'object')
            return filters;
        const converted = { ...filters };
        Object.keys(converted).forEach(key => {
            const value = converted[key];
            if (value && typeof value === 'object') {
                if (value.gte) {
                    value.gte = this.toUTC(value.gte);
                }
                if (value.lte) {
                    value.lte = this.toUTC(value.lte);
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