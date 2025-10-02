"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const support_service_1 = require("./support.service");
const support_resolver_1 = require("./support.resolver");
const support_upload_controller_1 = require("./support-upload.controller");
const prisma_service_1 = require("../../prisma/prisma.service");
const auth_module_1 = require("../auth/auth.module");
let SupportModule = class SupportModule {
};
exports.SupportModule = SupportModule;
exports.SupportModule = SupportModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                dest: './uploads',
            }),
            auth_module_1.AuthModule,
        ],
        controllers: [support_upload_controller_1.SupportUploadController],
        providers: [support_resolver_1.SupportResolver, support_service_1.SupportService, prisma_service_1.PrismaService],
        exports: [support_service_1.SupportService],
    })
], SupportModule);
//# sourceMappingURL=support.module.js.map