export declare class GoogleDriveService {
    private drive;
    private driveId;
    private uploaddriveId;
    constructor();
    uploadFile(file: Express.Multer.File): Promise<string>;
    queryFolders(driveId: any): Promise<any>;
    listFolders(): Promise<any>;
    listUsersFolder(driveId: any): Promise<any>;
    listUsers(): Promise<any>;
    addUser(email: string, role: 'reader' | 'writer' | 'commenter' | 'fileOrganizer' | 'organizer'): Promise<any>;
    removeUser(permissionId: string): Promise<{
        message: string;
    }>;
}
