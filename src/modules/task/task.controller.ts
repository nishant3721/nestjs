import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Task, TaskStatus } from 'src/models/tasks';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilterTaskDto } from './dto/get-filter-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTasks(@Query() filteredDto: GetFilterTaskDto): Task[] {
    if (Object.keys(filteredDto).length) {
      return this.taskService.getFilteredTask(filteredDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete(':id')
  deleteCarById(@Param('id') id: string): Task[] {
    return this.taskService.deleteTaskById(id);
  }

  @Put(':id')
  updateCarById(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Task {
    const { status } = updateTaskDto;
    return this.taskService.updateTaskById(id, status);
  }
}
