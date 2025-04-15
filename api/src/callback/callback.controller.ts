import { Controller, Post, Body } from '@nestjs/common';
import { CallbackService } from './callback.service';
import { CallbackDataInput } from './dto/callback-data-input.dto';
import { CallbackDataOutput } from './dto/callback-data-output.dto';

@Controller('actopensupport')
export class CallbackController {
  constructor(private readonly callbackService: CallbackService) {}

  @Post('call_back_data_demo')
  async callBackData(@Body() param: CallbackDataInput): Promise<CallbackDataOutput> {
    return this.callbackService.processCallback(param);
  }
}