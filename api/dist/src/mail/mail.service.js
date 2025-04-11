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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const QRCode = require("qrcode");
let MailService = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendemail(data) {
        try {
            const qrcodeBuffer = await this.generateQrCode(data.qrcode);
            console.log('qrcode buffer length:', qrcodeBuffer.length);
            const result = await this.mailerService.sendMail({
                to: data.to,
                from: data.from,
                subject: data.subject ||
                    'Xác nhận đăng ký thành công sự kiện : HỘI THẢO KHOA HỌC "TÁC ĐỘNG CỦA EXOSOME LÊN KẾT QUẢ THẨM MỸ NỘI KHOA: LÝ THUYẾT VÀ THỰC TẾ LÂM SÀNG"',
                template: './welcome',
                context: {
                    name: data.name,
                },
                attachments: [
                    {
                        filename: 'qrcode.png',
                        content: qrcodeBuffer,
                        cid: 'qrcode',
                    },
                ],
            });
            console.log('Email result:', result);
            return result;
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw new Error(`Failed to send email: ${error.message}`);
        }
    }
    async generateQrCode(data) {
        try {
            const qrCodeBuffer = await QRCode.toBuffer(data, {
                type: 'png',
                width: 300,
            });
            return qrCodeBuffer;
        }
        catch (error) {
            throw new Error('Không thể tạo QR code: ' + error.message);
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
//# sourceMappingURL=mail.service.js.map