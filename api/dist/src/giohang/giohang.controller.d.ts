import { GiohangService } from './giohang.service';
export declare class GiohangController {
    private readonly giohangService;
    constructor(giohangService: GiohangService);
    create(createGiohangDto: any): Promise<{
        id: string;
        order: number;
        title: string;
        donhangId: string;
    }>;
    findAll(): Promise<{
        id: string;
        order: number;
        title: string;
        donhangId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        order: number;
        title: string;
        donhangId: string;
    }>;
    update(id: string, updateGiohangDto: any): Promise<{
        id: string;
        order: number;
        title: string;
        donhangId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        order: number;
        title: string;
        donhangId: string;
    }>;
    reorder(body: {
        giohangIds: string[];
    }): Promise<void>;
}
