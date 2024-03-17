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
    if (configs.authMoc.enabled) {
      const decodedToken = JSON.parse(configs.authMoc.json);
      req['user'] = decodedToken;
      return next();
    }

    const token = req.headers.authorization;
    if (!token) {
      return this.accessDenied(req.url, res);
    }
    try {
      const decodedToken = await this.defaultApp.auth().verifyIdToken(token.replace('Bearer ', ''));

      req['user'] = decodedToken;
      next();
    } catch (error) {
      console.error(error);
      return this.accessDenied(req.url, res);
    }
  }

  private accessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Access Denied'
    });
  }
}