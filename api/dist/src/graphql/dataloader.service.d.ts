import { PrismaService } from '../../prisma/prisma.service';
import DataLoader from 'dataloader';
export declare class DataLoaderService {
    private readonly prisma;
    private loaders;
    constructor(prisma: PrismaService);
    getLoader<T>(modelName: string, relationField: string, keyField?: string): DataLoader<string, T[]>;
    getSingleLoader<T>(modelName: string, keyField?: string): DataLoader<string, T | null>;
    loadRelatedData<T>(modelName: string, relationField: string, parentId: string, keyField?: string): Promise<T[]>;
    loadSingleRelatedData<T>(modelName: string, id: string, keyField?: string): Promise<T | null>;
    clearCache(): void;
    clearLoaderCache(modelName: string, relationField?: string, keyField?: string): void;
    preloadData<T>(modelName: string, ids: string[], relationField?: string, keyField?: string): Promise<void>;
}
