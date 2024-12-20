import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { OrderDetails } from "src/entities/orderDetails.entity";
import { Fuels, Status, Transmissions } from "../cars.enum";

export class CreateCarDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  brand: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  model: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)  // Un mínimo de 4 caracteres para el año
  @MaxLength(4)  // Un máximo de 4 caracteres (para el año)
  year: string;

  @IsNumber()
  @IsNotEmpty()
  pricePerDay: number;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  image: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Transmissions)
  transmission: Transmissions;

  @IsEnum(Fuels)
  fuelType: Fuels;

  @IsString()
  kilometer: string;

  @IsString()
  @IsOptional()
  brakes: string;

  @IsInt()
  @IsOptional()
  rating: number;

  @IsEnum(Status)
  status: Status;

  @IsUUID()
  userId: string;
}


export class QueryCarDto {
  @IsString()
  @IsOptional()
  brand: string;

  @IsString()
  @IsOptional()
  price: string;

  @IsString()
  @IsOptional()
  year: string;
}