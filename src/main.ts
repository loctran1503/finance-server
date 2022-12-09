import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config'
import { isProduction } from './utils/constants';
async function bootstrap() {
  
  const app = await NestFactory.create(AppModule,{cors:{
    origin:isProduction ? process.env.CORS_DEV : process.env.CORS_PROD,
    credentials:true
  }});
 
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.listen(5000);
}
bootstrap();
