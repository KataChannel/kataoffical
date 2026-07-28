const fs = require('fs');
const path = require('path');

const sanphamServiceContent = `
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; 
import { ErrorlogService } from 'src/errorlog/errorlog.service'; 
import { SocketGateway } from 'src/socket.gateway'; 
@Injectable()
export class SanphamService { 
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway, 
    private _ErrorlogService: ErrorlogService,
  ) {}
  async getLastUpdatedSanpham(): Promise<{ updatedAt: number }> { 
    try {
      const lastUpdated = await this.prisma.sanpham.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      throw error;
    }
  }
  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.sanpham.findFirst({
        orderBy: { codeId: 'desc' }, 
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const prefix = 'SP';
        const match = latest.codeId.match(new RegExp(prefix + '(\\\\d+)'));
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      const newPrefix = 'SP'; // This prefix will be replaced
      return \`\${newPrefix}\${nextNumber.toString().padStart(5, '0')}\`;
    } catch (error) {
      this._ErrorlogService.logError('generateSanphamCodeId', error);
      throw error;
    }
  }
  
async create(data: any) { 
  try {
    const maxOrder = await this.prisma.sanpham.aggregate({
      _max: { order: true },
    });
    const newOrder = (maxOrder._max?.order || 0) + 1;
    const codeId = await this.generateCodeId();
    
    // Extract the expected fields from the payload
    const { title, danhmucId, bienthe, donvitinh, price, status, ...restData } = data;
    
    const created = await this.prisma.sanpham.create({
      data: {
        title,
        bienthe,
        donvitinh,
        giagoc: price || 0, // Map 'price' to 'giagoc' as per the schema
        status: status || 'draft',
        ...restData,
        order: newOrder,
        codeId: codeId,
        // Connect the danhmuc relation using danhmucId
        ...(danhmucId && { danhmuc: { connect: { id: danhmucId } } }),
      },
    });
    
    this._SocketGateway.sendUpdate('sanpham'); 
    return created;
  } catch (error) {
    console.log('Error creating sanpham:', error);
    this._ErrorlogService.logError('createSanpham', error);
    throw error;
  }
}


  async findBy(param: any) {
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.sanpham.findFirst({
          where,
          orderBy: { order: 'asc' },
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.sanpham.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.sanpham.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findBySanpham', error);
      throw error;
    }
  }

async findAll(query: any) {
  console.log('findAllSanpham query:', query);
  
  try {
    const { page, pageSize, sortBy, sortOrder, search, priceMin, priceMax, category } = query;
    const numericPage = Number(page);
    const numericPageSize = Number(pageSize);
    const skip = (numericPage - 1) * numericPageSize;
    const take = numericPageSize;
    const where: any = {};
    // Xử lý tìm kiếm chung (OR condition)
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }
    // Xử lý lọc theo trường cụ thể
    if (category) {
      where.category = { equals: category, mode: 'insensitive' };
    }
    if (priceMin || priceMax) {
      where.price = {};
      if (priceMin) {
        where.price.gte = priceMin;
      }
      if (priceMax) {
        where.price.lte = priceMax;
      }
    }
    const orderBy: any = {};
    if (sortBy && sortOrder) {
      orderBy[sortBy] = sortOrder;
    } else {
      orderBy.createdAt = 'desc'; // Mặc định nếu không có sortBy/sortOrder
    }

    const [sanphams, total] = await this.prisma.$transaction([
      this.prisma.sanpham.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      this.prisma.sanpham.count({ where }),
    ]);
    
    return {
      data: sanphams,
      total: Number(total),
      page: numericPage,
      pageSize: numericPageSize,
      totalPages: Math.ceil(Number(total) / numericPageSize),
    };
  } catch (error) {
    console.log('Error in findAllSanpham:', error);
    throw error;
  }
}

  async findOne(id: string) {
    try {
      const item = await this.prisma.sanpham.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Sanpham not found'); 
      return item;
    } catch (error) {
      console.log('Error finding sanpham:', error);
      throw error;
    }
  }


async update(id: string, data: any) { 
  try {
    const { title, danhmucId, bienthe, donvitinh, price, status, order, ...restData } = data;
    
    const updated = await this.prisma.sanpham.update({ 
      where: { id }, 
      data: {
        title,
        bienthe,
        donvitinh,
        giagoc: price || 0, // Map 'price' to 'giagoc' as per the schema
        status: status || 'draft',
        order: order || undefined, // Include order if provided
        ...restData,
        // Connect the danhmuc relation using danhmucId if provided
        ...(danhmucId && { danhmuc: { connect: { id: danhmucId } } }),
        // If danhmucId is explicitly null, disconnect the relation
        ...(data.danhmucId === null && { danhmuc: { disconnect: true } }),
      },
    });
    this._SocketGateway.sendUpdate('sanpham');
    return updated;
  } catch (error) {
    console.log('Error updating sanpham:', error);
    throw error;
  }
}

  async remove(id: string) { 
    try {
      const deleted = await this.prisma.sanpham.delete({ where: { id } });
      this._SocketGateway.sendUpdate('sanpham');
      return deleted;
    } catch (error) {
      console.log('Error removing sanpham:', error);
      throw error;
    }
  }
  async reorderSanphams(sanphamIds: string[]) { 
    try {
      for (let i = 0; i < sanphamIds.length; i++) {
        await this.prisma.sanpham.update({
          where: { id: sanphamIds[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.sendUpdate('sanpham'); 
      return { status: 'success' };
    } catch (error) {
      console.log('Error reordering sanpham:', error);
      throw error;
    }
  }
}

`;

