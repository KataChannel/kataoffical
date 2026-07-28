// import {
//   Controller,
//   Post,
//   Get,
//   Delete,
//   Param,
//   UseInterceptors,
//   UploadedFile,
//   UploadedFiles,
//   BadRequestException,
//   Query,
//   Res,
// } from '@nestjs/common';
// import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
// import { UploadService } from './upload.service';
// import { Response } from 'express';

// @Controller('upload')
// export class UploadController {
//   constructor(private readonly uploadService: UploadService) {}

//   @Get('health')
//   async healthCheck() {
//     return await this.uploadService.getHealthStatus();
//   }

//   @Post('single')
//   @UseInterceptors(FileInterceptor('file'))
//   async uploadSingle(
//     @UploadedFile() file: Express.Multer.File,
//     @Query('folder') folder?: string,
//     @Query('originalName') originalName?: string,
//   ) {
//     if (!file) {
//       throw new BadRequestException('No file uploaded');
//     }

//     try {
//       const result = await this.uploadService.uploadFile(
//         file,
//         folder || 'uploads',
//         originalName
//       );

//       return {
//         success: true,
//         message: 'File uploaded successfully',
//         data: result,
//       };
//     } catch (error) {
//       throw new BadRequestException(error.message);
//     }
//   }

//   @Post('multiple')
//   @UseInterceptors(FilesInterceptor('files', 10))
//   async uploadMultiple(
//     @UploadedFiles() files: Express.Multer.File[],
//     @Query('folder') folder?: string,
//   ) {
//     if (!files || files.length === 0) {
//       throw new BadRequestException('No files uploaded');
//     }

//     try {
//       const results = await Promise.all(
//         files.map(file => 
//           this.uploadService.uploadFile(file, folder || 'uploads')
//         )
//       );

//       return {
//         success: true,
//         message: `${results.length} files uploaded successfully`,
//         data: results,
//       };
//     } catch (error) {
//       throw new BadRequestException(error.message);
//     }
//   }

// //   @Get('list')
// //   async listFiles(@Query('prefix') prefix?: string) {
// //     try {
// //       const files = this.uploadService.listFiles(prefix);
// //       return {
// //         success: true,
// //         data: files,
// //       };
// //     } catch (error) {
// //       throw new BadRequestException(error.message);
// //     }
// //   }

//   // Fixed: Updated route pattern from ":filePath(.*)" to ":filePath/*path"


//   // Alternative approach: Using a single parameter with wildcard


//   // Fixed: Updated route pattern from ":filePath(.*)" to "*filePath"
//   @Get('download/*filePath')
//   async downloadFile(
//     @Param('filePath') filePath: string,
//     @Res() res: Response,
//   ) {
//     try {
//       const stream = await this.uploadService.getFile(filePath);
      
//       res.setHeader('Content-Type', 'application/octet-stream');
//       res.setHeader('Content-Disposition', `attachment; filename="${filePath}"`);
      
//       stream.pipe(res);
//     } catch (error) {
//       throw new BadRequestException(error.message);
//     }
//   }

//   // Fixed: Updated route pattern from ":filePath(.*)" to "*filePath"
//   @Delete('file/*filePath')
//   async deleteFile(@Param('filePath') filePath: string) {
//     try {
//       await this.uploadService.deleteFile(filePath);
//       return {
//         success: true,
//         message: 'File deleted successfully',
//       };
//     } catch (error) {
//       throw new BadRequestException(error.message);
//     }
//   }

//   // Fixed: Updated route pattern from ":filePath(.*)" to "*filePath"
//   @Get('url/*filePath')
//   getPublicUrl(@Param('filePath') filePath: string) {
//     const url = this.uploadService.getPublicUrl(filePath);
//     return {
//       success: true,
//       url: url,
//     };
//   }

//   // Additional endpoint for file operations with query parameter approach
// //   @Get('file')
// //   async getFileByQuery(@Query('path') filePath: string) {
// //     if (!filePath) {
// //       throw new BadRequestException('File path is required');
// //     }

// //     try {
// //       const info = this.uploadService.getFileInfo(filePath);
// //       return {
// //         success: true,
// //         data: info,
// //       };
// //     } catch (error) {
// //       throw new BadRequestException(error.message);
// //     }
// //   }

//   @Delete('file')
//   async deleteFileByQuery(@Query('path') filePath: string) {
//     if (!filePath) {
//       throw new BadRequestException('File path is required');
//     }

//     try {
//       await this.uploadService.deleteFile(filePath);
//       return {
//         success: true,
//         message: 'File deleted successfully',
//       };
//     } catch (error) {
//       throw new BadRequestException(error.message);
//     }
//   }

//   @Get('url')
//   getPublicUrlByQuery(@Query('path') filePath: string) {
//     if (!filePath) {
//       throw new BadRequestException('File path is required');
//     }

//     const url = this.uploadService.getPublicUrl(filePath);
//     return {
//       success: true,
//       url: url,
//     };
//   }

//   @Get('test-auth')
//   async testAuthentication() {
//     try {
//       const health = await this.uploadService.getHealthStatus();
//       return {
//         success: health.status === 'healthy',
//         message: health.message,
//         details: health.details
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: `Authentication test failed: ${error.message}`,
//         error: error.code
//       };
//     }
//   }
// }
