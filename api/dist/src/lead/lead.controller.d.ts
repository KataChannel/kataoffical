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
        code: string | null;
        order: number | null;
        status: string;
    }>;
    findby(param: any): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        code: string | null;
        order: number | null;
        status: string;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        code: string | null;
        order: number | null;
        status: string;
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
        code: string | null;
        order: number | null;
        status: string;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        code: string | null;
        order: number | null;
        status: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        code: string | null;
        order: number | null;
        status: string;
    }>;
    reorder(body: {
        leadIds: string[];
    }): Promise<void>;
}
