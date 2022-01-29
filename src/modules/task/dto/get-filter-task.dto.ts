import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../enum/task-status.enum';

export class GetFilterTaskDto {
  @IsOptional()
  @IsString()
  search?: string;
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
