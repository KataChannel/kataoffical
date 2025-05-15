const fs = require('fs');
const path = require('path');

function toPascalCase(str) {
    if (!str) return '';
    // Chuyển đổi chuỗi như 'product-item' thành 'ProductItem' hoặc 'product' thành 'Product'
    return str.toLowerCase().replace(/(?:^|-|_)(\w)/g, (match, c) => c.toUpperCase());
}

function toCamelCase(str) {
    if (!str) return '';
    const pascal = toPascalCase(str);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

const dynamicSegment = process.argv[2];

if (!dynamicSegment) {
    console.error('Vui lòng cung cấp tên phân đoạn động! Ví dụ: node createModule.js product');
    process.exit(1);
}

const lowerSegment = dynamicSegment.toLowerCase();
const pascalSegment = toPascalCase(dynamicSegment);
const camelSegment = toCamelCase(dynamicSegment);

const filesToCreate = [
    {
        name: `${lowerSegment}.controller.ts`,
        content: getControllerContent(lowerSegment, pascalSegment, camelSegment)
    },
    {
        name: `${lowerSegment}.module.ts`,
        content: getModuleContent(lowerSegment, pascalSegment)
    },
    {
        name: `${lowerSegment}.service.ts`,
        content: getServiceContent(lowerSegment, pascalSegment, camelSegment)
    },
    {
        name: `socket.gateway.ts`,
        content: getSocketGatewayContent(lowerSegment, pascalSegment)
    }
];

// Tạo thư mục cho phân đoạn động
const dirPath = path.join(__dirname, lowerSegment);
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Đã tạo thư mục: ${dirPath}`);
} else {
    console.log(`Thư mục đã tồn tại: ${dirPath}`);
}

// Tạo các tệp
filesToCreate.forEach(file => {
    const filePath = path.join(dirPath, file.name);
    fs.writeFileSync(filePath, file.content);
    console.log(`Đã tạo tệp: ${filePath}`);
});

console.log(`Hoàn tất tạo module '${lowerSegment}'.`);

// --- Hàm nội dung tệp ---

function getControllerContent(lower, pascal, camel) {
    return `
import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ${pascal}Service } from './${lower}.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; // Giả sử đường dẫn này là cố định

