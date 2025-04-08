import { leadService } from './lead.service';
export declare class leadController {
    private readonly leadService;
    constructor(leadService: leadService);
    create(createleadDto: any): Promise<{
        email: string | null;
        phone: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        order: number | null;
        status: string;
        code: string | null;
    }>;
    findby(param: any): Promise<{
        email: string | null;
        phone: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        order: number | null;
        status: string;
        code: string | null;
    }>;
    findAll(): Promise<{
        email: string | null;
        phone: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        order: number | null;
        status: string;
        code: string | null;
    }[]>;
    getLastUpdatedlead(): Promise<{
        updatedAt: number | Date;
    }>;
    findOne(id: string): Promise<{
        email: string | null;
        phone: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        order: number | null;
        status: string;
        code: string | null;
    }>;
    update(id: string, data: any): Promise<{
        email: string | null;
        phone: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        order: number | null;
        status: string;
        code: string | null;
    }>;
    remove(id: string): Promise<{
        email: string | null;
        phone: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        order: number | null;
        status: string;
        code: string | null;
    }>;
    reorder(body: {
        leadIds: string[];
    }): Promise<void>;
}
