"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingPageModule = void 0;
const common_1 = require("@nestjs/common");
const landingpage_service_1 = require("./landingpage.service");
const landingpage_controller_1 = require("./landingpage.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
const socket_gateway_1 = require("../socket.gateway");
let LandingPageModule = class LandingPageModule {
};
exports.LandingPageModule = LandingPageModule;
exports.LandingPageModule = LandingPageModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [landingpage_controller_1.LandingpageController],
        providers: [landingpage_service_1.landingPageService, socket_gateway_1.SocketGateway],
        exports: [landingpage_service_1.landingPageService]
    })
], LandingPageModule);
//# sourceMappingURL=landingpage.module.js.map