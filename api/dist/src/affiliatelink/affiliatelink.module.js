"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AffiliatelinkModule = void 0;
const common_1 = require("@nestjs/common");
const affiliatelink_service_1 = require("./affiliatelink.service");
const affiliatelink_controller_1 = require("./affiliatelink.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
const socket_gateway_1 = require("../socket.gateway");
const errorlog_module_1 = require("../errorlog/errorlog.module");
const trackingevent_module_1 = require("../trackingevent/trackingevent.module");
let AffiliatelinkModule = class AffiliatelinkModule {
};
exports.AffiliatelinkModule = AffiliatelinkModule;
exports.AffiliatelinkModule = AffiliatelinkModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, errorlog_module_1.ErrorlogModule, trackingevent_module_1.TrackingeventModule],
        controllers: [affiliatelink_controller_1.AffiliatelinkController],
        providers: [affiliatelink_service_1.AffiliatelinkService, socket_gateway_1.SocketGateway],
        exports: [affiliatelink_service_1.AffiliatelinkService],
    })
], AffiliatelinkModule);
//# sourceMappingURL=affiliatelink.module.js.map