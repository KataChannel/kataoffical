import { Controller, Get, Post, Body, Param, Patch, Delete, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { QuanlydriveService } from './quanlydrive.service';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('quanlydrive')
export class QuanlydriveController {
  constructor(private readonly quanlydriveService: QuanlydriveService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const fileUrl = await this.quanlydriveService.uploadFile(file);
    console.log(fileUrl);
    
    // const jsonData = await this._ChatbotService.analyzeImage(fileUrl);
    // const savedFile = await this.prisma.file.create({
    //   data: { fileName: file.originalname, jsonData },
    // });
    // return savedFile;
  }
  @Get('queryfolder')
  async queryFolders(@Query('query') query:any) {    
    return this.quanlydriveService.queryFolders(query);
  }
  @Get('listUsersFolder')
  async listUsersFolder(@Query('query') query:any) {    
    return this.quanlydriveService.listUsersFolder(query);
  }
  @Post('users')
  async addUser(@Body() body: { email: string;driveId:any, role: 'reader' | 'writer' | 'commenter' | 'fileOrganizer' | 'organizer' }) {
    return this.quanlydriveService.addUser(body.email,body.driveId, body.role);
  }

  @Delete('users/:permissionId/:driveId')
  async removeUser(@Param('permissionId') permissionId: string,@Param('driveId') driveId:any) {
    return this.quanlydriveService.removeUser(permissionId,driveId);
  }
  @Post('search')
  async search(@Body() searchParams: any) {
    return this.quanlydriveService.search(searchParams);
  }
  @Post()
  create(@Body() createquanlyqrcodeDto: any) {
    return this.quanlydriveService.create(createquanlyqrcodeDto);
  }
  @Post('findby')
  findby(@Body() param: any) {
    return this.quanlydriveService.findby(param);
  }
  @Get()
  findAll(@Query('driveId') driveId: string) {
    return this.quanlydriveService.findAll(driveId);
  }
  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.quanlydriveService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.quanlydriveService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quanlydriveService.remove(id);
  }
  
}