import { IsEnum, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { OrderDetails } from "src/entities/orderDetails.entity";
import { Fuels } from "../cars.enum";

export class CreateCarDto {

  @IsUUID()
  userId: string;

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

  @IsString()
  @IsNotEmpty()
  @IsNumberString()  // Para validar que sea un número (como un precio)
  pricePerDay: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  image: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  transmission: string;

  @IsEnum(Fuels)
  fuel: Fuels;

  @IsInt()
  kilometers: number;
}


export class QueryCarDto {
  @IsString()
  @IsOptional()
  brand: string;

  @IsString()
  @IsOptional()
  price: string;
}