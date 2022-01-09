import { Module } from '@nestjs/common';
import { CarModule } from './modules/car/car.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/nestjs?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
    ),
    CarModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
