"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserguideModule = void 0;
const common_1 = require("@nestjs/common");
const userguide_service_1 = require("./userguide.service");
const userguide_controller_1 = require("./userguide.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
const socket_gateway_1 = require("./socket.gateway");
const errorlogs_module_1 = require("../errorlogs/errorlogs.module");
const auth_module_1 = require("../auth/auth.module");
let UserguideModule = class UserguideModule {
};
exports.UserguideModule = UserguideModule;
exports.UserguideModule = UserguideModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, prisma_module_1.PrismaModule, errorlogs_module_1.ErrorlogsModule],
        controllers: [userguide_controller_1.UserguideController],
        providers: [userguide_service_1.UserguideService, socket_gateway_1.SocketGateway],
        exports: [userguide_service_1.UserguideService]
    })
], UserguideModule);
//# sourceMappingURL=userguide.module.js.map