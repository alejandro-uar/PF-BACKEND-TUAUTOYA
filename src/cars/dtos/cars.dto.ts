import { ApiProperty } from '@nestjs/swagger';  // Importa ApiProperty
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { ApprovalStatus, Fuels, Status, Transmissions } from "../cars.enum";

export class CreateCarDto {

  @ApiProperty({
    description: 'Marca del coche',
    example: 'Toyota',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  brand: string;

  @ApiProperty({
    description: 'Modelo del coche',
    example: 'Corolla',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  model: string;

  @ApiProperty({
    description: 'Año del coche (formato de 4 dígitos)',
    example: '2022',
    minLength: 4,
    maxLength: 4
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(4)
  year: string;

  @ApiProperty({
    description: 'Precio por día del alquiler',
    example: 100.5
  })
  @IsNumber()
  @IsNotEmpty()
  pricePerDay: number;

  @ApiProperty({
    description: 'Imagen representativa del coche (opcional)',
    example: 'https://example.com/car.jpg',
    maxLength: 255,
    required: false
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  image: string;

  @ApiProperty({
    description: 'Descripción del coche',
    example: 'Coche de lujo con excelente rendimiento y confort.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Tipo de transmisión del coche',
    example: 'automatic|manual',
    enum: Transmissions
  })
  @IsEnum(Transmissions)
  transmission: Transmissions;

  @ApiProperty({
    description: 'Tipo de combustible del coche',
    example: 'nafta|diesel|gnc|electric|hybrid',
    enum: Fuels
  })
  @IsEnum(Fuels)
  fuelType: Fuels;

  @ApiProperty({
    description: 'Kilometraje del coche',
    example: '120000',
  })
  @IsString()
  kilometer: string;

  @ApiProperty({
    description: 'Sistema de frenos del coche (opcional)',
    example: 'ABS',
    required: false
  })
  @IsString()
  @IsOptional()
  brakes: string;

  @ApiProperty({
    description: 'Calificación general del coche (opcional)',
    example: 4,
    required: false
  })
  @IsInt()
  @IsOptional()
  rating: number;

  @ApiProperty({
    description: 'Estado actual del coche',
    example: 'active|inactive',
    enum: Status
  })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({
    description: 'Estado de aprobación del coche (opcional)',
    example: 'pending',
    enum: ApprovalStatus,
    required: false
  })
  @IsEnum(ApprovalStatus)
  @IsOptional()
  approvalStatus: ApprovalStatus;

  @ApiProperty({
    description: 'Identificador único del usuario propietario del coche',
    example: 'd9e8f7c6-b5a4-3d2c-1e0f-4d3c5b2a1c6f',
  })
  @IsUUID()
  userId: string;
}
