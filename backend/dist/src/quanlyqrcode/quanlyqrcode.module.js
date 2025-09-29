"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuanlyqrcodeModule = void 0;
const common_1 = require("@nestjs/common");
const quanlyqrcode_service_1 = require("./quanlyqrcode.service");
const quanlyqrcode_controller_1 = require("./quanlyqrcode.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
const errorlog_module_1 = require("../errorlog/errorlog.module");
let QuanlyqrcodeModule = class QuanlyqrcodeModule {
};
exports.QuanlyqrcodeModule = QuanlyqrcodeModule;
exports.QuanlyqrcodeModule = QuanlyqrcodeModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, errorlog_module_1.ErrorlogModule],
        controllers: [quanlyqrcode_controller_1.QuanlyqrcodeController],
        providers: [quanlyqrcode_service_1.QuanlyqrcodeService],
        exports: [quanlyqrcode_service_1.QuanlyqrcodeService]
    })
], QuanlyqrcodeModule);
//# sourceMappingURL=quanlyqrcode.module.js.map