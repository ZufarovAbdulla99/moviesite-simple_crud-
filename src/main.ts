import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, ():void => {
    console.log(`Listening on ${3000}...`);
  });
}
bootstrap();
