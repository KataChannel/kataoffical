"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KhotaskModule = void 0;
const common_1 = require("@nestjs/common");
const khotask_service_1 = require("./khotask.service");
const khotask_resolver_1 = require("./khotask.resolver");
const prisma_module_1 = require("../../prisma/prisma.module");
const auth_module_1 = require("../auth/auth.module");
let KhotaskModule = class KhotaskModule {
};
exports.KhotaskModule = KhotaskModule;
exports.KhotaskModule = KhotaskModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, auth_module_1.AuthModule],
        providers: [khotask_service_1.KhotaskService, khotask_resolver_1.KhotaskResolver],
        exports: [khotask_service_1.KhotaskService]
    })
], KhotaskModule);
//# sourceMappingURL=khotask.module.js.map