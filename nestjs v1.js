import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
// Generate file with dynamic content
async function generateFile(filePath, content) {
    try {
      await fs.ensureDir(path.dirname(filePath));
      await fs.writeFile(filePath, content.trim());
      console.log(chalk.green(`Created: ${filePath}`));
    } catch (error) {
      console.error(chalk.red(`Error creating ${filePath}:`), error.message);
    }
  }
  
  // Generate all files
  export async function generateNestFiles({ name, outputDir }) {
    const Viethoa = name.charAt(0).toUpperCase() + name.slice(1);
    const TenThuong = name.toLowerCase().replace(/\s+/g, '-');
  
    // Define file paths
    const componentFile = path.join(outputDir, `${TenThuong}.controller.ts`);
    const serviceFile = path.join(outputDir, `${TenThuong}.service.ts`);
    const moduleFile = path.join(outputDir, `${TenThuong}.module.ts`);
    const entityFile = path.join(outputDir, `entities/${TenThuong}.entity.ts`);
  
  
    // Define file content
    const componentContent = `
  import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
  import {${Viethoa}Service } from './${Viethoa.toLowerCase()}.service';
  @Controller('${Viethoa}')
  export class ${Viethoa}Controller {
    constructor(private readonly ${Viethoa}Service:${Viethoa}Service) {}
  
    @Post()
    create(@Body() data: any) {
      return this.${Viethoa}Service.create(data);
    }
    @Get()
    async findAll() {
      return await this.${Viethoa}Service.findAll();
    }
    @Get('findid/:id')
    async findOne(@Param('id') id: string) {
      return await this.${Viethoa}Service.findid(id);
    }
    @Get('findslug/:slug')
    async findslug(@Param('slug') slug: string) {
      return await this.${Viethoa}Service.findslug(slug);
    }
    @Get('pagination')
    async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
         return await this.${Viethoa}Service.findPagination(page,perPage);
      }
    @Post('search')
      async findQuery(@Body() SearchParams: any){
        return await this.${Viethoa}Service.findQuery(SearchParams);
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body() data: any) {
      return this.${Viethoa}Service.update(id, data);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.${Viethoa}Service.remove(id);
    }
  }
  `;
  
  
    const serviceContent = `
  import { Injectable } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Like, Repository } from 'typeorm';
  import { ${Viethoa}Entity } from './entities/${Viethoa.toLowerCase()}.entity';
  @Injectable()
  export class ${Viethoa}Service {
    constructor(
      @InjectRepository(${Viethoa}Entity)
      private ${Viethoa}Repository: Repository<${Viethoa}Entity>
    ) { }
    async create(data: any) {
      const check = await this.findSHD(data)
      if(!check) {
        this.${Viethoa}Repository.create(data);
        return await this.${Viethoa}Repository.save(data);
      }
      else {
        return { error: 1001, data: "Trùng Dữ Liệu" }
      }
  
    }
  
    async findAll() {
      return await this.${Viethoa}Repository.find();
    }
    async findid(id: string) {
      return await this.${Viethoa}Repository.findOne({ where: { id: id } });
    }
    async findSHD(data: any) {
      return await this.${Viethoa}Repository.findOne({
        where: {
          Title: data.Title,
          Type: data.Type
        },
      });
    }
    async findslug(Title: any) {
      return await this.${Viethoa}Repository.findOne({
        where: { Title: Title },
      });
    }
    async findPagination(page: number, perPage: number) {
      const skip = (page - 1) * perPage;
      const totalItems = await this.${Viethoa}Repository.count();
      const ${Viethoa}s = await this.${Viethoa}Repository.find({ skip, take: perPage });
      return {
        currentPage: page,
        perPage,
        totalItems,
        totalPages: Math.ceil(totalItems / perPage),
        data: ${Viethoa}s,
      };
    }
    async findQuery(params: any) {
      console.error(params);
      const queryBuilder = this.${Viethoa}Repository.createQueryBuilder('${Viethoa}');
      if (params.Batdau && params.Ketthuc) {
        queryBuilder.andWhere('${Viethoa}.CreateAt BETWEEN :startDate AND :endDate', {
          startDate: params.Batdau,
          endDate: params.Ketthuc,
        });
      }
      if (params.Title) {
        queryBuilder.andWhere('${Viethoa}.Title LIKE :Title', { SDT: \`%\${params.Title}%\` });
      }
      const [items, totalCount] = await queryBuilder
        .limit(params.pageSize || 10) // Set a default page size if not provided
        .offset(params.pageNumber * params.pageSize || 0)
        .getManyAndCount();
      console.log(items, totalCount);
  
      return { items, totalCount };
    }
    async update(id: string, Update${Viethoa}Dto: any) {
      this.${Viethoa}Repository.save(Update${Viethoa}Dto);
      return await this.${Viethoa}Repository.findOne({ where: { id: id } });
    }
    async remove(id: string) {
      console.error(id)
      await this.${Viethoa}Repository.delete(id);
      return { deleted: true };
    }
  }
  `;
  
  
  
  
    const moduleContent = `
  import { Module } from '@nestjs/common';
  import { ${Viethoa}Service } from './${Viethoa.toLowerCase()}.service';
  import { ${Viethoa}Controller } from './${Viethoa.toLowerCase()}.controller';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { ${Viethoa}Entity } from './entities/${Viethoa.toLowerCase()}.entity';
  @Module({
    imports: [TypeOrmModule.forFeature([${Viethoa}Entity])],
    controllers: [${Viethoa}Controller],
    providers: [${Viethoa}Service],
    exports:[${Viethoa}Service]
  })
  export class ${Viethoa}Module {}
  
  `;
  
  const entityContent = `
   import {
     Entity,
     Column,
     PrimaryGeneratedColumn,
     CreateDateColumn,
     UpdateDateColumn,
     DeleteDateColumn,
   } from 'typeorm';
   @Entity('${Viethoa.toLowerCase()}', {orderBy: { CreateAt: 'DESC' } })
   export class ${Viethoa}Entity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ nullable: true,default:'0'})
    ref_id: string;
    @Column()
    SDT: string;
    @Column({collation: "utf8_general_ci"})
    idGroup: string;
    @Column({collation: "utf8_general_ci"})
    Code: string;
    @Column({collation: "utf8_general_ci"})
    Hoten: string;
    @Column({collation: "utf8_general_ci"})
    email: string;
    @Column({ type: "text", collation: "utf8_general_ci" })
    Gioitinh: string;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
    Image: string;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
    EditChinhanhs: string;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
    Diachi: string;
    @Column()
    password: string;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
    Profile: string;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
    Phanquyen: string;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
    Menu: string;
    @Column({collation: "utf8_general_ci",type:"simple-array"})
    fcmToken: string[];
    @Column({ default: '' })
    Type: string;
    @Column({ default: 1 })
    Ordering: number;
    @Column({ default: 0 })
    Status: number;
    @CreateDateColumn()
    CreateAt: Date;
    @UpdateDateColumn()
    UpdateAt: Date;
    @DeleteDateColumn()
    DeleteAt: Date;
    @Column({ nullable: true })
    idCreate: string;
   }
  `;
  
    // Generate primary files
    await generateFile(componentFile, componentContent);
    await generateFile(serviceFile, serviceContent);
    await generateFile(moduleFile, moduleContent);
    await generateFile(entityFile, entityContent);
  }