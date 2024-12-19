import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { FirebaseService } from "../firebase/firebase-admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../entities/users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [AuthController],
  providers: [AuthService, FirebaseService],
})
export class AuthModule {}
