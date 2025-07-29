// import { Injectable, BadRequestException } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import * as Minio from 'minio';
// import { v4 as uuidv4 } from 'uuid';
// import * as path from 'path';
// import { Readable } from 'stream';

// @Injectable()
// export class UploadService {
//   private minioClient: Minio.Client;
//   private bucketName: string;
//   private isMinioReady: boolean = false;

//   constructor(private configService: ConfigService) {
//     this.bucketName = this.configService.get<string>('MINIO_BUCKET_NAME') || 'uploads';
    
//     // Get configuration values
//     const endpoint = this.configService.get<string>('MINIO_ENDPOINT') || 'localhost';
//     const port = parseInt(this.configService.get<string>('MINIO_PORT') || '9000');
//     const useSSL = this.configService.get<string>('MINIO_USE_SSL') === 'true';
//     const accessKey = this.configService.get<string>('MINIO_ACCESS_KEY');
//     const secretKey = this.configService.get<string>('MINIO_SECRET_KEY');

//     // Validate required credentials
//     if (!accessKey || !secretKey) {
//       console.error('❌ MinIO credentials are missing!');
//       console.error('Please check your .env file for MINIO_ACCESS_KEY and MINIO_SECRET_KEY');
//       return;
//     }

//     console.log('MinIO Configuration:', {
//       endPoint: endpoint,
//       port: port,
//       useSSL: useSSL,
//       accessKey: accessKey.substring(0, 4) + '***', // Hide full key for security
//       bucketName: this.bucketName,
//       hasSecretKey: !!secretKey
//     });

//     try {
//       this.minioClient = new Minio.Client({
//         endPoint: endpoint,
//         port: port,
//         useSSL: useSSL,
//         accessKey: accessKey,
//         secretKey: secretKey,
//         // Add region if needed
//         region: this.configService.get<string>('MINIO_REGION') || 'us-east-1',
//       });

//       console.log('MinIO client created successfully');
//       this.initializeBucket();
//     } catch (error) {
//       console.error('Error creating MinIO client:', error);
//     }
//   }

//   private async initializeBucket() {
//     try {
//       console.log(`Testing MinIO connection to ${this.configService.get('MINIO_ENDPOINT')}:${this.configService.get('MINIO_PORT')}...`);
      
//       // Test connection first by listing buckets
//       try {
//         const buckets = await this.minioClient.listBuckets();
//         console.log('✅ MinIO connection successful. Available buckets:', buckets.map(b => b.name));
//         this.isMinioReady = true;
//       } catch (connectionError) {
//         console.error('❌ MinIO connection test failed:', connectionError);
        
//         // Check for specific authentication errors
//         if (connectionError.code === 'SignatureDoesNotMatch') {
//           console.error('🔑 Authentication Error - Possible causes:');
//           console.error('1. Wrong MINIO_ACCESS_KEY or MINIO_SECRET_KEY');
//           console.error('2. Keys have special characters that need escaping');
//           console.error('3. Clock synchronization issue between client and server');
//           console.error('4. Region mismatch');
          
//           // Test with different region
//           await this.testWithDifferentRegions();
//         } else if (connectionError.code === 'ECONNREFUSED') {
//           console.error('🌐 Connection Error - Possible causes:');
//           console.error('1. MinIO server is not running');
//           console.error('2. Wrong port number');
//           console.error('3. Firewall blocking the connection');
//           console.error('4. Wrong endpoint URL');
          
//           await this.testAlternativeConnection();
//         }
        
//         this.isMinioReady = false;
//         return;
//       }

//       // Check if bucket exists
//       console.log(`Checking if bucket '${this.bucketName}' exists...`);
//       const bucketExists = await this.minioClient.bucketExists(this.bucketName);
//       console.log(`Bucket '${this.bucketName}' exists: ${bucketExists}`);
      
//       if (!bucketExists) {
//         console.log(`Creating bucket '${this.bucketName}'...`);
//         await this.minioClient.makeBucket(this.bucketName, this.configService.get('MINIO_REGION') || 'us-east-1');
//         console.log(`Bucket '${this.bucketName}' created successfully`);
        
//         // Set bucket policy to allow read access
//         try {
//           const policy = {
//             Version: '2012-10-17',
//             Statement: [
//               {
//                 Effect: 'Allow',
//                 Principal: { AWS: ['*'] },
//                 Action: ['s3:GetObject'],
//                 Resource: [`arn:aws:s3:::${this.bucketName}/*`],
//               },
//             ],
//           };
          
//           await this.minioClient.setBucketPolicy(this.bucketName, JSON.stringify(policy));
//           console.log('✅ Bucket policy set successfully - files will be publicly readable');
//         } catch (policyError) {
//           console.warn('⚠️ Warning: Could not set bucket policy:', policyError.message);
//           console.warn('Files may not be publicly accessible via direct URLs');
//         }
//       } else {
//         console.log(`✅ Bucket '${this.bucketName}' already exists and is ready`);
//       }
      
