import { BanggiaService } from './banggia.service';
export declare class BanggiaController {
    private readonly banggiaService;
    constructor(banggiaService: BanggiaService);
    create(createBanggiaDto: any): Promise<{
        id: string;
        order: number;
        title: string;
        type: string;
        batdau: Date;
        ketthuc: Date;
    }>;
    findAll(): Promise<{
        id: string;
        order: number;
        title: string;
        type: string;
        batdau: Date;
        ketthuc: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        order: number;
        title: string;
        type: string;
        batdau: Date;
        ketthuc: Date;
    }>;
    update(id: string, updateBanggiaDto: any): Promise<{
        id: string;
        order: number;
        title: string;
        type: string;
        batdau: Date;
        ketthuc: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        order: number;
        title: string;
        type: string;
        batdau: Date;
        ketthuc: Date;
    }>;
    reorder(body: {
        banggiaIds: string[];
    }): Promise<void>;
}
