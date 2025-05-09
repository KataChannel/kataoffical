const fs = require('fs');
const path = require('path');

// Lấy tên module động từ đối số dòng lệnh
const moduleName = process.argv[2];

if (!moduleName) {
  console.error('Vui lòng cung cấp tên module dynamic (ví dụ: user, product).');
  console.error('Cách sử dụng: node generate_dynamic_module.js <module_name>');
  process.exit(1);
}

// Chuyển đổi tên module để sử dụng trong tên tệp và tên class/biến
const lowerCaseModuleName = moduleName.toLowerCase();
const capitalizedModuleName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1).toLowerCase();

// Định nghĩa nội dung mẫu (templates) cho từng tệp
// Sử dụng placeholder như __MODULE_NAME__ và __CAPITALIZED_MODULE_NAME__
const controllerTemplate = `import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
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
  create(@Body() data: any) {
    return this.${lowerCaseModuleName}Service.create(data);
  }

  @ApiOperation({ summary: 'Find ${lowerCaseModuleName}s by parameters' })
  @ApiBody({ type: Object })
  @Post('findby')
  findby(@Body() param: any) {
    return this.${lowerCaseModuleName}Service.findBy(param);
  }

  @ApiOperation({ summary: 'Get all ${lowerCaseModuleName}s' })
  @Get()
  findAll() {
    return this.${lowerCaseModuleName}Service.findAll();
  }

  // Ví dụ: Endpoint lấy dữ liệu cuối cùng được cập nhật, có thể cần chỉnh sửa
  @ApiOperation({ summary: 'Get last updated ${lowerCaseModuleName}' })
  @Get('lastupdated')
  async getLastUpdated${capitalizedModuleName}() {
    // Giả định service có phương thức tương tự, cần kiểm tra logic cụ thể
    return this.${lowerCaseModuleName}Service.getLastUpdated${capitalizedModuleName}();
  }

  @ApiOperation({ summary: 'Find ${lowerCaseModuleName} by ID' })
  @ApiParam({ name: 'id', type: String })
  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.${lowerCaseModuleName}Service.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a ${lowerCaseModuleName}' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object })
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.${lowerCaseModuleName}Service.update(id, data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a ${lowerCaseModuleName}' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.${lowerCaseModuleName}Service.remove(id);
  }

  // Ví dụ: Endpoint sắp xếp lại, có thể cần chỉnh sửa cho phù hợp
  @ApiOperation({ summary: 'Reorder ${lowerCaseModuleName}s' })
  @ApiBody({ schema: { properties: { ${lowerCaseModuleName}Ids: { type: 'array', items: { type: 'string' } } } } })
  @Post('reorder')
  reorder(@Body() body: { ${lowerCaseModuleName}Ids: string[] }) {
    // Giả định service có phương thức tương tự, cần kiểm tra logic cụ thể
    return this.${lowerCaseModuleName}Service.reorder${capitalizedModuleName}s(body.${lowerCaseModuleName}Ids);
  }
}
`;

const moduleTemplate = `import { Module } from '@nestjs/common';
import { ${capitalizedModuleName}Service } from './${lowerCaseModuleName}.service';
import { ${capitalizedModuleName}Controller } from './${lowerCaseModuleName}.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from '../socket.gateway'; // Giả định SocketGateway ở ngoài thư mục module specific
import { ErrorlogModule } from 'src/errorlog/errorlog.module';
  @Module({
    imports: [PrismaModule,ErrorlogModule],
    controllers: [${capitalizedModuleName}Controller],
    providers: [${capitalizedModuleName}Service],
    exports: [${capitalizedModuleName}Service, SocketGateway] // Có thể cần điều chỉnh exports
  })
  export class ${capitalizedModuleName}Module {}
`;

