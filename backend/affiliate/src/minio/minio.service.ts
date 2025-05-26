import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Client, ClientOptions } from 'minio';
import { PrismaService } from 'prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class MinioService {
  private client: Client;
  private bucketName: string;
  private options: ClientOptions;
  constructor(private prisma: PrismaService) {
    this.bucketName = process.env.MINIO_BUCKET?.trim() || 'timona';
    this.options = {
      endPoint: process.env.MINIO_ENDPOINT?.trim() || '116.118.49.243',
      port: parseInt(process.env.MINIO_PORT?.trim() || '9002', 10),
      useSSL: process.env.MINIO_USE_SSL?.trim() === 'true',
      accessKey: process.env.MINIO_ROOT_USER?.trim() || 'zQBLucaykoR9Xw3',
      secretKey: process.env.MINIO_ROOT_PASSWORD?.trim() || 'ToDRFRP09AGTJo0',
    };
    this.client = new Client(this.options);
    this.ensureBucketExists();
  }

  private async ensureBucketExists(): Promise<void> {
    try {
      const exists = await this.client.bucketExists(this.bucketName);
      if (!exists) {
        await this.client.makeBucket(this.bucketName, 'us-east-1');
      }
    } catch (error) {
      console.log(this.options);
      
      console.error('Error checking/creating bucket:', error);
      throw new InternalServerErrorException('Minio bucket error');
    }
  }
  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.fileManager.findFirst({
        orderBy: { codeId: 'desc' },
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const match = latest.codeId.match(/FILE(\d+)/);
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      return `FILE${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      throw error;
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    extra: {
      title?: string;
      category?: string;
      group?: string;
      description?: string;
    },
  ): Promise<string> {
    console.log(this.options);

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
        metaData,
      );

      const publicUrl =
        process.env.MINIO_PUBLIC_URL?.trim() || 'http://localhost:9000';
      const url = `${this.bucketName}/${fileName}`;
      // const url = `${publicUrl}/${this.bucketName}/${fileName}`;
      const codeId = await this.generateCodeId();
      await this.prisma.fileManager.create({
        data: {
          codeId: codeId, 
          url,
          fileType: file.mimetype,
          fileSize: file.size,
          title: extra.title || file.originalname,
          description: extra.description || null,
          metaData,
          category: extra.category || null,
          group: extra.group || null,
        },
      });

      return url;
    } catch (error) {
      console.error('Error uploading file to Minio or saving to DB:', error);
      throw new InternalServerErrorException(
        'Unable to upload fileManager or save to the database',
      );
    }
  }

  async deleteFile(id: any): Promise<boolean> {
    const fileManager = await this.prisma.fileManager.findUnique({
      where: { id: id },
    });
    if (!fileManager) {
      throw new NotFoundException('fileManager not found');
    }

    const fileName = fileManager?.url?.split('/').pop();
    if (!fileName) {
      throw new InternalServerErrorException(
        'Invalid fileManager URL: file name not found',
      );
    }

    try {
      await this.client.removeObject(this.bucketName, fileName);
    } catch (error) {
      console.error('Error deleting file from Minio:', error);
      throw new InternalServerErrorException('Error deleting file from Minio');
    }
    await this.prisma.fileManager.delete({ where: { id: id } });
    return true;
  }
}
