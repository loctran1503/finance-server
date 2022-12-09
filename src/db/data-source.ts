import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { migrateDbConfig } from './migrate-db-config';


export class TypeOrmConfig {
  static getTypeormConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('HOST_DEV'),
      port: Number.parseInt(configService.get('PORT_DEV')),
      username: configService.get('USERNAME_DEV'),
      password: configService.get('PASSWORD_DEV'),
      database: configService.get('DB_DEV'),
      entities: ['dist/**/entities/*.entity.js'],
      migrations: ['dist/db/migrations/*.js'],
      logging: true,
      
    };
  }

}
export const dataSourceOptions: TypeOrmModuleAsyncOptions = {
  inject:[ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getTypeormConfig(configService),
  
};





const dataSource = new DataSource(migrateDbConfig);

export default dataSource;

