import 'dotenv/config'
import { isProduction } from 'src/utils/constants';
import { DataSourceOptions } from 'typeorm';



export const migrateDbConfig : DataSourceOptions ={
      type: 'postgres',
      host: isProduction ? process.env.HOST_PROD : process.env.HOST_DEV,
      port: Number.parseInt(isProduction ? process.env.PORT_PROD : process.env.PORT_DEV),
      username: isProduction ?  process.env.USERNAME_PROD : process.env.USERNAME_DEV,
      password: isProduction ? process.env.PASSWORD_PROD : process.env.PASSWORD_DEV,
      database: isProduction ? process.env.DB_PROD : process.env.DB_DEV,
      entities: ['dist/**/entities/*.entity.js'],
      migrations: ['dist/db/migrations/*.js'],
      logging: true,
    
}





