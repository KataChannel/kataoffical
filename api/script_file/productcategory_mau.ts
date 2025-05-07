// prisma/schema.prisma
generator client {
    provider = "prisma-client-js"
  }
  
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  
  model Category {
    id          String    @id @default(uuid())
    name        String
    description String?
    slug        String    @unique
    image       String?
    isActive    Boolean   @default(true)
    parentId    String?
    parent      Category? @relation("CategoryToCategory", fields: [parentId], references: [id], onDelete: SetNull)
    children    Category[] @relation("CategoryToCategory")
    products    Product[]
    createdAt   DateTime  @default(now())
    updatedAt   DateTime  @updatedAt
  
    @@index([name])
    @@index([slug])
    @@index([parentId])
  }
  
  model Product {
    id          String       @id @default(uuid())
    name        String
    description String?
    slug        String       @unique
    price       Decimal      @db.Decimal(10, 2)
    sku         String       @unique
    stock       Int          @default(0)
    images      String[]
    isActive    Boolean      @default(true)
    categoryId  String
    category    Category     @relation(fields: [categoryId], references: [id])
    createdAt   DateTime     @default(now())
    updatedAt   DateTime     @updatedAt
  
    @@index([name])
    @@index([slug])
    @@index([categoryId])
    @@index([price])
    @@index([sku])
  }
  
  // src/common/dto/pagination.dto.ts
  import { ApiProperty } from '@nestjs/swagger';
  import { IsInt, IsOptional, Max, Min } from 'class-validator';
  import { Type } from 'class-transformer';
  export class PaginationDto {
    @ApiProperty({
      description: 'Page number (1-based)',
      default: 1,
      required: false,
    })
    @IsInt()
    @Min(1)
    @IsOptional()
    @Type(() => Number)
    page?: number = 1;
  
    @ApiProperty({
      description: 'Items per page',
      default: 10,
      required: false,
    })
    @IsInt()
    @Min(1)
    @Max(100)
    @IsOptional()
    @Type(() => Number)
    limit?: number = 10;
  }
  
  // src/common/interfaces/paginated-result.interface.ts
  export interface PaginatedResult<T> {
    data: T[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }
  
  // src/common/interceptors/transform.interceptor.ts
  import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  export interface Response<T> {
    data: T;
    meta?: Record<string, any>;
    message?: string;
  }
  
  @Injectable()
  export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>> {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<Response<T>> {
      return next.handle().pipe(
        map((data) => {
          // Check if data already has the expected structure
          if (data && data.data !== undefined) {
            return data;
          }
          // Transform to standard response format
          return {
            data,
            meta: {},
            message: 'Success',
          };
        }),
      );
    }
  }
  
  // src/common/filters/prisma-exception.filter.ts
  import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
  } from '@nestjs/common';
  import { Prisma } from '@prisma/client';
  import { Response } from 'express';
  
  @Catch(Prisma.PrismaClientKnownRequestError)
  export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';
      
      switch (exception.code) {
        case 'P2002': // Unique constraint violation
          status = HttpStatus.CONFLICT;
          message = `Duplicate value for: ${exception.meta?.target}`;
          break;
        case 'P2025': // Record not found
          status = HttpStatus.NOT_FOUND;
          message = 'Record not found';
          break;
        case 'P2003': // Foreign key constraint failed
          status = HttpStatus.BAD_REQUEST;
          message = 'Related record not found';
          break;
      }
      
      response.status(status).json({
        statusCode: status,
        message,
        error: exception.name,
      });
    }
  }
  
  // src/prisma/prisma.service.ts
  import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
  import { PrismaClient } from '@prisma/client';
  
  @Injectable()
  export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
      super({
        log: process.env.NODE_ENV === 'development' 
          ? ['query', 'info', 'warn', 'error'] 
          : ['error'],
      });
    }
  
    async onModuleInit() {
      await this.$connect();
    }
  
    async enableShutdownHooks(app: INestApplication) {
      this.$on('beforeExit', async () => {
        await app.close();
      });
    }
  }
  
  // src/prisma/prisma.module.ts
  import { Global, Module } from '@nestjs/common';
  import { PrismaService } from './prisma.service';
  
  @Global()
  @Module({
    providers: [PrismaService],
    exports: [PrismaService],
  })
  export class PrismaModule {}
  
  // src/categories/dto/create-category.dto.ts
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  import { IsBoolean, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
  
  export class CreateCategoryDto {
    @ApiProperty({ description: 'Category name', example: 'Electronics' })
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name: string;
  
    @ApiPropertyOptional({ description: 'Category description', example: 'Electronic devices and accessories' })
    @IsString()
    @IsOptional()
    @MaxLength(500)
    description?: string;
  
    @ApiProperty({ description: 'Category slug', example: 'electronics' })
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    slug: string;
  
    @ApiPropertyOptional({ description: 'Category image URL', example: 'https://example.com/images/electronics.jpg' })
    @IsString()
    @IsOptional()
    image?: string;
  
    @ApiPropertyOptional({ description: 'Is category active', default: true })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
  
    @ApiPropertyOptional({ description: 'Parent category ID', example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsUUID()
    @IsOptional()
    parentId?: string;
  }
  
  // src/categories/dto/update-category.dto.ts
  import { PartialType } from '@nestjs/swagger';
  import { CreateCategoryDto } from './create-category.dto';
  
  export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
  
  // src/categories/dto/find-categories.dto.ts
  import { ApiPropertyOptional } from '@nestjs/swagger';
  import { IsBoolean, IsOptional, IsString } from 'class-validator';
  import { Type } from 'class-transformer';
  import { PaginationDto } from '../../common/dto/pagination.dto';
  
  export class FindCategoriesDto extends PaginationDto {
    @ApiPropertyOptional({ description: 'Filter by name', example: 'Electronics' })
    @IsString()
    @IsOptional()
    name?: string;
  
    @ApiPropertyOptional({ description: 'Filter by parent ID', example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsString()
    @IsOptional()
    parentId?: string;
  
    @ApiPropertyOptional({ description: 'Filter by active status', example: true })
    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    isActive?: boolean;
  }
  
  // src/categories/categories.service.ts
  import { Injectable, NotFoundException } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import { CreateCategoryDto } from './dto/create-category.dto';
  import { UpdateCategoryDto } from './dto/update-category.dto';
  import { FindCategoriesDto } from './dto/find-categories.dto';
  import { Category } from '@prisma/client';
  import { PaginatedResult } from '../common/interfaces/paginated-result.interface';
  
  @Injectable()
  export class CategoriesService {
    constructor(private prisma: PrismaService) {}
  
    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
      return this.prisma.category.create({
        data: createCategoryDto,
      });
    }
  
    async findAll(params: FindCategoriesDto): Promise<PaginatedResult<Category>> {
      const { page = 1, limit = 10, name, parentId, isActive } = params;
      const skip = (page - 1) * limit;
  
      const where = {
        ...(name && { name: { contains: name, mode: 'insensitive' as const } }),
        ...(parentId !== undefined && { parentId }),
        ...(isActive !== undefined && { isActive }),
      };
  
      const [total, data] = await Promise.all([
        this.prisma.category.count({ where }),
        this.prisma.category.findMany({
          where,
          skip,
          take: limit,
          orderBy: { name: 'asc' },
          include: {
            parent: { select: { id: true, name: true } },
            _count: { select: { products: true, children: true } },
          },
        }),
      ]);
  
      const totalPages = Math.ceil(total / limit);
  
      return {
        data,
        meta: {
          total,
          page,
          limit,
          totalPages,
        },
      };
    }
  
    async findOne(id: string): Promise<Category> {
      const category = await this.prisma.category.findUnique({
        where: { id },
        include: {
          parent: { select: { id: true, name: true } },
          children: { select: { id: true, name: true } },
          _count: { select: { products: true } },
        },
      });
  
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
  
      return category;
    }
  
    async findBySlug(slug: string): Promise<Category> {
      const category = await this.prisma.category.findUnique({
        where: { slug },
        include: {
          parent: { select: { id: true, name: true } },
          children: { select: { id: true, name: true } },
          _count: { select: { products: true } },
        },
      });
  
      if (!category) {
        throw new NotFoundException(`Category with slug ${slug} not found`);
      }
  
      return category;
    }
  
    async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
      await this.findOne(id); // Ensure category exists
  
      return this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      });
    }
  
    async remove(id: string): Promise<Category> {
      await this.findOne(id); // Ensure category exists
  
      return this.prisma.category.delete({
        where: { id },
      });
    }
  
    async getTree(): Promise<Category[]> {
      // Get all root categories (those without a parent)
      return this.prisma.category.findMany({
        where: { parentId: null },
        include: {
          children: {
            include: {
              children: true,
            },
          },
        },
      });
    }
  }
  
  // src/categories/categories.controller.ts
  import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseUUIDPipe,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { CategoriesService } from './categories.service';
  import { CreateCategoryDto } from './dto/create-category.dto';
  import { UpdateCategoryDto } from './dto/update-category.dto';
  import { FindCategoriesDto } from './dto/find-categories.dto';
  import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
  
  @ApiTags('categories')
  @Controller('categories')
  export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({ status: 201, description: 'Category successfully created' })
    create(@Body() createCategoryDto: CreateCategoryDto) {
      return this.categoriesService.create(createCategoryDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all categories with pagination and filters' })
    @ApiResponse({ status: 200, description: 'List of categories' })
    findAll(@Query() findCategoriesDto: FindCategoriesDto) {
      return this.categoriesService.findAll(findCategoriesDto);
    }
  
    @Get('tree')
    @ApiOperation({ summary: 'Get category tree hierarchy' })
    @ApiResponse({ status: 200, description: 'Category tree' })
    getTree() {
      return this.categoriesService.getTree();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a category by ID' })
    @ApiResponse({ status: 200, description: 'Category found' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
      return this.categoriesService.findOne(id);
    }
  
    @Get('slug/:slug')
    @ApiOperation({ summary: 'Get a category by slug' })
    @ApiResponse({ status: 200, description: 'Category found' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    findBySlug(@Param('slug') slug: string) {
      return this.categoriesService.findBySlug(slug);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Update a category' })
    @ApiResponse({ status: 200, description: 'Category successfully updated' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
      return this.categoriesService.update(id, updateCategoryDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a category' })
    @ApiResponse({ status: 204, description: 'Category successfully deleted' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    remove(@Param('id', ParseUUIDPipe) id: string) {
      return this.categoriesService.remove(id);
    }
  }
  
  // src/categories/categories.module.ts
  import { Module } from '@nestjs/common';
  import { CategoriesService } from './categories.service';
  import { CategoriesController } from './categories.controller';
  import { PrismaModule } from '../prisma/prisma.module';
  
  @Module({
    imports: [PrismaModule],
    controllers: [CategoriesController],
    providers: [CategoriesService],
    exports: [CategoriesService],
  })
  export class CategoriesModule {}
  
  // src/products/dto/create-product.dto.ts
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  import { Type } from 'class-transformer';
  import { IsArray, IsBoolean, IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min, MinLength } from 'class-validator';
  
  export class CreateProductDto {
    @ApiProperty({ description: 'Product name', example: 'iPhone 15 Pro' })
    @IsString()
    @MinLength(2)
    @MaxLength(200)
    name: string;
  
    @ApiPropertyOptional({ description: 'Product description', example: 'Latest iPhone with A17 Pro chip' })
    @IsString()
    @IsOptional()
    @MaxLength(2000)
    description?: string;
  
    @ApiProperty({ description: 'Product slug', example: 'iphone-15-pro' })
    @IsString()
    @MinLength(2)
    @MaxLength(200)
    slug: string;
  
    @ApiProperty({ description: 'Product price', example: 999.99 })
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @Type(() => Number)
    price: number;
  
    @ApiProperty({ description: 'Product SKU', example: 'IPHONE15PRO-128-BLACK' })
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    sku: string;
  
    @ApiPropertyOptional({ description: 'Product stock quantity', example: 100, default: 0 })
    @IsInt()
    @Min(0)
    @IsOptional()
    @Type(() => Number)
    stock?: number;
  
    @ApiPropertyOptional({ description: 'Product images URLs', example: ['https://example.com/image1.jpg'] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    images?: string[];
  
    @ApiPropertyOptional({ description: 'Is product active', default: true })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
  
    @ApiProperty({ description: 'Category ID', example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsUUID()
    categoryId: string;
  }
  
  // src/products/dto/update-product.dto.ts
  import { PartialType } from '@nestjs/swagger';
  import { CreateProductDto } from './create-product.dto';
  
  export class UpdateProductDto extends PartialType(CreateProductDto) {}
  
  // src/products/dto/find-products.dto.ts
  import { ApiPropertyOptional } from '@nestjs/swagger';
  import { Transform, Type } from 'class-transformer';
  import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
  import { PaginationDto } from '../../common/dto/pagination.dto';
  
  export class FindProductsDto extends PaginationDto {
    @ApiPropertyOptional({ description: 'Filter by name', example: 'iPhone' })
    @IsString()
    @IsOptional()
    name?: string;
  
    @ApiPropertyOptional({ description: 'Filter by minimum price', example: 100 })
    @IsNumber()
    @Min(0)
    @IsOptional()
    @Type(() => Number)
    minPrice?: number;
  
    @ApiPropertyOptional({ description: 'Filter by maximum price', example: 1000 })
    @IsNumber()
    @Min(0)
    @IsOptional()
    @Type(() => Number)
    maxPrice?: number;
  
    @ApiPropertyOptional({ description: 'Filter by category ID', example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsUUID()
    @IsOptional()
    categoryId?: string;
  
    @ApiPropertyOptional({ description: 'Filter by active status', example: true })
    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    isActive?: boolean;
  
    @ApiPropertyOptional({ 
      description: 'Sort by field and direction', 
      example: 'price:desc',
      default: 'createdAt:desc' 
    })
    @IsString()
    @IsOptional()
    sort?: string = 'createdAt:desc';
  
    @ApiPropertyOptional({ 
      description: 'Filter by multiple category IDs', 
      example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174001'] 
    })
    @IsArray()
    @IsUUID(undefined, { each: true })
    @IsOptional()
    @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
    categoryIds?: string[];
  }
  
  // src/products/products.service.ts
  import { Injectable, NotFoundException } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import { CreateProductDto } from './dto/create-product.dto';
  import { UpdateProductDto } from './dto/update-product.dto';
  import { FindProductsDto } from './dto/find-products.dto';
  import { Product, Prisma } from '@prisma/client';
  import { PaginatedResult } from '../common/interfaces/paginated-result.interface';
  
  @Injectable()
  export class ProductsService {
    constructor(private prisma: PrismaService) {}
  
    async create(createProductDto: CreateProductDto): Promise<Product> {
      return this.prisma.product.create({
        data: createProductDto,
      });
    }
  
    async findAll(params: FindProductsDto): Promise<PaginatedResult<Product>> {
      const { 
        page = 1, 
        limit = 10, 
        name, 
        minPrice, 
        maxPrice, 
        categoryId, 
        categoryIds, 
        isActive,
        sort = 'createdAt:desc'
      } = params;
      
      const skip = (page - 1) * limit;
      
      // Parse sort parameter (field:direction)
      const [sortField, sortDirection] = sort.split(':');
      const orderBy = {
        [sortField || 'createdAt']: (sortDirection || 'desc').toLowerCase() as 'asc' | 'desc',
      };
  
      // Build where condition
      const where: Prisma.ProductWhereInput = {
        ...(name && { name: { contains: name, mode: 'insensitive' } }),
        ...(minPrice !== undefined && { price: { gte: minPrice } }),
        ...(maxPrice !== undefined && { price: { lte: maxPrice } }),
        ...(isActive !== undefined && { isActive }),
        ...(categoryId && { categoryId }),
        ...(categoryIds?.length && { categoryId: { in: categoryIds } }),
      };
  
      const [total, data] = await Promise.all([
        this.prisma.product.count({ where }),
        this.prisma.product.findMany({
          where,
          skip,
          take: limit,
          orderBy,
          include: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        }),
      ]);
  
      const totalPages = Math.ceil(total / limit);
  
      return {
        data,
        meta: {
          total,
          page,
          limit,
          totalPages,
        },
      };
    }
  
    async findOne(id: string): Promise<Product> {
      const product = await this.prisma.product.findUnique({
        where: { id },
        include: {
          category: true,
        },
      });
  
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
  
      return product;
    }
  
    async findBySlug(slug: string): Promise<Product> {
      const product = await this.prisma.product.findUnique({
        where: { slug },
        include: {
          category: true,
        },
      });
  
      if (!product) {
        throw new NotFoundException(`Product with slug ${slug} not found`);
      }
  
      return product;
    }
  
    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
      await this.findOne(id); // Ensure product exists
  
      return this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });
    }
  
    async remove(id: string): Promise<Product> {
      await this.findOne(id); // Ensure product exists
  
      return this.prisma.product.delete({
        where: { id },
      });
    }
  
    async findByCategoryId(categoryId: string, params: FindProductsDto): Promise<PaginatedResult<Product>> {
      return this.findAll({
        ...params,
        categoryId,
      });
    }
  
    async findByCategorySlug(slug: string, params: FindProductsDto): Promise<PaginatedResult<Product>> {
      const category = await this.prisma.category.findUnique({
        where: { slug },
        select: { id: true },
      });
  
      if (!category) {
        throw new NotFoundException(`Category with slug ${slug} not found`);
      }
  
      return this.findAll({
        ...params,
        categoryId: category.id,
      });
    }
  
    async updateStock(id: string, quantity: number): Promise<Product> {
      const product = await this.findOne(id);
      
      if (product.stock + quantity < 0) {
        throw new Error(`Not enough stock for product ${id}`);
      }
  
      return this.prisma.product.update({
        where: { id },
        data: {
          stock: {
            increment: quantity,
          },
        },
      });
    }
  }
  
  // src/products/products.controller.ts
  import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseUUIDPipe,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { ProductsService } from './products.service';
  import { CreateProductDto } from './dto/create-product.dto';
  import { UpdateProductDto } from './dto/update-product.dto';
  import { FindProductsDto } from './dto/find-products.dto';
  import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
  
  @ApiTags('products')
  @Controller('products')
  export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'Product successfully created' })
    create(@Body() createProductDto: CreateProductDto) {
      return this.productsService.create(createProductDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all products with pagination and filters' })
    @ApiResponse({ status: 200, description: 'List of products' })
    findAll(@Query() findProductsDto: FindProductsDto) {
      return this.productsService.findAll(findProductsDto);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a product by ID' })
    @ApiResponse({ status: 200, description: 'Product found' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
      return this.productsService.findOne(id);
    }
  
    @Get('slug/:slug')
    @ApiOperation({ summary: 'Get a product by slug' })
    @ApiResponse({ status: 200, description: 'Product found' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    findBySlug(@Param('slug') slug: string) {
      return this.productsService.findBySlug(slug);
    }
  
    @Get('category/:categoryId')
    @ApiOperation({ summary: 'Get products by category ID' })
    @ApiResponse({ status: 200, description: 'List of products' })
    findByCategoryId(
      @Param('categoryId', ParseUUIDPipe) categoryId: string,
      @Query() findProductsDto: FindProductsDto,
    ) {
      return this.productsService.findByCategoryId(categoryId, findProductsDto);
    }
  
    @Get('category/slug/:slug')
    @ApiOperation({ summary: 'Get products by category slug' })
    @ApiResponse({ status: 200, description: 'List of products' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    findByCategorySlug(
      @Param('slug') slug: string,
      @Query() findProductsDto: FindProductsDto,
    ) {
      return this.productsService.findByCategorySlug(slug, findProductsDto);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Update a product' })
    @ApiResponse({ status: 200, description: 'Product successfully updated' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateProductDto: UpdateProductDto,
    ) {
      return this.productsService.update(id, updateProductDto);
    }
  
    @Patch(':id/stock/:quantity')
    @ApiOperation({ summary: 'Update product stock' })
    @ApiResponse({ status: 200, description: 'Stock successfully updated' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    updateStock(
      @Param('id', ParseUUIDPipe) id: string,
      @Param('quantity') quantity: number,
    ) {
      return this.productsService.updateStock(id, +quantity);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a product' })
    @ApiResponse({ status: 204, description: 'Product successfully deleted' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    remove(@Param('id', ParseUUIDPipe) id: string) {
      return this.productsService.remove(id);
    }
  }
  
  // src/products/products.module.ts
  import { Module } from '@nestjs/common';
  import { ProductsService } from './products.service';
  import { ProductsController } from './products.controller';
  import { PrismaModule } from '../prisma/prisma.module';
  
  @Module({
    imports: [PrismaModule],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [ProductsService],
  })
  export class ProductsModule {}
  
  // src/app.module.ts
  import { Module } from '@nestjs/common';