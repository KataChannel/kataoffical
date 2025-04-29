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
    const fileUrl = `https://drive.google.com/uc?export=view&id=${response.data.id}`;
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




  async search(searchParams: {
    name?: string;
    type?: string;
    mimeType?: string;
    parentId?: string;
    size?: number | { min?: number; max?: number };
    createdTime?: Date | { from?: Date; to?: Date };
    modifiedTime?: Date | { from?: Date; to?: Date };
    page?: number;
    pageSize?: number;
  }) {
    try {
      const { 
        name, 
        type, 
        mimeType, 
        parentId, 
        size, 
        createdTime, 
        modifiedTime, 
        page = 1, 
        pageSize = 20 
      } = searchParams;
      
      // Build the where clause based on provided parameters
      const whereClause: any = {};
      whereClause.isDelete = false; // Exclude deleted items
      if (name) {
        whereClause.name = {
          contains: name,
          mode: 'insensitive', // Case-insensitive search
        };
      }
      
      if (type) {
        whereClause.type = type;
      }
      
      if (mimeType) {
        whereClause.mimeType = mimeType;
      }
      
      if (parentId) {
        whereClause.parentId = parentId;
      }
      
      // Handle size filtering
      if (size) {
        if (typeof size === 'number') {
          whereClause.size = size;
        } else {
          // Check if both min and max are 0, if yes, don't add size filter
          if (!(size.min === 0 && size.max === 0)) {
            whereClause.size = {};
            if (size.min !== undefined) whereClause.size.gte = size.min*1048576;
            if (size.max !== undefined) whereClause.size.lte = size.max*1048576;
          }
        }
      }
      
      // Handle createdTime filtering
      if (createdTime) {
        if (createdTime instanceof Date) {
          whereClause.createdTime = createdTime;
        } else {
          whereClause.createdTime = {};
          if (createdTime.from) whereClause.createdTime.gte = createdTime.from;
          if (createdTime.to) whereClause.createdTime.lte = createdTime.to;
        }
      }
      
      // Handle modifiedTime filtering
      if (modifiedTime) {
        if (modifiedTime instanceof Date) {
          whereClause.modifiedTime = modifiedTime;
        } else {
          whereClause.modifiedTime = {};
          if (modifiedTime.from) whereClause.modifiedTime.gte = modifiedTime.from;
          if (modifiedTime.to) whereClause.modifiedTime.lte = modifiedTime.to;
        }
      }

      
      // Execute query with proper pagination
      const [results, totalCount] = await Promise.all([
        this.prisma.driveItem.findMany({
          where: whereClause,
          include: { 
            permissions: true,
          },
          orderBy: { name: 'asc' },
          ...(pageSize > 0 && {
            skip: (page - 1) * pageSize,
            take: pageSize
          })
        }),
        this.prisma.driveItem.count({ where: whereClause })
      ]);

      
      // Get all necessary items for building paths
      const allItems = await this.prisma.driveItem.findMany({
        select: { googleId: true, name: true, parentId: true }
      });
      
      // Build a map for quick lookup
      const itemMap:any = new Map(allItems.map(item => [item.googleId, item]));
      
      // Convert BigInt to string and add path to each result
      const resultsWithPath = results.map(item => ({
        ...item,
        size: item.size ? Number(item.size) : 0,
   //     path: this.buildPath(item.googleId, itemMap),
      }));
      // resultsWithPath.forEach(async (item:any) => {
      //   delete item.permissions;
      //   await this.update(item.id, item);
      // });
      
      return {
        data: resultsWithPath,
        pagination: {
          total: totalCount,
          page,
          pageSize,
          totalPages: Math.ceil(totalCount / pageSize),
        },
      };
    } catch (error) {
      this._ErrorlogService.logError('search', error);
      throw error;
    }
  }

  // Helper function to build path of parent folders
  private buildPath(googleId: string, itemMap: Map<string, { name: string, parentId: string | null }>): string {
    const pathParts: string[] = [];
    let currentItem = itemMap.get(googleId);
    if (!currentItem) return "";
    
    let parentId = currentItem.parentId;
    let iterations = 0;
    const MAX_ITERATIONS = 100; // Safety check to prevent infinite loops
    
    while (parentId && iterations < MAX_ITERATIONS) {
      const parent = itemMap.get(parentId);
      if (!parent) break;
      
      // Add the parent name to the path
      pathParts.unshift(parent.name);
      
      // Move to the next parent
      parentId = parent.parentId;
      iterations++;
    }
    return pathParts.join('/*/');
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

  async count() {
    try {
      const count = await this.prisma.driveItem.count();
      return count;
    } catch (error) {
      this._ErrorlogService.logError('count', error);
      throw error;
    }
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
