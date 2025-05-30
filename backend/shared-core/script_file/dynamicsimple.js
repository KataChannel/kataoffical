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
import { Module, CacheModule } from '@nestjs/common';
import { ${entityNameUpper}Service } from './${entityNameLower}.service';
import { ${entityNameUpper}Controller } from './${entityNameLower}.controller';
import { PrismaService } from '../prisma/prisma.service';
import { Redis${entityNameUpper}Service } from './redis${entityNameLower}.service';
import { ${entityNameUpper}Gateway } from './${entityNameLower}.gateway';
import { Redis } from 'ioredis';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => {
        const redisClient = new Redis({
          host: 'localhost',
          port: 6379,
        });
        return {
          store: require('cache-manager-ioredis'),
          redisInstance: redisClient,
          ttl: 300,
        };
      },
    }),
  ],
  controllers: [${entityNameUpper}Controller],
  providers: [${entityNameUpper}Service, PrismaService, Redis${entityNameUpper}Service, ${entityNameUpper}Gateway],
})
export class ${entityNameUpper}Module {}
  `,

  [`src/${entityNameLower}/${entityNameLower}.service.ts`]: `
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Redis${entityNameUpper}Service } from './redis${entityNameLower}.service';
import { Prisma, ${entityNameUpper} } from '@prisma/client';

@Injectable()
export class ${entityNameUpper}Service {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: Redis${entityNameUpper}Service,
  ) {}

  async get${entityNameUpper}s(pagination: {
    page: number;
    limit: number;
    search?: string;
  }): Promise<{ items: ${entityNameUpper}[]; total: number }> {
    const cacheKey = \`${entityNameLower}s_\${pagination.page}_\${pagination.limit}_\${pagination.search || ''}\`;
    const cached = await this.cacheService.get<${entityNameUpper}[]>(cacheKey);
    
    if (cached) {
      return { items: cached, total: cached.length };
    }

    const where: Prisma.${entityNameUpper}WhereInput = pagination.search
      ? {
          OR: [
            { name: { contains: pagination.search, mode: 'insensitive' } },
            { description: { contains: pagination.search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      this.prisma.${entityNameLower}.findMany({
        where,
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.${entityNameLower}.count({ where }),
    ]);

    await this.cacheService.set(cacheKey, items, 300);
    return { items, total };
  }

  async create${entityNameUpper}(data: Prisma.${entityNameUpper}CreateInput): Promise<${entityNameUpper}> {
    const ${entityNameLower} = await this.prisma.${entityNameLower}.create({ data });
    await this.cacheService.clearPattern('${entityNameLower}s_*');
    return ${entityNameLower};
  }
}
  `,

  [`src/${entityNameLower}/${entityNameLower}.controller.ts`]: `
import { Controller, Get, Query, Post, Body, UseGuards } from '@nestjs/common';
import { ${entityNameUpper}Service } from './${entityNameLower}.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags, ApiOperation, ApiQuery, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ${entityNameUpper}Dto } from './dto/${entityNameLower}.dto';
import { PaginationDto } from './dto/pagination.dto';

@ApiTags('${entityNameUpper}s')
@Controller('${entityNameLower}s')
export class ${entityNameUpper}Controller {
  constructor(private readonly ${entityNameLower}Service: ${entityNameUpper}Service) {}

  @Get()
  @ApiOperation({ summary: 'Get list of ${entityNameLower}s with pagination and search' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ status: 200, description: 'List of ${entityNameLower}s', type: [${entityNameUpper}Dto] })
  async get${entityNameUpper}s(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search?: string,
  ) {
    const pagination: PaginationDto = {
      page: parseInt(page),
      limit: parseInt(limit),
      search,
    };
    return this.${entityNameLower}Service.get${entityNameUpper}s(pagination);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new ${entityNameLower}' })
  @ApiBody({ type: ${entityNameUpper}Dto })
  @ApiResponse({ status: 201, description: '${entityNameUpper} created', type: ${entityNameUpper}Dto })
  async create${entityNameUpper}(@Body() data: Prisma.${entityNameUpper}CreateInput) {
    return this.${entityNameLower}Service.create${entityNameUpper}(data);
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
}
  `,

  [`src/${entityNameLower}/redis${entityNameLower}.service.ts`]: `
import { Injectable, CACHE_MANAGER } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class Redis${entityNameUpper}Service {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async get<T>(key: string): Promise<T | undefined> {
    return this.cacheManager.get<T>(key);
  }

  async set<T>(key: string, value: T, ttl: number): Promise<void> {
    await this.cacheManager.set(key, value, { ttl });
  }

  async clearPattern(pattern: string): Promise<void> {
    const keys = await this.cacheManager.store.keys(pattern);
    if (keys.length) {
      await this.cacheManager.del(keys);
    }
  }
}
  `,

  [`src/${entityNameLower}/schema.prisma`]: `
model ${entityNameUpper} {
  id        String   @id @default(uuid())
  name      String
  price     Float
  description String?
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
    .setDescription('The ${entityNameUpper} API description with Redis, WebSocket and Pagination')
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