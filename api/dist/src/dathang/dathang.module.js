"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DathangModule = void 0;
const common_1 = require("@nestjs/common");
const dathang_service_1 = require("./dathang.service");
const dathang_controller_1 = require("./dathang.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
const importdata_module_1 = require("../importdata/importdata.module");
const shared_module_1 = require("../shared/shared.module");
const status_machine_service_1 = require("../common/status-machine.service");
const tonkho_manager_service_1 = require("../common/tonkho-manager.service");
let DathangModule = class DathangModule {
};
exports.DathangModule = DathangModule;
exports.DathangModule = DathangModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, importdata_module_1.ImportdataModule, shared_module_1.SharedModule],
        controllers: [dathang_controller_1.DathangController],
        providers: [dathang_service_1.DathangService, status_machine_service_1.StatusMachineService, tonkho_manager_service_1.TonkhoManagerService],
        exports: [dathang_service_1.DathangService]
    })
], DathangModule);
//# sourceMappingURL=dathang.module.js.map