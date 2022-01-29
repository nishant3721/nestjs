import { Module } from '@nestjs/common';
import { CarModule } from './modules/car/car.module';
import { TaskModule } from './modules/task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), CarModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
