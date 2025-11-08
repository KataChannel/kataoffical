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
exports.SharedModule = void 0;
const common_1 = require("@nestjs/common");
const performance_controller_1 = require("./controllers/performance.controller");
const performance_log_service_1 = require("./services/performance-log.service");
const performance_logger_1 = require("./performance-logger");
const prisma_module_1 = require("../../prisma/prisma.module");
let SharedModule = class SharedModule {
    constructor(performanceLogService) {
        this.performanceLogService = performanceLogService;
    }
    onModuleInit() {
        performance_logger_1.PerformanceLogger.setPerformanceLogService(this.performanceLogService);
    }
};
exports.SharedModule = SharedModule;
exports.SharedModule = SharedModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [performance_controller_1.PerformanceController],
        providers: [performance_log_service_1.PerformanceLogService],
        exports: [performance_log_service_1.PerformanceLogService],
    }),
    __metadata("design:paramtypes", [performance_log_service_1.PerformanceLogService])
], SharedModule);
//# sourceMappingURL=shared.module.js.map