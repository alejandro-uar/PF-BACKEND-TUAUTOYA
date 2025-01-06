import { ApiProperty } from '@nestjs/swagger';  // Importa ApiProperty
import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class LoginUserDTO {

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario (debe cumplir con los requisitos de seguridad)',
    example: 'StrongPass1!',
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$',
  })
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/)
  password: string;
}
