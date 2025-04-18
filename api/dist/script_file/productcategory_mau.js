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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = exports.ProductsController = exports.ProductsService = exports.FindProductsDto = exports.UpdateProductDto = exports.CreateProductDto = exports.CategoriesModule = exports.CategoriesController = exports.CategoriesService = exports.FindCategoriesDto = exports.UpdateCategoryDto = exports.CreateCategoryDto = exports.PrismaModule = exports.PrismaService = exports.PrismaExceptionFilter = exports.TransformInterceptor = exports.PaginationDto = void 0;
generator;
client;
{
    provider = "prisma-client-js";
}
datasource;
db;
{
    provider = "postgresql";
    url = env("DATABASE_URL");
}
model;
client_3.Category;
{
    id;
    String;
    (uuid());
    name;
    String;
    description;
    String ?
        slug : ;
    String;
    image;
    String ?
        isActive : ;
    Boolean;
    (true);
    parentId;
    String ?
        parent : ;
    client_3.Category ? 
        :
    ;
    children;
    client_3.Category[];
    products;
    client_4.Product[];
    createdAt;
    DateTime;
    (now());
    updatedAt;
    DateTime;
}
model;
client_4.Product;
{
    id;
    String;
    (uuid());
    name;
    String;
    description;
    String ?
        slug : ;
    String;
    price;
    Decimal;
    sku;
    String;
    stock;
    Int;
    (0);
    images;
    String[];
    isActive;
    Boolean;
    (true);
    categoryId;
    String;
    category;
    client_3.Category;
    createdAt;
    DateTime;
    (now());
    updatedAt;
    DateTime;
}
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class PaginationDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
}
exports.PaginationDto = PaginationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Page number (1-based)',
        default: 1,
        required: false,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], pagination_dto_1.PaginationDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Items per page',
        default: 10,
        required: false,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], pagination_dto_1.PaginationDto.prototype, "limit", void 0);
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => {
            if (data && data.data !== undefined) {
                return data;
            }
            return {
                data,
                meta: {},
                message: 'Success',
            };
        }));
    }
};
exports.TransformInterceptor = TransformInterceptor;
exports.TransformInterceptor = TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);
const common_2 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let PrismaExceptionFilter = class PrismaExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status = common_2.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        switch (exception.code) {
            case 'P2002':
                status = common_2.HttpStatus.CONFLICT;
                message = `Duplicate value for: ${exception.meta?.target}`;
                break;
            case 'P2025':
                status = common_2.HttpStatus.NOT_FOUND;
                message = 'Record not found';
                break;
            case 'P2003':
                status = common_2.HttpStatus.BAD_REQUEST;
                message = 'Related record not found';
                break;
        }
        response.status(status).json({
            statusCode: status,
            message,
            error: exception.name,
        });
    }
};
exports.PrismaExceptionFilter = PrismaExceptionFilter;
exports.PrismaExceptionFilter = PrismaExceptionFilter = __decorate([
    (0, common_2.Catch)(client_1.Prisma.PrismaClientKnownRequestError)
], PrismaExceptionFilter);
const client_2 = require("@prisma/client");
let PrismaService = class PrismaService extends client_2.PrismaClient {
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
    async enableShutdownHooks(app) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = prisma_service_1.PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], prisma_service_1.PrismaService);
