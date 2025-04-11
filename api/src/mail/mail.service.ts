import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as QRCode from 'qrcode';
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendemail(data: any) {
    try {
      // Tạo QR code dưới dạng Buffer
      const qrcodeBuffer = await this.generateQrCode(data.qrcode);
      console.log('qrcode buffer length:', qrcodeBuffer.length);
  
      // Gửi email
      const result = await this.mailerService.sendMail({
        to: data.to,
        from: data.from,
        subject:
          data.subject ||
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
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }


  async generateQrCode(data: string): Promise<Buffer> {
    try {
      // Tạo QR code dưới dạng buffer
      const qrCodeBuffer = await QRCode.toBuffer(data, {
        type: 'png',
        width: 300, // Kích thước phù hợp cho email
      });
      return qrCodeBuffer;
    } catch (error) {
      throw new Error('Không thể tạo QR code: ' + error.message);
    }
  }
}
