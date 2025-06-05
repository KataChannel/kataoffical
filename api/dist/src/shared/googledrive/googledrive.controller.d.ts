import { GoogleDriveService } from './googledrive.service';
import { ChatbotService } from 'src/chatbot/chatbot.service';
import { PrismaService } from 'prisma/prisma.service';
export declare class GoogleDriveController {
    private readonly googleDriveService;
    private readonly _ChatbotService;
    private readonly prisma;
    constructor(googleDriveService: GoogleDriveService, _ChatbotService: ChatbotService, prisma: PrismaService);
    uploadFile(file: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        fileName: string | null;
        fileUrl: string | null;
        jsonData: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
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
