import { PrismaService } from 'prisma/prisma.service';
export declare class ErrorlogService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    logError(message: string, details: any, source?: string): Promise<void>;
    create(data: any): Promise<{
        id: string;
        timestamp: Date;
        message: string;
        details: import("@prisma/client/runtime/library").JsonValue | null;
        source: string;
        createdAt: Date;
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
    update(id: string, data: any): Promise<{
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
