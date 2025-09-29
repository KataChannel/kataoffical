import { Response } from 'express';
import { MailService } from './mail.service';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendemail(data: any): Promise<{
        statusCode: number;
        message: string;
    }>;
    previewEmail(data: any, res: Response): Promise<void>;
}
