import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilterTaskDto } from './dto/get-filter-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tasks } from '../../entities/task.entity';
import { TaskService } from './task.service';
import { Users } from 'src/entities/user.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTasks(
    @Query() filteredDto: GetFilterTaskDto,
    @Req() req: any,
  ): Promise<Tasks[]> {
    return this.taskService.getTasks(filteredDto, req);
  }

  @Get(':id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ): Promise<Tasks> {
    return this.taskService.getTaskById(id, req);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Req() req: any,
  ): Promise<Tasks> {
    return this.taskService.createTask(createTaskDto, req);
  }

  @Delete(':id')
  deleteCarById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ): Promise<void> {
    return this.taskService.deleteTaskById(id, req);
  }

  @Put(':id')
  updateTaskById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: any,
  ): Promise<Tasks> {
    const { status } = updateTaskDto;
    return this.taskService.updateTaskById(id, status, req);
  }
}
