import { GoogleDriveService } from './googledrive.service';
export declare class GoogleDriveController {
    private readonly googleDriveService;
    constructor(googleDriveService: GoogleDriveService);
    queryFolders(query: any): Promise<any>;
    listUsersFolder(query: any): Promise<any>;
    listFolders(): Promise<any>;
    listUsers(): Promise<any>;
    addUser(body: {
        email: string;
        role: 'reader' | 'writer' | 'commenter' | 'fileOrganizer' | 'organizer';
    }): Promise<any>;
    removeUser(permissionId: string): Promise<{
        message: string;
    }>;
}
