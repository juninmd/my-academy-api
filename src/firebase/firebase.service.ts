import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import configs from '../configs';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private readonly logger = new Logger(FirebaseService.name);
  private firebaseApp: admin.app.App;

  onModuleInit() {
    if (configs.pushNotifications.enabled) {
      try {
        this.firebaseApp = admin.initializeApp({
          credential: admin.credential.cert(configs.serviceAccount),
        });
        this.logger.log('Firebase Admin SDK inicializado com sucesso.');
      } catch (error) {
        this.logger.error('Erro ao inicializar Firebase Admin SDK:', error.message);
      }
    } else {
      this.logger.warn('Notificações push desativadas por feature toggle. Firebase Admin SDK não será inicializado.');
    }
  }

  get messaging(): admin.messaging.Messaging {
    if (!this.firebaseApp) {
      throw new Error('Firebase App não inicializado. Verifique se as notificações push estão ativadas.');
    }
    return this.firebaseApp.messaging();
  }
}
