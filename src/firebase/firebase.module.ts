// firebase.module.ts
import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase-admin.service';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [FirebaseService, UsersService],
  exports: [FirebaseService],  // Asegúrate de exportar FirebaseService
})
export class FirebaseModule {}
