import { Injectable, NotFoundException } from '@nestjs/common';
import { google } from 'googleapis';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
@Injectable()
export class GooglesheetService {
  private sheets;
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogService: ErrorlogService,
  ) {
      const serviceAccount = 'credentials.json';
    // const serviceAccount = 'dist/credentials.json';
      const auth = new google.auth.GoogleAuth({
      keyFile: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    this.sheets = google.sheets({ version: 'v4', auth }); 
  }
    async findAll(sheetId:any, sheetName:any): Promise<any[]> {
      const res = await this.sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: `${sheetName}!A:Z`, // adjust the range based on your sheet
      });
      const rows = res.data.values;
      console.log('rows', rows);
      
      if (!rows) {
        return [];
      }
      return rows.map((row:any) => {
        const obj = {};
        row.forEach((cell:any, i:any) => {
          obj[`field${i + 1}`] = cell;
        });
        return obj;
      });
    }
  
    // CREATE: Append a new row to the sheet
    async create(sheetId: any, sheetName: any, data: any,numfield:any=1): Promise<any> {   
        const values = data.map((item:any) => 
          Array.from({ length: numfield }, (_, i) => item[`field${i + 1}`] || '')
        );
      const res = await this.sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${sheetName}!A:Z`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
      });
      return res.data;
    }
  
    // UPDATE: Update an existing row by row number (e.g. row 2 is the first data row)
    async update(rowNumber: number, data: any,numfield:any=1): Promise<any> {
      // const values = [Array.from({ length: numfield }, (_, i) => data[`field${i + 1}`] || '')];
      // const range = `${this.sheetName}!A${rowNumber}:G${rowNumber}`;
      // const res = await this.sheets.spreadsheets.values.update({
      //   spreadsheetId: this.spreadsheetId,
      //   range,
      //   valueInputOption: 'USER_ENTERED',
      //   requestBody: { values },
      // });
      // return res.data;
    }
  
    // DELETE: Clear the contents of a row (since deletion isn’t directly supported)
    async delete(rowNumber: number): Promise<any> {
      // const range = `${this.sheetName}!A${rowNumber}:G${rowNumber}`;
      // const res = await this.sheets.spreadsheets.values.clear({
      //   spreadsheetId: this.spreadsheetId,
      //   range,
      // });
      // return res.data;
    }
  
}