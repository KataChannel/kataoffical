const fs = require('fs').promises;
const path = require('path');

// Định nghĩa cấu trúc thư mục và nội dung file
const projectStructure = {
  'backend': {
    'src': {
      'blocks': {
        'block.controller.ts': `import { Controller } from '@nestjs/common';

@Controller('blocks')
export class BlockController {}`,
        'block.service.ts': `import { Injectable } from '@nestjs/common';

@Injectable()
export class BlockService {}`,
        'block.module.ts': `import { Module } from '@nestjs/common';
import { BlockController } from './block.controller';
import { BlockService } from './block.service';

@Module({
  controllers: [BlockController],
  providers: [BlockService],
})
export class BlockModule {}`,
        'dto': {
          'create-block.dto.ts': `import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBlockDto {
  @IsString()
  @IsNotEmpty()
  type: string;
}`,
          'update-block.dto.ts': `import { IsString, IsOptional } from 'class-validator';

export class UpdateBlockDto {
  @IsString()
  @IsOptional()
  type?: string;
}`,
        },
      },
      'pages': {
        'page.controller.ts': `import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';

@Controller('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  create(@Body() createPageDto: CreatePageDto) {
    return this.pageService.createPage(createPageDto);
  }

  @Get(':slug')
  getPage(@Param('slug') slug: string) {
    return this.pageService.getPage(slug);
  }

  @Put(':id')
  updatePage(@Param('id') id: string, @Body('blocks') blocks: any[]) {
    return this.pageService.updatePage(+id, blocks);
  }
}`,
        'page.service.ts': `import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePageDto } from './dto/create-page.dto';

@Injectable()
export class PageService {
  constructor(private prisma: PrismaService) {}

  async createPage(dto: CreatePageDto) {
    return this.prisma.page.create({
      data: {
        title: dto.title,
        slug: dto.slug,
        blocks: dto.blocks,
      },
    });
  }

  async getPage(slug: string) {
    return this.prisma.page.findUnique({
      where: { slug },
    });
  }

  async updatePage(id: number, blocks: any[]) {
    return this.prisma.page.update({
      where: { id },
      data: { blocks },
    });
  }
}`,
        'page.module.ts': `import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}`,
        'dto': {
          'create-page.dto.ts': `import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreatePageDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsArray()
  blocks: any[];
}`,
          'update-page.dto.ts': `import { IsArray, IsOptional } from 'class-validator';

export class UpdatePageDto {
  @IsArray()
  @IsOptional()
  blocks?: any[];
}`,
        },
      },
      'prisma': {
        'prisma.service.ts': `import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}`,
        'prisma.module.ts': `import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}`,
      },
    },
    'prisma': {
      'schema.prisma': `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Page {
  id        Int      @id @default(autoincrement())
  title     String
  slug      String   @unique
  blocks    Json
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model BlockTemplate {
  id          Int      @id @default(autoincrement())
  type        String
  defaultConfig Json
  createdAt   DateTime @default(now())
}`,
    },
  },
  'frontend': {
    'src': {
      'app': {
        'landing-page-builder': {
          'components': {
            'block': {
              'block.component.ts': `import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Block } from '../../models/block.model';

@Component({
  selector: 'app-block',
  template: \`
    <div class="block">
      <ng-container [ngSwitch]="block.type">
        <input *ngSwitchCase="'text'" [(ngModel)]="block.config.content" (change)="update()">
        <img *ngSwitchCase="'image'" [src]="block.config.url" (click)="updateUrl()">
        <button *ngSwitchCase="'button'" [ngStyle]="block.config.style">{{ block.config.content }}</button>
      </ng-container>
      <button class="delete-btn" (click)="delete.emit()">Delete</button>
    </div>
  \`,
})
export class BlockComponent {
  @Input() block: Block;
  @Output() update = new EventEmitter<Block>();
  @Output() delete = new EventEmitter<void>();

  update() {
    this.update.emit(this.block);
  }

  updateUrl() {
    const url = prompt('Enter image URL:', this.block.config.url);
    if (url) {
      this.block.config.url = url;
      this.update.emit(this.block);
    }
  }
}`,
              'block.component.html': `<div class="block">
  <ng-container [ngSwitch]="block.type">
    <input *ngSwitchCase="'text'" [(ngModel)]="block.config.content" (change)="update()">
    <img *ngSwitchCase="'image'" [src]="block.config.url" (click)="updateUrl()">
    <button *ngSwitchCase="'button'" [ngStyle]="block.config.style">{{ block.config.content }}</button>
  </ng-container>
  <button class="delete-btn" (click)="delete.emit()">Delete</button>
</div>`,
              'block.component.scss': `.block {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 5px 0;
}

.delete-btn {
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
}`,
            },
            'block-list': {
              'block-list.component.ts': `import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Block } from '../../models/block.model';

@Component({
  selector: 'app-block-list',
  template: \`
    <div cdkDropList (cdkDropListDropped)="drop($event)">
      <div *ngFor="let block of blocks; let i = index" cdkDrag>
        <app-block [block]="block" (update)="updateBlock(i, $event)" (delete)="deleteBlock(i)"></app-block>
      </div>
    </div>
  \`,
})
export class BlockListComponent {
  @Input() blocks: Block[] = [];
  @Output() updateBlock = new EventEmitter<{ index: number; block: Block }>();
  @Output() deleteBlock = new EventEmitter<number>();
  @Output() drop = new EventEmitter<any>();

  updateBlockHandler(index: number, block: Block) {
    this.updateBlock.emit({ index, block });
  }

  deleteBlockHandler(index: number) {
    this.deleteBlock.emit(index);
  }
}`,
              'block-list.component.html': `<div cdkDropList (cdkDropListDropped)="drop($event)">
  <div *ngFor="let block of blocks; let i = index" cdkDrag>
    <app-block [block]="block" (update)="updateBlock(i, $event)" (delete)="deleteBlock(i)"></app-block>
  </div>
</div>`,
              'block-list.component.scss': ``,
            },
          },
          'landing-page-builder.component.ts': `import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PageService } from '../services/page.service';
import { Block } from '../models/block.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-landing-page-builder',
  templateUrl: './landing-page-builder.component.html',
  styleUrls: ['./landing-page-builder.component.scss'],
})
export class LandingPageBuilderComponent implements OnInit {
  blocks: Block[] = [];
  pageId: number;
  slug: string;

  constructor(private pageService: PageService) {}

  ngOnInit() {
    this.slug = 'example-page';
    this.loadPage();
  }

  loadPage() {
    this.pageService.getPage(this.slug).subscribe((page) => {
      this.pageId = page.id;
      this.blocks = page.blocks || [];
    });
  }

  addBlock(type: Block['type']) {
    const newBlock: Block = {
      id: uuidv4(),
      type,
      config: {
        content: type === 'text' ? 'New Text' : '',
        url: type === 'image' ? 'https://example.com/image.jpg' : '',
        style: {},
      },
    };
    this.blocks.push(newBlock);
  }

  updateBlock(index: number, updatedBlock: Block) {
    this.blocks[index] = updatedBlock;
  }

  deleteBlock(index: number) {
    this.blocks.splice(index, 1);
  }

  drop(event: CdkDragDrop<Block[]>) {
    moveItemInArray(this.blocks, event.previousIndex, event.currentIndex);
  }

  savePage() {
    this.pageService.updatePage(this.pageId, this.blocks).subscribe(() => {
      console.log('Page saved successfully');
    });
  }
}`,
          'landing-page-builder.component.html': `<div class="builder-container">
  <div class="sidebar">
    <h3>Add Block</h3>
    <button (click)="addBlock('text')">Text</button>
    <button (click)="addBlock('image')">Image</button>
    <button (click)="addBlock('button')">Button</button>
  </div>

  <div class="canvas">
    <app-block-list [blocks]="blocks" (updateBlock)="updateBlock($event.index, $event.block)" 
                    (deleteBlock)="deleteBlock($event)" (drop)="drop($event)"></app-block-list>
  </div>

  <button class="save-btn" (click)="savePage()">Save Page</button>
</div>`,
          'landing-page-builder.component.scss': `.builder-container {
  display: flex;
}

.sidebar {
  width: 200px;
  padding: 20px;
  border-right: 1px solid #ccc;
}

.canvas {
  flex: 1;
  padding: 20px;
}

.save-btn {
  margin: 20px;
  padding: 10px 20px;
}`,
          'landing-page-builder.module.ts': `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LandingPageBuilderComponent } from './landing-page-builder.component';
import { BlockComponent } from './components/block/block.component';
import { BlockListComponent } from './components/block-list/block-list.component';

@NgModule({
  declarations: [LandingPageBuilderComponent, BlockComponent, BlockListComponent],
  imports: [CommonModule, FormsModule, DragDropModule],
  exports: [LandingPageBuilderComponent],
})
export class LandingPageBuilderModule {}`,
        },
        'services': {
          'page.service.ts': `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private apiUrl = 'http://localhost:3000/pages';

  constructor(private http: HttpClient) {}

  getPage(slug: string): Observable<Page> {
    return this.http.get<Page>(\\\`\\\${this.apiUrl}/\\\${slug}\\\`);
  }

  updatePage(id: number, blocks: any[]): Observable<Page> {
    return this.http.put<Page>(\\\`\\\${this.apiUrl}/\\\${id}\\\`, { blocks });
  }
}`,
        },
        'models': {
          'block.model.ts': `export interface Block {
  id: string;
  type: 'text' | 'image' | 'button' | 'video';
  config: {
    content?: string;
    url?: string;
    style?: { [key: string]: string };
  };
}`,
          'page.model.ts': `export interface Page {
  id: number;
  title: string;
  slug: string;
  blocks: Block[];
}`,
        },
      },
    },
  },
};

// Hàm tạo thư mục và file đệ quy
async function createStructure(basePath, structure) {
  for (const [key, value] of Object.entries(structure)) {
    const currentPath = path.join(basePath, key);

    if (typeof value === 'string') {
      // Tạo file
      await fs.writeFile(currentPath, value, 'utf8');
      console.log(`Created file: ${currentPath}`);
    } else {
      // Tạo thư mục
      await fs.mkdir(currentPath, { recursive: true });
      console.log(`Created directory: ${currentPath}`);
      // Gọi đệ quy cho thư mục con
      await createStructure(currentPath, value);
    }
  }
}

// Hàm chính
async function main() {
  const rootDir = path.join(__dirname, 'landing-page-project');
  try {
    await fs.mkdir(rootDir, { recursive: true });
    await createStructure(rootDir, projectStructure);
    console.log('Project structure generated successfully!');
  } catch (error) {
    console.error('Error generating project structure:', error);
  }
}

main();