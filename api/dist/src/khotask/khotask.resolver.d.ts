import { KhotaskService } from './khotask.service';
export declare class KhotaskResolver {
    private readonly khotaskService;
    constructor(khotaskService: KhotaskService);
    findMany(filters?: any): Promise<({
        kho: {
            id: string;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            diachi: string | null;
            sdt: string | null;
            makho: string | null;
            congtyId: string | null;
        } | null;
        user: {
            id: string;
            name: string | null;
            email: string | null;
        } | null;
    } & {
        id: string;
        title: string;
        type: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        khoId: string | null;
        userId: string | null;
        description: string | null;
        ngaythuchien: Date;
    })[]>;
    getDailyChecklist(khoId: string, date?: string): Promise<{
        id: string;
        title: string;
        type: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        khoId: string | null;
        userId: string | null;
        description: string | null;
        ngaythuchien: Date;
    }[]>;
    create(data: any): Promise<{
        id: string;
        title: string;
        type: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        khoId: string | null;
        userId: string | null;
        description: string | null;
        ngaythuchien: Date;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        title: string;
        type: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        khoId: string | null;
        userId: string | null;
        description: string | null;
        ngaythuchien: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        type: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        khoId: string | null;
        userId: string | null;
        description: string | null;
        ngaythuchien: Date;
    }>;
}