const sanphamModuleContent = `
import { Module } from '@nestjs/common';
import { SanphamService } from './sanpham.service'; 
import { SanphamController } from './sanpham.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], 
  controllers: [SanphamController],
  providers: [SanphamService, SocketGateway], 
  exports: [SanphamService] 
})
export class SanphamModule {}
`;

const sanphamPrismaContent = `
model sanpham {
  id              String   @id @default(uuid())
  codeId          String   @unique
  title           String
  description     String?
  order           Int?     @default(1)
  createdBy       String? 
  createdByUser   User?   @relation(fields: [createdBy], references: [id])
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
`;

const sanphamControllerContent = `
import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { SanphamService } from './sanpham.service'; 
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; 
import { Audit } from 'src/auditlog/audit.decorator';
import { AuditAction } from '@prisma/client';
@ApiTags('sanpham') 
@Controller('sanpham') 
export class SanphamController { 
  constructor(private readonly sanphamService: SanphamService) {} 
  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Create a new sanpham' }) 
  @ApiBody({ type: Object }) 
  @UseGuards(JwtAuthGuard) 
  @Post()
  @Audit({ entity: 'Sanpham', action: AuditAction.CREATE, includeResponse: true })
  async create(@Body() data: any) { 
    try {
      return await this.sanphamService.create(data);
    } catch (error) {
      throw new HttpException(error.message || 'Create failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Find sanphams by parameters' })
  @ApiBody({ type: Object }) 
  @Post('findby')
  async findby(@Body() param: any) {
    try {
      return await this.sanphamService.findBy(param);
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @ApiOperation({ summary: 'Get all sanphams with pagination' })
  @ApiResponse({ status: 200, description: 'List of sanphams with pagination info' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  async findAll(@Query() query: any) {
    try {
      return await this.sanphamService.findAll(query);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch sanphams',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } 
  }
  
  @ApiOperation({ summary: 'Get last updated sanpham' })
  @Get('lastupdated') 
  async getLastUpdatedSanpham() { 
    try {
      return await this.sanphamService.getLastUpdatedSanpham();
    } catch (error) {
      throw new HttpException(error.message || 'Get last updated failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Find sanpham by ID' })
  @ApiParam({ name: 'id', type: String }) 
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.sanphamService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message || 'Find one failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a sanpham' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object }) 
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @Audit({ entity: 'Sanpham', action: AuditAction.UPDATE, includeResponse: true })
  async update(@Param('id') id: string, @Body() data: any) { 
    try {
      return await this.sanphamService.update(id, data);
    } catch (error) {
      throw new HttpException(error.message || 'Update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a sanpham' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Audit({ entity: 'Sanpham', action: AuditAction.DELETE })
  async remove(@Param('id') id: string) {
    try {
      return await this.sanphamService.remove(id);
    } catch (error) {
      throw new HttpException(error.message || 'Delete failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Reorder sanphams' })
  @ApiBody({
    schema: { 
      properties: {
        sanphamIds: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @Post('reorder') 
  async reorder(@Body() body: { sanphamIds: string[] }) { 
    try {
      return await this.sanphamService.reorderSanphams(body.sanphamIds);
    } catch (error) {
      throw new HttpException(error.message || 'Reorder failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

`;

// Base module name (the one being copied from)
const baseModuleNameLower = "sanpham";
const baseModuleNameCapitalized = "Sanpham";

// File definitions based on the 'sanpham' module
const fileDefinitions = [
    {
        originalPath: "sanpham/sanpham.service.ts",
        content: sanphamServiceContent,
    },
    {
        originalPath: "sanpham/sanpham.module.ts",
        content: sanphamModuleContent,
    },
    {
        originalPath: "sanpham/sanpham.controller.ts",
        content: sanphamControllerContent,
    },
    {
        originalPath: "sanpham/sanpham.prisma",
        content: sanphamPrismaContent,
    }
];

