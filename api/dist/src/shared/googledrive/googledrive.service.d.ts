export declare class GoogleDriveService {
    private drive;
    private driveId;
    constructor();
    queryFolders(driveId: any): Promise<any>;
    listFolders(): Promise<any>;
    listUsersFolder(driveId: any): Promise<any>;
    listUsers(): Promise<any>;
    addUser(email: string, role: 'reader' | 'writer' | 'commenter' | 'fileOrganizer' | 'organizer'): Promise<any>;
    removeUser(permissionId: string): Promise<{
        message: string;
    }>;
}
