import { ErrorlogService } from './errorlog.service';
export declare class ErrorlogController {
    private readonly errorlogService;
    constructor(errorlogService: ErrorlogService);
    logFromClient(logData: {
        timestamp: string;
        message: string;
        details?: any;
    }): Promise<{
        status: string;
    }>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateErrorlogDto: any): Promise<any>;
    remove(id: string): Promise<any>;
}
