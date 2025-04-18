"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PrismaService_1, ProductService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformInterceptor = exports.ProductController = exports.ProductService = exports.ProductEntity = exports.CreateProductDto = exports.PrismaService = exports.PrismaModule = exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_controller_1 = require("./product.controller");
Object.defineProperty(exports, "ProductController", { enumerable: true, get: function () { return product_controller_1.ProductController; } });
const product_service_1 = require("./product.service");
Object.defineProperty(exports, "ProductService", { enumerable: true, get: function () { return product_service_1.ProductService; } });
const prisma_module_1 = require("../prisma/prisma.module");
Object.defineProperty(exports, "PrismaModule", { enumerable: true, get: function () { return prisma_module_1.PrismaModule; } });
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService],
        exports: [product_service_1.ProductService],
    })
], ProductModule);
const common_2 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
Object.defineProperty(exports, "PrismaService", { enumerable: true, get: function () { return prisma_service_1.PrismaService; } });
let PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = prisma_module_1.PrismaModule = __decorate([
    (0, common_2.Global)(),
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], prisma_module_1.PrismaModule);
const common_3 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const common_4 = require("@nestjs/common");
let PrismaService = PrismaService_1 = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super({
            log: [
                { emit: 'event', level: 'query' },
                { emit: 'stdout', level: 'info' },
                { emit: 'stdout', level: 'warn' },
                { emit: 'stdout', level: 'error' },
            ],
        });
        this.logger = new common_4.Logger(PrismaService_1.name);
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
};
exports.PrismaService = PrismaService;
exports.PrismaService = prisma_service_1.PrismaService = PrismaService_1 = __decorate([
    (0, common_3.Injectable)(),
    __metadata("design:paramtypes", [])
], prisma_service_1.PrismaService);
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateProductDto {
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product name', example: 'Smartphone X1' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], create_product_dto_1.CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product description', example: 'Latest smartphone with advanced features' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], create_product_dto_1.CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product price', example: 999.99 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], create_product_dto_1.CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Available stock', example: 50 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], create_product_dto_1.CreateProductDto.prototype, "stock", void 0);
class ProductEntity {
}
exports.ProductEntity = ProductEntity;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], product_entity_1.ProductEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], product_entity_1.ProductEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], product_entity_1.ProductEntity.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], product_entity_1.ProductEntity.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], product_entity_1.ProductEntity.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], product_entity_1.ProductEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], product_entity_1.ProductEntity.prototype, "updatedAt", void 0);
const common_5 = require("@nestjs/common");
const create_product_dto_1 = require("./dto/create-product.dto");
const client_2 = require("@prisma/client");
const perf_hooks_1 = require("perf_hooks");
let ProductService = ProductService_1 = class ProductService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_4.Logger(ProductService_1.name);
    }
    async create(createProductDto) {
        const startTime = perf_hooks_1.performance.now();
        try {
            const product = await this.prisma.product.create({
                data: createProductDto,
            });
            const duration = Math.round(perf_hooks_1.performance.now() - startTime);
            this.logger.log(`Product created with ID: ${product.id} in ${duration}ms`);
            return product;
        }
        catch (error) {
            this.logger.error(`Failed to create product: ${error.message}`);
            throw error;
        }
    }
    async findAll() {
        try {
            return await this.prisma.product.findMany({
                orderBy: { createdAt: 'desc' },
            });
        }
        catch (error) {
            this.logger.error(`Failed to fetch products: ${error.message}`);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id },
            });
            if (!product) {
                throw new common_5.NotFoundException(`Product with ID ${id} not found`);
            }
            return product;
        }
        catch (error) {
            this.logger.error(`Failed to fetch product ${id}: ${error.message}`);
            throw error;
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = product_service_1.ProductService = ProductService_1 = __decorate([
    (0, common_3.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], product_service_1.ProductService);
const common_6 = require("@nestjs/common");
const swagger_2 = require("@nestjs/swagger");
const product_entity_1 = require("./entities/product.entity");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async create(createProductDto) {
        return this.productService.create(createProductDto);
    }
    async findAll() {
        return this.productService.findAll();
    }
    async findOne(id) {
        return this.productService.findOne(id);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_6.Kataapp)(),
    (0, swagger_2.ApiOperation)({ summary: 'Create a new product' }),
    (0, swagger_2.ApiResponse)({
        status: common_6.HttpStatus.CREATED,
        description: 'The product has been successfully created',
        type: product_entity_1.ProductEntity
    }),
    (0, swagger_2.ApiResponse)({ status: common_6.HttpStatus.BAD_REQUEST, description: 'Invalid input data' }),
    __param(0, (0, common_6.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_product_dto_1.CreateProductDto !== "undefined" && create_product_dto_1.CreateProductDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], product_controller_1.ProductController.prototype, "create", null);
__decorate([
    (0, common_6.Get)(),
    (0, swagger_2.ApiOperation)({ summary: 'Get all products' }),
    (0, swagger_2.ApiResponse)({
        status: common_6.HttpStatus.OK,
        description: 'Return all products',
        type: [product_entity_1.ProductEntity]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], product_controller_1.ProductController.prototype, "findAll", null);
__decorate([
    (0, common_6.Get)(':id'),
    (0, swagger_2.ApiOperation)({ summary: 'Get product by ID' }),
    (0, swagger_2.ApiParam)({ name: 'id', type: 'number', description: 'Product ID' }),
    (0, swagger_2.ApiResponse)({
        status: common_6.HttpStatus.OK,
        description: 'Return the product',
        type: product_entity_1.ProductEntity
    }),
    (0, swagger_2.ApiResponse)({ status: common_6.HttpStatus.NOT_FOUND, description: 'Product not found' }),
    __param(0, (0, common_6.Param)('id', common_6.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], product_controller_1.ProductController.prototype, "findOne", null);
exports.ProductController = product_controller_1.ProductController = __decorate([
    (0, swagger_2.ApiTags)('products'),
    (0, common_6.Controller)('products'),
    (0, common_6.UseInterceptors)(common_6.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [typeof (_b = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _b : Object])
], product_controller_1.ProductController);
const operators_1 = require("rxjs/operators");
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)(data => ({
            data,
            meta: {
                timestamp: new Date().toISOString(),
                status: 'success',
            }
        })));
    }
};
exports.TransformInterceptor = TransformInterceptor;
exports.TransformInterceptor = transform_interceptor_1.TransformInterceptor = __decorate([
    (0, common_3.Injectable)()
], transform_interceptor_1.TransformInterceptor);
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_7 = require("@nestjs/common");
const swagger_3 = require("@nestjs/swagger");
const transform_interceptor_1 = require("./interceptors/transform.interceptor");
Object.defineProperty(exports, "TransformInterceptor", { enumerable: true, get: function () { return transform_interceptor_1.TransformInterceptor; } });
const compression = require("compression");
const helmet_1 = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log', 'debug'],
    });
    const logger = new common_4.Logger('Bootstrap');
    app.use((0, helmet_1.default)());
    app.use(compression());
    app.enableCors();
    app.useGlobalPipes(new common_7.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true,
        }
    }));
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    const config = new swagger_3.DocumentBuilder()
        .setTitle('Products API')
        .setDescription('Product management API')
        .setVersion('1.0')
        .addTag('products')
        .build();
    const document = swagger_3.SwaggerModule.createDocument(app, config);
    swagger_3.SwaggerModule.setup('api', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
generator;
client;
{
    provider = "prisma-client-js";
}
datasource;
db;
{
    provider = "kataappgresql";
    url = env("DATABASE_URL");
}
model;
client_2.Product;
{
    id;
    Int;
    (autoincrement());
    name;
    String;
    description;
    String ? 
        :
    ;
    price;
    Float;
    stock;
    Int;
    createdAt;
    DateTime;
    (now());
    updatedAt;
    DateTime;
}
//# sourceMappingURL=post_mau.js.map