const serviceTemplate = `import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from '../socket.gateway'; // Giả định SocketGateway ở ngoài thư mục module specific

@Injectable()
export class ${capitalizedModuleName}Service {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogService: ErrorlogService,
  ) {}

  // Cần chỉnh sửa logic cụ thể của các phương thức để phù hợp với module mới
  async getLastUpdated${capitalizedModuleName}() {
    try {
      // Giả định có model Prisma cho module này với trường updatedAt
      const lastUpdated = await this.prisma.${lowerCaseModuleName}.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt || 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdated${capitalizedModuleName}', error);
      throw error;
    }
  }

  // Cần chỉnh sửa logic tạo ID nếu có (ví dụ: I1 -> U1 cho user)
  async generateCodeId(): Promise<string> {
    try {
      // Giả định có model Prisma cho module này với trường codeId
      const latest = await this.prisma.${lowerCaseModuleName}.findFirst({
        orderBy: { codeId: 'desc' },
      });
      let nextNumber = 1;
      if (latest) {
        // Regex cần chỉnh sửa nếu format ID thay đổi (ví dụ: /U1(\d+)/ cho user)
        const match = latest.codeId.match(/I1(\\d+)/);
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      // Tiền tố ID cần chỉnh sửa (ví dụ: 'U1' cho user)
      return \`I1\${nextNumber.toString().padStart(5, '0')}\`;
    } catch (error) {
      this._ErrorlogService.logError('generate codeId for ${lowerCaseModuleName}', error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      // Giả định có model Prisma cho module này với trường order và masp
      const maxOrder = await this.prisma.${lowerCaseModuleName}.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const masp = await this.generateCodeId(); // Tên masp có thể không phù hợp
      const created = await this.prisma.${lowerCaseModuleName}.create({
        data: {
          ...data,
          order: newOrder,
          masp: masp, // Tên trường có thể không phù hợp
        },
      });
      this._SocketGateway.send${capitalizedModuleName}Update(); // Event socket có thể cần tên khác
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
      // Giả định có model Prisma cho module này
      const [data, total] = await Promise.all([
        this.prisma.${lowerCaseModuleName}.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' }, // Có thể cần thay đổi orderBy
        }),
        this.prisma.${lowerCaseModuleName}.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit),
      };
    } catch (error) {
      this._ErrorlogService.logError('findBy ${lowerCaseModuleName}', error);
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 20) {
    try {
      const skip = (page - 1) * limit;
      // Giả định có model Prisma cho module này
      const [data, total] = await Promise.all([
        this.prisma.${lowerCaseModuleName}.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' }, // Có thể cần thay đổi orderBy
        }),
        this.prisma.${lowerCaseModuleName}.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit),
      };
    } catch (error) {
      this._ErrorlogService.logError('findAll ${lowerCaseModuleName}', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      // Giả định có model Prisma cho module này
      const ${lowerCaseModuleName} = await this.prisma.${lowerCaseModuleName}.findUnique({ where: { id } });
      if (!${lowerCaseModuleName}) throw new NotFoundException('${capitalizedModuleName} not found');
      return ${lowerCaseModuleName};
    } catch (error) {
      this._ErrorlogService.logError('findOne ${lowerCaseModuleName}', error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      let updated;
      // Cần kiểm tra logic update có trường 'order' hay không
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.${lowerCaseModuleName}.update({ where: { id }, data: rest });
        updated = await this.prisma.${lowerCaseModuleName}.update({ where: { id }, data: { order } });
      } else {
        updated = await this.prisma.${lowerCaseModuleName}.update({ where: { id }, data });
      }
      this._SocketGateway.send${capitalizedModuleName}Update(); // Event socket có thể cần tên khác
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('update${capitalizedModuleName}', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      // Giả định có model Prisma cho module này
      const deleted = await this.prisma.${lowerCaseModuleName}.delete({ where: { id } });
      this._SocketGateway.send${capitalizedModuleName}Update(); // Event socket có thể cần tên khác
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('remove${capitalizedModuleName}', error);
      throw error;
    }
  }

  // Cần chỉnh sửa logic sắp xếp lại nếu có
  async reorder${capitalizedModuleName}s(${lowerCaseModuleName}Ids: string[]) {
    try {
      for (let i = 0; i < ${lowerCaseModuleName}Ids.length; i++) {
        // Giả định có model Prisma cho module này
        await this.prisma.${lowerCaseModuleName}.update({
          where: { id: ${lowerCaseModuleName}Ids[i] },
          data: { order: i + 1 },
        });
      }
      this._SocketGateway.send${capitalizedModuleName}Update(); // Event socket có thể cần tên khác
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorder${capitalizedModuleName}s', error);
      throw error;
    }
  }
}
`;

// SocketGateway có thể là chung cho toàn bộ ứng dụng hoặc riêng cho từng module.
// Dựa trên file bạn cung cấp, SocketGateway không có sự phụ thuộc trực tiếp vào "setting" ngoài việc gọi hàm sendSettingUpdate().
// Chúng ta sẽ giữ SocketGateway là một tệp riêng, có thể import vào các module khác.
// Tuy nhiên, nếu bạn muốn tên event socket cũng dynamic, cần chỉnh sửa SocketGateway template.
// Hiện tại, giữ nguyên template SocketGateway và điều chỉnh tên hàm gọi trong service.
const socketGatewayContent = `import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer() server: Server;

  // Bạn có thể thêm các hàm gửi event dynamic tại đây, hoặc giữ chung chung
  // Ví dụ:
  send${capitalizedModuleName}Update() { this.server.emit('settingupdated'); }
  // sendUserUpdate() { this.server.emit('userupdated'); }

}
`;

