import { Module } from '@nestjs/common';
import { MovieModule } from './modules';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db.config';

@Module({
  imports: [ConfigModule.forRoot({
    // envFilePath: ".env",
    isGlobal: true,
    load: [dbConfig]
  }), MovieModule],
})
export class AppModule {}
