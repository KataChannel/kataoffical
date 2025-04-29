import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  create(@Body() createChatbotDto: any) {
    return this.chatbotService.create(createChatbotDto);
  }
  @Post('ask')
  async ask(@Body('userId') userId: string, @Body('message') message: string) {
    return this.chatbotService.chatWithAI(userId, message);
  }
  @Get()
  findAll() {
    return this.chatbotService.findAll();
  }

  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.chatbotService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.chatbotService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatbotService.remove(id);
  }
}