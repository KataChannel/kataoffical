import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from './socket.gateway';
import { ErrorlogsService } from 'src/errorlogs/errorlogs.service';
export declare class ImportdataService {
    private readonly prisma;
    private _SocketGateway;
    private _ErrorlogService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ErrorlogService: ErrorlogsService);
    getLastUpdatedImportdata(): Promise<{
        updatedAt: number;
    }>;
    generateCodeId(): Promise<string>;
    create(data: any): Promise<{
        id: string;
        title: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        codeId: string | null;
        type: string | null;
        status: string | null;
        importTime: Date;
        createdBy: string | null;
        caseDetail: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    findBy(param: any): Promise<{
        id: string;
        title: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        codeId: string | null;
        type: string | null;
        status: string | null;
        importTime: Date;
        createdBy: string | null;
        caseDetail: import("@prisma/client/runtime/library").JsonValue | null;
    } | {
        data: {
            id: string;
            title: string | null;
            order: number | null;
            createdAt: Date;
            updatedAt: Date;
            codeId: string | null;
            type: string | null;
            status: string | null;
            importTime: Date;
            createdBy: string | null;
            caseDetail: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(page?: number, limit?: number): Promise<{
        data: {
            id: string;
            title: string | null;
            order: number | null;
            createdAt: Date;
            updatedAt: Date;
            codeId: string | null;
            type: string | null;
            status: string | null;
            importTime: Date;
            createdBy: string | null;
            caseDetail: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        title: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        codeId: string | null;
        type: string | null;
        status: string | null;
        importTime: Date;
        createdBy: string | null;
        caseDetail: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<{
        id: string;
        title: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        codeId: string | null;
        type: string | null;
        status: string | null;
        importTime: Date;
        createdBy: string | null;
        caseDetail: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    reorderImportdatas(importdataIds: string[]): Promise<{
        status: string;
    }>;
}
