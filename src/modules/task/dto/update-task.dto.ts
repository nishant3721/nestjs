import { IsEnum } from 'class-validator';
import { TaskStatus } from 'src/models/tasks';

export class UpdateTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