const common_3 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
Object.defineProperty(exports, "PrismaService", { enumerable: true, get: function () { return prisma_service_1.PrismaService; } });
let PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = prisma_module_1.PrismaModule = __decorate([
    (0, common_3.Global)(),
    (0, common_3.Module)({
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], prisma_module_1.PrismaModule);
const swagger_2 = require("@nestjs/swagger");
const class_validator_2 = require("class-validator");
class CreateCategoryDto {
}
exports.CreateCategoryDto = CreateCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Category name', example: 'Electronics' }),
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.MinLength)(2),
    (0, class_validator_2.MaxLength)(100),
    __metadata("design:type", String)
], create_category_dto_1.CreateCategoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ description: 'Category description', example: 'Electronic devices and accessories' }),
    (0, class_validator_2.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_2.MaxLength)(500),
    __metadata("design:type", String)
], create_category_dto_1.CreateCategoryDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Category slug', example: 'electronics' }),
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.MinLength)(2),
    (0, class_validator_2.MaxLength)(100),
    __metadata("design:type", String)
], create_category_dto_1.CreateCategoryDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ description: 'Category image URL', example: 'https://example.com/images/electronics.jpg' }),
    (0, class_validator_2.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], create_category_dto_1.CreateCategoryDto.prototype, "image", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ description: 'Is category active', default: true }),
    (0, class_validator_2.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], create_category_dto_1.CreateCategoryDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ description: 'Parent category ID', example: '123e4567-e89b-12d3-a456-426614174000' }),
    (0, class_validator_2.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], create_category_dto_1.CreateCategoryDto.prototype, "parentId", void 0);
const swagger_3 = require("@nestjs/swagger");
const create_category_dto_1 = require("./create-category.dto");
class UpdateCategoryDto extends (0, swagger_3.PartialType)(create_category_dto_1.CreateCategoryDto) {
}
exports.UpdateCategoryDto = UpdateCategoryDto;
const pagination_dto_1 = require("../../common/dto/pagination.dto");
class FindCategoriesDto extends pagination_dto_1.PaginationDto {
}
exports.FindCategoriesDto = FindCategoriesDto;
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ description: 'Filter by name', example: 'Electronics' }),
    (0, class_validator_2.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], find_categories_dto_1.FindCategoriesDto.prototype, "name", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ description: 'Filter by parent ID', example: '123e4567-e89b-12d3-a456-426614174000' }),
    (0, class_validator_2.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], find_categories_dto_1.FindCategoriesDto.prototype, "parentId", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ description: 'Filter by active status', example: true }),
    (0, class_validator_2.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], find_categories_dto_1.FindCategoriesDto.prototype, "isActive", void 0);
