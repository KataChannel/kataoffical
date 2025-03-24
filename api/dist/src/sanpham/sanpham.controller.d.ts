import { SanphamService } from './sanpham.service';
export declare class SanphamController {
    private readonly sanphamService;
    constructor(sanphamService: SanphamService);
    create(createSanphamDto: any): Promise<any>;
    findby(param: any): Promise<any>;
    findAll(): Promise<any>;
    getLastUpdatedSanpham(): Promise<{
        updatedAt: any;
    }>;
    findOne(id: string): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
    reorder(body: {
        sanphamIds: string[];
    }): Promise<void>;
}
