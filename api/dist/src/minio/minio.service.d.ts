import { PrismaService } from 'prisma/prisma.service';
export declare class MinioService {
    private prisma;
    private client;
    private bucketName;
    constructor(prisma: PrismaService);
    private ensureBucketExists;
    uploadFile(file: Express.Multer.File, extra: {
        category?: string;
        group?: string;
    }): Promise<string>;
    deleteFile(id: any): Promise<void>;
}
