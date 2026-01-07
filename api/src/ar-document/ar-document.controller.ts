import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequirePermissions } from 'src/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/guards/permissions.guard';
import { ARDocumentService } from './ar-document.service';
import {
  CreateARDocumentDto,
  ReviewARDocumentDto,
} from './dto/ar-document.dto';

@Controller('ar-document')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ARDocumentController {
  constructor(private readonly arDocumentService: ARDocumentService) {}

  @Get()
  @RequirePermissions('ar-document.view')
  findAll(
    @Query('status') status?: string,
    @Query('tuNgay') tuNgay?: string,
    @Query('denNgay') denNgay?: string,
    @Query('customerId') customerId?: string,
  ) {
    return this.arDocumentService.findAll({
      status,
      tuNgay,
      denNgay,
      customerId,
    });
  }

  @Get(':id')
  @RequirePermissions('ar-document.view')
  findOne(@Param('id') id: string) {
    return this.arDocumentService.findOne(id);
  }

  @Post()
  @RequirePermissions('ar-document.create')
  create(@Body() createDto: CreateARDocumentDto) {
    return this.arDocumentService.create(createDto);
  }

  @Post(':id/review')
  @RequirePermissions('ar-document.approve')
  review(@Param('id') id: string, @Body() reviewDto: ReviewARDocumentDto) {
    return this.arDocumentService.review(id, reviewDto);
  }
}
