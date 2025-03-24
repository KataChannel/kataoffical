import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { taskService } from './task.service';
@Controller('task')
export class taskController {
  constructor(private readonly taskService: taskService) {}
  @Post()
  create(@Body() createtaskDto: any) {
    return this.taskService.create(createtaskDto);
  }
  @Post('findby')
  findby(@Body() param: any) {
    return this.taskService.findby(param);
  }
  @Get()
  findAll() {
    return this.taskService.findAll();
  }
  @Get('last-updated')
    async getLastUpdatedtask() {
      return this.taskService.getLastUpdatedtask();
  }
  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.taskService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}