import { Controller, Get, Post, Body, Param, Patch, Delete, Put, Query } from '@nestjs/common';
import { GooglesheetService } from './googlesheet.service';
@Controller('googlesheet')
export class GooglesheetController {
  constructor(private readonly googlesheetService: GooglesheetService) {}
  @Get()
  async getAll(@Query('sheetId') sheetId: string, @Query('sheetName') sheetName: string) {
    return await this.googlesheetService.findAll(sheetId, sheetName);
  }

  // POST /sheets
  @Post()
  async create(@Query('sheetId') sheetId: string, @Query('sheetName') sheetName: string, @Query('numfield') numfield: number, @Body() body: any) {
    return await this.googlesheetService.create(sheetId, sheetName, body,numfield);
  }

  // PUT /sheets/:row – update the row (pass the actual sheet row number; for example, 2 for the first data row)
  @Put(':row')
  async update(@Query('numfield') numfield: number,@Param('row') row: string, @Body() body: any) {
    const rowNumber = parseInt(row, 10);
    return await this.googlesheetService.update(rowNumber, body,numfield);
  }

  // DELETE /sheets/:row – clear the row contents
  @Delete(':row')
  async delete(@Param('row') row: string) {
    const rowNumber = parseInt(row, 10);
    return await this.googlesheetService.delete(rowNumber);
  }
}