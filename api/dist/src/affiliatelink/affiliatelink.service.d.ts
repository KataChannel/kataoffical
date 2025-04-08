import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class AffiliatelinkService {
    private readonly prisma;
    private readonly socketGateway;
    private readonly errorLogService;
    constructor(prisma: PrismaService, socketGateway: SocketGateway, errorLogService: ErrorlogService);
    private emitUpdateEvent;
    getLastUpdatedAffiliatelink(): Promise<{
        updatedAt: number | Date;
    }>;
    generateCodeId(): Promise<string>;
    create(data: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        order: number | null;
        codeId: string;
        createdById: string;
        landingPageId: string;
    }>;
    reorderAffiliatelinks(affiliatelinkIds: string[]): Promise<void>;
    findAll(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        order: number | null;
        codeId: string;
        createdById: string;
        landingPageId: string;
    }[]>;
    findOneBy(param: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        order: number | null;
        codeId: string;
        createdById: string;
        landingPageId: string;
    }>;
    findListBy(param: any): Promise<{
        trackingEvents: number;
        landingPage: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string;
            slug: string;
            order: number | null;
            status: string;
            codeId: string;
            thumbnail: string | null;
            contentHtml: string | null;
            customCss: string | null;
            customJs: string | null;
            seoTitle: string | null;
            seoDescription: string | null;
            seoKeywords: string | null;
            ownerId: string | null;
            contentJson: import("@prisma/client/runtime/library").JsonValue | null;
        };
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        order: number | null;
        codeId: string;
        createdById: string;
        landingPageId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        order: number | null;
        codeId: string;
        createdById: string;
        landingPageId: string;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        order: number | null;
        codeId: string;
        createdById: string;
        landingPageId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        order: number | null;
        codeId: string;
        createdById: string;
        landingPageId: string;
    }>;
    findByCode(codeId: string): Promise<any | null>;
}
