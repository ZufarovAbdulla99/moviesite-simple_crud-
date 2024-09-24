import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // // LoggerMiddlewareni Global ishlatish hamma request uchun ishlaydi
  // app.use(new LoggerMiddleware().use)

  if(process.env.NODE_ENV.trim() == "development"){
    app.use(morgan("tiny"))
  }

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(
    configService.get<number>('PORT'),
    configService.get<string>('HOST'),
    (): void => {
      console.log(`Listening on ${configService.get<number>('PORT')}...`);
    },
  );
}
bootstrap();
