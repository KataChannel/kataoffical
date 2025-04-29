import { DexuatService } from './dexuat.service';
export declare class DexuatController {
    private readonly dexuatService;
    constructor(dexuatService: DexuatService);
    create(createDexuatDto: any): Promise<{
        chitiet: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            order: number | null;
            ghichu: string | null;
            thanhtien: number | null;
            dexuatId: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        tienbangchu: string | null;
        tongtien: number | null;
        tongchi: number | null;
        ngaytao: Date | null;
        nguoinhan: string | null;
        truongbophan: string | null;
        nguoidexuat: string | null;
        bophan: string | null;
        vitri: string | null;
        tamung: number | null;
        codeId: string;
        createdById: string;
    }>;
    findby(param: any): Promise<{
        chitiet: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            order: number | null;
            ghichu: string | null;
            thanhtien: number | null;
            dexuatId: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        tienbangchu: string | null;
        tongtien: number | null;
        tongchi: number | null;
        ngaytao: Date | null;
        nguoinhan: string | null;
        truongbophan: string | null;
        nguoidexuat: string | null;
        bophan: string | null;
        vitri: string | null;
        tamung: number | null;
        codeId: string;
        createdById: string;
    }>;
    findAll(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        tienbangchu: string | null;
        tongtien: number | null;
        tongchi: number | null;
        ngaytao: Date | null;
        nguoinhan: string | null;
        truongbophan: string | null;
        nguoidexuat: string | null;
        bophan: string | null;
        vitri: string | null;
        tamung: number | null;
        codeId: string;
        createdById: string;
    }[]>;
    getLastUpdatedDexuat(): Promise<{
        updatedAt: number | Date;
    }>;
    findOne(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        tienbangchu: string | null;
        tongtien: number | null;
        tongchi: number | null;
        ngaytao: Date | null;
        nguoinhan: string | null;
        truongbophan: string | null;
        nguoidexuat: string | null;
        bophan: string | null;
        vitri: string | null;
        tamung: number | null;
        codeId: string;
        createdById: string;
    }>;
    update(id: string, data: any): Promise<({
        chitiet: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            order: number | null;
            ghichu: string | null;
            thanhtien: number | null;
            dexuatId: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        tienbangchu: string | null;
        tongtien: number | null;
        tongchi: number | null;
        ngaytao: Date | null;
        nguoinhan: string | null;
        truongbophan: string | null;
        nguoidexuat: string | null;
        bophan: string | null;
        vitri: string | null;
        tamung: number | null;
        codeId: string;
        createdById: string;
    }) | null>;
    remove(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        tienbangchu: string | null;
        tongtien: number | null;
        tongchi: number | null;
        ngaytao: Date | null;
        nguoinhan: string | null;
        truongbophan: string | null;
        nguoidexuat: string | null;
        bophan: string | null;
        vitri: string | null;
        tamung: number | null;
        codeId: string;
        createdById: string;
    }>;
    reorder(body: {
        dexuatIds: string[];
    }): Promise<void>;
}
