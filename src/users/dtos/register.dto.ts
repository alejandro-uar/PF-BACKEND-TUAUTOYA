
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"
import { Roles } from "src/users/roles.enum"

export class CreateUserDTO{

  @IsOptional()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsEmail()
  @MaxLength(100)
  email: string;

  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  @MaxLength(15, { message: 'La contraseña no debe tener más de 15 caracteres.' })
  @Matches(/[a-z]/, { message: 'La contraseña debe contener al menos una letra minúscula.' })
  @Matches(/[A-Z]/, { message: 'La contraseña debe contener al menos una letra mayúscula.' })
  @Matches(/\d/, { message: 'La contraseña debe contener al menos un número.' })
  @Matches(/[!@#$%^&]/, { message: 'La contraseña debe contener al menos un carácter especial (!@#$%^&).' })
  password:string;

  @IsOptional()
  @IsNumber()
  identity: number;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  city: string;

  @IsOptional()
  @IsEnum(Roles)
  role: Roles;

  @IsOptional()
  @IsBoolean()
  isEnabled: boolean;
}