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
            thanhtien: number | null;
            ghichu: string | null;
            dexuatId: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        codeId: string;
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
            thanhtien: number | null;
            ghichu: string | null;
            dexuatId: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        codeId: string;
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
        createdById: string;
    }>;
    findAll(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        codeId: string;
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
        codeId: string;
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
            thanhtien: number | null;
            ghichu: string | null;
            dexuatId: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        codeId: string;
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
        createdById: string;
    }) | null>;
    remove(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        codeId: string;
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
        createdById: string;
    }>;
    reorder(body: {
        dexuatIds: string[];
    }): Promise<void>;
}
