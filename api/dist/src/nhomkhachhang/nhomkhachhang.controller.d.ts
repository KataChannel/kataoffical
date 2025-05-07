import { NhomkhachhangService } from './nhomkhachhang.service';
export declare class NhomkhachhangController {
    private readonly nhomkhachhangService;
    constructor(nhomkhachhangService: NhomkhachhangService);
    create(createNhomkhachhangDto: any): Promise<any>;
    findAll(): Promise<any>;
    addMultipleKhachhangToBanggia(data: any): Promise<any>;
    removeKHfromBG(data: any): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateNhomkhachhangDto: any): Promise<any>;
    remove(id: string): Promise<any>;
}
