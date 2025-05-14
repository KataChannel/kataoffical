import { PrismaService } from 'prisma/prisma.service';
export declare class MinioService {
    private prisma;
    private client;
    private bucketName;
    private options;
    constructor(prisma: PrismaService);
    private ensureBucketExists;
    uploadFile(file: Express.Multer.File, extra: {
        title?: string;
        category?: string;
        group?: string;
        description?: string;
    }): Promise<string>;
    deleteFile(id: any): Promise<void>;
}
