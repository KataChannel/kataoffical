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
exports.TestPerformanceController = void 0;
const common_1 = require("@nestjs/common");
const performance_logger_1 = require("../shared/performance-logger");
let TestPerformanceController = class TestPerformanceController {
    async testFastOperation() {
        return await performance_logger_1.PerformanceLogger.logAsync('Test.FastOperation', async () => {
            await new Promise(resolve => setTimeout(resolve, 100));
            return { message: 'Fast operation completed', duration: '~100ms' };
        });
    }
    async testSlowOperation() {
        return await performance_logger_1.PerformanceLogger.logAsync('Test.SlowOperation', async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            return { message: 'Slow operation completed', duration: '~2000ms' };
        });
    }
    async testErrorOperation() {
        try {
            return await performance_logger_1.PerformanceLogger.logAsync('Test.ErrorOperation', async () => {
                await new Promise(resolve => setTimeout(resolve, 500));
                throw new Error('Simulated error for testing');
            });
        }
        catch (error) {
            return { error: error.message, caught: true };
        }
    }
    async testBulkOperations() {
        const results = [];
        for (let i = 0; i < 10; i++) {
            const duration = Math.random() * 1000 + 100;
            const shouldError = Math.random() < 0.2;
            try {
                const result = await performance_logger_1.PerformanceLogger.logAsync(`Test.BulkOperation_${i}`, async () => {
                    await new Promise(resolve => setTimeout(resolve, duration));
                    if (shouldError) {
                        throw new Error(`Bulk operation ${i} failed`);
                    }
                    return { operationId: i, duration: Math.round(duration) };
                });
                results.push({ success: true, result });
            }
            catch (error) {
                results.push({ success: false, error: error.message });
            }
        }
        return {
            message: 'Bulk operations completed',
            results,
            summary: {
                total: results.length,
                successful: results.filter(r => r.success).length,
                failed: results.filter(r => !r.success).length
            }
        };
    }
};
exports.TestPerformanceController = TestPerformanceController;
__decorate([
    (0, common_1.Get)('fast'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestPerformanceController.prototype, "testFastOperation", null);
__decorate([
    (0, common_1.Get)('slow'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestPerformanceController.prototype, "testSlowOperation", null);
__decorate([
    (0, common_1.Get)('error'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestPerformanceController.prototype, "testErrorOperation", null);
__decorate([
    (0, common_1.Post)('bulk'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestPerformanceController.prototype, "testBulkOperations", null);
exports.TestPerformanceController = TestPerformanceController = __decorate([
    (0, common_1.Controller)('test-performance')
], TestPerformanceController);
//# sourceMappingURL=test-performance.controller.js.map