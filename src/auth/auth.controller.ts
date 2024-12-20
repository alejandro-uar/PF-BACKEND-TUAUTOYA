import { Controller, Post, Headers, UnauthorizedException, Req, Get, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { FirebaseAuthGuard } from "src/guards/fireabase-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Ruta para login
  @Post("login")
  async login(@Headers('authorization') authorization: string, @Res({passthrough: true}) res: Response) {
    if (!authorization) {
      throw new UnauthorizedException('No authorization header found');
    }
    
    const token = authorization.split(' ')[1]; // Extraer el token del formato "Bearer <token>"
    
    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    res.cookie('access_token', token);
    
    const user = await this.authService.validateUser(token);
    
    res.json({ message: "Authenticated successfully", user, token })
  }

  @Get('session')
  @UseGuards(FirebaseAuthGuard)
  async session(@Req() req) {
    return req.user;
  }
}