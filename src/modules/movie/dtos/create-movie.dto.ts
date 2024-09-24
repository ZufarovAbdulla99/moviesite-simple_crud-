import { IsNumber, isNumber, IsString, isString, Length, Max, Min } from "class-validator";
import { CreateMovieRequest } from "../interfaces";

export class CreateMovieDto implements CreateMovieRequest{
    @IsString()
    name: string;

    @IsNumber()
    @Length(4, 4)
    year: number;

    @IsNumber()
    @Min(1)
    @Max(5)

    rating: number;
}