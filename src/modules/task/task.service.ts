import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilterTaskDto } from './dto/get-filter-task.dto';
import { Tasks } from '../../entities/task.entity';
import { TaskStatus } from './enum/task-status.enum';
import { TaskRepository } from '../../repository/task.repository';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  async getTasks(filteredDto: GetFilterTaskDto): Promise<Tasks[]> {
    return this.taskRepository.getTasks(filteredDto);
  }

  async getTaskById(id: number): Promise<Tasks> {
    const foundedTask = await this.taskRepository.findOne(id);
    if (!foundedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return foundedTask;
  }

  async createTask(createTaskDto: CreateTaskDto, req: any): Promise<Tasks> {
    const user = req.user;
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTaskById(id: number): Promise<void> {
    const deletedTask = await this.taskRepository.delete(id);
    if (!deletedTask.affected) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateTaskById(id: number, status: TaskStatus): Promise<Tasks> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
