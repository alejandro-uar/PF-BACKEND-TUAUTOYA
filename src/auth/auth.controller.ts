import { Controller, Post, Headers, UnauthorizedException, Req, Get, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { FirebaseAuthGuard } from "src/guards/fireabase-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private async handleAuthentication(authorization: string, res: Response) {
    if (!authorization) {
      throw new UnauthorizedException('No authorization header found');
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token missing');
    }
    res.cookie('access_token', token);
    const user = await this.authService.validateUser(token);
    return { message: 'Authenticated successfully', user, token };
  }

  @Post('login')
  async login(@Headers('authorization') authorization: string, @Res({ passthrough: true }) res: Response) {
    return this.handleAuthentication(authorization, res);
  }

  @Post('signup')
  async signup(@Headers('authorization') authorization: string, @Res({ passthrough: true }) res: Response) {
    console.log(authorization)
    return this.handleAuthentication(authorization, res);
  }

  

  @Get('session')
  @UseGuards(FirebaseAuthGuard)
  async session(@Req() req) {
    return req.user;
  }
}