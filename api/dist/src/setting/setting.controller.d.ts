import { SettingService } from './setting.service';
export declare class SettingController {
    private readonly settingService;
    constructor(settingService: SettingService);
    create(data: any): Promise<{
        updatedAt: Date;
        id: string;
        title: string | null;
        codeId: string | null;
        key: string | null;
        value: string | null;
        type: string | null;
        description: string | null;
        order: number | null;
        isActive: boolean;
        createdById: string | null;
        createdAt: Date;
    }>;
    findby(param: any): Promise<{
        data: {
            updatedAt: Date;
            id: string;
            title: string | null;
            codeId: string | null;
            key: string | null;
            value: string | null;
            type: string | null;
            description: string | null;
            order: number | null;
            isActive: boolean;
            createdById: string | null;
            createdAt: Date;
        }[];
        total: number;
        page: any;
        pageCount: number;
    }>;
    findAll(): Promise<{
        data: {
            updatedAt: Date;
            id: string;
            title: string | null;
            codeId: string | null;
            key: string | null;
            value: string | null;
            type: string | null;
            description: string | null;
            order: number | null;
            isActive: boolean;
            createdById: string | null;
            createdAt: Date;
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    getLastUpdatedSetting(): Promise<{
        updatedAt: number | Date;
    }>;
    findOne(id: string): Promise<{
        updatedAt: Date;
        id: string;
        title: string | null;
        codeId: string | null;
        key: string | null;
        value: string | null;
        type: string | null;
        description: string | null;
        order: number | null;
        isActive: boolean;
        createdById: string | null;
        createdAt: Date;
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<{
        updatedAt: Date;
        id: string;
        title: string | null;
        codeId: string | null;
        key: string | null;
        value: string | null;
        type: string | null;
        description: string | null;
        order: number | null;
        isActive: boolean;
        createdById: string | null;
        createdAt: Date;
    }>;
    reorder(body: {
        settingIds: string[];
    }): Promise<{
        status: string;
    }>;
}
