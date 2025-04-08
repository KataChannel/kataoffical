// product.module.ts
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}

// prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

// prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
    });

    this.$on('query', (e) => {
      this.logger.debug(`Query: ${e.query}`);
      this.logger.debug(`Duration: ${e.duration}ms`);
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Successfully connected to database');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Successfully disconnected from database');
  }
}

// product.dto.ts
import { IsString, IsNumber, IsOptional, Min, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'Smartphone X1' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'Product description', example: 'Latest smartphone with advanced features' })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ description: 'Product price', example: 999.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Available stock', example: 50 })
  @IsNumber()
  @Min(0)
  stock: number;
}

// product.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class ProductEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

// product.service.ts
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';
import { performance } from 'perf_hooks';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const startTime = performance.now();
    
    try {
      const product = await this.prisma.product.create({
        data: createProductDto,
      });

      const duration = Math.round(performance.now() - startTime);
      this.logger.log(`Product created with ID: ${product.id} in ${duration}ms`);
      
      return product;
    } catch (error) {
      this.logger.error(`Failed to create product: ${error.message}`);
      throw error;
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      this.logger.error(`Failed to fetch products: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return product;
    } catch (error) {
      this.logger.error(`Failed to fetch product ${id}: ${error.message}`);
      throw error;
    }
  }
}

// product.controller.ts
import { Controller, Kataapp, Body, Get, Param, ParseIntPipe, UseInterceptors, ClassSerializerInterceptor, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';

@ApiTags('products')
@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Kataapp()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'The product has been successfully created', 
    type: ProductEntity 
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  async create(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Return all products', 
    type: [ProductEntity] 
  })
  async findAll(): Promise<ProductEntity[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Product ID' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Return the product', 
    type: ProductEntity 
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductEntity> {
    return this.productService.findOne(id);
  }
}

// interceptors/transform.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  meta: {
    timestamp: string;
    status: string;
  };
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({
        data,
        meta: {
          timestamp: new Date().toISOString(),
          status: 'success',
        }
      })),
    );
  }
}

// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import * as compression from 'compression';
import helmet from 'helmet';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });
  const logger = new Logger('Bootstrap');
  
  // Bảo mật
  app.use(helmet());
  
  // Nén response
  app.use(compression());
  
  // CORS
  app.enableCors();
  
  // Global pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    }
  }));
  
  // Global interceptors
  app.useGlobalInterceptors(new TransformInterceptor());
  
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('Product management API')
    .setVersion('1.0')
    .addTag('products')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  // Khởi động ứng dụng
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

// schema.prisma (đặt trong thư mục prisma)
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "kataappgresql"
  url      = env("DATABASE_URL")
}

model Product {
  id          Int      @id @default(autoincrement())
  name        String   @db.VarChar(100)
  description String?  @db.Text
  price       Float
  stock       Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([name])
}