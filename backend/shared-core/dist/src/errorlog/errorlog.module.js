"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorlogModule = void 0;
const common_1 = require("@nestjs/common");
const errorlog_service_1 = require("./errorlog.service");
const errorlog_controller_1 = require("./errorlog.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
let ErrorlogModule = class ErrorlogModule {
};
exports.ErrorlogModule = ErrorlogModule;
exports.ErrorlogModule = ErrorlogModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [errorlog_controller_1.ErrorlogController],
        providers: [errorlog_service_1.ErrorlogService],
        exports: [errorlog_service_1.ErrorlogService]
    })
], ErrorlogModule);
//# sourceMappingURL=errorlog.module.js.map