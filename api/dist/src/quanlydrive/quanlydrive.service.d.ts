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
    UpdateAllFolderDrive(driveId: any): Promise<void>;
    listUsersFolder(driveId: any): Promise<any>;
    addUser(email: string, driveId: any, role: 'reader' | 'writer' | 'commenter' | 'fileOrganizer' | 'organizer'): Promise<any>;
    removeUser(permissionId: string, driveId: any): Promise<{
        statusCode: any;
        message: any;
    }>;
    getLastUpdateddriveItem(): Promise<{
        updatedAt: any;
    }>;
    create(data: any): Promise<any>;
    search(searchParams: {
        name?: string;
        type?: string;
        mimeType?: string;
        parentId?: string;
        size?: number | {
            min?: number;
            max?: number;
        };
        createdTime?: Date | {
            from?: Date;
            to?: Date;
        };
        modifiedTime?: Date | {
            from?: Date;
            to?: Date;
        };
        page?: number;
        pageSize?: number;
    }): Promise<{
        data: any;
        pagination: {
            total: any;
            page: number;
            pageSize: number;
            totalPages: number;
        };
    }>;
    private buildPath;
    findAll(driveId?: string): Promise<any>;
    private buildTree;
    count(): Promise<any>;
    findby(param: any): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
}
