
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"
import { Roles } from "src/users/roles.enum"

export class CreateUserDTO{

  @IsOptional()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsEmail()
  @MaxLength(100)
  email: string;

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
}