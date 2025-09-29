import { NhomkhachhangService } from './nhomkhachhang.service';
export declare class NhomkhachhangController {
    private readonly nhomkhachhangService;
    constructor(nhomkhachhangService: NhomkhachhangService);
    create(createNhomkhachhangDto: any): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    findAll(): Promise<({
        khachhang: {
            name: string | null;
            id: string;
            email: string | null;
            phone: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            ghichu: string | null;
            makh: string;
            namenn: string | null;
            diachi: string | null;
            sdt: string | null;
            mst: string | null;
            gionhanhang: string | null;
            quan: string | null;
            address: string | null;
            loaikh: string | null;
            hiengia: boolean;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    })[]>;
    addMultipleKhachhangToBanggia(data: any): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    removeKHfromBG(data: any): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    findOne(id: string): Promise<{
        khachhang: {
            name: string | null;
            id: string;
            email: string | null;
            phone: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            ghichu: string | null;
            makh: string;
            namenn: string | null;
            diachi: string | null;
            sdt: string | null;
            mst: string | null;
            gionhanhang: string | null;
            quan: string | null;
            address: string | null;
            loaikh: string | null;
            hiengia: boolean;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    update(id: string, updateNhomkhachhangDto: any): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
}
