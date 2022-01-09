import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from 'src/models/tasks';

export class GetFilterTaskDto {
  @IsOptional()
  @IsString()
  search?: string;
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
