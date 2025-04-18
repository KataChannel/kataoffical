export declare class PaginationDto {
    page?: number;
    limit?: number;
}
export interface PaginatedResult<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface Response<T> {
    data: T;
    meta?: Record<string, any>;
    message?: string;
}
export declare class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>>;
}
import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
export declare class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): void;
}
import { INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    constructor();
    onModuleInit(): Promise<void>;
    enableShutdownHooks(app: INestApplication): Promise<void>;
}
import { PrismaService } from './prisma.service';
export declare class PrismaModule {
}
export declare class CreateCategoryDto {
    name: string;
    description?: string;
    slug: string;
    image?: string;
    isActive?: boolean;
    parentId?: string;
}
import { CreateCategoryDto } from './create-category.dto';
declare const UpdateCategoryDto_base: any;
export declare class UpdateCategoryDto extends UpdateCategoryDto_base {
}
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class FindCategoriesDto extends PaginationDto {
    name?: string;
    parentId?: string;
    isActive?: boolean;
}
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FindCategoriesDto } from './dto/find-categories.dto';
import { Category } from '@prisma/client';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAll(params: FindCategoriesDto): Promise<PaginatedResult<Category>>;
    findOne(id: string): Promise<Category>;
    findBySlug(slug: string): Promise<Category>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    remove(id: string): Promise<Category>;
    getTree(): Promise<Category[]>;
}
import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): any;
    findAll(findCategoriesDto: FindCategoriesDto): any;
    getTree(): any;
    findOne(id: string): any;
    findBySlug(slug: string): any;
    update(id: string, updateCategoryDto: UpdateCategoryDto): any;
    remove(id: string): any;
}
export declare class CategoriesModule {
}
export declare class CreateProductDto {
    name: string;
    description?: string;
    slug: string;
    price: number;
    sku: string;
    stock?: number;
    images?: string[];
    isActive?: boolean;
    categoryId: string;
}
import { CreateProductDto } from './create-product.dto';
declare const UpdateProductDto_base: any;
export declare class UpdateProductDto extends UpdateProductDto_base {
}
export declare class FindProductsDto extends PaginationDto {
    name?: string;
    minPrice?: number;
    maxPrice?: number;
    categoryId?: string;
    isActive?: boolean;
    sort?: string;
    categoryIds?: string[];
}
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { Product } from '@prisma/client';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(params: FindProductsDto): Promise<PaginatedResult<Product>>;
    findOne(id: string): Promise<Product>;
    findBySlug(slug: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<Product>;
    findByCategoryId(categoryId: string, params: FindProductsDto): Promise<PaginatedResult<Product>>;
    findByCategorySlug(slug: string, params: FindProductsDto): Promise<PaginatedResult<Product>>;
    updateStock(id: string, quantity: number): Promise<Product>;
}
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): any;
    findAll(findProductsDto: FindProductsDto): any;
    findOne(id: string): any;
    findBySlug(slug: string): any;
    findByCategoryId(categoryId: string, findProductsDto: FindProductsDto): any;
    findByCategorySlug(slug: string, findProductsDto: FindProductsDto): any;
    update(id: string, updateProductDto: UpdateProductDto): any;
    updateStock(id: string, quantity: number): any;
    remove(id: string): any;
}
export declare class ProductsModule {
}
export {};
