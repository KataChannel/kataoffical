import { QuanlydriveService } from './quanlydrive.service';
export declare class QuanlydriveController {
    private readonly quanlydriveService;
    constructor(quanlydriveService: QuanlydriveService);
    uploadFile(file: Express.Multer.File): Promise<void>;
    count(): Promise<{
        count: any;
    }>;
    queryFolders(query: any): Promise<any[]>;
    listUsersFolder(query: any): Promise<any>;
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
        data: any;
        pagination: {
            total: any;
            page: number;
            pageSize: number;
            totalPages: number;
        };
    }>;
    create(createquanlyqrcodeDto: any): Promise<any>;
    findby(param: any): Promise<any>;
    findAll(driveId: string): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
}
