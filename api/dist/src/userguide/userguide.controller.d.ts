import { UserguideService } from './userguide.service';
export declare class UserguideController {
    private readonly userguideService;
    constructor(userguideService: UserguideService);
    create(data: any): Promise<{
        id: string;
        title: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        codeId: string | null;
        time: string | null;
    }>;
    findby(param: any): Promise<{
        data: ({
            UserguidBlocks: {
                id: string;
                title: string | null;
                order: number | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                type: string;
                description: string | null;
                codeId: string | null;
                listItems: string | null;
                imageUrl: string | null;
                imageAlt: string | null;
                videoUrl: string | null;
                videoType: string | null;
                stepId: string | null;
            }[];
        } & {
            id: string;
            title: string | null;
            order: number | null;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            codeId: string | null;
            time: string | null;
        })[];
        total: number;
        page: any;
        pageCount: number;
    }>;
    findAll(): Promise<{
        data: {
            id: string;
            title: string | null;
            order: number | null;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            codeId: string | null;
            time: string | null;
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    getLastUpdatedUserguide(): Promise<{
        updatedAt: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        title: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        codeId: string | null;
        time: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        title: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        codeId: string | null;
        time: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        codeId: string | null;
        time: string | null;
    }>;
    reorder(body: {
        userguideIds: string[];
    }): Promise<{
        status: string;
    }>;
}
