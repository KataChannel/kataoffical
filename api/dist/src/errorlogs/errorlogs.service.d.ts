import { PrismaService } from 'prisma/prisma.service';
export declare class ErrorlogsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    logError(message: string, details: any, source?: string): Promise<void>;
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        timestamp: Date;
        message: string;
        details: import("@prisma/client/runtime/library").JsonValue | null;
        source: string;
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
    update(id: string, data: any): Promise<{
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
