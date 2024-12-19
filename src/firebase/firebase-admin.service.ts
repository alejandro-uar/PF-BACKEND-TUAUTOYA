import * as admin from "firebase-admin";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class FirebaseService {
  private firebaseApp: admin.app.App;

  constructor(
    private readonly configService: ConfigService
  ) {
    const firebaseConfig = {
      type: configService.get<string>('firebase.type'),
      project_id: configService.get<string>('firebase.projectid'),
      private_key_id: configService.get<string>('firebase.privatekeyid'),
      private_key: configService.get<string>('firebase.privatekey'),
      client_email: configService.get<string>('firebase.clientemail'),
      client_id: configService.get<string>('firebase.clientid'),
      auth_uri: configService.get<string>('firebase.authuri'),
      token_uri: configService.get<string>('firebase.tokenuri'),
      auth_provider_x509_cert_url: configService.get<string>('firebase.authcert'),
      client_x509_cert_url: configService.get<string>('firebase.clientcert'),
      universe_domain: configService.get<string>('firebase.universaldomain'),
    } as admin.ServiceAccount;

    if (admin.apps.length === 0) {
      this.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(firebaseConfig),
        databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
        storageBucket: `${firebaseConfig.projectId}.appspot.com`,
      });
    } else {
      this.firebaseApp = admin.app()
    }
  }

  // Verifica el token de Firebase
  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    try {
      return await this.firebaseApp.auth().verifyIdToken(token);
    } catch (error) {
      console.error("Error al verificar el token:", error);
      throw new Error("Token inválido o no proporcionado.");
    }
  }
}
