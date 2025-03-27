import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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
}
