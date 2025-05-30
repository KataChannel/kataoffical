import { Controller, Get, Post, Body, Param, Patch, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { AffiliatelinkService } from './affiliatelink.service';
import { CreateAffiliatelinkDto, UpdateAffiliatelinkDto, ReorderAffiliatelinkDto, FindByDto } from './dto/affiliatelink.dto';

@Controller('affiliatelink')
export class AffiliatelinkController {
  constructor(private readonly affiliatelinkService: AffiliatelinkService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createAffiliatelinkDto: CreateAffiliatelinkDto) {
    return this.affiliatelinkService.create(createAffiliatelinkDto);
  }

  @Post('findby')
  @UsePipes(new ValidationPipe())
  findBy(@Body() param: FindByDto) {
    return this.affiliatelinkService.findBy(param);
  }

  @Get()
  findAll() {
    return this.affiliatelinkService.findAll();
  }

  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.affiliatelinkService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateAffiliatelinkDto: UpdateAffiliatelinkDto) {
    return this.affiliatelinkService.update(id, updateAffiliatelinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.affiliatelinkService.remove(id);
  }

  @Post('reorder')
  @UsePipes(new ValidationPipe())
  reorder(@Body() reorderAffiliatelinkDto: ReorderAffiliatelinkDto) {
    return this.affiliatelinkService.reorderAffiliatelinks(reorderAffiliatelinkDto.affiliatelinkIds);
  }
}