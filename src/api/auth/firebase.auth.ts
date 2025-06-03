import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { FirebaseService } from '../firebase/firebase.service'; // Importa o FirebaseService
import configs from '../../configs';

@Injectable()
export class PreauthMiddleware implements NestMiddleware {
  constructor(private readonly firebaseService: FirebaseService) {} // Injeta o FirebaseService

  async use(req: Request, res: Response, next: Function) {
    if (configs.authMoc.enabled === 'true') {
      const decodedToken = JSON.parse(configs.authMoc.json);
      req['user'] = decodedToken;
      return next();
    }

    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({
        statusCode: 403,
        timestamp: new Date().toISOString(),
        path: req.url,
        message: 'token required'
      });
    }
    try {
      // Usa a instância do Firebase do FirebaseService
      const decodedToken = await this.firebaseService.firebaseAppInstance.auth().verifyIdToken(token.replace('Bearer ', ''));

      req['user'] = decodedToken;
      next();
    } catch (error) {
      console.error(error);
      return res.status(403).json({
        statusCode: 403,
        timestamp: new Date().toISOString(),
        path: req.url,
        message: 'Access Denied'
      });
    }
  }
}
