import { NhomkhachhangService } from './nhomkhachhang.service';
export declare class NhomkhachhangController {
    private readonly nhomkhachhangService;
    constructor(nhomkhachhangService: NhomkhachhangService);
    create(createNhomkhachhangDto: any): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        khachhang: {
            id: string;
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
            namenn: string | null;
            subtitle: string | null;
            makh: string;
            makhold: string | null;
            diachi: string | null;
            sdt: string | null;
            mst: string | null;
            gionhanhang: string | null;
            quan: string | null;
            email: string | null;
            phone: string | null;
            address: string | null;
            loaikh: string | null;
            ghichu: string | null;
            hiengia: boolean;
            isActive: boolean;
            istitle2: boolean;
            tenfile: string | null;
            tenkh: string | null;
            banggiaId: string | null;
            isshowvat: boolean;
        }[];
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    addMultipleKhachhangToNhom(data: any): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    removeKHfromNhom(data: any): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOne(id: string): Promise<{
        khachhang: {
            id: string;
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
            namenn: string | null;
            subtitle: string | null;
            makh: string;
            makhold: string | null;
            diachi: string | null;
            sdt: string | null;
            mst: string | null;
            gionhanhang: string | null;
            quan: string | null;
            email: string | null;
            phone: string | null;
            address: string | null;
            loaikh: string | null;
            ghichu: string | null;
            hiengia: boolean;
            isActive: boolean;
            istitle2: boolean;
            tenfile: string | null;
            tenkh: string | null;
            banggiaId: string | null;
            isshowvat: boolean;
        }[];
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateNhomkhachhangDto: any): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
