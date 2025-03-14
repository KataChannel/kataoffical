import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as fs from 'fs';
import { Readable } from 'stream';
@Injectable()
export class GoogleDriveService {
  private drive;
  private driveId = process.env.SHARED_DRIVE_ID;
  private uploaddriveId = process.env.SHARED_UPLOAD_DRIVE_ID;
  constructor() {
    const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || '{}');
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
    this.drive = google.drive({ version: 'v3', auth });    
  }


  async uploadFile(file: Express.Multer.File): Promise<string> {
    const response = await this.drive.files.create({
      requestBody: {
        name: file.originalname,
        parents: [this.uploaddriveId],
      },
      media: {
        mimeType: file.mimetype,
        body: Readable.from(file.buffer),
      },
    });

    // Tạo link public
    await this.drive.permissions.create({
      fileId: response.data.id,
      requestBody: { role: 'reader', type: 'anyone' },
    });

    // const fileUrl = `https://drive.google.com/uc?id=${response.data.id}`;
    // const fileUrl = `https://i.ibb.co/ynR7dC9L/bill.jpg`;
    const fileUrl = `https://drive.google.com/uc?export=view&id=${response.data.id}`;
    // const fileUrl = `https://drive.usercontent.google.com/download?id=${response.data.id}&authuser=0`;
    
    return fileUrl;
  }


  async queryFolders(driveId:any) {
    console.log(driveId);
    
    const response = await this.drive.files.list({
      q: `'${driveId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name, mimeType, createdTime, modifiedTime)',
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    return response.data.files;
  }
  async listFolders() {
    const response = await this.drive.files.list({
      q: `'${this.driveId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name, mimeType, createdTime, modifiedTime)',
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    return response.data.files;
  }
  async listUsersFolder(driveId:any) {
    const response = await this.drive.permissions.list({
      fileId: driveId, // ID của Shared Drive
      supportsAllDrives: true,
    });

    return response.data.permissions;
  }
  async listUsers() {
    const response = await this.drive.permissions.list({
      fileId: this.driveId, // ID của Shared Drive
      supportsAllDrives: true,
    });

    return response.data.permissions;
  }


  async addUser(email: string, role: 'reader' | 'writer' | 'commenter' | 'fileOrganizer' | 'organizer') {
    const response = await this.drive.permissions.create({
      fileId: this.driveId,
      requestBody: {
        type: 'user',
        role,
        emailAddress: email,
      },
      supportsAllDrives: true,
    });

    return response.data;
  }


  async removeUser(permissionId: string) {
    await this.drive.permissions.delete({
      fileId: this.driveId,
      permissionId,
      supportsAllDrives: true,
    });

    return { message: `User ${permissionId} removed` };
  }
  
}
