import { HttpStatus } from '@nestjs/common';
import { SettingService } from './setting.service';
export declare class SettingController {
    private readonly settingService;
    constructor(settingService: SettingService);
    create(data: any): Promise<{
        statusCode: HttpStatus;
        data: {
            type: string | null;
            value: string | null;
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
        };
    }>;
    findby(param: any): Promise<{
        statusCode: HttpStatus;
        data: {
            data: {
                type: string | null;
                value: string | null;
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
        };
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        data: {
            data: {
                type: string | null;
                value: string | null;
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
            type: string | null;
            value: string | null;
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
        };
    }>;
    update(id: string, data: any): Promise<{
        statusCode: HttpStatus;
        data: any;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        data: {
            type: string | null;
            value: string | null;
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
