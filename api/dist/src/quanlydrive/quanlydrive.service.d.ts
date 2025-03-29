import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class QuanlydriveService {
    private readonly _SocketGateway;
    private readonly prisma;
    private _ErrorlogService;
    private drive;
    private uploaddriveId;
    constructor(_SocketGateway: SocketGateway, prisma: PrismaService, _ErrorlogService: ErrorlogService);
    uploadFile(file: Express.Multer.File): Promise<string>;
    queryFolders(driveId: string): Promise<any[]>;
    listUsersFolder(driveId: any): Promise<any>;
    addUser(email: string, driveId: any, role: 'reader' | 'writer' | 'commenter' | 'fileOrganizer' | 'organizer'): Promise<any>;
    removeUser(permissionId: string, driveId: any): Promise<{
        message: string;
    }>;
    getLastUpdateddriveItem(): Promise<{
        updatedAt: number | Date;
    }>;
    create(data: any): Promise<{
        type: import(".prisma/client").$Enums.DriveItemType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        parentId: string | null;
        googleId: string;
        mimeType: string | null;
        size: number | null;
    }>;
    findAll(): Promise<any>;
    private buildTree;
    findby(param: any): Promise<{
        type: import(".prisma/client").$Enums.DriveItemType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        parentId: string | null;
        googleId: string;
        mimeType: string | null;
        size: number | null;
    } | null>;
    findOne(id: string): Promise<{
        type: import(".prisma/client").$Enums.DriveItemType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        parentId: string | null;
        googleId: string;
        mimeType: string | null;
        size: number | null;
    }>;
    update(id: string, data: any): Promise<{
        type: import(".prisma/client").$Enums.DriveItemType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        parentId: string | null;
        googleId: string;
        mimeType: string | null;
        size: number | null;
    }>;
    remove(id: string): Promise<{
        type: import(".prisma/client").$Enums.DriveItemType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        parentId: string | null;
        googleId: string;
        mimeType: string | null;
        size: number | null;
    }>;
}
