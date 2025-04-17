import { NhomkhachhangService } from './nhomkhachhang.service';
export declare class NhomkhachhangController {
    private readonly nhomkhachhangService;
    constructor(nhomkhachhangService: NhomkhachhangService);
    create(createNhomkhachhangDto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    findAll(): Promise<({
        khachhang: {
            address: string | null;
            email: string | null;
            phone: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            namenn: string | null;
            makh: string;
            diachi: string | null;
            sdt: string | null;
            mst: string | null;
            gionhanhang: string | null;
            quan: string | null;
            loaikh: string | null;
            ghichu: string | null;
            hiengia: boolean;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    })[]>;
    addMultipleKhachhangToBanggia(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    removeKHfromBG(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    findOne(id: string): Promise<{
        khachhang: {
            address: string | null;
            email: string | null;
            phone: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            namenn: string | null;
            makh: string;
            diachi: string | null;
            sdt: string | null;
            mst: string | null;
            gionhanhang: string | null;
            quan: string | null;
            loaikh: string | null;
            ghichu: string | null;
            hiengia: boolean;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    update(id: string, updateNhomkhachhangDto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
}
