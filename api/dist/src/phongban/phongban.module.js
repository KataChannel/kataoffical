"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhongbanModule = void 0;
const common_1 = require("@nestjs/common");
const phongban_service_1 = require("./phongban.service");
const phongban_controller_1 = require("./phongban.controller");
const phongban_resolver_1 = require("./phongban.resolver");
const prisma_module_1 = require("../../prisma/prisma.module");
const auth_module_1 = require("../auth/auth.module");
let PhongbanModule = class PhongbanModule {
};
exports.PhongbanModule = PhongbanModule;
exports.PhongbanModule = PhongbanModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, auth_module_1.AuthModule],
        controllers: [phongban_controller_1.PhongbanController],
        providers: [phongban_service_1.PhongbanService, phongban_resolver_1.PhongbanResolver],
        exports: [phongban_service_1.PhongbanService]
    })
], PhongbanModule);
//# sourceMappingURL=phongban.module.js.map