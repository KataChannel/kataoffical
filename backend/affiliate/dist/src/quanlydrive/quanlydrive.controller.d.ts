import { QuanlydriveService } from './quanlydrive.service';
export declare class QuanlydriveController {
    private readonly quanlydriveService;
    constructor(quanlydriveService: QuanlydriveService);
    uploadFile(file: Express.Multer.File): Promise<void>;
    count(): Promise<{
        count: number;
    }>;
    queryFolders(query: any): Promise<any[]>;
    listUsersFolder(query: any): Promise<({
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
    addUser(body: {
        email: string;
        driveId: any;
        role: 'reader' | 'writer' | 'commenter' | 'fileOrganizer' | 'organizer';
    }): Promise<any>;
    removeUser(permissionId: string, driveId: any): Promise<{
        statusCode: any;
        message: any;
    }>;
    search(searchParams: any): Promise<{
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
    create(createquanlyqrcodeDto: any): Promise<{
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
    findAll(driveId: string): Promise<any>;
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
