import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';
export declare class UploadService {
    private configService;
    private minioClient;
    private bucketName;
    private isMinioReady;
    constructor(configService: ConfigService);
    private initializeBucket;
    private testWithDifferentRegions;
    private testAlternativeConnection;
    uploadFile(file: Express.Multer.File, folder?: string, originalName?: string): Promise<{
        filePath: string;
        fileName: string;
        url: string;
    }>;
    getHealthStatus(): Promise<{
        status: 'healthy' | 'unhealthy';
        message: string;
        details?: any;
    }>;
    getPublicUrl(filePath: string): string;
    getFile(filePath: string): Promise<Readable>;
    deleteFile(filePath: string): Promise<void>;
    get isReady(): boolean;
}
