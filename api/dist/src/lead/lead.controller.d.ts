import { leadService } from './lead.service';
export declare class leadController {
    private readonly leadService;
    constructor(leadService: leadService);
    create(createleadDto: any): Promise<any>;
    findby(param: any): Promise<any>;
    findAll(): Promise<any>;
    getLastUpdatedlead(): Promise<{
        updatedAt: any;
    }>;
    findOne(id: string): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
    reorder(body: {
        leadIds: string[];
    }): Promise<void>;
}
