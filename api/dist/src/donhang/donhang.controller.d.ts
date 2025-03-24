import { DonhangService } from './donhang.service';
export declare class DonhangController {
    private readonly donhangService;
    constructor(donhangService: DonhangService);
    create(createDonhangDto: any): Promise<any>;
    search(params: any): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateDonhangDto: any): Promise<any>;
    remove(id: string): Promise<any>;
    reorder(body: {
        donhangIds: string[];
    }): Promise<void>;
}
