import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Movie, MovieService } from './movie.service';
import { CreateMovieDto, UpdateMovieDto } from './dtos';
import { CreateMovieResponse, UpdateMovieResponse } from './interfaces';

@Controller({
  path: 'movies',
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  // // Oddiy CRUD
  //   @Get('/')
  //   getMovies(): Movie[] {
  //     return this.movieService.getAllMovies();
  //   }

  //   @Get('/:movieId')
  //   getSingleMovie(@Param('movieId') movieId: string): Movie {
  //     return this.movieService.getSingleMovie(+movieId);
  //   }

  //   @Post('/add')
  //   addMovie(@Body() createMovieData: CreateMovieDto): CreateMovieResponse {
  //     return this.movieService.createMovie(createMovieData);
  //   }

  //   @Patch('/update/:movieId')
  //   updateMovie(
  //     @Param('movieId') movieId: string,
  //     @Body() updateMovieData: UpdateMovieDto,
  //   ): UpdateMovieResponse {
  //     return this.movieService.updateMovie(+movieId, updateMovieData);
  //   }

  //   @Delete('/delete/:movieId')
  //   deleteMovie(@Param('movieId') movieId: string): void {
  //       this.movieService.deleteMovie(+movieId);
  //   }

  // // Postgres Sql bilan CRUD
  @Get("/")
  async getAllMovies(@Query() queries: Record<string, string>): Promise<any[]> {
      return await this.movieService.getAllMovies(queries);
  }

  @Get("/:movieId")
  async getSingleMovie(@Param("movieId") movieId: string):Promise<any> {
      return await this.movieService.getSingleMovie(+movieId)
  }

  @Post("/add")
  async createMovie(@Body() createMovieData: CreateMovieDto): Promise<any> {
    return await this.movieService.createMovie(createMovieData)
  }

  @Patch("/update/:movieId")
  async updateMovie(@Param("movieId") movieId: string, @Body() updateMovieData: UpdateMovieDto): Promise<any> {
    return await this.movieService.updateMovie(+movieId, updateMovieData)
  }

  @Delete("/delete/:movieId")
  async deleteMovie(@Param("movieId") movieId: string): Promise<any> {
    return await this.movieService.deleteMovie(+movieId)
  }

  @Delete("/delete")
  async deleteAllMovies(): Promise<any> {
    return await this.movieService.deleteAllMovie()
  }
}
