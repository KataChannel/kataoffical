import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('sendemail')
  async sendemail(@Body() data:any) {
    await this.mailService.sendemail(data);
    return {
      "statusCode": 200,
      "message": "Gửi email thành công",
    }
  }
  @Post('preview')
  async previewEmail(@Body() data:any,@Res() res: Response) {
    // Mã QR code
    const qrCodeData = data.qrcode;
    // Tạo QR code
    const qrCode = await this.mailService.generateQrCode(qrCodeData);
      console.log('qrCode',qrCode);
      
    // Dữ liệu cho template
    const templateData = {
      name: data.name || 'Trần Mỹ Duyên',
      qrcode: qrCode, // Chuỗi base64 của QR code
    };

    // Render template
    res.render('./welcome', templateData);
  }
}
