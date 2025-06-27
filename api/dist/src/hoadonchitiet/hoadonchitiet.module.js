"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoadonchitietModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../prisma/prisma.module");
const auth_module_1 = require("../shared/auth/auth.module");
const socket_gateway_1 = require("../socket.gateway");
const hoadonchitiet_controller_1 = require("./hoadonchitiet.controller");
const hoadonchitiet_service_1 = require("./hoadonchitiet.service");
let HoadonchitietModule = class HoadonchitietModule {
};
exports.HoadonchitietModule = HoadonchitietModule;
exports.HoadonchitietModule = HoadonchitietModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, auth_module_1.AuthModule],
        controllers: [hoadonchitiet_controller_1.HoadonchitietController],
        providers: [hoadonchitiet_service_1.HoadonchitietService, socket_gateway_1.SocketGateway],
        exports: [hoadonchitiet_service_1.HoadonchitietService]
    })
], HoadonchitietModule);
//# sourceMappingURL=hoadonchitiet.module.js.map