//       this.isMinioReady = true;
//       console.log('🚀 MinIO initialization completed successfully');
      
//     } catch (error) {
//       console.error('❌ Error initializing MinIO bucket:', error);
//       console.error('MinIO service will be unavailable. Upload functionality disabled.');
//       this.isMinioReady = false;
//     }
//   }

//   private async testWithDifferentRegions() {
//     const regions = ['us-east-1', 'us-west-1', 'eu-west-1', ''];
//     const endpoint = this.configService.get<string>('MINIO_ENDPOINT') || 'localhost';
//     const port = parseInt(this.configService.get<string>('MINIO_PORT') || '9000');
//     const useSSL = this.configService.get<string>('MINIO_USE_SSL') === 'true';
//     const accessKey = this.configService.get<string>('MINIO_ACCESS_KEY');
//     const secretKey = this.configService.get<string>('MINIO_SECRET_KEY');

//     console.log('🔍 Testing different regions for authentication...');

//     for (const region of regions) {
//       try {
//         console.log(`Testing region: ${region || 'default'}`);
        
//         const testClient = new Minio.Client({
//           endPoint: endpoint || 'localhost',
//           port: port,
//           useSSL: useSSL,
//           accessKey: accessKey,
//           secretKey: secretKey,
//           region: region,
//         });
        
//         await testClient.listBuckets();
//         console.log(`✅ Authentication successful with region: ${region || 'default'}!`);
//         console.log(`💡 Consider setting MINIO_REGION=${region} in your .env file`);
//         break;
        
//       } catch (error) {
//         console.log(`❌ Region ${region || 'default'} failed: ${error.message}`);
//       }
//     }
//   }

//   private async testAlternativeConnection() {
//     const endpoint = this.configService.get<string>('MINIO_ENDPOINT');
//     const accessKey = this.configService.get<string>('MINIO_ACCESS_KEY');
//     const secretKey = this.configService.get<string>('MINIO_SECRET_KEY');
    
//     console.log(`🔍 Testing alternative MinIO configurations for ${endpoint}...`);
    
//     // Test common MinIO ports
//     const commonPorts = ['9000', '9001', '80', '443'];
    
//     for (const testPort of commonPorts) {
//       try {
//         console.log(`Testing port ${testPort}...`);
        
//         const testClient = new Minio.Client({
//           endPoint: endpoint || 'localhost',
//           port: parseInt(testPort),
//           useSSL: testPort === '443',
//           accessKey: accessKey,
//           secretKey: secretKey,
//         });
        
//         await testClient.listBuckets();
//         console.log(`✅ Connection successful on port ${testPort}!`);
//         console.log(`💡 Consider updating MINIO_PORT to ${testPort} in your .env file`);
//         break;
        
//       } catch (error) {
//         console.log(`❌ Port ${testPort} failed: ${error.message}`);
//       }
//     }
//   }

//   async uploadFile(
//     file: Express.Multer.File,
//     folder: string = 'uploads',
//     originalName?: string
//   ): Promise<{ filePath: string; fileName: string; url: string }> {
//     // Check MinIO readiness first
//     if (!this.isMinioReady) {
//       throw new BadRequestException(
//         'MinIO storage service is not available. Please check server configuration and credentials.'
//       );
//     }

//     try {
//       // Validate file
//       if (!file) {
//         throw new BadRequestException('No file provided');
//       }

//       // Generate unique filename
//       const fileExtension = path.extname(originalName || file.originalname);
//       const fileName = `${uuidv4()}${fileExtension}`;
//       const filePath = `${folder}/${fileName}`;

//       // Validate file size based on type
//       const isVideo = file.mimetype.startsWith('video/');
//       const maxSize = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024; // 100MB for videos, 10MB for images
      
//       if (file.size > maxSize) {
//         const maxSizeMB = maxSize / (1024 * 1024);
//         throw new BadRequestException(`File too large. Maximum size is ${maxSizeMB}MB`);
//       }

//       // Validate file type
//       const allowedMimeTypes = [
//         // Images
//         'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
//         // Videos
//         'video/mp4', 'video/webm', 'video/avi', 'video/quicktime', 'video/x-msvideo', 'video/mov',
//         // Documents
//         'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//       ];

//       if (!allowedMimeTypes.includes(file.mimetype)) {
//         throw new BadRequestException(
//           `File type '${file.mimetype}' not allowed. Allowed types: images, videos, and documents`
//         );
//       }

//       console.log(`📤 Uploading file to MinIO: ${filePath} (${file.size} bytes)`);

