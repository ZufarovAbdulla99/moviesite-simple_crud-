import { Module, ValidationPipe } from '@nestjs/common';
import { MovieModule } from '@modules';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db.config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ExceptionHandlerFilter } from './filters';

@Module({
  imports: [ConfigModule.forRoot({
    // envFilePath: ".env",
    isGlobal: true,
    load: [dbConfig]
  }), MovieModule],
  providers: [
    {
      useClass: ValidationPipe,
      provide: APP_PIPE
    },
    {
      useClass: ExceptionHandlerFilter,
      provide: APP_FILTER
    }
  ]
})
export class AppModule {}
