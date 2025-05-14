"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoadonModule = void 0;
const common_1 = require("@nestjs/common");
const hoadon_service_1 = require("./hoadon.service");
const hoadon_controller_1 = require("./hoadon.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
const socket_gateway_1 = require("./socket.gateway");
const errorlog_module_1 = require("../errorlog/errorlog.module");
let HoadonModule = class HoadonModule {
};
exports.HoadonModule = HoadonModule;
exports.HoadonModule = HoadonModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, errorlog_module_1.ErrorlogModule],
        controllers: [hoadon_controller_1.HoadonController],
        providers: [hoadon_service_1.HoadonService, socket_gateway_1.SocketGateway],
        exports: [hoadon_service_1.HoadonService]
    })
], HoadonModule);
//# sourceMappingURL=hoadon.module.js.map