"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinioService = void 0;
const common_1 = require("@nestjs/common");
const minio_1 = require("minio");
const prisma_service_1 = require("../../prisma/prisma.service");
const common_2 = require("@nestjs/common");
let MinioService = class MinioService {
    constructor(prisma) {
        this.prisma = prisma;
        this.bucketName = process.env.MINIO_BUCKET?.trim() || 'images';
        const options = {
            endPoint: process.env.MINIO_ENDPOINT?.trim() || 'localhost',
            port: parseInt(process.env.MINIO_PORT?.trim() || '9000', 10),
            useSSL: process.env.MINIO_USE_SSL?.trim() === 'true',
            accessKey: process.env.MINIO_ROOT_USER?.trim() || '0GWGwCMtouJ8G6v',
            secretKey: process.env.MINIO_ROOT_PASSWORD?.trim() || 'rRxYyjxDv30H84F',
        };
        this.client = new minio_1.Client(options);
        this.ensureBucketExists();
    }
    async ensureBucketExists() {
        try {
            const exists = await this.client.bucketExists(this.bucketName);
            if (!exists) {
                await this.client.makeBucket(this.bucketName, 'us-east-1');
            }
        }
        catch (error) {
            console.error('Error checking/creating bucket:', error);
            throw new common_1.InternalServerErrorException('Minio bucket error');
        }
    }
    async uploadFile(file, extra) {
        const fileName = `${Date.now()}-${file.originalname}`;
        const metaData = {
            'Content-Type': file.mimetype,
            originalname: file.originalname,
            ...extra,
        };
        try {
            await this.client.putObject(this.bucketName, fileName, file.buffer, file.size, metaData);
            const publicUrl = process.env.MINIO_PUBLIC_URL?.trim() || 'http://localhost:9000';
            const url = `${this.bucketName}/${fileName}`;
            await this.prisma.resource.create({
                data: {
                    url,
                    fileType: file.mimetype,
                    metaData,
                    category: extra.category || null,
                    group: extra.group || null,
                },
            });
            return url;
        }
        catch (error) {
            console.error('Error uploading file to Minio or saving to DB:', error);
            throw new common_1.InternalServerErrorException('Unable to upload resource or save to the database');
        }
    }
    async deleteFile(id) {
        const resource = await this.prisma.resource.findUnique({ where: { id: id } });
        if (!resource) {
            throw new common_2.NotFoundException('resource not found');
        }
        const fileName = resource.url.split('/').pop();
        if (!fileName) {
            throw new common_1.InternalServerErrorException('Invalid resource URL: file name not found');
        }
        try {
            await this.client.removeObject(this.bucketName, fileName);
        }
        catch (error) {
            console.error('Error deleting file from Minio:', error);
            throw new common_1.InternalServerErrorException('Error deleting file from Minio');
        }
        await this.prisma.resource.delete({ where: { id: id } });
    }
};
exports.MinioService = MinioService;
exports.MinioService = MinioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MinioService);
//# sourceMappingURL=minio.service.js.map