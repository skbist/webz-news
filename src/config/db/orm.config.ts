import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'webzdb',
  entities: [__dirname + '/../../**/entities/*.entity.{ts,js}'],
  /* Note : it is unsafe to use synchronize: true for schema synchronization
    on production once you get data in your database. */
  // commented synchronize true as it gives nullable error
  synchronize: false,
  autoLoadEntities: true,
  migrationsRun: false,
  migrations: [__dirname + '../migrations/*.{ts,js}'],
  subscribers: [],
};

export const OrmConfig = {
  ...typeOrmModuleOptions,
  migrationsTableName: 'migrations',
  migrations: ['src/db/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};
const dataSource = new DataSource(OrmConfig as DataSourceOptions);
export default dataSource;
