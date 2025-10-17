import { PrismaService } from 'prisma/prisma.service';
import { CreateNhomkhachhangInput } from './dto/create-nhomkhachhang.dto';
import { UpdateNhomkhachhangInput } from './dto/update-nhomkhachhang.dto';
import { NhomkhachhangFilterInput, NhomkhachhangPaginationInput, NhomkhachhangSortInput } from './dto/filter-nhomkhachhang.dto';
import { NhomkhachhangConnection } from './types/nhomkhachhang-response.type';
export declare class NhomkhachhangService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private transformNullToUndefined;
    createNhomkhachhang(input: CreateNhomkhachhangInput): Promise<any>;
    findAllNhomkhachhang(filter?: NhomkhachhangFilterInput, pagination?: NhomkhachhangPaginationInput, sort?: NhomkhachhangSortInput): Promise<NhomkhachhangConnection>;
    findOneNhomkhachhang(id: string): Promise<any>;
    updateNhomkhachhang(id: string, input: UpdateNhomkhachhangInput): Promise<any>;
    removeNhomkhachhang(id: string): Promise<boolean>;
    addKhachhangToNhom(nhomId: string, khachhangIds: string[]): Promise<any>;
    removeKhachhangFromNhom(nhomId: string, khachhangIds: string[]): Promise<any>;
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
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            banggiaId: string | null;
            subtitle: string | null;
            namenn: string | null;
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
            hiengia: boolean;
            istitle2: boolean;
            tenfile: string | null;
            tenkh: string | null;
            isshowvat: boolean;
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
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            banggiaId: string | null;
            subtitle: string | null;
            namenn: string | null;
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
            hiengia: boolean;
            istitle2: boolean;
            tenfile: string | null;
            tenkh: string | null;
            isshowvat: boolean;
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
