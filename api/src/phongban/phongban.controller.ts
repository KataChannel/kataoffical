import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { PhongbanService } from './phongban.service';
import { CreatePhongbanDto, UpdatePhongbanDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('phongban')
@UseGuards(JwtAuthGuard)
export class PhongbanController {
  constructor(private readonly phongbanService: PhongbanService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPhongbanDto: CreatePhongbanDto) {
    return this.phongbanService.create(createPhongbanDto);
  }

  @Get()
  findAll(
    @Query('level') level?: string,
    @Query('loai') loai?: string,
    @Query('parentId') parentId?: string,
    @Query('includeChildren') includeChildren?: string
  ) {
    return this.phongbanService.findAll({
      level: level ? parseInt(level) : undefined,
      loai,
      parentId,
      includeChildren: includeChildren === 'true'
    });
  }

  @Get('tree')
  getTree() {
    return this.phongbanService.getTree();
  }

  @Get('statistics')
  getStatistics() {
    return this.phongbanService.getStatistics();
  }

  @Get('ma/:ma')
  findByMa(@Param('ma') ma: string) {
    return this.phongbanService.findByMa(ma);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phongbanService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhongbanDto: UpdatePhongbanDto) {
    return this.phongbanService.update(id, updatePhongbanDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.phongbanService.remove(id);
  }
}
