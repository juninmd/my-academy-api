import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import * as admin from 'firebase-admin';
import configs from '../configs';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FirebaseJwtStrategy extends PassportStrategy(Strategy, 'firebase-jwt') {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });

    // Initialize Firebase Admin SDK if not already initialized by FirebaseService
    // This is a fallback in case FirebaseService is not used or push notifications are disabled
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(configs.serviceAccount),
      });
    }
  }

  async validate(token: string) {
    try {
      const firebaseUser = await admin.auth().verifyIdToken(token);
      const user = await this.prisma.users.findUnique({
        where: { id: firebaseUser.uid },
        select: { id: true, role: true }, // Select only necessary fields
      });

      if (!user) {
        throw new UnauthorizedException('User not found in database');
      }

      // Attach the user's role to the request object
      return { uid: firebaseUser.uid, role: user.role };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
