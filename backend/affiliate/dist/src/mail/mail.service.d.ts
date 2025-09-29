import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendemail(data: any): Promise<any>;
    generateQrCode(data: string): Promise<Buffer>;
}