@ApiTags('${lower}')
@Controller('${lower}')
export class ${pascal}Controller {
  constructor(private readonly ${camel}Service: ${pascal}Service) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new ${lower}' })
  @ApiBody({ type: Object })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: any) {
    try {
      return await this.${camel}Service.create(data);
    } catch (error) {
      throw new HttpException(error.message || 'Create failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Find ${lower}s by parameters' })
  @ApiBody({ type: Object })
  @Post('findby')
  async findby(@Body() param: any) {
    try {
      return await this.${camel}Service.findBy(param);
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get all ${lower}s' })
  @Get()
  async findAll() {
    try {
      return await this.${camel}Service.findAll();
    } catch (error) {
      throw new HttpException(error.message || 'Find all failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get last updated ${lower}' })
  @Get('lastupdated')
  async getLastUpdated${pascal}() {
    try {
      return await this.${camel}Service.getLastUpdated${pascal}();
    } catch (error) {
      throw new HttpException(error.message || 'Get last updated failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Find ${lower} by ID' })
  @ApiParam({ name: 'id', type: String })
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.${camel}Service.findOne(id);
    } catch (error) {
      throw new HttpException(error.message || 'Find one failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a ${lower}' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    try {
      return await this.${camel}Service.update(id, data);
    } catch (error) {
      throw new HttpException(error.message || 'Update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a ${lower}' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.${camel}Service.remove(id);
    } catch (error) {
      throw new HttpException(error.message || 'Delete failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Reorder ${lower}s' })
  @ApiBody({
    schema: {
      properties: {
        ${lower}Ids: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @Post('reorder')
  async reorder(@Body() body: { ${lower}Ids: string[] }) {
    try {
      return await this.${camel}Service.reorder${pascal}s(body.${lower}Ids);
    } catch (error) {
      throw new HttpException(error.message || 'Reorder failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
`.trim();
}

function getModuleContent(lower, pascal) {
    return `
import { Module } from '@nestjs/common';
import { ${pascal}Service } from './${lower}.service';
import { ${pascal}Controller } from './${lower}.controller';
import { PrismaModule } from 'prisma/prisma.module'; // Giả sử đường dẫn này là cố định
import { SocketGateway } from './socket.gateway'; // Nằm trong cùng thư mục module
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; // Giả sử đường dẫn này là cố định
import { AuthModule } from 'src/auth/auth.module'; // Giả sử đường dẫn này là cố định

@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule],
  controllers: [${pascal}Controller],
  providers: [${pascal}Service, SocketGateway],
  exports: [${pascal}Service]
})
export class ${pascal}Module {}
`.trim();
}

function getServiceContent(lower, pascal, camel) {
    return `
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; // Giả sử đường dẫn này là cố định
import { ErrorlogService } from 'src/errorlog/errorlog.service'; // Giả sử đường dẫn này là cố định
import { SocketGateway } from './socket.gateway'; // Nằm trong cùng thư mục module

@Injectable()
export class ${pascal}Service {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogService: ErrorlogService,
  ) {}

  async getLastUpdated${pascal}(): Promise<{ updatedAt: number }> {
    try {
      const lastUpdated = await this.prisma.${lower}.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdated${pascal}', error);
      throw error;
    }
  }

  async generateCodeId(): Promise<string> { // Giữ nguyên logic 'I1' nếu nó không phụ thuộc vào 'sanpham'
    try {
      const latest = await this.prisma.${lower}.findFirst({
        orderBy: { codeId: 'desc' },
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const match = latest.codeId.match(/I1(\\d+)/); // Giữ nguyên prefix 'I1'
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      return \`I1\${nextNumber.toString().padStart(5, '0')}\`;
    } catch (error) {
      this._ErrorlogService.logError('generateCodeIdFor${pascal}', error); // Có thể làm rõ hơn cho logging
      throw error;
    }
  }

  async create(data: any) {
    try {
      const maxOrder = await this.prisma.${lower}.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = await this.generateCodeId();
      const created = await this.prisma.${lower}.create({
        data: {
          ...data,
          order: newOrder,
          codeId: codeId
        },
      });
      this._SocketGateway.send${pascal}Update();
      return created;
    } catch (error) {
      this._ErrorlogService.logError('create${pascal}', error);
      throw error;
    }
  }

  async findBy(param: any) {
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.${lower}.findFirst({
          where,
          orderBy: { order: 'asc' },
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.${lower}.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.${lower}.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findBy${pascal}', error);
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 20) {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.${lower}.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.${lower}.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findAll${pascal}', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.prisma.${lower}.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('${pascal} not found');
      return item;
    } catch (error) {
      this._ErrorlogService.logError('findOne${pascal}', error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      let updated;
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.${lower}.update({ where: { id }, data: rest });
        updated = await this.prisma.${lower}.update({ where: { id }, data: { order } });
      } else {
        updated = await this.prisma.${lower}.update({ where: { id }, data });
      }
      this._SocketGateway.send${pascal}Update();
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('update${pascal}', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.prisma.${lower}.delete({ where: { id } });
      this._SocketGateway.send${pascal}Update();
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('remove${pascal}', error);
      throw error;
    }
  }

  async reorder${pascal}s(${lower}Ids: string[]) {
    try {
      for (let i = 0; i < ${lower}Ids.length; i++) {
        await this.prisma.${lower}.update({
          where: { id: ${lower}Ids[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.send${pascal}Update();
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorder${pascal}s', error);
      throw error;
    }
  }
}
`.trim();
}

function getSocketGatewayContent(lower, pascal) {
    return `
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ // Cấu hình CORS hoặc namespace có thể cần điều chỉnh tùy theo kiến trúc tổng thể
  cors: {
    origin: '*', // Cân nhắc cấu hình chặt chẽ hơn cho production
  },
  // namespace: '${lower}', // Tùy chọn: sử dụng namespace cho từng module
})
export class SocketGateway { // Tên class SocketGateway được giữ nguyên, nó được cung cấp trong module động
  @WebSocketServer() server: Server;

  send${pascal}Update(): { success: boolean; error?: string } {
    try {
      this.server.emit('${lower}-updated');
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}
`.trim();
}