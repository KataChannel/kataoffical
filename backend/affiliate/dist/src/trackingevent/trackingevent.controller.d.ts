import { TrackingeventService } from './trackingevent.service';
export declare class TrackingeventController {
    private readonly trackingeventService;
    constructor(trackingeventService: TrackingeventService);
    create(data: any, ipAddress: string, userAgent: string): Promise<{
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
    update(id: string, updateTrackingeventDto: any): Promise<{
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
