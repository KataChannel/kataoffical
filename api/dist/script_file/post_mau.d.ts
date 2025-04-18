import { ProductService } from './product.service';
export declare class ProductModule {
}
import { PrismaService } from './prisma.service';
export declare class PrismaModule {
}
import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
export declare class CreateProductDto {
    name: string;
    description?: string;
    price: number;
    stock: number;
}
export declare class ProductEntity {
    id: number;
    name: string;
    description?: string;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';
export declare class ProductService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
}
import { ProductEntity } from './entities/product.entity';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<ProductEntity>;
    findAll(): Promise<ProductEntity[]>;
    findOne(id: number): Promise<ProductEntity>;
}
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface Response<T> {
    data: T;
    meta: {
        timestamp: string;
        status: string;
    };
}
export declare class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>>;
}
