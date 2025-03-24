import { DathangService } from './dathang.service';
export declare class DathangController {
    private readonly dathangService;
    constructor(dathangService: DathangService);
    create(createDathangDto: any): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateDathangDto: any): Promise<any>;
    remove(id: string): Promise<any>;
    reorder(body: {
        dathangIds: string[];
    }): Promise<void>;
}
