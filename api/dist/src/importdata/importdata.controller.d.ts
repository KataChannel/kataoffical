import { ImportdataService } from './importdata.service';
export declare class ImportdataController {
    private readonly importdataService;
    constructor(importdataService: ImportdataService);
    create(data: any): Promise<{
        id: string;
        title: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        status: string | null;
        codeId: string | null;
        type: string | null;
        importTime: Date;
        createdBy: string | null;
        caseDetail: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    findby(param: any): Promise<{
        id: string;
        title: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        status: string | null;
        codeId: string | null;
        type: string | null;
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
            status: string | null;
            codeId: string | null;
            type: string | null;
            importTime: Date;
            createdBy: string | null;
            caseDetail: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(page?: string, limit?: string): Promise<{
        data: {
            id: string;
            title: string | null;
            order: number | null;
            createdAt: Date;
            updatedAt: Date;
            status: string | null;
            codeId: string | null;
            type: string | null;
            importTime: Date;
            createdBy: string | null;
            caseDetail: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    getLastUpdatedImportdata(): Promise<{
        updatedAt: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        title: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        status: string | null;
        codeId: string | null;
        type: string | null;
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
        status: string | null;
        codeId: string | null;
        type: string | null;
        importTime: Date;
        createdBy: string | null;
        caseDetail: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    reorder(body: {
        importdataIds: string[];
    }): Promise<{
        status: string;
    }>;
}
