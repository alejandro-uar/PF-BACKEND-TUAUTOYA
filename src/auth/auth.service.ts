import { Injectable, UnauthorizedException } from "@nestjs/common";
import { FirebaseService } from "../firebase/firebase-admin.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "../entities/users.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  // Valida el token y registra/loguea al usuario
  async validateUser(token: string): Promise<Users> {
    if (!token) {
      throw new UnauthorizedException("Token no proporcionado");
    }

    let decodedToken;
    try {
      // 1. Verificar el token con Firebase
      decodedToken = await this.firebaseService.verifyToken(token);
    } catch (error) {
      throw new UnauthorizedException("Token inválido o expirado");
    }

    const { uid, email } = decodedToken; // Obtenemos UID y Email del token

    if (!email) {
      throw new UnauthorizedException("El token no contiene un email.");
    }

    // 2. Buscar el usuario en la base de datos
    let user = await this.userRepository.findOne({ where: { email: email } });

    // 3. Si no existe, registrar el usuario
    if (!user) {
      user = this.userRepository.create({
        email
      });
      await this.userRepository.save(user);
    }

    return user;
  }
}
