import { Module } from '@nestjs/common';
import { MovieModule } from './modules';

@Module({
  imports: [MovieModule],
})
export class AppModule {}
