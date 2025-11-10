import { NhanvienService } from './nhanvien.service';
export declare class NhanvienController {
    private readonly nhanvienService;
    constructor(nhanvienService: NhanvienService);
    getLastUpdated(): Promise<{
        lastUpdated: Date;
    }>;
    create(createNhanvienDto: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        manv: string;
        tennv: string;
        sdtnv: string | null;
        ngaysinhnv: Date | null;
        emailnv: string | null;
        diachinv: string | null;
        hinhccnv: string | null;
    }>;
    import(data: any): Promise<{
        success: number;
        failed: number;
        errors: {
            manv: string;
            error: string;
        }[];
    }>;
    searchfield(searchParams: Record<string, any>): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        manv: string;
        tennv: string;
        sdtnv: string | null;
        ngaysinhnv: Date | null;
        emailnv: string | null;
        diachinv: string | null;
        hinhccnv: string | null;
    }>;
    findAllForSelect(): Promise<Pick<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        manv: string;
        tennv: string;
        sdtnv: string | null;
        ngaysinhnv: Date | null;
        emailnv: string | null;
        diachinv: string | null;
        hinhccnv: string | null;
    }, "id" | "manv" | "tennv">[]>;
    findAll(query: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        manv: string;
        tennv: string;
        sdtnv: string | null;
        ngaysinhnv: Date | null;
        emailnv: string | null;
        diachinv: string | null;
        hinhccnv: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        manv: string;
        tennv: string;
        sdtnv: string | null;
        ngaysinhnv: Date | null;
        emailnv: string | null;
        diachinv: string | null;
        hinhccnv: string | null;
    }>;
    findByManv(manv: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        manv: string;
        tennv: string;
        sdtnv: string | null;
        ngaysinhnv: Date | null;
        emailnv: string | null;
        diachinv: string | null;
        hinhccnv: string | null;
    }>;
    update(id: string, updateNhanvienDto: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        manv: string;
        tennv: string;
        sdtnv: string | null;
        ngaysinhnv: Date | null;
        emailnv: string | null;
        diachinv: string | null;
        hinhccnv: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        manv: string;
        tennv: string;
        sdtnv: string | null;
        ngaysinhnv: Date | null;
        emailnv: string | null;
        diachinv: string | null;
        hinhccnv: string | null;
    }>;
}
