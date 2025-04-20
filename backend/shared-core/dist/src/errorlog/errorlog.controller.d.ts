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
        createdAt: Date;
        timestamp: Date;
        message: string;
        details: import("@prisma/client/runtime/library").JsonValue | null;
        source: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        timestamp: Date;
        message: string;
        details: import("@prisma/client/runtime/library").JsonValue | null;
        source: string;
    }>;
    update(id: string, updateErrorlogDto: any): Promise<{
        id: string;
        createdAt: Date;
        timestamp: Date;
        message: string;
        details: import("@prisma/client/runtime/library").JsonValue | null;
        source: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        timestamp: Date;
        message: string;
        details: import("@prisma/client/runtime/library").JsonValue | null;
        source: string;
    }>;
}
