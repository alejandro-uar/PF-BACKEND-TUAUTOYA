import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/users/dtos/register.dto';
import { LoginUserDTO } from 'src/users/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signin(@Body() user: LoginUserDTO){
    const {email, password} = user
    return this.authService.signin(email, password)
  }

  @Post('/signup')
  async signup(@Body() user: CreateUserDTO){
    return await this.authService.signUp(user)
  }
}
