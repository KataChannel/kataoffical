"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallbackService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const callback_data_output_dto_1 = require("./dto/callback-data-output.dto");
const callback_data_type_enum_1 = require("./enums/callback-data-type.enum");
let CallbackService = class CallbackService {
    constructor() {
        this.appId = '2d4b6324-04aa-4dbc-a85c-815fb0099057';
    }
    async processCallback(param) {
        const result = new callback_data_output_dto_1.CallbackDataOutput();
        try {
            const signature = this.generateSHA256HMAC(param.data || '', this.appId);
            if (signature !== param.signature) {
                result.Success = false;
                result.ErrorCode = 'InvalidParam';
                result.ErrorMessage = 'Signature invalid';
                return result;
            }
            this.doCallBackData(param).catch((err) => console.error('Error processing callback:', err));
        }
        catch (ex) {
            result.Success = false;
            result.ErrorCode = 'Exception';
            result.ErrorMessage = ex.message;
        }
        return result;
    }
    async doCallBackData(param) {
        if (!param)
            return;
        this.saveCallBack(param);
        switch (param.data_type) {
            case callback_data_type_enum_1.CallBackDataType.SaveVoucher:
            case callback_data_type_enum_1.CallBackDataType.DeleteVoucher:
                const data = param.data
                    ? JSON.parse(param.data)
                    : [];
                if (data && data.length > 0) {
                    for (const item of data) {
                        console.log(`Processing org_refid: ${item.org_refid}`);
                    }
                }
                break;
            default:
                break;
        }
        this.deleteCallBack(param);
    }
    saveCallBack(param) {
        console.log('Saving callback:', param);
    }
    deleteCallBack(param) {
        console.log('Deleting callback:', param);
    }
    generateSHA256HMAC(input, key) {
        input = input || '';
        const hmac = (0, crypto_1.createHmac)('sha256', key);
        hmac.update(input);
        return hmac.digest('hex').toLowerCase();
    }
};
exports.CallbackService = CallbackService;
exports.CallbackService = CallbackService = __decorate([
    (0, common_1.Injectable)()
], CallbackService);
//# sourceMappingURL=callback.service.js.map