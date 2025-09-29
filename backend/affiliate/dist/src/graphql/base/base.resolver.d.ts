import { Type } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { BulkOperationResult } from '../types/bulk-operation-result.type';
export interface IPrismaDelegate {
    findMany: (args?: any) => Promise<any[]>;
    findUnique: (args: any) => Promise<any>;
    findFirst: (args?: any) => Promise<any>;
    create: (args: any) => Promise<any>;
    createMany: (args: any) => Promise<any>;
    update: (args: any) => Promise<any>;
    updateMany: (args: any) => Promise<any>;
    delete: (args: any) => Promise<any>;
    deleteMany: (args: any) => Promise<any>;
    count: (args?: any) => Promise<number>;
}
export interface PaginationArgs {
    skip?: number;
    take?: number;
}
export interface OrderByArgs {
    [key: string]: 'asc' | 'desc';
}
export interface FilterArgs {
    where?: any;
    orderBy?: OrderByArgs | OrderByArgs[];
    skip?: number;
    take?: number;
}
export declare function createBaseResolver<T, CreateInput, UpdateInput, WhereInput, WhereUniqueInput>(classRef: Type<T>, createInputRef: Type<CreateInput>, updateInputRef: Type<UpdateInput>, whereInputRef: Type<WhereInput>, whereUniqueInputRef: Type<WhereUniqueInput>, modelName: string): abstract new (prisma: PrismaService) => {
    readonly prisma: PrismaService;
    readonly model: IPrismaDelegate;
    findAll(where?: any, orderBy?: any, skip?: number, take?: number): Promise<T[]>;
    findOne(where: any): Promise<T | null>;
    count(where?: any): Promise<number>;
    createOne(data: any): Promise<T>;
    createBulk(data: any[]): Promise<BulkOperationResult>;
    updateOne(where: any, data: any): Promise<T>;
    updateBulk(where: any, data: any): Promise<BulkOperationResult>;
    deleteOne(where: any): Promise<T>;
    deleteBulk(where: any): Promise<BulkOperationResult>;
};
