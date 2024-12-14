import { Transform, Type } from "class-transformer";
import { IsInt, IsNumber, IsString, Min } from "class-validator";

export class CreateCarDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsString()
  year: string;

  @IsString()
  pricePerDay: string; 

  @IsString()
  description: string;

  image: File;
}
