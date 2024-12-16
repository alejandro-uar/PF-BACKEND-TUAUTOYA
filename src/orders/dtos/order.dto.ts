import { ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Cars } from "src/entities/cars.entity";

export class CreateOrderDTO{
  @IsNotEmpty()
  @IsUUID()
  usersId: string

  @IsArray()
  @ArrayMinSize(1)
  cars: Partial<Cars[]>

  @IsDateString()
  startDate: string

  @IsDateString()
  endDate: string
}