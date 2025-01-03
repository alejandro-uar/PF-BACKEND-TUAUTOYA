import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsString, IsUUID, ValidateNested } from "class-validator";
import { Cars } from "src/entities/cars.entity";

class CarDetails {
  @IsString()
  @IsNotEmpty()
  id:string;

  @IsNotEmpty()
  rentalDays: number;
}

export class CreateOrderDTO{
  @IsNotEmpty()
  @IsUUID()
  userId: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CarDetails)
  cars: CarDetails[]

  @IsDateString()
  startDate: string

  @IsDateString()
  endDate: string
}