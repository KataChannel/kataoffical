import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from './socket.gateway';
import { ErrorlogsService } from '../errorlogs/errorlogs.service';
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
        type: string | null;
        status: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        caseDetail: import("@prisma/client/runtime/library").JsonValue | null;
        importTime: Date;
        codeId: string | null;
        createdBy: string | null;
    }>;
    findBy(param: any): Promise<{
        id: string;
        title: string | null;
        type: string | null;
        status: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        caseDetail: import("@prisma/client/runtime/library").JsonValue | null;
        importTime: Date;
        codeId: string | null;
        createdBy: string | null;
    } | {
        data: {
            id: string;
            title: string | null;
            type: string | null;
            status: string | null;
            order: number | null;
            createdAt: Date;
            updatedAt: Date;
            caseDetail: import("@prisma/client/runtime/library").JsonValue | null;
            importTime: Date;
            codeId: string | null;
            createdBy: string | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(page?: number, limit?: number): Promise<{
        data: {
            id: string;
            title: string | null;
            type: string | null;
            status: string | null;
            order: number | null;
            createdAt: Date;
            updatedAt: Date;
            caseDetail: import("@prisma/client/runtime/library").JsonValue | null;
            importTime: Date;
            codeId: string | null;
            createdBy: string | null;
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        title: string | null;
        type: string | null;
        status: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        caseDetail: import("@prisma/client/runtime/library").JsonValue | null;
        importTime: Date;
        codeId: string | null;
        createdBy: string | null;
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<{
        id: string;
        title: string | null;
        type: string | null;
        status: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        caseDetail: import("@prisma/client/runtime/library").JsonValue | null;
        importTime: Date;
        codeId: string | null;
        createdBy: string | null;
    }>;
    reorderImportdatas(importdataIds: string[]): Promise<{
        status: string;
    }>;
}
