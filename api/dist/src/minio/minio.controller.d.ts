import { MinioService } from './minio.service';
export declare class MinioController {
    private readonly minioService;
    constructor(minioService: MinioService);
    uploadFile(file: Express.Multer.File, body: {
        title?: string;
        category?: string;
        group?: string;
        description?: string;
    }): Promise<{
        imageUrl: string;
    }>;
    deleteFile(id: string): Promise<{
        message: string;
    }>;
}
