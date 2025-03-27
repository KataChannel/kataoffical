import { leadService } from './lead.service';
export declare class leadController {
    private readonly leadService;
    constructor(leadService: leadService);
    create(createleadDto: any): Promise<{
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        order: number | null;
        status: string;
        phone: string | null;
        code: string | null;
    }>;
    findby(param: any): Promise<{
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        order: number | null;
        status: string;
        phone: string | null;
        code: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        order: number | null;
        status: string;
        phone: string | null;
        code: string | null;
    }[]>;
    getLastUpdatedlead(): Promise<{
        updatedAt: number | Date;
    }>;
    findOne(id: string): Promise<{
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        order: number | null;
        status: string;
        phone: string | null;
        code: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        order: number | null;
        status: string;
        phone: string | null;
        code: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        order: number | null;
        status: string;
        phone: string | null;
        code: string | null;
    }>;
    reorder(body: {
        leadIds: string[];
    }): Promise<void>;
}
