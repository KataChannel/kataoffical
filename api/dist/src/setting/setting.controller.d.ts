import { SettingService } from './setting.service';
export declare class SettingController {
    private readonly settingService;
    constructor(settingService: SettingService);
    create(data: any): Promise<{
        type: string;
        value: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        order: number | null;
        codeId: string;
        createdById: string | null;
        key: string;
    }>;
    findby(param: any): Promise<{
        data: {
            type: string;
            value: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            order: number | null;
            codeId: string;
            createdById: string | null;
            key: string;
        }[];
        total: number;
        page: any;
        pageCount: number;
    }>;
    findAll(): Promise<{
        data: {
            type: string;
            value: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            order: number | null;
            codeId: string;
            createdById: string | null;
            key: string;
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    getLastUpdatedSetting(): Promise<{
        updatedAt: number | Date;
    }>;
    findOne(id: string): Promise<{
        type: string;
        value: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        order: number | null;
        codeId: string;
        createdById: string | null;
        key: string;
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<{
        type: string;
        value: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        order: number | null;
        codeId: string;
        createdById: string | null;
        key: string;
    }>;
    reorder(body: {
        settingIds: string[];
    }): Promise<{
        status: string;
    }>;
}
