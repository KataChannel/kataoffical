"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallbackController = void 0;
const common_1 = require("@nestjs/common");
const callback_service_1 = require("./callback.service");
const callback_data_input_dto_1 = require("./dto/callback-data-input.dto");
let CallbackController = class CallbackController {
    constructor(callbackService) {
        this.callbackService = callbackService;
    }
    async callBackData(param) {
        return this.callbackService.processCallback(param);
    }
};
exports.CallbackController = CallbackController;
__decorate([
    (0, common_1.Post)('call_back_data_demo'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [callback_data_input_dto_1.CallbackDataInput]),
    __metadata("design:returntype", Promise)
], CallbackController.prototype, "callBackData", null);
exports.CallbackController = CallbackController = __decorate([
    (0, common_1.Controller)('actopensupport'),
    __metadata("design:paramtypes", [callback_service_1.CallbackService])
], CallbackController);
//# sourceMappingURL=callback.controller.js.map