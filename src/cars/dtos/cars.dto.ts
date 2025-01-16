import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { ApprovalStatus, Fuels, Status, Transmissions } from "../cars.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCarDto {

  @ApiProperty({ example: 'Toyota', description: 'Marca de auto', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  brand: string;

  @ApiProperty({ example: 'Corolla', description: 'Modelo del auto', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  model: string;

  @ApiProperty({ example: '2023', description: 'Año de fabricación del auto', minLength: 4, maxLength: 4 })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)  // Un mínimo de 4 caracteres para el año
  @MaxLength(4)  // Un máximo de 4 caracteres (para el año)
  year: string;

  @ApiProperty({ example: 50, description: 'Precio por día de alquiler del auto' })
  @IsNumber()
  @IsNotEmpty()
  pricePerDay: number;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'URL de la imagen del auto', maxLength: 255, required: false })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  image: string;

  @ApiProperty({ example: 'Auto en excelentes condiciones', description: 'Descripción del auto' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: Transmissions, description: 'Tipo de transmisión del auto' })
  @IsEnum(Transmissions)
  transmission: Transmissions;

  @ApiProperty({ enum: Fuels, description: 'Tipo de combustible del auto' })
  @IsEnum(Fuels)
  fuelType: Fuels;

  @ApiProperty({ example: '20000', description: 'Kilometraje del auto' })
  @IsString()
  kilometer: string;

  @ApiProperty({ example: 'Discos en las 4 ruedas', description: 'Tipo de frenos del auto', required: false })
  @IsString()
  @IsOptional()
  brakes: string;

  @ApiProperty({ example: 4, description: 'Calificación promedio del auto', required: false })
  @IsInt()
  @IsOptional()
  rating: number;

  @ApiProperty({ enum: Status, description: 'Estado del auto en el sistema' })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({ enum: ApprovalStatus, description: 'Estado de aprobación del auto', required: false })
  @IsEnum(ApprovalStatus)
  @IsOptional()
  approvalStatus: ApprovalStatus;

  @ApiProperty({ example: 10, description: 'Descuento en porcentaje', required: false })
  @IsOptional()
  discount: number

  @ApiProperty({ example: true, description: 'Indica si el descuento está activo', required: false })
  @IsOptional()
  isDiscount: boolean;

  @ApiProperty({ example: 'a8098c1a-f86e-11da-bd1a-00112444be1e', description: 'ID del usuario propietario del auto' })
  @IsUUID()
  userId: string;
}


export class QueryCarDto {
  @ApiProperty({ example: 'Toyota', description: 'Filtrar por marca', required: false })
  @IsString()
  @IsOptional()
  brand: string;

  @ApiProperty({ example: '50', description: 'Filtrar por precio', required: false })
  @IsString()
  @IsOptional()
  price: string;

  @ApiProperty({ example: '2023', description: 'Filtrar por año', required: false })
  @IsString()
  @IsOptional()
  year: string;

  @ApiProperty({ enum: ApprovalStatus, description: 'Filtrar por estado de aprobación', required: false })
  @IsEnum(ApprovalStatus)
  @IsOptional()
  approvalStatus: ApprovalStatus;
}