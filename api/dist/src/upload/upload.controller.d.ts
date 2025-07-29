import { UploadService } from './upload.service';
import { Response } from 'express';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    healthCheck(): Promise<{
        status: "healthy" | "unhealthy";
        message: string;
        details?: any;
    }>;
    uploadSingle(file: Express.Multer.File, folder?: string, originalName?: string): Promise<{
        success: boolean;
        message: string;
        data: {
            filePath: string;
            fileName: string;
            url: string;
        };
    }>;
    uploadMultiple(files: Express.Multer.File[], folder?: string): Promise<{
        success: boolean;
        message: string;
        data: {
            filePath: string;
            fileName: string;
            url: string;
        }[];
    }>;
    downloadFile(filePath: string, res: Response): Promise<void>;
    deleteFile(filePath: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getPublicUrl(filePath: string): {
        success: boolean;
        url: string;
    };
    deleteFileByQuery(filePath: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getPublicUrlByQuery(filePath: string): {
        success: boolean;
        url: string;
    };
    testAuthentication(): Promise<{
        success: boolean;
        message: string;
        details: any;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        details?: undefined;
    }>;
}
