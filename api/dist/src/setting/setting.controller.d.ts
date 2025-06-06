import { SettingService } from './setting.service';
export declare class SettingController {
    private readonly settingService;
    constructor(settingService: SettingService);
    create(data: any): Promise<any>;
    findby(param: any): Promise<{
        value: any;
        type: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string | null;
        order: number | null;
        codeId: string | null;
        createdById: string | null;
        key: string | null;
        data?: undefined;
        total?: undefined;
        page?: undefined;
        pageCount?: undefined;
    } | {
        data: {
            value: any;
            type: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string | null;
            order: number | null;
            codeId: string | null;
            createdById: string | null;
            key: string | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(page?: string, limit?: string): Promise<{
        data: {
            value: any;
            type: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string | null;
            order: number | null;
            codeId: string | null;
            createdById: string | null;
            key: string | null;
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    getLastUpdatedSetting(): Promise<{
        updatedAt: number;
    }>;
    findOne(id: string): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
    reorder(body: {
        settingIds: string[];
    }): Promise<{
        status: string;
    }>;
}
