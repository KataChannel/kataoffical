import { PrismaService } from 'prisma/prisma.service';
export declare class NhomkhachhangService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    findAll(): Promise<({
        khachhang: {
            id: string;
            email: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            ghichu: string | null;
            namenn: string | null;
            makh: string;
            diachi: string | null;
            sdt: string | null;
            mst: string | null;
            gionhanhang: string | null;
            quan: string | null;
            phone: string | null;
            address: string | null;
            loaikh: string | null;
            hiengia: boolean;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    })[]>;
    findOne(id: string): Promise<{
        khachhang: {
            id: string;
            email: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            ghichu: string | null;
            namenn: string | null;
            makh: string;
            diachi: string | null;
            sdt: string | null;
            mst: string | null;
            gionhanhang: string | null;
            quan: string | null;
            phone: string | null;
            address: string | null;
            loaikh: string | null;
            hiengia: boolean;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    update(id: string, data: any): Promise<{
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
    addKHtoNhom(nhomId: string, khachhangIds: any[]): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    removeKHfromNhom(nhomId: string, khachhangIds: any[]): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
}
