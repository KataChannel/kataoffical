import { Injectable, NotFoundException } from '@nestjs/common';
import { google } from 'googleapis';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { nest_children } from 'src/shared/utils/shared.utils';
import { SocketGateway } from 'src/socket.gateway';
import { Readable } from 'stream';
@Injectable()
export class QuanlydriveService {
  private drive;
  private uploaddriveId = process.env.SHARED_UPLOAD_DRIVE_ID;
  constructor(
    private readonly _SocketGateway: SocketGateway,
    private readonly prisma: PrismaService,
    private _ErrorlogService: ErrorlogService,
  ) {
    const serviceAccount = 'credentials.json';
    // const serviceAccount = 'dist/credentials.json';
    const auth = new google.auth.GoogleAuth({
      keyFile: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
    this.drive = google.drive({ version: 'v3', auth });
  }
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const response = await this.drive.files.create({
      requestBody: {
        name: file.originalname,
        parents: [this.uploaddriveId],
      },
      media: {
        mimeType: file.mimetype,
        body: Readable.from(file.buffer),
      },
    });
    // Tạo link public
    await this.drive.permissions.create({
      fileId: response.data.id,
      requestBody: { role: 'reader', type: 'anyone' },
    });
    // const fileUrl = `https://drive.google.com/uc?id=${response.data.id}`;
    // const fileUrl = `https://i.ibb.co/ynR7dC9L/bill.jpg`;
    const fileUrl = `https://drive.google.com/uc?export=view&id=${response.data.id}`;
    // const fileUrl = `https://drive.usercontent.google.com/download?id=${response.data.id}&authuser=0`;
    return fileUrl;
  }

  async queryFolders(driveId: string): Promise<any[]> {
    try {
      const response = await this.drive.files.list({
        q: `'${driveId}' in parents and trashed = false`,
        fields: 'files(id, name, mimeType, createdTime, modifiedTime, size)',
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
      });
      const files = response.data.files || [];
      const folderItems = files.map((item: any) => ({
        googleId: item.id,
        name: item.name,
        parentId: driveId,
        type:
          item.mimeType === 'application/vnd.google-apps.folder'
            ? 'folder'
            : 'file',
        mimeType: item.mimeType,
        size: Number(item.size) || 0,
      }));
      await this.prisma.$transaction(
        folderItems.map((item: any) =>
          this.prisma.driveItem.upsert({
            where: { googleId: item.googleId },
            update: item,
            create: item,
          }),
        ),
      );
      return folderItems;
    } catch (error) {
      console.log(error);
      // await this._ErrorlogService.logError(error, 'queryFolders');
      throw new Error('Failed to query folders');
    }
  }

  async UpdateAllFolderDrive(driveId:any){
    const foldes = await this.queryFolders(driveId);
    console.log(foldes);
    
    // this.queryFolders(driveId)
  }
  async listUsersFolder(driveId: any) {
    const response = await this.drive.permissions.list({
      fileId: driveId, // ID của Shared Drive
      supportsAllDrives: true,
      fields: 'permissions(id,emailAddress,type,kind,role)',
    });
    const users = response.data.permissions
    const driveExists = await this.prisma.driveItem.findUnique({
      where: { googleId: driveId },
    });
    console.log('driveExists',driveExists);
    
    if (driveExists) {
    const userItem = users.map((user: any) => ({
      userIdDrive: user.id,
      driveId: driveExists.id,
      googleId: driveExists.googleId,
      emailAddress: user.emailAddress,
      type: user.type,
      kind: user.kind,
      role: user.role,
    }));   
    console.log('userItem',userItem);
       
      // Chỉ thực hiện transaction nếu drive tồn tại
      await this.prisma.$transaction(
        userItem.map((item: any) =>
          this.prisma.permissionDrive.upsert({
            where: { uniqueUserDriveItemPermission: { userIdDrive: item.userIdDrive, driveId: driveExists.id,googleId:driveExists.googleId } },
            update: item,
            create: item,
          }),
        ),
      );
    } else {
      console.log(`Drive with ID ${driveId} does not exist in the database`);
      // Có thể throw error hoặc xử lý theo cách khác
    }
    const result = await this.prisma.permissionDrive.findMany({
      where: { driveId: driveId},
      include: { driveItem: true },
    })
    return result
  }
  async addUser(
    email: string,
    driveId: any,
    role: 'reader' | 'writer' | 'commenter' | 'fileOrganizer' | 'organizer',
  ) {
    const response = await this.drive.permissions.create({
      fileId: driveId,
      requestBody: {
        type: 'user',
        role,
        emailAddress: email,
      },
      supportsAllDrives: true,
    });
    return response.data;
  }
  async removeUser(permissionId: string, driveId: any) {
    try {
      const result = await this.drive.permissions.delete({
        fileId: driveId,
        permissionId,
        supportsAllDrives: true,
      });
      return {
        statusCode: result.status,
        message: `User ${permissionId} removed`,
      };
    } catch (error) {
      this._ErrorlogService.logError('removeUser', error.message);
      console.log(error.status);
      return { statusCode: error.status, message: error.message };
    }
  }

  async getLastUpdateddriveItem() {
    try {
      const lastUpdated = await this.prisma.driveItem.aggregate({
        _max: {
          updatedAt: true,
        },
      });
      return { updatedAt: lastUpdated._max.updatedAt || 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdateddriveItem', error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      return this.prisma.driveItem.create({ data });
    } catch (error) {
      this._ErrorlogService.logError('createdriveItem', error);
      throw error;
    }
  }

  async findAll(driveId: string='0AKQL50NKsue5Uk9PVA') {
    try {
      const files = await this.prisma.driveItem.findMany({include:{permissions:true}});
      const tree = this.buildTree(files, driveId);
      console.log(tree);
      return tree;
    } catch (error) {
      this._ErrorlogService.logError('findAll', error);
      throw error;
    }
  }
  private buildTree(items: any[], parentId: string | null = null) {
    return items
      .filter((item) => item.parentId === parentId)
      .map((item) => ({
        ...item,
        children: this.buildTree(items, item.googleId),
      }));
  }

  async findby(param: any) {
    try {
      const driveItem = await this.prisma.driveItem.findUnique({
        where: param,
      });
      return driveItem;
    } catch (error) {
      this._ErrorlogService.logError('findby', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const driveItem = await this.prisma.driveItem.findUnique({
        where: { id },
      });
      if (!driveItem) throw new NotFoundException('driveItem not found');
      return driveItem;
    } catch (error) {
      this._ErrorlogService.logError('findOne', error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      return this.prisma.driveItem.update({ where: { id }, data });
    } catch (error) {
      this._ErrorlogService.logError('updatedriveItem', error);
      throw error;
    }
  }

  async remove(id: string) {
    console.log('id', id);
    
    try {
      return this.prisma.permissionDrive.delete({ where: { id } });
    } catch (error) {
      this._ErrorlogService.logError('removedriveItem', error);
      throw error;
    }
  }
}
