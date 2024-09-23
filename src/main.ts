import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  await app.listen(
    configService.get<number>('PORT'),
    configService.get<string>('HOST'),
    (): void => {
      console.log(`Listening on ${configService.get<number>('PORT')}...`);
    },
  );
}
bootstrap();
