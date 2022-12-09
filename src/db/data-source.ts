import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { isProduction } from '../utils/constants';
import { DataSource } from 'typeorm';
import { migrateDbConfig } from './migrate-db-config';


export class TypeOrmConfig {
  static getTypeormConfig(configService: ConfigService): TypeOrmModuleOptions {
    if(isProduction){
      return {
        type: 'postgres',
        host: configService.get('HOST_PROD'),
        port: Number.parseInt(configService.get('PORT_PROD')),
        username: configService.get('USERNAME_PROD'),
        password: configService.get('PASSWORD_PROD'),
        database: configService.get('DB_PROD'),
        entities: ['dist/**/entities/*.entity.js'],
        migrations: ['dist/db/migrations/*.js'],
        logging: true,
        
      };
    }else{
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

}
export const dataSourceOptions: TypeOrmModuleAsyncOptions = {
  inject:[ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getTypeormConfig(configService),
  
};





const dataSource = new DataSource(migrateDbConfig);

export default dataSource;

