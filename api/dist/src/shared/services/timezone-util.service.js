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
const moment = require("moment");
let TimezoneUtilService = class TimezoneUtilService {
    toUTC(date) {
        if (!date)
            return '';
        if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return moment(date, 'YYYY-MM-DD').utc().toISOString();
        }
        return moment(date).utc().toISOString();
    }
    fromUTC(utcDate, format = 'YYYY-MM-DD') {
        if (!utcDate)
            return '';
        return moment.utc(utcDate).local().format(format);
    }
    nowUTC() {
        return moment().utc().toISOString();
    }
    validateAndConvertToUTC(dateInput) {
        if (!dateInput)
            return null;
        try {
            if (typeof dateInput === 'string' && dateInput.includes('T') && dateInput.includes('Z')) {
                const parsed = moment.utc(dateInput);
                return parsed.isValid() ? parsed.toISOString() : null;
            }
            if (typeof dateInput === 'string' && dateInput.match(/^\d{4}-\d{2}-\d{2}$/)) {
                const parsed = moment(dateInput, 'YYYY-MM-DD');
                return parsed.isValid() ? parsed.utc().toISOString() : null;
            }
            const parsed = moment(dateInput);
            return parsed.isValid() ? parsed.utc().toISOString() : null;
        }
        catch (error) {
            console.error('Date validation error:', error);
            return null;
        }
    }
    normalizeeDateRange(startDate, endDate) {
        const result = {};
        if (startDate) {
            const startUTC = this.validateAndConvertToUTC(startDate);
            if (startUTC) {
                result.startUTC = startUTC;
            }
        }
        if (endDate) {
            const endUTC = this.validateAndConvertToUTC(endDate);
            if (endUTC) {
                result.endUTC = moment.utc(endUTC).endOf('day').toISOString();
            }
        }
        return result;
    }
    normalizeDateFields(data, dateFields) {
        if (!data || typeof data !== 'object')
            return data;
        const normalizedData = { ...data };
        dateFields.forEach(field => {
            if (normalizedData[field]) {
                const utcDate = this.validateAndConvertToUTC(normalizedData[field]);
                if (utcDate) {
                    normalizedData[field] = utcDate;
                }
                else {
                    normalizedData[field] = null;
                }
            }
        });
        return normalizedData;
    }
    createDateRangeWhere(fieldName, startDate, endDate) {
        const dateRange = this.normalizeeDateRange(startDate, endDate);
        const where = {};
        if (dateRange.startUTC || dateRange.endUTC) {
            where[fieldName] = {};
            if (dateRange.startUTC) {
                where[fieldName].gte = new Date(dateRange.startUTC);
            }
            if (dateRange.endUTC) {
                where[fieldName].lte = new Date(dateRange.endUTC);
            }
        }
        return where;
    }
    formatForResponse(utcDate, format) {
        if (!utcDate)
            return '';
        if (format) {
            return moment.utc(utcDate).local().format(format);
        }
        return moment.utc(utcDate).local().toISOString();
    }
    isSameDay(date1, date2) {
        if (!date1 || !date2)
            return false;
        return moment.utc(date1).format('YYYY-MM-DD') === moment.utc(date2).format('YYYY-MM-DD');
    }
    getDayBounds(date) {
        const utcDate = this.validateAndConvertToUTC(date);
        if (!utcDate) {
            const now = moment().utc();
            return {
                startOfDay: now.startOf('day').toISOString(),
                endOfDay: now.endOf('day').toISOString()
            };
        }
        const momentDate = moment.utc(utcDate);
        return {
            startOfDay: momentDate.startOf('day').toISOString(),
            endOfDay: momentDate.endOf('day').toISOString()
        };
    }
};
exports.TimezoneUtilService = TimezoneUtilService;
exports.TimezoneUtilService = TimezoneUtilService = __decorate([
    (0, common_1.Injectable)()
], TimezoneUtilService);
//# sourceMappingURL=timezone-util.service.js.map