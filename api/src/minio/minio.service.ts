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
    this.bucketName = process.env.MINIO_BUCKET?.trim() || 'images';
    this.options = {
      endPoint: process.env.MINIO_ENDPOINT?.trim() || 'localhost',
      port: parseInt(process.env.MINIO_PORT?.trim() || '9000', 10),
      useSSL: process.env.MINIO_USE_SSL?.trim() === 'true',
      accessKey: process.env.MINIO_ROOT_USER?.trim() || '0GWGwCMtouJ8G6v',
      secretKey: process.env.MINIO_ROOT_PASSWORD?.trim() || 'rRxYyjxDv30H84F',
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
      console.error('Error checking/creating bucket:', error);
      throw new InternalServerErrorException('Minio bucket error');
    }
  }
  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.resource.findFirst({
        orderBy: { codeId: 'desc' },
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const match = latest.codeId.match(/IMG(\d+)/);
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      return `IMG${nextNumber.toString().padStart(5, '0')}`;
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
      await this.prisma.resource.create({
        data: {
          codeId: codeId, 
          url,
          fileType: file.mimetype,
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
        'Unable to upload resource or save to the database',
      );
    }
  }

  async deleteFile(id: any): Promise<boolean> {
    const resource = await this.prisma.resource.findUnique({
      where: { id: id },
    });
    if (!resource) {
      throw new NotFoundException('resource not found');
    }

    const fileName = resource?.url?.split('/').pop();
    if (!fileName) {
      throw new InternalServerErrorException(
        'Invalid resource URL: file name not found',
      );
    }

    try {
      await this.client.removeObject(this.bucketName, fileName);
    } catch (error) {
      console.error('Error deleting file from Minio:', error);
      throw new InternalServerErrorException('Error deleting file from Minio');
    }
    await this.prisma.resource.delete({ where: { id: id } });
    return true;
  }
}
