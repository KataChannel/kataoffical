import { BanggiaService } from './banggia.service';
export declare class BanggiaController {
    private readonly banggiaService;
    constructor(banggiaService: BanggiaService);
    create(createBanggiaDto: any): Promise<any>;
    findAll(): Promise<any>;
    addMultipleKhachhangToBanggia(data: any): Promise<any>;
    removeKHfromBG(data: any): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateBanggiaDto: any): Promise<any>;
    remove(id: string): Promise<any>;
    reorder(body: {
        banggiaIds: string[];
    }): Promise<void>;
}
