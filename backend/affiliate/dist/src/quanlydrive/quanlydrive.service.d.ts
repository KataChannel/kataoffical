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
    listUsersFolder(driveId: any): Promise<({
        driveItem: {
            type: import(".prisma/client").$Enums.DriveItemType;
            name: string;
            id: string;
            googleId: string;
            createdAt: Date;
            updatedAt: Date;
            parentId: string | null;
            mimeType: string | null;
            path: string | null;
            size: bigint | null;
            isDelete: boolean | null;
            createdTime: Date | null;
            modifiedTime: Date | null;
        };
    } & {
        role: string;
        type: string;
        id: string;
        googleId: string;
        createdAt: Date;
        updatedAt: Date;
        userIdDrive: string;
        kind: string;
        emailAddress: string | null;
        driveId: string;
    })[]>;
    addUser(email: string, driveId: any, role: 'reader' | 'writer' | 'commenter' | 'fileOrganizer' | 'organizer'): Promise<any>;
    removeUser(permissionId: string, driveId: any): Promise<{
        statusCode: any;
        message: any;
    }>;
    getLastUpdateddriveItem(): Promise<{
        updatedAt: number | Date;
    }>;
    create(data: any): Promise<{
        type: import(".prisma/client").$Enums.DriveItemType;
        name: string;
        id: string;
        googleId: string;
        createdAt: Date;
        updatedAt: Date;
        parentId: string | null;
        mimeType: string | null;
        path: string | null;
        size: bigint | null;
        isDelete: boolean | null;
        createdTime: Date | null;
        modifiedTime: Date | null;
    }>;
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
        data: {
            size: number;
            permissions: {
                role: string;
                type: string;
                id: string;
                googleId: string;
                createdAt: Date;
                updatedAt: Date;
                userIdDrive: string;
                kind: string;
                emailAddress: string | null;
                driveId: string;
            }[];
            type: import(".prisma/client").$Enums.DriveItemType;
            name: string;
            id: string;
            googleId: string;
            createdAt: Date;
            updatedAt: Date;
            parentId: string | null;
            mimeType: string | null;
            path: string | null;
            isDelete: boolean | null;
            createdTime: Date | null;
            modifiedTime: Date | null;
        }[];
        pagination: {
            total: number;
            page: number;
            pageSize: number;
            totalPages: number;
        };
    }>;
    private buildPath;
    findAll(driveId?: string): Promise<any>;
    private buildTree;
    count(): Promise<number>;
    findby(param: any): Promise<{
        type: import(".prisma/client").$Enums.DriveItemType;
        name: string;
        id: string;
        googleId: string;
        createdAt: Date;
        updatedAt: Date;
        parentId: string | null;
        mimeType: string | null;
        path: string | null;
        size: bigint | null;
        isDelete: boolean | null;
        createdTime: Date | null;
        modifiedTime: Date | null;
    } | null>;
    findOne(id: string): Promise<{
        type: import(".prisma/client").$Enums.DriveItemType;
        name: string;
        id: string;
        googleId: string;
        createdAt: Date;
        updatedAt: Date;
        parentId: string | null;
        mimeType: string | null;
        path: string | null;
        size: bigint | null;
        isDelete: boolean | null;
        createdTime: Date | null;
        modifiedTime: Date | null;
    }>;
    update(id: string, data: any): Promise<{
        type: import(".prisma/client").$Enums.DriveItemType;
        name: string;
        id: string;
        googleId: string;
        createdAt: Date;
        updatedAt: Date;
        parentId: string | null;
        mimeType: string | null;
        path: string | null;
        size: bigint | null;
        isDelete: boolean | null;
        createdTime: Date | null;
        modifiedTime: Date | null;
    }>;
    remove(id: string): Promise<{
        role: string;
        type: string;
        id: string;
        googleId: string;
        createdAt: Date;
        updatedAt: Date;
        userIdDrive: string;
        kind: string;
        emailAddress: string | null;
        driveId: string;
    }>;
}
