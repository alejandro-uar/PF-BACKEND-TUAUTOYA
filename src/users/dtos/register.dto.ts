
import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"
import { Roles } from "src/users/roles.enum"

export class CreateUserDTO{
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name:string

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email:string

  @IsNotEmpty()
  @MaxLength(255)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,{
    message: "Password: Debe tener, mayuscula, minuscula, 0-9,!@#$%^&*"
  })
  password: string

  @IsNotEmpty()
  identity: number

  @IsNotEmpty()
  phone: number

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  city: string

  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles
}