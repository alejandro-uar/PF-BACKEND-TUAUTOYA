
import { ApiProperty } from '@nestjs/swagger';  // Importa ApiProperty
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Roles } from "src/users/roles.enum";

export class CreateUserDTO {

  @ApiProperty({
    description: 'Nombre del usuario (opcional)',
    example: 'Juan Pérez',
    maxLength: 100,
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan.perez@example.com',
    maxLength: 100
  })
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario (debe cumplir con los requisitos de seguridad)',
    example: 'Passw0rd!',
    minLength: 8,
    maxLength: 15,
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&]).{8,15}$',
  })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  @MaxLength(15, { message: 'La contraseña no debe tener más de 15 caracteres.' })
  @Matches(/[a-z]/, { message: 'La contraseña debe contener al menos una letra minúscula.' })
  @Matches(/[A-Z]/, { message: 'La contraseña debe contener al menos una letra mayúscula.' })
  @Matches(/\d/, { message: 'La contraseña debe contener al menos un número.' })
  @Matches(/[!@#$%^&]/, { message: 'La contraseña debe contener al menos un carácter especial (!@#$%^&).' })
  password: string;

  @ApiProperty({
    description: 'Identificación del usuario (opcional)',
    example: 123456,
    required: false
  })
  @IsOptional()
  @IsNumber()
  identity: number;

  @ApiProperty({
    description: 'Número de teléfono del usuario (opcional)',
    example: '+1234567890',
    required: false
  })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Ciudad donde reside el usuario (opcional)',
    example: 'Salta',
    maxLength: 100,
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  city: string;

  @ApiProperty({
    description: 'Rol del usuario (opcional)',
    example: 'customer|owner',
    enum: Roles,
    required: false
  })
  @IsOptional()
  @IsEnum(Roles)
  role: Roles;

  @ApiProperty({
    description: 'Estado de habilitación del usuario (opcional)',
    example: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  isEnabled: boolean;
}
