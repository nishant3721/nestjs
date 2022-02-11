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
  getTasks(@Query() filteredDto: GetFilterTaskDto): Promise<Tasks[]> {
    return this.taskService.getTasks(filteredDto);
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Tasks> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Req() req: any,
  ): Promise<Tasks> {
    return this.taskService.createTask(createTaskDto, req);
  }

  @Delete(':id')
  deleteCarById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.taskService.deleteTaskById(id);
  }

  @Put(':id')
  updateCarById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Tasks> {
    const { status } = updateTaskDto;
    return this.taskService.updateTaskById(id, status);
  }
}
