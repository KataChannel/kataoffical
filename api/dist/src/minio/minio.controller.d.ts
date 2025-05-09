import { MinioService } from './minio.service';
export declare class MinioController {
    private readonly minioService;
    constructor(minioService: MinioService);
    uploadFile(file: Express.Multer.File, body: {
        category?: string;
        group?: string;
    }): Promise<{
        imageUrl: string;
    }>;
    deleteFile(id: string): Promise<{
        message: string;
    }>;
}