/**
 * Removes single-line and multi-line comments from a string.
 * @param {string} fileContent The content of the file.
 * @returns {string} The file content without comments.
 */
function removeComments(fileContent) {
    let noCommentContent = fileContent;
    // Remove multi-line comments first (/* ... */)
    noCommentContent = noCommentContent.replace(/\/\*[\s\S]*?\*\/|\/\/(?=[^\r\n]*)/g, (match) => {
        // If it's a block comment, remove it. If it's a line comment starting with //, keep it for next step if not already handled.
        // This more complex regex handles cases like http:// inside a block comment correctly.
        // A simpler approach is two separate replaces.
        if (match.startsWith('/*')) {
            return '';
        }
        return match; // Keep single line comments for the next regex to handle more cleanly
    });
    // Remove single-line comments (// ...)
    // This regex ensures it doesn't remove "http://" or "ftp://"
    noCommentContent = noCommentContent.replace(/(?<!:)\/\/[^\r\n]*/g, '');
    // Remove empty lines that might result from comment removal
    noCommentContent = noCommentContent.replace(/^\s*[\r\n]/gm, '');
    return noCommentContent;
}


function createModuleFiles(newModuleNameInput) {
    if (!newModuleNameInput || typeof newModuleNameInput !== 'string' || newModuleNameInput.trim() === "") {
        console.error("Error: Please provide a valid module name.");
        process.exit(1);
    }

    const newModuleLower = newModuleNameInput.toLowerCase().replace(/\s+/g, '_');
    const newModuleCapitalized = newModuleLower.charAt(0).toUpperCase() + newModuleLower.slice(1);

    console.log(`Creating files for module: ${newModuleLower}`);
    console.log(`Using capitalized form: ${newModuleCapitalized}`);

    fileDefinitions.forEach(fileDef => {
      
        const replacements = {
          [baseModuleNameLower]: newModuleLower,
          [`${baseModuleNameLower}.module.ts`]: `${newModuleLower}.module.ts`,
          [`${baseModuleNameLower}.controller.ts`]: `${newModuleLower}.controller.ts`,
          [`${baseModuleNameLower}.service.ts`]: `${newModuleLower}.service.ts`,
          [`${baseModuleNameLower}.prisma`]: `${newModuleLower}.prisma`,
        };

        const newPathString = fileDef.originalPath
          .split('/')
          .map(segment => replacements[segment.toLowerCase()] || segment)
          .join('/');

        const absolutePath = path.resolve(__dirname, newPathString);
        
        let newContent = fileDef.content;

        // 1. Remove comments first
        newContent = removeComments(newContent);

        // 2. Replace module names
        const capitalizedRegex = new RegExp(baseModuleNameCapitalized, 'g');
        newContent = newContent.replace(capitalizedRegex, newModuleCapitalized);

        const lowerCaseRegex = new RegExp(baseModuleNameLower, 'g');
        newContent = newContent.replace(lowerCaseRegex, newModuleLower);

        const baseSocketGatewayClass = `${baseModuleNameCapitalized}SocketGateway`;
        const newSocketGatewayClass = `${newModuleCapitalized}SocketGateway`;
        newContent = newContent.replace(new RegExp(baseSocketGatewayClass, 'g'), newSocketGatewayClass);

        const prismaModelRegex = new RegExp(`prisma.${baseModuleNameLower}`, 'g');
        newContent = newContent.replace(prismaModelRegex, `prisma.${newModuleLower}`);

        try {
            const directoryPath = path.dirname(absolutePath);
            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath, { recursive: true });
                console.log(`Created directory: ${directoryPath}`);
            }

            fs.writeFileSync(absolutePath, newContent, 'utf8');
            console.log(`Created file: ${absolutePath}`);

        } catch (error) {
            console.error(`Error creating file ${absolutePath}:`, error);
        }
    });

    console.log(`\nFinished creating files for module '${newModuleLower}'. All comments have been removed.`);
    console.log(`\nIMPORTANT: Review the generated files, especially:`);
    console.log(`- Prisma model names (e.g., 'prisma.${newModuleLower}') if your schema follows this pattern.`);
    console.log(`- DTO names and imports if they were module-specific (e.g., CreateSanphamDto -> CreatePermissionDto).`);
    console.log(`- Any hardcoded strings or logic that might be specific to the '${baseModuleNameLower}' module and needs manual adjustment for '${newModuleLower}'.`);
}

// --- Main execution ---
const args = process.argv.slice(2);
if (args.length === 0) {
    console.log("Usage: node create_module.js <NewModuleName>");
    console.log("Example: node create_module.js permission");
    process.exit(1);
}

const newModuleNameInput = args[0];
createModuleFiles(newModuleNameInput);
