const fs = require('fs');
const path = require('path');

const donhangServiceContent = `
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; // Giả sử đường dẫn này là cố định
import { ErrorlogService } from 'src/errorlog/errorlog.service'; // Giả sử đường dẫn này là cố định
import { SocketGateway } from 'src/socket.gateway'; // Nằm trong cùng thư mục module

@Injectable()
export class DonhangService { // Service class for Donhang
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway, // Injected gateway
    private _ErrorlogService: ErrorlogService,
  ) {}

  async getLastUpdatedDonhang(): Promise<{ updatedAt: number }> { // Get last update timestamp
    try {
      const lastUpdated = await this.prisma.donhang.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedDonhang', error);
      throw error;
    }
  }

  /*
   * Generates a new Code ID for Donhang.
   * Prefix 'DONHANG' is used.
   */
  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.donhang.findFirst({
        orderBy: { codeId: 'desc' }, // Order by codeId
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const prefix = 'DONHANG';
        const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      const newPrefix = 'DONHANG'; // This prefix will be replaced
      return \`\${newPrefix}\${nextNumber.toString().padStart(5, '0')}\`;
    } catch (error) {
      this._ErrorlogService.logError('generateDonhangCodeId', error);
      throw error;
    }
  }

  async create(data: any) { // Create a new Donhang
    try {
      const maxOrder = await this.prisma.donhang.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = await this.generateCodeId();
      const created = await this.prisma.donhang.create({
        data: {
          ...data,
          order: newOrder,
          codeId: codeId
        },
      });
      this._SocketGateway.sendUpdate('donhang'); // Send update via socket
      return created;
    } catch (error) {
      this._ErrorlogService.logError('createDonhang', error);
      throw error;
    }
  }

  // Finds Donhang records based on parameters
  async findBy(param: any) {
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.donhang.findFirst({
          where,
          orderBy: { order: 'asc' },
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.donhang.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.donhang.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findByDonhang', error);
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 20) { // Find all with pagination
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.donhang.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' }, // Default ordering
        }),
        this.prisma.donhang.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findAllDonhang', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.prisma.donhang.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Donhang not found'); // Specific error message
      return item;
    } catch (error) {
      this._ErrorlogService.logError('findOneDonhang', error);
      throw error;
    }
  }

  async update(id: string, data: any) { // Update existing Donhang
    try {
      let updated;
      if (data.order) {
        // Handle order update separately if needed
        const { order, ...rest } = data;
        await this.prisma.donhang.update({ where: { id }, data: rest });
        updated = await this.prisma.donhang.update({ where: { id }, data: { order } });
      } else {
        updated = await this.prisma.donhang.update({ where: { id }, data });
      }
      this._SocketGateway.sendUpdate('donhang');
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('updateDonhang', error);
      throw error;
    }
  }

  async remove(id: string) { // Remove a Donhang
    try {
      const deleted = await this.prisma.donhang.delete({ where: { id } });
      this._SocketGateway.sendUpdate('donhang');
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('removeDonhang', error);
      throw error;
    }
  }

  async reorderDonhangs(donhangIds: string[]) { // Reorder multiple Donhangs
    try {
      for (let i = 0; i < donhangIds.length; i++) {
        await this.prisma.donhang.update({
          where: { id: donhangIds[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.sendUpdate('donhang'); // Notify after reordering
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorderDonhangs', error);
      throw error;
    }
  }
}
`;

const donhangModuleContent = `
import { Module } from '@nestjs/common';
import { DonhangService } from './donhang.service'; // Local service
import { DonhangController } from './donhang.controller'; // Local controller
import { PrismaModule } from 'prisma/prisma.module'; // Shared Prisma module
import { SocketGateway } from 'src/socket.gateway'; // Local WebSocket gateway
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; // Shared Errorlog module
import { AuthModule } from 'src/auth/auth.module'; // Shared Auth module

@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], // Importing necessary modules
  controllers: [DonhangController],
  providers: [DonhangService, SocketGateway], // Providing service and gateway
  exports: [DonhangService] // Exporting service for use in other modules
})
// This defines the DonhangModule
export class DonhangModule {}
`;

