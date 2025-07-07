import { Controller, Get, Post, Body, Param, Patch, Delete, UsePipes, ValidationPipe, HttpStatus, Ip, Res, Req } from '@nestjs/common';
import { Response } from 'express';
import { AffiliatelinkService } from './affiliatelink.service';
import { ReorderAffiliatelinkDto } from './dto/affiliatelink.dto';
import { TrackingEventService } from 'src/trackingevent/trackingevent.service';
@Controller('affiliatelink')
export class AffiliatelinkController {
  constructor(
    private readonly affiliatelinkService: AffiliatelinkService,
    private readonly trackingEventService: TrackingEventService
  ) {}
  @Get('track/:codeId')
  async handleTrack(
    @Param('codeId') codeId: string,
    @Res() res: Response, // Inject Response object
    @Ip() ipAddress: string, // Get client IP address
    @Req() req: any, // Access request headers for user agent
  ) {
    const affiliateLink = await this.affiliatelinkService.findByCode(codeId);
    if(affiliateLink) {
      this.trackingEventService.logEvent({
        affiliateLinkId: affiliateLink.id,
        type: 'view',
        ipAddress: ipAddress,
        userAgent: req.headers['user-agent'] || '',
      }).catch(err => console.error("Failed to log view event:", err)); // Log errors but don't block redirect
      res.status(HttpStatus.OK).json(affiliateLink);
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Affiliate link not found' });
    }
  }
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createAffiliatelinkDto: any) {
    return this.affiliatelinkService.create(createAffiliatelinkDto);
  }

  @Post('findby')
  @UsePipes(new ValidationPipe())
  findBy(@Body() param: any) {
    return this.affiliatelinkService.findOneBy(param);
  }
  @Post('findlistby')
  @UsePipes(new ValidationPipe())
  findListBy(@Body() param: any) {
    return this.affiliatelinkService.findListBy(param);
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
  // @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateAffiliatelinkDto: any) {
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