import { MinioService } from '../minio/minio.service';
export declare class SupportUploadController {
    private readonly minioService;
    constructor(minioService: MinioService);
    uploadFiles(files: Express.Multer.File[]): Promise<{
        fileName: string;
        fileType: string;
        fileSize: number;
        fileUrl: string;
    }[]>;
}
