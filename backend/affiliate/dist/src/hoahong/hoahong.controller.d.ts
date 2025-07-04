import { HoahongService } from './hoahong.service';
export declare class HoahongController {
    private readonly hoahongService;
    constructor(hoahongService: HoahongService);
    create(data: any): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        order: number | null;
        status: import(".prisma/client").$Enums.CommissionStatus;
        affiliateLinkId: string | null;
        doanhthuId: string;
        tienhoahong: number;
    }>;
    findby(param: any): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        order: number | null;
        status: import(".prisma/client").$Enums.CommissionStatus;
        affiliateLinkId: string | null;
        doanhthuId: string;
        tienhoahong: number;
    } | {
        data: {
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            description: string | null;
            order: number | null;
            status: import(".prisma/client").$Enums.CommissionStatus;
            affiliateLinkId: string | null;
            doanhthuId: string;
            tienhoahong: number;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(query: any): Promise<{
        data: {
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            description: string | null;
            order: number | null;
            status: import(".prisma/client").$Enums.CommissionStatus;
            affiliateLinkId: string | null;
            doanhthuId: string;
            tienhoahong: number;
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
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        order: number | null;
        status: import(".prisma/client").$Enums.CommissionStatus;
        affiliateLinkId: string | null;
        doanhthuId: string;
        tienhoahong: number;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        order: number | null;
        status: import(".prisma/client").$Enums.CommissionStatus;
        affiliateLinkId: string | null;
        doanhthuId: string;
        tienhoahong: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        order: number | null;
        status: import(".prisma/client").$Enums.CommissionStatus;
        affiliateLinkId: string | null;
        doanhthuId: string;
        tienhoahong: number;
    }>;
    reorder(body: {
        hoahongIds: string[];
    }): Promise<{
        status: string;
    }>;
}
