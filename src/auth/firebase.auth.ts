import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as firebase from 'firebase-admin';
import configs from '../configs';

const firebase_params = configs.serviceAccount;

@Injectable()
export class PreauthMiddleware implements NestMiddleware {

  private defaultApp: any;

  constructor() {
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
    });
  }

  async use(req: Request, res: Response, next: Function) {
    if (configs.authMoc.enabled === 'true') {
      const decodedToken = JSON.parse(configs.authMoc.json);
      req['user'] = decodedToken;
      return next();
    }

    const token = req.headers.authorization;
    if (!token) {
      res.status(403).json({
        statusCode: 403,
        timestamp: new Date().toISOString(),
        path: req.url,
        message: 'token required'
      });
    }
    try {
      const decodedToken = await this.defaultApp.auth().verifyIdToken(token.replace('Bearer ', ''));

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