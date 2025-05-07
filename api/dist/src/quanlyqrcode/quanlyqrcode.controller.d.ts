import { QuanlyqrcodeService } from './quanlyqrcode.service';
export declare class QuanlyqrcodeController {
    private readonly quanlyqrcodeService;
    constructor(quanlyqrcodeService: QuanlyqrcodeService);
    create(createquanlyqrcodeDto: any): Promise<any>;
    findby(param: any): Promise<any>;
    findAll(): Promise<any>;
    getLastUpdatedquanlyqrcode(): Promise<{
        updatedAt: any;
    }>;
    findOne(id: string): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
}
