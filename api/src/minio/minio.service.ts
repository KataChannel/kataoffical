import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Client, ClientOptions } from 'minio';
import { PrismaService } from 'prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class MinioService {
    private client: Client;
    private bucketName: string;

    constructor(private prisma: PrismaService) {
        this.bucketName = process.env.MINIO_BUCKET?.trim() || 'images';
        const options: ClientOptions = {
            endPoint: process.env.MINIO_ENDPOINT?.trim() || 'localhost',
            port: parseInt(process.env.MINIO_PORT?.trim() || '9000', 10),
            useSSL: process.env.MINIO_USE_SSL?.trim() === 'true',
            accessKey: process.env.MINIO_ROOT_USER?.trim() || '0GWGwCMtouJ8G6v',
            secretKey: process.env.MINIO_ROOT_PASSWORD?.trim() || 'rRxYyjxDv30H84F',
        };

        this.client = new Client(options);
        this.ensureBucketExists();
    }

    private async ensureBucketExists(): Promise<void> {
        try {
            const exists = await this.client.bucketExists(this.bucketName);
            if (!exists) {
                await this.client.makeBucket(this.bucketName, 'us-east-1');
            }
        } catch (error) {
            console.error('Error checking/creating bucket:', error);
            throw new InternalServerErrorException('Minio bucket error');
        }
    }

    async uploadFile(
        file: Express.Multer.File,
        extra: { category?: string; group?: string },
    ): Promise<string> {
        const fileName = `${Date.now()}-${file.originalname}`;
        const metaData = {
            'Content-Type': file.mimetype,
            originalname: file.originalname,
            ...extra,
        };

        try {
            await this.client.putObject(
                this.bucketName,
                fileName,
                file.buffer,
                file.size,
                metaData
            );

            const publicUrl = process.env.MINIO_PUBLIC_URL?.trim() || 'http://localhost:9000';
            const url = `${this.bucketName}/${fileName}`;
            // const url = `${publicUrl}/${this.bucketName}/${fileName}`;

            await this.prisma.image.create({
                data: {
                    url,
                    fileType: file.mimetype,
                    metaData,
                    category: extra.category || null,
                    group: extra.group || null,
                },
            });

            return url;
        } catch (error) {
            console.error('Error uploading file to Minio or saving to DB:', error);
            throw new InternalServerErrorException(
                'Unable to upload image or save to the database'
            );
        }
    }

    async deleteFile(id: any): Promise<void> {
        const image = await this.prisma.image.findUnique({ where: { id: id } });
        if (!image) {
            throw new NotFoundException('Image not found');
        }

        const fileName = image.url.split('/').pop();
        if (!fileName) {
            throw new InternalServerErrorException('Invalid image URL: file name not found');
        }

        try {
            await this.client.removeObject(this.bucketName, fileName);
        } catch (error) {
            console.error('Error deleting file from Minio:', error);
            throw new InternalServerErrorException('Error deleting file from Minio');
        }

        await this.prisma.image.delete({ where: { id: id } });
    }
}