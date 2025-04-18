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
    findAll(): Promise<{
        id: string;
        timestamp: Date;
        message: string;
        details: import("@prisma/client/runtime/library").JsonValue | null;
        source: string;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        timestamp: Date;
        message: string;
        details: import("@prisma/client/runtime/library").JsonValue | null;
        source: string;
        createdAt: Date;
    }>;
    update(id: string, updateErrorlogDto: any): Promise<{
        id: string;
        timestamp: Date;
        message: string;
        details: import("@prisma/client/runtime/library").JsonValue | null;
        source: string;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        timestamp: Date;
        message: string;
        details: import("@prisma/client/runtime/library").JsonValue | null;
        source: string;
        createdAt: Date;
    }>;
}
