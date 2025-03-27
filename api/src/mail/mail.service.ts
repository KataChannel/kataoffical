import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendemail(data:any) {
    const result = await this.mailerService.sendMail({
      to: data.to, // Địa chỉ email người nhận
      from: data.from, // Địa chỉ email người gửi
      subject: data.subject,
      template: './welcome', // Tệp template (welcome.hbs)
      context: {name:data.name}, // Dữ liệu để truyền vào template
    });
    console.log(result);
    return result
  }
}
