import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilterTaskDto } from './dto/get-filter-task.dto';

@Injectable()
export class TaskService {
  // private taskArray: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.taskArray;
  // }
  // getFilteredTask(filteredDto: GetFilterTaskDto): Task[] {
  //   let filteredTaskArray = this.getAllTasks();
  //   const { search, status } = filteredDto;
  //   if (search) {
  //     filteredTaskArray = filteredTaskArray.filter((element) => {
  //       if (
  //         element.title.toLowerCase().includes(search) ||
  //         element.description.toLowerCase().includes(search)
  //       ) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   if (status) {
  //     filteredTaskArray = filteredTaskArray.filter(
  //       (element) => element.status == status,
  //     );
  //   }
  //   return filteredTaskArray;
  // }
  // getTaskById(id: string): Task {
  //   const foundedTask = this.taskArray.find((element) => element._id == id);
  //   if (!foundedTask) {
  //     throw new NotFoundException(`Task with ID ${id} not found`);
  //   }
  //   return foundedTask;
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task = {
  //     _id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.taskArray.push(task);
  //   return task;
  // }
  // deleteTaskById(id: string): Task[] {
  //   this.getTaskById(id);
  //   const index = this.taskArray.findIndex((element) => element._id == id);
  //   this.taskArray.splice(index, 1);
  //   return this.taskArray;
  // }
  // updateTaskById(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
