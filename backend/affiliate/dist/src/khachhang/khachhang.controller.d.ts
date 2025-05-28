import { khachHangService } from './khachhang.service';
export declare class KhachhangController {
    private readonly khachhangService;
    constructor(khachhangService: khachHangService);
    create(data: any): Promise<void>;
    findby(param: any): Promise<void>;
    findAll(page?: string, limit?: string): Promise<void>;
    findOne(id: string): Promise<void>;
    update(id: string, data: any): Promise<void>;
    remove(id: string): Promise<void>;
}
