import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase-admin.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      throw new UnauthorizedException('No authorization header found');
    }

    const token = authorizationHeader.split(' ')[1]; // Obtener token de tipo Bearer

    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    try {
      // Verificar el token usando Firebase Service
      const decodedToken = await this.firebaseService.verifyToken(token);

      const userId = await this.usersService.findUserIdByEmail(decodedToken.email);

      decodedToken.sub = userId;

      request.user = decodedToken; // Guardar la información del usuario en la solicitud
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
