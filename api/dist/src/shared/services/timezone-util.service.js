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
                const [year, month, day] = date.split('-').map(Number);
                d = new Date(year, month - 1, day, 0, 0, 0, 0);
                console.log(`🔄 Backend parsing YYYY-MM-DD: ${date} -> Local: ${d} -> UTC: ${d.toISOString()}`);
            }
            else if (date.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                const [day, month, year] = date.split('/').map(Number);
                d = new Date(year, month - 1, day, 0, 0, 0, 0);
                console.log(`🔄 Backend parsing DD/MM/YYYY: ${date} -> Local: ${d} -> UTC: ${d.toISOString()}`);
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
        const utcResult = d.toISOString();
        console.log(`✅ Backend UTC conversion: ${date} -> ${utcResult}`);
        return utcResult;
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
        console.log(`🔄 Backend synchronizing ${fieldName}: ${value} (type: ${typeof value})`);
        try {
            if (['ngaygiao', 'ngaynhan'].includes(fieldName)) {
                let result;
                if (typeof value === 'string') {
                    if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
                        const [year, month, day] = value.split('-').map(Number);
                        result = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
                        console.log(`🔧 Backend YYYY-MM-DD: ${value} -> UTC Date: ${result.toISOString()}`);
                    }
                    else if (value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                        const [day, month, year] = value.split('/').map(Number);
                        result = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
                        console.log(`🔧 Backend DD/MM/YYYY: ${value} -> UTC Date: ${result.toISOString()}`);
                    }
                    else if (value.includes('T') || value.includes('Z')) {
                        result = new Date(value);
                        console.log(`🔧 Backend ISO string: ${value} -> UTC Date: ${result.toISOString()}`);
                    }
                    else {
                        result = new Date(this.toUTC(value));
                    }
                }
                else if (value instanceof Date) {
                    result = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate(), 0, 0, 0, 0));
                    console.log(`🔧 Backend Date object: ${value} -> UTC Date: ${result.toISOString()}`);
                }
                else {
                    result = new Date(this.toUTC(value));
                }
                console.log(`✅ Backend synchronized ${fieldName}: ${result.toISOString()}`);
                return result;
            }
            return new Date(this.toUTC(value));
        }
        catch (error) {
            console.error(`❌ Backend error synchronizing ${fieldName}:`, error);
            throw new Error(`Failed to synchronize date field ${fieldName}: ${error instanceof Error ? error.message : String(error)}`);
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