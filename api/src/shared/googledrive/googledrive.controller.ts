import { Controller, Get, Post, Delete, Param, Body, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GoogleDriveService } from './googledrive.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChatbotService } from 'src/chatbot/chatbot.service';
import { PrismaService } from 'prisma/prisma.service';
@Controller('googledrive')
export class GoogleDriveController {
  constructor(
    private readonly googleDriveService: GoogleDriveService,
    private readonly _ChatbotService: ChatbotService,
    private readonly prisma: PrismaService,
  ) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = await this.googleDriveService.uploadFile(file);
    const jsonData = await this._ChatbotService.analyzeImage(fileUrl);
    const savedFile = await this.prisma.file.create({
      data: { fileName: file.originalname, jsonData },
    });

    return savedFile;
  }
  @Get('queryfolder')
  async queryFolders(@Query('query') query:any) {    
    return this.googleDriveService.queryFolders(query);
  }
  @Get('listUsersFolder')
  async listUsersFolder(@Query('query') query:any) {    
    return this.googleDriveService.listUsersFolder(query);
  }
  @Get('folders')
  async listFolders() {
    return this.googleDriveService.listFolders();
  }
  @Get('users')
  async listUsers() {
    return this.googleDriveService.listUsers();
  }

  @Post('users')
  async addUser(@Body() body: { email: string; role: 'reader' | 'writer' | 'commenter' | 'fileOrganizer' | 'organizer' }) {
    return this.googleDriveService.addUser(body.email, body.role);
  }

  @Delete('users/:permissionId')
  async removeUser(@Param('permissionId') permissionId: string) {
    return this.googleDriveService.removeUser(permissionId);
  }
}
