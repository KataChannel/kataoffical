import { KhachhangService } from './khachhang.service';
export declare class KhachhangController {
    private readonly khachhangService;
    constructor(khachhangService: KhachhangService);
    create(createKhachhangDto: any): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateKhachhangDto: any): Promise<any>;
    remove(id: string): Promise<any>;
}