const common_4 = require("@nestjs/common");
const update_category_dto_1 = require("./dto/update-category.dto");
const find_categories_dto_1 = require("./dto/find-categories.dto");
const client_3 = require("@prisma/client");
let CategoriesService = class CategoriesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCategoryDto) {
        return this.prisma.category.create({
            data: createCategoryDto,
        });
    }
    async findAll(params) {
        const { page = 1, limit = 10, name, parentId, isActive } = params;
        const skip = (page - 1) * limit;
        const where = {
            ...(name && { name: { contains: name, mode: 'insensitive' } }),
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
    async findOne(id) {
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: {
                parent: { select: { id: true, name: true } },
                children: { select: { id: true, name: true } },
                _count: { select: { products: true } },
            },
        });
        if (!category) {
            throw new common_4.NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }
    async findBySlug(slug) {
        const category = await this.prisma.category.findUnique({
            where: { slug },
            include: {
                parent: { select: { id: true, name: true } },
                children: { select: { id: true, name: true } },
                _count: { select: { products: true } },
            },
        });
        if (!category) {
            throw new common_4.NotFoundException(`Category with slug ${slug} not found`);
        }
        return category;
    }
    async update(id, updateCategoryDto) {
        await this.findOne(id);
        return this.prisma.category.update({
            where: { id },
            data: updateCategoryDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.category.delete({
            where: { id },
        });
    }
    async getTree() {
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
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = categories_service_1.CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], categories_service_1.CategoriesService);
const common_5 = require("@nestjs/common");
const categories_service_1 = require("./categories.service");
Object.defineProperty(exports, "CategoriesService", { enumerable: true, get: function () { return categories_service_1.CategoriesService; } });
const swagger_4 = require("@nestjs/swagger");
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    create(createCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }
    findAll(findCategoriesDto) {
        return this.categoriesService.findAll(findCategoriesDto);
    }
    getTree() {
        return this.categoriesService.getTree();
    }
    findOne(id) {
        return this.categoriesService.findOne(id);
    }
    findBySlug(slug) {
        return this.categoriesService.findBySlug(slug);
    }
    update(id, updateCategoryDto) {
        return this.categoriesService.update(id, updateCategoryDto);
    }
    remove(id) {
        return this.categoriesService.remove(id);
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_5.Post)(),
    (0, swagger_4.ApiOperation)({ summary: 'Create a new category' }),
    (0, swagger_4.ApiResponse)({ status: 201, description: 'Category successfully created' }),
    __param(0, (0, common_5.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_category_dto_1.CreateCategoryDto !== "undefined" && create_category_dto_1.CreateCategoryDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], categories_controller_1.CategoriesController.prototype, "create", null);
__decorate([
    (0, common_5.Get)(),
    (0, swagger_4.ApiOperation)({ summary: 'Get all categories with pagination and filters' }),
    (0, swagger_4.ApiResponse)({ status: 200, description: 'List of categories' }),
    __param(0, (0, common_5.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof find_categories_dto_1.FindCategoriesDto !== "undefined" && find_categories_dto_1.FindCategoriesDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], categories_controller_1.CategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_5.Get)('tree'),
    (0, swagger_4.ApiOperation)({ summary: 'Get category tree hierarchy' }),
    (0, swagger_4.ApiResponse)({ status: 200, description: 'Category tree' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], categories_controller_1.CategoriesController.prototype, "getTree", null);
__decorate([
    (0, common_5.Get)(':id'),
    (0, swagger_4.ApiOperation)({ summary: 'Get a category by ID' }),
    (0, swagger_4.ApiResponse)({ status: 200, description: 'Category found' }),
    (0, swagger_4.ApiResponse)({ status: 404, description: 'Category not found' }),
    __param(0, (0, common_5.Param)('id', common_5.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], categories_controller_1.CategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_5.Get)('slug/:slug'),
    (0, swagger_4.ApiOperation)({ summary: 'Get a category by slug' }),
    (0, swagger_4.ApiResponse)({ status: 200, description: 'Category found' }),
    (0, swagger_4.ApiResponse)({ status: 404, description: 'Category not found' }),
    __param(0, (0, common_5.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], categories_controller_1.CategoriesController.prototype, "findBySlug", null);
__decorate([
    (0, common_5.Patch)(':id'),
    (0, swagger_4.ApiOperation)({ summary: 'Update a category' }),
    (0, swagger_4.ApiResponse)({ status: 200, description: 'Category successfully updated' }),
    (0, swagger_4.ApiResponse)({ status: 404, description: 'Category not found' }),
    __param(0, (0, common_5.Param)('id', common_5.ParseUUIDPipe)),
    __param(1, (0, common_5.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof update_category_dto_1.UpdateCategoryDto !== "undefined" && update_category_dto_1.UpdateCategoryDto) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], categories_controller_1.CategoriesController.prototype, "update", null);
__decorate([
    (0, common_5.Delete)(':id'),
    (0, common_5.HttpCode)(common_2.HttpStatus.NO_CONTENT),
    (0, swagger_4.ApiOperation)({ summary: 'Delete a category' }),
    (0, swagger_4.ApiResponse)({ status: 204, description: 'Category successfully deleted' }),
    (0, swagger_4.ApiResponse)({ status: 404, description: 'Category not found' }),
    __param(0, (0, common_5.Param)('id', common_5.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], categories_controller_1.CategoriesController.prototype, "remove", null);
exports.CategoriesController = categories_controller_1.CategoriesController = __decorate([
    (0, swagger_4.ApiTags)('categories'),
    (0, common_5.Controller)('categories'),
    __metadata("design:paramtypes", [typeof (_b = typeof categories_service_1.CategoriesService !== "undefined" && categories_service_1.CategoriesService) === "function" ? _b : Object])
], categories_controller_1.CategoriesController);
const categories_controller_1 = require("./categories.controller");
Object.defineProperty(exports, "CategoriesController", { enumerable: true, get: function () { return categories_controller_1.CategoriesController; } });
const prisma_module_1 = require("../prisma/prisma.module");
Object.defineProperty(exports, "PrismaModule", { enumerable: true, get: function () { return prisma_module_1.PrismaModule; } });
let CategoriesModule = class CategoriesModule {
};
exports.CategoriesModule = CategoriesModule;
exports.CategoriesModule = CategoriesModule = __decorate([
    (0, common_3.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [categories_controller_1.CategoriesController],
        providers: [categories_service_1.CategoriesService],
        exports: [categories_service_1.CategoriesService],
    })
], CategoriesModule);
const class_validator_3 = require("class-validator");
class CreateProductDto {
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product name', example: 'iPhone 15 Pro' }),
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.MinLength)(2),
    (0, class_validator_2.MaxLength)(200),
    __metadata("design:type", String)
], create_product_dto_1.CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ description: 'Product description', example: 'Latest iPhone with A17 Pro chip' }),
    (0, class_validator_2.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_2.MaxLength)(2000),
    __metadata("design:type", String)
], create_product_dto_1.CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product slug', example: 'iphone-15-pro' }),
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.MinLength)(2),
    (0, class_validator_2.MaxLength)(200),
    __metadata("design:type", String)
], create_product_dto_1.CreateProductDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product price', example: 999.99 }),
    (0, class_validator_3.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], create_product_dto_1.CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product SKU', example: 'IPHONE15PRO-128-BLACK' }),
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.MinLength)(2),
    (0, class_validator_2.MaxLength)(100),
    __metadata("design:type", String)
], create_product_dto_1.CreateProductDto.prototype, "sku", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ description: 'Product stock quantity', example: 100, default: 0 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], create_product_dto_1.CreateProductDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ description: 'Product images URLs', example: ['https://example.com/image1.jpg'] }),
    (0, class_validator_3.IsArray)(),
    (0, class_validator_2.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], create_product_dto_1.CreateProductDto.prototype, "images", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ description: 'Is product active', default: true }),
    (0, class_validator_2.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], create_product_dto_1.CreateProductDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Category ID', example: '123e4567-e89b-12d3-a456-426614174000' }),
    (0, class_validator_2.IsUUID)(),
    __metadata("design:type", String)
], create_product_dto_1.CreateProductDto.prototype, "categoryId", void 0);
const create_product_dto_1 = require("./create-product.dto");
class UpdateProductDto extends (0, swagger_3.PartialType)(create_product_dto_1.CreateProductDto) {
}
exports.UpdateProductDto = UpdateProductDto;
const class_transformer_2 = require("class-transformer");
class FindProductsDto extends pagination_dto_1.PaginationDto {
    constructor() {
        super(...arguments);
        this.sort = 'createdAt:desc';
    }
}
exports.FindProductsDto = FindProductsDto;
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ description: 'Filter by name', example: 'iPhone' }),
    (0, class_validator_2.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], find_products_dto_1.FindProductsDto.prototype, "name", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ description: 'Filter by minimum price', example: 100 }),
    (0, class_validator_3.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], find_products_dto_1.FindProductsDto.prototype, "minPrice", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ description: 'Filter by maximum price', example: 1000 }),
    (0, class_validator_3.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], find_products_dto_1.FindProductsDto.prototype, "maxPrice", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ description: 'Filter by category ID', example: '123e4567-e89b-12d3-a456-426614174000' }),
    (0, class_validator_2.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], find_products_dto_1.FindProductsDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ description: 'Filter by active status', example: true }),
    (0, class_validator_2.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], find_products_dto_1.FindProductsDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        description: 'Sort by field and direction',
        example: 'price:desc',
        default: 'createdAt:desc'
    }),
    (0, class_validator_2.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], find_products_dto_1.FindProductsDto.prototype, "sort", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        description: 'Filter by multiple category IDs',
        example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174001']
    }),
    (0, class_validator_3.IsArray)(),
    (0, class_validator_2.IsUUID)(undefined, { each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_2.Transform)(({ value }) => (typeof value === 'string' ? [value] : value)),
    __metadata("design:type", Array)
], find_products_dto_1.FindProductsDto.prototype, "categoryIds", void 0);
const update_product_dto_1 = require("./dto/update-product.dto");
const find_products_dto_1 = require("./dto/find-products.dto");
const client_4 = require("@prisma/client");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductDto) {
        return this.prisma.product.create({
            data: createProductDto,
        });
    }
    async findAll(params) {
        const { page = 1, limit = 10, name, minPrice, maxPrice, categoryId, categoryIds, isActive, sort = 'createdAt:desc' } = params;
        const skip = (page - 1) * limit;
        const [sortField, sortDirection] = sort.split(':');
        const orderBy = {
            [sortField || 'createdAt']: (sortDirection || 'desc').toLowerCase(),
        };
        const where = {
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
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
            },
        });
        if (!product) {
            throw new common_4.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async findBySlug(slug) {
        const product = await this.prisma.product.findUnique({
            where: { slug },
            include: {
                category: true,
            },
        });
        if (!product) {
            throw new common_4.NotFoundException(`Product with slug ${slug} not found`);
        }
        return product;
    }
    async update(id, updateProductDto) {
        await this.findOne(id);
        return this.prisma.product.update({
            where: { id },
            data: updateProductDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.product.delete({
            where: { id },
        });
    }
    async findByCategoryId(categoryId, params) {
        return this.findAll({
            ...params,
            categoryId,
        });
    }
    async findByCategorySlug(slug, params) {
        const category = await this.prisma.category.findUnique({
            where: { slug },
            select: { id: true },
        });
        if (!category) {
            throw new common_4.NotFoundException(`Category with slug ${slug} not found`);
        }
        return this.findAll({
            ...params,
            categoryId: category.id,
        });
    }
    async updateStock(id, quantity) {
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
};
exports.ProductsService = ProductsService;
exports.ProductsService = products_service_1.ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_f = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _f : Object])
], products_service_1.ProductsService);
const products_service_1 = require("./products.service");
Object.defineProperty(exports, "ProductsService", { enumerable: true, get: function () { return products_service_1.ProductsService; } });
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    create(createProductDto) {
        return this.productsService.create(createProductDto);
    }
    findAll(findProductsDto) {
        return this.productsService.findAll(findProductsDto);
    }
    findOne(id) {
        return this.productsService.findOne(id);
    }
    findBySlug(slug) {
        return this.productsService.findBySlug(slug);
    }
    findByCategoryId(categoryId, findProductsDto) {
        return this.productsService.findByCategoryId(categoryId, findProductsDto);
    }
    findByCategorySlug(slug, findProductsDto) {
        return this.productsService.findByCategorySlug(slug, findProductsDto);
    }
    update(id, updateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }
    updateStock(id, quantity) {
        return this.productsService.updateStock(id, +quantity);
    }
    remove(id) {
        return this.productsService.remove(id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_5.Post)(),
    (0, swagger_4.ApiOperation)({ summary: 'Create a new product' }),
    (0, swagger_4.ApiResponse)({ status: 201, description: 'Product successfully created' }),
    __param(0, (0, common_5.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof create_product_dto_1.CreateProductDto !== "undefined" && create_product_dto_1.CreateProductDto) === "function" ? _h : Object]),
    __metadata("design:returntype", void 0)
], products_controller_1.ProductsController.prototype, "create", null);
__decorate([
    (0, common_5.Get)(),
    (0, swagger_4.ApiOperation)({ summary: 'Get all products with pagination and filters' }),
    (0, swagger_4.ApiResponse)({ status: 200, description: 'List of products' }),
    __param(0, (0, common_5.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof find_products_dto_1.FindProductsDto !== "undefined" && find_products_dto_1.FindProductsDto) === "function" ? _j : Object]),
    __metadata("design:returntype", void 0)
], products_controller_1.ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_5.Get)(':id'),
    (0, swagger_4.ApiOperation)({ summary: 'Get a product by ID' }),
    (0, swagger_4.ApiResponse)({ status: 200, description: 'Product found' }),
    (0, swagger_4.ApiResponse)({ status: 404, description: 'Product not found' }),
    __param(0, (0, common_5.Param)('id', common_5.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], products_controller_1.ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_5.Get)('slug/:slug'),
    (0, swagger_4.ApiOperation)({ summary: 'Get a product by slug' }),
    (0, swagger_4.ApiResponse)({ status: 200, description: 'Product found' }),
    (0, swagger_4.ApiResponse)({ status: 404, description: 'Product not found' }),
    __param(0, (0, common_5.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], products_controller_1.ProductsController.prototype, "findBySlug", null);
