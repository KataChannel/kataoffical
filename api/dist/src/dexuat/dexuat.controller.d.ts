import { DexuatService } from './dexuat.service';
export declare class DexuatController {
    private readonly dexuatService;
    constructor(dexuatService: DexuatService);
    create(createDexuatDto: any): Promise<any>;
    findby(param: any): Promise<any>;
    findAll(): Promise<any>;
    getLastUpdatedDexuat(): Promise<{
        updatedAt: any;
    }>;
    findOne(id: string): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
    reorder(body: {
        dexuatIds: string[];
    }): Promise<void>;
}
