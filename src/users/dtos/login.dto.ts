import { IsEmail, IsNotEmpty, Matches } from "class-validator"

export class  LoginUserDTO{
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/)
  password: string

}