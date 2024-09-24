import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieController } from "./movie.controller";
import { PgService } from "src/postgres/pg.service";
import { LoggerMiddleware } from "src/middlewares";

@Module({
    providers: [MovieService, PgService],
    controllers: [MovieController],
})

export class MovieModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes({
            path: "movies",
            method: RequestMethod.ALL
        })
    }
}