//       // Upload to MinIO with better error handling
//       try {
//         const uploadInfo = await this.minioClient.putObject(
//           this.bucketName,
//           filePath,
//           file.buffer,
//           file.size,
//           {
//             'Content-Type': file.mimetype,
//             'X-Original-Name': originalName || file.originalname,
//             'X-Upload-Date': new Date().toISOString(),
//           }
//         );

//         console.log('✅ File uploaded successfully:', uploadInfo);

//         // Generate public URL
//         const publicUrl = this.getPublicUrl(filePath);

//         return {
//           filePath,
//           fileName,
//           url: publicUrl
//         };

//       } catch (uploadError) {
//         console.error('❌ MinIO upload error:', uploadError);
        
//         if (uploadError.code === 'SignatureDoesNotMatch') {
//           throw new BadRequestException(
//             'Authentication failed. Please check MinIO credentials configuration.'
//           );
//         } else if (uploadError.code === 'NoSuchBucket') {
//           throw new BadRequestException(
//             `Bucket '${this.bucketName}' does not exist. Please check bucket configuration.`
//           );
//         } else {
//           throw new BadRequestException(
//             `Upload failed: ${uploadError.message || 'Unknown MinIO error'}`
//           );
//         }
//       }

//     } catch (error) {
//       console.error('❌ Upload error:', error);
      
//       if (error instanceof BadRequestException) {
//         throw error;
//       }
      
//       throw new BadRequestException(
//         `Upload failed: ${error.message || 'Unknown error'}`
//       );
//     }
//   }

//   async getHealthStatus(): Promise<{
//     status: 'healthy' | 'unhealthy';
//     message: string;
//     details?: any;
//   }> {
//     if (!this.isMinioReady) {
//       return {
//         status: 'unhealthy',
//         message: 'MinIO client not initialized or connection failed',
//         details: {
//           endpoint: this.configService.get('MINIO_ENDPOINT'),
//           port: this.configService.get('MINIO_PORT'),
//           bucket: this.bucketName,
//           hasAccessKey: !!this.configService.get('MINIO_ACCESS_KEY'),
//           hasSecretKey: !!this.configService.get('MINIO_SECRET_KEY')
//         }
//       };
//     }

//     try {
//       const buckets = await this.minioClient.listBuckets();
//       const bucketExists = await this.minioClient.bucketExists(this.bucketName);
      
//       return {
//         status: 'healthy',
//         message: 'MinIO connection is working properly',
//         details: {
//           availableBuckets: buckets.length,
//           targetBucketExists: bucketExists,
//           endpoint: this.configService.get('MINIO_ENDPOINT'),
//           port: this.configService.get('MINIO_PORT')
//         }
//       };
//     } catch (error) {
//       return {
//         status: 'unhealthy',
//         message: `MinIO health check failed: ${error.message}`,
//         details: {
//           error: error.message,
//           code: error.code
//         }
//       };
//     }
//   }

//   getPublicUrl(filePath: string): string {
//     const endpoint = this.configService.get<string>('MINIO_ENDPOINT') || 'localhost';
//     const port = this.configService.get<string>('MINIO_PORT') || '9000';
//     const useSSL = this.configService.get<string>('MINIO_USE_SSL') === 'true';
//     const protocol = useSSL ? 'https' : 'http';
    
//     // Handle different URL formats based on port
//     if (port === '80' && !useSSL) {
//       return `http://${endpoint}/${this.bucketName}/${filePath}`;
//     } else if (port === '443' && useSSL) {
//       return `https://${endpoint}/${this.bucketName}/${filePath}`;
//     } else {
//       return `${protocol}://${endpoint}:${port}/${this.bucketName}/${filePath}`;
//     }
//   }

//   // Additional methods remain the same...
//   async getFile(filePath: string): Promise<Readable> {
//     if (!this.isMinioReady) {
//       throw new BadRequestException('MinIO storage service is not available');
//     }

//     try {
//       const stream = await this.minioClient.getObject(this.bucketName, filePath);
//       return stream;
//     } catch (error) {
//       console.error('Get file error:', error);
//       throw new BadRequestException(
//         `File not found: ${error.message || 'Unknown error'}`
//       );
//     }
//   }

//   async deleteFile(filePath: string): Promise<void> {
//     if (!this.isMinioReady) {
//       throw new BadRequestException('MinIO storage service is not available');
//     }

//     try {
//       await this.minioClient.removeObject(this.bucketName, filePath);
//       console.log('✅ File deleted successfully:', filePath);
//     } catch (error) {
//       console.error('❌ Delete file error:', error);
//       console.warn(`Could not delete file ${filePath}:`, error.message);
//     }
//   }

//   get isReady(): boolean {
//     return this.isMinioReady;
//   }
// }
