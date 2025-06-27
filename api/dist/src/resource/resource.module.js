"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceModule = void 0;
const common_1 = require("@nestjs/common");
const resource_service_1 = require("./resource.service");
const resource_controller_1 = require("./resource.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
const minio_module_1 = require("../minio/minio.module");
const auth_module_1 = require("../shared/auth/auth.module");
const socket_gateway_1 = require("../socket.gateway");
let ResourceModule = class ResourceModule {
};
exports.ResourceModule = ResourceModule;
exports.ResourceModule = ResourceModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, minio_module_1.MinioModule, auth_module_1.AuthModule],
        controllers: [resource_controller_1.ResourceController],
        providers: [resource_service_1.ResourceService, socket_gateway_1.SocketGateway],
        exports: [resource_service_1.ResourceService]
    })
], ResourceModule);
//# sourceMappingURL=resource.module.js.map