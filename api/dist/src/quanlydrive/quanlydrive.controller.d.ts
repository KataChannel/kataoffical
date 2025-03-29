import { QuanlydriveService } from './quanlydrive.service';
export declare class QuanlydriveController {
    private readonly quanlydriveService;
    constructor(quanlydriveService: QuanlydriveService);
    uploadFile(file: Express.Multer.File): Promise<void>;
    queryFolders(query: any): Promise<any[]>;
    listUsersFolder(query: any): Promise<any>;
    addUser(body: {
        email: string;
        driveId: any;
        role: 'reader' | 'writer' | 'commenter' | 'fileOrganizer' | 'organizer';
    }): Promise<any>;
    removeUser(permissionId: string, driveId: any): Promise<{
        message: string;
    }>;
    create(createquanlyqrcodeDto: any): Promise<{
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
    findAll(): Promise<any>;
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
