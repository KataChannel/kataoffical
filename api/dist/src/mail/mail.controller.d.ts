import { MailService } from './mail.service';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendemail(data: any): Promise<{
        statusCode: number;
        message: string;
    }>;
}
