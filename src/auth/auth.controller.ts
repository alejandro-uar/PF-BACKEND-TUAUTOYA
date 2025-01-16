import { Controller, Post, Headers, UnauthorizedException, Req, Get, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { FirebaseAuthGuard } from "src/guards/fireabase-auth.guard";
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse } from "@nestjs/swagger";

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
  @ApiOperation({ summary: 'Inicia sesión', description: 'Autenticacion usando un token de Firebase.' })
  @ApiHeader({ name: 'authorization', description: 'Bearer token for Firebase authentication', required: true, example: 'Bearer <token>' })
  @ApiResponse({ status: 200, description: 'Authenticated successfully, user, token' })
  @ApiResponse({ status: 401, description: 'No authorization header found' })
  async login(@Headers('authorization') authorization: string, @Res({ passthrough: true }) res: Response) {
    return this.handleAuthentication(authorization, res);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Registrar usuario', description: 'Registrar un nuevo usuario usando un token de Firebase' })
  @ApiHeader({ name: 'authorization', description: 'Bearer token for Firebase authentication', required: true, example: 'Bearer <token>' })
  @ApiResponse({ status: 201, description: 'Authenticated successfully, user, token' })
  @ApiResponse({ status: 401, description: 'No authorization header found' })
  async signup(@Headers('authorization') authorization: string, @Res({ passthrough: true }) res: Response) {
    console.log(authorization)
    return this.handleAuthentication(authorization, res);
  }

  

  @Get('session')
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Get user session', description: 'Retrieve the current user session if authenticated.' })
  @ApiBearerAuth('FirebaseToken') 
  @ApiResponse({ status: 200, description: 'Sesión de usuario recuperada con éxito, User{...data}' })
  @ApiResponse({ status: 401, description: 'Unauthorized: User not authenticated.' })
  async session(@Req() req) {
    return req.user;
  }
}