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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let EmailService = class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });
    }
    async sendPasswordResetEmail(to, resetToken, userName) {
        const resetUrl = `${process.env.BASE_URL}/reset-password-ctv?token=${resetToken}`;
        const mailOptions = {
            from: `"${process.env.APP_NAME || 'CTV System'}" <${process.env.GMAIL_USER}>`,
            to,
            subject: 'Đặt lại mật khẩu tài khoản CTV',
            html: this.generatePasswordResetTemplate(resetUrl, userName, resetToken),
        };
        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Password reset email sent to ${to}`);
        }
        catch (error) {
            console.error('Error sending password reset email:', error);
            throw new Error('Không thể gửi email. Vui lòng thử lại sau.');
        }
    }
    generatePasswordResetTemplate(resetUrl, userName, resetToken) {
        return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Đặt lại mật khẩu</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #2563eb;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background-color: #f8f9fa;
            padding: 30px;
            border-radius: 0 0 8px 8px;
          }
          .button {
            display: inline-block;
            background-color: #2563eb;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: bold;
          }
          .button:hover {
            background-color: #1d4ed8;
          }
          .warning {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 10px;
            margin: 15px 0;
          }
          .footer {
            text-align: center;
            color: #6b7280;
            font-size: 12px;
            margin-top: 20px;
          }
          .token-info {
            background-color: #e5e7eb;
            padding: 10px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 12px;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🔐 Đặt lại mật khẩu</h1>
        </div>
        <div class="content">
          <h2>Xin chào ${userName || 'CTV'}!</h2>
          
          <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản CTV của bạn.</p>
          
          <p>Để đặt lại mật khẩu, vui lòng nhấp vào nút bên dưới:</p>
          
          <div style="text-align: center;">
            <a href="${resetUrl}" class="button">Đặt lại mật khẩu</a>
          </div>
          
          <p>Hoặc bạn có thể copy và paste đường link sau vào trình duyệt:</p>
          <div class="token-info">
            ${resetUrl}
          </div>
          
          <div class="warning">
            <strong>⚠️ Lưu ý quan trọng:</strong>
            <ul>
              <li>Link này chỉ có hiệu lực trong <strong>15 phút</strong></li>
              <li>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này</li>
              <li>Để bảo mật, không chia sẻ link này với ai khác</li>
            </ul>
          </div>
          
          <p>Nếu nút không hoạt động, bạn có thể sử dụng mã token sau:</p>
          <div class="token-info">
            <strong>Token:</strong> ${resetToken}
          </div>
          
          <p>Nếu bạn gặp vấn đề gì, vui lòng liên hệ với chúng tôi để được hỗ trợ.</p>
          
          <p>Trân trọng,<br>
          <strong>Đội ngũ hỗ trợ CTV</strong></p>
        </div>
        
        <div class="footer">
          <p>Email này được gửi tự động. Vui lòng không trả lời email này.</p>
          <p>&copy; 2025 CTV System. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;
    }
    async sendWelcomeEmail(to, userName, tempPassword) {
        const mailOptions = {
            from: `"${process.env.APP_NAME || 'CTV System'}" <${process.env.GMAIL_USER}>`,
            to,
            subject: 'Chào mừng bạn đến với hệ thống CTV',
            html: this.generateWelcomeTemplate(userName, tempPassword),
        };
        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Welcome email sent to ${to}`);
        }
        catch (error) {
            console.error('Error sending welcome email:', error);
        }
    }
    generateWelcomeTemplate(userName, tempPassword) {
        return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Chào mừng đến với CTV System</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #10b981;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background-color: #f8f9fa;
            padding: 30px;
            border-radius: 0 0 8px 8px;
          }
          .button {
            display: inline-block;
            background-color: #10b981;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: bold;
          }
          .credentials {
            background-color: #e5e7eb;
            padding: 15px;
            border-radius: 4px;
            margin: 15px 0;
          }
          .footer {
            text-align: center;
            color: #6b7280;
            font-size: 12px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎉 Chào mừng đến với CTV System!</h1>
        </div>
        <div class="content">
          <h2>Xin chào ${userName}!</h2>
          
          <p>Chúc mừng bạn đã đăng ký thành công tài khoản CTV. Chúng tôi rất vui được chào đón bạn!</p>
          
          ${tempPassword ? `
          <div class="credentials">
            <h3>Thông tin đăng nhập:</h3>
            <p><strong>Mật khẩu tạm thời:</strong> ${tempPassword}</p>
            <p><em>Vui lòng đổi mật khẩu sau khi đăng nhập lần đầu.</em></p>
          </div>
          ` : ''}
          
          <div style="text-align: center;">
            <a href="${process.env.BASE_URL}/loginctv" class="button">Đăng nhập ngay</a>
          </div>
          
          <p>Với tài khoản CTV, bạn có thể:</p>
          <ul>
            <li>Quản lý liên kết affiliate của mình</li>
            <li>Theo dõi doanh thu và hoa hồng</li>
            <li>Truy cập tài nguyên marketing</li>
            <li>Xem báo cáo chi tiết</li>
          </ul>
          
          <p>Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi.</p>
          
          <p>Chúc bạn thành công!<br>
          <strong>Đội ngũ CTV System</strong></p>
        </div>
        
        <div class="footer">
          <p>Email này được gửi tự động. Vui lòng không trả lời email này.</p>
          <p>&copy; 2025 CTV System. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map