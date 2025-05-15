import { HttpStatus } from '@nestjs/common';
import { SettingService } from './setting.service';
export declare class SettingController {
    private readonly settingService;
    constructor(settingService: SettingService);
    create(data: any): Promise<{
        statusCode: HttpStatus;
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
        };
    }>;
    findby(param: any): Promise<{
        statusCode: HttpStatus;
        data: {
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
        };
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        data: {
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
        };
    }>;
    getLastUpdatedSetting(): Promise<{
        statusCode: HttpStatus;
        data: {
            updatedAt: number | Date;
        };
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
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
        };
    }>;
    update(id: string, data: any): Promise<{
        statusCode: HttpStatus;
        data: any;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
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
        };
    }>;
    reorder(body: {
        settingIds: string[];
    }): Promise<{
        statusCode: HttpStatus;
        data: {
            status: string;
        };
    }>;
}
