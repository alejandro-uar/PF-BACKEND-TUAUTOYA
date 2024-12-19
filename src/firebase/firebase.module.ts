// firebase.module.ts
import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase-admin.service';

@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],  // Asegúrate de exportar FirebaseService
})
export class FirebaseModule {}
