import { leadService } from './lead.service';
export declare class leadController {
    private readonly leadService;
    constructor(leadService: leadService);
    create(createleadDto: any): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string;
        code: string | null;
    }>;
    findby(param: any): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string;
        code: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string;
        code: string | null;
    }[]>;
    getLastUpdatedlead(): Promise<{
        updatedAt: number | Date;
    }>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string;
        code: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string;
        code: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string;
        code: string | null;
    }>;
    reorder(body: {
        leadIds: string[];
    }): Promise<void>;
}
