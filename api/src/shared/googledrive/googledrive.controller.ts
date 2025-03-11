import { Controller, Get, Post, Delete, Param, Body, Query } from '@nestjs/common';
import { GoogleDriveService } from './googledrive.service';
@Controller('googledrive')
export class GoogleDriveController {
  constructor(private readonly googleDriveService: GoogleDriveService) {}

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
