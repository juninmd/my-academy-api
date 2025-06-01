import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { FirebaseJwtStrategy } from './firebase-jwt.strategy';
import { FirebaseJwtAuthGuard } from './firebase-jwt.guard';
import { RolesGuard } from './roles.guard';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PassportModule, PrismaModule],
  providers: [FirebaseJwtStrategy, FirebaseJwtAuthGuard, RolesGuard, Reflector],
  exports: [PassportModule, FirebaseJwtStrategy, FirebaseJwtAuthGuard, RolesGuard],
})
export class AuthModule {}
