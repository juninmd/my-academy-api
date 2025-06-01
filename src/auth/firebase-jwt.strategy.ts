import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { FirebaseService } from '../firebase/firebase.service'; // Importa o FirebaseService
import { PrismaService } from '../prisma.service';

@Injectable()
export class FirebaseJwtStrategy extends PassportStrategy(Strategy, 'firebase-jwt') {
  constructor(
    private prisma: PrismaService,
    private readonly firebaseService: FirebaseService, // Injeta o FirebaseService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: string) {
    try {
      const firebaseUser = await this.firebaseService.firebaseAppInstance.auth().verifyIdToken(token);
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
