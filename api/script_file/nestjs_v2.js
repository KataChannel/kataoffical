const fs = require('fs');
const path = require('path');

// Lấy tên module động từ đối số dòng lệnh
const moduleName = process.argv[2];
if (!moduleName) {
  console.error('Vui lòng cung cấp tên module dynamic (ví dụ: userguide, product)');
  console.error('Cách sử dụng: node generate_dynamic_userguide.js <module_name>');
  process.exit(1);
}

// Chuyển đổi tên module để sử dụng trong tên tệp và tên class/biến
const lowerCaseModuleName = moduleName.toLowerCase();
const capitalizedModuleName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1).toLowerCase();

// Đường dẫn tới thư mục module (ví dụ: api/src/userguide)
const baseDir = path.join(__dirname, '', '', lowerCaseModuleName);

// Định nghĩa template cho các file
const socketGatewayTemplate = `import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer() server: Server;

  send${capitalizedModuleName}Update(): { success: boolean; error?: string } {
    try {
      this.server.emit('${lowerCaseModuleName}updated');
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}
`;

const controllerTemplate = `import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ${capitalizedModuleName}Service } from './${lowerCaseModuleName}.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('${lowerCaseModuleName}')
@Controller('${lowerCaseModuleName}')
export class ${capitalizedModuleName}Controller {
  constructor(private readonly ${lowerCaseModuleName}Service: ${capitalizedModuleName}Service) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new ${lowerCaseModuleName}' })
  @ApiBody({ type: Object })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() data: any) {
    try {
      return await this.${lowerCaseModuleName}Service.create(data);
    } catch (error) {
      throw new HttpException(error.message || 'Create failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Find ${lowerCaseModuleName}s by parameters' })
  @ApiBody({ type: Object })
  @Post('findby')
  async findby(@Body() param: any) {
    try {
      return await this.${lowerCaseModuleName}Service.findBy(param);
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get all ${lowerCaseModuleName}s' })
  @Get()
  async findAll() {
    try {
      return await this.${lowerCaseModuleName}Service.findAll();
    } catch (error) {
      throw new HttpException(error.message || 'Find all failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get last updated ${lowerCaseModuleName}' })
  @Get('lastupdated')
  async getLastUpdated${capitalizedModuleName}() {
    try {
      return await this.${lowerCaseModuleName}Service.getLastUpdated${capitalizedModuleName}();
    } catch (error) {
      throw new HttpException(error.message || 'Get last updated failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Find ${lowerCaseModuleName} by ID' })
  @ApiParam({ name: 'id', type: String })
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.${lowerCaseModuleName}Service.findOne(id);
    } catch (error) {
      throw new HttpException(error.message || 'Find one failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a ${lowerCaseModuleName}' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object })
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    try {
      return await this.${lowerCaseModuleName}Service.update(id, data);
    } catch (error) {
      throw new HttpException(error.message || 'Update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a ${lowerCaseModuleName}' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.${lowerCaseModuleName}Service.remove(id);
    } catch (error) {
      throw new HttpException(error.message || 'Delete failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Reorder ${lowerCaseModuleName}s' })
  @ApiBody({
    schema: {
      properties: {
        ${lowerCaseModuleName}Ids: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @Post('reorder')
  async reorder(@Body() body: { ${lowerCaseModuleName}Ids: string[] }) {
    try {
      return await this.${lowerCaseModuleName}Service.reorder${capitalizedModuleName}s(body.${lowerCaseModuleName}Ids);
    } catch (error) {
      throw new HttpException(error.message || 'Reorder failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
`;

const moduleTemplate = `import { Module } from '@nestjs/common';
import { ${capitalizedModuleName}Service } from './${lowerCaseModuleName}.service';
import { ${capitalizedModuleName}Controller } from './${lowerCaseModuleName}.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from '../socket.gateway';
import { ErrorlogModule } from 'src/errorlog/errorlog.module';

@Module({
  imports: [PrismaModule, ErrorlogModule],
  controllers: [${capitalizedModuleName}Controller],
  providers: [${capitalizedModuleName}Service, SocketGateway],
  exports: [${capitalizedModuleName}Service]
})
export class ${capitalizedModuleName}Module {}
`;

const serviceTemplate = `import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from '../socket.gateway';

@Injectable()
export class ${capitalizedModuleName}Service {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogService: ErrorlogService,
  ) {}

  async getLastUpdated${capitalizedModuleName}(): Promise<{ updatedAt: number }> {
    try {
      const lastUpdated = await this.prisma.${lowerCaseModuleName}.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdated${capitalizedModuleName}', error);
      throw error;
    }
  }

  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.${lowerCaseModuleName}.findFirst({
        orderBy: { codeId: 'desc' },
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const match = latest.codeId.match(/I1(\\d+)/);
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      return \`I1\${nextNumber.toString().padStart(5, '0')}\`;
    } catch (error) {
      this._ErrorlogService.logError('generateCodeId', error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      const maxOrder = await this.prisma.${lowerCaseModuleName}.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = await this.generateCodeId();
      const created = await this.prisma.${lowerCaseModuleName}.create({
        data: {
          ...data,
          order: newOrder,
          codeId: codeId
        },
      });
      this._SocketGateway.send${capitalizedModuleName}Update();
      return created;
    } catch (error) {
      this._ErrorlogService.logError('create${capitalizedModuleName}', error);
      throw error;
    }
  }

  async findBy(param: any) {
    try {
      const { page = 1, limit = 20, ...where } = param;
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.${lowerCaseModuleName}.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.${lowerCaseModuleName}.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findBy${capitalizedModuleName}', error);
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 20) {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.${lowerCaseModuleName}.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.${lowerCaseModuleName}.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findAll${capitalizedModuleName}', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.prisma.${lowerCaseModuleName}.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('${capitalizedModuleName} not found');
      return item;
    } catch (error) {
      this._ErrorlogService.logError('findOne${capitalizedModuleName}', error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      let updated;
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.${lowerCaseModuleName}.update({ where: { id }, data: rest });
        updated = await this.prisma.${lowerCaseModuleName}.update({ where: { id }, data: { order } });
      } else {
        updated = await this.prisma.${lowerCaseModuleName}.update({ where: { id }, data });
      }
      this._SocketGateway.send${capitalizedModuleName}Update();
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('update${capitalizedModuleName}', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.prisma.${lowerCaseModuleName}.delete({ where: { id } });
      this._SocketGateway.send${capitalizedModuleName}Update();
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('remove${capitalizedModuleName}', error);
      throw error;
    }
  }

  async reorder${capitalizedModuleName}s(${lowerCaseModuleName}Ids: string[]) {
    try {
      for (let i = 0; i < ${lowerCaseModuleName}Ids.length; i++) {
        await this.prisma.${lowerCaseModuleName}.update({
          where: { id: ${lowerCaseModuleName}Ids[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.send${capitalizedModuleName}Update();
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorder${capitalizedModuleName}s', error);
      throw error;
    }
  }
}
`;

// Định nghĩa các file cần tạo trong thư mục module
const files = {
  'socket.gateway.ts': socketGatewayTemplate,
  [`${lowerCaseModuleName}.controller.ts`]: controllerTemplate,
  [`${lowerCaseModuleName}.module.ts`]: moduleTemplate,
  [`${lowerCaseModuleName}.service.ts`]: serviceTemplate,
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

// Tạo các file trong thư mục baseDir
Object.entries(files).forEach(([fileName, content]) => {
  const filePath = path.join(baseDir, fileName);
  createFile(filePath, content);
});

console.log('All files have been created successfully!');