__decorate([
    (0, common_5.Get)('category/:categoryId'),
    (0, swagger_4.ApiOperation)({ summary: 'Get products by category ID' }),
    (0, swagger_4.ApiResponse)({ status: 200, description: 'List of products' }),
    __param(0, (0, common_5.Param)('categoryId', common_5.ParseUUIDPipe)),
    __param(1, (0, common_5.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_k = typeof find_products_dto_1.FindProductsDto !== "undefined" && find_products_dto_1.FindProductsDto) === "function" ? _k : Object]),
    __metadata("design:returntype", void 0)
], products_controller_1.ProductsController.prototype, "findByCategoryId", null);
__decorate([
    (0, common_5.Get)('category/slug/:slug'),
    (0, swagger_4.ApiOperation)({ summary: 'Get products by category slug' }),
    (0, swagger_4.ApiResponse)({ status: 200, description: 'List of products' }),
    (0, swagger_4.ApiResponse)({ status: 404, description: 'Category not found' }),
    __param(0, (0, common_5.Param)('slug')),
    __param(1, (0, common_5.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_l = typeof find_products_dto_1.FindProductsDto !== "undefined" && find_products_dto_1.FindProductsDto) === "function" ? _l : Object]),
    __metadata("design:returntype", void 0)
], products_controller_1.ProductsController.prototype, "findByCategorySlug", null);
__decorate([
    (0, common_5.Patch)(':id'),
    (0, swagger_4.ApiOperation)({ summary: 'Update a product' }),
    (0, swagger_4.ApiResponse)({ status: 200, description: 'Product successfully updated' }),
    (0, swagger_4.ApiResponse)({ status: 404, description: 'Product not found' }),
    __param(0, (0, common_5.Param)('id', common_5.ParseUUIDPipe)),
    __param(1, (0, common_5.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_m = typeof update_product_dto_1.UpdateProductDto !== "undefined" && update_product_dto_1.UpdateProductDto) === "function" ? _m : Object]),
    __metadata("design:returntype", void 0)
], products_controller_1.ProductsController.prototype, "update", null);
__decorate([
    (0, common_5.Patch)(':id/stock/:quantity'),
    (0, swagger_4.ApiOperation)({ summary: 'Update product stock' }),
    (0, swagger_4.ApiResponse)({ status: 200, description: 'Stock successfully updated' }),
    (0, swagger_4.ApiResponse)({ status: 404, description: 'Product not found' }),
    __param(0, (0, common_5.Param)('id', common_5.ParseUUIDPipe)),
    __param(1, (0, common_5.Param)('quantity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], products_controller_1.ProductsController.prototype, "updateStock", null);
__decorate([
    (0, common_5.Delete)(':id'),
    (0, common_5.HttpCode)(common_2.HttpStatus.NO_CONTENT),
    (0, swagger_4.ApiOperation)({ summary: 'Delete a product' }),
    (0, swagger_4.ApiResponse)({ status: 204, description: 'Product successfully deleted' }),
    (0, swagger_4.ApiResponse)({ status: 404, description: 'Product not found' }),
    __param(0, (0, common_5.Param)('id', common_5.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], products_controller_1.ProductsController.prototype, "remove", null);
exports.ProductsController = products_controller_1.ProductsController = __decorate([
    (0, swagger_4.ApiTags)('products'),
    (0, common_5.Controller)('products'),
    __metadata("design:paramtypes", [typeof (_g = typeof products_service_1.ProductsService !== "undefined" && products_service_1.ProductsService) === "function" ? _g : Object])
], products_controller_1.ProductsController);
const products_controller_1 = require("./products.controller");
Object.defineProperty(exports, "ProductsController", { enumerable: true, get: function () { return products_controller_1.ProductsController; } });
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_3.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService],
        exports: [products_service_1.ProductsService],
    })
], ProductsModule);
//# sourceMappingURL=productcategory_mau.js.map