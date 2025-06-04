// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { writeFile } from 'fs/promises';
// import * as path from 'path';

// @Injectable()
// export class GeminiService {
//   private genAI: GoogleGenerativeAI;
//   private fileManager: GoogleAIFileManager;
//   private model;

//   constructor(private configService: ConfigService, private prisma: PrismaService) {
//     const apiKey = this.configService.get<string>('GEMINI_API_KEY');
//     this.genAI = new GoogleGenerativeAI(apiKey);
//     this.fileManager = new GoogleAIFileManager(apiKey);
//     this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
//   }

//   async uploadToGemini(filePath: string, mimeType: string) {
//     const uploadResult = await this.fileManager.uploadFile(filePath, {
//       mimeType,
//       displayName: path.basename(filePath),
//     });
//     return uploadResult.file;
//   }

//   async processImage(fileBuffer: Buffer, fileName: string): Promise<any> {
//     const uploadDir = path.join(__dirname, '../../uploads');
//     const filePath = path.join(uploadDir, fileName);
//     await writeFile(filePath, fileBuffer);
    
//     const uploadedFile = await this.uploadToGemini(filePath, 'image/jpeg');
//     const chatSession = this.model.startChat({
//       generationConfig: {
//         temperature: 1,
//         topP: 0.95,
//         topK: 40,
//         maxOutputTokens: 8192,
//         responseMimeType: 'text/plain',
//       },
//       history: [
//         {
//           role: 'user',
//           parts: [
//             { fileData: { mimeType: 'image/jpeg', fileUri: uploadedFile.uri } },
//             { text: 'xuất dữ liệu json' },
//           ],
//         },
//       ],
//     });
    
//     const result = await chatSession.sendMessage('');
//     return result.response.text();
//   }
// }
