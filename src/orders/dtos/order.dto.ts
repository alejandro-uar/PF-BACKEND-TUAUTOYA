import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsString, IsUUID, ValidateNested } from "class-validator";
import { Cars } from "src/entities/cars.entity";

class CarDetails {

  @ApiProperty({
    description: 'Identificador único del coche',
    example: 'a12bc34d-56ef-78gh-90ij-klmno123pqr',
  })
  @IsString()
  @IsNotEmpty()
  id:string;

}

export class CreateOrderDTO{
  
  @ApiProperty({
    description: 'Identificador único del usuario que realiza la orden',
    example: 'b1234567-89ab-cdef-0123-456789abcdef',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string

  @ApiProperty({
    description: 'Lista de coches que se incluyen en la orden',
    type: [CarDetails],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CarDetails)
  cars: CarDetails[]

  @ApiProperty({
    description: 'Fecha de inicio del alquiler (formato ISO 8601)',
    example: '2025-01-10',
  })
  @IsDateString()
  startDate: string

  @ApiProperty({
    description: 'Fecha de finalización del alquiler (formato ISO 8601)',
    example: '2025-01-11',
  })
  @IsDateString()
  endDate: string
}