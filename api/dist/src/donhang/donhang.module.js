"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonhangModule = void 0;
const common_1 = require("@nestjs/common");
const donhang_service_1 = require("./donhang.service");
const donhang_controller_1 = require("./donhang.controller");
const donhang_cron_service_1 = require("./donhang-cron.service");
const cancel_order_service_1 = require("./cancel-order.service");
const cancel_order_controller_1 = require("./cancel-order.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
const importdata_module_1 = require("../importdata/importdata.module");
const shared_module_1 = require("../shared/shared.module");
const status_machine_service_1 = require("../common/status-machine.service");
const tonkho_manager_service_1 = require("../common/tonkho-manager.service");
const auth_module_1 = require("../auth/auth.module");
let DonhangModule = class DonhangModule {
};
exports.DonhangModule = DonhangModule;
exports.DonhangModule = DonhangModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, importdata_module_1.ImportdataModule, shared_module_1.SharedModule, auth_module_1.AuthModule],
        controllers: [donhang_controller_1.DonhangController, cancel_order_controller_1.CancelOrderController],
        providers: [
            donhang_service_1.DonhangService,
            donhang_cron_service_1.DonhangCronService,
            cancel_order_service_1.CancelOrderService,
            status_machine_service_1.StatusMachineService,
            tonkho_manager_service_1.TonkhoManagerService
        ],
        exports: [donhang_service_1.DonhangService, cancel_order_service_1.CancelOrderService]
    })
], DonhangModule);
//# sourceMappingURL=donhang.module.js.map