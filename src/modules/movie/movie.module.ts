import { Module } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieController } from "./movie.controller";
import { PgService } from "src/postgres/pg.service";

@Module({
    providers: [MovieService, PgService],
    controllers: [MovieController],
})

export class MovieModule {}