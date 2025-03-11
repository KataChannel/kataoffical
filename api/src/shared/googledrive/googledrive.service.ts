import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class GoogleDriveService {
  private drive;
  private driveId = process.env.SHARED_DRIVE_ID;
  constructor() {
    const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || '{}');
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
    this.drive = google.drive({ version: 'v3', auth });
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
