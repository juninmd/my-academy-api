import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import configs from '../configs';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private readonly logger = new Logger(FirebaseService.name);
  private firebaseApp: admin.app.App;

  onModuleInit() {
    if (configs.pushNotifications.enabled) {
      if (admin.apps.length === 0) { // Verifica se já existe uma instância padrão
        try {
          this.firebaseApp = admin.initializeApp({
            credential: admin.credential.cert(configs.serviceAccount),
          });
          this.logger.log('Firebase Admin SDK inicializado com sucesso.');
        } catch (error) {
          this.logger.error('Erro ao inicializar Firebase Admin SDK:', error.message);
        }
      } else {
        this.firebaseApp = admin.app(); // Usa a instância padrão existente
        this.logger.log('Firebase Admin SDK já inicializado. Usando a instância existente.');
      }
    } else {
      this.logger.warn('Notificações push desativadas por feature toggle. Firebase Admin SDK não será inicializado.');
    }
  }

  get firebaseAppInstance(): admin.app.App {
    if (!this.firebaseApp) {
      throw new Error('Firebase App não inicializado. Verifique se as notificações push estão ativadas.');
    }
    return this.firebaseApp;
  }

  get messaging(): admin.messaging.Messaging {
    return this.firebaseAppInstance.messaging();
  }
}
