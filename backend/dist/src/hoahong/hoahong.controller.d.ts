import { HoahongService } from './hoahong.service';
export declare class HoahongController {
    private readonly hoahongService;
    constructor(hoahongService: HoahongService);
    create(data: any): Promise<{
        type: string | null;
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        doanhthuId: string;
        affiliateLinkId: string | null;
        tienhoahong: number;
        refphone: string | null;
        status: import(".prisma/client").$Enums.CommissionStatus;
        order: number | null;
    }>;
    findby(param: any): Promise<{
        type: string | null;
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        doanhthuId: string;
        affiliateLinkId: string | null;
        tienhoahong: number;
        refphone: string | null;
        status: import(".prisma/client").$Enums.CommissionStatus;
        order: number | null;
    } | {
        data: {
            type: string | null;
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            description: string | null;
            doanhthuId: string;
            affiliateLinkId: string | null;
            tienhoahong: number;
            refphone: string | null;
            status: import(".prisma/client").$Enums.CommissionStatus;
            order: number | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(query: any): Promise<{
        data: {
            type: string | null;
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            description: string | null;
            doanhthuId: string;
            affiliateLinkId: string | null;
            tienhoahong: number;
            refphone: string | null;
            status: import(".prisma/client").$Enums.CommissionStatus;
            order: number | null;
        }[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>;
    getTotalHoahongByUserId(userId: string): Promise<{
        total: number;
    }>;
    getLastUpdatedHoahong(): Promise<{
        updatedAt: number;
    }>;
    findOne(id: string): Promise<{
        type: string | null;
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        doanhthuId: string;
        affiliateLinkId: string | null;
        tienhoahong: number;
        refphone: string | null;
        status: import(".prisma/client").$Enums.CommissionStatus;
        order: number | null;
    }>;
    update(id: string, data: any): Promise<{
        type: string | null;
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        doanhthuId: string;
        affiliateLinkId: string | null;
        tienhoahong: number;
        refphone: string | null;
        status: import(".prisma/client").$Enums.CommissionStatus;
        order: number | null;
    }>;
    remove(id: string): Promise<{
        type: string | null;
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        doanhthuId: string;
        affiliateLinkId: string | null;
        tienhoahong: number;
        refphone: string | null;
        status: import(".prisma/client").$Enums.CommissionStatus;
        order: number | null;
    }>;
    reorder(body: {
        hoahongIds: string[];
    }): Promise<{
        status: string;
    }>;
}
