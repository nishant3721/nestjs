import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from '../modules/task/dto/create-task.dto';
import { GetFilterTaskDto } from '../modules/task/dto/get-filter-task.dto';
import { Tasks } from '../entities/task.entity';
import { TaskStatus } from '../modules/task/enum/task-status.enum';
import { Users } from 'src/entities/user.entity';

@EntityRepository(Tasks)
export class TaskRepository extends Repository<Tasks> {
  async getTasks(filteredDto: GetFilterTaskDto): Promise<Tasks[]> {
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

  async createTask(createTaskDto: CreateTaskDto, user: Users): Promise<Tasks> {
    const { title, description } = createTaskDto;
    const task = new Tasks();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();
    delete task.user;
    return task;
  }
}
