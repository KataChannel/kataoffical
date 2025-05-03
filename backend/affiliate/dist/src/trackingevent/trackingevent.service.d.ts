import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
export declare class TrackingeventService {
    private readonly prisma;
    private readonly errorLogService;
    constructor(prisma: PrismaService, errorLogService: ErrorlogService);
    create(data: Record<string, any>, ipAddress?: string, userAgent?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        referrer: string | null;
        userId: string | null;
        eventType: string | null;
        pageUrl: string | null;
        pageType: string | null;
        pageIdentifier: string | null;
        refCode: string | null;
        ipAddress: string | null;
        userAgent: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        referrer: string | null;
        userId: string | null;
        eventType: string | null;
        pageUrl: string | null;
        pageType: string | null;
        pageIdentifier: string | null;
        refCode: string | null;
        ipAddress: string | null;
        userAgent: string | null;
    }[]>;
    findBy(param: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        referrer: string | null;
        userId: string | null;
        eventType: string | null;
        pageUrl: string | null;
        pageType: string | null;
        pageIdentifier: string | null;
        refCode: string | null;
        ipAddress: string | null;
        userAgent: string | null;
    }[] | {
        count: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        referrer: string | null;
        userId: string | null;
        eventType: string | null;
        pageUrl: string | null;
        pageType: string | null;
        pageIdentifier: string | null;
        refCode: string | null;
        ipAddress: string | null;
        userAgent: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        referrer: string | null;
        userId: string | null;
        eventType: string | null;
        pageUrl: string | null;
        pageType: string | null;
        pageIdentifier: string | null;
        refCode: string | null;
        ipAddress: string | null;
        userAgent: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        referrer: string | null;
        userId: string | null;
        eventType: string | null;
        pageUrl: string | null;
        pageType: string | null;
        pageIdentifier: string | null;
        refCode: string | null;
        ipAddress: string | null;
        userAgent: string | null;
    }>;
}
