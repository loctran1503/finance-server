import 'dotenv/config'
import { DataSourceOptions } from 'typeorm';



export const migrateDbConfig : DataSourceOptions ={
      type: 'postgres',
      host: process.env.HOST_DEV,
      port: Number.parseInt(process.env.PORT_DEV),
      username: process.env.USERNAME_DEV,
      password: process.env.PASSWORD_DEV,
      database: process.env.DB_DEV,
      entities: ['dist/**/entities/*.entity.js'],
      migrations: ['dist/db/migrations/*.js'],
      logging: true,
    
}





