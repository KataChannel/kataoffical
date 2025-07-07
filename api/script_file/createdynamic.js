// create-files.js
const fs = require('fs');
const path = require('path');

// Lấy tham số từ command line (ví dụ: node create-files.js Product)
const entityNameArg = process.argv[2];
if (!entityNameArg) {
  console.error('Please provide an entity name (e.g., node create-files.js Product)');
  process.exit(1);
}

// Chuyển entityName thành dạng camelCase và PascalCase
const entityNameLower = entityNameArg.charAt(0).toLowerCase() + entityNameArg.slice(1); // Ví dụ: product
const entityNameUpper = entityNameArg.charAt(0).toUpperCase() + entityNameArg.slice(1); // Ví dụ: Product

// Định nghĩa cấu trúc file và nội dung
const files = {
  [`src/${entityNameLower}/${entityNameLower}.module.ts`]: `
import { Module } from '@nestjs/common';
import { ${entityNameUpper}Service } from './${entityNameLower}.service';
import { ${entityNameUpper}Controller } from './${entityNameLower}.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ${entityNameUpper}Gateway } from './${entityNameLower}.gateway';

@Module({
  controllers: [${entityNameUpper}Controller],
  providers: [${entityNameUpper}Service, PrismaService, ${entityNameUpper}Gateway],
})
export class ${entityNameUpper}Module {}
  `,

  [`src/${entityNameLower}/${entityNameLower}.service.ts`]: `
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, ${entityNameUpper} } from '@prisma/client';

@Injectable()
export class ${entityNameUpper}Service {
  constructor(private readonly prisma: PrismaService) {}

  async get${entityNameUpper}s(pagination: {
    page: number;
    limit: number;
    search?: string;
    orderBy?: string;
    orderDir?: 'asc' | 'desc';
  }): Promise<{ items: ${entityNameUpper}[]; total: number }> {
    const where: Prisma.${entityNameUpper}WhereInput = pagination.search
      ? {
          OR: [
            { name: { contains: pagination.search, mode: 'insensitive' } },
            { description: { contains: pagination.search, mode: 'insensitive' } },
          ],
        }
      : {};

    const orderBy = pagination.orderBy
      ? { [pagination.orderBy]: pagination.orderDir || 'asc' }
      : { order: 'asc' }; // Mặc định sắp xếp theo trường order

    const [items, total] = await Promise.all([
      this.prisma.${entityNameLower}.findMany({
        where,
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
        orderBy,
      }),
      this.prisma.${entityNameLower}.count({ where }),
    ]);

    return { items, total };
  }

  async get${entityNameUpper}ById(id: string): Promise<${entityNameUpper}> {
    const ${entityNameLower} = await this.prisma.${entityNameLower}.findUnique({
      where: { id },
    });
    if (!${entityNameLower}) {
      throw new NotFoundException(\`${entityNameUpper} with ID \${id} not found\`);
    }
    return ${entityNameLower};
  }

  async create${entityNameUpper}(data: Prisma.${entityNameUpper}CreateInput): Promise<${entityNameUpper}> {
    // Tự động gán order bằng số lượng hiện tại + 1 nếu không chỉ định
    if (!data.order) {
      const count = await this.prisma.${entityNameLower}.count();
      data.order = count + 1;
    }
    return this.prisma.${entityNameLower}.create({ data });
  }

  async update${entityNameUpper}(id: string, data: Prisma.${entityNameUpper}UpdateInput): Promise<${entityNameUpper}> {
    const ${entityNameLower} = await this.prisma.${entityNameLower}.findUnique({ where: { id } });
    if (!${entityNameLower}) {
      throw new NotFoundException(\`${entityNameUpper} with ID \${id} not found\`);
    }
    return this.prisma.${entityNameLower}.update({
      where: { id },
      data,
    });
  }

  async delete${entityNameUpper}(id: string): Promise<${entityNameUpper}> {
    const ${entityNameLower} = await this.prisma.${entityNameLower}.findUnique({ where: { id } });
    if (!${entityNameLower}) {
      throw new NotFoundException(\`${entityNameUpper} with ID \${id} not found\`);
    }
    const deleted = await this.prisma.${entityNameLower}.delete({ where: { id } });
    // Cập nhật lại order cho các entity còn lại
    await this.reorder${entityNameUpper}sAfterDelete(${entityNameLower}.order);
    return deleted;
  }

  async update${entityNameUpper}Order(orderedIds: string[]): Promise<${entityNameUpper}[]> {
    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      throw new BadRequestException('Ordered IDs must be a non-empty array');
    }

    const existing${entityNameUpper}s = await this.prisma.${entityNameLower}.findMany({
      where: { id: { in: orderedIds } },
    });

    if (existing${entityNameUpper}s.length !== orderedIds.length) {
      throw new BadRequestException('Some IDs in the ordered list do not exist');
    }

    const updates = orderedIds.map((id, index) =>
      this.prisma.${entityNameLower}.update({
        where: { id },
        data: { order: index + 1 },
      }),
    );

    return Promise.all(updates);
  }

  private async reorder${entityNameUpper}sAfterDelete(deletedOrder: number) {
    await this.prisma.${entityNameLower}.updateMany({
      where: { order: { gt: deletedOrder } },
      data: { order: { decrement: 1 } },
    });
  }
}
  `,

  [`src/${entityNameLower}/${entityNameLower}.controller.ts`]: `
import { Controller, Get, Query, Post, Put, Delete, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ${entityNameUpper}Service } from './${entityNameLower}.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags, ApiOperation, ApiQuery, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ${entityNameUpper}Dto } from './dto/${entityNameLower}.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Order${entityNameUpper}Dto } from './dto/order-${entityNameLower}.dto';

@ApiTags('${entityNameUpper}s')
@Controller('${entityNameLower}s')
export class ${entityNameUpper}Controller {
  constructor(private readonly ${entityNameLower}Service: ${entityNameUpper}Service) {}

  @Get()
  @ApiOperation({ summary: 'Get list of ${entityNameLower}s with pagination, search, and ordering' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'orderBy', required: false, type: String, example: 'order' })
  @ApiQuery({ name: 'orderDir', required: false, enum: ['asc', 'desc'], example: 'asc' })
  @ApiResponse({ status: 200, description: 'List of ${entityNameLower}s', type: [${entityNameUpper}Dto] })
  async get${entityNameUpper}s(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search?: string,
    @Query('orderBy') orderBy?: string,
    @Query('orderDir') orderDir?: 'asc' | 'desc',
  ) {
    const pagination: PaginationDto = {
      page: parseInt(page),
      limit: parseInt(limit),
      search,
      orderBy,
      orderDir,
    };
    return this.${entityNameLower}Service.get${entityNameUpper}s(pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a ${entityNameLower} by ID' })
  @ApiParam({ name: 'id', type: String, description: '${entityNameUpper} ID' })
  @ApiResponse({ status: 200, description: '${entityNameUpper} details', type: ${entityNameUpper}Dto })
  @ApiResponse({ status: 404, description: '${entityNameUpper} not found' })
  async get${entityNameUpper}ById(@Param('id') id: string) {
    return this.${entityNameLower}Service.get${entityNameUpper}ById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new ${entityNameLower}' })
  @ApiBody({ type: ${entityNameUpper}Dto })
  @ApiResponse({ status: 201, description: '${entityNameUpper} created', type: ${entityNameUpper}Dto })
  async create${entityNameUpper}(@Body() data: Prisma.${entityNameUpper}CreateInput) {
    return this.${entityNameLower}Service.create${entityNameUpper}(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update an existing ${entityNameLower}' })
  @ApiParam({ name: 'id', type: String, description: '${entityNameUpper} ID' })
  @ApiBody({ type: ${entityNameUpper}Dto })
  @ApiResponse({ status: 200, description: '${entityNameUpper} updated', type: ${entityNameUpper}Dto })
  @ApiResponse({ status: 404, description: '${entityNameUpper} not found' })
  async update${entityNameUpper}(@Param('id') id: string, @Body() data: Prisma.${entityNameUpper}UpdateInput) {
    return this.${entityNameLower}Service.update${entityNameUpper}(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete a ${entityNameLower}' })
  @ApiParam({ name: 'id', type: String, description: '${entityNameUpper} ID' })
  @ApiResponse({ status: 200, description: '${entityNameUpper} deleted', type: ${entityNameUpper}Dto })
  @ApiResponse({ status: 404, description: '${entityNameUpper} not found' })
  async delete${entityNameUpper}(@Param('id') id: string) {
    return this.${entityNameLower}Service.delete${entityNameUpper}(id);
  }

  @Patch('order')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update the order of ${entityNameLower}s' })
  @ApiBody({ type: Order${entityNameUpper}Dto })
  @ApiResponse({ status: 200, description: '${entityNameUpper}s order updated', type: [${entityNameUpper}Dto] })
  @ApiResponse({ status: 400, description: 'Invalid ordered IDs' })
  async update${entityNameUpper}Order(@Body() orderDto: Order${entityNameUpper}Dto) {
    return this.${entityNameLower}Service.update${entityNameUpper}Order(orderDto.orderedIds);
  }
}
  `,

  [`src/${entityNameLower}/${entityNameLower}.gateway.ts`]: `
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ${entityNameUpper}Service } from './${entityNameLower}.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ${entityNameUpper}Gateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly ${entityNameLower}Service: ${entityNameUpper}Service) {}

  @SubscribeMessage('${entityNameLower}s')
  async handle${entityNameUpper}Subscription(@MessageBody() data: { page: number; limit: number }) {
    const ${entityNameLower}s = await this.${entityNameLower}Service.get${entityNameUpper}s({
      page: data.page,
      limit: data.limit,
    });
    this.server.emit('${entityNameLower}s_update', ${entityNameLower}s);
  }

  async handle${entityNameUpper}Created(${entityNameLower}: any) {
    this.server.emit('${entityNameLower}_created', ${entityNameLower});
  }

  async handle${entityNameUpper}Updated(${entityNameLower}: any) {
    this.server.emit('${entityNameLower}_updated', ${entityNameLower});
  }

  async handle${entityNameUpper}Deleted(id: string) {
    this.server.emit('${entityNameLower}_deleted', { id });
  }

  async handle${entityNameUpper}OrderUpdated(${entityNameLower}s: any[]) {
    this.server.emit('${entityNameLower}s_order_updated', ${entityNameLower}s);
  }
}
  `,

  [`src/${entityNameLower}/dto/${entityNameLower}.dto.ts`]: `
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class ${entityNameUpper}Dto {
  @ApiProperty({ example: '${entityNameUpper} Name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 99.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: '${entityNameUpper} Description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  order?: number;
}
  `,

  [`src/${entityNameLower}/dto/pagination.dto.ts`]: `
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;

  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  orderBy?: string;

  @IsString()
  @IsOptional()
  orderDir?: 'asc' | 'desc';
}
  `,

  [`src/${entityNameLower}/dto/order-${entityNameLower}.dto.ts`]: `
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class Order${entityNameUpper}Dto {
  @ApiProperty({ example: ['id1', 'id2', 'id3'], description: 'Array of ${entityNameUpper} IDs in desired order' })
  @IsArray()
  @IsString({ each: true })
  orderedIds: string[];
}
  `,

  [`src/${entityNameLower}/schema.prisma`]: `
model ${entityNameUpper} {
  id        String   @id @default(uuid())
  name      String
  price     Float
  description String?
  order     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
  `,

  'src/main.ts': `
import { NestFactory } from '@nestjs/core';
import { ${entityNameUpper}Module } from './${entityNameLower}/${entityNameLower}.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(${entityNameUpper}Module);
  
  app.useGlobalPipes(new ValidationPipe());
  
  const config = new DocumentBuilder()
    .setTitle('${entityNameUpper} API')
    .setDescription('The ${entityNameUpper} API description with WebSocket and Pagination')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
  console.log('Swagger UI available at: http://localhost:3000/api');
}
bootstrap();
  `,
};

// Hàm tạo thư mục và file
function createFile(filePath, content) {
  const dir = path.dirname(filePath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  console.log(`Created: ${filePath}`);
}

// Tạo tất cả các file
Object.entries(files).forEach(([filePath, content]) => {
  createFile(filePath, content);
});

console.log('All files have been created successfully!');