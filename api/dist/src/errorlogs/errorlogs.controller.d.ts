import { ErrorlogsService } from './errorlogs.service';
export declare class ErrorlogsController {
    private readonly errorlogsService;
    constructor(errorlogsService: ErrorlogsService);
    logFromClient(logData: {
        timestamp: string;
        message: string;
        details?: any;
    }): Promise<{
        status: string;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        details: import("@prisma/client/runtime/library").JsonValue | null;
        message: string;
        timestamp: Date;
        source: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        details: import("@prisma/client/runtime/library").JsonValue | null;
        message: string;
        timestamp: Date;
        source: string;
    }>;
    update(id: string, updateErrorlogsDto: any): Promise<{
        id: string;
        createdAt: Date;
        details: import("@prisma/client/runtime/library").JsonValue | null;
        message: string;
        timestamp: Date;
        source: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        details: import("@prisma/client/runtime/library").JsonValue | null;
        message: string;
        timestamp: Date;
        source: string;
    }>;
}