// Prisma Schema cũng cần được làm dynamic tên model
const prismaSchemaTemplate = `datasource db {
  provider = "postgresql" // Hoặc database provider bạn sử dụng
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// Model dynamic dựa trên tên module
model ${capitalizedModuleName} {
  id        String   @id @default(uuid())
  codeId      String @unique // Mã đề xuất duy nhất
  key       String   @unique // Key: Tên của cấu hình (ví dụ: 'maintenanceMode', 'welcomeMessage', 'maxUploadSize')
  value     String // Value: Giá trị của cấu hình. Nên lưu dưới dạng String và parse sang kiểu phù hợp khi đọc.
  type      String   @default("string") // Type (Optional): Giúp ứng dụng biết cách parse giá trị (ví dụ: 'string', 'boolean', 'number', 'json')
  description String?   // Description (Optional): Mô tả cấu hình là gì, dùng để làm tài liệu hoặc hiển thị trong Admin UI
  order     Int? @default(1) // Thứ tự hiển thị trong Admin UI
  isActive  Boolean  @default(true) // Trạng thái kích hoạt của cấu hình
  createdById String? // ID của người tạo cấu hình này (nếu cần)
  createdBy  User?   @relation(fields: [createdById], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@index([isActive])
  @@index([order])
  @@index([createdById])
  @@index([codeId])
  @@map("${lowerCaseModuleName}s") // Tên bảng trong database (thường là số nhiều)
}

// Nếu bạn có các model khác, hãy thêm vào đây
// model User {
//   id String @id @default(uuid())
//   // ... các trường khác của User
//   // settings ${capitalizedModuleName}[] // Ví dụ về quan hệ nếu có
// }
`;


// Tạo thư mục module dynamic
const moduleDir = path.join(__dirname, lowerCaseModuleName);
const prismaDir = path.join(__dirname, 'prisma'); // Giữ nguyên thư mục prisma

if (!fs.existsSync(moduleDir)) {
  fs.mkdirSync(moduleDir);
  console.log(`Đã tạo thư mục: ${moduleDir}`);
} else {
  console.log(`Thư mục đã tồn tại: ${moduleDir}`);
}

// // Tạo thư mục 'prisma' nếu chưa tồn tại (cho schema.prisma)
// if (!fs.existsSync(prismaDir)) {
//   fs.mkdirSync(prismaDir);
//   console.log(`Đã tạo thư mục: ${prismaDir}`);
// } else {
//     console.log(`Thư mục đã tồn tại: ${prismaDir}`);
// }


// Định nghĩa các tệp cần tạo và nội dung tương ứng
const filesToCreate = [
  { fileName: `${lowerCaseModuleName}.controller.ts`, content: controllerTemplate, dir: lowerCaseModuleName },
  { fileName: `${lowerCaseModuleName}.module.ts`, content: moduleTemplate, dir: lowerCaseModuleName },
  { fileName: `${lowerCaseModuleName}.service.ts`, content: serviceTemplate, dir: lowerCaseModuleName },
  // Giữ SocketGateway ở thư mục gốc hoặc common, không phải trong thư mục module dynamic
  { fileName: 'socket.gateway.ts', content: socketGatewayContent, dir: lowerCaseModuleName }, // Tạo ở thư mục gốc của script
  { fileName: 'schema.prisma', content: prismaSchemaTemplate, dir: lowerCaseModuleName }
];

// Tạo và ghi nội dung vào các tệp
filesToCreate.forEach(file => {
  const filePath = path.join(__dirname, file.dir, file.fileName);
  // Kiểm tra nếu tệp socket.gateway.ts đã tồn tại và không ghi đè nếu không cần thiết
  if (file.fileName === 'socket.gateway.ts' && fs.existsSync(filePath)) {
      console.log(`Tệp đã tồn tại, bỏ qua ghi đè: ${filePath}`);
      return;
  }
    // Kiểm tra nếu tệp schema.prisma đã tồn tại và không ghi đè nếu không cần thiết
  if (file.fileName === 'schema.prisma' && fs.existsSync(filePath)) {
      console.log(`Tệp đã tồn tại, bỏ qua ghi đè: ${filePath}`);
      return;
  }


  fs.writeFileSync(filePath, file.content);
  console.log(`Đã tạo tệp: ${filePath}`);
});

console.log(`Hoàn thành việc tạo các tệp cho module "${moduleName}".`);
console.log('Lưu ý: Cần xem xét lại và chỉnh sửa logic cụ thể trong các tệp service/controller để phù hợp với module mới.');