import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetFilterTaskDto } from '../dto/get-filter-task.dto';
import { Task } from '../entity/task.entity';
import { TaskStatus } from '../enum/task-status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filteredDto: GetFilterTaskDto): Promise<Task[]> {
    const { search, status } = filteredDto;
    const query = this.createQueryBuilder('task');
    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `${search}%` },
      );
    }

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    const tasks = query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }
}
