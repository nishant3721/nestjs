import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'euWppq372001@',
  database: 'task-management',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
