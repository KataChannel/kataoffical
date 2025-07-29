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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Minio = require("minio");
const uuid_1 = require("uuid");
const path = require("path");
let UploadService = class UploadService {
    constructor(configService) {
        this.configService = configService;
        this.isMinioReady = false;
        this.bucketName = this.configService.get('MINIO_BUCKET_NAME') || 'uploads';
        const endpoint = this.configService.get('MINIO_ENDPOINT') || 'localhost';
        const port = parseInt(this.configService.get('MINIO_PORT') || '9000');
        const useSSL = this.configService.get('MINIO_USE_SSL') === 'true';
        const accessKey = this.configService.get('MINIO_ACCESS_KEY');
        const secretKey = this.configService.get('MINIO_SECRET_KEY');
        if (!accessKey || !secretKey) {
            console.error('❌ MinIO credentials are missing!');
            console.error('Please check your .env file for MINIO_ACCESS_KEY and MINIO_SECRET_KEY');
            return;
        }
        console.log('MinIO Configuration:', {
            endPoint: endpoint,
            port: port,
            useSSL: useSSL,
            accessKey: accessKey.substring(0, 4) + '***',
            bucketName: this.bucketName,
            hasSecretKey: !!secretKey
        });
        try {
            this.minioClient = new Minio.Client({
                endPoint: endpoint,
                port: port,
                useSSL: useSSL,
                accessKey: accessKey,
                secretKey: secretKey,
                region: this.configService.get('MINIO_REGION') || 'us-east-1',
            });
            console.log('MinIO client created successfully');
            this.initializeBucket();
        }
        catch (error) {
            console.error('Error creating MinIO client:', error);
        }
    }
    async initializeBucket() {
        try {
            console.log(`Testing MinIO connection to ${this.configService.get('MINIO_ENDPOINT')}:${this.configService.get('MINIO_PORT')}...`);
            try {
                const buckets = await this.minioClient.listBuckets();
                console.log('✅ MinIO connection successful. Available buckets:', buckets.map(b => b.name));
                this.isMinioReady = true;
            }
            catch (connectionError) {
                console.error('❌ MinIO connection test failed:', connectionError);
                if (connectionError.code === 'SignatureDoesNotMatch') {
                    console.error('🔑 Authentication Error - Possible causes:');
                    console.error('1. Wrong MINIO_ACCESS_KEY or MINIO_SECRET_KEY');
                    console.error('2. Keys have special characters that need escaping');
                    console.error('3. Clock synchronization issue between client and server');
                    console.error('4. Region mismatch');
                    await this.testWithDifferentRegions();
                }
                else if (connectionError.code === 'ECONNREFUSED') {
                    console.error('🌐 Connection Error - Possible causes:');
                    console.error('1. MinIO server is not running');
                    console.error('2. Wrong port number');
                    console.error('3. Firewall blocking the connection');
                    console.error('4. Wrong endpoint URL');
                    await this.testAlternativeConnection();
                }
                this.isMinioReady = false;
                return;
            }
            console.log(`Checking if bucket '${this.bucketName}' exists...`);
            const bucketExists = await this.minioClient.bucketExists(this.bucketName);
            console.log(`Bucket '${this.bucketName}' exists: ${bucketExists}`);
            if (!bucketExists) {
                console.log(`Creating bucket '${this.bucketName}'...`);
                await this.minioClient.makeBucket(this.bucketName, this.configService.get('MINIO_REGION') || 'us-east-1');
                console.log(`Bucket '${this.bucketName}' created successfully`);
                try {
                    const policy = {
                        Version: '2012-10-17',
                        Statement: [
                            {
                                Effect: 'Allow',
                                Principal: { AWS: ['*'] },
                                Action: ['s3:GetObject'],
                                Resource: [`arn:aws:s3:::${this.bucketName}/*`],
                            },
                        ],
                    };
                    await this.minioClient.setBucketPolicy(this.bucketName, JSON.stringify(policy));
                    console.log('✅ Bucket policy set successfully - files will be publicly readable');
                }
                catch (policyError) {
                    console.warn('⚠️ Warning: Could not set bucket policy:', policyError.message);
                    console.warn('Files may not be publicly accessible via direct URLs');
                }
            }
            else {
                console.log(`✅ Bucket '${this.bucketName}' already exists and is ready`);
            }
            this.isMinioReady = true;
            console.log('🚀 MinIO initialization completed successfully');
        }
        catch (error) {
            console.error('❌ Error initializing MinIO bucket:', error);
            console.error('MinIO service will be unavailable. Upload functionality disabled.');
            this.isMinioReady = false;
        }
    }
    async testWithDifferentRegions() {
        const regions = ['us-east-1', 'us-west-1', 'eu-west-1', ''];
        const endpoint = this.configService.get('MINIO_ENDPOINT') || 'localhost';
        const port = parseInt(this.configService.get('MINIO_PORT') || '9000');
        const useSSL = this.configService.get('MINIO_USE_SSL') === 'true';
        const accessKey = this.configService.get('MINIO_ACCESS_KEY');
        const secretKey = this.configService.get('MINIO_SECRET_KEY');
        console.log('🔍 Testing different regions for authentication...');
        for (const region of regions) {
            try {
                console.log(`Testing region: ${region || 'default'}`);
                const testClient = new Minio.Client({
                    endPoint: endpoint || 'localhost',
                    port: port,
                    useSSL: useSSL,
                    accessKey: accessKey,
                    secretKey: secretKey,
                    region: region,
                });
                await testClient.listBuckets();
                console.log(`✅ Authentication successful with region: ${region || 'default'}!`);
                console.log(`💡 Consider setting MINIO_REGION=${region} in your .env file`);
                break;
            }
            catch (error) {
                console.log(`❌ Region ${region || 'default'} failed: ${error.message}`);
            }
        }
    }
    async testAlternativeConnection() {
        const endpoint = this.configService.get('MINIO_ENDPOINT');
        const accessKey = this.configService.get('MINIO_ACCESS_KEY');
        const secretKey = this.configService.get('MINIO_SECRET_KEY');
        console.log(`🔍 Testing alternative MinIO configurations for ${endpoint}...`);
        const commonPorts = ['9000', '9001', '80', '443'];
        for (const testPort of commonPorts) {
            try {
                console.log(`Testing port ${testPort}...`);
                const testClient = new Minio.Client({
                    endPoint: endpoint || 'localhost',
                    port: parseInt(testPort),
                    useSSL: testPort === '443',
                    accessKey: accessKey,
                    secretKey: secretKey,
                });
                await testClient.listBuckets();
                console.log(`✅ Connection successful on port ${testPort}!`);
                console.log(`💡 Consider updating MINIO_PORT to ${testPort} in your .env file`);
                break;
            }
            catch (error) {
                console.log(`❌ Port ${testPort} failed: ${error.message}`);
            }
        }
    }
    async uploadFile(file, folder = 'uploads', originalName) {
        if (!this.isMinioReady) {
            throw new common_1.BadRequestException('MinIO storage service is not available. Please check server configuration and credentials.');
        }
        try {
            if (!file) {
                throw new common_1.BadRequestException('No file provided');
            }
            const fileExtension = path.extname(originalName || file.originalname);
            const fileName = `${(0, uuid_1.v4)()}${fileExtension}`;
            const filePath = `${folder}/${fileName}`;
            const isVideo = file.mimetype.startsWith('video/');
            const maxSize = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
            if (file.size > maxSize) {
                const maxSizeMB = maxSize / (1024 * 1024);
                throw new common_1.BadRequestException(`File too large. Maximum size is ${maxSizeMB}MB`);
            }
            const allowedMimeTypes = [
                'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
                'video/mp4', 'video/webm', 'video/avi', 'video/quicktime', 'video/x-msvideo', 'video/mov',
                'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ];
            if (!allowedMimeTypes.includes(file.mimetype)) {
                throw new common_1.BadRequestException(`File type '${file.mimetype}' not allowed. Allowed types: images, videos, and documents`);
            }
            console.log(`📤 Uploading file to MinIO: ${filePath} (${file.size} bytes)`);
            try {
                const uploadInfo = await this.minioClient.putObject(this.bucketName, filePath, file.buffer, file.size, {
                    'Content-Type': file.mimetype,
                    'X-Original-Name': originalName || file.originalname,
                    'X-Upload-Date': new Date().toISOString(),
                });
                console.log('✅ File uploaded successfully:', uploadInfo);
                const publicUrl = this.getPublicUrl(filePath);
                return {
                    filePath,
                    fileName,
                    url: publicUrl
                };
            }
            catch (uploadError) {
                console.error('❌ MinIO upload error:', uploadError);
                if (uploadError.code === 'SignatureDoesNotMatch') {
                    throw new common_1.BadRequestException('Authentication failed. Please check MinIO credentials configuration.');
                }
                else if (uploadError.code === 'NoSuchBucket') {
                    throw new common_1.BadRequestException(`Bucket '${this.bucketName}' does not exist. Please check bucket configuration.`);
                }
                else {
                    throw new common_1.BadRequestException(`Upload failed: ${uploadError.message || 'Unknown MinIO error'}`);
                }
            }
        }
        catch (error) {
            console.error('❌ Upload error:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Upload failed: ${error.message || 'Unknown error'}`);
        }
    }
    async getHealthStatus() {
        if (!this.isMinioReady) {
            return {
                status: 'unhealthy',
                message: 'MinIO client not initialized or connection failed',
                details: {
                    endpoint: this.configService.get('MINIO_ENDPOINT'),
                    port: this.configService.get('MINIO_PORT'),
                    bucket: this.bucketName,
                    hasAccessKey: !!this.configService.get('MINIO_ACCESS_KEY'),
                    hasSecretKey: !!this.configService.get('MINIO_SECRET_KEY')
                }
            };
        }
        try {
            const buckets = await this.minioClient.listBuckets();
            const bucketExists = await this.minioClient.bucketExists(this.bucketName);
            return {
                status: 'healthy',
                message: 'MinIO connection is working properly',
                details: {
                    availableBuckets: buckets.length,
                    targetBucketExists: bucketExists,
                    endpoint: this.configService.get('MINIO_ENDPOINT'),
                    port: this.configService.get('MINIO_PORT')
                }
            };
        }
        catch (error) {
            return {
                status: 'unhealthy',
                message: `MinIO health check failed: ${error.message}`,
                details: {
                    error: error.message,
                    code: error.code
                }
            };
        }
    }
    getPublicUrl(filePath) {
        const endpoint = this.configService.get('MINIO_ENDPOINT') || 'localhost';
        const port = this.configService.get('MINIO_PORT') || '9000';
        const useSSL = this.configService.get('MINIO_USE_SSL') === 'true';
        const protocol = useSSL ? 'https' : 'http';
        if (port === '80' && !useSSL) {
            return `http://${endpoint}/${this.bucketName}/${filePath}`;
        }
        else if (port === '443' && useSSL) {
            return `https://${endpoint}/${this.bucketName}/${filePath}`;
        }
        else {
            return `${protocol}://${endpoint}:${port}/${this.bucketName}/${filePath}`;
        }
    }
    async getFile(filePath) {
        if (!this.isMinioReady) {
            throw new common_1.BadRequestException('MinIO storage service is not available');
        }
        try {
            const stream = await this.minioClient.getObject(this.bucketName, filePath);
            return stream;
        }
        catch (error) {
            console.error('Get file error:', error);
            throw new common_1.BadRequestException(`File not found: ${error.message || 'Unknown error'}`);
        }
    }
    async deleteFile(filePath) {
        if (!this.isMinioReady) {
            throw new common_1.BadRequestException('MinIO storage service is not available');
        }
        try {
            await this.minioClient.removeObject(this.bucketName, filePath);
            console.log('✅ File deleted successfully:', filePath);
        }
        catch (error) {
            console.error('❌ Delete file error:', error);
            console.warn(`Could not delete file ${filePath}:`, error.message);
        }
    }
    get isReady() {
        return this.isMinioReady;
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadService);
//# sourceMappingURL=upload.service.js.map