const donhangControllerContent = `
import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { DonhangService } from './donhang.service'; // Service import
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; // Auth guard

@ApiTags('donhang') // Swagger tag
@Controller('donhang') // Route prefix
export class DonhangController { // Controller for Donhang
  constructor(private readonly donhangService: DonhangService) {} // Injecting DonhangService

  @ApiBearerAuth() // Swagger: Bearer authentication
  @ApiOperation({ summary: 'Create a new donhang' }) // Swagger: Operation summary
  @ApiBody({ type: Object }) // Swagger: Request body (should be a DTO)
  @UseGuards(JwtAuthGuard) // Apply authentication guard
  @Post()
  async create(@Body() data: any) { // data should be CreateDonhangDto
    try {
      return await this.donhangService.create(data);
    } catch (error) {
      // Handle creation error
      throw new HttpException(error.message || 'Create failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Find donhangs by parameters' })
  @ApiBody({ type: Object }) // Body for findBy criteria
  @Post('findby')
  async findby(@Body() param: any) {
    try {
      return await this.donhangService.findBy(param);
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get all donhangs with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page (default: 10)' })
  @ApiResponse({ status: 200, description: 'List of donhangs with pagination info' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  async findAll(
    @Query('page') page: string = '1', // Default page
    @Query('limit') limit: string = '10', // Default limit
  ) {
    try {
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);

      // Validate pagination parameters
      if (isNaN(pageNum) || pageNum < 1) {
        throw new HttpException('Page must be a positive integer', HttpStatus.BAD_REQUEST);
      }
      if (isNaN(limitNum) || limitNum < 1) {
        throw new HttpException('Limit must be a positive integer', HttpStatus.BAD_REQUEST);
      }

      return await this.donhangService.findAll(pageNum, limitNum);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch donhangs',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: 'Get last updated donhang' })
  @Get('lastupdated') // Route for last updated
  async getLastUpdatedDonhang() { // Method to get the last updated donhang
    try {
      return await this.donhangService.getLastUpdatedDonhang();
    } catch (error) {
      throw new HttpException(error.message || 'Get last updated failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Find donhang by ID' })
  @ApiParam({ name: 'id', type: String }) // ID parameter for the route
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.donhangService.findOne(id);
    } catch (error) {
      // Handle not found or other errors
      throw new HttpException(error.message || 'Find one failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a donhang' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object }) // Body for update (should be UpdateDonhangDto)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) { // data should be UpdateDonhangDto
    try {
      return await this.donhangService.update(id, data);
    } catch (error) {
      throw new HttpException(error.message || 'Update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a donhang' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.donhangService.remove(id);
    } catch (error) {
      throw new HttpException(error.message || 'Delete failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Reorder donhangs' })
  @ApiBody({
    schema: { // Schema for reordering
      properties: {
        donhangIds: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @Post('reorder') // Route for reordering
  async reorder(@Body() body: { donhangIds: string[] }) { // Expects an array of IDs
    try {
      return await this.donhangService.reorderDonhangs(body.donhangIds);
    } catch (error) {
      throw new HttpException(error.message || 'Reorder failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
`;

// Base module name (the one being copied from)
const baseModuleNameLower = "donhang";
const baseModuleNameCapitalized = "Donhang";

// File definitions based on the 'donhang' module
const fileDefinitions = [
    {
        originalPath: "donhang/donhang.service.ts",
        content: donhangServiceContent,
    },
    {
        originalPath: "donhang/donhang.module.ts",
        content: donhangModuleContent,
    },
    {
        originalPath: "donhang/donhang.controller.ts",
        content: donhangControllerContent,
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
    console.log(`- DTO names and imports if they were module-specific (e.g., CreateDonhangDto -> CreatePermissionDto).`);
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
