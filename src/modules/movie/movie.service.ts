import { Injectable } from '@nestjs/common';
import {
  CreateMovieRequest,
  CreateMovieResponse,
  UpdateMovieRequest,
  UpdateMovieResponse,
} from './interfaces';
import { PgService } from '@postgres';
import { ApiFeatuere } from '@utils';

export declare interface Movie {
  id: number;
  name: string;
  rating: number;
  year: number;
}

@Injectable()
export class MovieService {
  // private movies: Movie[] = [
  //   {
  //     id: 1,
  //     name: 'Titanik',
  //     rating: 4,
  //     year: 2000,
  //   },
  //   {
  //     id: 2,
  //     name: 'Oq kema',
  //     rating: 4.5,
  //     year: 2000,
  //   },
  // ];

  constructor(private readonly postgres: PgService) {}

  // // Oddiy CRUD
  // getAllMovies(): Movie[] {
  //   return this.movies
  // }

  // getSingleMovie(movieId: number): Movie {
  //   return this.movies.find((m) => m.id == movieId);
  // }

  // createMovie(payload: CreateMovieRequest): CreateMovieResponse {
  //   const newMovie = {
  //     ...payload,
  //     id: this.movies.at(-1)?.id + 1 || 1,
  //   };

  //   this.movies.push(newMovie);

  //   return newMovie;
  // }

  // updateMovie(
  //   movieId: number,
  //   payload: UpdateMovieRequest,
  // ): UpdateMovieResponse {
  //   const updatedMovie = this.movies.find((m) => m.id == movieId);
  //   if (updatedMovie) {
  //     updatedMovie.name = payload.name;
  //     updatedMovie.rating = payload.rating;
  //     updatedMovie.year = payload.year;
  //   }
  //   return updatedMovie;
  // }

  // deleteMovie(movieId: number): void {
  //   const movieIndex = this.movies.findIndex((m) => m.id === movieId);
  //   this.movies.splice(movieIndex, 1);
  // }

  // // Postgre sql bilan CRUD
  async getAllMovies(queries: Record<string, any>): Promise<any> {
    // const data = await this.postgres.fetchData("SELECT * FROM movies")
    // console.log(data)
    // console.log(queries)

    // throw new Error("Nooooo")

    const query = new ApiFeatuere("movies")
    .paginate(queries?.page || 1, queries?.limit || 10)
    .limitFields(queries?.fields ? queries.fields.split(',') : ['*'])
    .sort(queries?.sort)
    .getQuery();
    // console.log(query)
    const data = await this.postgres.fetchData(query.queryString);
    return {
      limit: query.limit,
      page: query.page,
      data,
    };
  }

  async getSingleMovie(movieId: number): Promise<any> {
    return await this.postgres.fetchData(
      'SELECT * FROM movies WHERE id = $1',
      movieId,
    );
  }

  async createMovie(payload: CreateMovieRequest): Promise<any> {
    const newMovie = await this.postgres.fetchData(
      `
      INSERT INTO movies (name, rating, year) VALUES ($1, $2, $3)
      `,
      payload.name,
      payload.rating,
      payload.year,
    );

    return newMovie;
  }

  async updateMovie(
    movieId: number,
    payload: UpdateMovieRequest,
  ): Promise<any> {
    const updateMovie = await this.postgres.fetchData(
      `
      UPDATE movies
      SET name = $1, rating = $2, year = $3
      WHERE id = $4;
      `,
      payload.name,
      payload.rating,
      payload.year,
      movieId,
    );

    return `Succussfully updated movie`;
  }

  async deleteMovie(movieId: number): Promise<any> {
    await this.postgres.fetchData(
      `
      DELETE FROM movies
      WHERE id = $1;
      `,
      movieId,
    );

    return `Successfully deleted movie`;
  }

  async deleteAllMovie(): Promise<any> {
    await this.postgres.fetchData(`
      TRUNCATE TABLE movies;
      `);

    return `Successfully deleted all movies`;
  }
}
