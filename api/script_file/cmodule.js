const fs = require('fs');
const path = require('path');

// Get resource name from command line argument (default to 'landingpage')
const resourceName = process.argv[2] || 'landingpage';
const ResourceName = resourceName.charAt(0).toUpperCase() + resourceName.slice(1);
const RESOURCE_NAME = resourceName.toUpperCase();

// Directory to create files in
const baseDir = `./${resourceName}`;
if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
}
if (!fs.existsSync(`${baseDir}/dto`)) {
    fs.mkdirSync(`${baseDir}/dto`);
}

// DTO File
const dtoContent = `
import { IsString, IsOptional, IsArray, IsNotEmpty } from 'class-validator';

export class Create${ResourceName}Dto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content?: string;
}

export class Update${ResourceName}Dto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  order?: number;
}

export class Reorder${ResourceName}Dto {
  @IsArray()
  @IsString({ each: true })
  ${resourceName}Ids: string[];
}

export class FindByDto {
  [key: string]: any;
}
`;

fs.writeFileSync(
    path.join(baseDir, `dto/${resourceName}.dto.ts`),
    dtoContent.trim()
);

// Controller File
const controllerContent = `
import { Controller, Get, Post, Body, Param, Patch, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ${ResourceName}Service } from './${resourceName}.service';
import { Create${ResourceName}Dto, Update${ResourceName}Dto, Reorder${ResourceName}Dto, FindByDto } from './dto/${resourceName}.dto';

@Controller('${resourceName}')
export class ${ResourceName}Controller {
  constructor(private readonly ${resourceName}Service: ${ResourceName}Service) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() create${ResourceName}Dto: Create${ResourceName}Dto) {
    return this.${resourceName}Service.create(create${ResourceName}Dto);
  }

  @Post('findby')
  @UsePipes(new ValidationPipe())
  findBy(@Body() param: FindByDto) {
    return this.${resourceName}Service.findBy(param);
  }

  @Get()
  findAll() {
    return this.${resourceName}Service.findAll();
  }

  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.${resourceName}Service.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() update${ResourceName}Dto: Update${ResourceName}Dto) {
    return this.${resourceName}Service.update(id, update${ResourceName}Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.${resourceName}Service.remove(id);
  }

  @Post('reorder')
  @UsePipes(new ValidationPipe())
  reorder(@Body() reorder${ResourceName}Dto: Reorder${ResourceName}Dto) {
    return this.${resourceName}Service.reorder${ResourceName}s(reorder${ResourceName}Dto.${resourceName}Ids);
  }
}
`;

fs.writeFileSync(
    path.join(baseDir, `${resourceName}.controller.ts`),
    controllerContent.trim()
);

// Service File
const serviceContent = `
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
import { Create${ResourceName}Dto, Update${ResourceName}Dto } from './dto/${resourceName}.dto';

@Injectable()
export class ${ResourceName}Service {
  constructor(
    private readonly prisma: PrismaService,
    private readonly socketGateway: SocketGateway,
    private readonly errorLogService: ErrorlogService,
  ) {}

  private async emitUpdateEvent() {
    const lastUpdate = await this.getLastUpdated${ResourceName}();
    this.socketGateway.send${ResourceName}Update();
  }

  async getLastUpdated${ResourceName}() {
    try {
      const lastUpdated = await this.prisma.${resourceName}.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt || 0 };
    } catch (error) {
      this.errorLogService.logError('getLastUpdated${ResourceName}', error);
      throw error;
    }
  }

  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.${resourceName}.findFirst({
        orderBy: { codeId: 'desc' },
      });

      let nextNumber = 1;
      if (latest?.codeId) {
        const match = latest.codeId.match(/${RESOURCE_NAME}(\\d+)/);
        if (match) nextNumber = parseInt(match[1]) + 1;
      }

      return \`${RESOURCE_NAME}\${nextNumber.toString().padStart(5, '0')}\`;
    } catch (error) {
      this.errorLogService.logError('generateCodeId', error);
      throw error;
    }
  }

  async create(data: Create${ResourceName}Dto) {
    try {
      const maxOrder = await this.prisma.${resourceName}.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = await this.generateCodeId();

      const new${ResourceName} = await this.prisma.${resourceName}.create({
        data: {
          ...data,
          order: newOrder,
          codeId,
        },
      });

      await this.emitUpdateEvent();
      return new${ResourceName};
    } catch (error) {
      this.errorLogService.logError('create${ResourceName}', error);
      throw error;
    }
  }

  async reorder${ResourceName}s(${resourceName}Ids: string[]) {
    try {
      await this.prisma.$transaction(
        ${resourceName}Ids.map((id, index) => 
          this.prisma.${resourceName}.update({
            where: { id },
            data: { order: index + 1 },
          })
        )
      );
      await this.emitUpdateEvent();
    } catch (error) {
      this.errorLogService.logError('reorder${ResourceName}s', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return this.prisma.${resourceName}.findMany({
        orderBy: { order: 'asc' },
      });
    } catch (error) {
      this.errorLogService.logError('findAll', error);
      throw error;
    }
  }

  async findBy(param: any) {
    try {
      const ${resourceName} = await this.prisma.${resourceName}.findUnique({ where: param });
      if (!${resourceName}) throw new NotFoundException('${ResourceName} not found');
      return ${resourceName};
    } catch (error) {
      this.errorLogService.logError('findBy', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const ${resourceName} = await this.prisma.${resourceName}.findUnique({ where: { id } });
      if (!${resourceName}) throw new NotFoundException('${ResourceName} not found');
      return ${resourceName};
    } catch (error) {
      this.errorLogService.logError('findOne', error);
      throw error;
    }
  }

  async update(id: string, data: Update${ResourceName}Dto) {
    try {
      const updated${ResourceName} = await this.prisma.${resourceName}.update({
        where: { id },
        data,
      });
      await this.emitUpdateEvent();
      return updated${ResourceName};
    } catch (error) {
      this.errorLogService.logError('update${ResourceName}', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const deleted${ResourceName} = await this.prisma.${resourceName}.delete({ 
        where: { id } 
      });
      await this.emitUpdateEvent();
      return deleted${ResourceName};
    } catch (error) {
      this.errorLogService.logError('remove${ResourceName}', error);
      throw error;
    }
  }
}
`;

fs.writeFileSync(
    path.join(baseDir, `${resourceName}.service.ts`),
    serviceContent.trim()
);

// Module File
const moduleContent = `
import { Module } from '@nestjs/common';
import { ${ResourceName}Service } from './${resourceName}.service';
import { ${ResourceName}Controller } from './${resourceName}.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from 'src/socket.gateway';
import { ErrorlogModule } from 'src/errorlog/errorlog.module';

@Module({
  imports: [PrismaModule, ErrorlogModule],
  controllers: [${ResourceName}Controller],
  providers: [${ResourceName}Service, SocketGateway],
  exports: [${ResourceName}Service],
})
export class ${ResourceName}Module {}
`;

fs.writeFileSync(
    path.join(baseDir, `${resourceName}.module.ts`),
    moduleContent.trim()
);

console.log(`Files generated successfully for resource: ${resourceName}`);
console.log(`Created files in ./${resourceName}/ directory:`);
console.log(`- dto/${resourceName}.dto.ts`);
console.log(`- ${resourceName}.controller.ts`);
console.log(`- ${resourceName}.service.ts`);
console.log(`- ${resourceName}.module.ts`);